/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { expect, test } from '@playwright/test';

import PageModel from './models';

test.describe('test testrun', () => {
  let editorPage: PageModel;

  test.beforeEach(async ({ page }) => {
    editorPage = new PageModel(page);
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('trigger testrun', async ({ page }) => {
    const runBtn = await page.getByText('Run');
    await runBtn.click();

    // 等待第一条 flowing line
    const hasAnimation = await page.$eval('[data-line-id="start_0"]', (el) => {
      const style = window.getComputedStyle(el);
      return style.animationName !== 'none';
    });

    expect(hasAnimation).toBe(true);

    await page.waitForFunction(() => {
      const start_line = document.querySelector('[data-line-id="start_0"]');
      const style = window.getComputedStyle(start_line!);
      return style.animationName === 'none';
    });
  });
});
