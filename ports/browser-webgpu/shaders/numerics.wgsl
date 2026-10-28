// The publication grid in WGSL. Every function here has a twin in src/numerics.js, which in turn mirrors
// src/numeric.h and src/reference.cpp of the Vulkan implementation; web/selftest.html checks the two against
// each other over exhaustive inputs. See docs/numerics.md in the repository root for why the schedule of
// roundings, and not an error bound, is the contract.
//
// Three browser constraints shape this file:
//
//   * There is no FP8 type. E4M3 lives as bytes inside u32 words and is decoded arithmetically.
//   * There are no cooperative matrices, so the tensor core's k32 step is written out by hand as fixed point.
//   * f16 is an optional feature (shader-f16), and even where it exists it buys nothing here: every rounding
//     has to be placed explicitly, so it is done on the bit pattern and the whole port runs in f32.
//
// Nothing below calls exp2, log2 or fma. WGSL specifies those only to within a few ULP, which is not good
// enough when the result is compared byte for byte; powers of two are built out of the exponent field instead.

/// 2^e, exactly. Callers stay inside the normal range (|e| < 127).
fn pow2(e: i32) -> f32 { return bitcast<f32>(u32(clamp(e, -126, 127) + 127) << 23u); }

/// Shift right with round-to-nearest-even, the rounding every narrowing conversion here uses.
fn round_shift_right_even(value: u32, shift: u32) -> u32 {
  if (shift == 0u) { return value; }
  if (shift > 31u) { return 0u; }
  let quotient = value >> shift;
  let remainder = value & ((1u << shift) - 1u);
  let halfway = 1u << (shift - 1u);
  let up = (remainder > halfway) || (remainder == halfway && (quotient & 1u) != 0u);
  return quotient + select(0u, 1u, up);
}

/// IEEE binary16 bit pattern of an f32, round-to-nearest-even.
fn f16_bits(value: f32) -> u32 {
  let bits = bitcast<u32>(value);
  let sign = (bits >> 16u) & 0x8000u;
  let exponent = (bits >> 23u) & 0xffu;
  let mantissa = bits & 0x7fffffu;
  if (exponent == 0xffu) { return sign | select(0x7c00u, 0x7e00u, mantissa != 0u); }
  var half_exponent = i32(exponent) - 112;
  if (half_exponent >= 31) { return sign | 0x7c00u; }
  if (half_exponent <= 0) {
    if (half_exponent < -10) { return sign; }
    return sign | round_shift_right_even(mantissa | 0x800000u, u32(14 - half_exponent));
  }
  var rounded = round_shift_right_even(mantissa, 13u);
  if (rounded == 0x400u) { rounded = 0u; half_exponent = half_exponent + 1; }
  if (half_exponent >= 31) { return sign | 0x7c00u; }
  return sign | (u32(half_exponent) << 10u) | rounded;
}

/// f32 value of an IEEE binary16 bit pattern, assembled on the bit pattern rather than arithmetically.
///
/// Every half has an exact f32, so this could be written as a multiply and a scale - but not for the infinities
/// and the NaNs, whose payload and sign have to survive, and which an arithmetic form would have to synthesise.
/// Tint also rejects a NaN constant it can fold, so building one from the input is the only way to have one at
/// all. Subnormal halves are normalised by counting leading zeros instead of the reference's shift loop.
fn f16_to_f32(bits: u32) -> f32 {
  let sign = (bits & 0x8000u) << 16u;
  let exponent = (bits >> 10u) & 0x1fu;
  let mantissa = bits & 0x3ffu;
  if (exponent == 0u) {
    if (mantissa == 0u) { return bitcast<f32>(sign); }
    let shift = countLeadingZeros(mantissa) - 21u;   // brings the leading one up to bit 10
    let normalized = (mantissa << shift) & 0x3ffu;   // which the f32 significand then leaves implicit
    return bitcast<f32>(sign | ((113u - shift) << 23u) | (normalized << 13u));
  }
  if (exponent == 0x1fu) { return bitcast<f32>(sign | 0x7f800000u | (mantissa << 13u)); }
  return bitcast<f32>(sign | ((exponent + 112u) << 23u) | (mantissa << 13u));
}

