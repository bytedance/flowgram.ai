/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: '1',
      type: 'start',
      meta: {
        position: { x: 0, y: 0 },
      },
    },
    {
      id: '2',
      type: 'custom',
      meta: {
        position: { x: 110, y: 0 },
      },
    },
    {
      id: '3',
      type: 'custom',
      meta: {
        position: { x: 220, y: 0 },
      },
    },
    {
      id: '4',
      type: 'end',
      meta: {
        position: { x: 330, y: 0 },
      },
    },
  ],
  edges: [
    {
      sourceNodeID: '1',
      targetNodeID: '2',
    },
    {
      sourceNodeID: '2',
      targetNodeID: '3',
    },
    {
      sourceNodeID: '3',
      targetNodeID: '4',
    },
  ],
};
