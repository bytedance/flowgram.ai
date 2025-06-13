import React from 'react';

import clsx from 'clsx';
import { type IPoint } from '@flowgram.ai/utils';
import { POINT_RADIUS } from '@flowgram.ai/free-layout-core';
import { WorkflowLineRenderData } from '@flowgram.ai/free-layout-core';

import { type ArrowRendererComponent } from '../../types/arrow-renderer';
import { LineRenderProps } from '../../type';
import { STROKE_WIDTH_SLECTED, STROKE_WIDTH } from '../../constants/points';
import { LINE_OFFSET } from '../../constants/lines';
import { LineStyle } from './index.style';
import { ArrowRenderer } from './arrow';

const PADDING = 12;

// eslint-disable-next-line react/display-name
export const LineSVG = (props: LineRenderProps) => {
  const { line, color, selected, children, strokePrefix, rendererRegistry } = props;
  const { position, reverse, vertical, hideArrow } = line;

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
  const arrowToPos: IPoint = vertical
    ? { x: toPos.x, y: toPos.y - POINT_RADIUS }
    : { x: toPos.x - POINT_RADIUS, y: toPos.y };
  const arrowFromPos: IPoint = vertical
    ? { x: fromPos.x, y: fromPos.y + POINT_RADIUS + LINE_OFFSET }
    : { x: fromPos.x + POINT_RADIUS + LINE_OFFSET, y: fromPos.y };

  const strokeWidth = selected ? STROKE_WIDTH_SLECTED : STROKE_WIDTH;

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
      className={clsx(
        line.className,
        // 显示流动线条的条件：没有自定义线条class，并且线条处于流动或处理中
        !line.className && (line.processing || line.flowing ? 'dashed-line flowing-line' : '')
      )}
    />
  );

  return (
    <LineStyle
      style={{
        left: bounds.x - PADDING,
        top: bounds.y - PADDING,
        position: 'absolute',
      }}
    >
      {children}
      <svg width={bounds.width + PADDING * 2} height={bounds.height + PADDING * 2}>
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
            reverseArrow={reverse}
            pos={reverse ? arrowFromPos : arrowToPos}
            strokeWidth={strokeWidth}
            vertical={vertical}
            hide={hideArrow}
            line={line}
          />
        </g>
      </svg>
    </LineStyle>
  );
};
