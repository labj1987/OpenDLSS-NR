# Clone the pinned Filament release into third_party/filament (git-ignored) and apply third_party/filament.patch
# (per-object motion vectors, Vulkan interop hooks). Re-running keeps the checkout and re-checks the patch.
#   powershell -File scripts\fetch_filament.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$dir = Join-Path $root "third_party\filament"
$tag = "v1.77.0"
if (-not (Test-Path (Join-Path $dir "CMakeLists.txt"))) {
  # the tree has paths beyond MAX_PATH: core.longpaths must be on for the checkout to complete on Windows;
  # the patch is LF and applies to an LF working tree (no autocrlf conversion)
  git -c core.longpaths=true -c core.autocrlf=false clone --depth 1 --branch $tag https://github.com/google/filament.git $dir
  if ($LASTEXITCODE -ne 0) { throw "git clone filament failed" }
  git -C $dir config core.longpaths true
  git -C $dir config core.autocrlf false
}
$patch = Join-Path $root "third_party\filament.patch"
if (Test-Path $patch) {
  # One of the two checks fails by design (the patch applies one way only), and Windows PowerShell 5.1 turns a native
  # command's redirected stderr into an error that "Stop" makes terminating: the checks run with "Continue".
  $ErrorActionPreference = "Continue"
  git -C $dir apply --check $patch 2>$null
  $applies = $LASTEXITCODE -eq 0
  git -C $dir apply --check --reverse $patch 2>$null
  $applied = $LASTEXITCODE -eq 0
  $ErrorActionPreference = "Stop"
  if ($applies) {
    git -C $dir apply $patch
    if ($LASTEXITCODE -ne 0) { throw "patch failed" }
    Write-Host "patch applied"
  } elseif ($applied) {
    Write-Host "patch already applied"
  } else {
    throw "third_party/filament.patch does not apply cleanly to $tag (git -C $dir status)"
  }
}
Write-Host "Filament $tag ready at $dir"
