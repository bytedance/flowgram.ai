import React, { type FC } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';
import { useService } from '@flowgram.ai/core';
import { BackgroundConfig, BackgroundLayerOptions } from '@flowgram.ai/background-plugin';

import { SubCanvasBackgroundStyle } from './style';

export const SubCanvasBackground: FC = () => {
  const node = useCurrentEntity();

  // 通过 inversify 获取背景配置，如果没有配置则使用默认值
  let backgroundConfig: BackgroundLayerOptions = {};
  try {
    backgroundConfig = useService<BackgroundLayerOptions>(BackgroundConfig);
  } catch (error) {
    // 如果 BackgroundConfig 没有注册，使用默认配置
    // 静默处理，使用默认配置
  }

  // 获取配置值，如果没有则使用默认值
  const gridSize = backgroundConfig.gridSize ?? 20;
  const dotSize = backgroundConfig.dotSize ?? 1;
  const dotColor = backgroundConfig.dotColor ?? '#eceeef';
  const dotOpacity = backgroundConfig.dotOpacity ?? 0.5;
  const backgroundColor = backgroundConfig.backgroundColor ?? '#f2f3f5';
  const dotFillColor = backgroundConfig.dotFillColor ?? dotColor;

  // 生成唯一的 pattern ID
  const patternId = `sub-canvas-dot-pattern-${node.id}`;

  return (
    <SubCanvasBackgroundStyle
      className="sub-canvas-background"
      data-flow-editor-selectable="true"
      style={{ backgroundColor: backgroundColor }}
    >
      <svg width="100%" height="100%">
        <pattern id={patternId} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <circle
            cx={dotSize}
            cy={dotSize}
            r={dotSize}
            stroke={dotColor}
            fill={dotFillColor}
            fillOpacity={dotOpacity}
          />
        </pattern>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          data-node-panel-container={node.id}
        />
      </svg>
    </SubCanvasBackgroundStyle>
  );
};
