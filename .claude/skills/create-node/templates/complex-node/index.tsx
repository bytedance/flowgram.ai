/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { nanoid } from 'nanoid';
import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconNode from '../../assets/icon-{NODE_NAME}.svg'; // TODO: 准备图标文件
import { formMeta } from './form-meta';

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
    return {
      id: `{node_name}_${nanoid(5)}`, // TODO: 修改前缀
      type: '{node_type}', // TODO: 与 WorkflowNodeType 保持一致
      data: {
        title: `{NODE_NAME}_${++index}`, // TODO: 修改标题前缀

        // TODO: 根据实际需求定义自定义字段
        customConfig: {
          key: 'value',
        },

        // 节点输出数据的 JSON Schema
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
  formMeta: formMeta, // 引入自定义表单
};
