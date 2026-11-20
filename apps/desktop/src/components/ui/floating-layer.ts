/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createContext } from 'react';

// Portaled child controls keep their logical ownership even though their DOM
// lives outside the parent's panel. This lets nested menus manage focus/Escape.
export const FloatingLayerOwners = createContext<readonly string[]>([]);
export function ownsFloatingLayer(target: EventTarget | null, owner: string): boolean {
  return (
    target instanceof Element &&
    !!target
      .closest('[data-floating-layer-owners]')
      ?.getAttribute('data-floating-layer-owners')
      ?.split(' ')
      .includes(owner)
  );
}
