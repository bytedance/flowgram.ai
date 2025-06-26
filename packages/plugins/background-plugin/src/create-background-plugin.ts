import { definePluginCreator } from '@flowgram.ai/core';

import { BackgroundLayer, BackgroundLayerOptions } from './background-layer';

/**
 * 全局背景配置存储
 * 用于在没有 React Context 的情况下访问配置
 */
let globalBackgroundConfig: BackgroundLayerOptions = {};

/**
 * 获取全局背景配置
 * @returns 当前的全局背景配置
 */
export const getGlobalBackgroundConfig = (): BackgroundLayerOptions => ({
  ...globalBackgroundConfig,
});

/**
 * 点位背景插件
 *
 * @param options 背景配置选项
 * @returns 背景插件实例
 */
export const createBackgroundPlugin = definePluginCreator<BackgroundLayerOptions>({
  onInit: (ctx, opts) => {
    // 注册背景层
    ctx.playground.registerLayer(BackgroundLayer, opts);

    // 存储配置到全局变量，供其他组件使用
    globalBackgroundConfig = { ...opts };
  },
});