/// One publication to the half grid.
fn round_f16(value: f32) -> f32 { return f16_to_f32(f16_bits(value)); }

/// E4M3FN value of a byte. The one NaN code reads as zero, which is what every consumer in the graph does
/// with it; nothing downstream is given the chance to propagate it.
fn decode_e4m3(bits: u32) -> f32 {
  let negative = (bits & 0x80u) != 0u;
  let exponent = (bits >> 3u) & 0x0fu;
  let mantissa = bits & 0x07u;
  var value: f32;
  if (exponent == 0u) {
    value = f32(mantissa) * pow2(-9);
  } else if (exponent == 15u && mantissa == 7u) {
    value = 0.0;
  } else {
    value = (1.0 + f32(mantissa) * 0.125) * pow2(i32(exponent) - 7);
  }
  return select(value, -value, negative);
}

/// E4M3FN code of an already half-rounded value: RNE, finite saturation at 448, NaN -> +0. The sign of a zero
/// survives, as the hardware conversion leaves it: +0 and -0 decode alike, but the published bytes differ.
fn encode_e4m3(half_bits: u32) -> u32 {
  if ((half_bits & 0x7c00u) == 0x7c00u && (half_bits & 0x03ffu) != 0u) { return 0u; }
  if ((half_bits & 0x7fffu) == 0u) { return (half_bits >> 8u) & 0x80u; }
  let negative = select(0u, 0x80u, (half_bits & 0x8000u) != 0u);
  let exponent = (half_bits >> 10u) & 0x1fu;
  let mantissa = half_bits & 0x3ffu;
  var code: u32;
  if (exponent == 31u) {
    code = 0x7eu;
  } else if (exponent <= 8u) {
    // Below 2^-6 the E4M3 grid is subnormal: the half significand is shifted down onto a fixed step of 2^-9.
    let significand = select(1024u + mantissa, mantissa, exponent == 0u);
    let shift = select(16u - exponent, 15u, exponent == 0u);
    code = min(round_shift_right_even(significand, shift), 8u);
  } else {
    var e4_exponent = exponent - 8u;
    var e4_mantissa = round_shift_right_even(mantissa, 7u);
    if (e4_mantissa == 8u) { e4_mantissa = 0u; e4_exponent = e4_exponent + 1u; }
    let overflow = (e4_exponent > 15u) || (e4_exponent == 15u && e4_mantissa > 6u);
    code = select((e4_exponent << 3u) | e4_mantissa, 0x7eu, overflow);
  }
  return negative | code;
}

/// MpCubicSiLU: five half publications. The two inner steps are f32 fused multiply-adds in native, but
/// both products are exact in f32 - a half times an 8-bit constant, then two halves - so an unfused multiply
/// and add give the same f32 result, and nothing here depends on whether the compiler contracts them.
fn mp_cubic_silu(value: f32) -> f32 {
  let bounded = round_f16(clamp(value, -4.0, 4.0));
  let absolute = round_f16(abs(bounded));
  let inner = round_f16(-0.055908203125 * absolute + 0.447265625);
  let polynomial = round_f16(bounded * inner + 0.89453125);
  return round_f16(value * polynomial);
}

/// The window blocks' attention weight: an affine map on the score, dropped into the half exponent field.
/// The clamp is what keeps the shifted pattern a finite half, so it belongs to the function, not to safety.
/// The affine is an f32 fused multiply-add there, and `score * 0.044921875` is exact, so this matches it.
fn exp_weight(score: f32) -> f32 {
  let affine = clamp(round_f16(score * 0.044921875 + 1.30078125), 1.03125, 1.5693359375);
  return f16_to_f32(((f16_bits(affine) << 5u) + 0x8000u) & 0xffffu);
}

