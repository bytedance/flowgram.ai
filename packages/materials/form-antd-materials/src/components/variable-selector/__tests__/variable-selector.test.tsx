/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import { VariableSelector } from '../index';

const { treeSelect } = vi.hoisted(() => ({ treeSelect: vi.fn((_props: any) => null) }));

vi.mock('../styles', () => ({ UITreeSelect: treeSelect }));
vi.mock('../use-variable-tree', () => ({
  useVariableTree: () => [
    {
      value: 'start_0',
      keyPath: ['start_0'],
      children: [{ value: 'start_0.user.name', keyPath: ['start_0', 'user.name'] }],
    },
  ],
}));

describe('VariableSelector', () => {
  it('displays a scalar value and returns the original path when selecting a nested variable', () => {
    const onChange = vi.fn();
    renderToStaticMarkup(<VariableSelector value={['start_0', 'user.name']} onChange={onChange} />);
    const props = treeSelect.mock.lastCall![0] as any;
    expect(props.value).toBe('start_0.user.name');
    props.onChange('start_0.user.name');
    expect(onChange).toHaveBeenCalledWith(['start_0', 'user.name']);
    props.onChange('start_0');
    expect(onChange).toHaveBeenLastCalledWith(['start_0']);
  });

  it('clears the variable reference', () => {
    const onChange = vi.fn();
    renderToStaticMarkup(<VariableSelector onChange={onChange} allowClear />);
    const props = treeSelect.mock.lastCall![0] as any;
    expect(props.value).toBeUndefined();
    props.onChange(undefined);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });
});
