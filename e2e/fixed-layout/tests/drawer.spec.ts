/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { test, expect } from '@playwright/test';

test.describe('test llm drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sync data', async ({ page }) => {
    const llmNode = page.locator('#llm_0');
    // Open the drawer from the node title, away from the inline form controls.
    await llmNode.getByText('LLM', { exact: true }).click();

    const drawer = page.locator('.gedit-flow-panel-wrap');
    await expect(drawer).toBeVisible();

    await drawer.locator('input').first().fill('123');
    await expect(llmNode.locator('input').first()).toHaveValue('123');
  });
});
