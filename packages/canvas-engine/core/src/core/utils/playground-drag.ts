/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  Disposable,
  Emitter,
  generateLocalId,
  type LocalId,
  type Rectangle,
} from '@flowgram.ai/utils';

import type { PlaygroundConfigEntity } from '../layer/config';
import type { PositionSchema } from '../../common/schema/position-schema';
import { MouseTouchEvent } from './mouse-touch-event';

/* istanbul ignore next */
const SCROLL_DELTA = 4;
/* istanbul ignore next */
const SCROLL_AUTO_DISTANCE = 20; // 自动滚动到边缘距离
/* istanbul ignore next */
const SCROLL_INTERVAL = 6;

/* istanbul ignore next */
function createMouseEvent(type: string, clientX: number, clientY: number): MouseEvent {
  const event = document.createEvent('MouseEvent');
  event.initMouseEvent(
    type,
    true,
    true,
    // @ts-ignore
    undefined,
    0,
    0,
    0,
    clientX,
    clientY,
    false,
    false,
    false,
    false,
    0,
    null
  );
  return event;
}

export interface PlaygroundDragEvent extends MouseEvent {
  id: LocalId;
  startPos: PositionSchema;
  endPos: PositionSchema;
  movingDelta: PositionSchema; // 移动的偏移量
  scale: number;
  isMoving: boolean;
  isStart: boolean;
}

export interface PlaygroundDragOptions<T> {
  onDragStart?: (e: PlaygroundDragEvent, context?: T) => void;
  onDrag?: (e: PlaygroundDragEvent, context?: T) => void;
  onDragEnd?: (e: PlaygroundDragEvent, context?: T) => void;
  stopGlobalEventNames?: string[];
}

/* istanbul ignore next */
export class PlaygroundDrag<T = undefined> implements Disposable {
  private onDragStartEmitter = new Emitter<PlaygroundDragEvent>();

  private onDragEndEmitter = new Emitter<PlaygroundDragEvent>();

  private onDragEmitter = new Emitter<PlaygroundDragEvent>();

  private readonly _stopGlobalEventNames = [
    'mouseenter',
    'mouseleave',
    'mouseover',
    'mouseout',
    'contextmenu',
  ];

  private localId: LocalId;

  protected context?: T;

  readonly onDrag = this.onDragEmitter.event;

  readonly onDragStart = this.onDragStartEmitter.event;

  readonly onDragEnd = this.onDragEndEmitter.event;

  constructor(options: PlaygroundDragOptions<T> = {}) {
    if (options.onDragStart) this.onDragStart((e) => options.onDragStart!(e, this.context));
    if (options.onDrag) this.onDrag((e) => options.onDrag!(e, this.context));
    if (options.onDragEnd) this.onDragEnd((e) => options.onDragEnd!(e, this.context));
    if (options.stopGlobalEventNames) this._stopGlobalEventNames = options.stopGlobalEventNames;
  }

  get isStarted(): boolean {
    return !!this._promise;
  }

  start(
    clientX: number,
    clientY: number,
    entity?: PlaygroundConfigEntity,
    context?: T
  ): Promise<void> {
    if (this._disposed) {
      return Promise.resolve();
    }
    if (this._promise) {
      return this._promise;
    }
    this.context = context;
    this.localId = generateLocalId();
    this._addListeners();
    this._promise = new Promise((resolve) => {
      this._resolve = resolve;
    });
    this._playgroundConfigEntity = entity;
    const mousedown = createMouseEvent('mousedown', clientX, clientY);
    this._startPos = this.getRelativePos(mousedown);
    this.onDragStartEmitter.fire(this.getDragEvent(mousedown));
    return this._promise;
  }

  stop(clientX: number, clientY: number): void {
    if (this._disposed || !this._promise) {
      return;
    }
    const mouseup = createMouseEvent('mouseup', clientX, clientY);
    this.handleEvent(mouseup);
  }

