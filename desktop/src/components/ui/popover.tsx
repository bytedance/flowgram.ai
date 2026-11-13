/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createPortal } from 'react-dom';
import {
  cloneElement,
  useEffect,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';

import { usePresence, useSurfaceTransition } from './presence';
import { FloatingLayerOwners, ownsFloatingLayer } from './floating-layer';

export function Popover({
  trigger,
  label,
  children,
  width = 340,
}: {
  trigger: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  label: string;
  children: (close: () => void) => ReactNode;
  width?: number;
}) {
  const id = useId();
  const owners = useContext(FloatingLayerOwners);
  const anchor = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const restore = useRef(false);
  const [open, setOpen] = useState(false);
  const present = usePresence(open, 'control');
  useSurfaceTransition(panel, open, 'control');
  const [position, setPosition] = useState({ left: 0, top: 0, width });
  const close = () => {
    restore.current = true;
    setOpen(false);
  };
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = anchor.current?.getBoundingClientRect();
      if (!rect) return;
      const w = Math.min(width, window.innerWidth - 24);
      const height = Math.min(panel.current?.offsetHeight || 300, window.innerHeight - 32);
      const below = rect.bottom + 6;
      setPosition({
        width: w,
        left: Math.max(12, Math.min(rect.left, window.innerWidth - w - 12)),
        top: below + height < window.innerHeight - 12 ? below : Math.max(12, rect.top - height - 6),
      });
    };
    update();
    const observer = new ResizeObserver(update);
    if (panel.current) observer.observe(panel.current);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, width]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() =>
      panel.current?.querySelector<HTMLElement>('input,button,select,textarea')?.focus()
    );
    const outside = (event: PointerEvent) => {
      if (
        !panel.current?.contains(event.target as Node) &&
        !anchor.current?.contains(event.target as Node) &&
        !ownsFloatingLayer(event.target, id)
      ) {
        restore.current = false;
        setOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !ownsFloatingLayer(event.target, id)) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    };
    const focusOutside = (event: FocusEvent) => {
      if (
        !panel.current?.contains(event.target as Node) &&
        !anchor.current?.contains(event.target as Node) &&
        !ownsFloatingLayer(event.target, id)
      ) {
        restore.current = false;
        setOpen(false);
      }
    };
    document.addEventListener('focusin', focusOutside);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape, true);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('focusin', focusOutside);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape, true);
      if (restore.current && previous?.isConnected) previous.focus();
    };
  }, [open]);
  return (
    <>
      <div ref={anchor} className="nf-popover-anchor">
        {cloneElement(trigger, {
          'aria-expanded': open,
          'aria-controls': open ? id : undefined,
          'aria-haspopup': 'dialog',
          onClick: (event) => {
            trigger.props.onClick?.(event);
            restore.current = false;
            setOpen((value) => !value);
          },
        })}
      </div>
      {present &&
        createPortal(
          <div
            ref={panel}
            id={id}
            role="dialog"
            data-state={open ? 'open' : 'closed'}
            inert={!open || undefined}
            aria-hidden={!open || undefined}
            aria-label={label}
            className="nf-popover"
            data-floating-layer-owners={owners.join(' ')}
            style={position}
          >
            <FloatingLayerOwners.Provider value={[...owners, id]}>
              {children(close)}
            </FloatingLayerOwners.Provider>
          </div>,
          document.body
        )}
    </>
  );
}
