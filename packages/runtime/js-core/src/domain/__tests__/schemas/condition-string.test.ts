/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';
import {
  ConditionItem,
  ConditionOperator,
  IEngine,
  WorkflowStatus,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeContainer } from '../../container';
import { branchSchema } from './branch';

const engine = WorkflowRuntimeContainer.instance.get<IEngine>(IEngine);

async function runConditions(
  value: string | null | undefined,
  conditions: ReturnType<typeof condition>[]
) {
  const schema = structuredClone(branchSchema);
  schema.globalVariable = {
    type: 'object',
    properties: {
      text: { type: 'string', default: value },
    },
  };
  const conditionNode = schema.nodes.find((node) => node.id === 'condition_0')!;
  conditionNode.data.conditions = conditions;

  const { context, processing } = engine.invoke({
    schema,
    inputs: { model_id: 1, prompt: 'hello' },
  });
  const outputs = await processing;
  expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  const snapshot = context.snapshotCenter.exportAll().find((item) => item.nodeID === 'condition_0');
  return { branch: snapshot?.branch, outputs };
}

function condition(
  operator: ConditionOperator,
  key = 'if_1',
  right?: ConditionItem['value']['right']
) {
  return {
    key,
    value: {
      left: { type: 'ref' as const, content: ['global', 'text'] },
      operator,
      ...(right ? { right } : {}),
    },
  };
}

function expectedOutputs(branch: string) {
  const model = branch === 'if_1' ? 1 : 3;
  const temperature = model === 1 ? 0.5 : 0.7;
  return {
    [`m${model}_res`]: `Hi, I am an AI model, my name is AI_MODEL_${model}, temperature is ${temperature}, system prompt is "I'm Model ${model}.", prompt is "hello"`,
  };
}

describe('WorkflowRuntime string unary conditions', () => {
  it.each([
    { value: 'hello', empty: false },
    { value: '', empty: false },
    { value: ' ', empty: false },
    { value: null, empty: true },
    { value: undefined, empty: true },
  ])('routes a declared string with value $value', async ({ value, empty }) => {
    for (const operator of [ConditionOperator.IS_EMPTY, ConditionOperator.IS_NOT_EMPTY]) {
      const branch = (operator === ConditionOperator.IS_EMPTY ? empty : !empty) ? 'if_1' : 'else';
      const result = await runConditions(value, [condition(operator)]);
      expect(result).toStrictEqual({ branch, outputs: expectedOutputs(branch) });
    }
  });

  it.each([ConditionOperator.EQ, ConditionOperator.NEQ])(
    'preserves the right operand for %s',
    async (operator) => {
      const item = condition(operator, 'if_1', { type: 'constant', content: 'hello' });
      const branch = operator === ConditionOperator.EQ ? 'if_1' : 'else';
      const result = await runConditions('hello', [item]);
      expect(result).toStrictEqual({ branch, outputs: expectedOutputs(branch) });
    }
  );

  it('selects the first matching string condition', async () => {
    const result = await runConditions('hello', [
      condition(ConditionOperator.IS_NOT_EMPTY),
      condition(ConditionOperator.IS_NOT_EMPTY, 'if_2'),
    ]);
    expect(result).toStrictEqual({ branch: 'if_1', outputs: expectedOutputs('if_1') });
  });
});
