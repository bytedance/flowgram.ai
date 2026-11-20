/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import type { WorkflowSchema } from '../../lib/types';
import {
  accessibleNodes,
  executionSignature,
  asValue,
  readPath,
  resolveSample,
  signature,
  writePath,
} from './model';

describe('node configuration values and scopes', () => {
  it('compares execution snapshots across serialization defaults without treating geometry as config', () => {
    const node = {
      id: 'n',
      type: 'text',
      data: { title: 'First', inputsValues: { text: { type: 'constant', content: 'a' } } },
      meta: { position: { x: 1, y: 2 } },
    };
    expect(executionSignature(node)).toBe(
      executionSignature({
        ...node,
        data: { ...node.data, title: 'Renamed' },
        meta: { position: { x: 20, y: 30 } },
        blocks: [],
        edges: [],
      })
    );
    expect(executionSignature(node)).not.toBe(
      executionSignature({
        ...node,
        data: { ...node.data, inputsValues: { text: { type: 'constant', content: 'b' } } },
      })
    );
  });

  it('preserves false, zero, null, literal keys and immutable nested writes', () => {
    for (const value of [false, 0, null, '']) expect(asValue(value).content).toBe(value);
    const original = { inputsValues: { flag: { type: 'constant', content: false } } };
    const next = writePath(original, ['inputsValues', 'count'], { type: 'constant', content: 0 });
    expect(original.inputsValues).not.toHaveProperty('count');
    expect(readPath(next, ['inputsValues', 'flag', 'content'])).toBe(false);
    expect(readPath({ 'a.b': { 'x/y': 0 } }, ['a.b', 'x/y'])).toBe(0);
    expect(
      resolveSample({ type: 'ref', content: ['entry', 'a.b'] }, { entry: { 'a.b': false } })
    ).toBe(false);
    expect(signature({ z: 0, a: false })).toBe(signature({ a: false, z: 0 }));
  });
  it('excludes self, downstream and mutually exclusive branch values after a join', () => {
    const schema: WorkflowSchema = {
      nodes: ['start', 'condition', 'yes', 'no', 'join', 'end'].map((id) => ({
        id,
        type: id === 'start' ? 'start' : 'assign',
        data: {},
      })),
      edges: [
        ['start', 'condition'],
        ['condition', 'yes'],
        ['condition', 'no'],
        ['yes', 'join'],
        ['no', 'join'],
        ['join', 'end'],
      ].map(([sourceNodeID, targetNodeID]) => ({ sourceNodeID, targetNodeID })),
    };
    expect(accessibleNodes(schema, 'join').map((n) => n.id)).toEqual(['start', 'condition']);
    expect(accessibleNodes(schema, 'yes').map((n) => n.id)).toEqual(['start', 'condition']);
    expect(accessibleNodes(schema, 'end').map((n) => n.id)).toEqual(['start', 'condition', 'join']);
  });
  it('includes parent inputs and local iteration variables without leaking the container output', () => {
    const schema: WorkflowSchema = {
      nodes: [
        { id: 'start', type: 'start', data: {} },
        {
          id: 'loop',
          type: 'loop',
          data: {},
          blocks: [
            { id: 'item', type: 'block-start', data: {} },
            { id: 'transform', type: 'text', data: {} },
            { id: 'return', type: 'block-end', data: {} },
          ],
          edges: [
            { sourceNodeID: 'item', targetNodeID: 'transform' },
            { sourceNodeID: 'transform', targetNodeID: 'return' },
          ],
        },
        { id: 'end', type: 'end', data: {} },
      ],
      edges: [
        { sourceNodeID: 'start', targetNodeID: 'loop' },
        { sourceNodeID: 'loop', targetNodeID: 'end' },
      ],
    };
    expect(accessibleNodes(schema, 'transform').map((n) => n.id)).toEqual([
      'start',
      'loop_locals',
      'item',
    ]);
    expect(accessibleNodes(schema, 'return').map((n) => n.id)).toEqual([
      'start',
      'loop_locals',
      'item',
      'transform',
    ]);
  });
});
