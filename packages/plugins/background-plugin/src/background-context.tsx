import React, { createContext, useContext, type ReactNode } from 'react';

import type { BackgroundConfig } from './background-config-service';
import { DEFAULT_BACKGROUND_CONFIG } from './background-config-service';

/**
 * 背景配置上下文
 * 用于在应用中共享背景配置，特别是为子画布背景提供一致的样式
 */
export interface BackgroundContextValue {
  config: BackgroundConfig;
}

const BackgroundContext = createContext<BackgroundContextValue>({
  config: DEFAULT_BACKGROUND_CONFIG,
});

/**
 * 背景配置提供者的属性
 */
export interface BackgroundProviderProps {
  /** 背景配置选项 */
  config?: BackgroundConfig;
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
export function BackgroundProvider({
  config = DEFAULT_BACKGROUND_CONFIG,
  children,
}: BackgroundProviderProps) {
  const contextValue: BackgroundContextValue = {
    config: { ...DEFAULT_BACKGROUND_CONFIG, ...config },
  };

  return <BackgroundContext.Provider value={contextValue}>{children}</BackgroundContext.Provider>;
}

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
export function useBackgroundConfig(): BackgroundConfig {
  const context = useContext(BackgroundContext);
  return context.config;
}

/**
 * 获取背景配置值的工具函数
 * 提供默认值和类型安全的配置访问
 */
export function getBackgroundConfigValue<K extends keyof BackgroundConfig>(
  config: BackgroundConfig,
  key: K,
  fallback?: BackgroundConfig[K]
): BackgroundConfig[K] {
  const value = config[key];
  return value !== undefined ? value : fallback ?? DEFAULT_BACKGROUND_CONFIG[key];
}
