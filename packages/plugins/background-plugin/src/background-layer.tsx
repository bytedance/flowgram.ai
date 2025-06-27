import { domUtils } from '@flowgram.ai/utils';
import { Layer, observeEntity, PlaygroundConfigEntity, SCALE_WIDTH } from '@flowgram.ai/core';

interface BackgroundScaleUnit {
  realSize: number;
  renderSize: number;
  zoom: number;
}

const PATTERN_PREFIX = 'gedit-background-pattern-';
const DEFAULT_RENDER_SIZE = 20;
const DEFAULT_DOT_SIZE = 1;
let id = 0;

export const BackgroundConfig = Symbol('BackgroundConfig');
export interface BackgroundLayerOptions {
  /** 网格间距，默认 20px */
  gridSize?: number;
  /** 点的大小，默认 1px */
  dotSize?: number;
  /** 点的颜色，默认 "#eceeef" */
  dotColor?: string;
  /** 点的透明度，默认 0.5 */
  dotOpacity?: number;
  /** 背景颜色，默认透明 */
  backgroundColor?: string;
  /** 点的填充颜色，默认与stroke颜色相同 */
  dotFillColor?: string;
  /** Logo 配置 */
  logo?: {
    /** Logo 文本内容 */
    text?: string;
    /** Logo 图片 URL */
    imageUrl?: string;
    /** Logo 位置，默认 'center' */
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** Logo 大小，默认 'medium' */
    size?: 'small' | 'medium' | 'large' | number;
    /** Logo 透明度，默认 0.1 */
    opacity?: number;
    /** Logo 颜色（仅文本），默认 "#cccccc" */
    color?: string;
    /** Logo 字体大小（仅文本），默认根据 size 计算 */
    fontSize?: number;
    /** Logo 字体家族（仅文本），默认 'Arial, sans-serif' */
    fontFamily?: string;
    /** Logo 字体粗细（仅文本），默认 'normal' */
    fontWeight?: 'normal' | 'bold' | 'lighter' | number;
    /** 自定义偏移 */
    offset?: { x: number; y: number };
    /** 新拟态（Neumorphism）效果配置 */
    neumorphism?: {
      /** 是否启用新拟态效果，默认 false */
      enabled?: boolean;
      /** 主要文字颜色，应该与背景色接近，默认自动计算 */
      textColor?: string;
      /** 亮色阴影颜色，默认自动计算（背景色的亮色版本） */
      lightShadowColor?: string;
      /** 暗色阴影颜色，默认自动计算（背景色的暗色版本） */
      darkShadowColor?: string;
      /** 阴影偏移距离，默认 6 */
      shadowOffset?: number;
      /** 阴影模糊半径，默认 12 */
      shadowBlur?: number;
      /** 效果强度（0-1），影响阴影的透明度，默认 0.3 */
      intensity?: number;
      /** 凸起效果（true）还是凹陷效果（false），默认 true */
      raised?: boolean;
    };
  };
}

/**
 * dot 网格背景
 */
export class BackgroundLayer extends Layer<BackgroundLayerOptions> {
  static type = 'WorkflowBackgroundLayer';

  @observeEntity(PlaygroundConfigEntity)
  protected playgroundConfigEntity: PlaygroundConfigEntity;

  private _patternId = `${PATTERN_PREFIX}${id++}`;

  node = domUtils.createDivWithClass('gedit-flow-background-layer');

  grid: HTMLElement = document.createElement('div');

  /**
   * 获取网格大小配置
   */
  private get gridSize(): number {
    return this.options.gridSize ?? DEFAULT_RENDER_SIZE;
  }

  /**
   * 获取点大小配置
   */
  private get dotSize(): number {
    return this.options.dotSize ?? DEFAULT_DOT_SIZE;
  }

  /**
   * 获取点颜色配置
   */
  private get dotColor(): string {
    return this.options.dotColor ?? '#eceeef';
  }

