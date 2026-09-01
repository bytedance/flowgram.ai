/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Disposable, domUtils } from '@flowgram.ai/utils';

import {
  PlaygroundConfigEntity,
  PlaygroundDrag,
  PlaygroundGesture,
  scrollIntoViewWithTween,
} from '../src/core';
import { createPlayground } from '../__mocks__/playground-container.mock';

interface Config {
  onPinch: (props: {
    origin: number[];
    first: boolean;
    last: boolean;
    movement: any;
    offset: number[];
  }) => void;
}

interface PinchConfig {
  pinch: {
    scaleBounds: () => void;
    from: () => number[];
  };
}

vi.mock('@use-gesture/vanilla', () => {
  class MockGesture {
    config: any;

    constructor(target: HTMLElement, config: Config, pinchConfig: PinchConfig) {
      this.config = {
        target,
        config,
        pinchConfig,
      };
      config.onPinch({
        origin: [1, 2],
        first: true,
        last: true,
        movement: [],
        offset: [1, 2],
      });
      pinchConfig.pinch.scaleBounds();
      pinchConfig.pinch.from();
    }
  }
  return {
    Gesture: MockGesture,
  };
});
const { startDrag } = PlaygroundDrag;

describe('utils', () => {
  let playgroundDrag: PlaygroundDrag<any>;
  beforeEach(() => {
    const onDragStart = vi.fn();
    const onDrag = vi.fn();
    const onDragEnd = vi.fn();
    playgroundDrag = new PlaygroundDrag<any>({
      onDragStart,
      onDrag,
      onDragEnd,
    });
  });
  it('PlaygroundDrag', () => {
    const playground = createPlayground();
    playground.ready();
    const entity =
      playground.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)!;
    // 绑定 _playgroundConfigEntity
    playgroundDrag.start(0, 0, entity);
    playgroundDrag.stop(100, 100);
    expect(playgroundDrag.isStarted).toEqual(false);
    playgroundDrag.dispose();
    playgroundDrag.start(100, 100);
    playgroundDrag.stop(100, 100);
    // 触发滚动
    playgroundDrag.fireScroll('scrollX', true);
    const dispose = startDrag(20, 20, {
      onDragStart: (e) => {
        expect(e?.startPos).toEqual({ x: 20, y: 20 });
      },
      onDragEnd: (e) => {
        expect(e?.startPos).toEqual({ x: 20, y: 20 });
        expect(e?.endPos).toEqual({ x: 0, y: 0 });
      },
    });
    dispose.dispose();
  });

  it('PlaygroundDrag with entity', () => {
    const playground = createPlayground();
    playgroundDrag.start(100, 100, playground.config);
  });

  it('PlaygroundDrag should stop when a second touch joins', () => {
    const onDragEnd = vi.fn();
    const dragger = new PlaygroundDrag<any>({
      onDragEnd,
    });
    const touches = [
      { clientX: 20, clientY: 30, screenX: 20, screenY: 30 },
      { clientX: 120, clientY: 130, screenX: 120, screenY: 130 },
    ];
    const touchMoveEvent = new Event('touchmove', {
      bubbles: true,
      cancelable: true,
    }) as TouchEvent;

    Object.defineProperties(touchMoveEvent, {
      touches: { value: touches },
      changedTouches: { value: [] },
    });

    dragger.start(10, 10);
    dragger.handleEvent(touchMoveEvent);

    expect(onDragEnd).toHaveBeenCalledTimes(1);
    expect(dragger.isStarted).toBe(false);
  });

  it('mock mouse event', () => {
    const playground = createPlayground();
    playground.ready();
    const entity =
      playground.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)!;
    // 绑定 _playgroundConfigEntity
    playgroundDrag.start(0, 0, entity);
    // mouse move
    const mouseMoveEvent: MouseEvent = new MouseEvent('mousemove', <MouseEventInit>{
      movementX: 1,
      movementY: 2,
    });
    playgroundDrag.handleEvent(mouseMoveEvent);
    // mouse up
    const mouseUpEvent: MouseEvent = new MouseEvent('mouseup', <MouseEventInit>{
      button: 1,
    });
    playgroundDrag.handleEvent(mouseUpEvent);
    // key down
    const keyDownEvent: MouseEvent = new MouseEvent('keydown', <MouseEventInit>{
      keyCode: 27,
    });
    (keyDownEvent as MouseEvent & { keyCode: number }).keyCode = 27;
    // expect(keyDownEvent.keyCode).toEqual(27)
    playgroundDrag.handleEvent(keyDownEvent);
    // contextmenu
    const contextMenuEvent: MouseEvent = new MouseEvent('contextmenu', <MouseEventInit>{
      bubbles: true,
    });
    playgroundDrag.handleEvent(contextMenuEvent);
    // default
    const defaultEvent: MouseEvent = new MouseEvent('click', <MouseEventInit>{
      clientX: 100,
      clientY: 100,
    });
    playgroundDrag.handleEvent(defaultEvent);
  });

  it('playground-gesture', () => {
    const playground = createPlayground();
    playground.ready();
    const entity =
      playground.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)!;
    const target = domUtils.createDivWithClass('test-target');
    new PlaygroundGesture(target, entity);
    document.dispatchEvent(new Event('gesturestart'));
  });

  it('tween', () => {
    const ret1 = scrollIntoViewWithTween({
      getScrollParent: () => undefined,
      getTargetNode: () => undefined,
      duration: 300,
    });
    expect(ret1).toEqual(Disposable.NULL);
    const parent = domUtils.createDivWithClass('test-parent');
    const dom2 = domUtils.createDivWithClass('test-node');
    const ret2 = scrollIntoViewWithTween({
      getScrollParent: () => parent,
      getTargetNode: () => dom2,
      duration: 300,
    });
    expect(ret2).toEqual(Disposable.NULL);
    parent.style.width = '300px';
    parent.style.height = '300px';
    parent.scrollTop = 20;
  });
});
