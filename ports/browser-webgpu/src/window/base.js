// Shifted-window attention: the preamble the specialized kernel sits on.
//
// Two things about this attention are worth knowing before reading it, because they are what let the whole
// network run in FP8 (docs/network.md):
//
//   * The scores are cosine similarities. Q and K are normalized to unit length per head and multiplied by a
//     learned per-head scale, so a score lands in a bounded range whatever the activations do.
//   * There is no maximum subtracted before the exponential. The usual softmax subtracts the row maximum to
//     keep exp() from overflowing; here the bounded score range plus a clamp make it unnecessary, and the
//     exponential itself is an affine map dropped into the half exponent field rather than a call to exp.
//
// The keys and values are held in 4x4-tiled ("physical") order inside a window, which is the order the value
// matrix indexes by; queries and the learned prior stay in natural row-major order.
//
// Everything below is names and addresses. The arithmetic is in shaders/numerics.wgsl, which is prepended,
// and the kernel itself is composed in variants.js out of the transforms beside this file.

/** Immutable for one recorded geometry, so each becomes a pipeline override rather than a uniform read. */
export const WINDOW_LAYOUT_FIELDS = ['width', 'height', 'channels', 'shift_x', 'shift_y',
                                     'use_relative_bias'];

const WINDOW_BASE_WGSL = String.raw`
struct WindowParams {
  tokens: u32, heads: u32, width: u32, height: u32,
  channels: u32, shift_x: u32, shift_y: u32, use_relative_bias: u32,
}

@group(0) @binding(0) var<uniform> attention_params: WindowParams;
@group(0) @binding(1) var<storage, read> attention_qkv: array<f16>;      // raw half QKV [tokens][channels*3]
@group(0) @binding(2) var<storage, read> attention_scales: array<f32>;   // the learned per-head scale
@group(0) @binding(3) var<storage, read> attention_prior: array<f16>;    // [heads][64 query][64 key]
@group(0) @binding(6) var<storage, read_write> attention_output: array<u32>;   // E4M3 [tokens][channels]

fn round_attention_half(value: f32) -> f32 { return round_f16(value); }

/** The E4M3 publication as a value, for the operands that stay in registers. */
fn publish_fp8(value: f32) -> f32 { return decode_e4m3(encode_e4m3(f16_bits(value))); }

/** The same publication as the byte the output tensor stores. */
fn publish_e4_code(value: f32) -> u32 { return encode_e4m3(f16_bits(value)); }

fn native_exp_weight(score: f16) -> f16 { return f16(exp_weight(f32(score))); }

// The cosine norm's pair term is a *half* fused multiply-add, fma(v, v, f16(w * w)): one rounding of the exact
// square plus the addend. The square of a half is exact in f32, but the sum is not always, and an f32 sum
// rounded first can land exactly on a half midpoint the exact value is not on - a subnormal addend under a
// large square is the usual way, and the result is then one half step off. It cannot be repaired in f32
// either: a shader compiler is free to simplify a two-sum error term to zero, and this one does. So the sum is
// formed in integers. Both terms are non-negative, the larger is placed with its top bit at 2^28, the smaller
// is shifted to the same scale with anything shifted out kept as a sticky bit, and the total - at most 2^30 -
// is rounded to half once.
fn half_magnitude_parts(bits: u32) -> vec2<i32> {
  let exponent = i32((bits >> 10u) & 31u);
  let mantissa = i32(bits & 1023u);
  if (exponent == 0) { return vec2<i32>(mantissa, -24); }
  return vec2<i32>(mantissa | 1024, exponent - 25);
}

fn align_with_sticky(value: u32, exponent: i32, scale: i32) -> u32 {
  if (exponent >= scale) { return value << u32(exponent - scale); }
  let shift = u32(scale - exponent);
  if (shift >= 32u) { return select(0u, 1u, value != 0u); }
  return (value >> shift) | select(0u, 1u, (value & ((1u << shift) - 1u)) != 0u);
}

fn nr_norm_fma(a: f16, b: f16, c: f16) -> f16 {
  // a and b are the same value here (the low channel, squared); c is a half square, so nothing is negative.
  let low = half_magnitude_parts(f16_bits(f32(a)) & 0x7fffu);
  let high = half_magnitude_parts(f16_bits(f32(c)) & 0x7fffu);
  let square = u32(low.x) * u32(low.x);
  let square_exponent = 2 * low.y;
  let addend = u32(high.x);
  if (square == 0u) { return c; }
  let square_top = square_exponent + i32(31u - countLeadingZeros(square));
  var top = square_top;
  if (addend != 0u) { top = max(top, high.y + i32(31u - countLeadingZeros(addend))); }
  let scale = top - 28;
  let total = align_with_sticky(square, square_exponent, scale) + align_with_sticky(addend, high.y, scale);
  return f16(fixed_to_f16(i32(total), scale));
}

/** Physical (4x4-tiled) token -> natural row-major token inside an 8x8 window. */
fn inverse_tiled_token(token: u32) -> u32 {
  let tile = token >> 4u;
  let within = token & 15u;
  let x = (tile & 1u) * 4u + (within & 3u);
  let y = (tile >> 1u) * 4u + (within >> 2u);
  return y * 8u + x;
}

// The learned prior is the C accumulator of the score matrix multiply, so the model stores it as 16x16
// accumulator tiles rather than as a matrix. src/model.js untangles that once, into natural query and key.
fn load_relative_bias(head: u32, query: u32, key: u32) -> f32 {
  return f32(attention_prior[(head * 64u + query) * 64u + key]);
}
`;

/** The preamble alone; shaders/numerics.wgsl, which carries the `enable f16` directive, goes in front. */
export function windowBaseCode() {
  return WINDOW_BASE_WGSL;
}
