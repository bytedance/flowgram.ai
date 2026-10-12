/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable, optional } from 'inversify';
import { Disposable, domUtils, PositionSchema } from '@flowgram.ai/utils';

import { Gesture } from '../utils/use-gesture';
import { PlaygroundGesture } from '../utils/playground-gesture';
import { MouseTouchEvent, PlaygroundDrag } from '../utils';
import { PipelineLayerPriority } from '../pipeline';
import { ProtectWheelArea } from '../../common/protect-wheel-area';
import { observeEntity } from '../../common';
import { Layer, LayerOptions } from './layer';
import {
  EditorState,
  type EditorStateChangeEvent,
  EditorStateConfigEntity,
  PlaygroundConfigEntity,
  type PlaygroundConfigEntityData,
} from './config';

/**
 * MOUSE: 鼠标友好模式，鼠标左键拖动画布，滚动缩放 (适合 windows )
 * PAD: 双指同向移动拖动，双指张开捏合缩放 (适合 mac)
 */
export type PlaygroundInteractiveType = 'MOUSE' | 'PAD';

export interface PlaygroundLayerOptions extends LayerOptions {
  /**
   * 阻止浏览器默认的手势（苹果触摸板），包含：放大缩小、左右滑动翻页，默认为 false
   */
  preventGlobalGesture?: boolean;

  ineractiveType?: PlaygroundInteractiveType;

  /** 悬浮服务 */
  hoverService?: {
    /** 精确判断当前鼠标位置是否有元素存在 */
    isSomeHovered: () => boolean;
    updateHoverPosition: (position: PositionSchema, target?: HTMLElement) => void;
    clearHovered: () => void;
  };
}

/**
 * 基础层，控制画布缩放/滚动等操作
 */
@injectable()
export class PlaygroundLayer extends Layer<PlaygroundLayerOptions> {
  @observeEntity(PlaygroundConfigEntity)
  protected playgroundConfigEntity: PlaygroundConfigEntity;

  @observeEntity(EditorStateConfigEntity)
  protected editorStateConfig: EditorStateConfigEntity;

  @optional()
  @inject(ProtectWheelArea)
  protectWheelArea?: ProtectWheelArea;

  private cancelStateListen?: Disposable;

  private lastShortcutState?: EditorState;

  private currentGesture?: PlaygroundGesture;

  private startGrabScroll: { scrollX: number; scrollY: number } = {
    scrollX: 0,
    scrollY: 0,
  };

  private cursorStyle: HTMLStyleElement = document.createElement('style');

  private maskNode: HTMLDivElement = document.createElement('div');

