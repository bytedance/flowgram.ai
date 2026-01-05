/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  FormFeedback,
  FlowNodeBaseType,
} from '@flowgram.ai/free-layout-editor';

import { ValidateService } from '@/services';
import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseNodeTool } from './base-tool';
import type { Tool } from '../types';

interface WorkflowValidateResult {
  formFeedbacks: Record<string, FormFeedback[]>;
  unlinkedNodes?: string[];
}

@injectable()
export class WorkflowValidateTool extends BaseNodeTool<unknown, WorkflowValidateResult> {
  @inject(ValidateService)
  private validateService: ValidateService;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'WorkflowValidate',
      description: '验证工作流中所有节点的配置是否正确',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  };

  public async execute(): Promise<ToolCallResult<WorkflowValidateResult>> {
    await this.fitView();
    const formFeedbacks = await this.getFormFeedbacks();
    const unlinkedNodes = this.getUnlinkedNodes();
    const formFeedbacksCount = Object.keys(formFeedbacks).length;
    if (formFeedbacksCount === 0) {
      return {
        success: true,
        data: {
          formFeedbacks,
          unlinkedNodes,
        },
        message: `工作流校验通过${
          unlinkedNodes.length ? `，但存在 ${unlinkedNodes.length} 个未连接节点` : ''
        }。`,
      };
    } else {
      return {
        success: false,
        data: {
          formFeedbacks,
          unlinkedNodes,
        },
        error: `工作流中共有 ${formFeedbacksCount} 个节点存在配置问题，请检查返回的 feedbacks 以获取详细信息。${
          unlinkedNodes.length ? `且存在 ${unlinkedNodes.length} 个未连接节点。` : ''
        }`,
      };
    }
  }

  private async getFormFeedbacks() {
    const validationResults = await this.validateService.validateNodes();
    const formFeedbacks: Record<string, FormFeedback[]> = {};
    validationResults.forEach((result) => {
      if (result.feedbacks.length > 0) {
        formFeedbacks[result.node.id] = result.feedbacks;
      }
    });
    return formFeedbacks;
  }

  private getUnlinkedNodes(): string[] {
    const allNodes = this.document.getAllNodes();
    const unlinkedNodes: string[] = [];
    allNodes.forEach((node) => {
      if (
        [WorkflowNodeType.Comment, FlowNodeBaseType.GROUP].includes(
          node.flowNodeType as WorkflowNodeType
        )
      ) {
        return;
      }
      if (node.lines.inputLines.length === 0 && node.lines.outputLines.length === 0) {
        unlinkedNodes.push(node.id);
      }
    });
    return unlinkedNodes;
  }
}
