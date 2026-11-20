/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { test, expect } from '@playwright/test';

import { getOffsetByLocator, cssEscape } from '../utils';
import PageModel from './models';

const OFFSET = 10;

test.describe('test drag', () => {
  let editorPage: PageModel;

  test.beforeEach(async ({ page }) => {
    editorPage = new PageModel(page);
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('drag node', async ({ page }) => {
    // 获取 node
    const DRAG_NODE_ID = 'agent_0';
    const DRAG_TO_PORT_ID = 'switch_0';
    const agentLocator = await page.locator(`#${cssEscape(`$slotIcon$${DRAG_NODE_ID}`)}`);

    const fromOffset = await getOffsetByLocator(agentLocator);
    const from = {
      x: fromOffset.left + OFFSET,
      y: fromOffset.top + OFFSET,
    };

    const toLocator = await page.locator(`[data-from="${DRAG_TO_PORT_ID}"]`);
    const toOffset = await getOffsetByLocator(toLocator);

    const to = {
      x: toOffset.left,
      y: toOffset.top,
    };

    await editorPage.drag(from, to);
    await page.waitForTimeout(100);

    // 通过 data-to 判断是否移动成功
    const toLocator2 = await page.locator(`[data-from="${DRAG_TO_PORT_ID}"]`);
    const attribute = await toLocator2?.getAttribute('data-to');
    expect(attribute).toEqual(DRAG_NODE_ID);
  });

  test('drag branch', async ({ page }) => {
    const START_ID = 'case_0';
    const END_ID = 'case_default_1';
    const branchLocator = page.locator(`#${cssEscape(`$blockOrderIcon$${START_ID}`)}`);
    const fromOffset = await getOffsetByLocator(branchLocator);
    const from = {
      x: fromOffset.left + OFFSET,
      y: fromOffset.top + OFFSET,
    };
    const toBranchLocator = await page.locator(`#${cssEscape(`$blockOrderIcon$${END_ID}`)}`);
    const toOffset = await getOffsetByLocator(toBranchLocator);
    const to = {
      x: toOffset.left - OFFSET / 2,
      y: toOffset.top + OFFSET,
    };
    await editorPage.drag(from, to);
    await page.waitForTimeout(100);

    const fromOffset2 = await getOffsetByLocator(branchLocator);
    expect(fromOffset2.centerX).toBeGreaterThan(fromOffset.centerX);
  });
});