  /**
   * 获取点透明度配置
   */
  private get dotOpacity(): number {
    return this.options.dotOpacity ?? 0.5;
  }

  /**
   * 获取背景颜色配置
   */
  private get backgroundColor(): string {
    return this.options.backgroundColor ?? 'transparent';
  }

  /**
   * 获取点填充颜色配置
   */
  private get dotFillColor(): string {
    return this.options.dotFillColor ?? this.dotColor;
  }

  /**
   * 获取Logo配置
   */
  private get logoConfig() {
    return this.options.logo;
  }

  /**
   * 当前缩放比
   */
  get zoom(): number {
    return this.config.finalScale;
  }

  onReady() {
    const { firstChild } = this.pipelineNode;
    // 背景插入到最下边
    this.pipelineNode.insertBefore(this.node, firstChild);
    // 初始化设置最大 200% 最小 10% 缩放
    this.playgroundConfigEntity.updateConfig({
      minZoom: 0.1,
      maxZoom: 2,
    });
    // 确保点的位置在线条的下方
    this.grid.style.zIndex = '-1';
    this.grid.style.position = 'relative';
    this.node.appendChild(this.grid);
    this.grid.className = 'gedit-grid-svg';

    // 设置背景颜色
    if (this.backgroundColor !== 'transparent') {
      this.node.style.backgroundColor = this.backgroundColor;
    }
  }

  /**
   * 最小单元格大小
   */
  getScaleUnit(): BackgroundScaleUnit {
    const { zoom } = this;

    return {
      realSize: this.gridSize, // 使用配置的网格大小
      renderSize: Math.round(this.gridSize * zoom * 100) / 100, // 一个单元格渲染的大小值
      zoom, // 缩放比
    };
  }

  /**
   * 绘制
   */
  autorun(): void {
    const playgroundConfig = this.playgroundConfigEntity.config;
    const scaleUnit = this.getScaleUnit();
    const mod = scaleUnit.renderSize * 10;
    const viewBoxWidth = playgroundConfig.width + mod * 2;
    const viewBoxHeight = playgroundConfig.height + mod * 2;
    const { scrollX } = playgroundConfig;
    const { scrollY } = playgroundConfig;
    const scrollXDelta = this.getScrollDelta(scrollX, mod);
    const scrollYDelta = this.getScrollDelta(scrollY, mod);
    domUtils.setStyle(this.node, {
      left: scrollX - SCALE_WIDTH,
      top: scrollY - SCALE_WIDTH,
    });
    this.drawGrid(scaleUnit, viewBoxWidth, viewBoxHeight);
    // 设置网格
    this.setSVGStyle(this.grid, {
      width: viewBoxWidth,
      height: viewBoxHeight,
      left: SCALE_WIDTH - scrollXDelta - mod,
      top: SCALE_WIDTH - scrollYDelta - mod,
    });
  }

  /**
   * 计算Logo位置
   */
  private calculateLogoPosition(
    viewBoxWidth: number,
    viewBoxHeight: number
  ): { x: number; y: number } {
    if (!this.logoConfig) return { x: 0, y: 0 };

    const { position = 'center', offset = { x: 0, y: 0 } } = this.logoConfig;
    const playgroundConfig = this.playgroundConfigEntity.config;
    const scaleUnit = this.getScaleUnit();
    const mod = scaleUnit.renderSize * 10;

    // 计算SVG内的相对位置，使Logo相对于可视区域固定
    const { scrollX, scrollY } = playgroundConfig;
    const scrollXDelta = this.getScrollDelta(scrollX, mod);
    const scrollYDelta = this.getScrollDelta(scrollY, mod);

    // 可视区域的基准点（相对于SVG坐标系）
    const visibleLeft = mod + scrollXDelta;
    const visibleTop = mod + scrollYDelta;
    const visibleCenterX = visibleLeft + playgroundConfig.width / 2;
    const visibleCenterY = visibleTop + playgroundConfig.height / 2;

    let x = 0,
      y = 0;

    switch (position) {
      case 'center':
        x = visibleCenterX;
        y = visibleCenterY;
        break;
      case 'top-left':
        x = visibleLeft + 100;
        y = visibleTop + 100;
        break;
      case 'top-right':
        x = visibleLeft + playgroundConfig.width - 100;
        y = visibleTop + 100;
        break;
      case 'bottom-left':
        x = visibleLeft + 100;
        y = visibleTop + playgroundConfig.height - 100;
        break;
      case 'bottom-right':
        x = visibleLeft + playgroundConfig.width - 100;
        y = visibleTop + playgroundConfig.height - 100;
        break;
    }

    return { x: x + offset.x, y: y + offset.y };
  }

