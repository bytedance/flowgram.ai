/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { IContainer, IEngine, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { CodeExecutor } from '@nodes/code';
import { snapshotsToVOData } from '../utils';
import { WorkflowRuntimeContext } from '../../context';
import { WorkflowRuntimeContainer } from '../../container';
import { TestSchemas } from '.';

const container: IContainer = WorkflowRuntimeContainer.instance;

describe('WorkflowRuntime code schema', () => {
  it('should execute a workflow with code node', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.codeSchema,
      inputs: {
        input: 'hello~',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);

    // Verify the result structure based on code schema output
    expect(result).toStrictEqual({
      input: 'hello~',
      output_key0: 'hello~hello~', // Concatenated input
      output_key1: ['hello', 'world'], // Array output
      output_key2: {
        // Object output
        key21: 'hi',
      },
    });

    // Verify snapshots
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toStrictEqual([
      {
        nodeID: 'start_0',
        inputs: {},
        outputs: {
          input: 'hello~',
        },
        data: {},
      },
      {
        nodeID: 'code_0',
        inputs: {
          input: 'hello~',
        },
        outputs: {
          key0: 'hello~hello~',
          key1: ['hello', 'world'],
          key2: {
            key21: 'hi',
          },
        },
        data: {
          script: {
            language: 'javascript',
            content:
              '// Here, you can use \'params\' to access the input variables in the node and use \'output\' to output the result\n// \'params\'  have already been properly injected into the environment\n// Below is an example of retrieving the value of the parameter \'input\' from the node\'s input:\n// const input = params.input; \n// Below is an example of outputting a \'ret\' object containing multiple data types:\n// const output = { "name": \'Jack\', "hobbies": ["reading", "traveling"] };\nasync function main({ params }) {\n    // Construct the output object\n    const output = {\n        "key0": params.input + params.input, // Concatenate the value of the two input parameters\n        "key1": ["hello", "world"], // Output an array\n        "key2": { // Output an Object\n            "key21": "hi"\n        },\n    };\n    return output;\n}',
          },
        },
      },
      {
        nodeID: 'end_0',
        inputs: {
          input: 'hello~',
          output_key0: 'hello~hello~',
          output_key1: ['hello', 'world'],
          output_key2: {
            key21: 'hi',
          },
        },
        outputs: {
          input: 'hello~',
          output_key0: 'hello~hello~',
          output_key1: ['hello', 'world'],
          output_key2: {
            key21: 'hi',
          },
        },
        data: {},
      },
    ]);
  });

  it('should handle different input types in code node', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.codeSchema,
      inputs: {
        input: 'test123',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);

    // Verify the result with different input
    expect(result).toStrictEqual({
      input: 'test123',
      output_key0: 'test123test123', // Concatenated input
      output_key1: ['hello', 'world'], // Static array output
      output_key2: {
        // Static object output
        key21: 'hi',
      },
    });
  });

  it('should handle empty string input in code node', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.codeSchema,
      inputs: {
        input: '',
      },
    });

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);

    // Verify the result with empty input
    expect(result).toStrictEqual({
      input: '',
      output_key0: '', // Empty string concatenated
      output_key1: ['hello', 'world'], // Static array output
      output_key2: {
        // Static object output
        key21: 'hi',
      },
    });
  });
});

describe('CodeExecutor result ownership', () => {
  const execute = async (content: string) => {
    const runtime = WorkflowRuntimeContext.create();
    runtime.init({ schema: structuredClone(TestSchemas.codeSchema), inputs: { input: 'hello' } });
    const node = runtime.document.nodes.find((item) => item.id === 'code_0')!;
    node.data.script.content = content;
    try {
      return await new CodeExecutor().execute({
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

  it.each([
    ['object', '{ value: params.input }', { value: 'hello' }],
    ['string', 'params.input', { result: 'hello' }],
    ['number', '42', { result: 42 }],
    ['boolean', 'false', { result: false }],
    ['null', 'null', { result: null }],
    ['undefined', 'undefined', { result: undefined }],
    ['array', '[params.input, 42]', { result: ['hello', 42] }],
  ])('should return a synchronous %s result', async (_name, expression, outputs) => {
    await expect(
      execute(`function main({ params }) { return ${expression}; }`)
    ).resolves.toStrictEqual({
      outputs,
    });
  });

  it('should preserve fulfilled async results', async () => {
    await expect(
      execute('async function main({ params }) { return { value: params.input }; }')
    ).resolves.toStrictEqual({ outputs: { value: 'hello' } });
  });

  it('should preserve rejected async errors', async () => {
    await expect(
      execute('async function main() { throw new Error("async failure"); }')
    ).rejects.toThrow('async failure');
  });

  it('should execute a workflow with a synchronous main function', async () => {
    const schema = structuredClone(TestSchemas.codeSchema);
    const codeNode = schema.nodes.find((node) => node.id === 'code_0')!;
    codeNode.data!.script.content = codeNode.data!.script.content.replace(
      'async function main',
      'function main'
    );
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema,
      inputs: { input: 'hello~' },
    });

    await expect(processing).resolves.toStrictEqual({
      input: 'hello~',
      output_key0: 'hello~hello~',
      output_key1: ['hello', 'world'],
      output_key2: { key21: 'hi' },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  });
});
