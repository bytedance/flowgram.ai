/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { nanoid } from 'nanoid';
import { debounce } from 'lodash';
import { inject, injectable, optional, named } from 'inversify';
import {
  Disposable,
  DisposableCollection,
  domUtils,
  Emitter,
  type Event,
} from '@flowgram.ai/utils';
import { CommandService } from '@flowgram.ai/command';

import { SelectionService } from './services';
import { PlaygroundContribution, PlaygroundRegistry } from './playground-contribution';
import { PlaygroundConfig } from './playground-config';
import {
  type PipelineDimension,
  // PipelineDispatcher,
  PipelineRegistry,
  PipelineRenderer,
} from './core/pipeline';
import {
  EditorStateConfigEntity,
  PlaygroundConfigEntity,
  type PlaygroundConfigRevealOpts,
} from './core/layer/config';
import { Layer, LayerRegistry } from './core';
import {
  // type AbleDispatchEvent,

  // AbleManager,
  type ConfigEntity,
  EntityManager,
  type EntityRegistry,
  PlaygroundContext,
  ContributionProvider,
  PlaygroundContextProvider,
} from './common';
// import { PlaygroundCommandRegistry, PlaygroundId, toContextMenuPath } from './playground-registries';

const playgroundInstances: Set<Playground> = new Set();

const playgroundInstanceCreateEmitter = new Emitter<Playground>();
const playgroundInstanceDisposeEmitter = new Emitter<Playground>();

@injectable()
export class Playground<CONTEXT = PlaygroundContext> implements Disposable {
  readonly toDispose = new DisposableCollection();

  readonly node: HTMLElement;

  private _focused = false;

  readonly onBlur: Event<void>;

  readonly onFocus: Event<void>;

  readonly onZoom: Event<number>;

  readonly onScroll: Event<{ scrollX: number; scrollY: number }>;

  // 唯一 className，适配画布多实例场景
  private playgroundClassName = nanoid();

  static getLatest(): Playground | undefined {
    const instances = Playground.getAllInstances();
    return instances[instances.length - 1];
  }

  // static getSelection(selectionService: SelectionService): Entity[] {
  //   const selection = selectionService.selection;
  //   if (!selection || !Array.isArray(selection)) return [];
  //   if (selection.find(s => !(s instanceof Entity) || !s.hasAble(Selectable))) return [];
  //   return selection;
  // }
  static getAllInstances(): Playground[] {
    const result: Playground[] = [];
    for (const p of playgroundInstances.values()) {
      result.push(p);
    }
    return result;
  }

  /**
   * 有实例创建
   */
  static onInstanceCreate = playgroundInstanceCreateEmitter.event;

  /**
   * 有实例销毁
   */
  static onInstanceDispose = playgroundInstanceDisposeEmitter.event;

