/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  IEngine,
  InvokeParams,
  WorkflowOutputs,
  WorkflowStatus,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeTask } from '@workflow/task';
import { WorkflowRuntimeContext } from '@workflow/context';
import { WorkflowRuntimeContainer } from '@workflow/container';
import { TestSchemas } from '@workflow/__tests__/schemas';
import { WorkflowApplication } from './workflow';

const params: InvokeParams = {
  schema: {
    nodes: [
      TestSchemas.basicSchema.nodes[0],
      {
        ...TestSchemas.basicSchema.nodes[1],
        data: {
          inputsValues: {
            model_name: { type: 'ref', content: ['start_0', 'model_name'] },
          },
          inputs: { type: 'object', properties: { model_name: { type: 'string' } } },
        },
      },
    ],
    edges: [{ sourceNodeID: 'start_0', targetNodeID: 'end_0' }],
  },
  inputs: {
    model_name: 'ai-model',
    llm_settings: { temperature: 0.5 },
    work: { role: 'Chat', task: 'Tell me a story about love' },
  },
};

const engine = WorkflowRuntimeContainer.instance.get<IEngine>(IEngine);

function createPendingTask() {
  let resolve!: (outputs: WorkflowOutputs) => void;
  let reject!: (error: Error) => void;
  const processing = new Promise<WorkflowOutputs>((resolveTask, rejectTask) => {
    resolve = resolveTask;
    reject = rejectTask;
  });
  const context = WorkflowRuntimeContext.create();
  context.init(params);
  context.statusCenter.workflow.process();
  const task = WorkflowRuntimeTask.create({ processing, context });
  vi.spyOn(engine, 'invoke').mockReturnValueOnce(task);
  return { task, resolve, reject };
}

