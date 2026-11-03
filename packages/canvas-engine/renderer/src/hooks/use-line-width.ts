/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ConstantKeys, FlowDocumentOptions } from '@flowgram.ai/document';
import { useService } from '@flowgram.ai/core';

/**
 * 读取 constants.LINE_WIDTH，用于线条粗细。
 * 没配置时返回 undefined，SVG 属性不设置，保持原本的默认渲染。
 */
export function useLineWidth(): number | string | undefined {
  const options = useService<FlowDocumentOptions>(FlowDocumentOptions);
  const lineWidth = options?.constants?.[ConstantKeys.LINE_WIDTH];
  if (lineWidth === undefined || lineWidth === null || lineWidth === '') {
    return undefined;
  }
  return lineWidth;
}
