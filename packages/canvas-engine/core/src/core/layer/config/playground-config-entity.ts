/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Disposable, domUtils, Emitter, PromiseDeferred, Rectangle } from '@flowgram.ai/utils'
import {
  ConfigEntity,
  Entity,
  PositionData,
  PositionSchema,
  SizeData,
  SizeSchema,
  TransformData,
} from '../../../common'
import { MouseTouchEvent, startTween } from '../../utils'
// import { Selectable } from '../../able'

export interface PlaygroundConfigEntityData {
  scrollX: number // 滚动 x
  scrollY: number // 滚动 y
  originX: number // 左上角默认开始的原点坐标
  originY: number // 左上角默认开始原点坐标
  width: number // 编辑区宽，在 onResize 触发后重制
  height: number // 编辑区高，在 onResize 触发后重制
  reverseScroll: boolean // 支持反方向滚动
  overflowX: 'hidden' | 'scroll'
  overflowY: 'hidden' | 'scroll'
  minZoom: number // 最大
  maxZoom: number //  最小
  zoom: number // 缩放比
  scrollLimitX?: number // 水平滚动限制
  scrollLimitY?: number // 垂直滚动限制
  mouseScrollDelta?: number | ((zoom: number) => number); // 鼠标滚动时的 delta 值
  pageBounds?: { x: number; y: number; width: number; height: number } // 编辑的画布边框，用于处理外部对齐问题
  disabled: boolean // 禁用状态
  readonly: boolean // readonly 状态
  scrollDisable: boolean
  grabDisable: boolean // 禁用抓取拖拽画布能力
  zoomDisable: boolean
  viewportCulling: boolean
  viewportCullingOverscan: number
  lineViewportCulling: boolean
}

export interface PlaygroundConfigRevealOpts {
  entities?: Entity[]
  position?: PositionSchema // 滚动到指定位置，并居中
  bounds?: Rectangle // 滚动的 bounds
  // selection?: boolean 是否回到选择器所在位置，默认 true
  scrollDelta?: PositionSchema
  zoom?: number // 需要缩放的比例
  easing?: boolean // 是否开启缓动，默认开启
  easingDuration?: number // 默认 500 ms
  scrollToCenter?: boolean // 是否滚动到中心
}
export const SCALE_WIDTH = 0

/** 鼠标缩放 delta */
export const MOUSE_SCROLL_DELTA = (zoom: number) => zoom / 20;
export type PlaygroundScrollLimitFn = (scroll: { scrollX: number; scrollY: number }) => {
  scrollX: number
  scrollY: number
}
export type Cursors = Record<string, string>;
/**
 * 全局画布的配置信息
 */
export class PlaygroundConfigEntity extends ConfigEntity<PlaygroundConfigEntityData> {
  static type = 'PlaygroundConfigEntity'

  public getCursors: (() => Cursors | undefined) | undefined;
  private _loading = false
  private _zoomEnable = true

  private _scrollLimitFn?: PlaygroundScrollLimitFn

  private _onReadonlyOrDisabledChangeEmitter = new Emitter<{ readonly: boolean, disabled: boolean }>()
  private _onGrabDisableChangeEmitter = new Emitter<boolean>()
  readonly onGrabDisableChange = this._onGrabDisableChangeEmitter.event;
  readonly onReadonlyOrDisabledChange = this._onReadonlyOrDisabledChangeEmitter.event
  playgroundDomNode: HTMLElement = document.createElement('div')

  cursor = 'default'
  constructor(opts: any) {
    super(opts);
    this.toDispose.push(this._onReadonlyOrDisabledChangeEmitter)
  }

  /**
   * 是否禁用抓取拖拽画布能力
   */
  get grabDisable(): boolean {
    return this.config.grabDisable;
  }

  /**
   * 是否禁用抓取拖拽画布能力
   */
  set grabDisable(grabDisable: boolean) {
    this.updateConfig({
      grabDisable
    })
  }
  get scrollDisable(): boolean {
    return this.config.scrollDisable;
  }
  set scrollDisable(scrollDisable: boolean) {
    this.updateConfig({
      scrollDisable
    })
  }
  get zoomDisable(): boolean {
    return this.config.zoomDisable;
  }
  set zoomDisable(zoomDisable: boolean) {
    this.updateConfig({
      zoomDisable
    })
  }
  getDefaultConfig(): PlaygroundConfigEntityData {
    return {
      scrollX: 0,
      scrollY: 0,
      originX: 0,
      originY: 0,
      width: 0,
      height: 0,
      minZoom: 0.25,
      maxZoom: 2,
      zoom: 1,
      reverseScroll: true,
      overflowX: 'scroll',
      overflowY: 'scroll',
      disabled: false,
      readonly: false,
      grabDisable: false,
      scrollDisable: false,
      zoomDisable: false,
      viewportCulling: true,
      viewportCullingOverscan: 300,
      lineViewportCulling: true,
      mouseScrollDelta: MOUSE_SCROLL_DELTA
    }
  }

