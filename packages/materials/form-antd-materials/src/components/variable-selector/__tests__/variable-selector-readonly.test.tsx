/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import { VariableSelector } from '../index';

vi.mock('../use-variable-tree', () => ({
  useVariableTree: () => [{ value: 'total', title: 'Total', keyPath: ['total'] }],
}));

describe('VariableSelector readonly', () => {
  it.each([true, false])('sets the combobox disabled state when readonly is %s', (readonly) => {
    const markup = renderToStaticMarkup(
      <VariableSelector value={['total']} onChange={vi.fn()} readonly={readonly} allowClear />
    );
    const container = document.createElement('div');
    container.innerHTML = markup;

    expect(container.querySelector<HTMLInputElement>('input[role="combobox"]')?.disabled).toBe(
      readonly
    );
    expect(container.textContent).toContain('Total');
  });
});
