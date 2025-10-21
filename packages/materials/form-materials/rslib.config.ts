/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import path from 'path';

import { defineConfig } from '@rslib/core';
import { pluginReact } from '@rsbuild/plugin-react';

type RsbuildConfig = Parameters<typeof defineConfig>[0];

const commonConfig: Partial<RsbuildConfig> = {
  source: {
    entry: {
      index: ['./src/**/*.{ts,tsx,css}'],
    },
    exclude: [],
    decorators: {
      version: 'legacy',
    },
  },
  bundle: false,
  dts: {
    distPath: path.resolve(__dirname, './dist/types'),
    bundle: false,
    build: true,
  },
  tools: {},
};

const formats: Partial<RsbuildConfig>[] = [
  {
    format: 'esm',
    output: {
      distPath: {
        root: path.resolve(__dirname, './dist/esm'),
      },
    },
  },
  {
    dts: false,
    format: 'cjs',
    output: {
      distPath: {
        root: path.resolve(__dirname, './dist/cjs'),
      },
    },
  },
].map((r) => ({ ...commonConfig, ...r }));

export default defineConfig({
  lib: formats,
  output: {
    target: 'web',
    cleanDistPath: process.env.NODE_ENV === 'production',
  },
  plugins: [pluginReact({ swcReactOptions: {} })],
});
