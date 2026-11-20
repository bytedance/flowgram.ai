/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { localized } from './i18n';
import { tx } from './i18n';
import { nodeLayout, NODE_LAYOUT } from './node-layout';
import catalog from '../../../desktop-backend/catalog/control-nodes.json';
import type { AtomicNodeDefinition } from './atomic-nodes';
import type { WorkflowNode, WorkflowSchema } from './types';
import type { Data } from '../components/node-inspector/model';

export const controlNodes = localized(catalog as unknown as AtomicNodeDefinition[]);
export const isLoop = (type: string) => ['loop', 'control.repeat'].includes(type);
export const isFork = (type: string) => ['control.switch', 'control.parallel'].includes(type);
export const isJoin = (type: string) => ['control.join', 'control.merge-branches'].includes(type);
export interface Branch { id: string; label: string; predicate?: Data }
export function branches(node: WorkflowNode): Branch[] {
  const configured = (node.data.branches || []) as Branch[];
  return node.type === 'control.switch'
    ? [...configured, { id: 'else', label: tx("否则") }]
    : configured;
}
export function scopeFor(schema: WorkflowSchema, id: string): WorkflowSchema {
  for (const node of schema.nodes) {
    if (node.id === id) return schema;
    if (node.blocks) {
      const child = scopeFor({ nodes: node.blocks, edges: node.edges || [] }, id);
      if (child.nodes.some((n) => n.id === id)) return child;
    }
  }
  return { nodes: [], edges: [] };
}
export function portLabels(node: WorkflowNode, graph: WorkflowSchema) {
  const input = isJoin(node.type)
    ? branches(graph.nodes.find((n) => n.id === node.data.forkId) || { ...node, data: {} })
    : ['start', 'block-start'].includes(node.type) ? [] : [{ id: '', label: tx("输入") }];
  const output = isFork(node.type) ? branches(node)
    : node.type === 'condition' ? [
      ...Array.from(new Set(((node.data.conditions || []) as Data[]).map((c) => String(c.key || 'true'))))
        .map((id) => ({ id, label: id === 'true' ? tx("通过") : id })),
      { id: 'else', label: tx("否则") },
    ] : ['end', 'block-end', 'control.break', 'control.continue'].includes(node.type)
    ? [] : [{ id: '', label: tx("输出") }];
  return { input, output };
}
// Explicit static port coordinates: no DOM scanning, useDynamicPort, or targetElement.
export function staticPorts(node: WorkflowNode, graph: WorkflowSchema) {
  const labels = portLabels(node, graph);
  const layout = nodeLayout(node, labels.input.length, labels.output.length);
  const rowSide = (type: 'input' | 'output') => layout.family === 'route' &&
    ((isJoin(node.type) && type === 'input') || (!isJoin(node.type) && type === 'output'));
  return {
    ...layout,
    ports: (['input', 'output'] as const).flatMap((type) => labels[type].map((port, index) => ({
      type,
      ...(port.id ? { portID: port.id } : {}),
      locationConfig: {
        ...(type === 'input' ? { left: 0 } : { right: 0 }),
        top: rowSide(type) ? NODE_LAYOUT.rowTop + index * NODE_LAYOUT.rowHeight + NODE_LAYOUT.rowHeight / 2
          : layout.family === 'container' ? '50%' : layout.height / 2,
      },
    }))),
  };
}

export function mapScope(schema: WorkflowSchema, id: string | null, change: (graph: WorkflowSchema) => WorkflowSchema): WorkflowSchema {
  if (!id || schema.nodes.some((n) => n.id === id)) return change(schema);
  if (!schema.nodes.some((node) => node.blocks && scopeFor({ nodes: node.blocks, edges: node.edges || [] }, id).nodes.length)) return schema;
  return { ...schema, nodes: schema.nodes.map((node) => node.blocks ? (() => {
    const next = mapScope({ nodes: node.blocks!, edges: node.edges || [] }, id, change);
    return { ...node, blocks: next.nodes, edges: next.edges };
  })() : node) };
}
export function editControlConfiguration(schema: WorkflowSchema, id: string, data: Data): WorkflowSchema {
  return mapScope(schema, id, (graph) => {
    const selected = graph.nodes.find((n) => n.id === id);
    const joinType = selected?.type === 'control.switch' && data.mode === 'first' ? 'control.merge-branches' : 'control.join';
    return { ...graph, nodes: graph.nodes.map((node) => {
      if (node.id === id) return { ...node, data };
      if (selected && isFork(selected.type) && node.id === data.joinId)
        return { ...node, type: joinType, data: { ...node.data, forkId: id } };
      if (selected && isJoin(selected.type) && node.id === data.forkId)
        return { ...node, data: { ...node.data, joinId: id } };
      return node;
    }) };
  });
}

export function portModelSignature(schema: WorkflowSchema): string {
  return JSON.stringify(schema.nodes.map((node) => [node.id, node.type, (node.data.branches as Branch[] | undefined)?.map((branch) => [branch.id, branch.label]), node.data.conditions && (node.data.conditions as Data[]).map((c) => c.key), node.data.forkId,
    node.blocks && portModelSignature({ nodes: node.blocks, edges: node.edges || [] }),
  ]));
}
export function portModels(schema: WorkflowSchema): Record<string, ReturnType<typeof staticPorts> & ReturnType<typeof portLabels>> {
  return Object.fromEntries(schema.nodes.flatMap((node) => [
    [node.id, { ...staticPorts(node, schema), ...portLabels(node, schema) }],
    ...Object.entries(node.blocks ? portModels({ nodes: node.blocks, edges: node.edges || [] }) : {}),
  ]));
}