/// The ViT's variant: a 4-bit shift instead of 5, a different bias, and an affine native evaluates in
/// halves rather than f32. The constants below are those half values; the f32 spellings they are usually
/// written as (0.08953946828842163, 1.7093614339828491) are not the numbers the arithmetic sees.
///
/// Evaluating a half fused multiply-add in f32 rounds twice where native rounds once, which normally
/// has to be corrected for. It does not here: the scale is 1467 * 2^-14, so a half score with exponent e puts
/// the product's last bit at 2^(e-24), and landing exactly on a half midpoint of the sum would need that to
/// be an odd multiple of 2^-11 - only possible for e >= 13, where the clamp has long since saturated. Checked
/// over all 63488 finite halves as well.
fn vit_exp_weight(score: f32) -> f32 {
  let affine = clamp(round_f16(score * 0.08953857421875 + 1.708984375), 1.439453125, 1.9775390625);
  return f16_to_f32(((f16_bits(affine) << 4u) + 0x4000u) & 0xffffu);
}

fn normal_exponent(value: f32) -> i32 { return i32((bitcast<u32>(abs(value)) >> 23u) & 0xffu) - 127; }
fn e4m3_exponent(value: f32) -> i32 { return max(normal_exponent(value), -6); }
fn f16_exponent(value: f32) -> i32 { return max(normal_exponent(value), -14); }

// ---------------------------------------------------------------------------------------------------------
// The tensor core's dot product, as fixed point.
//
// A k32 FP8 step aligns 16 products and the incoming accumulator to one shared exponent, truncates each to 13
// fractional bits, sums those exactly, and rounds the total to half once. The helpers below are that schedule
// taken apart, so a GEMM kernel can run it over operands it already holds instead of copying into an array.
//
// Two properties make the aligned sum exact in f32 and i32 alike, which is what lets this be emulated at all:
//
//   * a product of two E4M3 values carries at most 8 significant bits, and scaling by a power of two is exact,
//     so a * b * pow2(13 - max) is formed with no rounding whatsoever before the truncation;
//   * with max >= ea + eb for every term, each truncated term is below 2^15 and 17 of them stay below 2^20.
//
// The second property is why the accumulator can be an i32. The f16 step below needs 24 fractional bits and is
// bounded by 2^30 instead - still inside i32, which matters because WGSL has no 64-bit integer and the Vulkan
// reference accumulates that one in int64.
// ---------------------------------------------------------------------------------------------------------

/// The shared exponent of a step that starts from this accumulator. -21 is the empty value: with no operands
/// and no accumulator the sum is zero and the exponent never reaches the result.
fn f13_start(accumulator: f32) -> i32 { return select(-21, f16_exponent(accumulator), accumulator != 0.0); }

/// Widen the shared exponent to cover one product. A zero operand is skipped rather than clamped: the exponent
/// read off a zero is -127, and lifting it to -6 would drag the whole step's alignment up with it.
fn f13_cover(maximum_exponent: i32, a: f32, b: f32) -> i32 {
  if (a == 0.0 || b == 0.0) { return maximum_exponent; }
  return max(maximum_exponent, e4m3_exponent(a) + e4m3_exponent(b));
}

/// One term of the aligned sum, in units of 2^(max - 13). scale is pow2(13 - max), hoisted by the caller.
fn f13_term(value: f32, scale: f32) -> i32 { return i32(trunc(value * scale)); }

/// The aligned sum, published once to the half grid.
fn f13_finish(units: i32, maximum_exponent: i32) -> f32 {
  return round_f16(f32(units) * pow2(maximum_exponent - 13));
}

/// Exact signed integer times 2^binary_exponent -> half. The f16 step needs this rather than a rounding of the
/// sum, because its fixed-point total carries more significand than a half holds.
fn fixed_to_f16(fixed_sum: i32, binary_exponent: i32) -> f32 {
  if (fixed_sum == 0) { return 0.0; }
  let negative = fixed_sum < 0;
  let magnitude = u32(abs(fixed_sum));
  let msb = 31u - countLeadingZeros(magnitude);
  var value_exponent = i32(msb) + binary_exponent;
  var half_bits = select(0u, 0x8000u, negative);
  if (value_exponent >= -14) {
    var significand: u32;
    if (msb > 10u) { significand = round_shift_right_even(magnitude, msb - 10u); }
    else { significand = magnitude << (10u - msb); }
    if (significand >= 2048u) { significand = 1024u; value_exponent = value_exponent + 1; }
    if (value_exponent >= 16) { half_bits = half_bits | 0x7c00u; }
    else { half_bits = half_bits | (u32(value_exponent + 15) << 10u) | (significand - 1024u); }
  } else {
    let subnormal_scale = binary_exponent + 24;
    var mantissa: u32;
    if (subnormal_scale >= 0) { mantissa = magnitude << u32(subnormal_scale); }
    else { mantissa = round_shift_right_even(magnitude, u32(-subnormal_scale)); }
    half_bits = half_bits | min(mantissa, 1024u);
  }
  return f16_to_f32(half_bits);
}

