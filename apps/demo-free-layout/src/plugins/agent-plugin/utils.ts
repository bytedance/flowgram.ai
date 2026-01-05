/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ChatMessage, ToolCall, ToolResult, UIChatMessage } from './types';

export interface ParsedContent {
  type: 'text' | 'tool_call';
  content?: string;
  toolName?: string;
  toolArgs?: string;
  toolResult?: string;
  id?: string;
}

export function parseMessageContent(content: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  const toolCallRegex =
    /<tool_call id="([^"]+)" name="([^"]+)">\s*<arguments>([\s\S]*?)<\/arguments>(?:\s*<result>([\s\S]*?)<\/result>)?\s*<\/tool_call>/g;

  let lastIndex = 0;
  let match;

  while ((match = toolCallRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    parts.push({
      type: 'tool_call',
      id: match[1],
      toolName: match[2],
      toolArgs: match[3].trim(),
      toolResult: match[4]?.trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  if (parts.length === 0 && content.trim()) {
    parts.push({ type: 'text', content: content.trim() });
  }

  return parts;
}

export namespace WorkflowAgentUtils {
  /**
   * 创建新的用户消息
   */
  export const createUserMessage = (content: string): UIChatMessage => ({
    id: Date.now().toString(),
    role: 'user',
    content,
    timestamp: Date.now(),
    status: 'sent',
  });

  /**
   * 创建新的 Assistant 消息
   */
  export const createAssistantMessage = (id?: string): UIChatMessage => ({
    id: id || (Date.now() + 1).toString(),
    role: 'assistant',
    content: '',
    timestamp: Date.now(),
    status: 'sending',
  });

  /**
   * 格式化工具调用为 XML
   */
  export const formatToolCallsToXML = (toolCalls: ToolCall[]): string =>
    toolCalls
      .map((tc) => {
        const toolId = tc.id;
        const toolName = tc.function.name;
        const args = tc.function.arguments;
        return `\n\n<tool_call id="${toolId}" name="${toolName}">\n<arguments>\n${args}\n</arguments>\n</tool_call>`;
      })
      .join('');

  /**
   * 更新消息内容中的工具调用参数
   */
  export const updateToolCallArguments = (content: string, toolCalls: ToolCall[]): string => {
    let updatedContent = content;
    for (const toolCall of toolCalls) {
      const toolId = toolCall.id;
      const args = toolCall.function.arguments;
      updatedContent = updatedContent.replace(
        new RegExp(
          `(<tool_call id="${toolId}"[^>]*>\\s*<arguments>)[\\s\\S]*?(<\\/arguments>)`,
          'g'
        ),
        `$1\n${args}\n$2`
      );
    }
    return updatedContent;
  };

  /**
   * 更新消息内容中的工具调用结果
   */
  export const updateToolCallResults = (content: string, results: ToolResult[]): string => {
    let updatedContent = content;
    for (const result of results) {
      const toolId = result.toolCallId;
      const resultData = result.result;
      // 查找并更新对应的 tool_call，在 </arguments> 后添加 <result>
      updatedContent = updatedContent.replace(
        new RegExp(
          `(<tool_call id="${toolId}"[^>]*>\\s*<arguments>[\\s\\S]*?<\\/arguments>)(\\s*<\\/tool_call>)`,
          'g'
        ),
        `$1\n<result>\n${resultData}\n</result>$2`
      );
    }
    return updatedContent;
  };

  /**
   * 格式化错误消息
   */
  export const formatErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return `抱歉，发生了错误：${error.message}\n\n请检查 API 配置是否正确，或稍后重试。`;
    }
    return '抱歉，发生了未知错误，请稍后重试。';
  };

  /**
   * 标记未完成的工具调用为已取消
   * 检测消息中没有 result 的 tool_call，并添加取消标记
   */
  export const markIncompleteToolCallsAsCancelled = (content: string): string => {
    // 匹配没有 result 的 tool_call
    const incompleteToolCallRegex =
      /<tool_call id="([^"]+)" name="([^"]+)">\s*<arguments>([\s\S]*?)<\/arguments>\s*<\/tool_call>/g;

    return content.replace(
      incompleteToolCallRegex,
      '<tool_call id="$1" name="$2">\n<arguments>$3</arguments>\n<result>\n请求已取消\n</result>\n</tool_call>'
    );
  };

  /**
   * 从消息内容中移除工具调用XML
   * 用于构建API消息时，避免将XML格式的工具调用发送给LLM
   */
  export const removeToolCallsXML = (content: string): string => {
    const toolCallRegex =
      /<tool_call id="([^"]+)" name="([^"]+)">\s*<arguments>[\s\S]*?<\/arguments>(?:\s*<result>[\s\S]*?<\/result>)?\s*<\/tool_call>/g;
    return content.replace(toolCallRegex, '[Old tool result content cleared]').trim();
  };

  /**
   * 将工具调用XML转换为文本描述
   * 用于最近的消息，保留工具调用的语义但避免LLM误以为输出XML就能调用工具
   */
  export const convertToolCallsToText = (content: string): string => {
    const toolCallRegex =
      /<tool_call id="([^"]+)" name="([^"]+)">\s*<arguments>([\s\S]*?)<\/arguments>(?:\s*<result>([\s\S]*?)<\/result>)?\s*<\/tool_call>/g;

    return content
      .replace(toolCallRegex, (match, id, name, args, result) => {
        const truncatedArgs = args.trim().substring(0, 100);
        let replacement = `\n\n<system_note>Tool ${name} was called with args: ${truncatedArgs}${
          args.trim().length > 100 ? '...' : ''
        }`;
        if (result) {
          const truncatedResult = result.trim().substring(0, 150);
          replacement += `, returned: ${truncatedResult}${
            result.trim().length > 150 ? '...' : ''
          }</system_note>`;
        } else {
          replacement += '</system_note>';
        }
        return replacement;
      })
      .trim();
  };

  // ============================================
  // Context Compact 工具函数
  // ============================================

  /**
   * 估算文本的 token 数量
   * 使用简单的字符比例估算（中英文混合约 1 token ≈ 4 字符）
   */
  export const estimateTokens = (text: string): number => {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
  };

  /**
   * 估算消息数组的总 token 数
   */
  export const estimateTotalTokens = (messages: ChatMessage[]): number =>
    messages.reduce((total, msg) => total + estimateTokens(msg.content), 0);

  /**
   * 估算消息中工具调用部分的 token 数
   */
  export const estimateToolTokens = (content: string): number => {
    const toolCallRegex = /<tool_call[\s\S]*?<\/tool_call>/g;
    const matches = content.match(toolCallRegex) || [];
    return matches.reduce((sum, match) => sum + estimateTokens(match), 0);
  };

  /**
   * 清理工具调用结果（Micro Compact）
   * 将 <result>...</result> 替换为占位符，保留工具调用的结构
   */
  export const clearToolResults = (content: string): string =>
    content.replace(
      /<result>[\s\S]*?<\/result>/g,
      '<result>[Old tool result content cleared]</result>'
    );
}
