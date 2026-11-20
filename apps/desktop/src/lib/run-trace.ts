/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { ModelTrace } from './models';
import type { Run, RuntimeEvent, Workflow, WorkflowNode } from './types';
import { tx } from './i18n';

export interface Execution {
  id: string;
  parentId: string | null;
  parentPath: string[];
  nodeId: string;
  workflowId: string;
  scopeId: string;
  kind: 'node' | 'model' | 'tool' | 'http';
  name: string | null;
  status: string;
  firstSequence: number;
  lastSequence: number;
  startedAt: string;
  endedAt: string | null;
  durationMs: number | null;
  branchPath: string[];
  iterationPath: number[];
  attempt: number;
  reason: string | null;
  children: number;
  inputsAvailable: boolean;
  outputsAvailable: boolean;
  links: { executionId: string; sourcePortId?: string | null; type: string }[];
}
export interface ExecutionPage {
  executions: Execution[];
  nextCursor: number | null;
  previousCursor?: number | null;
  total?: number;
}
export interface TraceDetail {
  run: Run;
  snapshot: Workflow | null;
  manifest: {
    workflows: {
      workflowId: string;
      name: string;
      revision: number;
      schemaHash: string;
    }[];
  };
  models: { workflowId: string; nodeId: string; model: ModelTrace }[];
  nodeTest: { node: WorkflowNode; bindings: Record<string, unknown> } | null;
  trace: ExecutionPage & {
    at: number | null;
    observedAt: string | null;
    outputsAvailable: boolean;
    origin: import('./debug-intent').DebugOrigin | null;
    format: string;
    runtime: string;
    source: string;
    endedAt: string | null;
    durationMs: number | null;
    watermark: number;
    rootTotal: number;
    total: number;
    counts: Record<string, number>;
    failureId: string | null;
    failurePath: string[];
    focus: Execution[];
    links: {
      workflowId: string;
      scopeId: string;
      sourceNodeId: string;
      sourcePortId: string | null;
      targetNodeId: string;
    }[];
    nodes: {
      workflowId: string;
      nodeId: string;
      total: number;
      durationMs?: number | null;
      startedAt?: string | null;
      counts: Record<string, number>;
    }[];
    publication: {
      service: string;
      environment: string;
      operation: string;
      version: string;
    } | null;
  };
}
export const statusLabel = (status: string) =>
  tx(
    (
      {
        running: '运行中',
        succeeded: '已完成',
        failed: '执行失败',
        canceled: '已取消',
        interrupted: '已中断',
        waiting: '等待中',
        skipped: '已跳过',
        untested: '本次未测试',
        pending: '未执行',
      } as Record<string, string>
    )[status] || status
  );
export const sourceLabel = (source: string) =>
  tx(
    (
      {
        node_test: '节点测试',
        manual: '手动或工具调用',
        agent: '会话调用',
        published: '发布运行',
        debug: '调试运行',
      } as Record<string, string>
    )[source] || source
  );
export function duration(ms: number | null | undefined) {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return '—';
  if (ms < 1) return '<1 ms';
  if (ms < 1000) return `${Math.round(ms)} ms`;
  const seconds = Math.round(ms / 100) / 10;
  if (seconds < 60) return `${seconds.toFixed(1)} s`;
  const wholeSeconds = Math.round(ms / 1000);
  return `${Math.floor(wholeSeconds / 60)} m ${wholeSeconds % 60} s`;
}
export function executionPath(execution: Execution) {
  return [
    ...execution.iterationPath.map((index) => tx('第 {0} 轮', [index + 1])),
    ...execution.branchPath.map((branch) => tx('分支 {0}', [branch])),
    ...(execution.attempt > 1
      ? [tx('第 {0} 次尝试', [execution.attempt])]
      : []),
  ].join(' · ');
}
export function parseEvent(event: RuntimeEvent): Record<string, unknown> {
  try {
    return JSON.parse(event.data);
  } catch {
    return {};
  }
}
export function executionData(events: RuntimeEvent[]) {
  const parsed = events.map((event) => ({
    ...event,
    value: parseEvent(event),
  }));
  const first = parsed.find((event) => Object.hasOwn(event.value, 'inputs'));
  const last = [...parsed]
    .reverse()
    .find((event) => Object.hasOwn(event.value, 'outputs'));
  return {
    inputs: first?.value.inputs,
    outputs: last?.value.outputs,
    metadata: first?.value || parsed[0]?.value || {},
    error: [...parsed]
      .reverse()
      .find((event) => typeof event.value.error === 'string')?.value.error as
      | string
      | undefined,
    firstOutputMs: parsed.find(
      (event) => typeof event.value.firstOutputMs === 'number'
    )?.value.firstOutputMs as number | undefined,
  };
}
export function mergeExecutions(previous: Execution[], next: Execution[]) {
  const values = new Map(previous.map((entry) => [entry.id, entry]));
  next.forEach((entry) => values.set(entry.id, entry));
  return [...values.values()].sort((a, b) => a.firstSequence - b.firstSequence);
}
/** A failed iteration must remain visible even when a later iteration succeeds. */
export function aggregateStatus(counts: Record<string, number>) {
  return (
    [
      'failed',
      'running',
      'waiting',
      'interrupted',
      'canceled',
      'succeeded',
      'skipped',
    ].find((status) => counts[status] > 0) || 'pending'
  );
}

