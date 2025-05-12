import React from 'react';

import { useBaseColor } from '../hooks/use-base-color';

export const MARK_ACTIVATED_ARROW_ID = '$marker_arrow_activated$';
// export const MARK_ACTIVATED_ARROW_URL = `url(#${MARK_ACTIVATED_ARROW_ID})`;

function MarkerActivatedArrow(props: { id?: string }): JSX.Element {
  const { baseActivatedColor } = useBaseColor();
  return (
    <marker
      data-line-id={props.id}
      id={props.id || MARK_ACTIVATED_ARROW_ID}
      markerWidth="11"
      markerHeight="14"
      refX="10"
      refY="7"
      orient="auto"
    >
      <path
        d="M9.6 5.2C10.8 6.1 10.8 7.9 9.6 8.8L3.6 13.3C2.11672 14.4125 0 13.3541 0 11.5L0 2.5C0 0.645898 2.11672 -0.412461 3.6 0.7L9.6 5.2Z"
        fill={baseActivatedColor}
      />
    </marker>
  );
}

// version 变化才触发组件更新
export default MarkerActivatedArrow;
