import { describe, expect, it } from 'vitest';
import { FlowGramNode, WorkflowStatus, type ExecutionContext } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeEngine } from '@workflow/engine';
import { WorkflowRuntimeExecutor } from '@workflow/executor';
import { WorkflowRuntimeValidation } from '@workflow/validation';
import { StartExecutor } from '@nodes/start';
import { EndExecutor } from '@nodes/end';
import { ConditionExecutor } from '@nodes/condition';
import { branchSchema } from '@workflow/__tests__/schemas/branch';

describe('conditional ports converging on one target', () => {
  for (const converge of [false, true]) {
    for (const modelID of [1, 2, 9]) {
      it(`${converge ? 'shared' : 'distinct'} target, selected ${modelID}: executes one effect`, async () => {
        let effectCalls = 0;
        class CountingExecutor {
          public readonly type = FlowGramNode.LLM;

          public async execute(_context: ExecutionContext) {
            effectCalls += 1;
            return { outputs: { result: `effect-${effectCalls}` } };
          }
        }

        const schema = structuredClone(branchSchema);
        if (converge) {
          schema.nodes = schema.nodes.filter((node) => !['llm_2', 'llm_3'].includes(node.id));
          schema.edges = schema.edges
            .filter((edge) => !['llm_2', 'llm_3'].includes(edge.sourceNodeID))
            .map((edge) => edge.sourceNodeID === 'condition_0'
              ? { ...edge, targetNodeID: 'llm_1' }
              : edge);
          const end = schema.nodes.find((node) => node.id === 'end_0')!;
          delete end.data.inputs.properties.m2_res;
          delete end.data.inputs.properties.m3_res;
          delete end.data.inputsValues.m2_res;
          delete end.data.inputsValues.m3_res;
        }

        const params = { schema, inputs: { model_id: modelID, prompt: 'no real service call' } };
        const validation = new WorkflowRuntimeValidation();
        expect(validation.invoke(params)).toEqual({ valid: true });

        const engine = new WorkflowRuntimeEngine({
          Validation: validation,
          Executor: new WorkflowRuntimeExecutor([
            StartExecutor, EndExecutor, ConditionExecutor, CountingExecutor,
          ]),
        });
        const task = engine.invoke(params);
        const outputs = await task.processing;
        console.log(JSON.stringify({ converge, modelID, effectCalls, outputs,
          status: task.context.statusCenter.workflow.status }));
        expect(task.context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
        expect(effectCalls).toBe(1);
      });
    }
  }
});
