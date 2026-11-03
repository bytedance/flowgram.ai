/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { defineConfig } from 'tsup';

export default defineConfig({
  noExternal: ['quickjs-emscripten', 'quickjs-emscripten-core', '@jitl/quickjs-ffi-types'],
  external: [
    '@jitl/quickjs-wasmfile-release-sync',
    '@jitl/quickjs-wasmfile-debug-sync',
    '@jitl/quickjs-wasmfile-release-asyncify',
    '@jitl/quickjs-wasmfile-debug-asyncify',
  ],
});
