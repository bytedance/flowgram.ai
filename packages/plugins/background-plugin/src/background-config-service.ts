export interface BackgroundConfig {
  /** 网格大小 */
  gridSize?: number;
  /** 点的大小 */
  dotSize?: number;
  /** 点颜色 */
  dotColor?: string;
  /** 点透明度 */
  dotOpacity?: number;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 点的填充颜色 */
  dotFillColor?: string;
  /** 网格透明度（兼容字段） */
  opacity?: number;
  /** 是否显示网格（兼容字段） */
  showGrid?: boolean;
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  gridSize: 20,
  dotSize: 1,
  dotColor: '#eceeef',
  dotOpacity: 0.5,
  backgroundColor: 'transparent',
  dotFillColor: undefined, // 将使用 dotColor
  opacity: 0.5,
  showGrid: true,
};

/**
 * Background Config Symbol
 * 用于依赖注入的 token
 */
export const BackgroundConfig = Symbol('BackgroundConfig');
