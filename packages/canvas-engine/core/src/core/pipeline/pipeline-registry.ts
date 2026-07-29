/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import {
  type IMessageHandler,
  type Message,
  Message as PhosphorMessage,
  MessageLoop,
} from '@phosphor/messaging';
import { Disposable, DisposableCollection, Emitter } from '@flowgram.ai/utils';

import { type Layer, type LayerRegistry, PlaygroundConfigEntity } from '../layer';
import {
  // AbleManager,
  ConfigEntity,
  Entity,
  EntityManager,
  // getAbleMetadata,
  getEntityDatasMetadata,
  getEntityMetadata,
  injectPlaygroundContext,
  PlaygroundContext,
} from '../../common';
import { PipelineRenderer } from './pipeline-renderer';
import { PipelineEntitiesSelector } from './pipeline-entities-selector';
import { PipelineEntitiesImpl } from './pipeline-entities';
// import { PipelineDispatcher } from './pipeline-dispatcher';
import {
  type PipeEventName,
  type PipelineDimension,
  type PipelineEventHandler,
  type PipelineEventRegsiter,
  PipelineLayerFactory,
  type PipeSupportEvent,
} from './pipeline';

export enum PipelineMessage {
  ZOOM = 'PIPELINE_ZOOM',
  SCROLL = 'PIPELINE_SCROLL',
  CONFIG_CHANGE = 'PIPELINE_CONFIG_CHANGE',
}
const configChangeMessage = new PhosphorMessage(PipelineMessage.CONFIG_CHANGE);
/**
 * pipeline 注册器，用于注册一些事件
 */
@injectable()
export class PipelineRegistry implements Disposable, IMessageHandler {
  private _isFocused = false;

  protected toDispose = new DisposableCollection();

  protected allLayersMap = new Map<LayerRegistry, Layer>();

  readonly onResizeEmitter = new Emitter<PipelineDimension>();

  readonly onFocusEmitter = new Emitter<void>();

  readonly onBlurEmitter = new Emitter<void>();

  readonly onZoomEmitter = new Emitter<number>();

  readonly onScrollEmitter = new Emitter<{ scrollX: number; scrollY: number }>();

  protected configChangeMessagePosted = false;

  protected pendingZoomMessage = false;

  protected pendingScrollMessage = false;

  readonly onFocus = this.onFocusEmitter.event;

  readonly onBlur = this.onBlurEmitter.event;

  readonly onZoom = this.onZoomEmitter.event;

  readonly onScroll = this.onScrollEmitter.event;

  constructor() {
    this.toDispose.pushAll([
      this.onResizeEmitter,
      this.onFocusEmitter,
      this.onZoomEmitter,
      this.onBlurEmitter,
      this.onScrollEmitter,
    ]);
    this.onFocusEmitter.event(() => {
      this._isFocused = true;
    });
    this.onBlurEmitter.event(() => {
      this._isFocused = false;
    });
  }

  // @inject(PipelineDispatcher) dispatcher: PipelineDispatcher;

  @inject(PipelineRenderer) renderer: PipelineRenderer;

  @inject(PipelineEntitiesSelector) selector: PipelineEntitiesSelector;

  @inject(EntityManager) entityManager: EntityManager;

  // @inject(AbleManager) ableManager: AbleManager;

  @injectPlaygroundContext() context: PlaygroundContext;

  @inject(PipelineLayerFactory) layerFactory: PipelineLayerFactory;

  // @inject(SelectionService) @optional() selectionService?: SelectionService;
  protected playgroundEvents: {
    [key: string]: { handlers: PipelineEventRegsiter[] } & Disposable;
  } = {};

  protected globalEvents: {
    [key: string]: { handlers: PipelineEventRegsiter[] } & Disposable;
  } = {};

