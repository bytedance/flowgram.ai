/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowEdgeJSON, WorkflowNodeJSON } from '@flowgram.ai/free-layout-editor';

export const insertNodesInEdges = (
  insertNodes: WorkflowNodeJSON[],
  insertInEdges: WorkflowEdgeJSON[]
) => {
  const newEdges = insertNodes.flatMap((_node, idx) => {
    const before = insertNodes[idx - 1];
    const next = insertNodes[idx + 1];

    if (!before) {
      return [...insertInEdges.map((edge) => ({ ...edge, targetNodeID: _node.id }))];
    }
    const beforeEdge = { sourceNodeID: before.id, targetNodeID: _node.id };

    return [
      beforeEdge,
      ...(next ? [] : [...insertInEdges.map((edge) => ({ ...edge, sourceNodeID: _node.id }))]),
    ];
  });

  return { newEdges };
};