  onReady(): void {
    this.options = {
      preventGlobalGesture: false,
      ...this.options,
    };
    /**
     * 阻止默认的浏览器手势缩放
     */
    if (this.options.preventGlobalGesture) {
      const gesturePreventGlobal = new Gesture(document.body, {
        /* v8 ignore next 3 */
        onPinch: () => {
          // Do nothing
        },
      });
      if (document.documentElement) {
        document.documentElement.style.overscrollBehaviorX = 'none';
      }
      document.body.style.overscrollBehaviorX = 'none';
      this.toDispose.push(Disposable.create(() => gesturePreventGlobal.destroy()));
    }
    this.toDispose.pushAll([
      this.config.onGrabDisableChange((disable) => {
        if (disable) {
          this.grabDragger.stop(0, 0);
        }
      }),
      /**
       * 防止滚动事件被透出到业务层滚动
       */
      domUtils.addStandardDisposableListener(this.playgroundNode, 'wheel', (event: WheelEvent) => {
        // 判断当前 scrollParent，有滚动条则停止滚动
        if (this.getScrollParent(event.target as HTMLElement)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
      }),
      /**
       * 在父节点上监听滚动事件
       */
      this.listenPlaygroundEvent(
        'wheel',
        this.handleWheelEvent.bind(this),
        PipelineLayerPriority.BASE_LAYER,
        { passive: true }
      ),
      /**
       * 监听触控拖动画布操作
       */
      this.listenPlaygroundEvent(
        'touchstart',
        (e: TouchEvent) => {
          if (e.touches.length > 1) {
            return;
          }
          const { clientX: x, clientY: y } = MouseTouchEvent.getEventCoord(e);
          if (!this.options?.hoverService) {
            return;
          }
          this.options.hoverService.updateHoverPosition(
            {
              x,
              y,
            },
            e.target as HTMLElement
          );
          const isSomeHovered = this.options.hoverService?.isSomeHovered();
          if (isSomeHovered) {
            return;
          }
          this.grabDragger.start(x, y);
        },
        // 这里必须监听 NORMAL_LAYER，该图层最先触发
        PipelineLayerPriority.NORMAL_LAYER
      ),
      this.listenPlaygroundEvent('touchend', (e: TouchEvent) => {
        this.options.hoverService?.clearHovered();
      }),
      this.listenPlaygroundEvent('touchcancel', (e: TouchEvent) => {
        this.options.hoverService?.clearHovered();
      }),
      this.listenPlaygroundEvent(
        'mousedown',
        (e: MouseEvent) => {
          const isMouseCenterButton = e.button === 1;

          // 按住中键，进入拖拽模式，鼠标模式不支持
          if (isMouseCenterButton && !this.isMouseMode()) {
            this.editorStateConfig.changeState(EditorState.STATE_GRAB.id);
          }

          // 触控板模式下，目前支持按住 space 键或者鼠标中键后拖动
          if (this.isGrab() && (this.editorStateConfig.isPressingSpaceBar || isMouseCenterButton)) {
            this.grabDragger.start(e.clientX, e.clientY);
          }
        },
        PipelineLayerPriority.BASE_LAYER
      ),
      this.listenPlaygroundEvent(
        'mousedown',
        (e: MouseEvent) => {
          const isSomeHovered = this.options?.hoverService?.isSomeHovered();

          // 如果是鼠标优先模式，当前位置不是节点，并且没有按下 shift，才启动拖拽
          if (this.isMouseMode() && !isSomeHovered && !this.editorStateConfig.isPressingShift) {
            this.grabDragger.start(e.clientX, e.clientY);
          }
        },
        // 这里必须监听 NORMAL_LAYER，该图层最先触发
        PipelineLayerPriority.NORMAL_LAYER
      ),

      this.editorStateConfig.onStateChange(this.onStateChanged.bind(this)),

      // 单独监听 shift 按键
      // 只有 keydown 能监听到 shift 按键，keypress 无法监听到
      this.listenGlobalEvent(
        'keydown',
        (e: KeyboardEvent) => {
          if (e.shiftKey) {
            this.editorStateConfig.isPressingShift = true;

            // 如果是鼠标优先，按住 shift 键需要更新鼠标为默认
            if (this.isMouseMode()) {
              this.config.updateCursor('');
            }
          }
        },
        PipelineLayerPriority.BASE_LAYER
      ),

      // 监听快捷键
      this.listenGlobalEvent(
        'keypress',
        (e: KeyboardEvent) => {
          if (!this.isFocused || e.target !== this.playgroundNode) return;

          // PS: 如果是鼠标优先模式，不监听快捷键
          if (this.isMouseMode()) {
            return;
          }

          const state = this.editorStateConfig.getStateFromShortcut(e);

          // 使用场景：
          // 在按住空格时（进入 grab 模式），此时点击工具栏的手型工具，需禁止退出 grab 模式
          // 需要让业务侧感知是否按住空格
          if (e.key === ' ') {
            this.editorStateConfig.isPressingSpaceBar = true;
          }

          // 部分状态不允许重复进入
          if (
            state?.shortcutWorksOnlyOnStateChanged === true &&
            state === this.editorStateConfig.getCurrentState()
          ) {
            return;
          }

          this.lastShortcutState = state;
          if (state) {
            this.editorStateConfig.changeState(state.id);
          }
        },
        PipelineLayerPriority.BASE_LAYER
      ),
      this.listenGlobalEvent('keyup', (e: KeyboardEvent) => {
        if (e.key === ' ') {
          this.editorStateConfig.isPressingSpaceBar = false;
        }

        this.editorStateConfig.isPressingShift = false;

        if (this.lastShortcutState && this.lastShortcutState.shortcutAutoEsc) {
          this.editorStateConfig.toDefaultState();
        }

        this.lastShortcutState = undefined;
      }),
      {
        // 在进入 grab 模式后，此时后退页面，需清理样式
        dispose: () => {
          if (this.maskNode.parentNode) {
            this.maskNode.parentNode.removeChild(this.maskNode);
          }
          if (this.cursorStyle.parentNode) {
            this.cursorStyle.parentNode.removeChild(this.cursorStyle);
          }
        },
      },
    ]);
    // 切换到鼠标模式
    if (this.options.ineractiveType === 'MOUSE') {
      this.editorStateConfig.changeState(EditorState.STATE_MOUSE_FRIENDLY_SELECT.id);
    }
  }

  private getCursor(cursor: string | undefined) {
    if (!cursor) {
      return '';
    }
    return this.playgroundConfigEntity.getCursors?.()?.[cursor] ?? cursor;
  }

  /** 是否为鼠标优先模式 */
  private isMouseMode() {
    return this.editorStateConfig.isMouseFriendlyMode();
  }

  onStateChanged(e: EditorStateChangeEvent): void {
    const { state } = e;
    if (this.cancelStateListen) {
      this.cancelStateListen.dispose();
      this.cancelStateListen = undefined;
    }
    if (state.handle) {
      state.handle(this.config, e);
    }
    if (state.cursor) {
      this.playgroundConfigEntity.updateCursor(state.cursor);
      if (this.currentGesture) {
        this.playgroundNode.style.cursor = this.getCursor(state.cursor);
      }
    } else {
      this.playgroundConfigEntity.updateCursor('');
      this.playgroundNode.style.cursor = '';
    }

    // 避免触发控件交互
    if (state.cursor === 'grab' || state.cursor === 'grabbing') {
      // 在鼠标优先交互模式下，应该要允许控件交互，可以选择节点拖动
      if (state === EditorState.STATE_MOUSE_FRIENDLY_SELECT) {
        return;
      }

      this.maskNode.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
      `;
      this.playgroundNode.appendChild(this.maskNode);
    } else {
      if (this.maskNode.parentNode) {
        this.maskNode.parentNode.removeChild(this.maskNode);
      }
    }
    // 按 esc 退出
    if (state.cancelMode === 'esc') {
      this.cancelStateListen = domUtils.addStandardDisposableListener(
        document.body,
        'keydown',
        (keyboard: KeyboardEvent) => {
          if (keyboard.key === 'Escape') {
            this.editorStateConfig.toDefaultState();
          }
        },
        true
      );
    } else if (state.cancelMode === 'once') {
      // 只执行一次
      this.editorStateConfig.toDefaultState();
    }
  }

  protected grabDragger = new PlaygroundDrag({
    onDragStart: (e) => {
      if (this.config.grabDisable) return;
      this.config.updateCursor('grabbing');
      this.startGrabScroll = {
        scrollX: this.config.config.scrollX,
        scrollY: this.config.config.scrollY,
      };
    },
    onDrag: (e) => {
      if (this.config.grabDisable) return;
      this.config.updateConfig({
        scrollX: this.startGrabScroll.scrollX - e.endPos.x + e.startPos.x,
        scrollY: this.startGrabScroll.scrollY - e.endPos.y + e.startPos.y,
      });
    },
    onDragEnd: (e) => {
      if (this.isGrab()) {
        // 可能已经取消了
        this.config.updateCursor('grab');
      }

      // 如果拖拽触发自中键，需从拖拽态退出，且重置光标
      const isMouseCenterButton = e.button === 1;
      if (isMouseCenterButton) {
        if (this.isMouseMode()) {
          this.editorStateConfig.changeState(EditorState.STATE_MOUSE_FRIENDLY_SELECT.id);
          this.config.updateCursor('grab');
        } else {
          this.editorStateConfig.toDefaultState();
          this.config.updateCursor('');
        }
      }
    },
  });

  protected isGrab(): boolean {
    const currentState = this.editorStateConfig.getCurrentState();

    // STATE_GRAB 和 STATE_MOUSE_FRIENDLY_SELECT 都允许拖动
    return (
      currentState === EditorState.STATE_GRAB ||
      currentState === EditorState.STATE_MOUSE_FRIENDLY_SELECT
    );
  }

  createGesture(): void {
    if (!this.currentGesture) {
      this.currentGesture = new PlaygroundGesture(this.playgroundNode, this.config);
      this.currentGesture.onDispose(() => {
        this.currentGesture = undefined;
      });
      this.toDispose.push(this.currentGesture);
    }
  }

  protected handleScrollEvent(event: WheelEvent): void {
    const { playgroundConfigEntity } = this;
    const scrollX = playgroundConfigEntity.config.scrollX + event.deltaX;
    const scrollY = playgroundConfigEntity.config.scrollY + event.deltaY;
    const state: Partial<PlaygroundConfigEntityData> = {
      scrollX,
      scrollY,
    };
    playgroundConfigEntity.updateConfig(state);
  }

  protected getMouseScaleDelta(): number {
    const { mouseScrollDelta, zoom } = this.config.config;
    if (typeof mouseScrollDelta === 'function') {
      return mouseScrollDelta(zoom);
    }
    return mouseScrollDelta!;
  }

  /**
   * 监听滚动事件
   * @param event
   */
  protected handleWheelEvent(event: WheelEvent): void {
    const e = event as any;
    if ((this.currentGesture && this.currentGesture.pinching) || event.ctrlKey || event.metaKey)
      return;

    // 判断当前 scrollParent，有滚动条则停止滚动
    if (this.getScrollParent(event.target as HTMLElement)) {
      return;
    }

    // 鼠标优先模式，使用滚轮缩放，并且在当前鼠标位置放大缩小
    if (this.isMouseMode()) {
      // 这里没有使用 this.config.zoomin 和 zoomout 方法
      // 因为这两个方法目前看没有实现居中缩放的效果，且体验有些卡顿
      const { zoom, minZoom, maxZoom, scrollX, scrollY } = this.playgroundConfigEntity.config;

      // 鼠标模式下，为了避免过快缩放，这里比例相对触控板模式缩小一倍，这个参数从业务侧传过来，同时提供默认值
      const scaleStep = this.getMouseScaleDelta();
      const scaleMin = minZoom;
      const scaleMax = maxZoom;

      // 处理横向和竖向滚轮
      const getDelta = (wheelDelta: number): number => (wheelDelta > 0 ? -scaleStep : scaleStep);

      // 优先使用垂直滚动，如果垂直滚动为0则使用水平滚动
      const wheelDelta = Math.abs(e.deltaY) > 0 ? e.deltaY : e.deltaX;
      const delta = getDelta(wheelDelta);

      const oldScale = this.config.finalScale;
      const originX = event.clientX;
      const originY = event.clientY;

      const newScale = Math.max(scaleMin, Math.min(scaleMax, zoom + delta));

      const origin = this.config.getPosFromMouseEvent(
        { clientX: originX, clientY: originY },
        false
      );

      // 计算放大后的位置，鼠标位置居中缩放
      // 参见 packages-ide-editor/common/core/src/core/utils/playground-gesture.ts
      const finalPos = {
        x: (origin.x / oldScale) * newScale,
        y: (origin.y / oldScale) * newScale,
      };
      this.config.updateConfig({
        scrollX: scrollX + finalPos.x - origin.x,
        scrollY: scrollY + finalPos.y - origin.y,
        zoom: newScale,
      });
      return;
    }

    this.handleScrollEvent(e);
  }

  /**
   * 获取 wheel 事件滚动的父元素
   * @param dom
   */
  protected getScrollParent(ele?: HTMLElement | null): HTMLElement | null {
    if (!ele || ele === this.pipelineNode.parentElement) {
      return null;
    }

    const hasScrollableXContent = ele.scrollWidth > ele.clientWidth;
    const hasScrollableYContent = ele.scrollHeight > ele.clientHeight;
    const overflowXStyle = window.getComputedStyle(ele).overflowX;
    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowXScrollable = ['auto', 'scroll', 'overlay'].includes(overflowXStyle);
    const isOverflowYScrollable = ['auto', 'scroll', 'overlay'].includes(overflowYStyle);

    const hasScrollableContent =
      (hasScrollableXContent && isOverflowXScrollable) ||
      (hasScrollableYContent && isOverflowYScrollable);

    if (hasScrollableContent || this.protectWheelArea?.(ele)) {
      return ele;
    }

    return this.getScrollParent(ele.parentElement);
  }

  autorun(): void {
    const playgroundConfig = this.playgroundConfigEntity.config;
    const { cursor } = this.playgroundConfigEntity;
    const finalCursor = this.getCursor(cursor);

    // 创建手势
    if (this.config.zoomEnable) {
      this.createGesture();
    } else if (this.currentGesture) {
      this.currentGesture.dispose();
    }
    // // 设置 pipeline 的样式
    // if (scaleVisible) {
    //   domUtils.setStyle(this.pipelineNode, {
    //     left: SCALE_WIDTH - playgroundConfig.scrollX,
    //     top: SCALE_WIDTH - playgroundConfig.scrollY,
    //     width: playgroundConfig.width,
    //     height: playgroundConfig.height,
    //   });
    // } else {
    // }
    domUtils.setStyle(this.pipelineNode, {
      left: -playgroundConfig.scrollX,
      top: -playgroundConfig.scrollY,
      width: playgroundConfig.width,
      height: playgroundConfig.height,
    });
    this.playgroundNode.style.cursor = finalCursor;
    // Note: 为什么要通过 style 注入样式
    // 原因：在 pipelineNode.parentElement 上设置 style.cursor，子元素继承样式时 cursor 样式优先级不够（子元素自身也存在 cursor 配置）
    if (cursor === 'grab' || cursor === 'grabbing') {
      let classSelector = '';
      this.playgroundNode.classList.forEach((className) => {
        classSelector += `.${className}`;
      });
      this.cursorStyle.innerText = `.${classSelector} * { cursor: ${finalCursor} }`;
      if (!this.cursorStyle.parentNode) {
        document.head.appendChild(this.cursorStyle);
      }
    } else {
      if (this.cursorStyle.parentNode) {
        this.cursorStyle.parentNode.removeChild(this.cursorStyle);
      }
    }
  }
}