describe('WorkflowApplication task retention', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('keeps real workflow results queryable until the retention deadline', async () => {
    const app = new WorkflowApplication();
    const taskID = app.run(params);
    const outputs = await app.tasks.get(taskID)!.processing;

    expect(app.result(taskID)).toEqual(outputs);
    expect(app.report(taskID)?.inputs).toEqual(params.inputs);
    await vi.advanceTimersByTimeAsync(5 * 60 * 1000 - 1);
    expect(app.result(taskID)).toEqual(outputs);
    // Reading a result does not extend its lifetime.
    await vi.advanceTimersByTimeAsync(1);
    expect(app.tasks.size).toBe(0);
    expect(app.report(taskID)).toBeUndefined();
    expect(app.result(taskID)).toBeUndefined();
    expect(app.cancel(taskID)).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('returns true for a retained completed task without changing its terminal status', async () => {
    const app = new WorkflowApplication({ taskRetentionMs: 100 });
    const taskID = app.run(params);
    await app.tasks.get(taskID)!.processing;

    expect(app.report(taskID)?.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(app.cancel(taskID)).toBe(true);
    expect(app.report(taskID)?.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
  });

  it('expires validation failures as well as successful tasks', async () => {
    const app = new WorkflowApplication({ taskRetentionMs: 100 });
    const taskID = app.run({ schema: { nodes: [], edges: [] }, inputs: {} });
    await app.tasks.get(taskID)!.processing;
    expect(app.report(taskID)?.workflowStatus.status).toBe(WorkflowStatus.Failed);
    await vi.advanceTimersByTimeAsync(100);
    expect(app.tasks.size).toBe(0);
  });

  it('expires rejected processing promises without an unhandled rejection', async () => {
    const app = new WorkflowApplication({ taskRetentionMs: 100 });
    const { task, reject } = createPendingTask();
    const taskID = app.run(params);
    reject(new Error('Execution failed'));
    await expect(task.processing).rejects.toThrow('Execution failed');
    expect(app.tasks.has(taskID)).toBe(true);
    await vi.advanceTimersByTimeAsync(100);
    expect(app.tasks.size).toBe(0);
  });

  it('starts retention only after a cancelled execution settles', async () => {
    const app = new WorkflowApplication({ maxTasks: 1, taskRetentionMs: 100 });
    const { task, resolve } = createPendingTask();
    const taskID = app.run(params);
    expect(app.cancel(taskID)).toBe(true);
    await vi.advanceTimersByTimeAsync(1000);
    expect(app.tasks.has(taskID)).toBe(true);
    expect(() => app.run(params)).toThrow('Task capacity reached');
    resolve({});
    await task.processing;
    expect(app.report(taskID)?.workflowStatus.status).toBe(WorkflowStatus.Cancelled);
    await vi.advanceTimersByTimeAsync(100);
    expect(app.tasks.size).toBe(0);
  });

  it('rejects excess tasks before invoking the engine and accepts work after cleanup', async () => {
    const app = new WorkflowApplication({ maxTasks: 1, taskRetentionMs: 100 });
    const { task, resolve } = createPendingTask();
    const invoke = vi.mocked(engine.invoke);
    app.run(params);
    expect(() => app.run(params)).toThrow('Task capacity reached');
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(app.tasks.size).toBe(1);
    resolve({});
    await task.processing;
    await vi.advanceTimersByTimeAsync(100);
    expect(() => app.run(params)).not.toThrow();
    await app.tasks.values().next().value!.processing;
  });

  it('evicts the oldest completed task without removing a running task', async () => {
    const app = new WorkflowApplication({ maxTasks: 2, taskRetentionMs: 100 });
    const first = createPendingTask();
    const runningID = app.run(params);
    const second = createPendingTask();
    const completedID = app.run(params);
    second.resolve({});
    await second.task.processing;

    const replacementID = app.run(params);
    expect(app.tasks.has(completedID)).toBe(false);
    expect(app.tasks.has(runningID)).toBe(true);
    expect(app.tasks.has(replacementID)).toBe(true);
    expect(app.tasks.size).toBe(2);
    // The evicted task's timer is cleared rather than accumulating in the background.
    expect(vi.getTimerCount()).toBe(0);
    first.resolve({});
    await Promise.all([first.task.processing, app.tasks.get(replacementID)!.processing]);
    await vi.advanceTimersByTimeAsync(100);
    expect(app.tasks.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('bounds retained payloads during repeated submissions and cleans up while idle', async () => {
    const app = new WorkflowApplication({ maxTasks: 10, taskRetentionMs: 100 });
    const taskIDs: string[] = [];
    for (let index = 0; index < 150; index++) {
      const { task, resolve } = createPendingTask();
      task.context.ioCenter.setOutputs({ payload: 'x'.repeat(100000) });
      task.context.statusCenter.workflow.success();
      taskIDs.push(app.run(params));
      resolve(task.context.ioCenter.outputs);
      await task.processing;
      expect(app.tasks.size).toBeLessThanOrEqual(10);
      expect(vi.getTimerCount()).toBeLessThanOrEqual(10);
    }
    expect(app.tasks.size).toBe(10);
    expect(app.report(taskIDs[0])).toBeUndefined();
    expect(app.result(taskIDs[149])?.payload).toHaveLength(100000);
    await vi.advanceTimersByTimeAsync(100);
    expect(app.tasks.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('supports immediate cleanup when retention is disabled', async () => {
    const app = new WorkflowApplication({ taskRetentionMs: 0 });
    const taskID = app.run(params);
    await app.tasks.get(taskID)!.processing;
    expect(app.tasks.size).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each([0, -1, 1.5, Infinity, NaN])('rejects invalid capacity %s', (maxTasks) => {
    expect(() => new WorkflowApplication({ maxTasks })).toThrow('maxTasks');
  });

  it.each([-1, 1.5, Infinity, NaN, 2147483648])(
    'rejects invalid retention %s',
    (taskRetentionMs) => {
      expect(() => new WorkflowApplication({ taskRetentionMs })).toThrow('taskRetentionMs');
    }
  );
});
