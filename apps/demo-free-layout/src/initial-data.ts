/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start',
      type: 'start',
      meta: {
        position: {
          x: 0,
          y: 0,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
    },
    {
      id: 'end',
      type: 'end',
      meta: {
        position: {
          x: 500,
          y: 0,
        },
      },
      data: {
        title: 'End',
        inputs: {
          type: 'object',
          properties: {},
        },
        inputsValues: {},
      },
    },
  ],
  edges: [],
  globalVariable: {
    type: 'object',
    required: [],
    properties: {
      userId: {
        type: 'string',
      },
    },
  },
};
