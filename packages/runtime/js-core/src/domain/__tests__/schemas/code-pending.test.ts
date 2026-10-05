/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it, vi } from 'vitest';
import { getQuickJS, QuickJSRuntime } from 'quickjs-emscripten';
import * as quickJS from 'quickjs-emscripten';
import { IEngine, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { CodeExecutor } from '@nodes/code';
import { WorkflowRuntimeContext } from '../../context';
import { WorkflowRuntimeContainer } from '../../container';
import { TestSchemas } from '.';

const container = WorkflowRuntimeContainer.instance;
const execute = async (content: string, Executor = CodeExecutor) => {
  const runtime = WorkflowRuntimeContext.create();
  runtime.init({ schema: structuredClone(TestSchemas.codeSchema), inputs: { input: 'hello' } });
  const node = runtime.document.nodes.find((item) => item.id === 'code_0')!;
  node.data.script.content = content;
  try {
    return await new Executor().execute({
      node,
      inputs: { input: 'hello' },
      container,
      runtime,
      snapshot: runtime.snapshotCenter.create({ nodeID: node.id, data: node.data }),
    });
  } finally {
    runtime.dispose();
  }
};

describe('CodeExecutor pending jobs', () => {
  it.each([
    [
      'await',
      'async function main({ params }) { return { value: await Promise.resolve(params.input) }; }',
    ],
    [
      'then',
      'function main({ params }) { return Promise.resolve(params.input).then(value => ({ value })); }',
    ],
    [
      'nested awaits',
      'async function main({ params }) { const value = await Promise.resolve(params.input); await Promise.resolve(); return { value }; }',
    ],
    ['settled async', 'async function main({ params }) { return { value: params.input }; }'],
  ])(
    'returns the result of %s',
    async (_name, content) => {
      await expect(execute(content)).resolves.toStrictEqual({ outputs: { value: 'hello' } });
    },
    1500
  );

  it('wraps primitive results after awaiting', async () => {
    await expect(
      execute('async function main() { return await Promise.resolve(42); }')
    ).resolves.toStrictEqual({ outputs: { result: 42 } });
  }, 1500);

  it('propagates rejected pending promises', async () => {
    await expect(
      execute(
        'async function main() { await Promise.resolve(); throw new Error("async failure"); }'
      )
    ).rejects.toThrow('Code execution failed: async failure');
  }, 1500);

  it('preserves settled rejection handling', async () => {
    await expect(
      execute('async function main() { throw new Error("settled failure"); }')
    ).rejects.toThrow('settled failure');
  });

  it('completes the workflow after chained code promises', async () => {
    const schema = structuredClone(TestSchemas.codeSchema);
    const code = schema.nodes.find((node) => node.id === 'code_0')!;
    code.data!.script.content = code.data!.script.content.replace(
      'return output;',
      'return Promise.resolve(output).then(async value => { await Promise.resolve(); return value; });'
    );
    const { context, processing } = container
      .get<IEngine>(IEngine)
      .invoke({ schema, inputs: { input: 'hello~' } });
    await expect(processing).resolves.toStrictEqual({
      input: 'hello~',
      output_key0: 'hello~hello~',
      output_key1: ['hello', 'world'],
      output_key2: { key21: 'hi' },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  }, 1500);

  it('fails the workflow when a code promise rejects after awaiting', async () => {
    const schema = structuredClone(TestSchemas.codeSchema);
    const code = schema.nodes.find((node) => node.id === 'code_0')!;
    code.data!.script.content =
      'async function main() { await Promise.resolve(); throw new Error("workflow failure"); }';
    const { context, processing } = container
      .get<IEngine>(IEngine)
      .invoke({ schema, inputs: { input: 'hello~' } });
    await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const report = context.reporter.export();
    expect(report.reports.code_0.status).toBe(WorkflowStatus.Failed);
  }, 1500);
  it('enforces the existing deadline while running queued jobs', async () => {
    const QuickJS = await getQuickJS();
    const probe = QuickJS.newContext();
    const prototype: QuickJSRuntime = Object.getPrototypeOf(probe.runtime);
    const runJobs = prototype.executePendingJobs;
    probe.dispose();
    const now = vi.spyOn(Date, 'now').mockReturnValue(0);
    const jobs = vi
      .spyOn(prototype, 'executePendingJobs')
      .mockImplementation(function (this: QuickJSRuntime, maxJobs?: number | void) {
        now.mockReturnValue(60_001);
        return runJobs.call(this, maxJobs);
      });
    try {
      await expect(
        execute('async function main() { await Promise.resolve(); while (true) { await 0; } }')
      ).rejects.toThrow('interrupted');
      expect(jobs).toHaveBeenCalled();
    } finally {
      jobs.mockRestore();
      now.mockRestore();
    }
    await expect(execute('async function main() { return { ok: true }; }')).resolves.toStrictEqual({
      outputs: { ok: true },
    });
  }, 1500);
});

describe('CodeExecutor pending job resources', () => {
  it.each(['growth', 'exhaustion'])('releases the context after memory %s', async (scenario) => {
    vi.resetModules();
    const actual = await vi.importActual<typeof import('quickjs-emscripten')>('quickjs-emscripten');
    const module = await actual.newQuickJSWASMModule();
    vi.doMock('quickjs-emscripten', () => ({ ...actual, getQuickJS: async () => module }));
    const { CodeExecutor: FreshExecutor } = await import('@nodes/code');
    const run = (content: string) => execute(content, FreshExecutor);
    const contexts: quickJS.QuickJSContext[] = [];
    const createContext = module.newContext.bind(module);
    const create = vi.spyOn(module, 'newContext').mockImplementation((...args) => {
      const context = createContext(...args);
      contexts.push(context);
      return context;
    });
    const initialBytes = module.getWasmMemory().buffer.byteLength;
    try {
      if (scenario === 'growth') {
        await expect(
          run(`async function main() {
          await 0;
          const values = Array.from({ length: 200 }, () => Array(10000).fill(42));
          return { length: values.length };
        }`)
        ).resolves.toStrictEqual({ outputs: { length: 200 } });
      } else {
        await expect(
          run(`async function main() {
          await 0;
          const values = [];
          while (true) {
            values.push(Array(100000).fill(values.length));
            await 0;
          }
        }`)
        ).rejects.toThrow('Code execution failed: out of memory');
      }
      expect(module.getWasmMemory().buffer.byteLength).toBeGreaterThan(initialBytes);
      expect(contexts).toHaveLength(1);
      expect(contexts[0].alive).toBe(false);
      await expect(
        run('async function main() { await 0; return { ok: true }; }')
      ).resolves.toStrictEqual({ outputs: { ok: true } });
      expect(contexts).toHaveLength(2);
      expect(contexts[1].alive).toBe(false);
    } finally {
      vi.doUnmock('quickjs-emscripten');
      create.mockRestore();
    }
  });
});
