/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it } from 'vitest';
import { WorkflowVariableType } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeState } from './index';
import { WorkflowRuntimeVariableStore } from '../variable/variable-store';

describe('WorkflowRuntimeState', () => {
  describe('parseInputs', () => {
    let variableStore: WorkflowRuntimeVariableStore;
    let state: WorkflowRuntimeState;

    beforeEach(() => {
      variableStore = new WorkflowRuntimeVariableStore();
      variableStore.init();
      state = new WorkflowRuntimeState(variableStore);
    });

    // A nested path is the only case where the type of the reference is inferred
    // from the runtime value instead of being taken from the declared schema, so
    // this is where a misclassified value silently disappears from the inputs.
    const setOutputs = (dateTimeValue: string): void => {
      variableStore.setVariable({
        nodeID: 'code_0',
        key: 'payload',
        value: { when: dateTimeValue },
        type: WorkflowVariableType.Object,
      });
    };

    const parse = () =>
      state.parseInputs({
        values: {
          when: { type: 'ref', content: ['code_0', 'payload', 'when'] },
        },
        declare: {
          type: 'object',
          properties: { when: { type: 'date-time' } },
        },
      });

    it('should keep a nested date-time reference that carries a UTC offset', () => {
      setOutputs('2025-09-11T12:05:49+08:00');

      expect(parse()).toEqual({ when: '2025-09-11T12:05:49+08:00' });
    });

    it('should keep a nested date-time reference that carries a negative offset', () => {
      setOutputs('2025-09-11T12:05:49-05:00');

      expect(parse()).toEqual({ when: '2025-09-11T12:05:49-05:00' });
    });

    it('should keep a nested date-time reference that ends with Z', () => {
      setOutputs('2025-09-11T12:05:49.000Z');

      expect(parse()).toEqual({ when: '2025-09-11T12:05:49.000Z' });
    });

    it('should still drop a nested value that does not match the declared type', () => {
      setOutputs('not-a-date');

      expect(parse()).toEqual({});
    });
  });
});