/// One half of a k32 FP8 step, over 16 products. A GEMM kernel inlines the same four calls over its registers.
fn ada_fp8_fdpa16(a: array<f32, 16>, b: array<f32, 16>, accumulator: f32) -> f32 {
  // A tensor core carries an infinite or NaN C through untouched; aligning it would manufacture a finite value.
  if ((bitcast<u32>(accumulator) & 0x7f800000u) == 0x7f800000u) { return accumulator; }
  var maximum_exponent = f13_start(accumulator);
  for (var i = 0u; i < 16u; i = i + 1u) { maximum_exponent = f13_cover(maximum_exponent, a[i], b[i]); }
  let scale = pow2(13 - maximum_exponent);
  var units = f13_term(accumulator, scale);
  for (var i = 0u; i < 16u; i = i + 1u) { units = units + f13_term(a[i] * b[i], scale); }
  return f13_finish(units, maximum_exponent);
}

/// The f16 step: 8 products against 24 fractional bits. Used by the chains that never narrow to E4M3.
fn ada_f16_fdpa8(a: array<f32, 8>, b: array<f32, 8>, accumulator: f32) -> f32 {
  var maximum_exponent = f13_start(accumulator);
  for (var i = 0u; i < 8u; i = i + 1u) {
    if (a[i] != 0.0 && b[i] != 0.0) {
      maximum_exponent = max(maximum_exponent, f16_exponent(a[i]) + f16_exponent(b[i]));
    }
  }
  let scale = pow2(24 - maximum_exponent);
  var units = i32(trunc(accumulator * scale));
  for (var i = 0u; i < 8u; i = i + 1u) { units = units + i32(trunc(a[i] * b[i] * scale)); }
  return fixed_to_f16(units, maximum_exponent - 24);
}

// ---------------------------------------------------------------------------------------------------------
// The same instructions on RTX Blackwell (sm_120).
//
// The schedule above is Ada's: a k32 FP8 step is two chained 16-product groups at 13 fractional bits, a k16 f16
// step two 8-product groups at 24. RTX Blackwell has no chain inside the instruction. m16n8k32 FP8 and m16n8k16
// f16 are each one fused dot product over every product of the step and the incoming accumulator: one shared
// exponent (a zero accumulator counts at the half's minimum exponent, -14), every aligned significand truncated
// to 25 fractional bits, an exact sum, and one RNE rounding to half. That is MMA-Sim's FDA(F=25) for the
// architecture (arXiv 2511.10909), and it is what an RTX 5070 does on every value of block 0 of a 1486x836
// frame - 25 bits exactly, with 24 and 26 both measurably different (dlss5vk verify --tensor-cores).
//
// The sum is the hard part. 33 terms of up to 2^27 units reach 2^33, beyond both an i32 and an f32's 24 bits.
// Each truncated term is still exact in f32 (it carries at most the 22 significant bits of an f16 product), so
// it is split at 2^12 into a high and a low part, each summed exactly in its own lane: the highs stay below
// 33 * 2^15 and the lows below 33 * 2^12. Once the lows are carried into the highs, a total of 2^24 or more has
// its rounding position at 2^12 or above, so the low part can only act as a sticky bit - and any value strictly
// inside the same 2^12 interval rounds the same way. Below 2^24 the total is exact in f32 as it stands.
// ---------------------------------------------------------------------------------------------------------

/// Which tensor-core arithmetic the network kernels reproduce. The host rewrites this line (src/tensor-cores.js)
/// for an RTX Blackwell adapter; everything that reads it folds at compile time.
const TENSOR_CORES_BLACKWELL = false;

/// The aligned sum of one fused step, as a high part in units of 2^12 and a low part, both exact in f32.
struct Fda25 { high: f32, low: f32 }

