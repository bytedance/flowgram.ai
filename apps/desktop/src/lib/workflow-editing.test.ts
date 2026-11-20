/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { randomUUID } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';

import { createNode } from './node-catalog';
import { copyNodes, deletionReason, insertNode, pasteNodes, removeNodes, selectionClosure } from './workflow-editing';
import type { WorkflowNode, WorkflowSchema } from './types';
vi.stubGlobal('crypto', { randomUUID });
const node = (id: string, type = 'text', data = {}): WorkflowNode => ({ id, type, data });
const ref = (id: string) => ({ type: 'ref', content: [id, 'result'] });

describe('workflow editing transactions', () => {
  it('copies complete fork regions, remaps pairs and retains only internal connections', () => {
    const graph: WorkflowSchema = { nodes: [node('start', 'start'),
      node('fork', 'control.parallel', { joinId: 'join', branches: [{ id: 'a', label: 'A' }] }),
      node('worker', 'text', { text: ref('start') }), node('join', 'control.join', { forkId: 'fork' }), node('end', 'end')],
      edges: [{ sourceNodeID: 'start', targetNodeID: 'fork' },
        { sourceNodeID: 'fork', sourcePortID: 'a', targetNodeID: 'worker' },
        { sourceNodeID: 'worker', targetNodeID: 'join', targetPortID: 'a' },
        { sourceNodeID: 'join', targetNodeID: 'end' }] };
    expect([...selectionClosure(graph, ['join'])].sort()).toEqual(['fork', 'join', 'worker']);
    const clipboard = copyNodes(graph, ['fork']);
    expect(clipboard.graph.edges).toHaveLength(2);
    const result = pasteNodes(graph, clipboard, {});
    const [fork, worker, join] = result.schema.nodes.slice(5);
    expect(fork.data.joinId).toBe(join.id);
    expect(join.data.forkId).toBe(fork.id);
    expect(worker.data.text).toEqual(ref('start'));
    expect(result.schema.edges[4].sourceNodeID).toBe(fork.id);
    expect(graph.nodes).toHaveLength(5);
  });
  it('remaps loop descendants, templates and references while preserving literal objects', () => {
    const loop = createNode('loop', 0);
    loop.blocks!.push(node('worker', 'template', {
      text: { type: 'template', content: `{{ ${loop.blocks![0].id}.item }}` },
      literal: { type: 'constant', content: ref(loop.blocks![0].id) },
    }));
    const graph = { nodes: [node('start', 'start'), loop], edges: [] };
    const copied = pasteNodes(graph, copyNodes(graph, [loop.id, 'worker']), {}).schema.nodes[2];
    expect(copied.blocks![0].id).not.toBe(loop.blocks![0].id);
    expect(copied.edges![0].sourceNodeID).toBe(copied.blocks![0].id);
    expect(JSON.stringify(copied.data.loopOutputs)).toContain(copied.blocks![1].id);
    expect(copied.blocks![2].data.text).toEqual({ type: 'template', content: `{{ ${copied.blocks![0].id}.item }}` });
    expect(copied.blocks![2].data.literal).toEqual(loop.blocks![2].data.literal);
  });
  it('protects boundaries and blocks deleting referenced nodes', () => {
    const graph = { nodes: [node('start', 'start'), node('a'), node('b', 'text', { value: ref('a') })], edges: [] };
    expect(deletionReason(graph, ['start'])).toContain('boundary');
    expect(() => removeNodes(graph, ['a'])).toThrow('still references');
    expect(removeNodes(graph, ['a', 'b']).nodes.map((n) => n.id)).toEqual(['start']);
  });
  it('does not treat literal objects as live references when deleting', () => {
    const graph = { nodes: [node('a'), node('b', 'text', { value: { type: 'constant', content: ref('a') } })], edges: [] };
    expect(removeNodes(graph, ['a']).nodes.map((n) => n.id)).toEqual(['b']);
  });
  it('inserts into the requested branch atomically, requiring an explicit ambiguous port', () => {
    const edge = { sourceNodeID: 'a', sourcePortID: 'else', targetNodeID: 'b', targetPortID: '' };
    const graph = { nodes: [node('a', 'condition', { conditions: [{ key: 'true' }] }), node('b')], edges: [edge] };
    expect(() => insertNode(graph, 'condition', { edge })).toThrow('output port');
    expect(graph.edges).toEqual([edge]);
    const result = insertNode(graph, 'condition', { edge }, { output: 'else' });
    expect(result.schema.edges).toContainEqual({ sourceNodeID: 'a', sourcePortID: 'else', targetNodeID: result.id, targetPortID: '' });
    expect(result.schema.edges).toContainEqual({ sourceNodeID: result.id, sourcePortID: 'else', targetNodeID: 'b', targetPortID: '' });
  });
  it('connects the matching join as the exit of an inserted fork', () => {
    const edge = { sourceNodeID: 'a', targetNodeID: 'b' };
    const result = insertNode({ nodes: [node('a'), node('b')], edges: [edge] }, 'control.parallel', { edge });
    const fork = result.schema.nodes.find((n) => n.id === result.id)!;
    expect(result.schema.edges.some((e) => e.sourceNodeID === fork.data.joinId && e.targetNodeID === 'b')).toBe(true);
  });
  it('adds inside explicitly chosen loop scopes and rejects stale scopes', () => {
    const loop = createNode('loop', 0);
    const graph = { nodes: [loop, node('a')], edges: [] };
    const result = insertNode(graph, 'text', { scopeId: loop.blocks![0].id });
    expect(result.schema.nodes).toHaveLength(2);
    expect(result.schema.nodes[0].blocks!.some((n) => n.id === result.id)).toBe(true);
    expect(() => insertNode(graph, 'text', { scopeId: 'deleted' })).toThrow('scope');
  });
  it('rejects cross-scope copy and stale insertion connections', () => {
    const loop = createNode('loop', 0);
    const graph = { nodes: [loop, node('a')], edges: [] };
    loop.blocks!.push(node('inner'));
    expect(() => copyNodes(graph, ['a', 'inner'])).toThrow();
    expect(() => insertNode(graph, 'text', { edge: { sourceNodeID: 'a', targetNodeID: loop.id } })).toThrow('connection');
  });
  it('splices a connected output instead of creating a second edge from the same port', () => {
    const graph = { nodes: [node('a'), node('b')], edges: [{ sourceNodeID: 'a', targetNodeID: 'b' }] };
    const result = insertNode(graph, 'text', { source: { nodeId: 'a', portId: '' } });
    expect(result.schema.edges).toHaveLength(2);
    expect(result.schema.edges.filter((edge) => edge.sourceNodeID === 'a')).toHaveLength(1);
    expect(result.schema.edges[0].targetNodeID).toBe(result.id);
    expect(result.schema.edges[1].targetNodeID).toBe('b');
  });
  it('does not transfer external references to another workflow or loop scope', () => {
    const loop = createNode('loop', 0);
    const graph = { nodes: [node('start', 'start'), node('a', 'text', { text: ref('start') }), loop], edges: [] };
    const clipboard = copyNodes(graph, ['a'], 'original');
    expect(() => pasteNodes(graph, clipboard, {}, 'other')).toThrow('different workflow or scope');
    expect(() => pasteNodes(graph, clipboard, { scopeId: loop.blocks![0].id }, 'original')).toThrow('different workflow or scope');
  });
  it('deletes a selected container with its selected boundary descendants as one operation', () => {
    const loop = createNode('loop', 0);
    const graph = { nodes: [node('start', 'start'), loop], edges: [] };
    expect(removeNodes(graph, [loop.id, loop.blocks![0].id]).nodes).toHaveLength(1);
  });
  it('requires paired joins and a loop scope for break/continue nodes', () => {
    const graph = { nodes: [node('start', 'start')], edges: [] };
    expect(() => insertNode(graph, 'control.join', {})).toThrow('matching fork');
    expect(() => insertNode(graph, 'control.break', {})).toThrow('inside a loop');
  });

  it('copies editable content when select-all also includes workflow boundaries', () => {
    const graph = { nodes: [node('start', 'start'), node('a'), node('end', 'end')],
      edges: [{ sourceNodeID: 'start', targetNodeID: 'a' }, { sourceNodeID: 'a', targetNodeID: 'end' }] };
    const clipboard = copyNodes(graph, ['start', 'a', 'end']);
    expect(clipboard.graph.nodes.map((item) => item.id)).toEqual(['a']);
    expect(clipboard.graph.edges).toEqual([]);
  });

  it('makes room downstream when an inserted node overlaps its target', () => {
    const edge = { sourceNodeID: 'a', targetNodeID: 'b' };
    const graph = { nodes: [
      { ...node('a'), meta: { position: { x: 0, y: 0 } } },
      { ...node('b'), meta: { position: { x: 400, y: 0 } } },
      { ...node('c'), meta: { position: { x: 800, y: 0 } } },
    ], edges: [edge, { sourceNodeID: 'b', targetNodeID: 'c' }] };
    const result = insertNode(graph, 'text', { edge, position: { x: 380, y: 0 } });
    expect(result.schema.nodes[0].meta?.position?.x).toBe(0);
    expect(result.schema.nodes[1].meta?.position?.x).toBe(740);
    expect(result.schema.nodes[2].meta?.position?.x).toBe(1140);
    expect(graph.nodes[1].meta?.position?.x).toBe(400);
  });

});
