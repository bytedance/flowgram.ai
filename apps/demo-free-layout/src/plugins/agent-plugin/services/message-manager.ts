/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Emitter, injectable } from '@flowgram.ai/free-layout-editor';

import { WorkflowAgentUtils } from '../utils';
import type { AgentServiceChatMessage, ChatMessage, UIChatMessage } from '../types';
import {
  TOOL_RESULT_TOKEN_THRESHOLD,
  TOOL_RESULT_KEEP_WINDOW,
  CONTEXT_COMPACT_KEEP_RECENT,
} from '../constant';

/**
 * 消息管理服务
 * 负责消息的 CRUD、事件通知、历史管理
 */
@injectable()
export class MessageManager {
  private messages: AgentServiceChatMessage[] = [];

  private messagesEmitter = new Emitter<UIChatMessage[]>();

  /** 对话历史的智能总结（不影响 UI 显示，只用于 API 调用） */
  private conversationSummary: string | null = null;

  /** 上次执行智能总结时的消息索引 */
  private lastSummaryMessageIndex: number = 0;

  public onMessagesChange = this.messagesEmitter.event;

  /**
   * 获取所有消息（UI 层）
   */
  getMessages(): UIChatMessage[] {
    return this.messages.map(({ schema, ...msg }) => msg);
  }

  /**
   * 获取所有消息（包含 schema，内部使用）
   */
  getAllMessages(): AgentServiceChatMessage[] {
    return this.messages;
  }

  /**
   * 根据 ID 查找消息
   */
  findMessage(messageId: string): AgentServiceChatMessage | undefined {
    return this.messages.find((m) => m.id === messageId);
  }

  /**
   * 根据 ID 查找消息索引
   */
  findMessageIndex(messageId: string): number {
    return this.messages.findIndex((m) => m.id === messageId);
  }

  /**
   * 检查指定消息是否有 schema
   */
  hasSchema(messageId: string): boolean {
    const message = this.findMessage(messageId);
    return !!message?.schema;
  }

  /**
   * 获取指定消息之前的用户消息 ID
   */
  getPreviousUserMessageId(messageId: string): string | null {
    const messageIndex = this.findMessageIndex(messageId);
    if (messageIndex === -1) {
      return null;
    }

    for (let i = messageIndex - 1; i >= 0; i--) {
      if (this.messages[i].role === 'user') {
        return this.messages[i].id;
      }
    }

    return null;
  }

  /**
   * 添加消息
   */
  addMessage(message: AgentServiceChatMessage): void {
    this.messages.push(message);
    this.notifyListeners();
  }

  /**
   * 更新消息
   */
  updateMessage(messageId: string, updates: Partial<AgentServiceChatMessage>): void {
    const index = this.findMessageIndex(messageId);
    if (index !== -1) {
      this.messages[index] = { ...this.messages[index], ...updates };
      this.notifyListeners();
    }
  }

  /**
   * 截断消息到指定索引
   */
  truncateMessages(toIndex: number): void {
    this.messages = this.messages.slice(0, toIndex);
    this.notifyListeners();
  }

  /**
   * 重置所有消息
   */
  resetMessages(): void {
    this.messages = [];
    this.conversationSummary = null;
    this.lastSummaryMessageIndex = 0;
    this.notifyListeners();
  }

  /**
   * 通知监听器
   */
  notifyListeners(): void {
    this.messagesEmitter.fire(this.getMessages());
  }

  /**
   * 获取对话摘要
   */
  getConversationSummary(): string | null {
    return this.conversationSummary;
  }

  /**
   * 设置对话摘要
   */
  setConversationSummary(summary: string): void {
    this.conversationSummary = summary;
    this.lastSummaryMessageIndex = this.getFilteredMessages().length;
  }

  /**
   * 获取上次摘要时的消息索引
   */
  getLastSummaryMessageIndex(): number {
    return this.lastSummaryMessageIndex;
  }

  /**
   * 获取过滤后的消息（只包含 user 和 assistant）
   */
  getFilteredMessages(): AgentServiceChatMessage[] {
    return this.messages.filter((msg) => msg.role === 'user' || msg.role === 'assistant');
  }

  /**
   * 构建 API 消息（包含 micro-compact 逻辑）
   */
  buildApiMessages(systemPrompt: string): ChatMessage[] {
    const filteredMessages = this.getFilteredMessages();

    // Step 1: 计算工具调用的累积 token
    let totalToolTokens = 0;
    const toolTokensPerMessage: number[] = [];

    for (const msg of filteredMessages) {
      const tokens = WorkflowAgentUtils.estimateToolTokens(msg.content);
      totalToolTokens += tokens;
      toolTokensPerMessage.push(tokens);
    }

    // Step 2: Micro Compact（规则压缩）只有超过阈值时才触发，对前缀缓存友好
    const shouldMicroCompact = totalToolTokens > TOOL_RESULT_TOKEN_THRESHOLD;
    let microCompactBoundary = 0;

    if (shouldMicroCompact) {
      let keptTokens = 0;
      for (let i = filteredMessages.length - 1; i >= 0; i--) {
        keptTokens += toolTokensPerMessage[i];
        if (keptTokens > TOOL_RESULT_KEEP_WINDOW) {
          microCompactBoundary = i + 1;
          break;
        }
      }
    }

    // Step 3: 构建消息历史
    const history: ChatMessage[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
    ];

    // 如果有历史摘要，添加到上下文开头
    if (this.conversationSummary) {
      history.push({
        role: 'assistant',
        content: `[Previous conversation summary]\n\n${this.conversationSummary}`,
      });
    }

    // 添加消息，应用规则压缩
    const processedMessages = filteredMessages.map((msg, index) => {
      let content = msg.content;

      // 如果在压缩边界之前，清理工具结果
      if (shouldMicroCompact && index < microCompactBoundary) {
        content = WorkflowAgentUtils.clearToolResults(content);
      }

      // 最近的消息保留工具调用语义（转文本），旧消息移除
      const isRecentMessage = index >= filteredMessages.length - CONTEXT_COMPACT_KEEP_RECENT;
      content = isRecentMessage
        ? WorkflowAgentUtils.convertToolCallsToText(content)
        : WorkflowAgentUtils.removeToolCallsXML(content);

      return {
        role: msg.role,
        content,
      };
    });

    history.push(...processedMessages);

    return history;
  }
}
