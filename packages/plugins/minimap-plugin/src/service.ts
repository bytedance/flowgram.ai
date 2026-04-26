/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { throttle } from 'lodash-es';
import { inject, injectable } from 'inversify';
import { Disposable, DisposableCollection, IPoint, Rectangle } from '@flowgram.ai/utils';
import { FlowNodeTransformData } from '@flowgram.ai/document';
import { FlowNodeBaseType } from '@flowgram.ai/document';
import { FlowDocument } from '@flowgram.ai/document';
import { MouseTouchEvent, PlaygroundConfigEntity } from '@flowgram.ai/core';

import type { MinimapRenderContext, MinimapServiceOptions, MinimapCanvasStyle } from './type';
import { MinimapDraw } from './draw';
import { MinimapDefaultCanvasStyle, MinimapDefaultOptions } from './constant';

@injectable()
export class FlowMinimapService {
  @inject(FlowDocument) private readonly document: FlowDocument;

  @inject(PlaygroundConfigEntity)
  private readonly playgroundConfig: PlaygroundConfigEntity;

  public readonly canvas: HTMLCanvasElement;

  public readonly context2D: CanvasRenderingContext2D;

  public activated;

  private onActiveCallbacks: Set<(activated: boolean) => void>;

  private options: MinimapServiceOptions;

  private toDispose: DisposableCollection;

  private initialized;

  private visible: boolean = false;

  private isDragging;

  private style: MinimapCanvasStyle;