  _listenEvent(
    name: PipeEventName,
    handle: PipelineEventHandler,
    isGlobal: boolean,
    priority = 0,
    options?: AddEventListenerOptions
  ): Disposable {
    const eventsCache = isGlobal ? this.globalEvents : this.playgroundEvents;
    const domNode = isGlobal ? document : this.renderer.node.parentNode!;
    let eventRegister = eventsCache[name];
    if (!eventRegister) {
      const realHandler = {
        handleEvent: (e: PipeSupportEvent) => {
          const list = eventRegister.handlers;
          for (let i = 0, len = list.length; i < len; i++) {
            const prevent = list[i].handle(e);
            /* v8 ignore next 1 */
            if (prevent) return;
          }
        },
      };
      domNode.addEventListener(name, realHandler, options);
      eventRegister = eventsCache[name] = {
        handlers: [],
        dispose: () => {
          domNode.removeEventListener(name, realHandler);
          delete eventsCache[name];
        },
      };
    }
    const { handlers } = eventRegister;
    const item = { handle, priority };
    /**
     * handlers 排序：
     * 1. 后注册先执行 (符合冒泡规则)
     * 2. 按 priority 排序
     */
    handlers.unshift(item);
    handlers.sort((a, b) => b.priority - a.priority);
    const dispose = Disposable.create(() => {
      const index = eventRegister.handlers.indexOf(item);
      if (index !== -1) eventRegister.handlers.splice(index, 1);
      if (eventRegister.handlers.length === 0) {
        eventRegister.dispose();
      }
    });
    this.toDispose.push(dispose);
    return dispose;
  }

  /**
   * 监听画布上的浏览器事件
   */
  listenPlaygroundEvent(
    name: PipeEventName,
    handle: (event: PipeSupportEvent) => boolean | undefined,
    priority?: number,
    options?: AddEventListenerOptions
  ): Disposable {
    return this._listenEvent(name, handle, false, priority, options);
  }

  /**
   * 监听全局的事件
   * @param name
   * @param handle
   */
  listenGlobalEvent(
    name: PipeEventName,
    handle: (event: PipeSupportEvent) => boolean | undefined,
    priority?: number,
    options?: AddEventListenerOptions
  ): Disposable {
    return this._listenEvent(name, handle, true, priority, options);
  }

  /**
   * 注册 layer
   * @param layerRegistry
   * @param layerOptions 配置
   */
  registerLayer<P extends Layer = Layer>(
    layerRegistry: LayerRegistry<P>,
    layerOptions?: P['options']
  ): void {
    // layer 不允许重复添加
    if (this.allLayersMap.has(layerRegistry)) return;
    const layer = this.layerFactory(layerRegistry, layerOptions);
    this.allLayersMap.set(layerRegistry, layer);
    // const ableRegistries = getAbleMetadata(layerRegistry);
    const entityRegistries = getEntityMetadata(layerRegistry);
    const entityDataRegistries = getEntityDatasMetadata(layerRegistry);
    // ableRegistries.forEach(r => this.ableManager.registerAble(r));
    entityRegistries.forEach((r) => {
      this.entityManager.registerEntity(r);
      if (Entity.isRegistryOf(r, ConfigEntity)) {
        // 自动创建注册的 entity
        this.entityManager.createEntity(r);
      }
    });
    entityDataRegistries.forEach((r) => {
      this.entityManager.registerEntity(r.entity);
      this.entityManager.registerEntityData(r.data);
    });
    // this.selector.subscribeAVbles(layer, ableRegistries);
    this.selector.subscribeEntities(layer, entityRegistries);
    entityDataRegistries.forEach((r) =>
      this.selector.subscribleEntityByData(layer, r.entity, r.data)
    );
    layer.observeManager = new PipelineEntitiesImpl(this.entityManager);
    // layer.commands = this.commands;
    // layer.menus = this.menus;
    // layer.keybindings = this.keybindings;
    // layer.selectionService = this.selectionService;
    layer.reloadEntities = () => {
      const result = this.selector.getLayerData(layer);
      if (result.changed) {
        (layer.observeManager as PipelineEntitiesImpl).load(
          result.observeEntities,
          result.observeDatas
        );
      }
      return result.changed;
    };
    // layer.dispatch = (payloadKey: string | symbol, payloadValue: object, cb?: () => void) => {
    //   const changedEntities = this.dispatcher.dispatch(payloadKey, payloadValue);
    //   if (cb) {
    //     if (changedEntities.length > 0) {
    //       const changed = layer.reloadEntities();
    //       if (changed && layer.autorun) layer.autorun();
    //     }
    //     cb();
    //   }
    // };
    // @ts-ignore
    layer.listenPlaygroundEvent = this.listenPlaygroundEvent.bind(this);
    // @ts-ignore
    layer.listenGlobalEvent = this.listenGlobalEvent.bind(this);
    layer.config = this.configEntity;
    layer.getOtherLayer = this.getLayer.bind(this);
    Object.defineProperty(layer, 'isFocused', {
      get: () => this._isFocused,
    });
    if (layer.onResize) {
      this.onResize(layer.onResize.bind(layer));
    }
    if (layer.onBlur) {
      this.onBlurEmitter.event(layer.onBlur.bind(layer));
    }
    if (layer.onFocus) {
      this.onFocusEmitter.event(layer.onFocus.bind(layer));
    }
    if (layer.onZoom) {
      this.onZoomEmitter.event(layer.onZoom.bind(layer));
    }
    if (layer.onScroll) {
      this.onScrollEmitter.event(layer.onScroll.bind(layer));
    }
    if (layer.onViewportChange) {
      const viewportChange = layer.onViewportChange.bind(layer);
      this.onResize(viewportChange);
      this.onZoomEmitter.event(viewportChange);
      this.onScrollEmitter.event(viewportChange);
    }
    if (layer.onReadonlyOrDisabledChange) {
      this.configEntity.onReadonlyOrDisabledChange(layer.onReadonlyOrDisabledChange.bind(layer));
    }
    this.renderer.addLayer(layer);
  }

