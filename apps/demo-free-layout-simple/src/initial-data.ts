/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 150,
          y: 100,
        },
      },
      data: {
        title: 'Start',
        content: 'Start content',
      },
    },
    {
      id: 'node_0',
      type: 'condition',
      meta: {
        position: {
          x: 550,
          y: 100,
        },
      },
      data: {
        title: 'Condition',
        content: 'Condition node content',
        ports: ['if', 'else'],
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 1350,
          y: 100,
        },
      },
      data: {
        title: 'End',
        content: 'End content',
      },
    },
    {
      id: '144150',
      type: 'node1',
      meta: {
        position: {
          x: 950,
          y: 0,
        },
      },
      data: {
        title: 'New Node1',
        content: 'xxxx',
      },
    },
    {
      id: '118937',
      type: 'node2',
      meta: {
        position: {
          x: 950,
          y: 200,
        },
      },
      data: {
        title: 'New Node2',
        content: 'xxxx',
      },
    },
    {
      id: 'chain0',
      type: 'chain',
      meta: {
        position: {
          x: 150,
          y: 246,
        },
      },
      data: {
        title: 'Chain',
        content: 'xxxx',
      },
    },
    {
      id: '100260',
      type: 'tool',
      meta: {
        position: {
          x: 55.8,
          y: 410,
        },
      },
      data: {
        title: 'New Tool',
        content: 'xxxx',
      },
    },
    {
      id: '105108',
      type: 'tool',
      meta: {
        position: {
          x: 280.5,
          y: 410,
        },
      },
      data: {
        title: 'New Tool',
        content: 'xxxx',
      },
    },
    {
      id: '106070',
      type: 'twoway',
      meta: {
        position: {
          x: 550,
          y: 310,
        },
      },
      data: {
        title: 'New Twoway',
        content: 'xxxx',
      },
    },
    {
      id: '122116',
      type: 'twoway',
      meta: {
        position: {
          x: 866.0091156462586,
          y: 422.4669387755102,
        },
      },
      data: {
        title: 'New Twoway',
        content: 'xxxx',
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'node_0',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: '144150',
      sourcePortID: 'if',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: '118937',
      sourcePortID: 'else',
    },
    {
      sourceNodeID: '118937',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: '144150',
      targetNodeID: 'end_0',
    },
    {
      sourceNodeID: 'chain0',
      targetNodeID: '100260',
      sourcePortID: 'p4',
    },
    {
      sourceNodeID: 'chain0',
      targetNodeID: '105108',
      sourcePortID: 'p5',
    },
    {
      sourceNodeID: '122116',
      targetNodeID: '106070',
      sourcePortID: 'output-left',
      targetPortID: 'input-right',
    },
    {
      sourceNodeID: '106070',
      targetNodeID: '122116',
      sourcePortID: 'output-right',
      targetPortID: 'input-left',
    },
  ],
};
