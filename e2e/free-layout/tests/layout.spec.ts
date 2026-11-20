/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { test } from '@playwright/test';

// ensure layout render
test.describe('page render screen shot', () => {
  test('screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.gedit-playground-pipeline');
  });
});
