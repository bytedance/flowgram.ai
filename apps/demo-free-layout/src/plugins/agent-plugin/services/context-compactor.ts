/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, inject } from '@flowgram.ai/free-layout-editor';

import { WorkflowAgentUtils } from '../utils';
import type { AgentServiceChatMessage, ChatMessage } from '../types';
import SummaryPrompt from '../prompts/summary-prompt.md?raw';
import {
  CONTEXT_COMPACT_THRESHOLD,
  CONTEXT_COMPACT_KEEP_RECENT,
  MIN_MESSAGES_BETWEEN_SUMMARIES,
} from '../constant';
import { LLMClient } from './llm-client';

/**
 * 上下文压缩服务
 * 负责对话历史的智能总结和压缩
 */
@injectable()
export class ContextCompactor {
  @inject(LLMClient)
  private llmClient: LLMClient;

  /**
   * 检查是否需要执行智能总结
   */
  shouldCompact(messages: AgentServiceChatMessage[], lastSummaryIndex: number): boolean {
    const filteredMessages = messages.filter(
      (msg) => msg.role === 'user' || msg.role === 'assistant'
    );

    // 估算当前总 token 数
    const totalTokens = filteredMessages.reduce(
      (sum, msg) => sum + WorkflowAgentUtils.estimateTokens(msg.content),
      0
    );

    // 检查是否达到压缩阈值
    if (totalTokens < CONTEXT_COMPACT_THRESHOLD) return false;

    // 检查自上次压缩以来是否有足够的新消息
    const messagesSinceLastSummary = filteredMessages.length - lastSummaryIndex;
    if (messagesSinceLastSummary < MIN_MESSAGES_BETWEEN_SUMMARIES) return false;

    return true;
  }

  /**
   * 生成对话历史的智能摘要
   */
  async generateSummary(messages: AgentServiceChatMessage[]): Promise<string | null> {
    const filteredMessages = messages.filter(
      (msg) => msg.role === 'user' || msg.role === 'assistant'
    );

    // 保留最近的消息不参与摘要
    const messagesToSummarize = filteredMessages.slice(
      0,
      -CONTEXT_COMPACT_KEEP_RECENT * 2 // 保留最近 N 轮（每轮 2 条消息）
    );

    if (messagesToSummarize.length < 4) {
      // 太少的消息不值得摘要
      return null;
    }

    // 构建摘要请求
    const summaryMessages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a helpful assistant that summarizes conversations concisely.',
      },
      ...messagesToSummarize.map((msg) => ({
        role: msg.role,
        content: WorkflowAgentUtils.convertToolCallsToText(msg.content),
      })),
      {
        role: 'user',
        content: SummaryPrompt,
      },
    ];

    // 调用 LLM 生成摘要
    const response = await this.llmClient.callSync(summaryMessages, {
      temperature: 0.3, // 低温度确保摘要一致性
      maxTokens: 2000, // 摘要不需要太长
    });

    // 提取 <summary> 标签内的内容
    const summaryMatch = response.match(/<summary>([\s\S]*?)<\/summary>/);
    return summaryMatch ? summaryMatch[1].trim() : response;
  }
}
