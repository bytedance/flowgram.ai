/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export type Area = 'left' | 'right' | 'bottom' | 'docked-left' | 'docked-right' | 'docked-bottom';

export interface PanelConfig {
  /** max panel */
  max: number;
}

export interface PanelFactory<T extends any> {
  key: string;
  defaultSize: number;
  fullscreen?: boolean;
  maxSize?: number;
  minSize?: number;
  style?: React.CSSProperties;
  /** Allows multiple panels with the same key to be rendered simultaneously  */
  allowDuplicates?: boolean;
  resize?: boolean;
  keepDOM?: boolean;
  render: (props: T) => React.ReactNode;
}

export interface PanelEntityConfig<T extends any = any> {
  defaultSize?: number;
  fullscreen?: boolean;
  style?: React.CSSProperties;
  props?: T;
}
