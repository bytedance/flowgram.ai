/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  WorkflowDocument,
  WorkflowJSON,
} from '@flowgram.ai/free-layout-editor';

import type { ToolCallResult } from './type';
import { BaseTool } from './base-tool';
import type { Tool } from '../types';

@injectable()
export class GetWorkflowSchemaTool extends BaseTool<Record<string, never>, WorkflowJSON> {
  @inject(WorkflowDocument)
  private document: WorkflowDocument;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'GetWorkflowSchema',
      description: '详细列出所有节点与边的信息',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  };

  public async execute(): Promise<ToolCallResult<WorkflowJSON>> {
    const json = this.getWorkflowSchema();
    return {
      success: true,
      data: json,
      message: `成功获取工作流完整 Schema`,
    };
  }

  private getWorkflowSchema(): WorkflowJSON {
    const json = this.document.toJSON();
    return json;
  }
}
