// Writes web/fixtures/numerics.bin: the answers the Vulkan implementation's own CPU reference gives for the
// scalar arithmetic the port has to reproduce. web/selftest.html checks src/numerics.js and
// shaders/numerics.wgsl against this file, so neither side of the port is ever validated only against the
// other. Build it against the repository root:
//
//   cl /nologo /std:c++20 /EHsc /O2 /DNOMINMAX /DWIN32_LEAN_AND_MEAN /D_CRT_SECURE_NO_WARNINGS ^
//      /DVK_ENABLE_BETA_EXTENSIONS /I tools\Vulkan-Headers\include /I tools\volk /I src ^
//      ports\browser-webgpu\tools\dump_numerics.cpp /Fe:build\dump_numerics.exe
//
// or on Linux, after scripts/fetch_tools.sh:
//
//   g++ -std=c++20 -O2 -DVK_ENABLE_BETA_EXTENSIONS -I tools/Vulkan-Headers/include -I tools/volk -I src \
//      ports/browser-webgpu/tools/dump_numerics.cpp -o build/dump_numerics
//
// then run it from the repository root. Only the scalar entry points are used, so nothing links against
// Vulkan; the unreferenced parts of reference.cpp are discarded.
//
// Inputs are not stored. Both sides draw them from the same 32-bit xorshift, so the file holds results only.

#include <cstdint>
#include <cstdio>
#include <cstring>
#include <string>
#include <vector>

#include "numeric.h"
#include "reference.cpp"

// reference.cpp's GEMM helpers are not used here, but the linker resolves their symbols before it discards
// them. Defining the two weight-layout functions keeps this tool from having to pull in the model loader and,
// through it, Vulkan.
namespace nr {
uint32_t packedInputIndex(uint32_t) { std::abort(); }
uint32_t packedWeightIndex(uint32_t, uint32_t, uint32_t) { std::abort(); }
}  // namespace nr

namespace {

struct Xorshift {
  uint32_t state;
  uint32_t next() {
    state ^= state << 13;
    state ^= state >> 17;
    state ^= state << 5;
    return state;
  }
};

// Non-finite operands take separate, explicitly listed paths in the kernels; the random cases stay finite so
// that a mismatch here always means the finite arithmetic disagrees.
uint16_t finiteHalf(uint32_t draw) {
  uint16_t bits = (uint16_t)(draw & 0xffff);
  if ((bits & 0x7c00) == 0x7c00) bits &= (uint16_t)0x7bff;
  return bits;
}

// The E4M3 decode as the kernels perform it (shaders/common.glsl e4m3ToF32), which is what the port has to
// reproduce. It differs from the host-side helper in src/numeric.h at exactly one code: 0x7f/0xff reads as a
// signed zero here and as NaN there. Neither the activations nor the weights ever hold that code - a NaN
// publishes as +0 - so the two have never had the chance to disagree, and the port follows the kernels.
float shaderE4m3ToF32(uint8_t byte) {
  bool negative = (byte & 0x80) != 0;
  uint32_t exponent = (byte >> 3) & 0x0f;
  uint32_t mantissa = byte & 0x07;
  float value;
  if (exponent == 0) value = (float)mantissa * 0.001953125f;
  else if (exponent == 15 && mantissa == 7) value = 0.0f;
  else value = (1.0f + (float)mantissa * 0.125f) * num::f32FromBits((exponent + 120u) << 23u);
  return negative ? -value : value;
}

struct Section {
  char tag[5];
  std::vector<uint8_t> data;
};

std::vector<Section> sections;

void put(const char* tag, const void* data, size_t bytes) {
  Section section{};
  memcpy(section.tag, tag, 4);
  section.data.resize(bytes);
  memcpy(section.data.data(), data, bytes);
  sections.push_back(std::move(section));
  printf("  %s %zu bytes\n", tag, bytes);
}

const uint32_t kF16BitsCases = 32768;
const uint32_t kFp8Cases = 16384;
const uint32_t kF16Cases = 16384;

}  // namespace

