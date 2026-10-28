// Which tensor core the port imitates.
//
// The Vulkan implementation runs the hardware MMA, so its result is whatever the card's tensor cores compute,
// and NVIDIA's own runtime on the same card computes the same thing. That is not one function. On Ada a k32
// FP8 step is two chained 16-product groups at 13 fractional bits and a k16 f16 step two 8-product groups at 24;
// on RTX Blackwell each step is one fused group over all of its products at 25 (docs/numerics.md). A frame run
// through the two differs in nearly every output value, by a few codes, from block 0 on.
//
// The port has no tensor core of its own, so it has to be told which one native ran on. It reads that off the
// adapter, which is the same card native would run on, and a caller can name one instead - to reproduce a
// fixture recorded on another machine, for instance.

export const ADA = 'ada';
export const BLACKWELL = 'blackwell';

/** The tensor-core arithmetic of an adapter: RTX Blackwell when it says so, Ada otherwise. */
export function tensorCoresOf(info) {
  const architecture = String(info?.architecture ?? '').toLowerCase();
  const vendor = String(info?.vendor ?? '').toLowerCase();
  return vendor === 'nvidia' && architecture === 'blackwell' ? BLACKWELL : ADA;
}

/** Check a requested model, or derive it from the adapter when none is given. */
export function resolveTensorCores(requested, info) {
  if (requested === undefined || requested === null || requested === 'auto') return tensorCoresOf(info);
  if (requested !== ADA && requested !== BLACKWELL) {
    throw new Error(`unknown tensor-core model "${requested}"; expected "${ADA}", "${BLACKWELL}" or "auto"`);
  }
  return requested;
}

const ADA_LINE = 'const TENSOR_CORES_BLACKWELL = false;';

/** shaders/numerics.wgsl with its one architecture switch set. */
export function numericsFor(numerics, cores) {
  if (!numerics.includes(ADA_LINE)) throw new Error('shaders/numerics.wgsl has no tensor-core switch');
  return cores === BLACKWELL ? numerics.replace(ADA_LINE, 'const TENSOR_CORES_BLACKWELL = true;') : numerics;
}

// ---------------------------------------------------------------------------------------------------------
// The RTX Blackwell kernels, as a transform of the Ada ones.
//
// The generated GEMM and window kernels carry each 16-product group as its own function, unrolled over four
// operand words: first the exponent blocks, then the term blocks, each a `{ let k = ... }` block of its own.
// RTX Blackwell fuses the two groups of a k32 step into one, so the two functions of a step are merged - the
// eight exponent blocks feed one shared exponent and the eight term blocks one sum - and the arithmetic around
// them changes in exactly three places: the alignment is to 25 fractional bits instead of 13, the sum is carried
// in the exact two-lane form of shaders/numerics.wgsl instead of one f32, and a zero accumulator counts at the
// half's minimum exponent (-14) rather than Ada's empty value (-21). That last one cannot change an FP8 step -
// every nonzero E4M3 product has an exponent of at least -12 - but it is what the hardware does, so it is
// what is written. Everything that loads, stages and publishes the operands is untouched.
// ---------------------------------------------------------------------------------------------------------

/** A generated function's text, from `fn name(` to the closing brace at column 0. */
function functionText(code, name) {
  const start = code.indexOf(`fn ${name}(`);
  if (start < 0) throw new Error(`no function ${name} to merge`);
  const end = code.indexOf('\n}\n', start);
  if (end < 0) throw new Error(`function ${name} does not end`);
  return { start, end: end + 3, text: code.slice(start, end + 3) };
}

/** Split a function into the text between its two-space blocks and the blocks themselves. */
function blocksOf(text) {
  const pattern = /\n {2}\{\n[\s\S]*?\n {2}\}/g;
  const blocks = [];
  const between = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    between.push(text.slice(last, match.index));
    blocks.push(match[0]);
    last = match.index + match[0].length;
  }
  between.push(text.slice(last));
  return { blocks, between };
}

/**
 * Merge the two group functions of one k32 step into one fused 32-product function named `merged`.
 * `rewrite` gets the merged text and returns it with the arithmetic changed; it must change all of it.
 */
export function mergeGroupFunctions(code, first, second, merged, rewrite) {
  const a = functionText(code, first);
  const b = functionText(code, second);
  const pa = blocksOf(a.text);
  const pb = blocksOf(b.text);
  // Expected shape: header, the exponent blocks, the alignment, the term blocks, the publication.
  const count = pa.blocks.length;
  if (count % 2 || pb.blocks.length !== count || pa.between.length !== count + 1) {
    throw new Error(`${first} and ${second} do not have the shape of two group functions`);
  }
  const half = count / 2;
  for (let i = 1; i < count; ++i) {
    if (i !== half && (pa.between[i].trim() !== '' || pb.between[i].trim() !== '')) {
      throw new Error(`${first}: unexpected text between its blocks`);
    }
  }
  // The second group's first exponent block initializes its maxima; in the fused step it extends them.
  const extend = (block) => block.replace(/^( {4}(maximum\d\d) = )(.+);$/gm, (line, lead, name, value) => (
    value.startsWith('max(') ? line : `${lead}max(${name}, ${value});`));
  const header = pa.between[0].replace(`fn ${first}(`, `fn ${merged}(`);
  const text = header
    + pa.blocks.slice(0, half).join('') + pb.blocks.slice(0, half).map(extend).join('')
    + pa.between[half]
    + pa.blocks.slice(half).join('') + pb.blocks.slice(half).join('')
    + pa.between[count];
  const rewritten = rewrite(text);
  if (rewritten === text) throw new Error(`${merged}: the arithmetic was not rewritten`);
  if (b.start < a.end) throw new Error(`${second} is expected to follow ${first}`);
  return code.slice(0, a.start) + rewritten + code.slice(a.end, b.start) + code.slice(b.end);
}

/** Replace `from` with `to` in `text`, `count` times exactly, or fail: a transform that misses is a wrong one. */
export function replaceExactly(text, from, to, count = 1) {
  const pieces = text.split(from);
  if (pieces.length - 1 !== count) {
    throw new Error(`expected ${count} occurrence(s) of ${JSON.stringify(from.slice(0, 60))}, found ${pieces.length - 1}`);
  }
  return pieces.join(to);
}

/** Replace every match of a global regex, requiring at least one. */
export function replaceAll(text, pattern, to) {
  if (!pattern.test(text)) throw new Error(`no match for ${pattern}`);
  pattern.lastIndex = 0;
  return text.replace(pattern, to);
}
