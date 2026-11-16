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

describe('WorkflowRuntime loop schema', () => {
  it.each([
    [{}, 'Lesson: Light. Notes: '],
    [{ notes: 'Read chapter 2' }, 'Lesson: Light. Notes: Read chapter 2'],
  ])('renders a prompt with optional Start inputs %j', async (optionalInputs, expectedPrompt) => {
    const schema = structuredClone(TestSchemas.loopSchema);
    const start = schema.nodes.find((node) => node.id === 'start_0')!;
    start.data.outputs.properties.notes = { type: 'string' };
    const loop = schema.nodes.find((node) => node.id === 'loop_0')!;
    const llm = loop.blocks!.find((node) => node.id === 'llm_0')!;
    llm.data.inputsValues.prompt.content =
      'Lesson: {{loop_0_locals.item}}. Notes: {{start_0.notes}}';

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema,
      inputs: { tasks: ['Light'], ...optionalInputs },
    });
    await processing;

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots.find((snapshot) => snapshot.nodeID === 'llm_0')?.inputs.prompt).toBe(
      expectedPrompt
    );
  });

  it('should execute a workflow with input', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.loopSchema,
      inputs: {
        tasks: [
          'TASK - A',
          'TASK - B',
          'TASK - C',
          'TASK - D',
          'TASK - E',
          'TASK - F',
          'TASK - G',
          'TASK - H',
        ],
      },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({
      outputs: [
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.0", prompt is "TASK - A"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.1", prompt is "TASK - B"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.2", prompt is "TASK - C"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.7", prompt is "TASK - H"',
      ],
    });
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toStrictEqual([
      {
        nodeID: 'start_0',
        inputs: {},
        outputs: {
          tasks: [
            'TASK - A',
            'TASK - B',
            'TASK - C',
            'TASK - D',
            'TASK - E',
            'TASK - F',
            'TASK - G',
            'TASK - H',
          ],
        },
        data: {},
      },
      {
        nodeID: 'loop_0',
        inputs: {},
        outputs: {
          results: [
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.0", prompt is "TASK - A"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.1", prompt is "TASK - B"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.2", prompt is "TASK - C"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.7", prompt is "TASK - H"',
          ],
          items: [
            'TASK - A',
            'TASK - B',
            'TASK - C',
            'TASK - D',
            'TASK - E',
            'TASK - F',
            'TASK - G',
            'TASK - H',
          ],
          indexes: [0, 1, 2, 3, 4, 5, 6, 7],
        },
        data: {
          loopFor: { type: 'ref', content: ['start_0', 'tasks'] },
          loopOutputs: {
            results: { type: 'ref', content: ['llm_0', 'result'] },
            items: { type: 'ref', content: ['loop_0_locals', 'item'] },
            indexes: { type: 'ref', content: ['loop_0_locals', 'index'] },
          },
        },
      },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.0',
          prompt: 'TASK - A',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.0", prompt is "TASK - A"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.1',
          prompt: 'TASK - B',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.1", prompt is "TASK - B"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.2',
          prompt: 'TASK - C',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.2", prompt is "TASK - C"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.3',
          prompt: 'TASK - D',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.4',
          prompt: 'TASK - E',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.5',
          prompt: 'TASK - F',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.6',
          prompt: 'TASK - G',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      { nodeID: 'block_start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'llm_0',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: 'You are a helpful assistant No.7',
          prompt: 'TASK - H',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.7", prompt is "TASK - H"',
        },
        data: {},
      },
      { nodeID: 'block_end_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'end_0',
        inputs: {
          outputs: [
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.0", prompt is "TASK - A"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.1", prompt is "TASK - B"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.2", prompt is "TASK - C"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.7", prompt is "TASK - H"',
          ],
        },
        outputs: {
          outputs: [
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.0", prompt is "TASK - A"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.1", prompt is "TASK - B"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.2", prompt is "TASK - C"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.7", prompt is "TASK - H"',
          ],
        },
        data: {},
      },
    ]);
    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.loop_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_0.snapshots.length).toBe(8);
    expect(report.reports.block_start_0.snapshots.length).toBe(8);
    expect(report.reports.block_end_0.snapshots.length).toBe(8);
  });
});
