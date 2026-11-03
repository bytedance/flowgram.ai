/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import buildConfig from '../../../tsup.config';

describe('published QuickJS dependencies', () => {
  it('declares every external WASM variant at the bundled SDK version', () => {
    const { dependencies } = JSON.parse(
      readFileSync(new URL('../../../package.json', import.meta.url), 'utf8')
    );
    if (typeof buildConfig === 'function' || Array.isArray(buildConfig)) {
      throw new Error('Expected a single runtime build configuration');
    }
    const variants = (buildConfig.external ?? []).filter(
      (name): name is string =>
        typeof name === 'string' && name.startsWith('@jitl/quickjs-wasmfile-')
    );

    expect(dependencies['quickjs-emscripten']).toMatch(/^\d+\.\d+\.\d+$/);
    expect(variants).toHaveLength(4);
    for (const variant of variants) {
      expect(dependencies[variant], variant).toBe(dependencies['quickjs-emscripten']);
    }
  });
});
