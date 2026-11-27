/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export namespace MouseTouchEvent {
  export const isTouchEvent = (event: TouchEvent | React.TouchEvent): event is TouchEvent =>
    'touches' in event;

  export const touchToMouseEvent = (event: Event, changedTouch?: Touch): MouseEvent | Event => {
    if (!isTouchEvent(event as TouchEvent)) {
      return event as MouseEvent;
    }
    const touchEvent = event as TouchEvent;

    // 默认获取第一个触摸点
    const touch = changedTouch ?? (touchEvent.touches[0] || touchEvent.changedTouches[0]);

    if (touchEvent.type === 'touchmove') {
      preventDefault(touchEvent);
    }

    // 确定对应的鼠标事件类型
    const mouseEventType = {
      touchstart: 'mousedown',
      touchmove: 'mousemove',
      touchend: 'mouseup',
      touchcancel: 'mouseup',
    }[touchEvent.type];

    if (!mouseEventType) {
      throw new Error(`Unknown touch event type: ${touchEvent.type}`);
    }

    // 创建新的鼠标事件
    const mouseEvent = new MouseEvent(mouseEventType, {
      bubbles: touchEvent.bubbles,
      cancelable: touchEvent.cancelable,
      view: touchEvent.view,
      // 复制触摸点的位置信息
      clientX: touch.clientX,
      clientY: touch.clientY,
      screenX: touch.screenX,
      screenY: touch.screenY,
      // 复制修饰键状态
      ctrlKey: touchEvent.ctrlKey,
      altKey: touchEvent.altKey,
      shiftKey: touchEvent.shiftKey,
      metaKey: touchEvent.metaKey,
    });

    return mouseEvent;
  };
  export const getEventCoord = (
    e:
      | MouseEvent
      | TouchEvent
      | {
          clientX: number;
          clientY: number;
        }
  ): {
    clientX: number;
    clientY: number;
  } => {
    if (isTouchEvent(e as TouchEvent)) {
      const touchEvent = e as TouchEvent;
      if (touchEvent.touches.length === 0) {
        return {
          clientX: 0,
          clientY: 0,
        };
      }
      return {
        clientX: touchEvent.touches[0].clientX,
        clientY: touchEvent.touches[0].clientY,
      };
    } else if (e instanceof MouseEvent) {
      return {
        clientX: e.clientX,
        clientY: e.clientY,
      };
    }
    return {
      clientX: (e as MouseEvent).clientX,
      clientY: (e as MouseEvent).clientY,
    };
  };

  export const preventDefault = (
    e: Event | MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
  ) => {
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  export const onTouched = (
    touchStartEvent: React.TouchEvent,
    callback: (e: MouseEvent) => void
  ) => {
    const startTouch = touchStartEvent.changedTouches[0];
    const findTouch = (event: TouchEvent) =>
      Array.from(event.changedTouches).find((touch) => touch.identifier === startTouch.identifier);
    const exceededTapDistance = (touch: Touch) =>
      Math.abs(touch.clientX - startTouch.clientX) >= 5 ||
      Math.abs(touch.clientY - startTouch.clientY) >= 5;
    let moved = false;

    const handleTouchMove = (event: TouchEvent) => {
      const touch = findTouch(event);
      if (touch && exceededTapDistance(touch)) {
        moved = true;
      }
    };

    const handleTouchEnd = (touchEndEvent: TouchEvent) => {
      const endTouch = findTouch(touchEndEvent);
      if (!endTouch) {
        return;
      }
      document.removeEventListener('touchmove', handleTouchMove, true);
      document.removeEventListener('touchend', handleTouchEnd, true);
      document.removeEventListener('touchcancel', handleTouchEnd, true);
      if (touchEndEvent.type === 'touchend' && !moved && !exceededTapDistance(endTouch)) {
        const mouseEvent = touchToMouseEvent(touchEndEvent, endTouch) as MouseEvent;
        callback(mouseEvent);
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { capture: true, passive: true });
    document.addEventListener('touchend', handleTouchEnd, true);
    document.addEventListener('touchcancel', handleTouchEnd, true);
  };
}
