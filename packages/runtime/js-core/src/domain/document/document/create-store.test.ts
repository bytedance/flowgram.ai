/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { FlowGramNode, WorkflowPortType } from '@flowgram.ai/runtime-interface';

import { createStore } from './create-store';

describe('createStore', () => {
  it('should create an empty store', () => {
    const store = createStore({
      flattenSchema: { nodes: [], edges: [] },
      nodeBlocks: new Map(),
      nodeEdges: new Map(),
    });

    expect(store.nodes.size).toBe(1); // 只有 root 节点
    expect(store.edges.size).toBe(0);
    expect(store.ports.size).toBe(0);

    const rootNode = store.nodes.get(FlowGramNode.Root);
    expect(rootNode).toBeDefined();
    expect(rootNode?.type).toBe(FlowGramNode.Root);
    expect(rootNode?.position).toEqual({ x: 0, y: 0 });
  });

  it('should create store with nodes and edges', () => {
    const store = createStore({
      flattenSchema: {
        nodes: [
          {
            id: 'node1',
            type: 'TestNode',
            meta: { position: { x: 100, y: 100 } },
            data: {
              title: 'Test Node 1',
              inputsValues: { test: 'value' },
              inputs: ['input1'],
              outputs: ['output1'],
            },
          },
          {
            id: 'node2',
            type: 'TestNode',
            meta: { position: { x: 200, y: 200 } },
            data: {
              title: 'Test Node 2',
            },
          },
        ],
        edges: [
          {
            sourceNodeID: 'node1',
            targetNodeID: 'node2',
            sourcePortID: 'output1',
            targetPortID: 'input1',
          },
        ],
      },
      nodeBlocks: new Map([['root', ['node1', 'node2']]]),
      nodeEdges: new Map([['root', ['node1-node2']]]),
    });

    // 验证节点创建
    expect(store.nodes.size).toBe(3); // root + 2个测试节点
    const node1 = store.nodes.get('node1');
    expect(node1?.type).toBe('TestNode');
    expect(node1?.name).toBe('Test Node 1');
    expect(node1?.position).toEqual({ x: 100, y: 100 });
    expect(node1?.declare).toEqual({
      inputsValues: { test: 'value' },
      inputs: ['input1'],
      outputs: ['output1'],
    });

    // 验证边创建
    expect(store.edges.size).toBe(1);
    const edge = Array.from(store.edges.values())[0];
    expect(edge.from).toBe(node1);
    expect(edge.to).toBe(store.nodes.get('node2'));

    // 验证端口创建
    expect(store.ports.size).toBe(2); // 输入端口和输出端口
    expect(edge.fromPort.id).toBe('output1');
    expect(edge.fromPort.type).toBe(WorkflowPortType.Output);
    expect(edge.toPort.id).toBe('input1');
    expect(edge.toPort.type).toBe(WorkflowPortType.Input);

    // 验证节点关系
    const rootNode = store.nodes.get(FlowGramNode.Root);
    expect(rootNode?.children).toHaveLength(2);
    expect(node1?.parent).toBe(rootNode);
  });

  it('should throw error for invalid edge', () => {
    expect(() =>
      createStore({
        flattenSchema: {
          nodes: [],
          edges: [
            {
              sourceNodeID: 'nonexistent1',
              targetNodeID: 'nonexistent2',
            },
          ],
        },
        nodeBlocks: new Map(),
        nodeEdges: new Map(),
      })
    ).toThrow('Invalid edge schema ID');
  });
});
