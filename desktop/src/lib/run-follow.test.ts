/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { afterEach, describe, expect, it, vi } from 'vitest';

import { followRunEvent, initialRunFollow, RunFollowCamera } from './run-follow';
import type { RuntimeEvent, WorkflowSchema } from './types';

const schema: WorkflowSchema = { nodes: [
  { id: 'fork', type: 'parallel', data: {} },
  { id: 'a', type: 'wait', data: {} },
  { id: 'b', type: 'wait', data: {} },
  { id: 'loop', type: 'loop', data: {}, blocks: [
    { id: 'child', type: 'wait', data: {} },
  ] },
], edges: [] };
let sequence = 0;
const event = (kind: string, nodeId: string, executionId = nodeId,
  extra: Record<string, unknown> = {}): RuntimeEvent => ({
  sequence: ++sequence, kind, objectId: 'run', createdAt: '',
  data: JSON.stringify({ workflowId: 'workflow', nodeId, executionId, ...extra }),
});
const reduce = (state: typeof initialRunFollow, item: RuntimeEvent) =>
  followRunEvent(state, item, 'run', 'workflow', schema);

afterEach(() => vi.useRealTimers());
describe('trial run focus', () => {
  it('descends into a parallel fork and stays with a branch until it completes', () => {
    let state = reduce(initialRunFollow, event('node_started', 'fork'));
    state = reduce(state, event('node_started', 'a', 'a', { parentExecutionId: 'fork' }));
    state = reduce(state, event('node_started', 'b', 'b', { parentExecutionId: 'fork' }));
    expect(state.nodeId).toBe('a');
    state = reduce(state, event('node_finished', 'a'));
    expect(state.nodeId).toBe('b');
  });
  it('focuses loop children across iterations without treating a previous terminal event as current', () => {
    let state = reduce(initialRunFollow, event('node_started', 'loop'));
    state = reduce(state, event('node_started', 'child', 'first'));
    state = reduce(state, event('node_started', 'child', 'second'));
    state = reduce(state, event('node_finished', 'child', 'first'));
    expect(state.nodeId).toBe('child');
    expect(Object.keys(state.active)).toEqual(['loop', 'second']);
  });
  it('ignores unrelated workflows, missing nodes, malformed data, and other runs', () => {
    for (const item of [
      event('node_started', 'a', 'a', { workflowId: 'subworkflow' }),
      event('node_started', 'deleted'),
      { ...event('node_started', 'a'), objectId: 'other-run' },
      { ...event('node_started', 'a'), data: '{' },
      { ...event('node_started', 'a'), data: 'null' },
    ]) expect(reduce(initialRunFollow, item)).toBe(initialRunFollow);
  });
  it('retains the originating failure after parent failures and cancellation', () => {
    let state = reduce(initialRunFollow, event('node_started', 'loop'));
    state = reduce(state, event('node_started', 'child'));
    state = reduce(state, event('node_failed', 'child'));
    state = reduce(state, event('node_failed', 'loop'));
    state = reduce(state, event('run_finished', ''));
    expect(state.nodeId).toBe('child');
    expect(state.finished).toBe(true);
    expect(reduce(state, event('node_started', 'a'))).toBe(state);
  });
});
describe('run camera scheduling', () => {
  it('coalesces fast steps and serializes movement toward only the latest pending step', async () => {
    vi.useFakeTimers();
    let finish = () => {};
    const move = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
    const camera = new RunFollowCamera(move, vi.fn());
    camera.follow('a'); camera.follow('b'); camera.follow('child');
    await vi.advanceTimersByTimeAsync(120);
    expect(move.mock.calls).toEqual([['child']]);
    camera.follow('a'); camera.follow('b');
    await vi.advanceTimersByTimeAsync(1000);
    expect(move).toHaveBeenCalledTimes(1);
    finish();
    await vi.advanceTimersByTimeAsync(120);
    expect(move.mock.calls).toEqual([['child'], ['b']]);
    finish(); camera.stop();
  });
  it('immediately cancels on manual interaction, drops queued steps and allows resume on the same node', async () => {
    vi.useFakeTimers();
    let finish = () => {};
    const move = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
    const cancel = vi.fn();
    const camera = new RunFollowCamera(move, cancel);
    camera.follow('a');
    await vi.advanceTimersByTimeAsync(120);
    camera.follow('b'); camera.stop(); finish();
    await vi.advanceTimersByTimeAsync(2000);
    expect(cancel).toHaveBeenCalledOnce();
    expect(move).toHaveBeenCalledOnce();
    camera.follow('a');
    await vi.advanceTimersByTimeAsync(120);
    expect(move).toHaveBeenCalledTimes(2);
    finish(); camera.stop();
  });
  it('cancels a pending focus before editor disposal or switching runs', async () => {
    vi.useFakeTimers();
    const move = vi.fn(async () => {});
    const camera = new RunFollowCamera(move, vi.fn());
    camera.follow('a'); camera.stop();
    await vi.advanceTimersByTimeAsync(2000);
    expect(move).not.toHaveBeenCalled();
  });
});