  dispose(): void {
    if (this._disposed) return;
    this._stopScrollX();
    this._stopScrollY();
    this._disposed = true;
    this.onDragEmitter.dispose();
    this.onDragStartEmitter.dispose();
    this.onDragEndEmitter.dispose();
    this._finalize();
  }

  handleEvent(_event: Event): void {
    if (MouseTouchEvent.isTouchEvent(_event as TouchEvent)) {
      const touchEvent = _event as TouchEvent;
      if (touchEvent.touches.length > 1) {
        const { clientX, clientY } = MouseTouchEvent.getEventCoord(touchEvent);
        this._evtMouseUp(createMouseEvent('mouseup', clientX, clientY));
        return;
      }
    }
    const event = MouseTouchEvent.touchToMouseEvent(_event);
    switch (event.type) {
      case 'mousemove':
        this._evtMouseMove(event as MouseEvent);
        break;
      case 'mouseup':
        this._stopScrollX();
        this._stopScrollY();
        this._evtMouseUp(event as MouseEvent);
        break;
      case 'keydown':
        this._evtKeyDown(event as KeyboardEvent);
        break;
      // TODO 暂时屏蔽右键菜单
      case 'contextmenu':
        const mouseup = createMouseEvent(
          'mouseup',
          (event as MouseEvent).clientX,
          (event as MouseEvent).clientY
        );
        this._evtMouseUp(mouseup);
        break;
      default:
        // Stop all other events during drag-drop.
        MouseTouchEvent.preventDefault(event);
        event.stopPropagation();
        break;
    }
  }

  get scale(): number {
    return this._playgroundConfigEntity ? this._playgroundConfigEntity.finalScale : 1;
  }

  protected getRelativePos(event: MouseEvent): PositionSchema {
    if (this._playgroundConfigEntity) {
      return this._playgroundConfigEntity.getPosFromMouseEvent(event, false);
    }
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }

  private _lastPos: PositionSchema = { x: 0, y: 0 };

  protected getDragEvent(event: MouseEvent): PlaygroundDragEvent {
    const startPos = this._startPos!;
    const { scale } = this;
    switch (event.type) {
      case 'mousedown':
        this._lastPos = startPos;
        return Object.assign(event, {
          id: this.localId,
          startPos,
          endPos: startPos,
          scale,
          movingDelta: { x: 0, y: 0 },
          isStart: true,
          isMoving: false,
        });
      case 'mousemove':
        const endPos = this.getRelativePos(event);
        const movingDelta = {
          x: endPos.x - this._lastPos.x,
          y: endPos.y - this._lastPos.y,
        };
        this._lastPos = endPos;
        return Object.assign(event, {
          id: this.localId,
          startPos,
          endPos,
          scale,
          isStart: true,
          movingDelta,
          isMoving: true,
        });
      case 'mouseup':
        this._lastPos = { x: 0, y: 0 };
        return Object.assign(event, {
          id: this.localId,
          startPos,
          endPos: this.getRelativePos(event),
          movingDelta: { x: 0, y: 0 },
          scale,
          isStart: false,
          isMoving: false,
        });
      default:
        throw new Error('unknown event');
    }
  }

  private _finalize(): void {
    const resolve = this._resolve;
    this._removeListeners();
    this._startPos = undefined;
    this._promise = undefined;
    this._resolve = undefined;
    if (resolve) {
      resolve();
    }
  }

  // 这个用于自动滚动时候使用
  private _lastMouseMoveEvent?: MouseEvent;

  /**
   * Handle the `'mousemove'` event for the drag object.
   */
  private _evtMouseMove(event: MouseEvent): void {
    // Stop all input events during drag-drop.
    event.preventDefault();
    event.stopPropagation();
    this._lastMouseMoveEvent = event;
    const dragEvent = this.getDragEvent(event);
    // Update the playground scroller.
    this._updateDragScroll(dragEvent);
    this.onDragEmitter.fire(dragEvent);
  }

