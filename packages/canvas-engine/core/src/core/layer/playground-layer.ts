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
 * MOUSE: 榧犳爣鍙嬪ソ妯″紡锛岄紶鏍囧乏閿嫋鍔ㄧ敾甯冿紝婊氬姩缂╂斁 (閫傚悎 windows )
 * PAD: 鍙屾寚鍚屽悜绉诲姩鎷栧姩锛屽弻鎸囧紶寮€鎹忓悎缂╂斁 (閫傚悎 mac)
 */
export type PlaygroundInteractiveType = 'MOUSE' | 'PAD';

export interface PlaygroundLayerOptions extends LayerOptions {
  /**
   * 闃绘娴忚鍣ㄩ粯璁ょ殑鎵嬪娍锛堣嫻鏋滆Е鎽告澘锛夛紝鍖呭惈锛氭斁澶х缉灏忋€佸乏鍙虫粦鍔ㄧ炕椤碉紝榛樿涓?false
   */
  preventGlobalGesture?: boolean;

  ineractiveType?: PlaygroundInteractiveType;

  /** 鎮诞鏈嶅姟 */
  hoverService?: {
    /** 绮剧‘鍒ゆ柇褰撳墠榧犳爣浣嶇疆鏄惁鏈夊厓绱犲瓨鍦?*/
    isSomeHovered: () => boolean;
    updateHoverPosition: (position: PositionSchema, target?: HTMLElement) => void;
    clearHovered: () => void;
  };
}

