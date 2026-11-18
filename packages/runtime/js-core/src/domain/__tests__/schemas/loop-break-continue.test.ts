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

describe('WorkflowRuntime loop break continue schema', () => {
  it('reports the missing output and iteration when a branch skips its producer', async () => {
    const schema = structuredClone(TestSchemas.loopBreakContinueSchema);
    const loop = schema.nodes.find((node) => node.id === 'loop_0')!;
    const edge = loop.edges!.find((edge) => edge.targetNodeID === 'continue_0')!;
    edge.targetNodeID = 'block_end_0';

    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema,
      inputs: { tasks: ['Photosynthesis', 'Cell structure', 'Genetics', 'Ecology'] },
    });
    await processing;

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    const snapshot = context.snapshotCenter.exportAll().find((item) => item.nodeID === 'loop_0');
    expect(snapshot?.error).toBe(
      'Loop iteration 0 did not produce output "results" from "llm_0.result"'
    );
  });

  it('should execute a workflow with break and continue logic', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.loopBreakContinueSchema,
      inputs: {
        tasks: [
          'TASK - A', // index 0, continue
          'TASK - B', // index 1, continue
          'TASK - C', // index 2, continue
          'TASK - D', // index 3, execute
          'TASK - E', // index 4, execute
          'TASK - F', // index 5, execute
          'TASK - G', // index 6, execute
          'TASK - H', // index 7, break
          'TASK - I', // index 8, should not reach
        ],
      },
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);

    // Only tasks with index 3-6 should be processed (index > 2 and <= 6)
    expect(result).toStrictEqual({
      outputs: [
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
        'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
      ],
    });

    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());

    // Verify that start node executed correctly
    const startSnapshot = snapshots.find((s) => s.nodeID === 'start_0');
    expect(startSnapshot).toBeDefined();
    expect(startSnapshot?.outputs.tasks).toEqual([
      'TASK - A',
      'TASK - B',
      'TASK - C',
      'TASK - D',
      'TASK - E',
      'TASK - F',
      'TASK - G',
      'TASK - H',
      'TASK - I',
    ]);

    // Verify that loop node executed correctly
    const loopSnapshot = snapshots.find((s) => s.nodeID === 'loop_0');
    expect(loopSnapshot).toBeDefined();
    expect(loopSnapshot?.outputs.results).toEqual([
      'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.3", prompt is "TASK - D"',
      'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.4", prompt is "TASK - E"',
      'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.5", prompt is "TASK - F"',
      'Hi, I am an AI model, my name is AI_MODEL_1, temperature is 0.6, system prompt is "You are a helpful assistant No.6", prompt is "TASK - G"',
    ]);

    // Verify that only the expected items and indexes were processed
    expect(loopSnapshot?.outputs.items).toEqual(['TASK - D', 'TASK - E', 'TASK - F', 'TASK - G']);
    expect(loopSnapshot?.outputs.indexes).toEqual([3, 4, 5, 6]);

    // Verify that LLM node was executed exactly 4 times (for indexes 3-6)
    const llmSnapshots = snapshots.filter((s) => s.nodeID === 'llm_0');
    expect(llmSnapshots).toHaveLength(4);

    // Verify the LLM executions
    expect(llmSnapshots[0].inputs.systemPrompt).toBe('You are a helpful assistant No.3');
    expect(llmSnapshots[0].inputs.prompt).toBe('TASK - D');
    expect(llmSnapshots[1].inputs.systemPrompt).toBe('You are a helpful assistant No.4');
    expect(llmSnapshots[1].inputs.prompt).toBe('TASK - E');
    expect(llmSnapshots[2].inputs.systemPrompt).toBe('You are a helpful assistant No.5');
    expect(llmSnapshots[2].inputs.prompt).toBe('TASK - F');
    expect(llmSnapshots[3].inputs.systemPrompt).toBe('You are a helpful assistant No.6');
    expect(llmSnapshots[3].inputs.prompt).toBe('TASK - G');

    // Verify that continue and break nodes were executed
    const continueSnapshots = snapshots.filter((s) => s.nodeID === 'continue_0');
    const breakSnapshots = snapshots.filter((s) => s.nodeID === 'break_0');

    // Continue should be executed 3 times (for indexes 0, 1, 2)
    expect(continueSnapshots).toHaveLength(3);
    // Break should be executed 1 time (for index 7)
    expect(breakSnapshots).toHaveLength(1);

    // Verify workflow status
    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.loop_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.llm_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.condition_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.continue_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.break_0.status).toBe(WorkflowStatus.Succeeded);

    // Verify execution counts
    expect(report.reports.llm_0.snapshots.length).toBe(4);
    expect(report.reports.condition_0.snapshots.length).toBe(8); // Condition checked for each iteration
    expect(report.reports.continue_0.snapshots.length).toBe(3);
    expect(report.reports.break_0.snapshots.length).toBe(1);
  });
});
