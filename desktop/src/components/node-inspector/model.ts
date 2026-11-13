/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNode, WorkflowSchema } from '../../lib/types';
import { tx } from '../../lib/i18n';

export type Data = Record<string, unknown>;
export type FlowValue = { type: 'constant' | 'ref' | 'template' | 'expression'; content: unknown };
export interface Schema {
  type?: string;
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  description?: string;
}
export function asValue(value: unknown): FlowValue {
  if (
    value &&
    typeof value === 'object' &&
    'type' in value &&
    ['constant', 'ref', 'template', 'expression'].includes(String(value.type))
  )
    return value as FlowValue;
  return { type: 'constant', content: value };
}
export function readPath(value: unknown, path: string[]): unknown {
  return path.reduce<unknown>(
    (item, key) => (item && typeof item === 'object' ? (item as Data)[key] : undefined),
    value
  );
}
export function writePath(data: Data, path: string[], value: unknown): Data {
  const [key, ...rest] = path;
  const next = { ...data };
  if (rest.length)
    next[key] = writePath(
      (data[key] && typeof data[key] === 'object' ? data[key] : {}) as Data,
      rest,
      value
    );
  else if (value === undefined) delete next[key];
  else next[key] = value;
  return next;
}
export function flattenNodes(nodes: WorkflowNode[]): WorkflowNode[] {
  return nodes.flatMap((node) => [node, ...flattenNodes(node.blocks || [])]);
}
export function findNode(schema: WorkflowSchema, id: string) {
  return flattenNodes(schema.nodes).find((node) => node.id === id);
}
export function signature(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(signature).join(',')}]`;
  if (value && typeof value === 'object')
    return `{${Object.keys(value)
      .sort()
      .filter((key) => (value as Data)[key] !== undefined)
      .map((key) => `${JSON.stringify(key)}:${signature((value as Data)[key])}`)
      .join(',')}}`;
  return JSON.stringify(value) ?? 'undefined';
}
export function resolveSample(value: unknown, bindings: Data): unknown {
  const v = asValue(value);
  if (v.type === 'ref' && Array.isArray(v.content))
    return readPath(bindings, v.content as string[]);
  if (v.type === 'template' && typeof v.content === 'string')
    return v.content.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, path: string) => {
      const sample = readPath(bindings, path.trim().split('.'));
      return sample === undefined
        ? `{{${path}}}`
        : typeof sample === 'string'
        ? sample
        : JSON.stringify(sample);
    });
  return v.content;
}
export function defaultSample(schema: Schema): unknown {
  if (schema.type === 'object')
    return Object.fromEntries(
      Object.entries(schema.properties || {}).map(([key, type]) => [key, defaultSample(type)])
    );
  if (schema.type === 'array') return [];
  if (schema.type === 'number' || schema.type === 'integer') return 0;
  if (schema.type === 'boolean') return false;
  return schema.type === 'null' ? null : '';
}
// Only values that dominate this scope are guaranteed to exist on every path.
export function accessibleNodes(schema: WorkflowSchema, target: string): WorkflowNode[] {
  function scope(graph: WorkflowSchema, inherited: WorkflowNode[]): WorkflowNode[] | undefined {
    const ids = new Set(graph.nodes.map((node) => node.id));
    const entry = graph.nodes.find((node) => ['start', 'block-start'].includes(node.type));
    if (!entry) return;
    const reachable = new Set([entry.id]);
    let changed = true;
    while (changed) {
      changed = false;
      graph.edges.forEach((edge) => {
        if (
          reachable.has(edge.sourceNodeID) &&
          ids.has(edge.targetNodeID) &&
          !reachable.has(edge.targetNodeID)
        ) {
          reachable.add(edge.targetNodeID);
          changed = true;
        }
      });
    }
    const dom = new Map(
      Array.from(reachable, (id) => [id, id === entry.id ? new Set([id]) : new Set(reachable)])
    );
    changed = true;
    while (changed) {
      changed = false;
      for (const id of reachable) {
        if (id === entry.id) continue;
        const predecessors = graph.edges
          .filter((e) => e.targetNodeID === id && reachable.has(e.sourceNodeID))
          .map((e) => dom.get(e.sourceNodeID)!);
        const next = new Set([
          id,
          ...Array.from(predecessors[0] || []).filter((key) =>
            predecessors.every((set) => set.has(key))
          ),
        ]);
        if (signature(Array.from(next).sort()) !== signature(Array.from(dom.get(id)!).sort())) {
          dom.set(id, next);
          changed = true;
        }
      }
    }
    for (const node of graph.nodes) {
      const visible = [
        ...inherited,
        ...graph.nodes.filter(
          (candidate) => candidate.id !== node.id && dom.get(node.id)?.has(candidate.id)
        ),
      ];
      if (node.id === target) return visible;
      if (node.blocks) {
        const children = node.blocks.map((child) =>
          child.type === 'block-start' && node.type === 'control.repeat'
            ? {
                ...child,
                type: 'block-start',
                data: {
                  ...child.data,
                  outputs: {
                    type: 'object',
                    properties: {
                      state: node.data.stateSchema || { type: 'object' },
                      index: { type: 'integer' },
                    },
                  },
                },
              }
            : child
        );
        const locals: WorkflowNode[] = [];
        if (['loop', 'control.repeat'].includes(node.type)) {
          const properties =
            node.type === 'control.repeat'
              ? { state: node.data.stateSchema || { type: 'object' }, index: { type: 'integer' } }
              : { item: {}, index: { type: 'integer' } };
          locals.push({
            id: `${node.id}_locals`,
            type: 'start',
            data: { title: tx('当前循环'), outputs: { type: 'object', properties } },
          });
          if (node.type === 'control.repeat')
            locals.push(
              {
                id: 'state',
                type: 'start',
                data: {
                  title: tx('当前状态'),
                  outputs: node.data.stateSchema || { type: 'object' },
                },
              },
              {
                id: 'index',
                type: 'start',
                data: { title: tx('当前轮次'), outputs: { type: 'integer' } },
              }
            );
        }
        const found = scope({ nodes: children, edges: node.edges || [] }, [...visible, ...locals]);
        if (found) return found;
      }
    }
  }
  return scope(schema, []) || [];
}

export function executionSignature(node: WorkflowNode): string {
  const { title: _title, ...data } = node.data;
  return signature({
    id: node.id,
    type: node.type,
    data,
    blocks: (node.blocks || []).map(executionSignature),
    edges: (node.edges || []).map((edge) => ({
      sourceNodeID: edge.sourceNodeID,
      targetNodeID: edge.targetNodeID,
      sourcePortID: edge.sourcePortID || null,
      targetPortID: edge.targetPortID || null,
    })),
  });
}