/**
 * 鍩虹灞傦紝鎺у埗鐢诲竷缂╂斁/婊氬姩绛夋搷浣? */
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
     * 闃绘榛樿鐨勬祻瑙堝櫒鎵嬪娍缂╂斁
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
       * 闃叉婊氬姩浜嬩欢琚€忓嚭鍒颁笟鍔″眰婊氬姩
       */
      domUtils.addStandardDisposableListener(this.playgroundNode, 'wheel', (event: WheelEvent) => {
        // 鍒ゆ柇褰撳墠 scrollParent锛屾湁婊氬姩鏉″垯鍋滄婊氬姩
        if (this.getScrollParent(event.target as HTMLElement)) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
      }),
      /**
       * 鍦ㄧ埗鑺傜偣涓婄洃鍚粴鍔ㄤ簨浠?       */
      this.listenPlaygroundEvent(
        'wheel',
        this.handleWheelEvent.bind(this),
        PipelineLayerPriority.BASE_LAYER,
        { passive: true }
      ),
      /**
       * 鐩戝惉瑙︽帶鎷栧姩鐢诲竷鎿嶄綔
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
        // 杩欓噷蹇呴』鐩戝惉 NORMAL_LAYER锛岃鍥惧眰鏈€鍏堣Е鍙?        PipelineLayerPriority.NORMAL_LAYER
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

          // 鎸変綇涓敭锛岃繘鍏ユ嫋鎷芥ā寮忥紝榧犳爣妯″紡涓嶆敮鎸?          if (isMouseCenterButton && !this.isMouseMode()) {
            this.editorStateConfig.changeState(EditorState.STATE_GRAB.id);
          }

          // 瑙︽帶鏉挎ā寮忎笅锛岀洰鍓嶆敮鎸佹寜浣?space 閿垨鑰呴紶鏍囦腑閿悗鎷栧姩
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

          // 濡傛灉鏄紶鏍囦紭鍏堟ā寮忥紝褰撳墠浣嶇疆涓嶆槸鑺傜偣锛屽苟涓旀病鏈夋寜涓?shift锛屾墠鍚姩鎷栨嫿
          if (this.isMouseMode() && !isSomeHovered && !this.editorStateConfig.isPressingShift) {
            this.grabDragger.start(e.clientX, e.clientY);
          }
        },
        // 杩欓噷蹇呴』鐩戝惉 NORMAL_LAYER锛岃鍥惧眰鏈€鍏堣Е鍙?        PipelineLayerPriority.NORMAL_LAYER
      ),

      this.editorStateConfig.onStateChange(this.onStateChanged.bind(this)),

      // 鍗曠嫭鐩戝惉 shift 鎸夐敭
      // 鍙湁 keydown 鑳界洃鍚埌 shift 鎸夐敭锛宬eypress 鏃犳硶鐩戝惉鍒?      this.listenGlobalEvent(
        'keydown',
        (e: KeyboardEvent) => {
          if (e.shiftKey) {
            this.editorStateConfig.isPressingShift = true;

            // 濡傛灉鏄紶鏍囦紭鍏堬紝鎸変綇 shift 閿渶瑕佹洿鏂伴紶鏍囦负榛樿
            if (this.isMouseMode()) {
              this.config.updateCursor('');
            }
          }
        },
        PipelineLayerPriority.BASE_LAYER
      ),

      // 鐩戝惉蹇嵎閿?      this.listenGlobalEvent(
        'keypress',
        (e: KeyboardEvent) => {
          if (!this.isFocused || e.target !== this.playgroundNode) return;

          // PS: 濡傛灉鏄紶鏍囦紭鍏堟ā寮忥紝涓嶇洃鍚揩鎹烽敭
          if (this.isMouseMode()) {
            return;
          }

          const state = this.editorStateConfig.getStateFromShortcut(e);

          // 浣跨敤鍦烘櫙锛?          // 鍦ㄦ寜浣忕┖鏍兼椂锛堣繘鍏?grab 妯″紡锛夛紝姝ゆ椂鐐瑰嚮宸ュ叿鏍忕殑鎵嬪瀷宸ュ叿锛岄渶绂佹閫€鍑?grab 妯″紡
          // 闇€瑕佽涓氬姟渚ф劅鐭ユ槸鍚︽寜浣忕┖鏍?          if (e.key === ' ') {
            this.editorStateConfig.isPressingSpaceBar = true;
          }

          // 閮ㄥ垎鐘舵€佷笉鍏佽閲嶅杩涘叆
          if (
            state?.shortcutWorksOnlyOnStateChanged === true &&
            state === this.editorStateConfig.getCurrentState()
          ) {
            return;
          }

          // Only record matched shortcuts. Unrelated keys (e.g. "+" while holding
          // Space) must not clear lastShortcutState, or Space keyup can no longer
          // auto-esc grab mode (#756).
          if (state) {
            this.lastShortcutState = state;
            this.editorStateConfig.changeState(state.id);
          }
        },
        PipelineLayerPriority.BASE_LAYER
      ),
      this.listenGlobalEvent('keyup', (e: KeyboardEvent) => {
        if (e.key === ' ') {
          this.editorStateConfig.isPressingSpaceBar = false;
        }

        if (!e.shiftKey) {
          this.editorStateConfig.isPressingShift = false;
        }

        if (this.lastShortcutState && this.lastShortcutState.shortcutAutoEsc) {
          const shortcutKey =
            this.lastShortcutState.shortcut === 'SPACE'
              ? ' '
              : (this.lastShortcutState.shortcut || '').toLowerCase();
          // Exit only when the shortcut key itself is released (#756).
          if (e.key.toLowerCase() === shortcutKey) {
            this.editorStateConfig.toDefaultState();
            this.lastShortcutState = undefined;
          }
        }
      }),
      {
        // 鍦ㄨ繘鍏?grab 妯″紡鍚庯紝姝ゆ椂鍚庨€€椤甸潰锛岄渶娓呯悊鏍峰紡
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
    // 鍒囨崲鍒伴紶鏍囨ā寮?    if (this.options.ineractiveType === 'MOUSE') {
      this.editorStateConfig.changeState(EditorState.STATE_MOUSE_FRIENDLY_SELECT.id);
    }
  }

  private getCursor(cursor: string | undefined) {
    if (!cursor) {
      return '';
    }
    return this.playgroundConfigEntity.getCursors?.()?.[cursor] ?? cursor;
  }

  /** 鏄惁涓洪紶鏍囦紭鍏堟ā寮?*/
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

    // 閬垮厤瑙﹀彂鎺т欢浜や簰
    if (state.cursor === 'grab' || state.cursor === 'grabbing') {
      // 鍦ㄩ紶鏍囦紭鍏堜氦浜掓ā寮忎笅锛屽簲璇ヨ鍏佽鎺т欢浜や簰锛屽彲浠ラ€夋嫨鑺傜偣鎷栧姩
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
    // 鎸?esc 閫€鍑?    if (state.cancelMode === 'esc') {
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
      // 鍙墽琛屼竴娆?      this.editorStateConfig.toDefaultState();
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
        // 鍙兘宸茬粡鍙栨秷浜?        this.config.updateCursor('grab');
      }

      // 濡傛灉鎷栨嫿瑙﹀彂鑷腑閿紝闇€浠庢嫋鎷芥€侀€€鍑猴紝涓旈噸缃厜鏍?      const isMouseCenterButton = e.button === 1;
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

    // STATE_GRAB 鍜?STATE_MOUSE_FRIENDLY_SELECT 閮藉厑璁告嫋鍔?    return (
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
   * 鐩戝惉婊氬姩浜嬩欢
   * @param event
   */
  protected handleWheelEvent(event: WheelEvent): void {
    const e = event as any;
    if ((this.currentGesture && this.currentGesture.pinching) || event.ctrlKey || event.metaKey)
      return;

    // 鍒ゆ柇褰撳墠 scrollParent锛屾湁婊氬姩鏉″垯鍋滄婊氬姩
    if (this.getScrollParent(event.target as HTMLElement)) {
      return;
    }

    // 榧犳爣浼樺厛妯″紡锛屼娇鐢ㄦ粴杞缉鏀撅紝骞朵笖鍦ㄥ綋鍓嶉紶鏍囦綅缃斁澶х缉灏?    if (this.isMouseMode()) {
      // 杩欓噷娌℃湁浣跨敤 this.config.zoomin 鍜?zoomout 鏂规硶
      // 鍥犱负杩欎袱涓柟娉曠洰鍓嶇湅娌℃湁瀹炵幇灞呬腑缂╂斁鐨勬晥鏋滐紝涓斾綋楠屾湁浜涘崱椤?      const { zoom, minZoom, maxZoom, scrollX, scrollY } = this.playgroundConfigEntity.config;

      // 榧犳爣妯″紡涓嬶紝涓轰簡閬垮厤杩囧揩缂╂斁锛岃繖閲屾瘮渚嬬浉瀵硅Е鎺ф澘妯″紡缂╁皬涓€鍊嶏紝杩欎釜鍙傛暟浠庝笟鍔′晶浼犺繃鏉ワ紝鍚屾椂鎻愪緵榛樿鍊?      const scaleStep = this.getMouseScaleDelta();
      const scaleMin = minZoom;
      const scaleMax = maxZoom;

      // 澶勭悊妯悜鍜岀珫鍚戞粴杞?      const getDelta = (wheelDelta: number): number => (wheelDelta > 0 ? -scaleStep : scaleStep);

      // 浼樺厛浣跨敤鍨傜洿婊氬姩锛屽鏋滃瀭鐩存粴鍔ㄤ负0鍒欎娇鐢ㄦ按骞虫粴鍔?      const wheelDelta = Math.abs(e.deltaY) > 0 ? e.deltaY : e.deltaX;
      const delta = getDelta(wheelDelta);

      const oldScale = this.config.finalScale;
      const originX = event.clientX;
      const originY = event.clientY;

      const newScale = Math.max(scaleMin, Math.min(scaleMax, zoom + delta));

      const origin = this.config.getPosFromMouseEvent(
        { clientX: originX, clientY: originY },
        false
      );

      // 璁＄畻鏀惧ぇ鍚庣殑浣嶇疆锛岄紶鏍囦綅缃眳涓缉鏀?      // 鍙傝 packages-ide-editor/common/core/src/core/utils/playground-gesture.ts
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
   * 鑾峰彇 wheel 浜嬩欢婊氬姩鐨勭埗鍏冪礌
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

    // 鍒涘缓鎵嬪娍
    if (this.config.zoomEnable) {
      this.createGesture();
    } else if (this.currentGesture) {
      this.currentGesture.dispose();
    }
    // // 璁剧疆 pipeline 鐨勬牱寮?    // if (scaleVisible) {
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
    // Note: 涓轰粈涔堣閫氳繃 style 娉ㄥ叆鏍峰紡
    // 鍘熷洜锛氬湪 pipelineNode.parentElement 涓婅缃?style.cursor锛屽瓙鍏冪礌缁ф壙鏍峰紡鏃?cursor 鏍峰紡浼樺厛绾т笉澶燂紙瀛愬厓绱犺嚜韬篃瀛樺湪 cursor 閰嶇疆锛?    if (cursor === 'grab' || cursor === 'grabbing') {
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