  /**
   * 添加滚动限制逻辑
   * @param fn
   */
  addScrollLimit(fn: PlaygroundScrollLimitFn): void {
    this._scrollLimitFn = fn
  }

  /**
   * 更新实体配置
   * @param props
   */
  updateConfig(props: Partial<PlaygroundConfigEntityData>): void {
    if (props.zoom !== undefined) {
      props = { ...props, zoom: this.normalizeZoom(props.zoom) }
    }
    props = { ...this.config, ...props }
    if (!props.reverseScroll) {
      if (props.scrollX! < this.config.originX) {
        props.scrollX = this.config.originX
      }
      if (props.scrollY! < this.config.originY) {
        props.scrollY = this.config.originY
      }
    }
    if (props.scrollLimitX !== undefined && props.scrollX! < props.scrollLimitX) {
      props.scrollX = props.scrollLimitX
    }
    if (props.scrollLimitY !== undefined && props.scrollY! < props.scrollLimitY) {
      props.scrollY = props.scrollLimitY
    }
    if (props.overflowX === 'hidden') {
      props.scrollX = this.config.originX
    }
    if (props.overflowY === 'hidden') {
      props.scrollY = this.config.originY
    }
    const scrollDisable = props.scrollDisable || this.scrollDisable
    const { readonly, disabled, grabDisable } = this
    if (scrollDisable) {
      props.scrollX = this.config.scrollX
      props.scrollY = this.config.scrollY
    }
    super.updateConfig(
      this._scrollLimitFn
        ? { ...props, ...this._scrollLimitFn({ scrollX: props.scrollX!, scrollY: props.scrollY! }) }
        : props
    )
    const readonlyOrDisableChanged = readonly !== this.readonly || disabled !== this.disabled
    if (readonlyOrDisableChanged) this._onReadonlyOrDisabledChangeEmitter.fire({ readonly: this.readonly, disabled: this.disabled })
    if (grabDisable !== this.grabDisable) this._onGrabDisableChangeEmitter.fire(this.grabDisable)
  }

  /**
   * 缩放比例
   * 使用 zoom 替代
   * @deprecated
   */
  get finalScale(): number {
    if (!this.zoomEnable) return 1
    return this.config.zoom
  }

  /**
   * 缩放比例
   */
  get zoom(): number {
    if (!this.zoomEnable) return 1
    return this.config.zoom
  }

  get scrollData(): { scrollX: number; scrollY: number } {
    return {
      scrollX: this.config.scrollX,
      scrollY: this.config.scrollY,
    }
  }

  protected normalizeZoom(zoom: number): number {
    if (!this.zoomEnable) return 1
    if (this.zoomDisable) return this.config.zoom;
    if (zoom < this.config.minZoom) {
      zoom = this.config.minZoom
    } else if (zoom > this.config.maxZoom) {
      zoom = this.config.maxZoom
    }
    return zoom
  }

  /**
   * 修改画布光标
   * @param cursor
   */
  updateCursor(cursor: string): void {
    if (this.cursor !== cursor) {
      this.cursor = cursor
      this.fireChange()
    }
  }

  /**
   * 获取相对画布的位置
   * @param event
   * @param widthScale 是否要计算缩放
   */
  getPosFromMouseEvent(
    event:
    | MouseEvent
    | TouchEvent
    | {
        clientX: number;
        clientY: number;
      },
    withScale = true
  ): PositionSchema {
    const { config } = this
    const scale = withScale ? this.zoom : 1
    const { clientX, clientY } = MouseTouchEvent.getEventCoord(event)
    const clientRect = this.playgroundDomNode.getBoundingClientRect()
    return {
      x: (clientX + config.scrollX - clientRect.x) / scale,
      y: (clientY + config.scrollY - clientRect.y) / scale,
    }
  }
  getClientBounds(): Rectangle {
    const clientRect = this.playgroundDomNode.getBoundingClientRect()
    return new Rectangle(clientRect.x, clientRect.y, clientRect.width, clientRect.height)
  }
  /**
   * 将画布中的位置转成相对 window 的位置
   * @param pos
   */
  toFixedPos(pos: PositionSchema): PositionSchema {
    const { config } = this
    const clientRect = this.playgroundDomNode.getBoundingClientRect()
    return {
      x: pos.x - config.scrollX + clientRect.x,
      y: pos.y - config.scrollY + clientRect.y,
    }
  }