export interface ComparisonGroup {
  workflowId: string;
  canonicalWorkflowId: string;
  workflowName: string;
  nodeId: string;
  nodeType: string;
  name: string;
  configHash: string;
  modelHash: string | null;
  counts: Record<string, number>;
  executions: number;
  durationMs: number | null;
  durationComplete?: boolean;
  modelCalls: number;
  toolCalls: number;
  httpCalls: number;
  inputTokens: number | null;
  outputTokens: number | null;
  usageRecorded: number;
}
export const comparisonKey = (group: ComparisonGroup) =>
  JSON.stringify([group.canonicalWorkflowId, group.nodeId]);
export function pairGroups(left: ComparisonGroup[], right: ComparisonGroup[]) {
  const leftMap = new Map(left.map((group) => [comparisonKey(group), group]));
  const rightMap = new Map(right.map((group) => [comparisonKey(group), group]));
  return [...new Set([...leftMap.keys(), ...rightMap.keys()])].map((key) => ({
    key,
    left: leftMap.get(key),
    right: rightMap.get(key),
  }));
}
export function instanceKey(entry: Execution) {
  return JSON.stringify([
    entry.parentPath || [],
    entry.branchPath,
    entry.iterationPath,
    entry.attempt,
  ]);
}

export type TraceUpdate = Omit<Partial<TraceDetail>, 'run' | 'trace'> & {
  run: Partial<Run>;
  trace: TraceDetail['trace'];
};
export function mergeTraceDetail(
  previous: TraceDetail | null,
  next: TraceUpdate
): TraceDetail {
  return {
    ...previous,
    ...next,
    run: { ...previous?.run, ...next.run },
    snapshot: previous?.snapshot ?? next.snapshot ?? null,
  } as TraceDetail;
}
export function mergeExecutionPage(
  previous: ExecutionPage | undefined,
  next: ExecutionPage
): ExecutionPage {
  if (!previous) return next;
  const executions = mergeExecutions(previous.executions, next.executions);
  const nextLast = next.executions.at(-1)?.firstSequence || 0;
  const previousLast = previous.executions.at(-1)?.firstSequence || 0;
  let cursor = nextLast < previousLast ? previous.nextCursor : next.nextCursor;
  if (next.total !== undefined && executions.length >= next.total)
    cursor = null;
  else if (
    next.total !== undefined &&
    next.total > (previous.total || 0) &&
    cursor === null
  )
    cursor = executions.at(-1)?.firstSequence || null;
  return {
    ...next,
    executions,
    nextCursor: cursor,
    previousCursor:
      (next.executions[0]?.firstSequence || Infinity) <
      (previous.executions[0]?.firstSequence || Infinity)
        ? next.previousCursor
        : previous.previousCursor,
  };
}
export function executionFromEvents(
  entry: Execution | null,
  events: RuntimeEvent[],
  at?: number
): Execution | null {
  if (!entry) return null;
  let current = entry;
  if (at !== undefined && entry.lastSequence > at)
    current = {
      ...entry,
      status: entry.firstSequence > at ? 'pending' : 'running',
      reason: null,
      durationMs: null,
      endedAt: null,
      outputsAvailable: false,
      inputsAvailable: entry.firstSequence <= at && entry.inputsAvailable,
      children: entry.firstSequence > at ? 0 : entry.children,
    };
  for (const event of events) {
    if (
      (at !== undefined && event.sequence > at) ||
      (event.sequence < current.lastSequence && at === undefined)
    )
      continue;
    const status = event.kind.endsWith('_finished')
      ? 'succeeded'
      : event.kind.endsWith('_failed')
      ? 'failed'
      : event.kind.endsWith('_canceled')
      ? 'canceled'
      : undefined;
    if (status)
      current = {
        ...current,
        status,
        endedAt: event.createdAt,
        durationMs: Math.max(
          0,
          Date.parse(event.createdAt) - Date.parse(entry.startedAt)
        ),
        lastSequence: event.sequence,
      };
  }
  return current;
}

export function reasonLabel(reason: string): string {
  const labels: Record<string, string> = {
    branch_not_selected: '未命中此分支',
    join_satisfied: '已满足汇合条件，取消剩余分支',
    parent_failed: '上级步骤失败，已取消此调用',
    scope_failed: '执行范围失败，已取消此调用',
    'No terminal event was recorded for this execution': '此执行未记录结束事件',
  };
  return labels[reason] ? tx(labels[reason]) : reason;
}
