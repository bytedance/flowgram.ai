/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC, ReactNode } from 'react';

import { type FlowRendererRegistry } from '@flowgram.ai/renderer';
import type {
  WorkflowLineEntity,
  WorkflowLineRenderContributionFactory,
  WorkflowLineUIState,
} from '@flowgram.ai/free-layout-core';
import { LineRenderType } from '@flowgram.ai/free-layout-core';

export interface LineRenderProps {
  key: string;
  color?: string; // 高亮颜色，优先级最高
  selected?: boolean;
  hovered?: boolean;
  line: WorkflowLineEntity;
  lineType: LineRenderType;
  version: string; // 用于控制 memo 刷新
  strokePrefix?: string;
  children?: ReactNode;
  rendererRegistry?: FlowRendererRegistry; // 渲染器注册表，用于获取自定义箭头组件
  [key: string]: any;
}

export interface LinesLayerOptions {
  renderInsideLine?: FC<LineRenderProps>;
  renderLine?: FC<LineRenderProps>;
  customLineProps?: (line: WorkflowLineEntity, oldProps: LineRenderProps) => LineRenderProps; // 自定义线条属性
}

export interface FreeLinesPluginOptions extends LinesLayerOptions {
  contributions?: WorkflowLineRenderContributionFactory[];
  defaultLineUIState?: Partial<WorkflowLineUIState>;
  defaultLineType?: LineRenderType;
}
