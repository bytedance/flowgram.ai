/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  WorkflowDocument,
  FormFeedback,
} from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import { ValidateService } from '@/services';

import type { ToolCallResult } from './type';
import { BaseTool } from './base-tool';
import type { Tool } from '../types';

interface NodeValidateParams {
  nodeID: string;
}

type NodeValidateResult = FormFeedback[];

@injectable()
export class NodeValidateTool extends BaseTool<NodeValidateParams, NodeValidateResult> {
  @inject(ValidateService)
  private validateService: ValidateService;

  @inject(WorkflowDocument)
  private document: WorkflowDocument;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'NodeValidate',
      description: '验证指定节点的配置是否正确。',
      parameters: {
        type: 'object',
        properties: {
          nodeID: {
            type: 'string',
            description: '要验证的节点 ID。',
          },
        },
        required: ['nodeID'],
      } as IJsonSchema,
    },
  };

  public async execute(params: NodeValidateParams): Promise<ToolCallResult<NodeValidateResult>> {
    if (!params.nodeID) {
      return {
        success: false,
        error: '参数 nodeID 在执行 NodeValidate 操作时为必填项。',
      };
    }

    const feedbacks = await this.nodeValidate(params.nodeID);
    if (!feedbacks) {
      return {
        success: false,
        error: `未找到 ID 为 ${params.nodeID} 的节点。`,
      };
    }

    return {
      success: true,
      data: feedbacks,
      message: feedbacks.length
        ? `节点 ${params.nodeID} 校验共发现 ${feedbacks.length} 个问题`
        : `完成节点 ${params.nodeID} 校验，未发现问题`,
    };
  }

  private async nodeValidate(nodeID: string) {
    const node = this.document.getNode(nodeID);
    if (!node) {
      return null;
    }

    const feedbacks = await this.validateService.validateNode(node);
    return feedbacks;
  }
}
