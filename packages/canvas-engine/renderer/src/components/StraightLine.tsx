import React from 'react';

import type { FlowTransitionLine } from '@flowgram.ai/document';

import { useBaseColor } from '../hooks/use-base-color';
import { DEFAULT_LINE_ATTRS } from './utils';

function StraightLine(props: FlowTransitionLine): JSX.Element {
  const { from, to, activated, style } = props;
  const { baseColor, baseActivatedColor } = useBaseColor();

  return (
    <path
      data-line-id={props.lineId}
      d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
      {...DEFAULT_LINE_ATTRS}
      stroke={activated ? baseActivatedColor : baseColor}
      style={style}
    />
  );
}

// version 变化才触发组件更新
export default StraightLine;
