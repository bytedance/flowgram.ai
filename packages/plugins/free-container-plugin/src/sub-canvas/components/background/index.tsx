import React, { type FC, useMemo } from 'react';

import { useCurrentEntity } from '@flowgram.ai/free-layout-core';
import { useService } from '@flowgram.ai/core';
import {
  useBackgroundConfig,
  BackgroundConfigService,
  getBackgroundConfigValue,
} from '@flowgram.ai/background-plugin';

import { SubCanvasBackgroundStyle } from './style';

/**
 * 子画布背景组件
 * 支持从背景插件读取配置，保持与主画布背景的一致性
 */
export const SubCanvasBackground: FC = () => {
  const node = useCurrentEntity();

  // 优先使用 React Context 中的配置
  const contextConfig = useBackgroundConfig();

  // 如果没有 Context 配置，尝试从 BackgroundConfigService 获取
  const backgroundConfigService = useService(BackgroundConfigService);
  const serviceConfig = backgroundConfigService.getConfig();

  // 选择配置源：Context > Service
  const backgroundConfig = useMemo(() => {
    // 检查 Context 是否有有效配置（不是默认值或空值）
    const hasContextConfig =
      contextConfig &&
      Object.keys(contextConfig).some(
        (key) => contextConfig[key as keyof typeof contextConfig] !== undefined
      );

    return hasContextConfig ? contextConfig : serviceConfig;
  }, [contextConfig, serviceConfig]);

  // 获取配置值，使用新的工具函数
  const gridSize = getBackgroundConfigValue(backgroundConfig, 'gridSize', 20);
  const dotColor = getBackgroundConfigValue(backgroundConfig, 'dotColor', '#eceeef');
  const opacity = getBackgroundConfigValue(backgroundConfig, 'opacity', 0.5);

  // 对于子画布，如果没有设置背景色，则使用默认的子画布背景色
  const configBackgroundColor = getBackgroundConfigValue(backgroundConfig, 'backgroundColor', '');
  const backgroundColor =
    configBackgroundColor && configBackgroundColor !== 'transparent'
      ? configBackgroundColor
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
          <circle cx={1} cy={1} r={1} stroke={dotColor} fill={dotColor} fillOpacity={opacity} />
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
