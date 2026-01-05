/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable } from '@flowgram.ai/free-layout-editor';

import type { AgentConfig, ChatMessage, ToolCall, Tool } from '../types';

export interface LLMStreamParams {
  messages: ChatMessage[];
  tools: Tool[];
  onChunk: (chunk: string) => void;
  onToolCallDetected: (toolCalls: ToolCall[]) => void;
  signal?: AbortSignal;
}

export interface LLMStreamResponse {
  content: string;
  toolCalls?: ToolCall[];
}

/**
 * LLM 客户端服务
 * 负责与 LLM API 的通信，支持流式和非流式调用
 */
@injectable()
export class LLMClient {
  private config: AgentConfig | null = null;

  /**
   * 初始化配置
   */
  init(config: AgentConfig): void {
    this.config = config;
  }

  /**
   * 获取当前配置
   */
  getConfig(): AgentConfig | null {
    return this.config;
  }

  /**
   * 流式调用 LLM
   */
  async callStream(params: LLMStreamParams): Promise<LLMStreamResponse> {
    const { messages, tools, onChunk, onToolCallDetected, signal } = params;

    if (!this.config?.apiKey) {
      throw new Error('API Key is not configured. Please set the API key in settings.');
    }

    const request: any = {
      model: this.config.model!,
      messages,
      temperature: this.config.temperature,
      max_tokens: this.config.maxTokens,
      stream: true,
    };

    // 如果提供了工具，添加到请求中
    if (tools.length > 0) {
      request.tools = tools;
      request.tool_choice = 'auto';
    }

    try {
      const response = await fetch(`${this.config.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(request),
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `API request failed with status ${response.status}`
        );
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let fullContent = '';
      let toolCalls: ToolCall[] | undefined;
      let toolCallsNotified = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;

          if (trimmedLine.startsWith('data: ')) {
            try {
              const jsonStr = trimmedLine.slice(6);
              const data = JSON.parse(jsonStr);
              const delta = data.choices?.[0]?.delta;

              if (delta?.content) {
                fullContent += delta.content;
                onChunk(delta.content);
              }

              // 收集工具调用信息
              if (delta?.tool_calls) {
                if (!toolCalls) {
                  toolCalls = [];
                }
                for (const tc of delta.tool_calls) {
                  const index = tc.index ?? 0;
                  if (!toolCalls[index]) {
                    toolCalls[index] = {
                      id: tc.id || '',
                      type: 'function',
                      function: {
                        name: tc.function?.name || '',
                        arguments: tc.function?.arguments || '',
                      },
                    };
                  } else {
                    // 追加参数
                    if (tc.function?.arguments) {
                      toolCalls[index].function.arguments += tc.function.arguments;
                    }
                    if (tc.function?.name) {
                      toolCalls[index].function.name = tc.function.name;
                    }
                    if (tc.id) {
                      toolCalls[index].id = tc.id;
                    }
                  }
                }

                // 检测到工具调用时立即通知 UI（用于显示 loading）
                // 只要有 id 和 name 就通知，arguments 可以是部分的
                if (!toolCallsNotified && toolCalls.length > 0) {
                  const completeToolCalls = toolCalls.filter((tc) => tc.id && tc.function.name);
                  if (completeToolCalls.length > 0) {
                    toolCallsNotified = true;
                    // 立即通知，即使 arguments 还未完全收集
                    onToolCallDetected([...completeToolCalls]);
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to parse SSE data:', e);
            }
          }
        }
      }

      return {
        content: fullContent,
        toolCalls,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to call LLM: ${error.message}`);
      }
      throw new Error('Failed to call LLM: Unknown error');
    }
  }

  /**
   * 非流式调用 LLM（用于摘要等场景）
   */
  async callSync(
    messages: ChatMessage[],
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    if (!this.config?.apiKey) {
      throw new Error('API Key is not configured');
    }

    const response = await fetch(`${this.config.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: options?.temperature ?? 0.3,
        max_tokens: options?.maxTokens ?? 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  }
}
