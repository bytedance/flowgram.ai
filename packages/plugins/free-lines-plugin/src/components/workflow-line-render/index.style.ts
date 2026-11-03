/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import styled from 'styled-components';

// 添加一个固定类名，用于选中该节点

export const LineStyle = styled.div`
  position: absolute;

  /* The bezier bounds may cover nodes between endpoints. Let empty SVG area
     pass pointer events through while keeping painted strokes and arrows interactive. */
  pointer-events: none;

  svg path,
  svg polygon,
  svg circle {
    pointer-events: visiblePainted;
  }

  @keyframes flowingDash {
    to {
      stroke-dashoffset: -13;
    }
  }

  .dashed-line {
    stroke-dasharray: 8, 5;
  }

  .flowing-line {
    animation: flowingDash 0.5s linear infinite;
  }
`;
