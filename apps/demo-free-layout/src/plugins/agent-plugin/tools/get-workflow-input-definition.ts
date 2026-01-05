/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  WorkflowDocument,
  FlowNodeBaseType,
} from '@flowgram.ai/free-layout-editor';
import { IJsonSchema } from '@flowgram.ai/form-materials';

import type { ToolCallResult } from './type';
import { BaseTool } from './base-tool';
import type { Tool } from '../types';

@injectable()
export class GetWorkflowInputDefinitionTool extends BaseTool<
  Record<string, never>,
  IJsonSchema<'object'>
> {
  @inject(WorkflowDocument)
  private document: WorkflowDocument;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'GetWorkflowInputDefinition',
      description: '获取工作流的输入定义',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  };

  public async execute(): Promise<ToolCallResult<IJsonSchema<'object'>>> {
    const inputDef = this.getWorkflowInputDefinition();
    return {
      success: true,
      data: inputDef,
      message: `成功获取工作流输入定义`,
    };
  }

  private getWorkflowInputDefinition(): IJsonSchema<'object'> {
    const defaultValue: IJsonSchema<'object'> = { type: 'object', properties: {} };
    const startNode =
      this.document.getNode('start') ??
      this.document.getAllNodes().find((n) => n.flowNodeType === FlowNodeBaseType.START);
    if (!startNode) {
      return defaultValue;
    }
    const startNodeJSON = this.document.toNodeJSON(startNode);
    return startNodeJSON.data.outputs ?? defaultValue;
  }
}
