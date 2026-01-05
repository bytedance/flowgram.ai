/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  injectable,
  inject,
  WorkflowDocument,
  WorkflowNodeJSON,
  FlowNodeBaseType,
  WorkflowEdgeJSON,
} from '@flowgram.ai/free-layout-editor';

import { WorkflowNodeType } from '@/nodes';

import type { ToolCallResult } from './type';
import { BaseTool } from './base-tool';
import type { Tool } from '../types';

interface NodeInfo {
  id: string;
  type: string;
  name: string;
  description?: string;
  nodes?: NodeInfo[];
}

interface WorkflowStructure {
  nodes: NodeInfo[];
  edges: WorkflowEdgeJSON[];
}

@injectable()
export class GetWorkflowStructureTool extends BaseTool<Record<string, never>, WorkflowStructure> {
  @inject(WorkflowDocument)
  private document: WorkflowDocument;

  public readonly tool: Tool = {
    type: 'function',
    function: {
      name: 'GetWorkflowStructure',
      description: '获取工作流的整体结构，包括节点和边的基本信息',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  };

  public async execute(): Promise<ToolCallResult<WorkflowStructure>> {
    const structure = this.getWorkflowStructure();
    return {
      success: true,
      data: structure,
      message: `成功获取工作流完整结构`,
    };
  }

  private getWorkflowStructure() {
    const json = this.document.toJSON();
    const buildStructure = (nodes: WorkflowNodeJSON[]): NodeInfo[] =>
      nodes
        .filter(
          (node) =>
            ![WorkflowNodeType.Comment, FlowNodeBaseType.GROUP].includes(
              node.type as WorkflowNodeType | FlowNodeBaseType
            )
        )
        .map((node) => ({
          id: node.id,
          type: node.type as string,
          name: node.data.title,
          description: node.data.description,
          nodes: node.blocks ? buildStructure(node.blocks) : undefined,
          edges: node.edges,
        }));
    return {
      nodes: buildStructure(json.nodes),
      edges: json.edges,
    };
  }
}
