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

describe('WorkflowRuntime start default schema', () => {
  it('passes a supplied date-time input through the workflow', async () => {
    const engine = container.get<IEngine>(IEngine);
    const date = '2026-01-02T03:04:05.000Z';
    const { context, processing } = engine.invoke({
      schema: TestSchemas.startDefaultSchema,
      inputs: { date },
    });
    expect(await processing).toMatchObject({ s_date: date });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  });

  it.each(['yesterday', 123])('rejects an invalid date-time input %s', async (date) => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.startDefaultSchema,
      inputs: { date },
    });
    expect(await processing).toEqual({});
    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Failed);
    expect(report.messages.error[0].message).toContain('Expected date-time at date');
  });

  it('should execute a workflow', async () => {
    const engine = container.get<IEngine>(IEngine);
    const { context, processing } = engine.invoke({
      schema: TestSchemas.startDefaultSchema,
      inputs: {},
    });
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Processing);
    const result = await processing;
    expect(context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
    expect(result).toStrictEqual({
      s_str: 'ABC',
      s_num: 123.123,
      s_int: 123,
      s_bool: false,
      s_obj: {
        key_str: 'value',
        key_int: 123,
        key_bool: true,
      },
      s_map: {
        key: 'value',
      },
      s_arr_str: ['AAA', 'BBB', 'CCC'],
      s_date: '2000-01-01T00:00:00.000Z',
    });
    const snapshots = snapshotsToVOData(context.snapshotCenter.exportAll());
    expect(snapshots).toStrictEqual([
      { nodeID: 'start_0', inputs: {}, outputs: {}, data: {} },
      {
        nodeID: 'end_0',
        inputs: {
          s_str: 'ABC',
          s_num: 123.123,
          s_int: 123,
          s_bool: false,
          s_obj: { key_str: 'value', key_int: 123, key_bool: true },
          s_arr_str: ['AAA', 'BBB', 'CCC'],
          s_map: { key: 'value' },
          s_date: '2000-01-01T00:00:00.000Z',
        },
        outputs: {
          s_str: 'ABC',
          s_num: 123.123,
          s_int: 123,
          s_bool: false,
          s_obj: { key_str: 'value', key_int: 123, key_bool: true },
          s_arr_str: ['AAA', 'BBB', 'CCC'],
          s_map: { key: 'value' },
          s_date: '2000-01-01T00:00:00.000Z',
        },
        data: {},
      },
    ]);
    const report = context.reporter.export();
    expect(report.workflowStatus.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.start_0.status).toBe(WorkflowStatus.Succeeded);
    expect(report.reports.end_0.status).toBe(WorkflowStatus.Succeeded);
  });
});
