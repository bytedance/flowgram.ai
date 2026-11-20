/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNode, WorkflowSchema } from './types';
import { branches, isFork, isJoin, isLoop, staticPorts, mapScope, portLabels, scopeFor } from './control-nodes';
import { createNode } from './node-catalog';
import { flattenNodes } from '../components/node-inspector/model';

export type NodeCommand = 'open' | 'rename' | 'copy' | 'cut' | 'duplicate' | 'delete' | 'copy-id';
export type Edge = WorkflowSchema['edges'][number];
export interface InsertionIntent {
  mode?: 'quick' | 'library';
  anchor?: { x: number; y: number };
  position?: { x: number; y: number };
  scopeId?: string;
  source?: { nodeId: string; portId: string };
  edge?: Edge;
}
export const protectedNode = (node: WorkflowNode) =>
  ['start', 'end', 'block-start', 'block-end'].includes(node.type);

// Control pairs and container descendants are a single structural selection.
export function selectionClosure(schema: WorkflowSchema, selected: string[]): Set<string> {
  const ids = new Set(selected);
  const all = flattenNodes(schema.nodes);
  let previous = -1;
  while (previous !== ids.size) {
    previous = ids.size;
    all.filter((node) => ids.has(node.id)).forEach((node) => {
      flattenNodes(node.blocks || []).forEach((child) => ids.add(child.id));
      if (isFork(node.type) && typeof node.data.joinId === 'string') {
        const graph = scopeFor(schema, node.id);
        const visited = new Set<string>();
        const pending = [node.id];
        while (pending.length) {
          const id = pending.pop()!;
          if (visited.has(id)) continue;
          visited.add(id);
          const candidate = graph.nodes.find((item) => item.id === id);
          if (candidate && protectedNode(candidate)) continue;
          ids.add(id);
          if (id !== node.data.joinId)
            graph.edges.filter((edge) => edge.sourceNodeID === id).forEach((edge) => pending.push(edge.targetNodeID));
        }
        ids.add(node.data.joinId);
      }
      if (isJoin(node.type) && typeof node.data.forkId === 'string') ids.add(node.data.forkId);
    });
  }
  return ids;
}

function transformBindings(value: unknown, remap: (id: string) => string): unknown {
  if (Array.isArray(value)) return value.map((item) => transformBindings(item, remap));
  if (!value || typeof value !== 'object') return value;
  const data = value as Record<string, unknown>;
  // Constant content is arbitrary user data, including objects that look like bindings.
  if (data.type === 'constant') return value;
  if (data.type === 'ref' && Array.isArray(data.content))
    return { ...data, content: data.content.map((item, index) => index === 0 ? remap(String(item)) : item) };
  if (data.type === 'template' && typeof data.content === 'string')
    return { ...data, content: data.content.replace(/\{\{(\s*)([^}\s.]+)([^}]*)\}\}/g,
      (_, space: string, id: string, rest: string) => `{{${space}${remap(id)}${rest}}}`) };
  return Object.fromEntries(Object.entries(data).map(([key, item]) => [key,
    ['forkId', 'joinId'].includes(key) && typeof item === 'string' ? remap(item) : transformBindings(item, remap),
  ]));
}

export function deletionReason(schema: WorkflowSchema, selected: string[]): string | null {
  const all = flattenNodes(schema.nodes);
  if (!selected.length) return 'Select at least one node';
  const descendants = new Set(all.filter((node) => selected.includes(node.id))
    .flatMap((node) => flattenNodes(node.blocks || []).map((child) => child.id)));
  if (all.some((node) => selected.includes(node.id) && !descendants.has(node.id) && protectedNode(node)))
    return 'Workflow and loop boundary nodes cannot be deleted';
  const ids = selectionClosure(schema, selected);
  const dependent = all.find((node) => {
    if (ids.has(node.id)) return false;
    let found = false;
    transformBindings(node.data, (id) => { if (ids.has(id)) found = true; return id; });
    return found;
  });
  return dependent ? `Node ${String(dependent.data.title || dependent.id)} still references this selection` : null;
}

export function removeNodes(schema: WorkflowSchema, selected: string[]): WorkflowSchema {
  const reason = deletionReason(schema, selected);
  if (reason) throw new Error(reason);
  const ids = selectionClosure(schema, selected);
  function remove(graph: WorkflowSchema): WorkflowSchema {
    return {
      nodes: graph.nodes.filter((node) => !ids.has(node.id)).map((node) => {
        if (!node.blocks) return node;
        const child = remove({ nodes: node.blocks, edges: node.edges || [] });
        return { ...node, blocks: child.nodes, edges: child.edges };
      }),
      edges: graph.edges.filter((edge) => !ids.has(edge.sourceNodeID) && !ids.has(edge.targetNodeID)),
    };
  }
  return remove(schema);
}

