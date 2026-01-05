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

type RefPath = string[];

interface CreateLLMNodeParams {
  operation: 'create';
  id: string;
  title: string;
  description: string;
  modelName: string | RefPath;
  apiKey: string | RefPath;
  apiHost: string | RefPath;
  temperature: number | RefPath;
  systemPrompt: string;
  prompt: string;
  parentNodeID?: string;
}

interface UpdateLLMNodeParams {
  operation: 'update';
  id: string;
  title?: string;
  description?: string;
  modelName?: string | RefPath;
  apiKey?: string | RefPath;
  apiHost?: string | RefPath;
  temperature?: number | RefPath;
  systemPrompt?: string;
  prompt?: string;
}

type LLMNodeParams = CreateLLMNodeParams | UpdateLLMNodeParams;

interface LLMNodeResult {
  nodeID: string;
}

@injectable()
export class LLMNodeTool extends BaseNodeTool<LLMNodeParams, LLMNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'LLMNode',
      description: `在工作流中创建一个 LLM 节点，或者修改一个 LLM 节点的参数

## 创建节点参数类型

全量更新，所有 key 都为必填

\`\`\`typescript
interface CreateLLMNodeParams {
  operation: 'create'; // 固定为 create
  id: string; // 节点 ID，英文、数字、下划线组成
  title: string; // 节点标题，根据用户可理解的语言生成
  description: string; // 节点描述，根据用户可理解的语言生成
  modelName: string | RefPath; // 使用的模型名称
  apiKey: string | RefPath; // 模型的 API Key
  apiHost: string | RefPath; // 提供模型服务的 API Host
  temperature: number | RefPath; // 模型温度
  systemPrompt: string; // 系统提示词
  prompt: string; // 用户提示词
  parentNodeID?: string; // 可选，指定父 Loop 节点 ID，将节点创建在 Loop 内
}
\`\`\`

## 修改节点参数类型

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateLLMNodeParams {
  operation: 'update'; // 固定为 update
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
  description?: string; // 节点描述，根据用户可理解的语言生成
  modelName?: string | RefPath; // 使用的模型名称
  apiKey?: string | RefPath; // 模型的 API Key
  apiHost?: string | RefPath; // 提供模型服务的 API Host
  temperature?: number | RefPath; // 模型温度
  systemPrompt?: string; // 系统提示词
  prompt?: string; // 用户提示词
}
\`\`\`

## RefPath 说明

RefPath 为引用其他前序节点输出变量的结构，例如 ['start_0', 'llm_config', 'model_name'] 可以引用开始节点的 llm_config 对象下的 model_name 字段

\`\`\`typescript
type RefPath = string[]; // [节点ID, key1, key2, ...]
\`\`\`

2. systemPrompt 和 prompt 可通过双花括号语法引用前序节点输出变量，遵循 {{NodeID.VarKey1.xxx}} 规则，例如 "生成一个关于 {{start_0.user_input.theme}} 的故事"
`,
      parameters: {
        type: 'object',
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.LLM),
  };

  public async execute(params: LLMNodeParams): Promise<ToolCallResult<LLMNodeResult>> {
    if (params.operation === 'create') {
      if (this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 已存在，请重新生成一个唯一的节点 ID。`,
        };
      }
      const nodeID = await this.createLLMNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功创建 LLM 节点，节点 ID: ${nodeID}`,
      };
    }
    if (params.operation === 'update') {
      if (!this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 不存在，无法进行修改。`,
        };
      }
      const nodeID = await this.updateLLMNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功修改 LLM 节点，节点 ID: ${nodeID}`,
      };
    }
    return {
      success: false,
      error: `无效的操作类型 ${(params as LLMNodeParams).operation}，仅支持 create 和 update。`,
    };
  }

  private convertToValueDefine(value: string | number | RefPath): IFlowConstantRefValue {
    if (Array.isArray(value)) {
      return {
        type: 'ref',
        content: value,
      };
    }
    return {
      type: 'constant',
      content: value,
    };
  }

  private async createLLMNode(params: CreateLLMNodeParams): Promise<string> {
    const nodeConfig = {
      id: params.id,
      type: WorkflowNodeType.LLM,
      data: {
        title: params.title,
        description: params.description,
        inputsValues: {
          modelName: this.convertToValueDefine(params.modelName),
          apiKey: this.convertToValueDefine(params.apiKey),
          apiHost: this.convertToValueDefine(params.apiHost),
          temperature: this.convertToValueDefine(params.temperature),
          systemPrompt: {
            type: 'template',
            content: params.systemPrompt,
          },
          prompt: {
            type: 'template',
            content: params.prompt,
          },
        },
        inputs: {
          type: 'object',
          required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
          properties: {
            modelName: {
              type: 'string',
            },
            apiKey: {
              type: 'string',
            },
            apiHost: {
              type: 'string',
            },
            temperature: {
              type: 'number',
            },
            systemPrompt: {
              type: 'string',
              extra: {
                formComponent: 'prompt-editor',
              },
            },
            prompt: {
              type: 'string',
              extra: {
                formComponent: 'prompt-editor',
              },
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    };

    const node = params.parentNodeID
      ? this.document.createWorkflowNode(nodeConfig, false, params.parentNodeID)
      : this.document.createWorkflowNode(nodeConfig);

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }

  private async updateLLMNode(params: UpdateLLMNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    Object.entries(params).forEach(([key, value]) => {
      if (key === 'operation' || key === 'id' || value === undefined) {
        return;
      }
      if (key === 'title' || key === 'description') {
        formModel.setValueIn(key, value as string);
        return;
      }
      if (key === 'systemPrompt' || key === 'prompt') {
        formModel.setValueIn(`inputsValues.${key}`, {
          type: 'template',
          content: value as string,
        });
      } else if (
        key === 'modelName' ||
        key === 'apiKey' ||
        key === 'apiHost' ||
        key === 'temperature'
      ) {
        formModel.setValueIn(
          `inputsValues.${key}`,
          this.convertToValueDefine(value as string | number | RefPath)
        );
      }
    });

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
