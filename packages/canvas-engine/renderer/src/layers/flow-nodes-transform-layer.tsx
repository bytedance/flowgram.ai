/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { Cache, type Disposable, domUtils } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowDocumentTransformerEntity,
  FlowNodeEntity,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import {
  Layer,
  observeEntity,
  observeEntityDatas,
  ViewportCullingService,
} from '@flowgram.ai/core';

import { FlowRendererResizeObserver } from '../flow-renderer-resize-observer';

interface TransformRenderCache {
  updateBounds(): void;
  attach(): void;
  detach(): void;
  attached: boolean;
}

export interface FlowNodesTransformLayerOptions {
  renderElement?: HTMLElement | (() => HTMLElement | undefined);
  enableViewportCulling?: boolean;
  preloadFactor?: number;
}

/**
 * Renders node positions with viewport-based DOM virtualization.
 * Nodes outside the viewport are detached from the DOM tree to reduce composite cost.
 */
@injectable()
export class FlowNodesTransformLayer extends Layer<FlowNodesTransformLayerOptions> {
  @inject(FlowDocument) readonly document: FlowDocument;

  @inject(FlowRendererResizeObserver)
  readonly resizeObserver: FlowRendererResizeObserver;

  @inject(ViewportCullingService)
  readonly cullingService: ViewportCullingService;

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  @observeEntityDatas(FlowNodeEntity, FlowNodeTransformData)
  _transforms: FlowNodeTransformData[];

  node = domUtils.createDivWithClass('gedit-flow-nodes-layer');

  private _cullingEnabled = true;

  private _cullingDispose: Disposable | undefined;

  get transformVisibles(): FlowNodeTransformData[] {
    return this.document.getRenderDatas<FlowNodeTransformData>(FlowNodeTransformData, false);
  }

  onZoom(scale: number) {
    this.node!.style.transform = `scale(${scale})`;
    this._scheduleCullingUpdate();
  }

  onScroll() {
    this._scheduleCullingUpdate();
  }

  onViewportChange() {
    this._scheduleCullingUpdate();
  }

  dispose(): void {
    this.renderCache.dispose();
    this._cullingDispose?.dispose();
    super.dispose();
  }

  protected renderCache = Cache.create<TransformRenderCache, FlowNodeTransformData>(
    (transform?: FlowNodeTransformData) => {
      const { renderState } = transform!;
      const { node } = renderState;
      const { entity } = transform!;
      node.id = entity.id;
      node.style.setProperty('content-visibility', 'auto');
      node.style.setProperty('contain', 'layout paint style');
      let resizeDispose: Disposable | undefined;
      let _attached = false;

      const attach = () => {
        if (_attached) return;
        _attached = true;
        this.renderElement.appendChild(node);
        if (!entity.getNodeMeta().autoResizeDisable) {
          resizeDispose = this.resizeObserver.observe(node, transform!);
        }
      };

      const detach = () => {
        if (!_attached) return;
        _attached = false;
        if (node.parentElement) {
          this.renderElement.removeChild(node);
        }
        if (resizeDispose) {
          resizeDispose.dispose();
          resizeDispose = undefined;
        }
      };

      const dispose = () => {
        detach();
      };

      // Initial attach only if visible or culling is disabled
      if (!this._cullingEnabled || this.cullingService.isVisible(entity.id)) {
        attach();
      }

      return {
        dispose,
        get attached() {
          return _attached;
        },
        attach,
        detach,
        updateBounds: () => {
          const { bounds } = transform!;
          const rawX: number = parseFloat(node.style.left);
          const rawY: number = parseFloat(node.style.top);
          if (!this.isCoordEqual(rawX, bounds.x) || !this.isCoordEqual(rawY, bounds.y)) {
            node.style.left = `${bounds.x}px`;
            node.style.top = `${bounds.y}px`;
          }
          const containIntrinsicSize = `${bounds.width}px ${bounds.height}px`;
          if (node.style.getPropertyValue('contain-intrinsic-size') !== containIntrinsicSize) {
            node.style.setProperty('contain-intrinsic-size', containIntrinsicSize);
          }
          // Update spatial index
          this.cullingService.updateItem(entity.id, bounds);
        },
      };
    }
  );

  private isCoordEqual(a: number, b: number) {
    const browserCoordEpsilon = 0.05;
    return Math.abs(a - b) < browserCoordEpsilon;
  }

  onReady() {
    this.node!.style.zIndex = '10';
    this._cullingEnabled = this.options.enableViewportCulling !== false;
    if (this._cullingEnabled) {
      this.cullingService.configure({
        preloadFactor: this.options.preloadFactor ?? 1.5,
      });
      this._cullingDispose = this.cullingService.onVisibilityChange((visibleIds) => {
        this._applyCulling(visibleIds);
      });
    }
  }

  get visibeBounds() {
    return this.transformVisibles.map((transform) => transform.bounds);
  }

  updateNodesBounds() {
    this.renderCache
      .getMoreByItems(this.transformVisibles)
      .forEach((render) => render.updateBounds());
  }

  autorun() {
    if (this.documentTransformer.loading) return;
    this.documentTransformer.refresh();
    this.updateNodesBounds();
    // After bounds update, rebuild spatial index and recompute visibility
    if (this._cullingEnabled) {
      this.cullingService.rebuild();
      this.cullingService.forceUpdate();
    }
  }

  private _scheduleCullingUpdate(): void {
    if (this._cullingEnabled) {
      this.cullingService.scheduleUpdate();
    }
  }

  private _applyCulling(visibleIds: Set<string>): void {
    // Iterate all transform visibles and toggle attach/detach
    const transforms = this.transformVisibles;
    const allCaches = this.renderCache.getMoreByItems(transforms);
    for (let i = 0; i < transforms.length; i++) {
      const transform = transforms[i];
      const cache = allCaches[i];
      if (visibleIds.has(transform.entity.id)) {
        cache.attach();
      } else {
        cache.detach();
      }
    }
  }

  private get renderElement(): HTMLElement {
    if (typeof this.options.renderElement === 'function') {
      const element = this.options.renderElement();
      if (element) {
        return element;
      }
    } else if (typeof this.options.renderElement !== 'undefined') {
      return this.options.renderElement as HTMLElement;
    }
    return this.node;
  }
}
