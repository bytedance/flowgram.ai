/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, inject, WorkflowLinesManager } from '@flowgram.ai/free-layout-editor';
import type { WorkflowEdgeJSON } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';

interface CreateEdgeParams {
  from: string;
  fromPort?: string;
  to: string;
  toPort?: string;
}

type CreateEdgeResult = WorkflowEdgeJSON;

@injectable()
export class CreateEdgeTool extends BaseNodeTool<CreateEdgeParams, CreateEdgeResult> {
  @inject(WorkflowLinesManager)
  private linesManager: WorkflowLinesManager;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'CreateEdge',
      description: `在工作流中创建节点之间的连接线（边）。

## 参数说明

\`\`\`typescript
interface CreateEdgeParams {
  from: string;      // 起始节点 ID（必填）
  fromPort?: string; // 起始节点的输出端口 ID（可选）
  to: string;        // 目标节点 ID（必填）
  toPort?: string;   // 目标节点的输入端口 ID（可选）
}
\`\`\`

## fromPort 使用说明

对于 Condition 节点，必须指定 fromPort 来选择条件分支：
- 使用条件的 key 值作为 fromPort，例如 "if_vbeap"、"if_FeBO-L" 等
- 使用 "else" 作为 fromPort 表示 else 分支（默认分支）

## 示例

1. 普通节点连接（不需要指定端口）：
\`\`\`json
{
  "from": "start",
  "to": "llm_001"
}
\`\`\`

2. Condition 节点的条件分支连接：
\`\`\`json
{
  "from": "condition_001",
  "fromPort": "if_contains_hello",
  "to": "llm_success"
}
\`\`\`

3. Condition 节点的 else 分支连接：
\`\`\`json
{
  "from": "condition_001",
  "fromPort": "else",
  "to": "llm_default"
}
\`\`\`
`,
      parameters: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: '起始节点 ID。',
          },
          fromPort: {
            type: 'string',
            description:
              '起始节点的输出端口 ID。对于 Condition 节点，使用条件的 key 值（如 "if_vbeap"）或 "else" 表示 else 分支。',
          },
          to: {
            type: 'string',
            description: '目标节点 ID。',
          },
          toPort: {
            type: 'string',
            description: '目标节点的输入端口 ID，可选。',
          },
        },
        required: ['from', 'to'],
      } as IJsonSchema,
    },
  };

  public async execute(params: CreateEdgeParams): Promise<ToolCallResult<CreateEdgeResult>> {
    if (!params.from || !params.to) {
      return {
        success: false,
        error: '参数 from 和 to 在执行 CreateEdge 操作时为必填项。',
      };
    }

    const fromNode = this.document.getNode(params.from);
    if (!fromNode) {
      return {
        success: false,
        error: `未找到 ID 为 ${params.from} 的起始节点。`,
      };
    }

    const toNode = this.document.getNode(params.to);
    if (!toNode) {
      return {
        success: false,
        error: `未找到 ID 为 ${params.to} 的目标节点。`,
      };
    }

    const fromParentId = fromNode.parent?.id;
    const toParentId = toNode.parent?.id;
    if (fromParentId !== toParentId) {
      return {
        success: false,
        error: `无法创建连接线：起始节点 ${params.from} 和目标节点 ${
          params.to
        } 不在同一个容器中。起始节点容器: ${fromParentId || 'root'}，目标节点容器: ${
          toParentId || 'root'
        }。`,
      };
    }

    const edge = this.createEdge(params);
    if (edge) {
      this.handleAutoLayout();
      this.fitView();
    }
    if (!edge) {
      return {
        success: false,
        error: '创建连接线失败，可能是端口不存在或连接不合法。',
      };
    }

    return {
      success: true,
      data: edge.toJSON(),
      message: `成功创建连接 ${edge.id}`,
    };
  }

  private createEdge(params: CreateEdgeParams) {
    const edge = this.linesManager.createLine({
      from: params.from,
      fromPort: params.fromPort,
      to: params.to,
      toPort: params.toPort,
    });
    return edge;
  }
}
