/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  inject,
  injectable,
  WorkflowLinesManager,
  FlowNodeEntity,
  FlowNodeFormData,
  FormModelV2,
  WorkflowDocument,
  FormFeedback,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-editor';

import { WorkflowNodeType } from '@/nodes';

export interface ValidateResult {
  node: FlowNodeEntity;
  feedbacks: FormFeedback[];
}

@injectable()
export class ValidateService {
  @inject(WorkflowLinesManager)
  protected readonly linesManager: WorkflowLinesManager;

  @inject(WorkflowDocument) private readonly document: WorkflowDocument;

  validateLines() {
    const allLines = this.linesManager.getAllLines();
    allLines.forEach((line) => line.validate());
  }

  async validateNode(node: FlowNodeEntity) {
    const feedbacks = await node
      .getData(FlowNodeFormData)
      .getFormModel<FormModelV2>()
      .validateWithFeedbacks();
    return feedbacks;
  }

  private validateNodeConnections(node: FlowNodeEntity): FormFeedback[] {
    const nodeType = node.flowNodeType as WorkflowNodeType;

    const connectionRules: Partial<
      Record<
        WorkflowNodeType,
        { requireInput?: boolean; requireOutput?: boolean; errorMessage: string }
      >
    > = {
      [WorkflowNodeType.Start]: {
        requireOutput: true,
        errorMessage: '开始节点必须连接到至少一个后续节点',
      },
      [WorkflowNodeType.End]: {
        requireInput: true,
        errorMessage: '结束节点必须连接到至少一个前置节点',
      },
      [WorkflowNodeType.BlockStart]: {
        requireOutput: true,
        errorMessage: 'Loop 的 block_start 节点必须连接到 Loop 内的第一个子节点',
      },
      [WorkflowNodeType.BlockEnd]: {
        requireInput: true,
        errorMessage: 'Loop 的 block_end 节点必须连接到 Loop 内的最后一个子节点',
      },
      [WorkflowNodeType.Break]: {
        requireInput: true,
        errorMessage: 'Break 节点必须连接到至少一个前置节点',
      },
      [WorkflowNodeType.Continue]: {
        requireInput: true,
        errorMessage: 'Continue 节点必须连接到至少一个前置节点',
      },
    };

    const rule = connectionRules[nodeType];
    if (!rule) {
      return [];
    }

    const linesData = node.getData(WorkflowNodeLinesData);
    if (!linesData) {
      return [];
    }

    const { inputLines, outputLines } = linesData;
    const hasInputLines = inputLines && inputLines.length > 0;
    const hasOutputLines = outputLines && outputLines.length > 0;

    const feedbacks: FormFeedback[] = [];

    if (rule.requireInput && !hasInputLines) {
      feedbacks.push({
        feedbackStatus: 'error',
        feedbackText: rule.errorMessage,
        path: 'connections',
      });
    }

    if (rule.requireOutput && !hasOutputLines) {
      feedbacks.push({
        feedbackStatus: 'error',
        feedbackText: rule.errorMessage,
        path: 'connections',
      });
    }

    return feedbacks;
  }

  async validateNodes(): Promise<ValidateResult[]> {
    const nodes = this.document.getAssociatedNodes();
    const results = await Promise.all(
      nodes.map(async (node) => {
        const formFeedbacks = await this.validateNode(node);
        const connectionFeedbacks = this.validateNodeConnections(node);
        const allFeedbacks = [...formFeedbacks, ...connectionFeedbacks];

        return {
          feedbacks: allFeedbacks,
          node,
        };
      })
    );

    return results.filter((i) => i.feedbacks.length);
  }
}