int main() {
  printf("dumping numerics fixture\n");

  // f16Bits over arbitrary f32 bit patterns: the publication every kernel ends with, over the whole domain a
  // fixed-point sum can land in rather than only over values that are already halves.
  {
    Xorshift rng{0x9e3779b9u};
    std::vector<uint16_t> out(kF16BitsCases);
    for (uint32_t i = 0; i < kF16BitsCases; ++i) out[i] = num::f16Bits(num::f32FromBits(rng.next()));
    put("F16B", out.data(), out.size() * 2);
  }

  // The E4M3 publication over every half, and the decode over every byte.
  {
    std::vector<uint8_t> out(65536);
    for (uint32_t bits = 0; bits < 65536; ++bits) out[bits] = num::e4m3FromF16Bits((uint16_t)bits);
    put("E4EN", out.data(), out.size());
  }
  {
    std::vector<uint32_t> out(256);
    for (uint32_t byte = 0; byte < 256; ++byte) out[byte] = num::f32Bits(shaderE4m3ToF32((uint8_t)byte));
    put("E4DE", out.data(), out.size() * 4);
  }

  // The activation and the window exponential, over every half input.
  {
    std::vector<uint16_t> silu(65536), window(65536);
    for (uint32_t bits = 0; bits < 65536; ++bits) {
      float value = num::f16ToF32((uint16_t)bits);
      silu[bits] = num::f16Bits(ref::mpCubicSilu(value));
      window[bits] = num::f16Bits(ref::expWeight(value));
    }
    put("SILU", silu.data(), silu.size() * 2);
    put("EXPW", window.data(), window.size() * 2);
  }

  // The FP8 tensor-core step: 16 E4M3 products against a half accumulator.
  {
    Xorshift rng{0x85ebca6bu};
    std::vector<uint16_t> out(kFp8Cases);
    for (uint32_t c = 0; c < kFp8Cases; ++c) {
      float a[16], b[16];
      for (int i = 0; i < 16; ++i) a[i] = shaderE4m3ToF32((uint8_t)(rng.next() & 0xff));
      for (int i = 0; i < 16; ++i) b[i] = shaderE4m3ToF32((uint8_t)(rng.next() & 0xff));
      float accumulator = num::f16ToF32(finiteHalf(rng.next()));
      out[c] = num::f16Bits(ref::adaFp8Fdpa16(a, b, 16, accumulator));
    }
    put("FDP8", out.data(), out.size() * 2);
  }

  // The f16 step: 8 half products against 24 fractional bits.
  {
    Xorshift rng{0xc2b2ae35u};
    std::vector<uint16_t> out(kF16Cases);
    for (uint32_t c = 0; c < kF16Cases; ++c) {
      float a[8], b[8];
      for (int i = 0; i < 8; ++i) a[i] = num::f16ToF32(finiteHalf(rng.next()));
      for (int i = 0; i < 8; ++i) b[i] = num::f16ToF32(finiteHalf(rng.next()));
      float accumulator = num::f16ToF32(finiteHalf(rng.next()));
      out[c] = num::f16Bits(ref::adaF16Fdpa8(a, b, 8, accumulator));
    }
    put("FD16", out.data(), out.size() * 2);
  }

  // The same two instructions on RTX Blackwell: one fused step over all 32 E4M3 or 16 half products, F=25.
  {
    Xorshift rng{0x27d4eb2fu};
    std::vector<uint16_t> out(kFp8Cases);
    for (uint32_t c = 0; c < kFp8Cases; ++c) {
      float a[32], b[32];
      for (int i = 0; i < 32; ++i) a[i] = shaderE4m3ToF32((uint8_t)(rng.next() & 0xff));
      for (int i = 0; i < 32; ++i) b[i] = shaderE4m3ToF32((uint8_t)(rng.next() & 0xff));
      float accumulator = num::f16ToF32(finiteHalf(rng.next()));
      out[c] = num::f16Bits(ref::blackwellFda(a, b, 32, accumulator, true));
    }
    put("BWF8", out.data(), out.size() * 2);
  }
  {
    Xorshift rng{0x165667b1u};
    std::vector<uint16_t> out(kF16Cases);
    for (uint32_t c = 0; c < kF16Cases; ++c) {
      float a[16], b[16];
      for (int i = 0; i < 16; ++i) a[i] = num::f16ToF32(finiteHalf(rng.next()));
      for (int i = 0; i < 16; ++i) b[i] = num::f16ToF32(finiteHalf(rng.next()));
      float accumulator = num::f16ToF32(finiteHalf(rng.next()));
      out[c] = num::f16Bits(ref::blackwellFda(a, b, 16, accumulator, false));
    }
    put("BW16", out.data(), out.size() * 2);
  }

  std::string path = "ports/browser-webgpu/web/fixtures/numerics.bin";
  FILE* file = fopen(path.c_str(), "wb");
  if (!file) { fprintf(stderr, "cannot open %s\n", path.c_str()); return 1; }
  const char magic[8] = {'N', 'R', 'N', 'U', 'M', '0', '0', '1'};
  fwrite(magic, 1, 8, file);
  uint32_t count = (uint32_t)sections.size();
  fwrite(&count, 4, 1, file);
  for (const Section& section : sections) {
    fwrite(section.tag, 1, 4, file);
    uint32_t length = (uint32_t)section.data.size();
    fwrite(&length, 4, 1, file);
    fwrite(section.data.data(), 1, section.data.size(), file);
  }
  fclose(file);
  printf("wrote %s\n", path.c_str());
  return 0;
}
