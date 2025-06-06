import { test, expect } from '@playwright/test';

import PageModel from './models';

test.describe('node operations', () => {
  let editorPage: PageModel;

  test.beforeEach(async ({ page }) => {
    editorPage = new PageModel(page);
    await page.goto('http://localhost:3000');
  });

  test('node preview', async () => {
    const startCount = await editorPage.isStartNodeExist();
    const endCount = await editorPage.isEndNodeExist();
    const conditionCount = await editorPage.isConditionNodeExist();
    expect(startCount).toEqual(1);
    expect(endCount).toEqual(1);
    expect(conditionCount).toEqual(1);
  });

  test('add node', async () => {
    const prevCount = await editorPage.getNodeCount();
    await editorPage.insert('switch', {
      from: 'llm_0',
      to: 'switch_0',
    });
    const defaultNodeCount = await editorPage.getNodeCount();
    expect(defaultNodeCount).toEqual(prevCount + 4);
  });
});
