/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it } from 'vitest';

import { WorkflowRuntimeValidation } from '@workflow/validation';
import { TestSchemas } from '@workflow/__tests__/schemas';
import { MockWorkflowRuntimeNodeExecutors } from '@workflow/__tests__/executor';
import { WorkflowRuntimeExecutor } from '../executor';
import { WorkflowRuntimeEngine } from './index';

let engine: WorkflowRuntimeEngine;

beforeEach(() => {
  const Validation = new WorkflowRuntimeValidation();
  const Executor = new WorkflowRuntimeExecutor(MockWorkflowRuntimeNodeExecutors);
  engine = new WorkflowRuntimeEngine({
    Validation,
    Executor,
  });
});

describe('WorkflowRuntimeEngine', () => {
  it('should create a WorkflowRuntimeEngine', () => {
    expect(engine).toBeDefined();
  });

  it('should execute a workflow with input', async () => {
    const { processing } = engine.invoke({
      schema: TestSchemas.basicSchema,
      inputs: {
        model_name: 'ai-model',
        llm_settings: {
          temperature: 0.5,
        },
        work: {
          role: 'Chat',
          task: 'Tell me a story about love',
        },
      },
    });
    const result = await processing;
    expect(result).toStrictEqual({
      llm_res: `Hi, I am an AI model, my name is ai-model, temperature is 0.5, system prompt is "You are a helpful AI assistant.", prompt is "<Role>Chat</Role>\n\n<Task>\nTell me a story about love\n</Task>"`,
      llm_task: 'Tell me a story about love',
    });
  });

  it('should execute a workflow with branch', async () => {
    const { processing } = engine.invoke({
      schema: TestSchemas.branchSchema,
      inputs: {
        model_id: 1,
        prompt: 'Tell me a joke',
      },
    });
    const result = await processing;
    expect(result).toStrictEqual({
      m1_res: `Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.5, system prompt is "I'm Model 1.", prompt is "Tell me a joke"`,
    });
  });

  it('selects a branch when its output ID also names an input port', async () => {
    const schema = structuredClone(TestSchemas.branchSchema);
    const conditionInput = schema.edges.find((edge) => edge.targetNodeID === 'condition_0')!;
    conditionInput.targetPortID = 'if_1';

    const { processing } = engine.invoke({
      schema,
      inputs: { model_id: 1, prompt: 'hello' },
    });

    expect(await processing).toHaveProperty('m1_res');
  });
});
