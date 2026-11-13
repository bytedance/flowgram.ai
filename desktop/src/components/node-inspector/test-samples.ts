/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNode } from '../../lib/types';
import { defaultSample, resolveSample, type Data } from './model';
import { definitionFor } from './definitions';

export function testSample(node: WorkflowNode, bindings: Data): unknown {
  if (['start', 'block-start'].includes(node.type))
    return defaultSample(definitionFor(node).output(node.data));
  return Object.fromEntries(
    Object.entries((node.data.inputsValues || {}) as Data).flatMap(([key, value]) => {
      const resolved = resolveSample(value, bindings);
      return resolved === undefined ? [] : [[key, resolved]];
    })
  );
}
