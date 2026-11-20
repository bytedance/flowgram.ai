/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { test, expect } from '@playwright/test';

import PageModel from './models';

test.describe('test validate', () => {
  let editorPage: PageModel;

  test.beforeEach(async ({ page }) => {
    editorPage = new PageModel(page);
    await page.goto('/');
  });

  test('save', async ({ page }) => {
    const saveBtn = await page.getByText('Save');
    saveBtn.click();

    const badge = page.locator('span.semi-badge-danger');
    await expect(badge).toHaveText('2');
  });
});
