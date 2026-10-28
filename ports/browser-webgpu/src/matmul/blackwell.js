// RTX Blackwell: the two 16-product groups of every k32 step become one fused 32-product group at 25
// fractional bits (src/tensor-cores.js has the merge, shaders/numerics.wgsl the arithmetic and why the
// two-lane sum is exact). Applied last, to the kernel as composed for Ada; every other transform's claim
// about the operands - the half-scaled products, the packed exponents, the layouts - carries over unchanged.

import { mergeGroupFunctions, replaceExactly, replaceAll } from '../tensor-cores.js';

const FDA25_QUAD = `
// The fused step's sum for four outputs: a high part in units of 2^12 and a low part, both exact in f32.
struct Fda25x4 { high: vec4<f32>, low: vec4<f32> }

fn fda25_add4(sum: Fda25x4, term: vec4<f32>) -> Fda25x4 {
  let high = trunc(term * 0.000244140625);
  return Fda25x4(sum.high + high, sum.low + (term - high * 4096.0));
}

fn fda25_finish4(sum: Fda25x4, exponents: vec4<i32>) -> vec4<f32> {
  let carry = floor(sum.low * 0.000244140625);
  let high = sum.high + carry;
  let low = sum.low - carry * 4096.0;
  let sticky = high * 4096.0 + select(vec4<f32>(0.0), vec4<f32>(2048.0), low != vec4<f32>(0.0));
  let total = select(sticky, high * 4096.0 + low, abs(high) < vec4<f32>(4095.0));
  let scale = bitcast<vec4<f32>>(vec4<u32>(exponents + vec4<i32>(102)) << vec4<u32>(23u));
  let rounded = vec4<f32>(vec4<f16>(total * scale));
  return select(rounded, vec4<f32>(0.0), rounded == vec4<f32>(0.0));
}
`;

function fuse(text) {
  let out = replaceExactly(text, 'select(vec4<i32>(-21),', 'select(vec4<i32>(-14),');
  out = replaceExactly(out, 'vec4<i32>(140) - exponents', 'vec4<i32>(152) - exponents');
  out = replaceExactly(out, 'vec4<i32>(136) - exponents', 'vec4<i32>(148) - exponents');
  out = replaceExactly(out, '  var sums = trunc(accumulator * alignment);',
    '  var sums = fda25_add4(Fda25x4(vec4<f32>(0.0), vec4<f32>(0.0)), trunc(accumulator * alignment));');
  out = replaceAll(out, /sums \+= trunc\(([\s\S]*?)\);\n/g, 'sums = fda25_add4(sums, trunc($1));\n');
  const tail = out.indexOf('  let scale = bitcast<vec4<f32>>(vec4<u32>(exponents + vec4<i32>(114))');
  if (tail < 0) throw new Error('fused GEMM step: no publication to replace');
  return out.slice(0, tail) + '  return fda25_finish4(sums, exponents);\n}\n';
}

export function blackwellMatmulCode(code) {
  code = mergeGroupFunctions(code, 'quad_fdpa_16_0', 'quad_fdpa_16_16', 'quad_fda_32', fuse);
  // The default K mode is the only one the graph records; the 8- and 4-term modes are Ada experiments.
  code = replaceAll(code, /( *)(quad\d) = quad_fdpa_16_0\(([^;]*), \2\);\n\s*(quad\d) = quad_fdpa_16_0\(([^;]*), \4\);\n\s*\2 = quad_fdpa_16_16\(\3, \2\);\n\s*\4 = quad_fdpa_16_16\(\5, \4\);\n/g,
    '$1$2 = quad_fda_32($3, $2);\n$1$4 = quad_fda_32($5, $4);\n');
  if (code.includes('quad_fdpa_16_')) throw new Error('fused GEMM step: an Ada 16-product group is still called');
  return replaceExactly(code, '\n@compute', FDA25_QUAD + '\n@compute');
}
