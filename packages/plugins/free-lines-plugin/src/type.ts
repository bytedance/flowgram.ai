import { FC, ReactNode } from 'react';

import { type FlowRendererRegistry } from '@flowgram.ai/renderer';
import type {
  WorkflowLineEntity,
  WorkflowLineRenderContributionFactory,
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
}

export interface LinesLayerOptions {
  renderInsideLine?: FC<LineRenderProps>;
}

export interface FreeLinesPluginOptions extends LinesLayerOptions {
  contributions?: WorkflowLineRenderContributionFactory[];
  defaultLineType?: LineRenderType;
}
