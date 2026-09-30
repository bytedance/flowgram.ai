/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it, vi } from 'vitest';

vi.mock('nanoid', () => {
  let nextId = 100001;

  return {
    customAlphabet: () => () => String(nextId++),
  };
});

vi.mock('@flowgram.ai/form-materials', () => ({
  FlowValueUtils: {
    isRef: (value) => {
      if (!value || typeof value !== 'object') {
        return false;
      }

      return (
        value.type === 'ref' && Array.isArray(value.content) && typeof value.content[0] === 'string'
      );
    },
  },
}));

import { generateUniqueWorkflow } from './unique-workflow';

const clone = (value) => JSON.parse(JSON.stringify(value));

describe('generateUniqueWorkflow', () => {
  it('rewrites copied flow-value refs to the replaced node id', () => {
    const workflow = generateUniqueWorkflow({
      json: clone({
        nodes: [
          {
            id: 'start_0',
            type: 'start',
            meta: {},
            data: {},
          },
          {
            id: 'condition_0',
            type: 'condition',
            meta: {},
            data: {
              conditions: [
                {
                  key: 'if_0',
                  value: {
                    left: {
                      type: 'ref',
                      content: ['start_0', 'query'],
                    },
                    operator: 'contains',
                    right: {
                      type: 'constant',
                      content: 'hello',
                    },
                  },
                },
              ],
            },
          },
        ],
        edges: [],
      }),
      isUniqueId: (id) => !['start_0', 'condition_0'].includes(id),
    });

    expect(workflow.nodes[0].id).toBe('100001');
    expect(workflow.nodes[1].id).toBe('100002');
    expect(workflow.nodes[1].data.conditions[0].value.left.content).toEqual(['100001', 'query']);
  });

  it('keeps non-ref flow values unchanged when their content starts with a node id', () => {
    const workflow = generateUniqueWorkflow({
      json: clone({
        nodes: [
          {
            id: 'start_0',
            type: 'start',
            meta: {},
            data: {
              sample: {
                type: 'constant',
                content: ['start_0', 'query'],
              },
            },
          },
        ],
        edges: [],
      }),
      isUniqueId: (id) => id !== 'start_0',
    });

    expect(workflow.nodes[0].id).toBe('100003');
    expect(workflow.nodes[0].data.sample.content).toEqual(['start_0', 'query']);
  });
});
