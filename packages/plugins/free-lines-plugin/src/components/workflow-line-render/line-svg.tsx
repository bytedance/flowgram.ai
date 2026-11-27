/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import clsx from 'clsx';
import { type IPoint } from '@flowgram.ai/utils';
import { WorkflowLineRenderData } from '@flowgram.ai/free-layout-core';

import { type ArrowRendererComponent } from '../../types/arrow-renderer';
import { LineRenderProps } from '../../type';
import { posWithShrink } from '../../contributions/utils';
import { STROKE_WIDTH_SLECTED, STROKE_WIDTH } from '../../constants/points';
import { LineStyle } from './index.style';
import { ArrowRenderer } from './arrow';

const PADDING = 12;

export const LineSVG = (props: LineRenderProps) => {
  const { line, color, selected, children, strokePrefix, rendererRegistry } = props;
  const { position, reverse, hideArrow, vertical } = line;

  const renderData = line.getData(WorkflowLineRenderData);
  const { bounds, path: bezierPath } = renderData;

  // 相对位置转换函数
  const toRelative = (p: IPoint): IPoint => ({
    x: p.x - bounds.x + PADDING,
    y: p.y - bounds.y + PADDING,
  });

  const fromPos = toRelative(position.from);
  const toPos = toRelative(position.to);

  // 箭头位置计算
  const arrowToPos: IPoint = posWithShrink(toPos, position.to.location, line.uiState.shrink);
  const arrowFromPos: IPoint = posWithShrink(fromPos, position.from.location, line.uiState.shrink);

  const strokeWidth = selected
    ? line.uiState.strokeWidthSelected ?? STROKE_WIDTH_SLECTED
    : line.uiState.strokeWidth ?? STROKE_WIDTH;

  const strokeID = strokePrefix ? `${strokePrefix}-${line.id}` : line.id;

  // 获取自定义箭头渲染器，如果没有则使用默认的
  const CustomArrowRenderer = rendererRegistry?.tryToGetRendererComponent('arrow-renderer')
    ?.renderer as ArrowRendererComponent;
  const ArrowComponent = CustomArrowRenderer || ArrowRenderer;

  const path = (
    <path
      d={bezierPath}
      fill="none"
      stroke={`url(#${strokeID})`}
      strokeWidth={strokeWidth}
      className={line.processing || line.flowing ? 'dashed-line flowing-line' : ''}
    />
  );

  return (
    <LineStyle
      className={clsx('gedit-flow-activity-edge', line.className)}
      style={{
        ...line.uiState.style,
        left: bounds.x - PADDING,
        top: bounds.y - PADDING,
        position: 'absolute',
      }}
    >
      {children}
      <svg
        className="workflow-line-svg"
        width={bounds.width + PADDING * 2}
        height={bounds.height + PADDING * 2}
      >
        <defs>
          <linearGradient
            x1={vertical ? '100%' : '0%'}
            y1={vertical ? '0%' : '100%'}
            x2="100%"
            y2="100%"
            id={strokeID}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color} offset="0%" />
            <stop stopColor={color} offset="100%" />
          </linearGradient>
        </defs>
        <g>
          {path}
          <ArrowComponent
            id={strokeID}
            pos={reverse ? arrowFromPos : arrowToPos}
            strokeWidth={strokeWidth}
            location={reverse ? position.from.location : position.to.location}
            hide={hideArrow}
            line={line}
          />
        </g>
      </svg>
    </LineStyle>
  );
};
