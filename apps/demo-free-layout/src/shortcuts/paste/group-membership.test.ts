/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import type { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

import { generateUniqueWorkflow } from './unique-workflow';

describe('pasting groups inside a loop', () => {
  it('keeps group membership attached to the pasted nodes', () => {
    const json: WorkflowJSON = {
      nodes: [
        {
          id: 'loop',
          type: 'loop',
          meta: {},
          data: {},
          blocks: [
            {
              id: 'group',
              type: 'group',
              meta: {},
              data: { parentID: 'loop', blockIDs: ['child'] },
            },
            { id: 'child', type: 'llm', meta: {}, data: { title: 'child' } },
          ],
          edges: [{ sourceNodeID: 'child', targetNodeID: 'external' }],
        },
      ],
      edges: [],
    };
    const result = generateUniqueWorkflow({
      json,
      isUniqueId: (id) => !['loop', 'group', 'child'].includes(id),
    });
    const loop = result.nodes[0];
    const [group, child] = loop.blocks!;
    expect(loop.id).not.toBe('loop');
    expect(group.id).not.toBe('group');
    expect(child.id).not.toBe('child');
    expect(group.data.parentID).toBe(loop.id);
    expect(group.data.blockIDs).toEqual([child.id]);
    expect(child.data.title).toBe('child');
    expect(loop.edges![0]).toEqual({ sourceNodeID: child.id, targetNodeID: 'external' });
  });

  it('preserves external group parents, references and unrelated business data', () => {
    const json: WorkflowJSON = {
      nodes: [
        {
          id: 'group',
          type: 'group',
          meta: {},
          data: { parentID: 'root', blockIDs: ['external'] },
        },
        {
          id: 'child',
          type: 'custom',
          meta: {},
          data: { parentID: 'child', blockIDs: ['group'], title: 'group' },
        },
      ],
      edges: [],
    };
    const result = generateUniqueWorkflow({
      json,
      isUniqueId: (id) => !['group', 'child'].includes(id),
    });
    expect(result.nodes[0].data).toEqual({ parentID: 'root', blockIDs: ['external'] });
    expect(result.nodes[1].data).toEqual({
      parentID: 'child',
      blockIDs: ['group'],
      title: 'group',
    });
  });
});