  /**
   * Handle the `'mouseup'` event for the drag object.
   */
  private _evtMouseUp(event: MouseEvent): void {
    this._lastMouseMoveEvent = undefined;
    // Stop all input events during drag-drop.
    event.preventDefault();
    event.stopPropagation();

    // Do nothing if the left or center button is not released.
    if (event.button !== 0 && event.button !== 1) {
      return;
    }
    this.onDragEndEmitter.fire(this.getDragEvent(event));
    this._finalize();
  }

  /**
   * Handle the `'keydown'` event for the drag object.
   */
  private _evtKeyDown(event: KeyboardEvent): void {
    // Stop all input events during drag-drop.
    event.preventDefault();
    event.stopPropagation();

    // Cancel the drag if `Escape` is pressed.
    if (event.keyCode === 27) {
      this.stop(NaN, NaN);
    }
  }

  /**
   * Add the document event listeners for the drag object.
   */
  private _addListeners(): void {
    // mouse
    document.addEventListener('mousedown', this, true);
    document.addEventListener('mousemove', this, true);
    document.addEventListener('mouseup', this, true);

    // touch
    document.addEventListener('touchstart', this, true);
    document.addEventListener('touchmove', this, { passive: false });
    document.addEventListener('touchend', this, true);
    document.addEventListener('touchcancel', this, true);

    this._stopGlobalEventNames.forEach((_event) => {
      document.addEventListener(_event, this, true);
    });
  }

  /**
   * Remove the document event listeners for the drag object.
   */
  private _removeListeners(): void {
    // mouse
    document.removeEventListener('mousedown', this, true);
    document.removeEventListener('mousemove', this, true);
    document.removeEventListener('mouseup', this, true);

    // touch
    document.removeEventListener('touchstart', this, true);
    document.removeEventListener('touchmove', this);
    document.removeEventListener('touchend', this, true);
    document.removeEventListener('touchcancel', this, true);

    this._stopGlobalEventNames.forEach((_event) => {
      document.removeEventListener(_event, this, true);
    });
  }

  /**
   * 自动滚动画布
   */
  private _updateDragScroll = (event: PlaygroundDragEvent): void => {
    if (!this._playgroundConfigEntity) return;
    const playgroundConfig = this._playgroundConfigEntity.config;
    const dragPos = event.endPos;
    const { scrollX, width, height, scrollY } = playgroundConfig;
    if (dragPos.x > width + scrollX - SCROLL_AUTO_DISTANCE) {
      this._startScrollX(scrollX, true);
    } else if (dragPos.x < scrollX + SCROLL_AUTO_DISTANCE) {
      this._startScrollX(scrollX, false);
    } else {
      this._stopScrollX();
    }
    if (dragPos.y > height + scrollY - SCROLL_AUTO_DISTANCE) {
      this._startScrollY(scrollY, true);
    } else if (dragPos.y < scrollY + SCROLL_AUTO_DISTANCE) {
      this._startScrollY(scrollY, false);
    } else {
      this._stopScrollY();
    }
  };

  private _scrollXInterval: { interval: number; origin: number } | undefined;

  private _scrollYInterval: { interval: number; origin: number } | undefined;

  private _startScrollX(origin: number, added: boolean): void {
    if (this._scrollXInterval) {
      return;
    }
    const interval = window.setInterval(() => {
      const current = this._scrollXInterval!;
      if (!current) return;
      this.fireScroll('scrollX', added);
    }, SCROLL_INTERVAL);
    this._scrollXInterval = { interval, origin };
  }

  private _stopScrollX(): void {
    if (this._scrollXInterval) {
      clearInterval(this._scrollXInterval.interval);
      this._scrollXInterval = undefined;
    }
  }

  private _startScrollY(origin: number, added: boolean): void {
    if (this._scrollYInterval) {
      return;
    }
    const interval = window.setInterval(() => {
      this.fireScroll('scrollY', added);
    }, SCROLL_INTERVAL);
    this._scrollYInterval = { interval, origin };
  }

  private _stopScrollY(): void {
    if (this._scrollYInterval) {
      clearInterval(this._scrollYInterval.interval);
      this._scrollYInterval = undefined;
    }
  }

