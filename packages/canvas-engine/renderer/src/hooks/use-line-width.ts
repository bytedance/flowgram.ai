/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ConstantKeys, FlowDocumentOptions, parseLineWidth } from '@flowgram.ai/document';
import { useService } from '@flowgram.ai/core';

/**
 * 读取 constants.LINE_WIDTH，用于线条粗细。
 * 没配置时返回 undefined，SVG 属性不设置，保持原本的默认渲染。
 * '2px' 这样的字符串会归一成 number，调用方拿到的永远是数字。
 */
export function useLineWidth(): number | undefined {
  const options = useService<FlowDocumentOptions>(FlowDocumentOptions);
  return parseLineWidth(options?.constants?.[ConstantKeys.LINE_WIDTH]);
}
