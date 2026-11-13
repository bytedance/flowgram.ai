/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../lib/utils';
import {
  motionDuration,
  motionEasing,
  observeMotionPreference,
  type MotionDuration,
} from '../../lib/motion';

/** Keep the same instance through an exit; reopening cancels its pending removal. */
export function usePresence(open: boolean, duration: MotionDuration = 'panel') {
  const [retained, setRetained] = useState(open);
  useLayoutEffect(() => {
    if (open) {
      setRetained(true);
      return;
    }
    if (!retained) return;
    const delay = motionDuration(duration);
    if (!delay) {
      setRetained(false);
      return;
    }
    const timer = window.setTimeout(() => setRetained(false), delay);
    const unsubscribe = observeMotionPreference(() => {
      if (!motionDuration(duration)) {
        window.clearTimeout(timer);
        setRetained(false);
      }
    });
    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, [open, duration, retained]);
  return open || retained;
}

export function Presence({
  open,
  keepMounted = false,
  duration = 'panel',
  effect = 'surface',
  children,
  className,
  ...props
}: {
  open: boolean;
  keepMounted?: boolean;
  duration?: MotionDuration;
  effect?: 'surface' | 'page' | 'none';
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  const present = usePresence(open, duration);
  const surface = useRef<HTMLDivElement>(null);
  useSurfaceTransition(surface, open, duration, effect !== 'none');
  const lastContent = useRef(children);
  useLayoutEffect(() => {
    if (open) lastContent.current = children;
  }, [children, open]);
  if (!present && !keepMounted) return null;
  return (
    <div
      {...props}
      ref={surface}
      hidden={!present}
      inert={!open || undefined}
      aria-hidden={!open || undefined}
      data-state={open ? 'open' : 'closed'}
      data-motion-duration={duration}
      className={cn('motion-presence', `motion-${effect}`, className)}
    >
      {keepMounted || open ? children : lastContent.current}
    </div>
  );
}

/** Grid interpolation follows intrinsic content without measuring streaming text. */
export function Collapse({
  open,
  children,
  className,
  ...props
}: {
  open: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-open={open}
      inert={!open || undefined}
      aria-hidden={!open || undefined}
      className={cn('motion-collapse', className)}
    >
      <div className="motion-collapse-clip">{children}</div>
    </div>
  );
}

/** Animate a destination change without keying or replacing its mounted content. */
export function useContentTransition(
  target: { current: HTMLElement | null },
  destination: unknown
) {
  const previous = useRef(destination);
  useLayoutEffect(() => {
    if (previous.current === destination) return;
    previous.current = destination;
    const element = target.current;
    const duration = motionDuration('control');
    if (!element?.getClientRects().length || !duration) return;
    const animation = element.animate(
      [
        { opacity: 0.65, translate: '0 4px' },
        { opacity: 1, translate: '0 0' },
      ],
      { duration, easing: motionEasing() }
    );
    return () => animation.cancel();
  }, [destination, target]);
}

/** Retarget from the current frame when an entrance or exit is interrupted. */
export function useSurfaceTransition(
  target: { current: HTMLElement | null },
  open: boolean,
  duration: MotionDuration = 'panel',
  enabled = true
) {
  const previous = useRef(false);
  const active = useRef<Animation | null>(null);
  useLayoutEffect(() => {
    const element = target.current;
    if (!element || previous.current === open || !enabled) return;
    previous.current = open;
    const from = active.current
      ? {
          opacity: getComputedStyle(element).opacity,
          translate: getComputedStyle(element).translate,
        }
      : { opacity: open ? '0' : '1', translate: open ? '0 6px' : '0 0' };
    active.current?.cancel();
    active.current = null;
    const delay = motionDuration(duration);
    if (!delay) return;
    const animation = element.animate(
      [from, { opacity: open ? 1 : 0, translate: open ? '0 0' : '0 4px' }],
      { duration: delay, easing: motionEasing() }
    );
    active.current = animation;
    animation.onfinish = () => {
      if (active.current !== animation) return;
      active.current = null;
      animation.cancel();
    };
  }, [open, target, duration, enabled]);
  useLayoutEffect(
    () =>
      observeMotionPreference(() => {
        if (!motionDuration(duration)) active.current?.finish();
      }),
    [duration]
  );
  useLayoutEffect(() => () => active.current?.cancel(), []);
}
