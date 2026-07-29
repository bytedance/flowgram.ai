/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { domUtils, Rectangle } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowDocumentTransformerEntity,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import { Layer, observeEntity, ViewportCullingService } from '@flowgram.ai/core';

export interface OffscreenCompositeLayerOptions {
  enabled?: boolean;
  zoomThreshold?: number;
  tileSize?: number;
}

/**
 * OffscreenCanvas compositing layer for rendering static node placeholders
 * when zoomed out below a threshold. This avoids mounting full React trees
 * for small, non-interactive nodes.
 */
@injectable()
export class FlowOffscreenCompositeLayer extends Layer<OffscreenCompositeLayerOptions> {
  @inject(FlowDocument) readonly flowDocument: FlowDocument;

  @inject(ViewportCullingService)
  readonly cullingService: ViewportCullingService;

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  node = domUtils.createDivWithClass('gedit-flow-offscreen-composite-layer');

  private _canvas: HTMLCanvasElement | undefined;

  private _ctx: CanvasRenderingContext2D | undefined;

  private _enabled = false;

  private _zoomThreshold = 0.4;

  private _active = false;

  onReady(): void {
    this._enabled = this.options.enabled !== false && typeof OffscreenCanvas !== 'undefined';
    this._zoomThreshold = this.options.zoomThreshold ?? 0.4;

    if (this._enabled) {
      this._canvas = document.createElement('canvas');
      this._canvas.style.position = 'absolute';
      this._canvas.style.top = '0';
      this._canvas.style.left = '0';
      this._canvas.style.pointerEvents = 'none';
      this._canvas.style.display = 'none';
      this.node.style.zIndex = '5';
      this.node.appendChild(this._canvas);
      this._ctx = this._canvas.getContext('2d')!;
    }
  }

  onZoom(zoom: number): void {
    if (!this._enabled) return;
    const shouldActivate = zoom < this._zoomThreshold;
    if (shouldActivate !== this._active) {
      this._active = shouldActivate;
      this._canvas!.style.display = shouldActivate ? 'block' : 'none';
      if (shouldActivate) {
        this._renderAll();
      }
    }
    if (this._active) {
      this._updateCanvasTransform();
    }
  }

  onScroll(): void {
    if (this._active) {
      this._updateCanvasTransform();
    }
  }

  onViewportChange(): void {
    if (this._active) {
      this._renderAll();
    }
  }

  get isActive(): boolean {
    return this._active;
  }

  autorun(): void {
    if (!this._active || !this._enabled) return;
    if (this.documentTransformer.loading) return;
    this._renderAll();
  }

  private _updateCanvasTransform(): void {
    if (!this._canvas) return;
    const { config } = this;
    const zoom = config.finalScale;
    this._canvas.style.transform = `scale(${zoom})`;
    this._canvas.style.transformOrigin = '0 0';
  }

  private _renderAll(): void {
    if (!this._canvas || !this._ctx) return;
    const { config } = this;
    const viewport = config.getViewport(true);

    // Size canvas to cover viewport in world coordinates
    const canvasWidth = Math.ceil(viewport.width);
    const canvasHeight = Math.ceil(viewport.height);

    if (this._canvas.width !== canvasWidth || this._canvas.height !== canvasHeight) {
      this._canvas.width = canvasWidth;
      this._canvas.height = canvasHeight;
    }

    const ctx = this._ctx;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Translate so that viewport origin maps to canvas origin
    ctx.save();
    ctx.translate(-viewport.x, -viewport.y);

    // Render all visible nodes as simple rectangles with color coding
    const transforms = this.flowDocument.getRenderDatas<FlowNodeTransformData>(
      FlowNodeTransformData,
      false
    );

    for (const transform of transforms) {
      const bounds = transform.bounds;
      if (!Rectangle.intersects(bounds, viewport)) continue;

      const renderData = transform.renderState;
      // Draw node placeholder
      if (renderData.activated) {
        ctx.fillStyle = 'rgba(64, 150, 255, 0.6)';
      } else if (renderData.hovered) {
        ctx.fillStyle = 'rgba(64, 150, 255, 0.3)';
      } else {
        ctx.fillStyle = 'rgba(240, 242, 245, 0.9)';
      }

      const radius = Math.min(6, bounds.width * 0.05, bounds.height * 0.05);
      this._roundRect(ctx, bounds.x, bounds.y, bounds.width, bounds.height, radius);
      ctx.fill();

      // Draw border
      ctx.strokeStyle = 'rgba(200, 205, 212, 0.8)';
      ctx.lineWidth = 1;
      this._roundRect(ctx, bounds.x, bounds.y, bounds.width, bounds.height, radius);
      ctx.stroke();

      // Draw a simple content indicator (small inner rect)
      if (bounds.width > 30 && bounds.height > 20) {
        ctx.fillStyle = 'rgba(180, 185, 192, 0.5)';
        const innerPad = 6;
        const innerW = Math.min(bounds.width - innerPad * 2, 60);
        const innerH = 4;
        ctx.fillRect(
          bounds.x + innerPad,
          bounds.y + bounds.height / 2 - innerH / 2,
          innerW,
          innerH
        );
      }
    }

    ctx.restore();
  }

  private _roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  dispose(): void {
    if (this._canvas) {
      this._canvas.remove();
    }
    super.dispose();
  }
}