  /**
   * 触发滚动
   * @param scrollKey
   * @param added
   */
  fireScroll(scrollKey: 'scrollY' | 'scrollX', added: boolean): void {
    const current = scrollKey === 'scrollY' ? this._scrollYInterval : this._scrollXInterval;
    if (!current) return;
    const value = (current.origin = added
      ? current.origin + SCROLL_DELTA
      : current.origin - SCROLL_DELTA);
    const oldScroll = this._playgroundConfigEntity!.config[scrollKey];
    this._playgroundConfigEntity!.updateConfig({
      [scrollKey]: value,
    });
    const newScroll = this._playgroundConfigEntity!.config[scrollKey];
    if (newScroll !== oldScroll) {
      const lastMouseMoveEvent = this._lastMouseMoveEvent!;
      const delta = {
        x: scrollKey === 'scrollX' ? newScroll - current.origin : 0,
        y: scrollKey === 'scrollY' ? newScroll - current.origin : 0,
      };
      const mouseMove = createMouseEvent(
        'mousemove',
        lastMouseMoveEvent.clientX + delta.x,
        lastMouseMoveEvent.clientY + delta.y
      );
      const dragEvent = this.getDragEvent(mouseMove);
      this.onDragEmitter.fire(dragEvent);
    }
  }

  private _disposed = false;

  private _promise?: Promise<void>;

  private _resolve?: () => void;

  private _startPos?: PositionSchema;

  private _playgroundConfigEntity?: PlaygroundConfigEntity;
}

let dragCache: PlaygroundDrag<any> | undefined;

export interface PlaygroundDragEntitiesOpts<T> extends PlaygroundDragOptions<T> {
  // entities?: Entity[]; // 需要拖动的实体，会自动修改 position
  context?: T; // 上下文
  config?: PlaygroundConfigEntity;
  adsorbRefs?: Rectangle[]; // 需要吸附的矩形
  // adsorbLines?: Adsorber.Line[]; // 需要吸附的线
}

/* istanbul ignore next */
export namespace PlaygroundDrag {
  /**
   * 拖拽实体
   */
  export function startDrag<T>(
    clientX: number,
    clientY: number,
    opts: PlaygroundDragEntitiesOpts<T> = {}
  ): Disposable {
    if (dragCache) {
      dragCache.stop(NaN, NaN);
    }
    // const { entities } = opts;
    // const ableManager = entities && entities.length >= 1 ? entities[0].ableManager : undefined;
    const dragger = (dragCache = new PlaygroundDrag<T>({
      onDragStart(e, ctx): void {
        // if (ableManager) {
        //   // 添加拖拽能力
        //   entities!.forEach(n => n.addAbles(Dragable));
        //   ableManager.dispatch<DragablePayload>(DragablePayload, e);
        // }
        if (opts.onDragStart) opts.onDragStart(e, ctx);
      },
      onDrag(e, ctx): void {
        // if (ableManager) {
        //   ableManager.dispatch<DragablePayload>(DragablePayload, {
        //     ...e,
        //     adsorbRefs: opts.adsorbRefs,
        //     adsorbLines: opts.adsorbLines,
        //   });
        // }
        if (opts.onDrag) opts.onDrag(e, ctx);
      },
      onDragEnd(e, ctx): void {
        // if (ableManager) {
        //   ableManager.dispatch<DragablePayload>(DragablePayload, e);
        //   // 去除拖拽能力
        //   entities!.forEach(n => n.removeAbles(Dragable));
        // }
        if (opts.onDragEnd) opts.onDragEnd(e, ctx);
        dragger.dispose();
        if (dragCache === dragger) dragCache = undefined;
      },
    }));
    dragger.start(clientX, clientY, opts.config, opts.context);
    return Disposable.create(() => {
      dragger.stop(0, 0);
      dragger.dispose();
      if (dragCache === dragger) {
        dragCache = undefined;
      }
    });
  }
}
