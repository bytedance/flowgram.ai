import React, { createContext, useContext, ReactNode } from 'react';

import { BackgroundLayerOptions } from './background-layer';

/**
 * 背景配置上下文
 * 用于在应用中共享背景配置，特别是为子画布背景提供一致的样式
 */
export const BackgroundConfigContext = createContext<BackgroundLayerOptions | null>(null);

/**
 * 背景配置提供者的属性
 */
export interface BackgroundProviderProps {
  /** 背景配置选项 */
  config: BackgroundLayerOptions;
  /** 子组件 */
  children: ReactNode;
}

/**
 * 背景配置提供者组件
 *
 * @example
 * ```tsx
 * <BackgroundProvider config={backgroundConfig}>
 *   <YourEditorComponent />
 * </BackgroundProvider>
 * ```
 */
export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ config, children }) => (
  <BackgroundConfigContext.Provider value={config}>{children}</BackgroundConfigContext.Provider>
);

/**
 * 使用背景配置的 Hook
 *
 * @returns 当前的背景配置选项，如果未找到配置则返回 null
 *
 * @example
 * ```tsx
 * const SubCanvasBackground = () => {
 *   const backgroundConfig = useBackgroundConfig();
 *   const gridSize = backgroundConfig?.gridSize ?? 20;
 *   // ...
 * };
 * ```
 */
export const useBackgroundConfig = (): BackgroundLayerOptions | null =>
  useContext(BackgroundConfigContext);

/**
 * 获取背景配置值的工具函数
 * 提供默认值和类型安全的配置访问
 */
export const getBackgroundConfigValue = <T extends unknown>(
  config: BackgroundLayerOptions | null,
  key: keyof BackgroundLayerOptions,
  defaultValue: T
): T => {
  if (!config || config[key] === undefined) {
    return defaultValue;
  }
  return config[key] as T;
};

/**
 * 背景配置的默认值常量
 */
export const DEFAULT_BACKGROUND_CONFIG = {
  gridSize: 20,
  dotSize: 1,
  dotColor: '#eceeef',
  dotOpacity: 0.5,
  backgroundColor: 'transparent',
} as const;
