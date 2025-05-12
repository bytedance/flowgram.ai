import React, { useMemo } from 'react';

import { isNil } from 'lodash';
import { Point } from '@flowgram.ai/utils';
import { type FlowTransitionLine } from '@flowgram.ai/document';
import { useService } from '@flowgram.ai/core';

import { useBaseColor } from '../hooks/use-base-color';
import { DEFAULT_LINE_ATTRS, DEFAULT_RADIUS, getHorizontalVertices, getVertices } from './utils';
import MarkerArrow, { MARK_ARROW_ID } from './MarkerArrow';
import MarkerActivatedArrow, { MARK_ACTIVATED_ARROW_ID } from './MarkerActivatedArrow';
import { FlowRendererKey, FlowRendererRegistry } from '../flow-renderer-registry';

interface PropsType extends FlowTransitionLine {
  radius?: number;
  hide?: boolean;
  xRadius?: number;
  yRadius?: number;
}

function MarkerDefs(props: { id: string; activated?: boolean }): JSX.Element {
  const renderRegistry = useService(FlowRendererRegistry);
  const ArrowRenderer = renderRegistry?.tryToGetRendererComponent(
    props.activated ? FlowRendererKey.MARKER_ACTIVATE_ARROW : FlowRendererKey.MARKER_ARROW
  );
  if (ArrowRenderer) {
    return <ArrowRenderer.renderer {...props} />;
  }
  if (props.activated) {
    return (
      <defs>
        <MarkerActivatedArrow id={props.id} />
      </defs>
    );
  }
  return (
    <defs>
      <MarkerArrow id={props.id} />
    </defs>
  );
}
/**
 * 圆角转弯线
 */
function RoundedTurningLine(props: PropsType): JSX.Element | null {
  const { vertices, radius = DEFAULT_RADIUS, hide, xRadius, yRadius, ...line } = props;
  const { from, to, arrow, activated, style } = line || {};
  const { baseActivatedColor, baseColor } = useBaseColor();

  // 如果没有 vertices，根据线条类型计算转折点
  const realVertices =
    vertices ||
    (props.isHorizontal
      ? getHorizontalVertices(line, xRadius, yRadius)
      : getVertices(line, xRadius, yRadius));
  const middleStr: string = useMemo(
    () =>
      realVertices
        .map((point, idx) => {
          const prev = realVertices[idx - 1] || from;
          const next = realVertices[idx + 1] || to;

          // 前后 delta 变化
          const prevDelta = { x: Math.abs(prev.x - point.x), y: Math.abs(prev.y - point.y) };
          const nextDelta = { x: Math.abs(next.x - point.x), y: Math.abs(next.y - point.y) };

          // 不是垂直直角的拐弯线报错
          const isRightAngleX = prevDelta.x === 0 && nextDelta.y === 0;
          const isRightAngleY = prevDelta.y === 0 && nextDelta.x === 0;
          const isRightAngle = isRightAngleX || isRightAngleY;

          if (!isRightAngle) {
            console.error(`vertex ${point.x},${point.y} is not right angle`);
          }

          // 圆角入点和出点为 control 往两个方向移动一段距离，距离不够 radius 为短距离
          const inPoint = new Point().copyFrom(point);
          const outPoint = new Point().copyFrom(point);
          const radiusX = isNil(point.radiusX) ? radius : point.radiusX;
          const radiusY = isNil(point.radiusY) ? radius : point.radiusY;
          let rx = radiusX;
          let ry = radiusY;

          if (isRightAngleX) {
            ry = Math.min(prevDelta.y, radiusY);
            const moveY = isNil(point.moveY) ? ry : point.moveY;
            inPoint.y += from.y < point.y ? -moveY : +moveY;

            rx = Math.min(nextDelta.x, radiusX);
            const moveX = isNil(point.moveX) ? rx : point.moveX;
            outPoint.x += to.x < point.x ? -moveX : +moveX;
          }

          if (isRightAngleY) {
            rx = Math.min(prevDelta.x, radiusX);
            const moveX = isNil(point.moveX) ? rx : point.moveX;
            inPoint.x += from.x < point.x ? -moveX : +moveX;

            ry = Math.min(nextDelta.y, radiusY);
            const moveY = isNil(point.moveY) ? ry : point.moveY;
            outPoint.y += to.y < point.y ? -moveY : +moveY;
          }

          // 是否是顺时针？
          // - 基于 AB 和 AC 的向量叉积
          // - A 点：inPoint, B 点：point, C 点：outPoint
          const crossProduct =
            (point.x - inPoint.x) * (outPoint.y - inPoint.y) -
            (point.y - inPoint.y) * (outPoint.x - inPoint.x);
          const isClockWise = crossProduct > 0;

          // 控制点为当前节点
          return `L ${inPoint.x} ${inPoint.y} A ${rx} ${ry} 0 0 ${isClockWise ? 1 : 0} ${
            outPoint.x
          } ${outPoint.y}`;
        })
        .join(' '),
    [realVertices]
  );

  if (hide) {
    return null;
  }

  const pathStr = `M ${from.x} ${from.y} ${middleStr} L ${to.x} ${to.y}`;
  const markerId = activated
    ? `${MARK_ACTIVATED_ARROW_ID}${props.lineId}`
    : `${MARK_ARROW_ID}${props.lineId}`;

  return (
    <>
      {arrow ? <MarkerDefs id={markerId} activated={activated} /> : null}
      <path
        data-line-id={props.lineId}
        d={pathStr}
        {...DEFAULT_LINE_ATTRS}
        stroke={activated ? baseActivatedColor : baseColor}
        {...(arrow
          ? {
              markerEnd: `url(#${markerId})`,
            }
          : {})}
        style={style}
      ></path>
    </>
  );
}

// version 变化才触发组件更新
export default RoundedTurningLine;
