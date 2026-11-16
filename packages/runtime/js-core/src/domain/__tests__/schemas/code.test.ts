/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import { IContainer, IEngine, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { snapshotsToVOData } from '../utils';
import { WorkflowRuntimeContainer } from '../../container';
import { TestSchemas } from '.';

const container: IContainer = WorkflowRuntimeContainer.instance;

describe('WorkflowRuntime code schema', () => {
  it.each([
    { output: '{ key0: null }', expected: null },
    { output: '{}', expected: 'fallback' },
  ])('applies an output default only to a missing result ($output)', async ({ output, expected }) => {
    const schema = structuredClone(TestSchemas.codeSchema);
    const node = schema.nodes.find((item) => item.id === 'code_0')!;
    node.data.outputs.properties.key0.default = 'fallback';
    node.data.script.content = `async function main() { return ${output}; }`;
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({ schema, inputs: { input: 'lesson' } });

    expect(await processing).toHaveProperty('output_key0', expected);
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  });

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
