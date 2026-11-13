/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { webcrypto } from 'node:crypto';

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { createNode, nodeCatalog } from '../../lib/node-catalog';
import { atomicNodes } from '../../lib/atomic-nodes';
import { testSample } from './test-samples';
import { asValue } from './model';
import { definitionFor, visibleFields } from './definitions';

describe('atomic capabilities in the desktop editor', () => {
  beforeAll(() => vi.stubGlobal('crypto', webcrypto));
  afterAll(() => vi.unstubAllGlobals());
  it('creates every advertised capability with its complete editable contract', () => {
    for (const definition of atomicNodes) {
      const node = createNode(definition.type, 0);
      expect(nodeCatalog.find((entry) => entry.type === definition.type)?.title).toBe(
        definition.title
      );
      expect(node.data).toMatchObject(definition.defaults);
      expect(definitionFor(node).fields).toEqual(definition.fields);
      // Template references use dot separators, so generated IDs must not contain dots.
      expect(node.id).not.toContain('.');
      expect(node.id).not.toBe(createNode(definition.type, 0).id);
      for (const field of definition.fields.filter((field) =>
        field.key.startsWith('inputsValues.')
      )) {
        const key = field.key.slice('inputsValues.'.length);
        expect(definition.inputSchema.properties).toHaveProperty(key);
      }
    }
  });
  it('changes only active fields and output contracts when an operation changes', () => {
    const node = createNode('text.transform', 0);
    const inputs = node.data.inputsValues as Record<string, unknown>;
    expect(visibleFields(node).map((field) => field.key)).toContain('inputsValues.text');
    expect(visibleFields(node).map((field) => field.key)).not.toContain('inputsValues.items');
    inputs.operation = { type: 'constant', content: 'split' };
    expect(definitionFor(node).output(node.data).properties).toHaveProperty('items');
    expect(visibleFields(node).map((field) => field.key)).toContain('inputsValues.maxItems');
    inputs.operation = { type: 'constant', content: 'join' };
    expect(visibleFields(node).map((field) => field.key)).not.toContain('inputsValues.text');
    expect(visibleFields(node).map((field) => field.key)).toContain('inputsValues.items');
    expect(definitionFor(node).output(node.data).properties).toHaveProperty('text');
    expect(asValue(inputs.text).content).toBe('');
  });
  it('keeps per-item rules and static ordered options out of early input resolution', () => {
    const filter = createNode('list.filter', 0);
    const mapping = createNode('list.map', 0);
    expect(definitionFor(filter).fields.find((field) => field.editor === 'predicate')?.key).toBe(
      'predicate'
    );
    expect(definitionFor(mapping).fields.find((field) => field.editor === 'mapping')?.scope).toBe(
      'items'
    );
    expect(filter.data.predicate).toMatchObject({ combinator: 'and' });
    expect(filter.data.inputsValues).not.toHaveProperty('predicate');
    expect(createNode('list.sort', 0).data.keys).toEqual([
      { path: '', direction: 'asc', nulls: 'last' },
    ]);
  });
  it('preserves null and empty values in samples and leaves unresolved references missing', () => {
    const node = createNode('data.map-fields', 0);
    node.data.inputsValues = {
      empty: { type: 'constant', content: '' },
      zero: { type: 'constant', content: 0 },
      no: { type: 'constant', content: false },
      nil: { type: 'constant', content: null },
      rows: { type: 'ref', content: ['start', 'items'] },
    };
    expect(testSample(node, {})).toEqual({ empty: '', zero: 0, no: false, nil: null });
    expect(testSample(node, { start: { items: [] } })).toEqual({
      empty: '',
      zero: 0,
      no: false,
      nil: null,
      rows: [],
    });
  });
});
