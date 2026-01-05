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

interface CreateContinueNodeParams {
  operation: 'create';
  id: string;
  title: string;
  parentNodeID: string;
}

interface UpdateContinueNodeParams {
  operation: 'update';
  id: string;
  title?: string;
}

type ContinueNodeParams = CreateContinueNodeParams | UpdateContinueNodeParams;

interface ContinueNodeResult {
  nodeID: string;
}

@injectable()
export class ContinueNodeTool extends BaseNodeTool<ContinueNodeParams, ContinueNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'ContinueNode',
      description: `在 Loop 节点内创建一个 Continue 节点，或者修改一个 Continue 节点的参数

Continue 节点用于跳过当前迭代，继续执行下一次迭代。

## 创建节点参数类型

全量更新，所有 key 都为必填

\`\`\`typescript
interface CreateContinueNodeParams {
  operation: 'create'; // 固定为 create
  id: string; // 节点 ID，英文、数字、下划线组成
  title: string; // 节点标题，根据用户可理解的语言生成
  parentNodeID: string; // 父 Loop 节点的 ID
}
\`\`\`

## 修改节点参数类型

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateContinueNodeParams {
  operation: 'update'; // 固定为 update
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
}
\`\`\`

## parentNodeID 字段说明

parentNodeID 字段用于指定 Continue 节点所属的 Loop 节点 ID。

Continue 节点必须创建在 Loop 节点内部，因此必须指定 parentNodeID。

## 使用场景

Continue 节点通常与 Condition 节点配合使用，在满足特定条件时跳过当前迭代。

示例：在 loop_0 内创建一个 Continue 节点
\`\`\`json
{
  "operation": "create",
  "id": "continue_001",
  "title": "跳过当前迭代",
  "parentNodeID": "loop_0"
}
\`\`\`

## 注意事项

1. Continue 节点只能在 Loop 节点内创建
2. Continue 节点执行后，将跳过当前迭代的剩余步骤，直接进入下一次迭代
3. 通常与 Condition 节点配合使用，实现条件跳过
`,
      parameters: {
        type: 'object',
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.Continue),
  };

  public async execute(params: ContinueNodeParams): Promise<ToolCallResult<ContinueNodeResult>> {
    if (params.operation === 'create') {
      if (this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 已存在，请重新生成一个唯一的节点 ID。`,
        };
      }

      const parentNode = this.document.getNode(params.parentNodeID);
      if (!parentNode) {
        return {
          success: false,
          error: `父 Loop 节点 ${params.parentNodeID} 不存在。`,
        };
      }

      if (parentNode.type !== WorkflowNodeType.Loop) {
        return {
          success: false,
          error: `节点 ${params.parentNodeID} 不是 Loop 节点，Continue 节点只能创建在 Loop 节点内。`,
        };
      }

      const nodeID = await this.createContinueNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功创建 Continue 节点，节点 ID: ${nodeID}`,
      };
    }
    if (params.operation === 'update') {
      if (!this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 不存在，无法进行修改。`,
        };
      }
      const nodeID = await this.updateContinueNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功修改 Continue 节点，节点 ID: ${nodeID}`,
      };
    }
    return {
      success: false,
      error: `无效的操作类型 ${
        (params as ContinueNodeParams).operation
      }，仅支持 create 和 update。`,
    };
  }

  private async createContinueNode(params: CreateContinueNodeParams): Promise<string> {
    const node = this.document.createWorkflowNode(
      {
        id: params.id,
        type: WorkflowNodeType.Continue,
        data: {
          title: params.title,
        },
      },
      false,
      params.parentNodeID
    );

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }

  private async updateContinueNode(params: UpdateContinueNodeParams): Promise<string> {
    const node = this.document.getNode(params.id)!;

    const formModel = node?.getData(FlowNodeFormData).getFormModel<FormModelV2>();

    if (params.title !== undefined) {
      formModel.setValueIn('title', params.title);
    }

    await this.handleAutoLayout();

    this.focusNode(node);

    return node.id;
  }
}
