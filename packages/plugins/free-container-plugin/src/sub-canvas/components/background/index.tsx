import React, { type FC } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';
import { useService } from '@flowgram.ai/core';
import { BackgroundConfig, type BackgroundConfigType } from '@flowgram.ai/background-plugin';

import { SubCanvasBackgroundStyle } from './style';

/**
 * 子画布背景组件
 * 支持从背景插件读取配置，保持与主画布背景的一致性
 */
export const SubCanvasBackground: FC = () => {
  const node = useCurrentEntity();

  // 默认配置
  let gridSize = 20;
  let dotSize = 1;
  let dotFillColor = '#4d53e8';
  let dotOpacity = 0.8;
  let backgroundColor = '#fafbfc';

  // 尝试从 BackgroundConfig Symbol 获取配置
  try {
    const config = useService(BackgroundConfig) as BackgroundConfigType;

    // 如果配置存在，使用配置值
    if (config) {
      gridSize = config.gridSize ?? gridSize;
      dotSize = config.dotSize ?? dotSize;
      // 子画布的点没有边框，所以使用 dotFillColor 作为填充色
      dotFillColor = config.dotFillColor ?? dotFillColor;
      dotOpacity = config.dotOpacity ?? dotOpacity;
      const configBgColor = config.backgroundColor;
      backgroundColor =
        configBgColor && configBgColor !== 'transparent' ? configBgColor : backgroundColor;
    }
  } catch (error) {
    // 如果配置不可用，使用默认配置（已在上面设置）
  }

  // 为每个子画布生成唯一的 pattern ID，避免多个子画布之间的冲突
  const patternId = `sub-canvas-dot-pattern-${node.id}`;

  return (
    <SubCanvasBackgroundStyle
      className="sub-canvas-background"
      data-flow-editor-selectable="true"
      style={{ backgroundColor }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern id={patternId} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <circle
              cx={gridSize / 2}
              cy={gridSize / 2}
              r={dotSize}
              stroke="none"
              fill={dotFillColor}
              opacity={dotOpacity}
            />
          </pattern>
        </defs>
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
