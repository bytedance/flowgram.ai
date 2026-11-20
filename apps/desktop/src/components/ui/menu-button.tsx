/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useRef, useState, type ReactNode } from 'react';

import { CommandMenu, type MenuCommand } from './command-menu';
import { Button } from './button';

export function MenuButton({
  label,
  commands,
  onCommand,
  children,
}: {
  label: string;
  commands: MenuCommand[];
  onCommand: (id: string) => void;
  children: ReactNode;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  function open() {
    const bounds = trigger.current!.getBoundingClientRect();
    setPoint({ x: bounds.left, y: bounds.bottom + 5 });
  }
  return (
    <>
      <Button
        ref={trigger}
        variant="ghost"
        size="icon"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={!!point}
        onClick={open}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            open();
          }
        }}
      >
        {children}
      </Button>
      {point && (
        <CommandMenu
          point={point}
          label={label}
          commands={commands}
          onCommand={onCommand}
          onClose={(restore) => {
            setPoint(null);
            if (restore) trigger.current?.focus();
          }}
        />
      )}
    </>
  );
}
