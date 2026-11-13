import { afterEach, describe, expect, it, vi } from 'vitest';
import { IEngine, IExecutor, WorkflowSchema, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeContainer } from '../../container';

const schema: WorkflowSchema = {
  nodes: [
    {
      id: 'start',
      type: 'start',
      meta: { position: { x: 0, y: 0 } },
      data: {
        title: 'Start',
        outputs: { type: 'object', properties: { token: { type: 'string' } } },
      },
    },
    { id: 'first', type: 'empty', meta: { position: { x: 100, y: 0 } }, data: { title: 'First' } },
    {
      id: 'second',
      type: 'empty',
      meta: { position: { x: 100, y: 100 } },
      data: { title: 'Second' },
    },
    { id: 'end', type: 'end', meta: { position: { x: 200, y: 0 } }, data: { title: 'End' } },
    {
      id: 'after-second',
      type: 'empty',
      meta: { position: { x: 150, y: 100 } },
      data: { title: 'After second' },
    },
  ],
  edges: [
    { sourceNodeID: 'start', targetNodeID: 'first' },
    { sourceNodeID: 'start', targetNodeID: 'second' },
    { sourceNodeID: 'first', targetNodeID: 'end' },
    { sourceNodeID: 'second', targetNodeID: 'after-second' },
    { sourceNodeID: 'after-second', targetNodeID: 'end' },
  ],
};

function deferred() {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((done, fail) => {
    resolve = done;
    reject = fail;
  });
  return { promise, resolve, reject };
}

describe('parallel branch completion', () => {
  afterEach(() => vi.restoreAllMocks());

  it.each([
    [false, 0],
    [true, 0],
    [false, 1],
    [true, 1],
    [false, 2],
    [true, 2],
  ])(
    'drains a running sibling before settling a failed task (sibling rejects: %s, nested: %s)',
    async (rejectSibling, nested) => {
      const container = WorkflowRuntimeContainer.instance;
      const executor = container.get<IExecutor>(IExecutor);
      const original = executor.execute.bind(executor);
      const first = deferred();
      const second = deferred();
      const started: string[] = [];
      const downstream: string[] = [];
      const graph = structuredClone(schema);
      if (nested) {
        graph.nodes.push(
          {
            id: 'parent',
            type: 'empty',
            meta: { position: { x: 50, y: 100 } },
            data: { title: 'Parent' },
          },
          {
            id: 'peer',
            type: 'empty',
            meta: { position: { x: 100, y: 200 } },
            data: { title: 'Peer' },
          }
        );
        graph.edges.find((edge) => edge.targetNodeID === 'second')!.sourceNodeID = 'parent';
        if (nested === 2) {
          graph.edges.find((edge) => edge.targetNodeID === 'first')!.sourceNodeID = 'parent';
        }
        graph.edges.push(
          { sourceNodeID: 'start', targetNodeID: 'parent' },
          { sourceNodeID: 'parent', targetNodeID: 'peer' },
          { sourceNodeID: 'peer', targetNodeID: 'end' }
        );
      }
      vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(executor, 'execute').mockImplementation(async (context) => {
        if (context.node.id === 'first' || context.node.id === 'second') {
          started.push(context.node.id);
          await (context.node.id === 'first' ? first.promise : second.promise);
          return { outputs: {} };
        }
        if (context.node.id === 'parent' || context.node.id === 'peer') return { outputs: {} };
        if (context.node.id === 'after-second' || context.node.id === 'end') {
          downstream.push(context.node.id);
          return { outputs: {} };
        }
        return original(context);
      });
      const task = container.get<IEngine>(IEngine).invoke({ schema: graph, inputs: {} });
      const dispose = vi.spyOn(task.context, 'dispose');
      let settled = false;
      task.processing.then(() => {
        settled = true;
      });
      try {
        await vi.waitFor(() => expect(started).toHaveLength(2));
        first.reject(new Error('first branch failed'));
        // Flush promises while the independent sibling is still blocked.
        for (let i = 0; i < 20; i++) await Promise.resolve();
        expect(task.context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
        expect(settled).toBe(false);
        expect(dispose).not.toHaveBeenCalled();
      } finally {
        if (rejectSibling) second.reject(new Error('second branch failed'));
        else second.resolve();
        expect(await task.processing).toEqual({});
      }
      expect(settled).toBe(true);
      expect(dispose).toHaveBeenCalledOnce();
      expect(downstream).toEqual([]);
    }
  );

  it('keeps successful parallel execution working', async () => {
    const container = WorkflowRuntimeContainer.instance;
    const executor = container.get<IExecutor>(IExecutor);
    const original = executor.execute.bind(executor);
    vi.spyOn(executor, 'execute').mockImplementation(async (context) => {
      if (['first', 'second', 'after-second'].includes(context.node.id)) return { outputs: {} };
      return original(context);
    });
    const task = container
      .get<IEngine>(IEngine)
      .invoke({ schema: structuredClone(schema), inputs: {} });
    await task.processing;
    expect(task.context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  });

  it('keeps runtime variables available to the still-running sibling', async () => {
    const container = WorkflowRuntimeContainer.instance;
    const executor = container.get<IExecutor>(IExecutor);
    const original = executor.execute.bind(executor);
    const first = deferred();
    const second = deferred();
    const started: string[] = [];
    const observed: unknown[] = [];
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(executor, 'execute').mockImplementation(async (context) => {
      if (context.node.id === 'first' || context.node.id === 'second') {
        started.push(context.node.id);
        await (context.node.id === 'first' ? first.promise : second.promise);
        observed.push(
          context.runtime.variableStore.getValue({ nodeID: 'start', variableKey: 'token' })?.value
        );
        return { outputs: {} };
      }
      return original(context);
    });
    const task = container
      .get<IEngine>(IEngine)
      .invoke({ schema: structuredClone(schema), inputs: { token: 'kept' } });
    await vi.waitFor(() => expect(started).toHaveLength(2));
    first.reject(new Error('first branch failed'));
    for (let i = 0; i < 20; i++) await Promise.resolve();
    second.resolve();
    await task.processing;
    for (let i = 0; i < 20; i++) await Promise.resolve();
    expect(observed).toEqual(['kept']);
  });
});
