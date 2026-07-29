/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { inject, injectable } from 'inversify';
import { type IMessageHandler, Message, MessageLoop } from '@phosphor/messaging';
import { type Disposable, DisposableCollection, domUtils, Emitter } from '@flowgram.ai/utils';

import { type Layer } from '../layer';
import { LoggerService } from '../../services';
import { EntityManager } from '../../common';
import { createLayerReactAutorun } from './pipline-react-utils';
import { PipelineEntitiesSelector } from './pipeline-entities-selector';
import { type PipelineEntitiesImpl } from './pipeline-entities';

export const FLUSH_LAYER_REQUEST = 'flush-layer-request';

export class FlushLayerMessage extends Message {
  constructor() {
    super(FLUSH_LAYER_REQUEST);
  }
}

/**
 * pipeline 渲染器
 */
@injectable()
export class PipelineRenderer implements Disposable, IMessageHandler {
  public isReady = false;

  protected onAllLayersRenderedEmitter = new Emitter<void>();

  protected toDispose = new DisposableCollection();

  readonly layers: Layer[] = [];

  protected forceUpdates: Set<Layer> = new Set();

  readonly layerAutorunMap: Map<Layer, () => void> = new Map();

  readonly layerRenderedMap: Map<Layer, boolean> = new Map();

  protected pendingLayers: Set<Layer> = new Set();

  protected flushMessagePosted = false;

  readonly flushMessage = new FlushLayerMessage();

  protected reactPortals: React.FunctionComponent[] = [];

  readonly node = domUtils.createDivWithClass('gedit-playground-pipeline');

  /**
   * 所有 Layer 第一次渲染完成后触发
   */
  readonly onAllLayersRendered = this.onAllLayersRenderedEmitter.event;

  @inject(LoggerService) protected readonly loggerService: LoggerService;

  constructor(
    @inject(PipelineEntitiesSelector)
    protected readonly selector: PipelineEntitiesSelector,
    @inject(EntityManager) entityManager: EntityManager
    // @inject(AbleManager) ableManager: AbleManager,
  ) {
    /**
     * entity 修改触发 layer 更新
     */
    this.toDispose.push(
      entityManager.onEntityChange((entityType: string) => {
        const layers = this.selector.entityLayerMap.get(entityType);
        if (layers) layers.forEach((layer) => this.updateLayer(layer));
      })
    );
    this.toDispose.push(this.onAllLayersRenderedEmitter);
  }

  reportLayerRendered(layer: Layer): void {
    this.layerRenderedMap.set(layer, true);
    const allLayersRendered = Array.from(this.layerRenderedMap.values()).every((v) => v);
    if (allLayersRendered) {
      // logger 事件点位上报
      this.loggerService.onAllLayersRendered();
      this.onAllLayersRenderedEmitter.fire();
      // e2e 性能测试时会注入以下全局变量
      if ((window as any).REPORT_TTI_FOR_E2E) {
        (window as any).REPORT_TTI_FOR_E2E(
          // 由于 e2e 环境，performance 耗时即为 tti 的完整耗时。
          performance.now(),
          performance.getEntriesByType('resource')
        );
      }
    }
  }

  addLayer(layer: Layer): void {
    this.layers.push(layer);
    this.toDispose.push(layer);
    layer.pipelineNode = this.node;
    layer.playgroundNode = this.node.parentElement!;
    // Auto create node
    if ((layer.autorun || layer.render) && !layer.node) {
      layer.node = document.createElement('div');
    }
    // 把 layer 加到父亲节点上
    if (layer.node) {
      this.node.appendChild(layer.node);
      layer.node.classList.add('gedit-playground-layer');
    }
    if (layer.autorun) {
      const autorun = layer.autorun.bind(layer);
      this.layerAutorunMap.set(layer, autorun);
      // 重载 layer autorun
      layer.autorun = () => {
        this.updateLayer(layer, true);
      };
    } else if (layer.render) {
      this.layerRenderedMap.set(layer, false);
      const render = layer.render.bind(layer);
      const autorun = createLayerReactAutorun(
        layer,
        render,
        this.reportLayerRendered.bind(this),
        this
      );
      this.reactPortals.push(autorun.portal);
      this.layerAutorunMap.set(layer, autorun.autorun);
      if (process.env.NODE_ENV === 'test') {
        // 不对外暴露_render 字段
        (layer as any)._render = layer.render;
      }
      // 重载 layer autorun
      layer.render = (() => {
        this.updateLayer(layer, true);
      }) as () => JSX.Element;
    }
  }

