/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { test } from '@playwright/test';

test('page render test', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.gedit-playground-pipeline');
});
