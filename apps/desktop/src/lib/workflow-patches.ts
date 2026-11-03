/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { Workflow, WorkflowNode, WorkflowSchema } from './types';

type ObjectValue = Record<string, any>;
export interface WorkflowChange {
  changeId: string;
  baseRevision: number;
  revision: number;
  updatedAt: string;
  patch: Array<{
    path: string;
    before: unknown;
    after: unknown;
    hadBefore: boolean;
    hasAfter: boolean;
  }>;
}
export interface WorkflowChanges {
  changes: WorkflowChange[];
  revision: number;
  hasMore: boolean;
  requiresSnapshot: boolean;
}
function normalize(workflow: Workflow): ObjectValue {
  const { nodes, edges, ...extensions } = structuredClone(workflow.schema);
  const doc: ObjectValue = { name: workflow.name, nodes: {}, order: {}, edges: {}, extensions };
  function scope(id: string, nodes: WorkflowNode[], edges: WorkflowSchema['edges']) {
    doc.order[id] = nodes.map((n) => n.id);
    doc.edges[id] = edges;
    for (const { blocks, edges, ...node } of nodes) {
      doc.nodes[node.id] = { ...node, scopeId: id };
      if (blocks) scope(node.id, blocks, edges || []);
    }
  }
  scope('root', nodes, edges);
  return doc;
}
function schema(doc: ObjectValue): WorkflowSchema {
  function nodes(id: string): WorkflowNode[] {
    return doc.order[id].map((key: string) => {
      const { scopeId, ...node } = doc.nodes[key];
      if (doc.order[key]) {
        node.blocks = nodes(key);
        node.edges = doc.edges[key];
      }
      return node;
    });
  }
  return { ...doc.extensions, nodes: nodes('root'), edges: doc.edges.root };
}
/** Replay committed ID-based patches; reject gaps and stale before-values. */
export function applyWorkflowChanges(workflow: Workflow, changes: WorkflowChange[]): Workflow {
  let next = workflow;
  let doc: ObjectValue | undefined;
  for (const change of changes) {
    if (change.revision <= next.revision) continue;
    if (change.baseRevision !== next.revision) throw new Error('Workflow change history has a gap');
    doc ||= normalize(workflow);
    for (const part of change.patch) {
      const keys = part.path
        .slice(1)
        .split('/')
        .map((s) => s.replace(/~1/g, '/').replace(/~0/g, '~'));
      if (keys.some((k) => ['__proto__', 'prototype', 'constructor'].includes(k)))
        throw new Error('Invalid patch path');
      const key = keys.pop()!;
      let target = doc;
      for (const k of keys) {
        if (!target[k] || typeof target[k] !== 'object') throw new Error('Invalid patch parent');
        target = target[k];
      }
      const present = Object.hasOwn(target, key);
      if (present !== part.hadBefore || (present && !equal(target[key], part.before)))
        throw new Error('Workflow patch base differs');
      if (part.hasAfter) target[key] = structuredClone(part.after);
      else delete target[key];
    }
    next = {
      ...next,
      name: doc.name,
      schema: schema(doc),
      revision: change.revision,
      updatedAt: change.updatedAt,
    };
  }
  return next;
}
function equal(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const left = Object.keys(a),
    right = Object.keys(b);
  return (
    left.length === right.length &&
    left.every(
      (key) => Object.hasOwn(b, key) && equal((a as ObjectValue)[key], (b as ObjectValue)[key])
    )
  );
}