  private dragStart?: IPoint;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.context2D = this.canvas.getContext('2d')!;
    this.initialized = !!this.context2D;
    this.onActiveCallbacks = new Set();
    this.toDispose = new DisposableCollection();
    this.render = this._render;
    this.activated = false;
    this.isDragging = false;
  }

  public init(options?: Partial<MinimapServiceOptions>) {
    this.options = MinimapDefaultOptions;
    Object.assign(this.options, options);
    this.setThrottle(this.options.inactiveThrottleTime);
    this.initStyle();
  }

  public dispose(): void {
    this.toDispose.dispose();
    this.initialized = false;
    this.activated = false;
    this.removeEventListeners();
  }

  setVisible(visible: boolean) {
    this.visible = visible;
  }

  public setActivate(activate: boolean): void {
    if (activate === this.activated) {
      return;
    }
    if (!activate && this.isDragging) {
      // 拖拽时持续激活
      return;
    }
    this.activated = activate;
    if (activate) {
      this.setThrottle(this.options.activeThrottleTime);
      this.addEventListeners();
    } else {
      this.setThrottle(this.options.inactiveThrottleTime);
      this.removeEventListeners();
    }
    this.render();
    this.onActiveCallbacks.forEach((callback) => callback(activate));
  }

  public onActive = (callback: (activated: boolean) => void): Disposable => {
    this.onActiveCallbacks.add(callback);
    return {
      dispose: () => {
        this.onActiveCallbacks.delete(callback);
      },
    };
  };

  private initStyle() {
    if (!this.initialized) {
      return;
    }
    const { canvasClassName, canvasStyle } = this.options;
    this.canvas.className = canvasClassName;
    this.style = {
      ...MinimapDefaultCanvasStyle,
      ...canvasStyle,
    };
    this.canvas.width = this.style.canvasWidth;
    this.canvas.height = this.style.canvasHeight;
    this.canvas.style.borderRadius = this.style.canvasBorderRadius
      ? `${this.style.canvasBorderRadius}px`
      : 'unset';
  }

  private setThrottle(throttleTime: number) {
    this.render = throttle(this._render, throttleTime);
  }

  /**
   * 触发渲染
   */
  public render: () => void = this._render;

  private _render(): void {
    if (!this.initialized || !this.visible) {
      return;
    }
    const renderContext = this.createRenderContext();
    this.renderCanvas(renderContext);
  }

  private createRenderContext(): MinimapRenderContext {
    const { canvas, context2D } = this;
    const nodeTransforms: FlowNodeTransformData[] = this.transformVisibles;
    const nodeRects: Rectangle[] = nodeTransforms.map((transform) => transform.bounds);
    const viewRect: Rectangle = this.viewRect();
    const renderRect: Rectangle = this.renderRect(nodeRects).withPadding({
      top: this.style.canvasPadding,
      bottom: this.style.canvasPadding,
      left: this.style.canvasPadding,
      right: this.style.canvasPadding,
    });
    const canvasRect: Rectangle = Rectangle.enlarge([viewRect, renderRect]);

    const { scale, offset } = this.calculateScaleAndOffset({ canvasRect });

    return {
      canvas,
      context2D,
      nodeRects,
      canvasRect,
      viewRect,
      renderRect,
      scale,
      offset,
    };
  }

  private renderCanvas(renderContext: MinimapRenderContext) {
    const { canvas, context2D, nodeRects, viewRect, scale, offset } = renderContext;

    // 清空画布
    MinimapDraw.clear({ canvas, context: context2D });

    // 设置背景色
    MinimapDraw.backgroundColor({
      canvas,
      context: context2D,
      color: this.style.canvasBackground,
    });

    // 绘制视窗
    MinimapDraw.roundRectangle({
      context: context2D,
      rect: this.rectOnCanvas({ rect: viewRect, scale, offset }),
      color: this.style.viewportBackground,
      radius: this.style.viewportBorderRadius as number,
    });

    // 绘制节点
    nodeRects.forEach((nodeRect: Rectangle) => {
      MinimapDraw.roundRectangle({
        context: context2D,
        rect: this.rectOnCanvas({ rect: nodeRect, scale, offset }),
        color: this.style.nodeColor as string,
        radius: this.style.nodeBorderRadius as number,
        borderWidth: this.style.nodeBorderWidth as number,
        borderColor: this.style.nodeBorderColor as string,
      });
    });

    // 绘制视窗边框
    MinimapDraw.roundRectangle({
      context: context2D,
      rect: this.rectOnCanvas({ rect: viewRect, scale, offset }),
      color: 'rgba(255, 255, 255, 0)' as string,
      radius: this.style.viewportBorderRadius as number,
      borderColor: this.style.viewportBorderColor as string,
      borderWidth: this.style.viewportBorderWidth as number,
      borderDashLength: this.style.viewportBorderDashLength as number,
    });

    // 绘制视窗外的蒙层
    MinimapDraw.overlay({
      canvas,
      context: context2D,
      offset,
      scale,
      rect: viewRect,
      color: this.style.overlayColor as string,
    });
  }

  private calculateScaleAndOffset(params: { canvasRect: Rectangle }): {
    scale: number;
    offset: IPoint;
  } {
    const { canvasRect } = params;
    const { width: canvasWidth, height: canvasHeight } = this.canvas;

    // 计算缩放比例
    const scaleX = canvasWidth / canvasRect.width;
    const scaleY = canvasHeight / canvasRect.height;
    const scale = Math.min(scaleX, scaleY);

    // 计算缩放后的渲染区域尺寸
    const scaledWidth = canvasRect.width * scale;
    const scaledHeight = canvasRect.height * scale;

    // 计算居中偏移量
    const centerOffsetX = (canvasWidth - scaledWidth) / 2;
    const centerOffsetY = (canvasHeight - scaledHeight) / 2;

    // 计算最终偏移量
    const offset = {
      x: centerOffsetX / scale - canvasRect.x,
      y: centerOffsetY / scale - canvasRect.y,
    };

    return { scale, offset };
  }

  private get transformVisibles(): FlowNodeTransformData[] {
    const transformVisible = this.document.getRenderDatas<FlowNodeTransformData>(
      FlowNodeTransformData,
      false
    );
    return transformVisible.filter((transform) => {
      const node = transform.entity;
      // 去除不可见节点
      if (node.hidden) return false;
      // 去除根节点
      if (node.flowNodeType === FlowNodeBaseType.ROOT) return false;
      // 去除非一级节点
      if (
        !this.options.enableDisplayAllNodes &&
        node.parent &&
        node.parent.flowNodeType !== FlowNodeBaseType.ROOT
      )
        return false;
      return true;
    });
  }

  private renderRect(rects: Rectangle[]): Rectangle {
    return Rectangle.enlarge(rects);
  }

  private viewRect(): Rectangle {
    const { width, height, scrollX, scrollY, zoom } = this.playgroundConfig.config;
    return new Rectangle(scrollX / zoom, scrollY / zoom, width / zoom, height / zoom);
  }

  /** 计算画布坐标系下的矩形 */
  private rectOnCanvas(params: { rect: Rectangle; scale: number; offset: IPoint }): Rectangle {
    const { rect, scale, offset } = params;
    return new Rectangle(
      (rect.x + offset.x) * scale,
      (rect.y + offset.y) * scale,
      rect.width * scale,
      rect.height * scale
    );
  }

  private isPointInRect(params: { point: IPoint; rect: Rectangle }): boolean {
    const { point, rect } = params;
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    );
  }

  private addEventListeners(): void {
    this.canvas.addEventListener('wheel', this.handleWheel);
    this.canvas.addEventListener('mousedown', this.handleStartDrag);
    this.canvas.addEventListener('touchstart', this.handleStartDrag, { passive: false });
    this.canvas.addEventListener('mousemove', this.handleCursor);
  }

  private removeEventListeners(): void {
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('mousedown', this.handleStartDrag);
    this.canvas.removeEventListener('touchstart', this.handleStartDrag);
    this.canvas.removeEventListener('mousemove', this.handleCursor);
  }

  private handleWheel = (event: WheelEvent): void => {};

  private handleStartDrag = (event: MouseEvent | TouchEvent): void => {
    MouseTouchEvent.preventDefault(event);
    event.stopPropagation();
    const renderContext = this.createRenderContext();
    const { viewRect, scale, offset } = renderContext;
    const canvasRect = this.canvas.getBoundingClientRect();
    const { clientX, clientY } = MouseTouchEvent.getEventCoord(event);
    const mousePoint: IPoint = {
      x: clientX - canvasRect.left,
      y: clientY - canvasRect.top,
    };

    const viewRectOnCanvas = this.rectOnCanvas({
      rect: viewRect,
      scale,
      offset,
    });
    if (!this.isPointInRect({ point: mousePoint, rect: viewRectOnCanvas })) {
      return;
    }
    this.isDragging = true;
    this.dragStart = mousePoint;
    // click
    document.addEventListener('mousemove', this.handleDragging);
    document.addEventListener('mouseup', this.handleEndDrag);
    // touch
    document.addEventListener('touchmove', this.handleDragging, { passive: false });
    document.addEventListener('touchend', this.handleEndDrag);
    document.addEventListener('touchcancel', this.handleEndDrag);
  };

  private handleDragging = (event: MouseEvent | TouchEvent): void => {
    if (!this.isDragging || !this.dragStart) return;
    MouseTouchEvent.preventDefault(event);
    event.stopPropagation();

    const renderContext = this.createRenderContext();
    const { scale } = renderContext;
    const canvasRect = this.canvas.getBoundingClientRect();
    const { clientX, clientY } = MouseTouchEvent.getEventCoord(event);
    const mouseX = clientX - canvasRect.left;
    const mouseY = clientY - canvasRect.top;

    const deltaX = (mouseX - this.dragStart.x) / scale;
    const deltaY = (mouseY - this.dragStart.y) / scale;

    this.updateScrollPosition(deltaX, deltaY);

    this.dragStart = { x: mouseX, y: mouseY };
    this.render();
  };

  private handleEndDrag = (event: MouseEvent | TouchEvent): void => {
    MouseTouchEvent.preventDefault(event);
    event.stopPropagation();
    // click
    document.removeEventListener('mousemove', this.handleDragging);
    document.removeEventListener('mouseup', this.handleEndDrag);
    // touch
    document.removeEventListener('touchmove', this.handleDragging);
    document.removeEventListener('touchend', this.handleEndDrag);
    document.removeEventListener('touchcancel', this.handleEndDrag);
    this.isDragging = false;
    this.dragStart = undefined;
    this.setActivate(this.isMouseInCanvas(event));
  };

  private handleCursor = (event: MouseEvent): void => {
    if (!this.activated) return;

    const renderContext = this.createRenderContext();
    const { viewRect, scale, offset } = renderContext;
    const canvasRect = this.canvas.getBoundingClientRect();
    const mousePoint: IPoint = {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    };

    const viewRectOnCanvas = this.rectOnCanvas({
      rect: viewRect,
      scale,
      offset,
    });

    if (this.isPointInRect({ point: mousePoint, rect: viewRectOnCanvas })) {
      // 鼠标在视窗框内
      this.canvas.style.cursor = 'grab';
    } else {
      // 鼠标在视窗框外但在画布内
      this.canvas.style.cursor = 'default';
    }
  };

  private isMouseInCanvas(event: MouseEvent | TouchEvent): boolean {
    const canvasRect = this.canvas.getBoundingClientRect();
    const { clientX, clientY } = MouseTouchEvent.getEventCoord(event);
    return (
      clientX >= canvasRect.left &&
      clientX <= canvasRect.right &&
      clientY >= canvasRect.top &&
      clientY <= canvasRect.bottom
    );
  }

  private updateScrollPosition(deltaX: number, deltaY: number): void {
    const { scrollX, scrollY, zoom } = this.playgroundConfig.config;
    this.playgroundConfig.updateConfig({
      scrollX: scrollX + deltaX * zoom,
      scrollY: scrollY + deltaY * zoom,
    });
  }
}
