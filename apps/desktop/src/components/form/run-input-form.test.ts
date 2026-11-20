/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import type { WorkflowSchema } from '../../lib/types';
import { defaultRunInputs, withRunDefaults } from './run-input-form';

describe('workflow run input contract', () => {
  it('uses typed schema defaults and preserves nested values without a fixed demo input', () => {
    const properties = {
      apiBase: { type: 'string', default: 'http://localhost' },
      count: { type: 'integer', default: 100 },
      items: { type: 'array', default: [{ id: 'one' }] },
      active: { type: 'boolean' },
      payload: { type: 'object' },
    };
    const schema = {
      nodes: [{ id: 'start', type: 'start', data: { outputs: { type: 'object', properties } } }],
      edges: [],
    } as unknown as WorkflowSchema;
    const result = defaultRunInputs(schema);
    expect(result).toEqual({
      apiBase: 'http://localhost',
      count: 100,
      items: [{ id: 'one' }],
      active: false,
      payload: {},
    });
    (result.items as unknown[]).push({ id: 'two' });
    expect(properties.items.default).toHaveLength(1);
  });
  it('does not invent a message field when the workflow declares no inputs', () => {
    expect(defaultRunInputs({ nodes: [], edges: [] })).toEqual({});
  });
});

describe('reopening run inputs', () => {
  const schema = {
    nodes: [
      {
        id: 'start',
        type: 'start',
        data: {
          outputs: {
            properties: {
              apiBase: { type: 'string', default: 'http://localhost' },
              count: { type: 'integer', default: 100 },
            },
          },
        },
      },
    ],
    edges: [],
  } as unknown as WorkflowSchema;
  it('fills new contract fields without discarding a user-edited zero or empty string', () => {
    expect(JSON.parse(withRunDefaults(schema, '{"count":0}'))).toEqual({
      apiBase: 'http://localhost',
      count: 0,
    });
    expect(JSON.parse(withRunDefaults(schema, '{"apiBase":"","count":5}'))).toEqual({
      apiBase: '',
      count: 5,
    });
  });
  it('keeps invalid advanced JSON drafts intact so the user can repair them', () => {
    expect(withRunDefaults(schema, '{')).toBe('{');
  });
});
