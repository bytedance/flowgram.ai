/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { PluginContext } from '@flowgram.ai/core';

import type { PanelFactory, PanelConfig } from '../types';
import { ResizeBar } from '../components/resize-bar';
import type { PanelLayerProps } from '../components/panel-layer';

export interface PanelManagerConfig {
  factories: PanelFactory<any>[];
  left: PanelConfig;
  right: PanelConfig;
  bottom: PanelConfig;
  dockedLeft: PanelConfig;
  dockedRight: PanelConfig;
  dockedBottom: PanelConfig;
  /** Resizable, and multi-panel options mutually exclusive */
  autoResize: boolean;
  layerProps: PanelLayerProps;
  resizeBarRender: ({
    size,
  }: {
    size: number;
    direction?: 'vertical' | 'horizontal';
    reverse?: boolean;
    position?: 'left' | 'right';
    onResize: (size: number) => void;
  }) => React.ReactNode;
  getPopupContainer: (ctx: PluginContext) => HTMLElement; // default playground.node.parentElement
}

export const PanelManagerConfig = Symbol('PanelManagerConfig');

export const defineConfig = (config: Partial<PanelManagerConfig>) => {
  const defaultConfig: PanelManagerConfig = {
    left: {
      max: 1,
    },
    right: {
      max: 1,
    },
    bottom: {
      max: 1,
    },
    dockedLeft: {
      max: 1,
    },
    dockedRight: {
      max: 1,
    },
    dockedBottom: {
      max: 1,
    },
    factories: [],
    autoResize: true,
    layerProps: {},
    resizeBarRender: ResizeBar,
    getPopupContainer: (ctx: PluginContext) => ctx.playground.node.parentNode as HTMLElement,
  };
  return {
    ...defaultConfig,
    ...config,
  };
};
