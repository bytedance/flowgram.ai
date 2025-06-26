import { injectable } from 'inversify';

export interface BackgroundConfig {
  /** 网格大小 */
  gridSize?: number;
  /** 点颜色 */
  dotColor?: string;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 网格透明度 */
  opacity?: number;
  /** 是否显示网格 */
  showGrid?: boolean;
}

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  gridSize: 20,
  dotColor: '#eceeef',
  backgroundColor: '#ffffff',
  opacity: 1,
  showGrid: true,
};

/**
 * Background Config Service
 * 使用 inversify 单例服务管理背景配置，避免多画布实例污染
 */
@injectable()
export class BackgroundConfigService {
  private config: BackgroundConfig = DEFAULT_BACKGROUND_CONFIG;

  /**
   * 设置背景配置
   */
  public setConfig(config: BackgroundConfig): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取背景配置
   */
  public getConfig(): BackgroundConfig {
    return { ...this.config };
  }

  /**
   * 获取特定配置值
   */
  public getConfigValue<K extends keyof BackgroundConfig>(
    key: K,
    fallback?: BackgroundConfig[K]
  ): BackgroundConfig[K] {
    const value = this.config[key];
    return value !== undefined ? value : fallback ?? DEFAULT_BACKGROUND_CONFIG[key];
  }

  /**
   * 重置为默认配置
   */
  public resetToDefault(): void {
    this.config = { ...DEFAULT_BACKGROUND_CONFIG };
  }
}
