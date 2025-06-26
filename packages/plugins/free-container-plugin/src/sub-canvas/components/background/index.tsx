import React, { type FC, useMemo } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';
import {
  useBackgroundConfig,
  getGlobalBackgroundConfig,
  DEFAULT_BACKGROUND_CONFIG,
} from '@flowgram.ai/background-plugin';

import { SubCanvasBackgroundStyle } from './style';

/**
 * 子画布背景组件
 * 支持从背景插件读取配置，保持与主画布背景的一致性
 */
export const SubCanvasBackground: FC = () => {
  const node = useCurrentEntity();

  // 优先使用 React Context 中的配置，如果没有则使用全局配置
  const contextConfig = useBackgroundConfig();
  const backgroundConfig = useMemo(
    () => contextConfig || getGlobalBackgroundConfig(),
    [contextConfig]
  );

  // 获取配置值，如果没有配置则使用默认值
  const gridSize = backgroundConfig.gridSize ?? DEFAULT_BACKGROUND_CONFIG.gridSize;
  const dotSize = backgroundConfig.dotSize ?? DEFAULT_BACKGROUND_CONFIG.dotSize;
  const dotColor = backgroundConfig.dotColor ?? DEFAULT_BACKGROUND_CONFIG.dotColor;
  const dotOpacity = backgroundConfig.dotOpacity ?? DEFAULT_BACKGROUND_CONFIG.dotOpacity;
  const dotFillColor = backgroundConfig.dotFillColor ?? dotColor;

  // 对于子画布，如果没有设置背景色，则使用默认的子画布背景色
  const backgroundColor =
    backgroundConfig.backgroundColor && backgroundConfig.backgroundColor !== 'transparent'
      ? backgroundConfig.backgroundColor
      : '#f2f3f5'; // 保持原有的子画布背景色

  // 为每个子画布生成唯一的 pattern ID，避免多个子画布之间的冲突
  const patternId = `sub-canvas-dot-pattern-${node.id}`;

  return (
    <SubCanvasBackgroundStyle
      className="sub-canvas-background"
      data-flow-editor-selectable="true"
      style={{ backgroundColor }}
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
