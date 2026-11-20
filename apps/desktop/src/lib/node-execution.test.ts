/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { expect, it } from 'vitest';

import { canvasExecutions, scopedCanvasExecutions } from './node-execution';
import type { Execution, TraceDetail } from './run-trace';

it('does not turn an earlier iteration failure into a success or mix workflows', () => {
  const detail: { trace: Pick<TraceDetail['trace'], 'nodes'> } = {
    trace: {
      nodes: [
        { workflowId: 'root', nodeId: 'worker', total: 120, counts: { failed: 2, succeeded: 118 } },
        { workflowId: 'child', nodeId: 'worker', total: 1, counts: { succeeded: 1 } },
      ],
    },
  };
  expect(canvasExecutions(detail, 'root').worker).toMatchObject({
    status: 'failed',
    total: 120,
    counts: { failed: 2, succeeded: 118 },
  });
});
it('shows a selected iteration with its own time, path and attempt, excluding child calls', () => {
  const entries = [
    {
      id: 'e',
      kind: 'node',
      nodeId: 'worker',
      workflowId: 'root',
      durationMs: 12,
      startedAt: '2026-01-01T00:00:00Z',
      iterationPath: [36],
      attempt: 2,
      status: 'failed',
    },
    { id: 'tool', kind: 'tool', nodeId: 'worker', workflowId: 'root', status: 'succeeded' },
  ] as Execution[];
  expect(scopedCanvasExecutions(entries, 'root').worker).toMatchObject({
    status: 'failed',
    total: 1,
    durationMs: 12,
    iterationPath: [36],
    attempt: 2,
  });
});