  flush(forceUpdate?: boolean): void {
    this.layers.forEach((layer) => {
      this.updateLayer(layer, forceUpdate);
    });
  }

  ready(): void {
    this.layers.forEach((layer) => {
      // 先加载一次数据，保证 ready 时候能运行
      this.loadLayerEntities(layer);
      if (layer.onReady) layer.onReady();
    });
    this.isReady = true;
    // 第一次先渲染一次
    this.flush(true);
  }

  dispose(): void {
    this.pendingLayers.clear();
    this.flushMessagePosted = false;
    this.toDispose.dispose();
    this.node.remove();
  }

  processMessage(msg: Message): void {
    if (msg instanceof FlushLayerMessage) {
      this.flushPendingLayers();
    }
  }

  protected loadLayerEntities(layer: Layer): boolean {
    const result = this.selector.getLayerData(layer);
    if (result.changed) {
      // 这里更新 layer 的 entities
      (layer.observeManager as PipelineEntitiesImpl).load(
        result.observeEntities,
        result.observeDatas
      );
    }
    return result.changed;
  }

  protected onFlushRequest(layer: Layer): boolean {
    // 只有 ready 之后才能执行 autorun
    if (!this.isReady || this.toDispose.disposed) return false;
    const startRenderTime = performance.now();
    const trackRenderPerformance = () => {
      const renderDuration = performance.now() - startRenderTime;
      // 小于 4ms 的渲染时间不需要记录
      if (renderDuration < 4) {
        return;
      }
      this.loggerService.onFlushRequest(renderDuration);
    };
    const autorun = this.layerAutorunMap.get(layer);
    const changed = this.loadLayerEntities(layer);
    // 只有修改或强制刷新才会刷新
    if (autorun && (changed || this.forceUpdates.has(layer))) {
      this.forceUpdates.delete(layer);
      try {
        // console.time(`layer ${layer.constructor.name}`)
        autorun();
        // console.timeEnd(`layer ${layer.constructor.name}`)
        /* v8 ignore next 3 */
      } catch (e) {
        console.error(e);
      }
      trackRenderPerformance();
      return true;
      /* v8 ignore next 2 */
    }
    trackRenderPerformance();
    return false;
  }

  /**
   * 1. PostMessage: 会将消息在 nextTick 执行
   * 2. pendingLayers: 同一个消息周期内的多层更新会合并到一次 flush
   * 3. 图层相互隔离，即时一层挂了也不受影响
   */
  updateLayer(layer: Layer, forceUpdate?: boolean): void {
    if (forceUpdate) {
      this.forceUpdates.add(layer);
    }
    if (process.env.NODE_ENV === 'test') {
      this.onFlushRequest(layer);
    } else {
      this.pendingLayers.add(layer);
      if (!this.flushMessagePosted) {
        this.flushMessagePosted = true;
        MessageLoop.postMessage(this, this.flushMessage);
      }
    }
  }

  protected flushPendingLayers(): void {
    if (!this.pendingLayers.size) {
      this.flushMessagePosted = false;
      return;
    }
    const layers = Array.from(this.pendingLayers);
    this.pendingLayers.clear();
    this.flushMessagePosted = false;
    layers.forEach((layer) => {
      this.onFlushRequest(layer);
    });
  }

  private reactComp?: React.FC;

  /**
   * 转成 react
   */
  toReactComponent(): React.FC {
    if (this.reactComp) return this.reactComp;
    const portals = this.reactPortals;
    const comp = () => (
      <>
        {}
        {portals.map((Portal, key) => (
          <Portal key={key} />
        ))}
      </>
    );
    this.reactComp = comp;
    return comp;
  }
}
