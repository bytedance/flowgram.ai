/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  retries: 1,
  use: {
    baseURL: 'http://127.0.0.1:3100',
    headless: true,
    actionTimeout: 10 * 1000, // timeout for waitFor/click...
  },
  webServer: {
    // Start only this demo; Rush watchers can outlive the preceding suite.
    command: 'node node_modules/@rsbuild/core/bin/rsbuild.js dev --host 127.0.0.1 --port 3100',
    cwd: '../../apps/demo-fixed-layout',
    env: { MODE: 'app', NODE_ENV: 'development' },
    url: 'http://127.0.0.1:3100',
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
});