export interface NodeClipboard {
  format: 'flowgram.nodes';
  version: 1;
  graph: WorkflowSchema;
  workflowId?: string;
  scopeId?: string;
}
function scopeIdentity(schema: WorkflowSchema, id?: string, owner = 'root'): string {
  if (!id || schema.nodes.some((node) => node.id === id)) return owner;
  for (const node of schema.nodes) {
    if (node.blocks && flattenNodes(node.blocks).some((child) => child.id === id))
      return scopeIdentity({ nodes: node.blocks, edges: node.edges || [] }, id, node.id);
  }
  return owner;
}
export function copyNodes(schema: WorkflowSchema, selected: string[], workflowId?: string): NodeClipboard {
  const descendants = new Set(flattenNodes(schema.nodes).filter((node) => selected.includes(node.id))
    .flatMap((node) => flattenNodes(node.blocks || []).map((child) => child.id)));
  const roots = flattenNodes(schema.nodes).filter((node) => selected.includes(node.id) && !descendants.has(node.id) && !protectedNode(node));
  if (!roots.length) throw new Error('Select editable nodes to copy');
  const graph = scopeFor(schema, roots[0].id);
  if (roots.some((node) => !graph.nodes.some((candidate) => candidate.id === node.id)))
    throw new Error('Copy nodes from one scope at a time');
  const ids = selectionClosure(schema, roots.map((node) => node.id));
  return { format: 'flowgram.nodes', version: 1, workflowId, scopeId: scopeIdentity(schema, roots[0].id), graph: structuredClone({
    nodes: graph.nodes.filter((node) => ids.has(node.id)),
    edges: graph.edges.filter((edge) => ids.has(edge.sourceNodeID) && ids.has(edge.targetNodeID)),
  }) };
}

export function pasteNodes(schema: WorkflowSchema, clipboard: NodeClipboard, intent: InsertionIntent, workflowId?: string) {
  if (!clipboard || clipboard.format !== 'flowgram.nodes' || clipboard.version !== 1 ||
    !Array.isArray(clipboard.graph?.nodes) || !Array.isArray(clipboard.graph?.edges))
    throw new Error('The clipboard does not contain FlowGram nodes');
  const graph = structuredClone(clipboard.graph);
  if (!graph.nodes.length || graph.nodes.some(protectedNode)) throw new Error('Select editable nodes to copy');
  const ids = new Map(flattenNodes(graph.nodes).map((node) => [node.id, `node_${crypto.randomUUID()}`]));
  const target = intent.scopeId ? scopeFor(schema, intent.scopeId) : schema;
  if (intent.scopeId && !target.nodes.length) throw new Error('The target scope no longer exists');
  const visible = new Set(flattenNodes(schema.nodes).map((node) => node.id));
  const remap = (id: string) => {
    if (ids.has(id)) return ids.get(id)!;
    if (visible.has(id) || ['item', 'index', 'state'].includes(id)) {
      if ((clipboard.workflowId && clipboard.workflowId !== workflowId) ||
        (clipboard.scopeId && clipboard.scopeId !== scopeIdentity(schema, intent.scopeId)))
        throw new Error(`Reference ${id} cannot be carried into a different workflow or scope`);
      return id;
    }
    throw new Error(`Referenced node ${id} is not available in this workflow`);
  };
  const origin = { x: Math.min(...graph.nodes.map((n) => n.meta?.position?.x || 0)),
    y: Math.min(...graph.nodes.map((n) => n.meta?.position?.y || 0)) };
  const position = intent.position || { x: origin.x + 40, y: origin.y + 40 };
  const edges = (items: Edge[]) => items.map((edge) => ({ ...edge,
    sourceNodeID: remap(edge.sourceNodeID), targetNodeID: remap(edge.targetNodeID) }));
  const clone = (node: WorkflowNode, top: boolean): WorkflowNode => ({
    ...node, id: remap(node.id), data: transformBindings(node.data, remap) as WorkflowNode['data'],
    meta: { ...node.meta, position: top ? {
      x: (node.meta?.position?.x || 0) - origin.x + position.x,
      y: (node.meta?.position?.y || 0) - origin.y + position.y,
    } : node.meta?.position },
    ...(node.blocks ? { blocks: node.blocks.map((n) => clone(n, false)), edges: edges(node.edges || []) } : {}),
  });
  const nodes = graph.nodes.map((node) => clone(node, true));
  return { ids: nodes.map((node) => node.id), schema: mapScope(schema, intent.scopeId || null,
    (scope) => ({ nodes: [...scope.nodes, ...nodes], edges: [...scope.edges, ...edges(graph.edges)] })) };
}

