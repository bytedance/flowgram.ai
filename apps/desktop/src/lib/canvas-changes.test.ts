/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { expect, it } from 'vitest';
import { canvasChanges } from './canvas-changes';
import type { WorkflowSchema } from './types';
it('updates just one nested node in a large mounted graph', () => {
  const graph: WorkflowSchema = {
    nodes: Array.from({ length: 200 }, (_, i) => ({
      id: `n${i}`,
      type: 'assign',
      data: { title: `Node ${i}` },
    })),
    edges: [],
  };
  graph.nodes[1] = {
    id: 'loop',
    type: 'loop',
    data: {},
    blocks: [{ id: 'child', type: 'llm', data: { prompt: 'Before' } }],
    edges: [],
  };
  const next = structuredClone(graph);
  next.nodes[1].blocks![0].data.prompt = 'After';
  expect(canvasChanges(graph, next)?.map((node) => node.id)).toEqual(['child']);
  expect(canvasChanges(graph, graph)).toEqual([]);
});
it('reconciles structural mutations separately from form and movement changes', () => {
  const graph: WorkflowSchema = { nodes: [{ id: 'a', type: 'assign', data: {} }], edges: [] };
  const moved = structuredClone(graph);
  moved.nodes[0].meta = { position: { x: 20, y: 50 } };
  expect(canvasChanges(graph, moved)?.map((n) => n.id)).toEqual(['a']);
  moved.nodes[0].type = 'llm';
  expect(canvasChanges(graph, moved)).toBeNull();
});