  constructor(
    // @inject(PlaygroundId) readonly id: PlaygroundId,
    @inject(EntityManager) readonly entityManager: EntityManager,
    @inject(PlaygroundRegistry) readonly registry: PlaygroundRegistry,
    @inject(PlaygroundContextProvider)
    @optional()
    readonly contextProvider: PlaygroundContextProvider,
    @inject(PipelineRenderer)
    readonly pipelineRenderer: PipelineRenderer,
    // @inject(PlaygroundCommandRegistry) protected readonly commands: PlaygroundCommandRegistry,
    @inject(PipelineRegistry)
    readonly pipelineRegistry: PipelineRegistry,
    // @inject(AbleManager) readonly ableManager: AbleManager,
    // @inject(PipelineDispatcher) protected readonly dispatcher: PipelineDispatcher,
    @inject(PlaygroundConfig)
    protected readonly playgroundConfig: PlaygroundConfig,
    @inject(ContributionProvider)
    @named(PlaygroundContribution)
    @optional()
    protected readonly contributionProvider: ContributionProvider<PlaygroundContribution>,
    /**
     * 用于管理画布命令
     */
    @inject(CommandService) readonly commandService: CommandService,
    /**
     * 用于管理画布选择
     */
    @inject(SelectionService) readonly selectionService: SelectionService
  ) {
    this.toDispose.pushAll([
      this.pipelineRenderer,
      this.pipelineRegistry,
      this.entityManager,
      // this.ableManager,
      this.commandService,
      this.selectionService,
      Disposable.create(() => {
        playgroundInstances.delete(this);
        this.node.remove();
        playgroundInstanceDisposeEmitter.fire(this);
      }),
      pipelineRenderer.onAllLayersRendered(() => {
        this.contributions.forEach((contrib) => contrib.onAllLayersRendered?.(this));
      }),
    ]);
    // Deafult entities added
    const editStates =
      this.entityManager.createEntity<EditorStateConfigEntity>(EditorStateConfigEntity);
    this.entityManager.createEntity(PlaygroundConfigEntity);
    this.node = playgroundConfig.node || document.createElement('div');
    this.toDispose.pushAll([
      // 浏览器原生的 scrollIntoView 会导致页面的滚动
      // 需要禁用这种操作，否则会引发画布 viewport 计算问题
      domUtils.addStandardDisposableListener(this.node, 'scroll', (event: UIEvent) => {
        this.node.scrollTop = 0;
        this.node.scrollLeft = 0;
        event.preventDefault();
        event.stopPropagation();
      }),
    ]);
    this.node.classList.add('gedit-playground');
    if (process.env.NODE_ENV !== 'test') {
      this.node.classList.add(this.playgroundClassName);
    }
    this.node.dataset.testid = 'sdk.workflow.canvas';
    if (playgroundConfig.layers)
      playgroundConfig.layers.forEach((layer) => this.registry.registerLayer(layer));
    // if (playgroundConfig.ables)
    //   playgroundConfig.ables.forEach(able => this.ableManager.registerAble(able));
    // if (playgroundConfig.entities)
    //   playgroundConfig.entities.forEach(entity => this.entityManager.registerEntity(entity));
    if (playgroundConfig.editorStates)
      playgroundConfig.editorStates.forEach((state) => editStates.registerState(state));
    if (playgroundConfig.zoomEnable !== undefined) this.zoomEnable = playgroundConfig.zoomEnable;
    if (playgroundConfig.entityConfigs) {
      for (const [k, v] of playgroundConfig.entityConfigs) {
        const entity = this.entityManager.getEntity<ConfigEntity>(k, true);
        entity?.updateConfig(v);
      }
    }
    this.node.addEventListener('blur', () => {
      this.blur();
    });
    this.node.addEventListener('focus', () => {
      this.focus();
    });
    this.node.tabIndex = 0;
    this.node.appendChild(this.pipelineRenderer.node);
    this.onBlur = this.pipelineRegistry.onBlurEmitter.event;
    this.onFocus = this.pipelineRegistry.onFocusEmitter.event;
    this.onZoom = this.pipelineRegistry.onZoomEmitter.event;
    this.onScroll = this.pipelineRegistry.onScrollEmitter.event;
    playgroundInstances.add(this);
  }

  get context(): CONTEXT {
    return this.contextProvider?.();
  }

  protected get contributions(): PlaygroundContribution[] {
    return this.contributionProvider.getContributions();
  }

  init(): void {
    const { contributions } = this;
    for (const contrib of contributions) {
      if (contrib.registerPlayground) contrib.registerPlayground(this.registry);
    }
    for (const contrib of contributions) {
      if (contrib.onInit) contrib.onInit(this);
    }
    playgroundInstanceCreateEmitter.fire(this);
  }

  get pipelineNode(): HTMLDivElement {
    return this.pipelineRenderer.node;
  }

  setParent(parent: HTMLElement): void {
    parent.appendChild(this.node);
    this.resize();
  }

  // get onDispatch(): Event<AbleDispatchEvent> {
  //   return this.ableManager.onAbleDispatch;
  // }

  /**
   * 对应的右键菜单路径
   */
  // get contextMenuPath(): string[] {
  //   return this.playgroundConfig.contextMenuPath ? this.playgroundConfig.contextMenuPath : toContextMenuPath(this.id);
  // }
  get zoomEnable(): boolean {
    return this.config.zoomEnable;
  }

  set zoomEnable(zoomEnable) {
    this.config.zoomEnable = zoomEnable;
  }

  /**
   * 转换为内部的命令 id
   * @param commandId
   */
  // toPlaygroundCommandId(commandId: string): string {
  //   return this.registry.commands.toCommandId(commandId);
  // }
  /**
   * 通知所有关联 able 的 entity
   */
  // dispatch<P>(payloadKey: string | symbol, payload: P): string[] {
  //   return this.ableManager.dispatch(payloadKey, payload);
  // }

  /**
   * 刷新所有 layer
   */
  flush(): void {
    this.pipelineRenderer.flush();
  }

  /**
   * 执行命令
   * @param commandId
   * @param args
   */
  // execCommand<T>(commandId: string, ...args: any[]): Promise<T | undefined> {
  //   return this.commands.executeCommand<T>(commandId, ...args);
  // }
  private isReady = false;