  /**
   * 获取 layer
   */
  getLayer<T extends Layer>(layerRegistry: LayerRegistry<T>): T | undefined {
    return this.allLayersMap.get(layerRegistry) as T;
  }

  get configEntity(): PlaygroundConfigEntity {
    return this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity, true)!;
  }

  ready(): void {
    const config = this.configEntity;
    let lastScale = config.finalScale;
    let lastScroll = config.scrollData;
    // 监听 zoom
    config.onConfigChanged(() => {
      /* v8 ignore next 10 */
      const newScale = config.finalScale;
      const newScroll = config.scrollData;
      if (newScale !== lastScale) {
        lastScale = newScale;
        this.scheduleConfigChangeMessage('zoom');
      }
      if (lastScroll.scrollX !== newScroll.scrollX || lastScroll.scrollY !== newScroll.scrollY) {
        lastScroll = newScroll;
        this.scheduleConfigChangeMessage('scroll');
      }
    });
  }

  processMessage(msg: Message): void {
    const config = this.configEntity;
    switch (msg.type) {
      case PipelineMessage.CONFIG_CHANGE:
        this.flushConfigChangeMessage();
        break;
      case PipelineMessage.SCROLL:
        this.onScrollEmitter.fire(config.scrollData);
        break;
      case PipelineMessage.ZOOM:
        this.onZoomEmitter.fire(config.finalScale);
        break;
      default:
    }
  }

  protected scheduleConfigChangeMessage(type: 'zoom' | 'scroll'): void {
    if (type === 'zoom') {
      this.pendingZoomMessage = true;
    } else {
      this.pendingScrollMessage = true;
    }
    if (process.env.NODE_ENV === 'test') {
      this.flushConfigChangeMessage();
      return;
    }
    if (this.configChangeMessagePosted) {
      return;
    }
    this.configChangeMessagePosted = true;
    MessageLoop.postMessage(this, configChangeMessage);
  }

  protected flushConfigChangeMessage(): void {
    const shouldFireZoom = this.pendingZoomMessage;
    const shouldFireScroll = this.pendingScrollMessage;
    this.pendingZoomMessage = false;
    this.pendingScrollMessage = false;
    this.configChangeMessagePosted = false;
    const config = this.configEntity;
    if (shouldFireZoom) {
      this.onZoomEmitter.fire(config.finalScale);
    }
    if (shouldFireScroll) {
      this.onScrollEmitter.fire(config.scrollData);
    }
  }

  /**
   * pipline 大小变化时候会触发
   */
  readonly onResize = this.onResizeEmitter.event;

  dispose(): void {
    this.pendingZoomMessage = false;
    this.pendingScrollMessage = false;
    this.configChangeMessagePosted = false;
    this.toDispose.dispose();
  }
}
