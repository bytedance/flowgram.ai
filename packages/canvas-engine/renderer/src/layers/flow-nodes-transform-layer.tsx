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
import { Layer, observeEntity, observeEntityDatas } from '@flowgram.ai/core';
// import { throttle } from 'lodash-es'

import { FlowRendererResizeObserver } from '../flow-renderer-resize-observer';

interface TransformRenderCache {
  updateBounds(): void;
}

export interface FlowNodesTransformLayerOptions {
  renderElement?: HTMLElement | (() => HTMLElement | undefined);
}

/**
 * 渲染节点位置
 */
@injectable()
export class FlowNodesTransformLayer extends Layer<FlowNodesTransformLayerOptions> {
  @inject(FlowDocument) readonly document: FlowDocument;

  @inject(FlowRendererResizeObserver)
  readonly resizeObserver: FlowRendererResizeObserver;

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  @observeEntityDatas(FlowNodeEntity, FlowNodeTransformData)
  _transforms: FlowNodeTransformData[];

  node = domUtils.createDivWithClass('gedit-flow-nodes-layer');

  get transformVisibles(): FlowNodeTransformData[] {
    return this.document.getRenderDatas<FlowNodeTransformData>(FlowNodeTransformData, false);
  }

  /**
   * 监听缩放，目前采用整体缩放
   * @param scale
   */
  onZoom(scale: number) {
    this.node!.style.transform = `scale(${scale})`;
  }

  dispose(): void {
    this.renderCache.dispose();
    super.dispose();
  }

  // onViewportChange() {
  //   this.throttleUpdate()
  // }

  // throttleUpdate = throttle(() => {
  //   this.renderCache.getFromCache().forEach((cache) => cache.updateBounds())
  // }, 100)

  protected renderCache = Cache.create<TransformRenderCache, FlowNodeTransformData>(
    (transform?: FlowNodeTransformData) => {
      const { renderState } = transform!;
      const { node } = renderState;
      const { entity } = transform!;
      node.id = entity.id;
      node.style.setProperty('content-visibility', 'auto');
      node.style.setProperty('contain', 'layout paint style');
      let resizeDispose: Disposable | undefined;
      const append = () => {
        if (resizeDispose) return;
        // 监听 dom 节点的大小变化
        this.renderElement.appendChild(node);
        if (!entity.getNodeMeta().autoResizeDisable) {
          resizeDispose = this.resizeObserver.observe(node, transform!);
        }
      };
      const dispose = () => {
        if (!resizeDispose) return;
        // 脱离文档流，但是 react 组件会保留
        if (node.parentElement) {
          this.renderElement.removeChild(node);
        }
        resizeDispose.dispose();
        resizeDispose = undefined;
      };
      append();
      return {
        dispose,
        updateBounds: () => {
          const { bounds } = transform!;
          // 保留2位小数
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
        },
      };
    }
  );

  private isCoordEqual(a: number, b: number) {
    const browserCoordEpsilon = 0.05; // 浏览器处理坐标的精度误差: 两位小数四舍五入
    return Math.abs(a - b) < browserCoordEpsilon;
  }

  onReady() {
    this.node!.style.zIndex = '10';
  }

  get visibeBounds() {
    return this.transformVisibles.map((transform) => transform.bounds);
  }

  /**
   * 更新节点的 bounds 数据
   */
  updateNodesBounds() {
    this.renderCache
      .getMoreByItems(this.transformVisibles)
      .forEach((render) => render.updateBounds());
  }

  autorun() {
    // 更新节点偏移数据 O(n) TODO 这个更新会从 render 里移除改成自动触发
    if (this.documentTransformer.loading) return;
    this.documentTransformer.refresh();
    this.updateNodesBounds();
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