  /**
   * 获取可视区域
   */
  getViewport(withScale: boolean = true): Rectangle {
    const { config } = this
    const scale = withScale ? this.finalScale : 1
    return new Rectangle(
      config.scrollX / scale,
      config.scrollY / scale,
      config.width / scale,
      config.height / scale
    )
  }

  /**
   * 判断矩形是否在可视区域，如果有擦边页代表在可是区域
   * @param bounds
   * @param rotation
   * @param includeAll - 是否包含在里边，默认 false
   */
  isViewportVisible(bounds: Rectangle, rotation: number = 0, includeAll: boolean = false): boolean {
    return Rectangle.isViewportVisible(bounds, this.getViewport(), rotation, includeAll)
  }

  /**
   * 按下边顺序执行
   * 1. 指定的 entity 位置或 pos 位置
   * 3. 初始化位置
   */
  scrollToView(opts: PlaygroundConfigRevealOpts = {}): Promise<void> {
    const {
      scrollDelta,
      position: pos,
      // selection = true,
      easing = true,
      easingDuration = 300,
      entities,
    } = opts
    const { config } = this
    const scale = opts.zoom ? opts.zoom : this.finalScale
    let bounds: Rectangle | undefined
    if (entities && entities.length > 0) {
      const entitiesBounds = entities
        .map((e) => {
          const transform = e.getData<TransformData>(TransformData)
          if (transform) return transform.bounds
          const position = e.getData<PositionData>(PositionData)
          const size = e.getData<SizeData>(SizeData) || { width: 0, height: 0 }
          if (!position) return
          return new Rectangle(position.x, position.y, size.width, size.height || 0)
        })
        .filter((e) => !!e) as Rectangle[]
      if (entitiesBounds.length > 0) {
        bounds = Rectangle.enlarge(entitiesBounds)
      }
    } else if (pos) {
      bounds = new Rectangle(pos.x, pos.y, 0, 0)
    } else if (opts.bounds) {
      bounds = opts.bounds
    } // else if (selection) {
      // bounds = Selectable.getSelectedBounds(this.entityManager)
    // }
    if (!bounds) {
      const defaultConfig = this.getDefaultConfig()
      bounds = new Rectangle(
        (defaultConfig.scrollX + config.width / 2) / scale,
        (defaultConfig.scrollY + config.height / 2) / scale,
        0,
        0
      )
    }
    if (!opts.scrollToCenter) {
      const boundsVisible = this.getViewport()
      // 判断是否看得见
      if (boundsVisible.containsRectangle(bounds)) {
        return Promise.resolve()
      }
    }
    // TODO 微调滚动，而不是直接滚动到中心
    const toValues = {
      scrollX:
        (bounds.x + bounds.width / 2 + (scrollDelta ? scrollDelta.x : 0)) * scale -
        config.width / 2,
      scrollY:
        (bounds.y + bounds.height / 2 + (scrollDelta ? scrollDelta.y : 0)) * scale -
        config.height / 2,
      zoom: opts.zoom,
    }
    return this.scroll(toValues, easing, easingDuration)
  }

  /**
   * 这只画布边框，元素编辑的时候回吸附画布边框
   * @param bounds
   */
  setPageBounds(bounds: Rectangle): void {
    this.updateConfig({
      pageBounds: {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
      },
    })
  }

  getPageBounds(): Rectangle | undefined {
    const { pageBounds } = this.config
    if (pageBounds) {
      return new Rectangle(pageBounds.x, pageBounds.y, pageBounds.width, pageBounds.height)
    }
  }

  /**
   * 滚动到画布中央
   * @param zoomToFit 是否缩放并适配外围大小
   * @param fitPadding 适配外围的留白
   * @param easing 是否缓动
   */
  scrollPageBoundsToCenter(
    zoomToFit: boolean = true,
    fitPadding = 16,
    easing = true
  ): Promise<void> {
    const pageBounds = this.getPageBounds()
    if (pageBounds) {
      let zoom: number | undefined
      const fitPaddingDouble = fitPadding * 2
      if (zoomToFit) {
        const fixedScale = SizeSchema.fixSize(
          {
            width: pageBounds.width,
            height: pageBounds.height,
          },
          {
            width:
              fitPaddingDouble > this.config.width
                ? fitPaddingDouble
                : this.config.width - fitPaddingDouble,
            height:
              fitPaddingDouble > this.config.height
                ? fitPaddingDouble
                : this.config.height - fitPaddingDouble,
          }
        )
        zoom = fixedScale
      }
      return this.scrollToView({
        bounds: pageBounds,
        zoom,
        scrollToCenter: true,
        // selection: false,
        easing,
      })
    }
    return this.scrollToView({ easing })
  }

