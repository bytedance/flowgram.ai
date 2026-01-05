/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, inject } from '@flowgram.ai/free-layout-editor';

import type { ChatMessage, Tool, ToolCall, ToolResult, ReActStep } from '../types';
import { WorkflowAgentToolRegistry } from './tool-registry';
import { LLMClient } from './llm-client';

export interface ReActLoopParams {
  messages: ChatMessage[];
  tools: Tool[];
  maxIterations: number;
  signal?: AbortSignal;
  onStep: (step: ReActStep) => void;
  onChunk: (chunk: string) => void;
}

/**
 * ReAct 循环执行器
 * 实现思考-行动-观察循环，支持工具调用和流式输出
 */
@injectable()
export class ReActLoopExecutor {
  @inject(LLMClient)
  private llmClient: LLMClient;

  @inject(WorkflowAgentToolRegistry)
  private toolRegistry: WorkflowAgentToolRegistry;

  /**
   * 执行 ReAct Loop（流式版本）
   */
  async execute(params: ReActLoopParams): Promise<string> {
    const { messages, tools, maxIterations, signal, onChunk, onStep } = params;

    let currentMessages = [...messages];
    let iteration = 0;
    let lastContent = '';

    while (iteration < maxIterations) {
      iteration++;

      // 调用 LLM 获取响应（流式）
      let fullContent = '';
      let toolCallsDetected = false;
      const response = await this.llmClient.callStream({
        messages: currentMessages,
        tools,
        signal,
        onChunk: (chunk) => {
          fullContent += chunk;
          // 实时输出思考过程
          onChunk(chunk);
        },
        onToolCallDetected: (toolCalls) => {
          // 一旦检测到工具调用就立即通知 UI（显示 loading 状态）
          if (!toolCallsDetected) {
            toolCallsDetected = true;
            onStep({
              type: 'tool_call',
              toolCalls,
            });
          }
        },
      });

      // 保存最后的内容
      lastContent = fullContent;

      // 如果有内容（思考过程），发出 thought 步骤
      if (fullContent) {
        onStep({
          type: 'thought',
          content: fullContent,
        });
      }

      // 检查是否有工具调用
      if (response.toolCalls && response.toolCalls.length > 0) {
        // 如果已经提前通知过（显示了 loading），这里更新完整的参数
        if (toolCallsDetected) {
          onStep({
            type: 'tool_call_update',
            toolCalls: response.toolCalls,
          });
        } else {
          // 如果流式传输中未检测到（边缘情况），这里统一触发
          onStep({
            type: 'tool_call',
            toolCalls: response.toolCalls,
          });
        }

        // 添加短暂延迟，确保 UI 有时间更新显示工具调用卡片
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 根据 OpenAI API 规范，分离思考内容和工具调用
        // 如果有思考内容，先添加一条纯文本的 assistant 消息
        if (fullContent.trim()) {
          currentMessages.push({
            role: 'assistant',
            content: fullContent,
          });
        }

        // 然后添加工具调用消息（content 为空或仅包含简短说明）
        currentMessages.push({
          role: 'assistant',
          content: '',
          tool_calls: response.toolCalls,
        } as any);

        // 执行工具调用
        const toolResults: ToolResult[] = await this.executeTools(response.toolCalls);

        // 发出工具结果步骤
        onStep({
          type: 'tool_result',
          results: toolResults,
        });

        // 将工具结果添加到消息历史
        for (const result of toolResults) {
          currentMessages.push({
            role: 'tool',
            content: result.result,
            tool_call_id: result.toolCallId,
          } as any);
        }

        // 继续下一次循环
        continue;
      }

      // 没有工具调用，返回最终响应
      onStep({
        type: 'response',
        content: fullContent,
      });

      return fullContent;
    }

    // 达到最大迭代次数，输出警告信息但保留之前的内容
    const warningMessage = `\n\n 已达到最大迭代次数（${maxIterations}次），任务可能未完全完成，输入 "继续" 进行任务。`;
    onChunk(warningMessage);

    onStep({
      type: 'response',
      content: lastContent + warningMessage,
    });

    return lastContent + warningMessage;
  }

  /**
   * 执行工具调用（并发执行）
   */
  private async executeTools(toolCalls: ToolCall[]): Promise<ToolResult[]> {
    const promises = toolCalls.map(async (toolCall) => {
      try {
        const args = JSON.parse(toolCall.function.arguments);
        const result = await this.toolRegistry.execute(toolCall.function.name, args);

        return {
          toolCallId: toolCall.id,
          result,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return {
          toolCallId: toolCall.id,
          result: JSON.stringify({
            success: false,
            error: errorMessage,
          }),
          error: errorMessage,
        };
      }
    });

    return Promise.all(promises);
  }
}
