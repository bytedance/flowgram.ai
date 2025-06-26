import { definePluginCreator } from '@flowgram.ai/core';

import { BackgroundLayer, BackgroundLayerOptions } from './background-layer';
import { BackgroundConfigService } from './background-config-service';

/**
 * 点位背景插件
 *
 * @param options 背景配置选项
 * @returns 背景插件实例
 */
export const createBackgroundPlugin = definePluginCreator<BackgroundLayerOptions>({
  singleton: true,
  onBind: (bindConfig, opts) => {
    // 注册 BackgroundConfigService 单例
    bindConfig.bind(BackgroundConfigService).toSelf().inSingletonScope();
  },
  onInit: (ctx, opts) => {
    // 注册背景层
    ctx.playground.registerLayer(BackgroundLayer, opts);

    // 获取配置服务并存储配置，映射 BackgroundLayerOptions 到 BackgroundConfig
    const configService = ctx.get(BackgroundConfigService);
    configService.setConfig({
      gridSize: opts.gridSize,
      dotColor: opts.dotColor,
      backgroundColor: opts.backgroundColor,
      opacity: opts.dotOpacity, // 映射 dotOpacity 到 opacity
      showGrid: true, // BackgroundLayerOptions 没有这个字段，设为默认值
    });
  },
});
