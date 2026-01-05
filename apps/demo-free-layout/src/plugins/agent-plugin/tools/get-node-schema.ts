/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  WorkflowNodeJSON,
  WorkflowDocument,
} from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import type { ToolCallResult } from './type';
import { BaseTool } from './base-tool';
import type { Tool } from '../types';

interface GetNodeSchemaParams {
  nodeID: string;
}

@injectable()
export class GetNodeSchemaTool extends BaseTool<GetNodeSchemaParams, WorkflowNodeJSON> {
  @inject(WorkflowDocument)
  private document: WorkflowDocument;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'GetNodeSchema',
      description: '获取工作流节点的 Schema。',
      parameters: {
        type: 'object',
        properties: {
          nodeID: {
            type: 'string',
            description: '要获取 Schema 的节点 ID。',
          },
        },
        required: ['nodeID'],
      } as IJsonSchema,
    },
  };

  public async execute(params: GetNodeSchemaParams): Promise<ToolCallResult<WorkflowNodeJSON>> {
    if (!params.nodeID) {
      return {
        success: false,
        error: '参数 nodeID 在执行 GetWorkflowNodeSchema 操作时为必填项。',
      };
    }

    const nodeSchema = this.getNodeSchema(params.nodeID);
    if (!nodeSchema) {
      return {
        success: false,
        error: `未找到 ID 为 ${params.nodeID} 的节点。`,
      };
    }
    return {
      success: true,
      data: nodeSchema,
      message: `成功获取节点 ${params.nodeID} 的 Schema。`,
    };
  }

  private getNodeSchema(nodeID: string): WorkflowNodeJSON | null {
    const node = this.document.getNode(nodeID);
    if (!node) {
      return null;
    }
    return this.document.toNodeJSON(node);
  }
}