  private cancelScrollTeeen?: Disposable

  /**
   * 滚动
   * @param scroll
   * @param easing - 是否开启缓动，默认开启
   * @param easingDuration - 滚动持续时间，默认 300ms
   */
  scroll(
    scroll: Partial<{ scrollX: number; scrollY: number; zoom: number }>,
    easing: boolean = true,
    easingDuration = 300
  ): Promise<void> {
    const deferred = new PromiseDeferred<void>()
    if (this.cancelScrollTeeen) this.cancelScrollTeeen.dispose()
    if (easing) {
      const fromValues = {
        scrollX: this.config.scrollX,
        scrollY: this.config.scrollY,
        zoom: this.config.zoom,
      }
      this.cancelScrollTeeen = startTween({
        from: fromValues,
        to: {
          ...fromValues,
          ...scroll,
        },
        onUpdate: (v) => {
          this.updateConfig(v)
        },
        onComplete: () => {
          this.cancelScrollTeeen = undefined
          deferred.resolve()
        },
        onDispose: () => {
          deferred.resolve()
        },
        duration: easingDuration,
      })
    } else {
      this.updateConfig(scroll)
      deferred.resolve()
    }
    return deferred.promise
  }

  /**
   * 让 layer 的 node 节点不随着画布滚动条滚动
   * @param layerNode
   */
  fixLayerPosition(layerNode: HTMLElement): void {
    domUtils.setStyle(layerNode, {
      left: this.config.scrollX,
      top: this.config.scrollY,
    })
  }

  get loading(): boolean {
    return this._loading
  }

  set loading(loading: boolean) {
    if (this.loading !== loading) {
      this._loading = loading
      this.fireChange()
    }
  }

  /**
   * @deprecated use 'zoomDisable' instead
   */
  get zoomEnable(): boolean {
    return this._zoomEnable
  }

  /**
   * 开启缩放
   * @deprecated use 'zoomDisable' instead
   */
  set zoomEnable(zoomEnable: boolean) {
    if (this._zoomEnable !== zoomEnable) {
      this._zoomEnable = zoomEnable
      this.fireChange()
    }
  }

  /**
   * 放大
   */
  zoomin(easing?: boolean, easingDuration?: number): void {
    const unit = this.config.zoom / 10
    const newZoom = Math.ceil((this.config.zoom + unit) * 10) / 10
    this.updateZoom(newZoom, easing, easingDuration)
  }

  /**
   * 缩小
   */
  zoomout(easing?: boolean, easingDuration?: number): void {
    const unit = this.config.zoom / 10
    const newZoom = Math.floor((this.config.zoom - unit) * 10) / 10
    this.updateZoom(newZoom, easing, easingDuration)
  }

  updateZoom(newZoom: number, easing: boolean = true, easingDuration = 200): void {
    newZoom = this.normalizeZoom(newZoom)
    const { center } = this.getViewport()
    const oldScale = this.finalScale
    const newScale = !this.zoomEnable ? oldScale : newZoom
    if (newScale !== oldScale) {
      const delta = {
        x: center.x * newScale - center.x * oldScale,
        y: center.y * newScale - center.y * oldScale,
      }
      this.scroll(
        {
          scrollX: this.config.scrollX + delta.x,
          scrollY: this.config.scrollY + delta.y,
          zoom: newZoom,
        },
        easing,
        easingDuration
      )
    }
  }
  get disabled(): boolean {
    return this.config.disabled
  }
  get readonly(): boolean {
    return this.config.readonly
  }
  get readonlyOrDisabled(): boolean {
    return this.config.readonly || this.config.disabled
  }
  set readonly(readonly) {
    this.updateConfig({
      readonly
    })
  }
  set disabled(disabled) {
    this.updateConfig({
      disabled
    })
  }

  /**
   * 适应大小
   * @param bounds 目标大小
   * @param easing 是否开启动画，默认开启
   * @param padding 边界空白
   * @param easingDuration
   */
  fitView(bounds: Rectangle, easing = true, padding = 0, easingDuration = 300): Promise<void> {
    const viewport = this.getViewport(false);
    const zoom = SizeSchema.fixSize(bounds.clone().pad(padding, padding), viewport);
    return this.scrollToView({
      bounds,
      zoom,
      easing,
      easingDuration,
      scrollToCenter: true,
    });

  }
}
