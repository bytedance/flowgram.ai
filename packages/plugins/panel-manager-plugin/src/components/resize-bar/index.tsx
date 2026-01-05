/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useRef, useState } from 'react';

interface Props {
  size: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  position?: 'left' | 'right';
  onResize: (w: number) => void;
}

export const ResizeBar: React.FC<Props> = ({
  onResize,
  size,
  direction,
  reverse = false,
  position = 'left',
}) => {
  const currentPoint = useRef<null | number>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === 'vertical';

  return (
    <div
      onMouseDown={(e) => {
        currentPoint.current = isVertical ? e.clientX : e.clientY;
        e.stopPropagation();
        e.preventDefault();
        setIsDragging(true);
        const mouseUp = () => {
          currentPoint.current = null;
          document.body.removeEventListener('mouseup', mouseUp);
          document.body.removeEventListener('mousemove', mouseMove);
          setIsDragging(false);
        };
        const mouseMove = (e: MouseEvent) => {
          const rawDelta = currentPoint.current! - (isVertical ? e.clientX : e.clientY);
          const delta = reverse ? -rawDelta : rawDelta;
          onResize(size + delta);
        };
        document.body.addEventListener('mouseup', mouseUp);
        document.body.addEventListener('mousemove', mouseMove);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        top: 0,
        ...(position === 'left' ? { left: 0 } : { right: 0 }),
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        ...(isVertical
          ? {
              cursor: 'ew-resize',
              height: '100%',
              ...(position === 'left' ? { marginLeft: -5 } : { marginRight: -5 }),
              width: 10,
            }
          : {
              cursor: 'ns-resize',
              width: '100%',
              marginTop: -5,
              height: 10,
            }),
      }}
    >
      <div
        style={{
          ...(isVertical
            ? {
                width: 3,
                height: '100%',
              }
            : {
                height: 3,
                width: '100%',
              }),
          backgroundColor: isDragging || isHovered ? 'var(--g-playground-line)' : 'transparent',
        }}
      />
    </div>
  );
};