  /**
   * 获取Logo大小
   */
  private getLogoSize(): number {
    if (!this.logoConfig) return 0;

    const { size = 'medium' } = this.logoConfig;

    if (typeof size === 'number') {
      return size;
    }

    switch (size) {
      case 'small':
        return 24;
      case 'medium':
        return 48;
      case 'large':
        return 72;
      default:
        return 48;
    }
  }

  /**
   * 颜色工具函数：将十六进制颜色转换为RGB
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  /**
   * 颜色工具函数：调整颜色亮度
   */
  private adjustBrightness(hex: string, percent: number): string {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;

    const adjust = (value: number) => {
      const adjusted = Math.round(value + (255 - value) * percent);
      return Math.max(0, Math.min(255, adjusted));
    };

    return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g)
      .toString(16)
      .padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
  }

  /**
   * 生成新拟态阴影滤镜
   */
  private generateNeumorphismFilter(
    filterId: string,
    lightShadow: string,
    darkShadow: string,
    offset: number,
    blur: number,
    intensity: number,
    raised: boolean
  ): string {
    const lightOffset = raised ? -offset : offset;
    const darkOffset = raised ? offset : -offset;

    return `
      <defs>
        <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="${lightOffset}" dy="${lightOffset}" stdDeviation="${blur}" flood-color="${lightShadow}" flood-opacity="${intensity}"/>
          <feDropShadow dx="${darkOffset}" dy="${darkOffset}" stdDeviation="${blur}" flood-color="${darkShadow}" flood-opacity="${intensity}"/>
        </filter>
      </defs>`;
  }

  /**
   * 绘制Logo SVG内容
   */
  private generateLogoSVG(viewBoxWidth: number, viewBoxHeight: number): string {
    if (!this.logoConfig) return '';

    const {
      text,
      imageUrl,
      opacity = 0.1,
      color = '#cccccc',
      fontSize,
      fontFamily = 'Arial, sans-serif',
      fontWeight = 'normal',
      neumorphism,
    } = this.logoConfig;
    const position = this.calculateLogoPosition(viewBoxWidth, viewBoxHeight);
    const logoSize = this.getLogoSize();

    let logoSVG = '';

    if (imageUrl) {
      // 图片Logo（暂不支持3D效果）
      logoSVG = `
        <image
          href="${imageUrl}"
          x="${position.x - logoSize / 2}"
          y="${position.y - logoSize / 2}"
          width="${logoSize}"
          height="${logoSize}"
          opacity="${opacity}"
        />`;
    } else if (text) {
      // 文本Logo
      const actualFontSize = fontSize ?? Math.max(logoSize / 2, 12);

      // 检查是否启用新拟态效果
      if (neumorphism?.enabled) {
        const {
          textColor,
          lightShadowColor,
          darkShadowColor,
          shadowOffset = 6,
          shadowBlur = 12,
          intensity = 0.3,
          raised = true,
        } = neumorphism;

        // 自动计算颜色（如果未提供）
        const bgColor = this.backgroundColor !== 'transparent' ? this.backgroundColor : '#f0f0f0';
        const finalTextColor = textColor || bgColor;
        const finalLightShadow = lightShadowColor || this.adjustBrightness(bgColor, 0.2);
        const finalDarkShadow = darkShadowColor || this.adjustBrightness(bgColor, -0.2);

        const filterId = `neumorphism-${this._patternId}`;

        // 添加新拟态滤镜定义
        logoSVG += this.generateNeumorphismFilter(
          filterId,
          finalLightShadow,
          finalDarkShadow,
          shadowOffset,
          shadowBlur,
          intensity,
          raised
        );

        // 创建新拟态文本
        logoSVG += `
          <text
            x="${position.x}"
            y="${position.y}"
            font-family="${fontFamily}"
            font-size="${actualFontSize}"
            font-weight="${fontWeight}"
            fill="${finalTextColor}"
            opacity="${opacity}"
            text-anchor="middle"
            dominant-baseline="middle"
            filter="url(#${filterId})"
          >${text}</text>`;
      } else {
        // 普通文本（无3D效果）
        logoSVG = `
          <text
            x="${position.x}"
            y="${position.y}"
            font-family="${fontFamily}"
            font-size="${actualFontSize}"
            font-weight="${fontWeight}"
            fill="${color}"
            opacity="${opacity}"
            text-anchor="middle"
            dominant-baseline="middle"
          >${text}</text>`;
      }
    }

    return logoSVG;
  }

  /**
   * 绘制网格
   */
  protected drawGrid(unit: BackgroundScaleUnit, viewBoxWidth: number, viewBoxHeight: number): void {
    const minor = unit.renderSize;
    if (!this.grid) {
      return;
    }
    const patternSize = this.dotSize * this.zoom;

    // 构建SVG内容，根据是否有背景颜色决定是否添加背景矩形
    let svgContent = `<svg width="100%" height="100%">`;

    // 如果设置了背景颜色，先绘制背景矩形
    if (this.backgroundColor !== 'transparent') {
      svgContent += `<rect width="100%" height="100%" fill="${this.backgroundColor}"/>`;
    }

    // 添加点阵图案
    // 构建圆圈属性，保持与原始实现的兼容性
    const circleAttributes = [
      `cx="${patternSize}"`,
      `cy="${patternSize}"`,
      `r="${patternSize}"`,
      `stroke="${this.dotColor}"`,
      // 只有当 dotFillColor 被明确设置且与 dotColor 不同时才添加 fill 属性
      this.options.dotFillColor && this.dotFillColor !== this.dotColor
        ? `fill="${this.dotFillColor}"`
        : '',
      `fill-opacity="${this.dotOpacity}"`,
    ]
      .filter(Boolean)
      .join(' ');

    svgContent += `
      <pattern id="${this._patternId}" width="${minor}" height="${minor}" patternUnits="userSpaceOnUse">
        <circle ${circleAttributes} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#${this._patternId})"/>`;

    // 添加Logo
    const logoSVG = this.generateLogoSVG(viewBoxWidth, viewBoxHeight);
    if (logoSVG) {
      svgContent += logoSVG;
    }

    svgContent += `</svg>`;

    this.grid.innerHTML = svgContent;
  }

  protected setSVGStyle(
    svgElement: HTMLElement | undefined,
    style: { width: number; height: number; left: number; top: number }
  ): void {
    if (!svgElement) {
      return;
    }

    svgElement.style.width = `${style.width}px`;
    svgElement.style.height = `${style.height}px`;
    svgElement.style.left = `${style.left}px`;
    svgElement.style.top = `${style.top}px`;
  }

  /**
   * 获取相对滚动距离
   * @param realScroll
   * @param mod
   */
  protected getScrollDelta(realScroll: number, mod: number): number {
    // 正向滚动不用补差
    if (realScroll >= 0) {
      return realScroll % mod;
    }
    return mod - (Math.abs(realScroll) % mod);
  }
}
