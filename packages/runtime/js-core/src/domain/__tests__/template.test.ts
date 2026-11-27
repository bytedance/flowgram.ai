/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { WorkflowVariableType } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeState } from '../state';
import { WorkflowRuntimeVariableStore } from '../variable';

describe('WorkflowRuntimeState parseTemplate', () => {
  it.each([
    [WorkflowVariableType.Object, { name: 'Alice' }, '{"name":"Alice"}'],
    [WorkflowVariableType.Array, [{ id: 1 }, { id: 2 }], '[{"id":1},{"id":2}]'],
    [WorkflowVariableType.String, 'plain "text"', 'plain "text"'],
    [WorkflowVariableType.Number, 0, '0'],
    [WorkflowVariableType.Boolean, false, 'false'],
  ])('renders a %s variable', (type, value, expected) => {
    const store = new WorkflowRuntimeVariableStore();
    store.init();
    store.setVariable({ nodeID: 'start_0', key: 'data', value, type });
    const state = new WorkflowRuntimeState(store);

    const result = state.parseTemplate({ type: 'template', content: '{{start_0.data}}' });

    expect(result?.value).toBe(expected);
  });
});
