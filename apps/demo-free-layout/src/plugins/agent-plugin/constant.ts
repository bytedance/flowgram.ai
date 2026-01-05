/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { AgentConfig } from './types';

export const DEFAULT_AGENT_CONFIG: AgentConfig = {
  temperature: 0.7,
  maxTokens: 200000,
};

// ============================================
// Context Compact 配置（参考 Claude Code 实现）
// ============================================

/**
 * Micro Compact（规则压缩）配置
 * 当工具调用累积内容超过此阈值时，触发规则压缩
 */
export const TOOL_RESULT_TOKEN_THRESHOLD = 20000;

/**
 * 规则压缩时保留的 token 窗口大小
 * 超出此范围的旧工具调用结果将被清理
 */
export const TOOL_RESULT_KEEP_WINDOW = 40000;

/**
 * 智能总结触发阈值
 * 当总 token 数超过此值时，触发智能总结
 */
export const CONTEXT_COMPACT_THRESHOLD = 80000;

/**
 * 智能总结后保留的最近消息轮数
 */
export const CONTEXT_COMPACT_KEEP_RECENT = 3;

/**
 * 两次智能总结之间最少需要的新消息数
 * 避免频繁触发总结
 */
export const MIN_MESSAGES_BETWEEN_SUMMARIES = 6;
