import React from 'react';

import { Rectangle } from '@flowgram.ai/utils';
import {
  FlowDragService,
  type FlowNodeTransitionData,
  type FlowTransitionLine,
  FlowTransitionLineEnum,
  DefaultSpacingKey,
} from '@flowgram.ai/document';
import { getDefaultSpacing } from '@flowgram.ai/document';

import { type FlowRendererRegistry } from '../flow-renderer-registry';
import StraightLine from './StraightLine';
import RoundedTurningLine from './RoundedTurningLine';
import CustomLine from './CustomLine';

export interface PropsType {
  data: FlowNodeTransitionData;
  rendererRegistry: FlowRendererRegistry;
  isViewportVisible: (bounds: Rectangle) => boolean;
  linesSave: JSX.Element[];
  dragService: FlowDragService;
}

export function createLines(props: PropsType): void {
  const { data, rendererRegistry, linesSave, dragService } = props;
  const { lines, entity } = data || {};

  const xRadius = getDefaultSpacing(entity, DefaultSpacingKey.ROUNDED_LINE_X_RADIUS);
  const yRadius = getDefaultSpacing(entity, DefaultSpacingKey.ROUNDED_LINE_Y_RADIUS);

  // 线条绘制逻辑
  const renderLine = (line: FlowTransitionLine, index: number) => {
    const { renderData } = data;
    const { isVertical } = data.entity;
    const { lineActivated } = renderData || {};

    const draggingLineHide =
      line.type === FlowTransitionLineEnum.DRAGGING_LINE &&
      !dragService.isDroppableBranch(data.entity, line.side);

    const draggingLineActivated =
      line.type === FlowTransitionLineEnum.DRAGGING_LINE &&
      data.entity?.id === dragService.dropNodeId &&
      line.side === dragService.labelSide;

    switch (line.type) {
      case FlowTransitionLineEnum.STRAIGHT_LINE:
        return (
          <StraightLine
            key={`${data.entity.id}_${index}`}
            lineId={data.entity.id}
            activated={lineActivated}
            {...line}
          />
        );

      case FlowTransitionLineEnum.DIVERGE_LINE:
      case FlowTransitionLineEnum.DRAGGING_LINE:
      case FlowTransitionLineEnum.MERGE_LINE:
      case FlowTransitionLineEnum.ROUNDED_LINE:
        return (
          <RoundedTurningLine
            key={`${data.entity.id}_${index}`}
            lineId={data.entity.id}
            isHorizontal={!isVertical}
            activated={lineActivated || draggingLineActivated}
            {...line}
            xRadius={xRadius}
            yRadius={yRadius}
            hide={draggingLineHide}
          />
        );

      case FlowTransitionLineEnum.CUSTOM_LINE:
        return (
          <CustomLine
            key={`${data.entity.id}_${index}`}
            lineId={data.entity.id}
            {...line}
            rendererRegistry={rendererRegistry}
          />
        );

      default:
        break;
    }

    return undefined;
  };
  lines.forEach((line, index) => {
    const bounds = Rectangle.createRectangleWithTwoPoints(line.from, line.to).pad(10);
    if (props.isViewportVisible(bounds)) {
      const jsxEl = renderLine(line, index) as JSX.Element;
      if (jsxEl) linesSave.push(jsxEl);
    }
  });
}
