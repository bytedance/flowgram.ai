import { definePluginCreator } from '@flowgram.ai/core';

import { BackgroundConfig, BackgroundLayer, BackgroundLayerOptions } from './background-layer';

/**
 * 点位背景插件
 */
export const createBackgroundPlugin = definePluginCreator<BackgroundLayerOptions>({
  onBind: (bindConfig, opts) => {
    bindConfig.bind(BackgroundConfig).toConstantValue(opts);
  },
  onInit: (ctx, opts) => {
    ctx.playground.registerLayer(BackgroundLayer, opts);
  },
});