fn fda25_add(sum: Fda25, term: f32) -> Fda25 {
  let high = trunc(term * 0.000244140625);
  return Fda25(sum.high + high, sum.low + (term - high * 4096.0));
}

/// The total in units of 2^(exponent - 25), published once to the half grid.
fn fda25_finish(sum: Fda25, exponent: i32) -> f32 {
  let carry = floor(sum.low * 0.000244140625);
  let high = sum.high + carry;
  let low = sum.low - carry * 4096.0;
  let sticky = high * 4096.0 + select(0.0, 2048.0, low != 0.0);
  let total = select(sticky, high * 4096.0 + low, abs(high) < 4095.0);
  let value = round_f16(total * pow2(exponent - 25));
  return select(value, 0.0, value == 0.0);
}

/// One RTX Blackwell k32 FP8 step: 32 E4M3 products and a half accumulator.
fn blackwell_fp8_fda32(a: array<f32, 32>, b: array<f32, 32>, accumulator: f32) -> f32 {
  if ((bitcast<u32>(accumulator) & 0x7f800000u) == 0x7f800000u) { return accumulator; }
  var exponent = f16_exponent(accumulator);
  for (var i = 0u; i < 32u; i = i + 1u) {
    if (a[i] != 0.0 && b[i] != 0.0) { exponent = max(exponent, e4m3_exponent(a[i]) + e4m3_exponent(b[i])); }
  }
  let scale = pow2(25 - exponent);
  var sum = fda25_add(Fda25(0.0, 0.0), trunc(accumulator * scale));
  for (var i = 0u; i < 32u; i = i + 1u) { sum = fda25_add(sum, trunc(a[i] * b[i] * scale)); }
  return fda25_finish(sum, exponent);
}

/// One RTX Blackwell k16 f16 step: 16 half products and a half accumulator.
fn blackwell_f16_fda16(a: array<f32, 16>, b: array<f32, 16>, accumulator: f32) -> f32 {
  if ((bitcast<u32>(accumulator) & 0x7f800000u) == 0x7f800000u) { return accumulator; }
  var exponent = f16_exponent(accumulator);
  for (var i = 0u; i < 16u; i = i + 1u) {
    if (a[i] != 0.0 && b[i] != 0.0) { exponent = max(exponent, f16_exponent(a[i]) + f16_exponent(b[i])); }
  }
  let scale = pow2(25 - exponent);
  var sum = fda25_add(Fda25(0.0, 0.0), trunc(accumulator * scale));
  for (var i = 0u; i < 16u; i = i + 1u) { sum = fda25_add(sum, trunc(a[i] * b[i] * scale)); }
  return fda25_finish(sum, exponent);
}

/// A k32 FP8 step of whichever architecture the network is reproducing.
fn tensor_core_fp8_k32(a: array<f32, 32>, b: array<f32, 32>, accumulator: f32) -> f32 {
  if (TENSOR_CORES_BLACKWELL) { return blackwell_fp8_fda32(a, b, accumulator); }
  var a0 : array<f32, 16>;
  var b0 : array<f32, 16>;
  var a1 : array<f32, 16>;
  var b1 : array<f32, 16>;
  for (var i = 0u; i < 16u; i = i + 1u) { a0[i] = a[i]; b0[i] = b[i]; a1[i] = a[i + 16u]; b1[i] = b[i + 16u]; }
  return ada_fp8_fdpa16(a1, b1, ada_fp8_fdpa16(a0, b0, accumulator));
}

/// A k16 f16 step of whichever architecture the network is reproducing.
fn tensor_core_f16_k16(a: array<f32, 16>, b: array<f32, 16>, accumulator: f32) -> f32 {
  if (TENSOR_CORES_BLACKWELL) { return blackwell_f16_fda16(a, b, accumulator); }
  var a0 : array<f32, 8>;
  var b0 : array<f32, 8>;
  var a1 : array<f32, 8>;
  var b1 : array<f32, 8>;
  for (var i = 0u; i < 8u; i = i + 1u) { a0[i] = a[i]; b0[i] = b[i]; a1[i] = a[i + 8u]; b1[i] = b[i + 8u]; }
  return ada_f16_fdpa8(a1, b1, ada_f16_fdpa8(a0, b0, accumulator));
}
