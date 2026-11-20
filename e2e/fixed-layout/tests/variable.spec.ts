/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { expect, test } from '@playwright/test';

import PageModel from './models';

test.describe('test variable', () => {
  let editorPage: PageModel;

  test.beforeEach(async ({ page }) => {
    editorPage = new PageModel(page);
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('test variable type', async ({ page }) => {
    const llmNode = page.locator('#llm_0');
    const trigger = llmNode.locator('.semi-icon-setting').first();
    await trigger.click();
    const selectionBefore = llmNode.locator('.semi-tree-option-level-2');
    await expect(selectionBefore).not.toBeVisible();

    const semiTreeWrapper = llmNode.locator('.semi-tree-wrapper');

    const dropdown = semiTreeWrapper.locator('.semi-tree-option-expand-icon').first();
    await dropdown.click({
      force: true,
    });

    const selection = llmNode.locator('.semi-tree-option-level-2');
    await expect(selection).toBeVisible({
      timeout: 10000,
    });
    const selectionCount = await selection.count();
    expect(selectionCount).toEqual(1);
  });
});
