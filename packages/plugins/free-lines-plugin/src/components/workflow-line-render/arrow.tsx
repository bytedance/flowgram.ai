import React from 'react';

import { type ArrowRendererProps } from '../../types/arrow-renderer';
import { LINE_OFFSET } from '../../constants/lines';

export function ArrowRenderer({
  id,
  pos,
  reverseArrow,
  strokeWidth,
  vertical,
  hide,
}: ArrowRendererProps) {
  if (hide) {
    return null;
  }
  const arrowPath = vertical
    ? reverseArrow
      ? `M ${pos.x - LINE_OFFSET},${pos.y} L ${pos.x},${pos.y - LINE_OFFSET} L ${
          pos.x + LINE_OFFSET
        },${pos.y}`
      : `M ${pos.x - LINE_OFFSET},${pos.y - LINE_OFFSET} L ${pos.x},${pos.y} L ${
          pos.x + LINE_OFFSET
        },${pos.y - LINE_OFFSET}`
    : reverseArrow
    ? `M ${pos.x},${pos.y + LINE_OFFSET} L ${pos.x - LINE_OFFSET},${pos.y} L ${pos.x},${
        pos.y - LINE_OFFSET
      }`
    : `M ${pos.x - LINE_OFFSET},${pos.y - LINE_OFFSET} L ${pos.x},${pos.y} L ${
        pos.x - LINE_OFFSET
      },${pos.y + LINE_OFFSET}`;

  return (
    <path
      d={arrowPath}
      strokeLinecap="round"
      stroke={`url(#${id})`}
      fill="none"
      strokeWidth={strokeWidth}
    />
  );
}
