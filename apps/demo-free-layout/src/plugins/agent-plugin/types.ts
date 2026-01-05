/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type React from 'react';

import type { Event, WorkflowJSON } from '@flowgram.ai/free-layout-editor';
import type { IJsonSchema } from '@flowgram.ai/form-materials';

/**
 * Agent 层消息接口（用于 API 调用）
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

/**
 * UI 层消息接口（包含额外的 UI 状态）
 */
export interface UIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  status?: 'sending' | 'sent' | 'error';
}

export interface AgentServiceChatMessage extends UIChatMessage {
  schema?: WorkflowJSON;
}

export interface AgentConfig {
  apiKey?: string;
  baseURL?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Tool 函数定义
 */
export interface ToolFunction {
  name: string;
  description: string;
  parameters: IJsonSchema;
}

/**
 * Tool 定义
 */
export interface Tool {
  type: 'function';
  function: ToolFunction;
  render?: React.FC<{ args: any; result?: any }>;
}

/**
 * Tool 调用参数
 */
export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string; // JSON string
  };
}

/**
 * Tool 执行结果
 */
export interface ToolResult {
  toolCallId: string;
  result: string;
}

/**
 * ReAct 步骤类型
 */
export type ReActStep =
  | { type: 'thought'; content: string }
  | { type: 'tool_call'; toolCalls: ToolCall[] }
  | { type: 'tool_call_update'; toolCalls: ToolCall[] }
  | { type: 'tool_result'; results: ToolResult[] }
  | { type: 'response'; content: string };

export interface IWorkflowAgentService {
  init(config?: Partial<AgentConfig>): void;

  /**
   * 获取当前消息列表
   */
  getMessages(): UIChatMessage[];

  /**
   * 检查指定消息是否有 schema
   */
  hasSchema(messageId: string): boolean;

  /**
   * 获取指定消息之前的用户消息 ID
   */
  getPreviousUserMessageId(messageId: string): string | null;

  /**
   * 监听消息变化
   */
  onMessagesChange: Event<UIChatMessage[]>;

  /**
   * 发送消息（内部处理 ReAct Loop）
   */
  sendMessage(content: string): Promise<void>;

  /**
   * 清空消息历史
   */
  clearMessages(): void;

  /**
   * 取消当前正在进行的请求
   */
  cancelCurrentRequest(): void;

  /**
   * 重试指定的消息
   */
  retryMessage(messageId: string): Promise<void>;

  /**
   * 编辑并重新发送指定的用户消息
   */
  editAndResendMessage(messageId: string, newContent: string): Promise<void>;
  /**
   * 恢复指定消息的 schema
   */
  restoreSchema(messageId: string): void;
}

export const IWorkflowAgentService = Symbol('WorkflowAgentService');
