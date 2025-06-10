import React, { CSSProperties, type FC } from 'react';

import { SubCanvasRenderStyle } from './style';
import { SubCanvasTips } from '../tips';
import { SubCanvasBorder } from '../border';
import { SubCanvasBackground } from '../background';
import { useNodeSize, useSyncNodeRenderSize } from '../../hooks';

interface ISubCanvasRender {
  offsetY?: number;
  className?: string;
  style?: CSSProperties;
  tipText?: string | React.ReactNode;
}

export const SubCanvasRender: FC<ISubCanvasRender> = ({
  className,
  style,
  offsetY = 0,
  tipText,
}) => {
  const nodeSize = useNodeSize();
  const nodeHeight = nodeSize?.height ?? 0;

  useSyncNodeRenderSize(nodeSize);

  return (
    <SubCanvasRenderStyle
      className={`sub-canvas-render ${className ?? ''}`}
      style={{
        height: nodeHeight + offsetY,
        ...style,
      }}
      data-flow-editor-selectable="true"
      onDragStart={(e) => {
        e.stopPropagation();
      }}
    >
      <SubCanvasBorder>
        <SubCanvasBackground />
        <SubCanvasTips tipText={tipText} />
      </SubCanvasBorder>
    </SubCanvasRenderStyle>
  );
};
