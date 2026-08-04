/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { interfaces } from 'inversify';
import { ShortcutsRegistry } from '@flowgram.ai/shortcuts-plugin';
import {
  PlaygroundLayerOptions,
  Plugin,
  PluginBindConfig,
  PluginContext,
  LayerRegistry,
} from '@flowgram.ai/core';
import { BackgroundLayerOptions } from '@flowgram.ai/background-plugin';

/**
 * 画布配置配置
 */
export interface PlaygroundReactProps<CTX extends PluginContext = PluginContext> {
  /**
   * 背景开关，默认打开
   */
  background?: BackgroundLayerOptions | boolean;
  /**
   * 画布相关配置
   */
  playground?: PlaygroundLayerOptions & {
    autoFocus?: boolean; // 默认是否聚焦
    autoResize?: boolean; // 是否自动 resize 画布
    viewportCulling?: boolean; // 是否开启视口裁剪
    viewportCullingOverscan?: number; // 视口裁剪预渲染边距
    lineViewportCulling?: boolean; // 是否开启线条视口裁剪
  };
  /**
   * 注册快捷键
   */
  shortcuts?: (shortcutsRegistry: ShortcutsRegistry, ctx: CTX) => void;
  /**
   * 插件 IOC 注册，等价于 containerModule
   */
  onBind?: (bindConfig: PluginBindConfig) => void;
  /**
   * 画布模块注册阶段
   */
  onInit?: (ctx: CTX) => void;
  /**
   * 画布事件注册阶段 (一般用于注册 dom 事件)
   */
  onReady?: (ctx: CTX) => void;
  /**
   * 画布所有 layer 第一次渲染完成后触发
   */
  onAllLayersRendered?: (ctx: CTX) => void;
  /**
   * 画布销毁阶段
   */
  onDispose?: (ctx: CTX) => void;
  /**
   * 插件扩展
   * @param ctx
   */
  plugins?: (ctx: CTX) => Plugin[];
  /**
   * 注册 layer
   */
  layers?: LayerRegistry[];
  /**
   * IOC 模块，用于更底层的插件扩展
   */
  containerModules?: interfaces.ContainerModule[];

  children?: React.ReactNode;
  /**
   * 父 IOC 容器
   */
  parentContainer?: interfaces.Container;
}
