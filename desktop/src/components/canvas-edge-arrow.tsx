/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

interface CanvasEdgeArrowProps {
  pos: { x: number; y: number };
  location: 'left' | 'right' | 'top' | 'bottom';
  hide?: boolean;
}

/** Direction is revealed on interaction; return connections keep the same quiet cue. */
export function CanvasEdgeArrow({ pos, location, hide }: CanvasEdgeArrowProps) {
  if (hide) return null;
  const rotation = { left: 0, top: 90, right: 180, bottom: 270 }[location];
  return (
    <path
      className="workflow-edge-arrow"
      d="M -5 -3 L 0 0 L -5 3 Z"
      transform={`translate(${pos.x} ${pos.y}) rotate(${rotation})`}
      aria-hidden="true"
    />
  );
}
