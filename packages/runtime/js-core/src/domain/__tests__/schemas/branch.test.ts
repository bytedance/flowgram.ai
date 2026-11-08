/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import {
  ConditionOperator,
  IContainer,
  IEngine,
  WorkflowStatus,
} from '@flowgram.ai/runtime-interface';

import { snapshotsToVOData } from '../utils';
import { WorkflowRuntimeContainer } from '../../container';
import { TestSchemas } from '.';

const container: IContainer = WorkflowRuntimeContainer.instance;

describe('WorkflowRuntime branch schema', () => {
  it.each([
    { timestamp: '2026-01-15T00:30:00.000Z', branch: 'if_1' },
    { timestamp: '2026-01-15T07:00:00+08:00', branch: 'else' },
    { timestamp: '2026-01-14T19:30:00.000-05:00', branch: 'if_1' },
  ])('compares a nested timestamp $timestamp by its instant', async ({ timestamp, branch }) => {
    const schema = structuredClone(TestSchemas.branchSchema);
    schema.globalVariable = {
      type: 'object',
      properties: { record: { type: 'object', default: { timestamp } } },
    };
    const condition = schema.nodes.find((node) => node.id === 'condition_0')!;
    condition.data.conditions = [
      {
        key: 'if_1',
        value: {
          left: { type: 'ref', content: ['global', 'record', 'timestamp'] },
          operator: ConditionOperator.GT,
          right: { type: 'constant', content: '2026-01-15T00:00:00.000Z' },
        },
      },
    ];

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema,
      inputs: { model_id: 1, prompt: 'hello' },
    });
    await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    const snapshot = context.snapshotCenter
      .exportAll()
      .find((item) => item.nodeID === 'condition_0');
    expect(snapshot?.branch).toBe(branch);
  });

  it('should execute a workflow with branch 1', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.branchSchema,
      inputs: {
        model_id: 1,
        prompt: 'Tell me a joke',
      },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({
      m1_res: `Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.5, system prompt is "I'm Model 1.", prompt is "Tell me a joke"`,
    });
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toStrictEqual([
      {
        nodeID: 'start_0',
        inputs: {},
        outputs: { model_id: 1, prompt: 'Tell me a joke' },
        data: {},
      },
      {
        nodeID: 'condition_0',
        inputs: {},
        outputs: {},
        data: {
          conditions: [
            {
              value: {
                left: { type: 'ref', content: ['start_0', 'model_id'] },
                operator: 'eq',
                right: { type: 'constant', content: 1 },
              },
              key: 'if_1',
            },
            {
              value: {
                left: { type: 'ref', content: ['start_0', 'model_id'] },
                operator: 'eq',
                right: { type: 'constant', content: 2 },
              },
              key: 'if_2',
            },
          ],
        },
        branch: 'if_1',
      },
      {
        nodeID: 'llm_1',
        inputs: {
          modelName: 'AI_MODEL_1',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.5,
          systemPrompt: "I'm Model 1.",
          prompt: 'Tell me a joke',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.5, system prompt is "I\'m Model 1.", prompt is "Tell me a joke"',
        },
        data: {},
      },
      {
        nodeID: 'end_0',
        inputs: {
          m1_res:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.5, system prompt is "I\'m Model 1.", prompt is "Tell me a joke"',
        },
        outputs: {
          m1_res:
            'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.5, system prompt is "I\'m Model 1.", prompt is "Tell me a joke"',
        },
        data: {},
      },
    ]);

    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.condition_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_1.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_2).toBeUndefined();
    expect(report.reports.llm_3).toBeUndefined();
  });

  it('should execute a workflow with branch 2', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.branchSchema,
      inputs: {
        model_id: 2,
        prompt: 'Tell me a story',
      },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({
      m2_res: `Hi, I am an AI model, my name is AI_MODEL_2, temperature is 0.6, system prompt is "I'm Model 2.", prompt is "Tell me a story"`,
    });
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toStrictEqual([
      {
        nodeID: 'start_0',
        inputs: {},
        outputs: { model_id: 2, prompt: 'Tell me a story' },
        data: {},
      },
      {
        nodeID: 'condition_0',
        inputs: {},
        outputs: {},
        data: {
          conditions: [
            {
              value: {
                left: { type: 'ref', content: ['start_0', 'model_id'] },
                operator: 'eq',
                right: { type: 'constant', content: 1 },
              },
              key: 'if_1',
            },
            {
              value: {
                left: { type: 'ref', content: ['start_0', 'model_id'] },
                operator: 'eq',
                right: { type: 'constant', content: 2 },
              },
              key: 'if_2',
            },
          ],
        },
        branch: 'if_2',
      },
      {
        nodeID: 'llm_2',
        inputs: {
          modelName: 'AI_MODEL_2',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.6,
          systemPrompt: "I'm Model 2.",
          prompt: 'Tell me a story',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_2, temperature is 0.6, system prompt is "I\'m Model 2.", prompt is "Tell me a story"',
        },
        data: {},
      },
      {
        nodeID: 'end_0',
        inputs: {
          m2_res:
            'Hi, I am an AI model, my name is AI_MODEL_2, temperature is 0.6, system prompt is "I\'m Model 2.", prompt is "Tell me a story"',
        },
        outputs: {
          m2_res:
            'Hi, I am an AI model, my name is AI_MODEL_2, temperature is 0.6, system prompt is "I\'m Model 2.", prompt is "Tell me a story"',
        },
        data: {},
      },
    ]);

    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.condition_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_2.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_1).toBeUndefined();
    expect(report.reports.llm_3).toBeUndefined();
  });

  it('should execute a workflow with branch else', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.branchSchema,
      inputs: {
        model_id: 3,
        prompt: 'Tell me a movie',
      },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({
      m3_res: `Hi, I am an AI model, my name is AI_MODEL_3, temperature is 0.7, system prompt is "I'm Model 3.", prompt is "Tell me a movie"`,
    });
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toStrictEqual([
      {
        nodeID: 'start_0',
        inputs: {},
        outputs: { model_id: 3, prompt: 'Tell me a movie' },
        data: {},
      },
      {
        nodeID: 'condition_0',
        inputs: {},
        outputs: {},
        data: {
          conditions: [
            {
              value: {
                left: { type: 'ref', content: ['start_0', 'model_id'] },
                operator: 'eq',
                right: { type: 'constant', content: 1 },
              },
              key: 'if_1',
            },
            {
              value: {
                left: { type: 'ref', content: ['start_0', 'model_id'] },
                operator: 'eq',
                right: { type: 'constant', content: 2 },
              },
              key: 'if_2',
            },
          ],
        },
        branch: 'else',
      },
      {
        nodeID: 'llm_3',
        inputs: {
          modelName: 'AI_MODEL_3',
          apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          apiHost: 'https://mock-ai-url/api/v3',
          temperature: 0.7,
          systemPrompt: "I'm Model 3.",
          prompt: 'Tell me a movie',
        },
        outputs: {
          result:
            'Hi, I am an AI model, my name is AI_MODEL_3, temperature is 0.7, system prompt is "I\'m Model 3.", prompt is "Tell me a movie"',
        },
        data: {},
      },
      {
        nodeID: 'end_0',
        inputs: {
          m3_res:
            'Hi, I am an AI model, my name is AI_MODEL_3, temperature is 0.7, system prompt is "I\'m Model 3.", prompt is "Tell me a movie"',
        },
        outputs: {
          m3_res:
            'Hi, I am an AI model, my name is AI_MODEL_3, temperature is 0.7, system prompt is "I\'m Model 3.", prompt is "Tell me a movie"',
        },
        data: {},
      },
    ]);

    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.condition_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_3.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_1).toBeUndefined();
    expect(report.reports.llm_2).toBeUndefined();
  });
});
