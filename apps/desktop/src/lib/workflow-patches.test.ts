/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';
import { applyWorkflowChanges, type WorkflowChange } from './workflow-patches';
import type { Workflow } from './types';
const base: Workflow = {
  id: 'w',
  projectId: 'p',
  revision: 1,
  name: 'Flow',
  updatedAt: '',
  schema: {
    nodes: [
      {
        id: 'loop',
        type: 'loop',
        data: {},
        blocks: [{ id: 'a/b', type: 'assign', data: { title: 'Before', extension: true } }],
        edges: [],
      },
    ],
    edges: [],
  },
};
const change: WorkflowChange = {
  changeId: 'c',
  baseRevision: 1,
  revision: 2,
  updatedAt: 'now',
  patch: [
    {
      path: '/nodes/a~1b/data/title',
      before: 'Before',
      after: 'After',
      hadBefore: true,
      hasAfter: true,
    },
  ],
};
describe('committed workflow patches', () => {
  it('applies nested ID paths without dropping extensions or changing its input', () => {
    const next = applyWorkflowChanges(base, [change]);
    expect(next.schema.nodes[0].blocks![0].data).toEqual({ title: 'After', extension: true });
    expect(base.schema.nodes[0].blocks![0].data.title).toBe('Before');
    expect(next.revision).toBe(2);
    expect(applyWorkflowChanges(next, [change])).toBe(next);
  });
  it('rejects gaps and changed bases instead of overwriting them', () => {
    expect(() => applyWorkflowChanges(base, [{ ...change, baseRevision: 2, revision: 3 }])).toThrow(
      'gap'
    );
    expect(() =>
      applyWorkflowChanges(base, [{ ...change, patch: [{ ...change.patch[0], before: 'Other' }] }])
    ).toThrow('base differs');
  });
  it('replays structural changes and preserves container scopes', () => {
    const next = applyWorkflowChanges(base, [
      {
        ...change,
        patch: [
          {
            path: '/nodes/b',
            before: null,
            after: { id: 'b', type: 'assign', data: {}, scopeId: 'loop' },
            hadBefore: false,
            hasAfter: true,
          },
          {
            path: '/order/loop',
            before: ['a/b'],
            after: ['a/b', 'b'],
            hadBefore: true,
            hasAfter: true,
          },
        ],
      },
    ]);
    expect(next.schema.nodes[0].blocks!.map((n) => n.id)).toEqual(['a/b', 'b']);
    expect(next.schema.nodes[0].blocks![1]).not.toHaveProperty('scopeId');
  });
});
