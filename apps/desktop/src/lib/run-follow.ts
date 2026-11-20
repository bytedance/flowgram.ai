/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { RuntimeEvent, WorkflowNode, WorkflowSchema } from './types';

interface ActiveNode { nodeId: string; sequence: number; parentId?: string }
export interface RunFollowState {
  active: Record<string, ActiveNode>;
  nodeId: string | null;
  lastNodeId: string | null;
  failureId: string | null;
  finished: boolean;
}
export const initialRunFollow: RunFollowState = {
  active: {}, nodeId: null, lastNodeId: null, failureId: null, finished: false,
};

/** Keep one parallel branch in view; descend into containers instead of framing their bounds. */
export function followRunEvent(
  state: RunFollowState, event: RuntimeEvent, runId: string,
  workflowId: string, schema: WorkflowSchema
): RunFollowState {
  if (event.objectId !== runId || state.finished) return state;
  if (event.kind === 'run_finished') return {
    ...state, active: {}, finished: true,
    nodeId: state.failureId || state.nodeId || state.lastNodeId,
  };
  if (!['node_started', 'node_finished', 'node_failed', 'node_canceled'].includes(event.kind))
    return state;
  let data: { executionId?: string; nodeId?: string; workflowId?: string; parentExecutionId?: string };
  try { data = JSON.parse(event.data); } catch { return state; }
  if (!data || data.workflowId !== workflowId || !data.executionId || !data.nodeId) return state;
  const ancestors = new Map<string, string[]>();
  function visit(nodes: WorkflowNode[], parents: string[]) {
    for (const node of nodes) {
      ancestors.set(node.id, parents);
      if (node.blocks) visit(node.blocks, [...parents, node.id]);
    }
  }
  visit(schema.nodes, []);
  if (!ancestors.has(data.nodeId)) return state;
  const active = { ...state.active };
  const started = event.kind === 'node_started';
  if (started) active[data.executionId] = { nodeId: data.nodeId, sequence: event.sequence, parentId: data.parentExecutionId };
  else delete active[data.executionId];
  const entries = Object.values(active);
  const parentIds = new Set(entries.map(entry => entry.parentId));
  const leaves = Object.entries(active)
    .filter(([id, entry]) => !parentIds.has(id) &&
      !entries.some(other => ancestors.get(other.nodeId)?.includes(entry.nodeId)))
    .map(([, entry]) => entry);
  const lastNodeId = started ? data.nodeId : state.lastNodeId;
  const nodeId = leaves.find(entry => entry.nodeId === state.nodeId)?.nodeId
    || leaves.sort((a, b) => a.sequence - b.sequence)[0]?.nodeId
    || lastNodeId;
  return {
    ...state, active, nodeId, lastNodeId,
    failureId: event.kind === 'node_failed' ? state.failureId || data.nodeId : state.failureId,
  };
}

/** Coalesce short steps and serialize camera moves. A canceled move cannot revive its queue. */
export class RunFollowCamera {
  private timer: ReturnType<typeof setTimeout> | undefined;
  private pending: string | null = null;
  private current: string | null = null;
  private generation = 0;
  private busy = false;
  constructor(private move: (id: string) => Promise<void>, private cancel: () => void) {}
  follow(id: string) {
    if (id === (this.pending || this.current)) return;
    this.pending = id;
    if (!this.busy) this.schedule();
  }
  stop() {
    this.generation++;
    clearTimeout(this.timer);
    this.pending = this.current = null;
    if (this.busy) this.cancel();
    this.busy = false;
  }
  private schedule() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => void this.flush(), 120);
  }
  private async flush() {
    const id = this.pending;
    if (!id) return;
    this.pending = null;
    this.current = id;
    this.busy = true;
    const generation = this.generation;
    try { await this.move(id); }
    finally {
      if (generation === this.generation) {
        this.busy = false;
        if (this.pending) this.schedule();
      }
    }
  }
}
