/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  WorkflowNodeRegistry,
  Field,
  DataEvent,
  EffectFuncProps,
  WorkflowPorts,
} from '@flowgram.ai/free-layout-editor';

const CONDITION_ITEM_HEIGHT = 30;
/**
 * You can customize your own node registry
 * 你可以自定义节点的注册器
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start
      deleteDisable: true, // The start node cannot be deleted
      copyDisable: true, // The start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Used to define the input and output ports, the start node only has the output port
    },
  },
  {
    type: 'condition',
    meta: {
      defaultPorts: [{ type: 'input' }],
    },
    formMeta: {
      /**
       * Initialize the form values
       * @param value
       */
      formatOnInit: (value) => ({
        portKeys: ['if', 'else'],
        ...value,
      }),
      effect: {
        /**
         * Listen for "portsKeys" changes and update ports
         */
        portKeys: [
          {
            event: DataEvent.onValueInitOrChange,
            effect: ({ value, context }: EffectFuncProps<Array<string>, FormData>) => {
              const { node } = context;
              const defaultPorts: WorkflowPorts = [{ type: 'input' }];
              const newPorts: WorkflowPorts = value.map((portID: string, i: number) => ({
                type: 'output',
                portID,
                location: 'right',
                locationConfig: {
                  right: 0,
                  top: (i + 1) * CONDITION_ITEM_HEIGHT,
                },
              }));
              node.ports.updateAllPorts([...defaultPorts, ...newPorts]);
            },
          },
        ],
      },
      render: () => (
        <>
          <Field<string> name="title">
            {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
          </Field>
          <Field<Array<string>> name="portKeys">
            {({ field: { value, onChange } }) => (
              <div
                className="demo-free-node-content"
                style={{
                  width: 160,
                  height: value.length * CONDITION_ITEM_HEIGHT,
                  minHeight: 2 * CONDITION_ITEM_HEIGHT,
                }}
              >
                <div>
                  <button onClick={() => onChange(value.concat(`if_${value.length}`))}>
                    Add Port
                  </button>
                </div>
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => onChange(value.filter((v, i, arr) => i !== arr.length - 1))}
                  >
                    Delete Port
                  </button>
                </div>
              </div>
            )}
          </Field>
        </>
      ),
    },
  },
  {
    type: 'chain',
    meta: {
      defaultPorts: [
        { type: 'input' },
        { type: 'output' },
        {
          portID: 'p4',
          location: 'bottom',
          locationConfig: { left: '33%', bottom: 0 },
          type: 'output',
        },
        {
          portID: 'p5',
          location: 'bottom',
          locationConfig: { left: '66%', bottom: 0 },
          type: 'output',
        },
      ],
    },
  },
  {
    type: 'tool',
    meta: {
      defaultPorts: [{ location: 'top', type: 'input' }],
    },
  },
  {
    // 支持双向连接, Support two-way connection
    type: 'twoway',
    meta: {
      defaultPorts: [
        { type: 'input', portID: 'input-left', location: 'left' },
        { type: 'output', portID: 'output-left', location: 'left' },
        { type: 'input', portID: 'input-right', location: 'right' },
        { type: 'output', portID: 'output-right', location: 'right' },
      ],
    },
  },
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }],
    },
  },
  {
    type: 'custom',
    meta: {},
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // A normal node has two ports
  },
];
