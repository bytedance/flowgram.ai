/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';
import { rebaseWorkflow } from './workflow-rebase';
import type { WorkflowSchema } from './types';
const base = (): WorkflowSchema => ({
  nodes: [
    { id: 'start', type: 'start', data: {} },
    {
      id: 'a',
      type: 'llm',
      data: { title: 'A', prompt: 'Before', extension: 42 },
      meta: { position: { x: 300, y: 0 } },
    },
    { id: 'end', type: 'end', data: {} },
  ],
  edges: [
    { sourceNodeID: 'start', targetNodeID: 'a' },
    { sourceNodeID: 'a', targetNodeID: 'end' },
  ],
});
describe('remote workflow changes and local drafts', () => {
  it('merges separate fields of one node while preserving local canvas positions', () => {
    const original = base(),
      local = base(),
      remote = base();
    local.nodes[1].meta!.position = { x: 430, y: 80 };
    remote.nodes[1].data.prompt = 'Remote prompt';
    const result = rebaseWorkflow(original, local, remote);
    expect(result.conflicts).toEqual([]);
    expect(result.schema.nodes[1].meta).toEqual(local.nodes[1].meta);
    expect(result.schema.nodes[1].data).toEqual({
      title: 'A',
      prompt: 'Remote prompt',
      extension: 42,
    });
  });
  it('retains inserted remote nodes and unrelated local node edits', () => {
    const original = base(),
      local = base(),
      remote = base();
    local.nodes[1].data.title = 'Local name';
    remote.nodes.splice(1, 0, { id: 'new', type: 'assign', data: {} });
    remote.edges = [
      { sourceNodeID: 'start', targetNodeID: 'new' },
      { sourceNodeID: 'new', targetNodeID: 'a' },
      remote.edges[1],
    ];
    const result = rebaseWorkflow(original, local, remote);
    expect(result.conflicts).toEqual([]);
    expect(result.schema.nodes.map((n) => n.id)).toEqual(['start', 'new', 'a', 'end']);
    expect(result.schema.nodes.find((n) => n.id === 'a')?.data.title).toBe('Local name');
    expect(result.schema.edges).toEqual(remote.edges);
  });
  it('never overwrites an overlapping prompt draft', () => {
    const original = base(),
      local = base(),
      remote = base();
    local.nodes[1].data.prompt = 'Local draft';
    remote.nodes[1].data.prompt = 'Remote draft';
    const result = rebaseWorkflow(original, local, remote);
    expect(result.conflicts).toContain('/nodes/a/data/prompt');
    expect(result.schema).toBe(local);
  });
  it('distinguishes deletion from null and keeps independent extensions', () => {
    const original = base(),
      local = base(),
      remote = base();
    delete local.nodes[1].data.extension;
    remote.nodes[1].data.prompt = null;
    const result = rebaseWorkflow(original, local, remote);
    expect(result.conflicts).toEqual([]);
    expect(result.schema.nodes[1].data).toEqual({ title: 'A', prompt: null });
  });
  it('reports a deleted node that still has a local edit', () => {
    const original = base(),
      local = base(),
      remote = base();
    local.nodes[1].data.title = 'Unsaved';
    remote.nodes.splice(1, 1);
    expect(rebaseWorkflow(original, local, remote).schema).toBe(local);
    expect(rebaseWorkflow(original, local, remote).conflicts).toContain('/nodes/a');
  });
  it('rejects competing connections from the same static output port', () => {
    const original = base(),
      local = base(),
      remote = base();
    local.edges[0] = { sourceNodeID: 'start', targetNodeID: 'end' };
    remote.edges[0] = { sourceNodeID: 'start', targetNodeID: 'other' };
    expect(rebaseWorkflow(original, local, remote).conflicts).toContain('/edges/sourcePort');
  });
  it('merges inside a loop without replacing its sibling scope', () => {
    const original = base();
    original.nodes[1] = {
      id: 'loop',
      type: 'loop',
      data: {},
      blocks: base().nodes,
      edges: base().edges,
    };
    const local = structuredClone(original),
      remote = structuredClone(original);
    local.nodes[0].data.title = 'Local input';
    remote.nodes[1].blocks![1].data.prompt = 'Loop prompt';
    const result = rebaseWorkflow(original, local, remote);
    expect(result.conflicts).toEqual([]);
    expect(result.schema.nodes[0].data.title).toBe('Local input');
    expect(result.schema.nodes[1].blocks![1].data.prompt).toBe('Loop prompt');
  });
});

it('resolves one overlapping field without losing unrelated changes on either side', () => {
  const original = base(),
    local = base(),
    remote = base();
  local.nodes[1].data.prompt = 'Local draft';
  local.nodes[1].meta!.position = { x: 440, y: 90 };
  remote.nodes[1].data.prompt = 'Remote draft';
  remote.nodes[1].data.description = 'Remote description';
  const conflict = rebaseWorkflow(original, local, remote);
  expect(conflict.details[0]).toMatchObject({
    path: '/nodes/a/data/prompt',
    local: 'Local draft',
    remote: 'Remote draft',
  });
  const resolved = rebaseWorkflow(original, local, remote, { '/nodes/a/data/prompt': 'local' });
  expect(resolved.conflicts).toEqual([]);
  expect(resolved.schema.nodes[1].data).toMatchObject({
    prompt: 'Local draft',
    description: 'Remote description',
  });
  expect(resolved.schema.nodes[1].meta).toEqual(local.nodes[1].meta);
  expect(
    rebaseWorkflow(original, local, remote, { '/nodes/a/data/prompt': 'remote' }).schema.nodes[1]
      .data.prompt
  ).toBe('Remote draft');
});
it('escapes stable identities in conflict paths', () => {
  const original = base();
  original.nodes[1].id = 'a/b';
  const local = structuredClone(original),
    remote = structuredClone(original);
  local.nodes[1].data.prompt = 'Local';
  remote.nodes[1].data.prompt = 'Remote';
  expect(rebaseWorkflow(original, local, remote).conflicts).toContain('/nodes/a~1b/data/prompt');
});
