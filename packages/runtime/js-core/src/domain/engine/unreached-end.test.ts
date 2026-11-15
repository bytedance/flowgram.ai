/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it } from 'vitest';
import {
  FlowGramNode,
  WorkflowMessageType,
  WorkflowStatus,
  type WorkflowSchema,
} from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeValidation } from '@workflow/validation';
import { MockWorkflowRuntimeNodeExecutors } from '@workflow/__tests__/executor';
import { WorkflowRuntimeExecutor } from '../executor';
import { WorkflowRuntimeEngine } from './index';

/**
 * start_0 -> end_0, plus a code_0 that nothing points at but that points at end_0.
 * End waits for both predecessors, so it never runs.
 */
const unreachableEndSchema: WorkflowSchema = {
  nodes: [
    {
      id: 'start_0',
      type: FlowGramNode.Start,
      meta: { position: { x: 180, y: 22.5 } },
      data: {
        title: 'Start',
        outputs: { type: 'object', properties: {}, required: [] },
      },
    },
    {
      id: 'end_0',
      type: FlowGramNode.End,
      meta: { position: { x: 640, y: 0 } },
      data: {
        title: 'End',
        inputsValues: {
          str: { type: 'constant', content: 'ABC' },
        },
        inputs: {
          type: 'object',
          properties: { str: { type: 'string' } },
        },
      },
    },
    {
      id: 'code_0',
      type: FlowGramNode.Code,
      meta: { position: { x: 640, y: 300 } },
      data: {
        title: 'Code_0',
        inputsValues: {},
        inputs: { type: 'object', properties: {} },
        outputs: { type: 'object', properties: { str: { type: 'string' } } },
        script: {
          language: 'javascript',
          content: 'async function main({ params }) { return { str: "unused" }; }',
        },
      },
    },
  ],
  edges: [
    { sourceNodeID: 'start_0', targetNodeID: 'end_0' },
    { sourceNodeID: 'code_0', targetNodeID: 'end_0' },
  ],
};

let engine: WorkflowRuntimeEngine;

beforeEach(() => {
  engine = new WorkflowRuntimeEngine({
    Validation: new WorkflowRuntimeValidation(),
    Executor: new WorkflowRuntimeExecutor(MockWorkflowRuntimeNodeExecutors),
  });
});

describe('WorkflowRuntimeEngine end node that never runs', () => {
  it('fails the workflow and reports which end node stayed pending', async () => {
    const { context, processing } = engine.invoke({
      schema: unreachableEndSchema,
      inputs: {},
    });

    const result = await processing;

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Failed);
    expect(context.statusCenter.nodeStatus('end_0').status).not.toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({});

    const errors = context.messageCenter.export()[WorkflowMessageType.Error];
    expect(errors).toHaveLength(1);
    expect(errors[0].nodeID).toBe('end_0');
    expect(errors[0].message).toContain('without running its end node "end_0"');
  });

  it('still succeeds when the end node runs and the result is empty', async () => {
    const schema: WorkflowSchema = {
      nodes: [
        {
          id: 'start_0',
          type: FlowGramNode.Start,
          meta: { position: { x: 180, y: 22.5 } },
          data: {
            title: 'Start',
            outputs: { type: 'object', properties: {}, required: [] },
          },
        },
        {
          id: 'end_0',
          type: FlowGramNode.End,
          meta: { position: { x: 640, y: 0 } },
          data: {
            title: 'End',
            inputsValues: {},
            inputs: { type: 'object', properties: {} },
          },
        },
      ],
      edges: [{ sourceNodeID: 'start_0', targetNodeID: 'end_0' }],
    };

    const { context, processing } = engine.invoke({ schema, inputs: {} });

    const result = await processing;

    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(context.statusCenter.nodeStatus('end_0').status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({});
    expect(context.messageCenter.export()[WorkflowMessageType.Error]).toHaveLength(0);
  });
});
