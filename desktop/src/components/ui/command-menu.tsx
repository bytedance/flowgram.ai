/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createPortal } from 'react-dom';
import { useContext, useLayoutEffect, useRef, useState } from 'react';

import { FloatingLayerOwners } from './floating-layer';

export interface MenuCommand {
  id: string;
  label: string;
  shortcut?: string;
  disabled?: string;
  danger?: boolean;
}
/** Shared pointer/keyboard menu for node, selection and canvas commands. */
export function CommandMenu({
  point,
  commands,
  label,
  onCommand,
  onClose,
}: {
  point: { x: number; y: number };
  commands: MenuCommand[];
  label: string;
  onCommand: (id: string) => void;
  onClose: (restoreFocus?: boolean) => void;
}) {
  const owners = useContext(FloatingLayerOwners);
  const panel = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(point);
  useLayoutEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const rect = panel.current!.getBoundingClientRect();
    setPosition({
      x: Math.max(8, Math.min(point.x, window.innerWidth - rect.width - 8)),
      y: Math.max(8, Math.min(point.y, window.innerHeight - rect.height - 8)),
    });
    panel.current?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus();
    const outside = (event: PointerEvent) => {
      if (!panel.current?.contains(event.target as Node)) onClose(false);
    };
    const resize = () => onClose(false);
    document.addEventListener('pointerdown', outside, true);
    window.addEventListener('resize', resize);
    return () => {
      document.removeEventListener('pointerdown', outside, true);
      window.removeEventListener('resize', resize);
      if (
        previous?.isConnected &&
        (document.activeElement === document.body ||
          panel.current?.contains(document.activeElement))
      )
        previous.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <div
      ref={panel}
      role="menu"
      aria-label={label}
      className="workflow-command-menu"
      data-floating-layer-owners={owners.join(' ')}
      style={{ left: position.x, top: position.y }}
      onContextMenu={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        event.stopPropagation();
        const buttons = Array.from(
          panel.current!.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')
        );
        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          buttons[
            event.key === 'Home'
              ? 0
              : event.key === 'End'
              ? buttons.length - 1
              : (index + (event.key === 'ArrowDown' ? 1 : buttons.length - 1)) % buttons.length
          ]?.focus();
        }
        if (event.key === 'Escape' || event.key === 'Tab') {
          event.preventDefault();
          onClose(true);
        }
      }}
    >
      {commands.map((command) => (
        <button
          key={command.id}
          type="button"
          role="menuitem"
          disabled={!!command.disabled}
          title={command.disabled}
          className={command.danger ? 'danger' : ''}
          onClick={() => {
            onClose(false);
            onCommand(command.id);
          }}
        >
          <span>
            {command.label}
            {command.disabled && <small>{command.disabled}</small>}
          </span>
          {command.shortcut && <kbd>{command.shortcut}</kbd>}
        </button>
      ))}
    </div>,
    document.body
  );
}
