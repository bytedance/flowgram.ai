/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';

interface RemoveNodeToolParams {
  nodeID: string;
}

interface RemoveNodeResult {
  nodeID: string;
}

@injectable()
export class RemoveNodeTool extends BaseNodeTool<RemoveNodeToolParams, RemoveNodeResult> {
  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'RemoveNode',
      description: '从工作流中删除节点。',
      parameters: {
        type: 'object',
        properties: {
          nodeID: {
            type: 'string',
            description: '要删除的节点 ID。',
          },
        },
        required: ['nodeID'],
      } as IJsonSchema,
    },
  };

  public async execute(params: RemoveNodeToolParams): Promise<ToolCallResult<RemoveNodeResult>> {
    if (!params.nodeID) {
      return {
        success: false,
        error: '参数 nodeID 在执行 RemoveNode 操作时为必填项。',
      };
    }

    const node = this.document.getNode(params.nodeID);
    if (!node) {
      return {
        success: false,
        error: `未找到 ID 为 ${params.nodeID} 的节点。`,
      };
    }

    if (!this.document.canRemove(node)) {
      return {
        success: false,
        error: `节点 ${params.nodeID} 不允许删除。`,
      };
    }

    node.dispose();

    this.handleAutoLayout();
    this.fitView();

    return {
      success: true,
      data: { nodeID: params.nodeID },
      message: `成功删除节点 ${params.nodeID}`,
    };
  }
}
