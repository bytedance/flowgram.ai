/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2026 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { expect, it } from 'vitest';
import { IEngine, WorkflowStatus } from '@flowgram.ai/runtime-interface';

import { WorkflowRuntimeContainer } from '../../container';
import { loopSchema } from './loop';

it('can invoke the same schema with loop blocks twice', async () => {
  const engine = WorkflowRuntimeContainer.instance.get<IEngine>(IEngine);
  const schema = structuredClone(loopSchema);
  const params = { schema, inputs: { tasks: ['first item'] } };

  const first = engine.invoke(params);
  const outputs = await first.processing;
  expect(first.context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  expect(outputs).toHaveProperty('outputs');

  const second = engine.invoke(params);
  const repeated = await second.processing;
  expect(second.context.statusCenter.workflow.status).toBe(WorkflowStatus.Succeeded);
  expect(repeated).toStrictEqual(outputs);
  expect(schema).toStrictEqual(loopSchema);
});
