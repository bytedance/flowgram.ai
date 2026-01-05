/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export interface ParsedContent {
  type: 'text' | 'tool_call';
  content?: string;
  toolName?: string;
  toolArgs?: string;
  toolResult?: string;
  id?: string;
}

/**
 * 解析内容，提取工具调用
 */
export function parseMessageContent(content: string): ParsedContent[] {
  const parts: ParsedContent[] = [];
  const toolCallRegex =
    /<tool_call id="([^"]+)" name="([^"]+)">\s*<arguments>([\s\S]*?)<\/arguments>(?:\s*<result>([\s\S]*?)<\/result>)?\s*<\/tool_call>/g;

  let lastIndex = 0;
  let match;

  while ((match = toolCallRegex.exec(content)) !== null) {
    // 添加工具调用之前的文本
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index).trim();
      if (textContent) {
        parts.push({ type: 'text', content: textContent });
      }
    }

    // 添加工具调用
    parts.push({
      type: 'tool_call',
      id: match[1],
      toolName: match[2],
      toolArgs: match[3].trim(),
      toolResult: match[4]?.trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  // 添加剩余文本
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex).trim();
    if (textContent) {
      parts.push({ type: 'text', content: textContent });
    }
  }

  // 如果没有匹配到任何内容，返回原始文本
  if (parts.length === 0 && content.trim()) {
    parts.push({ type: 'text', content: content.trim() });
  }

  return parts;
}