export function insertionNodes(kind: string, position?: { x: number; y: number }) {
  const node = createNode(kind, 0);
  if (position) node.meta = { position };
  const nodes = [node];
  const edges: Edge[] = [];
  let exit = node;
  if (isFork(kind)) {
    exit = createNode(kind === 'control.switch' ? 'control.merge-branches' : 'control.join', 0);
    node.data.joinId = exit.id;
    exit.data.forkId = node.id;
    exit.meta = { position: { x: (node.meta?.position?.x || 140) + 420, y: node.meta?.position?.y || 140 } };
    nodes.push(exit);
    branches(node).forEach((branch) => edges.push({ sourceNodeID: node.id, targetNodeID: exit.id,
      sourcePortID: branch.id, targetPortID: branch.id }));
  }
  return { node, exit, nodes, edges };
}
export function insertionPorts(kind: string) {
  const { node, exit, nodes, edges } = insertionNodes(kind);
  const graph = { nodes, edges };
  return { input: portLabels(node, graph).input, output: portLabels(exit, graph).output };
}
export function insertNode(schema: WorkflowSchema, kind: string, intent: InsertionIntent,
  ports: { input?: string; output?: string } = {}) {
  if (intent.source && !intent.edge) {
    const source = intent.source;
    const connected = scopeFor(schema, source.nodeId).edges.filter((edge) =>
      edge.sourceNodeID === source.nodeId && (edge.sourcePortID || '') === source.portId);
    if (connected.length > 1) throw new Error('Choose the connection to insert into');
    if (connected.length === 1) intent = { ...intent, edge: connected[0] };
  }
  if (isJoin(kind)) throw new Error('Join nodes are created with their matching fork');
  const scopeId = intent.edge?.sourceNodeID || intent.source?.nodeId || intent.scopeId;
  if (['control.break', 'control.continue'].includes(kind) && scopeIdentity(schema, scopeId) === 'root')
    throw new Error('This node can only be added inside a loop');
  const created = insertionNodes(kind, intent.position);
  const targetId = intent.edge?.sourceNodeID || intent.source?.nodeId || intent.scopeId || null;
  const scope = targetId ? scopeFor(schema, targetId) : schema;
  if (targetId && !scope.nodes.length) throw new Error('The target scope no longer exists');
  const labels = { input: portLabels(created.node, { nodes: created.nodes, edges: created.edges }).input,
    output: portLabels(created.exit, { nodes: created.nodes, edges: created.edges }).output };
  if (intent.source || intent.edge) {
    const input = labels.input.find((p) => p.id === ports.input) || (labels.input.length === 1 ? labels.input[0] : undefined);
    if (!input) throw new Error('Choose an input port for this node');
    const source = intent.edge
      ? { nodeId: intent.edge.sourceNodeID, portId: intent.edge.sourcePortID || '' } : intent.source!;
    const sourceNode = scope.nodes.find((node) => node.id === source.nodeId);
    if (!sourceNode || !portLabels(sourceNode, scope).output.some((port) => port.id === source.portId))
      throw new Error('The source port no longer exists');
    created.edges.push({ sourceNodeID: source.nodeId, sourcePortID: source.portId,
      targetNodeID: created.node.id, targetPortID: input.id });
    if (intent.edge) {
      if (!scope.edges.some((edge) => sameEdge(edge, intent.edge!))) throw new Error('The connection no longer exists');
      const output = labels.output.find((p) => p.id === ports.output) || (labels.output.length === 1 ? labels.output[0] : undefined);
      if (!output) throw new Error('Choose an output port for this node');
      created.edges.push({ sourceNodeID: created.exit.id, sourcePortID: output.id,
        targetNodeID: intent.edge.targetNodeID, targetPortID: intent.edge.targetPortID });
    }
  }
  return { id: created.node.id, schema: mapScope(schema, targetId, (graph) => {
    let existing = graph.nodes;
    if (intent.edge) {
      const target = graph.nodes.find((node) => node.id === intent.edge!.targetNodeID);
      const box = (node: WorkflowNode, owner: WorkflowSchema) => ({
        x: node.meta?.position?.x || 0, y: node.meta?.position?.y || 0,
        width: staticPorts(node, owner).width,
        height: isLoop(node.type) ? 330 : staticPorts(node, owner).height,
      });
      if (target) {
        const targetBox = box(target, graph);
        const added = created.nodes.map((node) => box(node, { nodes: created.nodes, edges: created.edges }));
        if (added.some((item) => item.x < targetBox.x + targetBox.width && item.x + item.width > targetBox.x &&
          item.y < targetBox.y + targetBox.height && item.y + item.height > targetBox.y)) {
          const offset = Math.max(...added.map((item) => item.x + item.width)) + 80 - targetBox.x;
          const downstream = new Set<string>();
          const pending = [target.id];
          while (pending.length) {
            const id = pending.pop()!;
            if (downstream.has(id) || id === intent.edge.sourceNodeID) continue;
            downstream.add(id);
            graph.edges.filter((edge) => edge.sourceNodeID === id).forEach((edge) => pending.push(edge.targetNodeID));
          }
          existing = graph.nodes.map((node) => downstream.has(node.id) ? { ...node,
            meta: { ...node.meta, position: { x: (node.meta?.position?.x || 0) + offset, y: node.meta?.position?.y || 0 } },
          } : node);
        }
      }
    }
    return { nodes: [...existing, ...created.nodes],
      edges: [...graph.edges.filter((edge) => !intent.edge || !sameEdge(edge, intent.edge)), ...created.edges] };
  }) };
}
export const sameEdge = (a: Edge, b: Edge) => a.sourceNodeID === b.sourceNodeID &&
  a.targetNodeID === b.targetNodeID && (a.sourcePortID || '') === (b.sourcePortID || '') &&
  (a.targetPortID || '') === (b.targetPortID || '');
