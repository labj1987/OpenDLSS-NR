// RTX Blackwell: the scores and the value reduction each run k32 steps of FP8 products, and on this
// architecture a step is one fused 32-product group at 25 fractional bits instead of two chained groups at 13.
// Applied last, to the kernel as composed for Ada (src/tensor-cores.js merges the group functions; the sum is
// shaders/numerics.wgsl's Fda25, which this module already has in front of it).

import { mergeGroupFunctions, replaceExactly, replaceAll } from '../tensor-cores.js';

function fuser(products) {
  return (text) => {
    let out = replaceExactly(text, 'var maximum = 191u;', 'var maximum = 198u;');
    out = replaceExactly(out, 'u32(140 - exponent)', 'u32(152 - exponent)');
    if (products) out = replaceExactly(out, 'u32(136 - exponent)', 'u32(148 - exponent)');
    out = replaceExactly(out, '  var sum = trunc(accumulator * alignment);',
      '  var sum = fda25_add(Fda25(0.0, 0.0), trunc(accumulator * alignment));');
    out = replaceAll(out, /sum \+= trunc\(([\s\S]*?)\);\n/g, 'sum = fda25_add(sum, trunc($1));\n');
    return replaceExactly(out,
      'return round_attention_half(select(sum, 0.0, sum == 0.0) * bitcast<f32>(u32(exponent + 114) << 23u));',
      'return fda25_finish(sum, exponent);');
  };
}

export function blackwellWindowCode(code) {
  code = mergeGroupFunctions(code, 'tiled_qk_0', 'tiled_qk_16', 'tiled_qk_32', fuser(false));
  code = mergeGroupFunctions(code, 'tiled_value_0', 'tiled_value_16', 'tiled_value_32_0', fuser(true));
  code = mergeGroupFunctions(code, 'tiled_value_32', 'tiled_value_48', 'tiled_value_32_32', fuser(true));
  code = replaceExactly(code, `fn tiled_qk(query:u32, key:u32, start:u32, accumulator:f32)->f32 {
  if(start==0u){return tiled_qk_0(query,key,accumulator);}
  return tiled_qk_16(query,key,accumulator);
}
`, '');
  code = replaceAll(code,
    /let low = tiled_qk\(query, key, 0u, prior\);\n\s*(score\.[xyzw]) = native_exp_weight\(f16\(tiled_qk\(query, key, 16u, low\)\)\);/g,
    '$1 = native_exp_weight(f16(tiled_qk_32(query, key, prior)));');
  code = replaceExactly(code, `fn tiled_value(query:u32, component:u32, start:u32, accumulator:f32)->f32 {
  if(start==0u){return tiled_value_0(query,component,accumulator);}
  if(start==16u){return tiled_value_16(query,component,accumulator);}
  if(start==32u){return tiled_value_32(query,component,accumulator);}
  return tiled_value_48(query,component,accumulator);
}`, `fn tiled_value(query:u32, component:u32, start:u32, accumulator:f32)->f32 {
  if(start==0u){return tiled_value_32_0(query,component,accumulator);}
  return tiled_value_32_32(query,component,accumulator);
}`);
  code = replaceExactly(code, `        for (var group = 0u; group < 4u; group++) {
          value = tiled_value(query, component, group * 16u, value);
        }`, `        for (var step = 0u; step < 2u; step++) {
          value = tiled_value(query, component, step * 32u, value);
        }`);
  if (/tiled_(qk|value)_(0|16|48)\(|tiled_value_32\(/.test(code)) {
    throw new Error('fused window step: an Ada 16-product group is still called');
  }
  return code;
}
