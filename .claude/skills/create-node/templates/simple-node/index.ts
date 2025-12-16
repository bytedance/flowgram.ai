/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconNode from '../../assets/icon-{NODE_NAME}.svg'; // TODO: 准备图标文件

let index = 0;

export const {NODE_NAME}NodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.{NODE_TYPE}, // TODO: 在 constants.ts 中定义
  info: {
    icon: iconNode,
    description: '{节点功能描述}', // TODO: 修改描述
  },
  meta: {
    size: {
      width: 360,
      height: 390,
    },
  },
  onAdd() {
    // 返回节点的初始数据，这些数据会被保存到后端
    return {
      id: `{node_name}_${nanoid(5)}`, // TODO: 修改前缀
      type: '{node_type}', // TODO: 与 WorkflowNodeType 保持一致
      data: {
        title: `{NODE_NAME}_${++index}`, // TODO: 修改标题前缀

        // 节点表单字段的初始值
        inputsValues: {
          // TODO: 根据实际需求定义字段初始值
          field1: {
            type: 'constant',      // 常量类型
            content: '默认值',      // 字段的初始值
          },
          field2: {
            type: 'constant',
            content: 100,
          },
          promptField: {
            type: 'template',      // 支持变量的模板类型
            content: '',
          },
        },

        // 节点表单的 JSON Schema（定义表单结构）
        inputs: {
          type: 'object',
          required: ['field1'], // TODO: 定义必填字段
          properties: {
            // TODO: 根据实际需求定义字段 Schema
            field1: {
              type: 'string',
              // 使用默认 Input 组件
            },
            field2: {
              type: 'number',
              minimum: 0,
              maximum: 100,
            },
            promptField: {
              type: 'string',
              // 使用 PromptEditorWithVariables 组件
              extra: {
                formComponent: 'prompt-editor',
              },
            },
            booleanField: {
              type: 'boolean',
              // 使用 Switch 组件
            },
            objectField: {
              type: 'object',
              // 使用 JsonCodeEditor 组件
            },
          },
        },

        // 节点输出数据的 JSON Schema（工作流执行时的输出）
        outputs: {
          type: 'object',
          properties: {
            // TODO: 定义节点执行后的输出结构
            result: { type: 'string' },
            status: { type: 'number' },
          },
        },
      },
    };
  },
};
