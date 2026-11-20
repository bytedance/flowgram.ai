/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { aggregateStatus, type Execution, type TraceDetail } from './run-trace';

export interface CanvasExecution {
  status: string;
  total?: number;
  counts?: Record<string, number>;
  durationMs?: number | null;
  startedAt?: string | null;
  iterationPath?: number[];
  attempt?: number;
}
export function canvasExecutions(
  detail: { trace: Pick<TraceDetail['trace'], 'nodes'> },
  workflowId: string
): Record<string, CanvasExecution> {
  return Object.fromEntries(
    detail.trace.nodes
      .filter((node) => node.workflowId === workflowId)
      .map((node) => [
        node.nodeId,
        {
          status: aggregateStatus(node.counts),
          total: node.total,
          counts: node.counts,
          durationMs: node.durationMs,
          startedAt: node.startedAt,
        },
      ])
  );
}
export function scopedCanvasExecutions(
  entries: Execution[],
  workflowId: string
): Record<string, CanvasExecution> {
  const groups = new Map<string, Execution[]>();
  entries
    .filter((entry) => entry.kind === 'node' && entry.workflowId === workflowId)
    .forEach((entry) => groups.set(entry.nodeId, [...(groups.get(entry.nodeId) || []), entry]));
  return Object.fromEntries(
    [...groups].map(([id, entries]) => {
      const counts: Record<string, number> = {};
      entries.forEach((entry) => (counts[entry.status] = (counts[entry.status] || 0) + 1));
      const entry = entries[entries.length - 1];
      return [
        id,
        {
          status: aggregateStatus(counts),
          counts,
          total: entries.length,
          durationMs: entries.length === 1 ? entry.durationMs : undefined,
          startedAt: entries.length === 1 ? entry.startedAt : undefined,
          iterationPath: entry.iterationPath,
          attempt: entry.attempt,
        },
      ];
    })
  );
}
