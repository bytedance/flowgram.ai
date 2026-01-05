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

interface CreateBreakNodeParams {
  operation: 'create';
  id: string;
  title: string;
  parentNodeID: string;
}

interface UpdateBreakNodeParams {
  operation: 'update';
  id: string;
  title?: string;
}

type BreakNodeParams = CreateBreakNodeParams | UpdateBreakNodeParams;

interface BreakNodeResult {
  nodeID: string;
}

@injectable()
export class BreakNodeTool extends BaseNodeTool<BreakNodeParams, BreakNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'BreakNode',
      description: `在 Loop 节点内创建一个 Break 节点，或者修改一个 Break 节点的参数

Break 节点用于跳出 Loop 循环，终止后续的迭代。

## 创建节点参数类型

全量更新，所有 key 都为必填

\`\`\`typescript
interface CreateBreakNodeParams {
  operation: 'create'; // 固定为 create
  id: string; // 节点 ID，英文、数字、下划线组成
  title: string; // 节点标题，根据用户可理解的语言生成
  parentNodeID: string; // 父 Loop 节点的 ID
}
\`\`\`

## 修改节点参数类型

增量更新，可选部分 key 进行更新

\`\`\`typescript
interface UpdateBreakNodeParams {
  operation: 'update'; // 固定为 update
  id: string; // 节点 ID，英文、数字、下划线组成
  title?: string; // 节点标题，根据用户可理解的语言生成
}
\`\`\`

## parentNodeID 字段说明

parentNodeID 字段用于指定 Break 节点所属的 Loop 节点 ID。

Break 节点必须创建在 Loop 节点内部，因此必须指定 parentNodeID。

## 使用场景

Break 节点通常与 Condition 节点配合使用，在满足特定条件时跳出循环。

示例：在 loop_0 内创建一个 Break 节点
\`\`\`json
{
  "operation": "create",
  "id": "break_001",
  "title": "跳出循环",
  "parentNodeID": "loop_0"
}
\`\`\`

## 注意事项

1. Break 节点只能在 Loop 节点内创建
2. Break 节点执行后，Loop 将立即终止，不再执行后续迭代
3. 通常与 Condition 节点配合使用，实现条件跳出
`,
      parameters: {
        type: 'object',
      } as IJsonSchema,
    },
    render: createNodeRender(WorkflowNodeType.Break),
  };

  public async execute(params: BreakNodeParams): Promise<ToolCallResult<BreakNodeResult>> {
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
          error: `节点 ${params.parentNodeID} 不是 Loop 节点，Break 节点只能创建在 Loop 节点内。`,
        };
      }

      const nodeID = await this.createBreakNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功创建 Break 节点，节点 ID: ${nodeID}`,
      };
    }
    if (params.operation === 'update') {
      if (!this.document.getNode(params.id)) {
        return {
          success: false,
          error: `节点 ID ${params.id} 不存在，无法进行修改。`,
        };
      }
      const nodeID = await this.updateBreakNode(params);
      return {
        success: true,
        data: { nodeID },
        message: `成功修改 Break 节点，节点 ID: ${nodeID}`,
      };
    }
    return {
      success: false,
      error: `无效的操作类型 ${(params as BreakNodeParams).operation}，仅支持 create 和 update。`,
    };
  }

  private async createBreakNode(params: CreateBreakNodeParams): Promise<string> {
    const node = this.document.createWorkflowNode(
      {
        id: params.id,
        type: WorkflowNodeType.Break,
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

  private async updateBreakNode(params: UpdateBreakNodeParams): Promise<string> {
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
