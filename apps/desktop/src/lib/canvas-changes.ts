/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { WorkflowNode, WorkflowSchema } from './types';
const signature = (value: unknown): string => JSON.stringify(value);
function topology(graph: WorkflowSchema): unknown {
  return {
    edges: graph.edges,
    nodes: graph.nodes.map((node): unknown => ({
      id: node.id,
      type: node.type,
      children: node.blocks ? topology({ nodes: node.blocks, edges: node.edges || [] }) : null,
    })),
  };
}
/** Parameter and position edits touch only changed entities in the mounted editor. */
export function canvasChanges(
  before: WorkflowSchema,
  after: WorkflowSchema
): WorkflowNode[] | null {
  if (signature(topology(before)) !== signature(topology(after))) return null;
  const changes: WorkflowNode[] = [];
  function visit(left: WorkflowNode[], right: WorkflowNode[]) {
    right.forEach((node, index) => {
      const previous = left[index];
      if (
        signature(previous.data) !== signature(node.data) ||
        signature(previous.meta) !== signature(node.meta)
      )
        changes.push(node);
      if (node.blocks) visit(previous.blocks || [], node.blocks);
    });
  }
  visit(before.nodes, after.nodes);
  return changes;
}
