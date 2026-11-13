/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';

import {
  aggregateStatus,
  mergeExecutionPage,
  mergeTraceDetail,
  executionFromEvents,
  type TraceDetail,
  pairGroups,
  instanceKey,
  type ComparisonGroup,
  duration,
  executionData,
  mergeExecutions,
  type Execution,
} from './run-trace';
import type { RuntimeEvent } from './types';

const event = (
  sequence: number,
  kind: string,
  data: unknown
): RuntimeEvent => ({
  sequence,
  kind,
  data: JSON.stringify(data),
  objectId: 'run',
  createdAt: '2026-10-20T00:00:00Z',
});
describe('run inspection', () => {
  it('keeps separate iterations while updating an execution in place', () => {
    const first = {
      id: 'round-1',
      firstSequence: 1,
      status: 'running',
    } as Execution;
    const second = {
      id: 'round-2',
      firstSequence: 2,
      status: 'succeeded',
    } as Execution;
    expect(
      mergeExecutions([first, second], [{ ...first, status: 'failed' }])
    ).toEqual([{ ...first, status: 'failed' }, second]);
    expect(aggregateStatus({ failed: 1, succeeded: 119 })).toBe('failed');
    expect(aggregateStatus({ succeeded: 3, running: 1 })).toBe('running');
  });
  it('distinguishes absent payloads from null and preserves model metadata', () => {
    const events = [
      event(1, 'model_started', {
        inputs: null,
        model: { modelName: 'Pinned' },
      }),
      event(2, 'model_output_started', { firstOutputMs: 42 }),
      event(3, 'model_finished', {
        outputs: { usage: { input_tokens: 12 }, output: [] },
      }),
    ];
    const data = executionData(events);
    expect(data.inputs).toBeNull();
    expect(data.metadata.model).toEqual({ modelName: 'Pinned' });
    expect(data.firstOutputMs).toBe(42);
    expect(data.outputs).toHaveProperty('usage.input_tokens', 12);
    expect(executionData([]).inputs).toBeUndefined();
  });
  it('does not invent a duration for interrupted or unrecorded spans', () => {
    expect(duration(null)).toBe('—');
    expect(duration(0)).toBe('<1 ms');
    expect(duration(0.4)).toBe('<1 ms');
    expect(duration(Number.NaN)).toBe('—');
    expect(duration(-1)).toBe('—');
    expect(duration(1250)).toBe('1.3 s');
    expect(duration(59999)).toBe('1 m 0 s');
    expect(duration(119999)).toBe('2 m 0 s');
    expect(
      executionData([event(1, 'http_failed', { error: 'Connection failed' })])
        .error
    ).toBe('Connection failed');
  });
  it('matches debug copies by definition identity and separates repeated call paths', () => {
    const group = {
      canonicalWorkflowId: 'original',
      nodeId: 'parse',
    } as ComparisonGroup;
    const pairs = pairGroups(
      [group],
      [
        { ...group, workflowId: 'copy' },
        { ...group, canonicalWorkflowId: 'another' },
      ]
    );
    expect(pairs).toHaveLength(2);
    expect(pairs[0].left).toBeDefined();
    expect(pairs[0].right?.workflowId).toBe('copy');
    expect(pairs[1].left).toBeUndefined();
    const entry = {
      parentPath: ['loop', 'first-call'],
      iterationPath: [36],
      branchPath: ['approval'],
      attempt: 1,
    } as Execution;
    expect(instanceKey(entry)).not.toBe(
      instanceKey({ ...entry, parentPath: ['loop', 'second-call'] })
    );
    expect(instanceKey(entry)).not.toBe(
      instanceKey({ ...entry, iterationPath: [37] })
    );
  });
  it('keeps loaded pages and immutable metadata while live updates arrive', () => {
    const previous = Array.from(
      { length: 120 },
      (_, index) =>
        ({
          id: String(index),
          firstSequence: index + 1,
          status: 'running',
        } as Execution)
    );
    const next = previous
      .slice(0, 100)
      .map((entry) => ({ ...entry, status: 'succeeded' }));
    const page = mergeExecutionPage(
      { executions: previous, nextCursor: null, total: 120 },
      { executions: next, nextCursor: 100, total: 150 }
    );
    expect(page.executions).toHaveLength(120);
    expect(page.nextCursor).toBe(120);
    expect(page.executions[0].status).toBe('succeeded');
    const prior = {
      snapshot: { id: 'frozen' },
      manifest: { workflows: [] },
      run: { id: 'run', inputs: { orderId: 37 } },
      trace: {},
    } as unknown as TraceDetail;
    const merged = mergeTraceDetail(prior, {
      run: { status: 'succeeded' },
      trace: prior.trace,
    });
    expect(merged.snapshot).toBe(prior.snapshot);
    expect(merged.run.inputs).toEqual({ orderId: 37 });
    expect(merged.run.status).toBe('succeeded');
  });
  it('updates a selected terminal state without exposing events after the replay cursor', () => {
    const entry = {
      id: 'one',
      startedAt: '2026-10-20T00:00:00Z',
      firstSequence: 1,
      lastSequence: 1,
      status: 'running',
      inputsAvailable: true,
      children: 0,
    } as Execution;
    const finished = {
      ...event(2, 'node_finished', { outputs: { result: 1 } }),
      createdAt: '2026-10-20T00:00:01Z',
    };
    expect(executionFromEvents(entry, [finished])?.status).toBe('succeeded');
    expect(
      executionFromEvents(
        { ...entry, lastSequence: 2, status: 'failed' },
        [finished],
        0
      )?.status
    ).toBe('pending');
    expect(
      executionFromEvents(
        { ...entry, lastSequence: 2, status: 'failed' },
        [finished],
        0
      )?.inputsAvailable
    ).toBe(false);
  });
});
