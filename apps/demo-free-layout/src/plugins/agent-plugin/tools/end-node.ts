/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IFlowConstantRefValue } from '@flowgram.ai/runtime-interface';
import { injectable, FlowNodeFormData, FormModelV2 } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';
import { createNodeRender } from '../renders';

interface InputsValuesItem {
  [key: string]: IFlowConstantRefValue;
}

interface UpdateEndNodeParams {
  id: string;
  title?: string;
  description?: string;
  inputsValues?: InputsValuesItem;
}

interface EndNodeResult {
  nodeID: string;
}

@injectable()
export class EndNodeTool extends BaseNodeTool<UpdateEndNodeParams, EndNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'EndNode',
      description: `修改工作流 End 节点参数

IMPORTANT: 本工具会覆盖写 inputsValues，在执行前建议先调用 GetNodeSchema 工具查询 End 节点配置，避免覆盖原有的数据结构

## 参数

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateEndNodeParams {
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  inputsValues?: InputsValuesItem; // 节点输入值映射
}
\`\`\`

## inputsValues 字段说明

inputsValues 字段用于设置每个输入变量的值，支持常量和引用两种形式

\`\`\`typescript
interface InputsValuesItem {
  [key: string]: IFlowConstantRefValue;
}
\`\`\`

### IFlowConstantRefValue 说明

支持两种形式：

1. 常量形式
\`\`\`typescript
interface ConstantValue {
  type: 'constant';
  content: string | number | boolean | any; // 可以是任意类型
}
\`\`\`

2. 引用形式，content 为引用其他前序节点输出变量的结构
\`\`\`typescript
interface RefValue {
  type: 'ref';
  content: string[]; // [节点ID, 输出变量名, ...嵌套路径]
}
\`\`\`

注意：引用形式支持嵌套路径，例如 ["start", "config", "model"] 表示引用 start 节点的 config.model

## 示例

更新 End 节点，设置输入定义和输入值：
\`\`\`json
{
  "id": "end",
  "inputsValues": {
    "result": {
      "type": "ref",
      "content": ["llm_001", "result"]
    },
    "is_success": {
      "type": "constant",
      "content": true
    }
  }
}
\`\`\`

嵌套路径引用示例：
\`\`\`json
{
  "id": "end",
  "inputsValues": {
    "model_name": {
      "type": "ref",
      "content": ["start", "config", "model", "name"]
    }
  }
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
          inputsValues: {
            type: 'object',
            description: '节点输入值映射',
          },
        },
        required: ['id'],
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.End),
  };

  public async execute(params: UpdateEndNodeParams): Promise<ToolCallResult<EndNodeResult>> {
    if (!this.document.getNode(params.id)) {
      return {
        success: false,
        error: `节点 ID ${params.id} 不存在，请确认后重新输入。`,
      };
    }
    if (!params.title && !params.description && !params.inputsValues) {
      return {
        success: false,
        error: `参数 title、description、inputs 和 inputsValues 不能同时为空，请至少提供一个参数进行更新。`,
      };
    }
    const nodeID = await this.updateEndNode(params);
    return {
      success: true,
      data: { nodeID },
      message: `成功修改 ${nodeID} 节点`,
    };
  }

  private async updateEndNode(params: UpdateEndNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    if (params.title !== undefined) {
      formModel.setValueIn('title', params.title);
    }

    if (params.description !== undefined) {
      formModel.setValueIn('description', params.description);
    }

    if (params.inputsValues !== undefined) {
      formModel.setValueIn('inputsValues', params.inputsValues);
    }

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
