/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import type { Workflow } from './types';
import { bindOperation, operationFromWorkflow, serviceExample } from './services';

const workflow = {
  id: 'workflow',
  schema: {
    nodes: [
      {
        id: 'start',
        type: 'start',
        data: {
          outputs: {
            type: 'object',
            properties: {
              endpoint: { type: 'string', default: 'local' },
              count: { type: 'integer', default: 0 },
            },
            required: ['endpoint'],
          },
        },
      },
      { id: 'end', type: 'end', data: {} },
    ],
    edges: [],
  },
} as unknown as Workflow;
describe('published operation contracts', () => {
  it('keeps deployment fields out of public examples and preserves the authored schema', () => {
    const operation = operationFromWorkflow(workflow);
    const bound = bindOperation(operation, { endpoint: 'businessApi' });
    expect(bound.inputSchema.properties).toEqual({ count: { type: 'integer', default: 0 } });
    expect(bound.inputSchema.required).toEqual([]);
    expect(serviceExample(bound.inputSchema)).toEqual({ count: 0 });
    expect(operation.inputSchema.required).toEqual(['endpoint']);
    expect(workflow.schema.nodes[0].data.outputs).toHaveProperty('properties.endpoint');
  });
  it('generates typed request examples without inventing optional fields', () => {
    expect(
      serviceExample({
        type: 'object',
        properties: {
          id: { type: 'string' },
          optional: { type: 'string' },
          active: { type: 'boolean', default: false },
        },
        required: ['id'],
      })
    ).toEqual({ id: '<value>', active: false });
  });
});
