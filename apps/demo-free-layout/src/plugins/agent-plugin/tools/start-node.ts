/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, FlowNodeFormData, FormModelV2 } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';
import { createNodeRender } from '../renders';

interface StartNodeParams {
  id: string;
  title?: string;
  description?: string;
  outputs?: IJsonSchema;
}

interface StartNodeResult {
  nodeID: string;
}

@injectable()
export class StartNodeTool extends BaseNodeTool<StartNodeParams, StartNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'StartNode',
      description: `修改工作流 Start 节点参数

IMPORTANT: 本工具会覆盖写 outputs，在执行前建议先调用 GetNodeSchema 工具查询 Start 节点配置，避免覆盖原有的数据结构

## 参数

全量更新，所有 key 都为必填

\`\`\`typescript
interface StartNodeParams {
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  outputs?: IJsonSchema; // 节点输出变量的 JSON Schema 定义
}
\`\`\`

## outputs 字段说明

outputs 字段接受 JSON Schema 格式定义

outputs 示例
\`\`\`json
{
  "type": "object",
  "properties": {
    "KEY_A": {
      "type": "array",
      "extra": {
        "index": 0
      },
      "items": {
        "type": "string"
      },
      "default": ['A1', 'A2', 'A3']
    },
    "KEY_B": {
      "type": "string",
      "extra": {
        "index": 2
      }
    },
  },
  "required": [
    "KEY_A",
    "KEY_B",
  ]
}
\`\`\`
`,
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: '节点 ID，英文、数字、下划线组成',
          },
          title: {
            type: 'string',
            description: '节点标题，根据用户可理解的语言生成',
          },
          description: {
            type: 'string',
            description: '节点描述，根据用户可理解的语言生成',
          },
          outputs: {
            type: 'object',
            description: '节点输出变量的 JSON Schema 定义',
          },
        },
        required: ['id'],
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.Start),
  };

  public async execute(params: StartNodeParams): Promise<ToolCallResult<StartNodeResult>> {
    if (!this.document.getNode(params.id)) {
      return {
        success: false,
        error: `节点 ID ${params.id} 不存在，请确认后重新输入。`,
      };
    }
    if (!params.title && !params.outputs) {
      return {
        success: false,
        error: `参数 title 和 outputs 不能同时为空，请至少提供一个参数进行更新。`,
      };
    }
    const nodeID = await this.updateStartNode(params);
    return {
      success: true,
      data: { nodeID },
      message: `成功修改 ${nodeID} 节点`,
    };
  }

  private async updateStartNode(params: StartNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    if (params.title) {
      formModel.setValueIn('title', params.title);
    }

    if (params.description) {
      formModel.setValueIn('description', params.description);
    }

    if (params.outputs) {
      formModel.setValueIn('outputs', params.outputs);
    }

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
