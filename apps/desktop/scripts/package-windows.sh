#!/usr/bin/env bash
# Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
# SPDX-License-Identifier: MIT
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)
worker=${FLOWGRAM_WINDOWS_BUILD_HOST:-devbox}
build_id=$(printf '%s' "$root" | shasum -a 256 | cut -c1-16)
remote="/tmp/flowgram-windows-$build_id"
output="$root/.flowgram-local/packages/windows"
cd "$root/apps/desktop"
node ../../common/scripts/install-run-rushx.js build
cd "$root"
ssh "$worker" "mkdir -p '$remote/source'"
# Transfer only build inputs; never copy application state, credentials or other targets.
rsync -azR --delete --exclude node_modules --exclude target --exclude binaries \
  --exclude gen --exclude __pycache__ --exclude '.env*' \
  .cargo/config.toml Cargo.toml Cargo.lock apps/desktop-backend/Cargo.toml \
  apps/desktop-backend/src apps/desktop-backend/catalog apps/desktop-backend/prompts \
  apps/desktop-backend/tests apps/desktop/src-tauri apps/desktop/dist \
  "$worker:$remote/source/"
ssh "$worker" bash -s -- "$remote" "${FLOWGRAM_WINDOWS_OFFLINE:-false}" <<'BUILD'
set -euo pipefail
build_root=$1
export CARGO_TARGET_DIR="$build_root/target"
export XWIN_CACHE_DIR="$build_root/xwin-cache"
export CARGO_BUILD_JOBS=4
export CARGO_NET_OFFLINE=$2
cd "$build_root/source"
command -v cargo-xwin
command -v llvm-rc
command -v makensis
cargo xwin build --locked --release --target x86_64-pc-windows-msvc \
  -p flowgram-desktop-backend
mkdir -p apps/desktop/src-tauri/binaries
for binary in flowgram-server flowgram-service; do
  cp "$CARGO_TARGET_DIR/x86_64-pc-windows-msvc/release/$binary.exe" \
    "apps/desktop/src-tauri/binaries/$binary-x86_64-pc-windows-msvc.exe"
done
cd apps/desktop
corepack pnpm dlx @tauri-apps/cli@2.12.3 build --runner cargo-xwin \
  --target x86_64-pc-windows-msvc --bundles nsis \
  --config '{"build":{"beforeBuildCommand":""}}'
BUILD
mkdir -p "$output"
rsync -az "$worker:$remote/target/x86_64-pc-windows-msvc/release/bundle/nsis/" "$output/"
find "$output" -maxdepth 1 -name '*.exe' -exec shasum -a 256 {} \;
echo "Windows installers: $output"
