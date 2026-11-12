/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowNodeSchema, WorkflowSchema, FlowGramNode } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeEdge } from '../entity';

export interface FlattenData {
  flattenSchema: WorkflowSchema;
  nodeBlocks: Map<string, string[]>;
  nodeEdges: Map<string, string[]>;
}

type FlatSchema = (json: Partial<WorkflowSchema>) => FlattenData;

const flatLayer = (data: FlattenData, nodeSchema: WorkflowNodeSchema) => {
  const { blocks, edges } = nodeSchema;
  if (blocks) {
    // Remove nested topology from runtime copies, not the caller's schema.
    const flatBlocks = blocks.map((block) => ({ ...block }));
    data.flattenSchema.nodes.push(...flatBlocks);
    const blockIDs: string[] = [];
    flatBlocks.forEach((block) => {
      blockIDs.push(block.id);
      // 递归处理子节点的 blocks 和 edges
      if (block.blocks) {
        flatLayer(data, block);
      }
    });
    data.nodeBlocks.set(nodeSchema.id, blockIDs);
    delete nodeSchema.blocks;
  }
  if (edges) {
    data.flattenSchema.edges.push(...edges);
    const edgeIDs: string[] = [];
    edges.forEach((edge) => {
      const edgeID = WorkflowRuntimeEdge.createID(edge);
      edgeIDs.push(edgeID);
    });
    data.nodeEdges.set(nodeSchema.id, edgeIDs);
    delete nodeSchema.edges;
  }
};

/**
 * flat the tree json structure, extract the structure information to map
 */
export const flatSchema: FlatSchema = (schema = { nodes: [], edges: [] }) => {
  const rootNodes = schema.nodes ?? [];
  const rootEdges = schema.edges ?? [];

  const data: FlattenData = {
    flattenSchema: {
      nodes: [],
      edges: [],
    },
    nodeBlocks: new Map(),
    nodeEdges: new Map(),
  };

  const root: WorkflowNodeSchema = {
    id: FlowGramNode.Root,
    type: FlowGramNode.Root,
    blocks: rootNodes,
    edges: rootEdges,
    meta: {
      position: {
        x: 0,
        y: 0,
      },
    },
    data: {},
  };

  flatLayer(data, root);

  return data;
};
