/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import { clampPanelSize } from './resizable-panel';

describe('workspace panel constraints', () => {
  it('respects preferred bounds without taking space reserved for the canvas', () => {
    expect(clampPanelSize(900, 200, 340, 700)).toBe(340);
    expect(clampPanelSize(120, 200, 340, 700)).toBe(200);
    expect(clampPanelSize(300, 200, 340, 250)).toBe(250);
  });
  it('shrinks safely when the window has less room than the preferred minimum', () => {
    expect(clampPanelSize(310, 240, 420, 180)).toBe(180);
    expect(clampPanelSize(310, 240, 420, 0)).toBe(0);
    expect(clampPanelSize(Number.NaN, 240, 420, 400)).toBe(240);
  });
});
