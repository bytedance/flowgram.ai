import { definePluginCreator } from '@flowgram.ai/core';

import { BackgroundLayer, BackgroundLayerOptions } from './background-layer';
import { BackgroundConfig } from './background-config-service';

/**
 * 点位背景插件
 *
 * @param options 背景配置选项
 * @returns 背景插件实例
 */
export const createBackgroundPlugin = definePluginCreator<BackgroundLayerOptions>({
  singleton: true,
  onBind: (bindConfig, opts) => {
    // 将背景配置绑定到 BackgroundConfig Symbol
    const config: BackgroundConfig = {
      gridSize: opts.gridSize,
      dotSize: opts.dotSize,
      dotColor: opts.dotColor,
      dotOpacity: opts.dotOpacity,
      backgroundColor: opts.backgroundColor,
      dotFillColor: opts.dotFillColor,
      // 向后兼容字段
      opacity: opts.dotOpacity,
      showGrid: true,
    };

    bindConfig.bind(BackgroundConfig).toConstantValue(config);
  },
  onInit: (ctx, opts) => {
    // 注册背景层
    ctx.playground.registerLayer(BackgroundLayer, opts);
  },
});
