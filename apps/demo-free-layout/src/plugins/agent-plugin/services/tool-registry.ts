/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, multiInject } from '@flowgram.ai/free-layout-editor';

import type { Tool } from '../types';
import { ToolCallResult } from '../tools/type';
import { IAgentTool } from '../tools/base-tool';

/**
 * 工具注册表服务
 * 负责管理所有可用的工具，支持依赖注入
 */
@injectable()
export class WorkflowAgentToolRegistry {
  private tools = new Map<string, IAgentTool>();

  constructor(
    @multiInject(IAgentTool)
    toolInstances: IAgentTool[] = []
  ) {
    // 自动注册所有通过 IoC 注入的工具
    for (const tool of toolInstances) {
      this.register(tool);
    }
  }

  /**
   * 注册工具
   */
  register(tool: IAgentTool): void {
    const name = tool.tool.function.name;
    this.tools.set(name, tool);
  }

  /**
   * 获取所有工具定义
   */
  getAllTools(): Tool[] {
    return Array.from(this.tools.values()).map((tool) => tool.tool);
  }

  /**
   * 获取工具实例
   */
  getTool(name: string): IAgentTool | undefined {
    return this.tools.get(name);
  }

  /**
   * 执行工具
   */
  async execute(name: string, args: any): Promise<string> {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool ${name} not found`);
    }
    try {
      const toolResult = await tool.execute(args);
      return JSON.stringify(toolResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const toolResult: ToolCallResult<null> = {
        success: false,
        error: errorMessage,
      };
      return JSON.stringify(toolResult);
    }
  }

  /**
   * 检查工具是否存在
   */
  has(name: string): boolean {
    return this.tools.has(name);
  }

  /**
   * 获取所有工具名称
   */
  getToolNames(): string[] {
    return Array.from(this.tools.keys());
  }
}
