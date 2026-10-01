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
   */
  LINE_WIDTH: 'LINE_WIDTH',
  /**
   * Branch bottom margin
   * 分支下边距
   */
  INLINE_BLOCKS_PADDING_TOP: 'INLINE_BLOCKS_PADDING_TOP',
};
