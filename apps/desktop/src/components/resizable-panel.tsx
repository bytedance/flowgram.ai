/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { cn } from '../lib/utils';
import { motionDuration, motionEasing, observeMotionPreference } from '../lib/motion';
import { usePresence } from './ui/presence';

export function clampPanelSize(value: number, min: number, max: number, available: number) {
  const ceiling = Math.max(0, Math.min(max, available));
  return Math.min(ceiling, Math.max(Math.min(min, ceiling), Number.isFinite(value) ? value : min));
}
export function ResizablePanel({
  children,
  storageKey,
  label,
  initial,
  min,
  max,
  reserve = 0,
  edge = 'right',
  fill = false,
  hidden = false,
  unmountOnExit = false,
  className,
  axis = 'horizontal',
}: {
  children: ReactNode;
  storageKey: string;
  label: string;
  initial: number;
  min: number;
  max: number;
  reserve?: number;
  edge?: 'left' | 'right';
  fill?: boolean;
  hidden?: boolean;
  unmountOnExit?: boolean;
  className?: string;
  axis?: 'horizontal' | 'vertical';
}) {
  const container = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(() => {
    const value = Number(localStorage.getItem(storageKey));
    return value > 0 ? Math.min(max, Math.max(min, value)) : initial;
  });
  const [extent, setExtent] = useState(max + reserve);
  const available = Math.max(0, extent - reserve);
  const present = usePresence(!hidden);
  const content = useRef(children);
  const animation = useRef<Animation | null>(null);
  const previous = useRef<{ hidden: boolean; fill: boolean; rect: DOMRect | null }>({
    hidden,
    fill,
    rect: null,
  });
  const [animating, setAnimating] = useState(false);
  useLayoutEffect(() => {
    if (!hidden && children != null) content.current = children;
  }, [children, hidden]);
  const drag = useRef<{ start: number; size: number; latest: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const vertical = axis === 'vertical';
  const bounded = clampPanelSize(size, min, max, available);
  const contentSize = useRef(fill ? extent : bounded);
  useLayoutEffect(() => {
    if (!hidden) contentSize.current = fill ? extent : bounded;
  }, [hidden, fill, extent, bounded]);
  useEffect(() => {
    const reset = () => {
      setSize(initial);
      localStorage.removeItem(storageKey);
    };
    window.addEventListener('flowgram:reset-layout', reset);
    return () => window.removeEventListener('flowgram:reset-layout', reset);
  }, [initial, storageKey]);
  useLayoutEffect(() => {
    const parent = container.current?.parentElement;
    if (!parent) return;
    setExtent(vertical ? parent.clientHeight : parent.clientWidth);
    const observer = new ResizeObserver(([entry]) =>
      setExtent(vertical ? entry.contentRect.height : entry.contentRect.width)
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [vertical]);
  useLayoutEffect(() => {
    const node = container.current;
    if (!node) return;
    const old = previous.current;
    const changed = old.hidden !== hidden || (!hidden && old.fill !== fill);
    const from = animation.current ? node.getBoundingClientRect() : old.rect;
    const opacity = animation.current ? getComputedStyle(node).opacity : old.hidden ? '0' : '1';
    animation.current?.cancel();
    animation.current = null;
    const to = node.getBoundingClientRect();
    previous.current = { hidden, fill, rect: to };
    const duration = motionDuration('panel');
    if (
      !changed ||
      !from ||
      !duration ||
      dragging ||
      document.documentElement.matches('.resizing-column, .resizing-row')
    ) {
      setAnimating(false);
      return;
    }
    const dimension = vertical ? 'height' : 'width';
    const frames: Keyframe[] = [
      { flexBasis: `${from[dimension]}px`, [dimension]: `${from[dimension]}px`, opacity },
      {
        flexBasis: `${to[dimension]}px`,
        [dimension]: `${to[dimension]}px`,
        opacity: hidden ? 0 : 1,
      },
    ];
    if (old.fill !== fill && !hidden) {
      frames[0].translate = `${from.left - to.left}px ${from.top - to.top}px`;
      frames[1].translate = '0 0';
    }
    const current = node.animate(frames, { duration, easing: motionEasing() });
    animation.current = current;
    setAnimating(true);
    current.onfinish = () => {
      if (animation.current !== current) return;
      animation.current = null;
      setAnimating(false);
      current.cancel();
      window.dispatchEvent(new Event('flowgram:layout-settled'));
    };
  }, [hidden, fill, bounded, extent, vertical, dragging]);
  useEffect(() => () => animation.current?.cancel(), []);
  useEffect(
    () =>
      observeMotionPreference(() => {
        if (!motionDuration('panel')) animation.current?.finish();
      }),
    []
  );
  useEffect(() => {
    const cancel = () => {
      animation.current?.cancel();
      animation.current = null;
      setAnimating(false);
    };
    window.addEventListener('flowgram:resize-start', cancel);
    return () => window.removeEventListener('flowgram:resize-start', cancel);
  }, []);
  useEffect(() => {
    if (!dragging) return;
    document.documentElement.classList.add(vertical ? 'resizing-row' : 'resizing-column');
    return () =>
      document.documentElement.classList.remove(vertical ? 'resizing-row' : 'resizing-column');
  }, [dragging, vertical]);
  function finish() {
    if (drag.current) localStorage.setItem(storageKey, String(drag.current.latest));
    drag.current = null;
    setDragging(false);
    window.dispatchEvent(new Event('flowgram:layout-settled'));
  }
  const target = hidden ? 0 : fill ? extent : bounded;
  const style: CSSProperties = {
    flex: `0 0 ${target}px`,
    [vertical ? 'height' : 'width']: target,
    ...(hidden ? { borderWidth: 0 } : {}),
  };
  return (
    <div
      ref={container}
      style={style}
      hidden={hidden && !present}
      inert={hidden || undefined}
      aria-hidden={hidden || undefined}
      data-layout-animating={animating || undefined}
      className={cn('resizable-panel relative flex min-h-0 min-w-0 flex-col', className)}
      data-resizing={dragging || undefined}
    >
      <div
        className="resizable-panel-body relative flex min-h-0 min-w-0 flex-1 flex-col"
        style={
          vertical
            ? {
                height: hidden ? contentSize.current : bounded,
                flex: `0 0 ${hidden ? contentSize.current : bounded}px`,
              }
            : { width: hidden ? contentSize.current : fill ? extent : bounded }
        }
      >
        {hidden ? (unmountOnExit && !present ? null : content.current) : children}
      </div>
      {!fill && !hidden && (
        <div
          role="separator"
          aria-label={label}
          aria-orientation={vertical ? 'horizontal' : 'vertical'}
          aria-valuenow={Math.round(bounded)}
          aria-valuemin={Math.min(min, available)}
          aria-valuemax={Math.min(max, available)}
          tabIndex={0}
          className={cn(
            'panel-divider',
            vertical
              ? 'panel-divider-row'
              : edge === 'left'
              ? 'panel-divider-left'
              : 'panel-divider-right'
          )}
          onDoubleClick={() => {
            setSize(initial);
            localStorage.removeItem(storageKey);
          }}
          onKeyDown={(event) => {
            const delta =
              event.key === (vertical ? 'ArrowUp' : 'ArrowLeft')
                ? -16
                : event.key === (vertical ? 'ArrowDown' : 'ArrowRight')
                ? 16
                : 0;
            if (!delta) return;
            event.preventDefault();
            const next = clampPanelSize(
              bounded + delta * (edge === 'left' ? -1 : 1),
              min,
              max,
              available
            );
            setSize(next);
            localStorage.setItem(storageKey, String(next));
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            event.preventDefault();
            window.dispatchEvent(new Event('flowgram:resize-start'));
            event.currentTarget.setPointerCapture(event.pointerId);
            drag.current = {
              start: vertical ? event.clientY : event.clientX,
              size: bounded,
              latest: bounded,
            };
            setDragging(true);
          }}
          onPointerMove={(event) => {
            if (!drag.current) return;
            const delta =
              ((vertical ? event.clientY : event.clientX) - drag.current.start) *
              (edge === 'left' ? -1 : 1);
            const next = clampPanelSize(drag.current.size + delta, min, max, available);
            drag.current.latest = next;
            setSize(next);
          }}
          onPointerUp={finish}
          onPointerCancel={finish}
          onLostPointerCapture={finish}
        />
      )}
    </div>
  );
}
