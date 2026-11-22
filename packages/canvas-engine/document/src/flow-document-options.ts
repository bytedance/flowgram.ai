/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  type FlowNodeJSON,
  DefaultSpacingKey,
  FlowTransitionLine,
  FlowTransitionLabel,
  FlowNodeRegistry,
  FlowNodeType,
} from './typings';
import { FlowNodeEntity } from './entities';

export const FlowDocumentOptions = Symbol('FlowDocumentOptions');

/**
 * 流程画布配置
 */
export interface FlowDocumentOptions {
  /**
   * 布局，默认 垂直布局
   */
  defaultLayout?: string;
  /**
   * 所有节点的默认展开状态
   */
  allNodesDefaultExpanded?: boolean;
  toNodeJSON?(node: FlowNodeEntity): FlowNodeJSON;
  fromNodeJSON?(node: FlowNodeEntity, json: FlowNodeJSON, isFirstCreate: boolean): void;
  constants?: Record<string, any>;
  formatNodeLines?: (node: FlowNodeEntity, lines: FlowTransitionLine[]) => FlowTransitionLine[];
  formatNodeLabels?: (node: FlowNodeEntity, lines: FlowTransitionLabel[]) => FlowTransitionLabel[];
  preNodeCreate?: (node: FlowNodeEntity) => void;
  /**
   * 获取默认的节点配置
   */
  getNodeDefaultRegistry?: (type: FlowNodeType) => FlowNodeRegistry;
}

export const FlowDocumentOptionsDefault: FlowDocumentOptions = {
  allNodesDefaultExpanded: false,
};

/**
 * 支持外部 constants 自定义的 key 枚举
 */
export const ConstantKeys = {
  ...DefaultSpacingKey,
  /**
   * loop 底部留白
   */
  INLINE_SPACING_BOTTOM: 'INLINE_SPACING_BOTTOM',
  /**
   * inlineBlocks 的 inlineTop
   * loop 循环线条上边距
   */
  INLINE_BLOCKS_INLINE_SPACING_TOP: 'INLINE_BLOCKS_INLINE_SPACING_TOP',
  /**
   * inlineBlocks 的 inlineBottom
   * loop 循环线条的下边距
   *
   */
  INLINE_BLOCKS_INLINE_SPACING_BOTTOM: 'INLINE_BLOCKS_INLINE_SPACING_BOTTOM',
  /***
   * 线条、label 默认颜色
   */
  BASE_COLOR: 'BASE_COLOR',
  /***
   * 线条、label 激活后的颜色
   */
  BASE_ACTIVATED_COLOR: 'BASE_ACTIVATED_COLOR',
  /**
   * 线条宽度，可以是 number 或带单位的字符串（如 '2px'）
   * 不配置时使用 SVG 默认宽度
   *
   * 读到的值会先经 parseLineWidth 归一成 SVG 用户单位里的 number，再写入
   * WorkflowLineUIState.strokeWidth（类型是 number），因为该字段同时传给自定义箭头
   * 渲染器的 ArrowRendererProps.strokeWidth: number，消费方会拿它做数值几何。
   * 只接受 number 和 `<数字>px`，其他单位返回 undefined，保持默认渲染。
   */
  LINE_WIDTH: 'LINE_WIDTH',
  /**
   * Branch bottom margin
   * 分支下边距
   */
  INLINE_BLOCKS_PADDING_TOP: 'INLINE_BLOCKS_PADDING_TOP',
};

/**
 * 把 constants.LINE_WIDTH 归一成 SVG 用户单位里的数字宽度。
 *
 * 返回值必须是 number：WorkflowLineUIState.strokeWidth 和
 * ArrowRendererProps.strokeWidth 都是 number，直接把 '2px' 这样的字符串存进去，
 * 消费方做 strokeWidth * 2 之类的数值计算会得到 NaN。
 *
 * 接受有限非负的 number，或 `<数字>px` / 纯数字字符串（px 在用户单位里等价于数字）。
 * 其余一律 undefined，调用方据此不设置 strokeWidth，保持原本的默认渲染。
 */
export function parseLineWidth(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) && value >= 0 ? value : undefined;
  }
  if (typeof value === 'string') {
    const match = value.trim().match(/^(\d+(?:\.\d+)?|\.\d+)(?:px)?$/i);
    if (match) {
      const parsed = Number(match[1]);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
  }
  return undefined;
}