  ready(): void {
    if (this.isReady) return;
    this.isReady = true;
    if (this.playgroundConfig.autoResize) {
      const resize = debounce(() => {
        if (this.disposed) return;
        this.resize();
      }, 0);
      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(this.node);
        this.toDispose.push(
          Disposable.create(() => {
            resizeObserver.disconnect();
          })
        );
      } else {
        this.toDispose.push(
          domUtils.addStandardDisposableListener(window.document.body, 'resize', resize, {
            passive: true,
          })
        );
      }
      this.toDispose.push(
        domUtils.addStandardDisposableListener(window.document, 'scroll', resize, {
          passive: true,
        })
      );
      this.resize();
    }
    this.pipelineRegistry.ready();
    this.pipelineRenderer.ready();
    const { contributions } = this;
    for (const contrib of contributions) {
      if (contrib.onReady) contrib.onReady(this);
    }
  }

  /**
   * 按下边顺序执行
   * 1. 指定的 entity 位置或 pos 位置
   * 2. selection 位置
   * 3. 初始化位置
   */
  scrollToView(opts?: PlaygroundConfigRevealOpts): Promise<void> {
    const playgroundEntity =
      this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)!;
    return playgroundEntity.scrollToView(opts);
  }

  /**
   * 这里会由 widget 透传进来
   * @param msg
   */
  resize(msg?: PipelineDimension, scrollToCenter = true): void {
    if (!msg) {
      const boundingRect = this.node.getBoundingClientRect();
      msg = {
        clientX: boundingRect.left,
        clientY: boundingRect.top,
        width: boundingRect.width,
        height: boundingRect.height,
      };
    }
    // 页面宽度变更 触发滚动偏移
    const { width, height } = this.config.config;
    if (msg.width === 0 || msg.height === 0) {
      return;
    }
    let { scrollX, scrollY } = this.config.config;
    // 这个在处理滚动
    if (scrollToCenter && width && Math.round(msg.width) !== width) {
      scrollX += (width - msg.width) / 2;
    }
    if (scrollToCenter && height && Math.round(msg.height) !== height) {
      scrollY += (height - msg.height) / 2;
    }
    this.config.updateConfig({ ...msg, scrollX, scrollY });
    this.pipelineRegistry.onResizeEmitter.fire(msg);
  }

  /**
   * 触发 focus
   */
  protected focus(): void {
    if (this._focused) return;
    this._focused = true;
    this.pipelineRegistry.onFocusEmitter.fire();
  }

  /**
   * 触发 blur
   */
  protected blur(): void {
    if (!this._focused) return;
    this._focused = false;
    this.pipelineRegistry.onBlurEmitter.fire();
  }

  get focused(): boolean {
    return this._focused;
  }

  /**
   * 画布配置数据
   */
  get config(): PlaygroundConfigEntity {
    return this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)!;
  }

  /**
   * 画布编辑状态管理
   */
  get editorState(): EditorStateConfigEntity {
    return this.entityManager.getEntity<EditorStateConfigEntity>(EditorStateConfigEntity)!;
  }

  getConfigEntity<T extends ConfigEntity>(r: EntityRegistry<T>): T {
    return this.entityManager.getEntity<T>(r, true) as T;
  }

  dispose(): void {
    if (this.disposed) return;
    const { contributions } = this;
    for (const contrib of contributions) {
      if (contrib.onDispose) contrib.onDispose(this);
    }
    this.toDispose.dispose();
  }

  get disposed(): boolean {
    return this.toDispose.disposed;
  }

  /**
   * 转换成 react 组件
   */
  toReactComponent(): React.FC {
    return this.pipelineRenderer.toReactComponent();
  }

  /**
   * 注册 layer
   */
  registerLayer<P extends Layer = Layer>(
    layerRegistry: LayerRegistry<P>,
    layerOptions?: P['options']
  ): void {
    this.pipelineRegistry.registerLayer<P>(layerRegistry, layerOptions);
  }

  /**
   * 注册 多个 layer
   */
  registerLayers(...layerRegistries: LayerRegistry[]): void {
    layerRegistries.forEach((layer) => this.pipelineRegistry.registerLayer(layer));
  }

  /**
   * 获取 layer
   */
  getLayer<T extends Layer>(layerRegistry: LayerRegistry<T>): T | undefined {
    return this.pipelineRegistry.getLayer<T>(layerRegistry);
  }

  get onAllLayersRendered(): Event<void> {
    return this.pipelineRenderer.onAllLayersRendered;
  }
}
