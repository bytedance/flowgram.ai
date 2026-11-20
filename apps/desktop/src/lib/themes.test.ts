/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  initializeTheme,
  readThemePreferences,
  resetThemePalettes,
  resolvedMode,
  setThemeMode,
  setThemePalette,
  themes,
  themeVariables,
} from './themes';

const storage = new Map<string, string>();
const variables = new Map<string, string>();
const dataset: Record<string, string> = {};
let mediaChanged: (event: { matches: boolean }) => void;
let storageChanged: (event: { key: string }) => void;
let dispose: (() => void) | undefined;
beforeEach(() => {
  storage.clear();
  variables.clear();
  Object.keys(dataset).forEach((key) => delete dataset[key]);
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
  });
  vi.stubGlobal('document', {
    documentElement: {
      dataset,
      style: { setProperty: (key: string, value: string) => variables.set(key, value) },
    },
  });
  vi.stubGlobal('window', {
    matchMedia: () => ({
      matches: false,
      addEventListener: (_: string, callback: typeof mediaChanged) => {
        mediaChanged = callback;
      },
      removeEventListener: vi.fn(),
    }),
    addEventListener: (_: string, callback: typeof storageChanged) => {
      storageChanged = callback;
    },
    removeEventListener: vi.fn(),
  });
});
afterEach(() => {
  dispose?.();
  dispose = undefined;
  vi.unstubAllGlobals();
});

function luminance(hex: string) {
  const values = [1, 3, 5].map((start) => {
    const value = parseInt(hex.slice(start, start + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}
function contrast(a: string, b: string) {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe('desktop theme preferences', () => {
  it('keeps valid modes while rejecting malformed or unknown palette settings', () => {
    expect(readThemePreferences()).toEqual({ mode: 'system', light: 'graphite', dark: 'graphite' });
    storage.set('flowgram.theme', 'dark');
    storage.set('flowgram.theme.palettes', 'broken');
    expect(readThemePreferences().mode).toBe('dark');
    storage.set('flowgram.theme.palettes', JSON.stringify({ light: 'ocean', dark: 'unknown' }));
    expect(readThemePreferences()).toEqual({ mode: 'dark', light: 'ocean', dark: 'graphite' });
    expect(resolvedMode('system', true)).toBe('dark');
    expect(resolvedMode('light', true)).toBe('light');
  });
  it('remembers independent palettes, follows system changes, and restores them after restart', () => {
    dispose = initializeTheme();
    setThemePalette('light', 'sandstone');
    setThemePalette('dark', 'ocean');
    expect(dataset.palette).toBe('sandstone');
    mediaChanged({ matches: true });
    expect(dataset).toMatchObject({ theme: 'dark', themeMode: 'system', palette: 'ocean' });
    expect(variables.get('--surface-canvas')).toBe(
      themes.find((theme) => theme.id === 'ocean')!.dark.canvas
    );
    setThemeMode('light');
    mediaChanged({ matches: true });
    expect(dataset.palette).toBe('sandstone');
    dispose();
    dispose = initializeTheme();
    expect(dataset).toMatchObject({ theme: 'light', palette: 'sandstone' });
    expect(readThemePreferences().dark).toBe('ocean');
    resetThemePalettes();
    expect(readThemePreferences()).toEqual({ mode: 'light', light: 'graphite', dark: 'graphite' });
  });
  it('applies preferences changed by another window', () => {
    dispose = initializeTheme();
    storage.set('flowgram.theme', 'dark');
    storage.set('flowgram.theme.palettes', JSON.stringify({ light: 'forest', dark: 'iris' }));
    storageChanged({ key: 'flowgram.theme.palettes' });
    expect(dataset).toMatchObject({ theme: 'dark', palette: 'iris' });
  });
  it('keeps text readable and selection discernible in every built-in palette', () => {
    for (const theme of themes)
      for (const mode of ['light', 'dark'] as const) {
        const colors = theme[mode];
        for (const surface of [colors.background, colors.surface, colors.canvas, colors.sidebar]) {
          expect(
            contrast(colors.foreground, surface),
            `${theme.id} ${mode} text`
          ).toBeGreaterThanOrEqual(4.5);
          expect(
            contrast(colors.muted, surface),
            `${theme.id} ${mode} secondary text`
          ).toBeGreaterThanOrEqual(4.5);
        }
        expect(
          contrast(colors.selection, colors.canvas),
          `${theme.id} ${mode} selection`
        ).toBeGreaterThanOrEqual(3);
        expect(
          contrast(colors.selection, colors.surface),
          `${theme.id} ${mode} node selection`
        ).toBeGreaterThanOrEqual(3);
        expect(Object.keys(themeVariables(colors, mode))).toEqual(
          Object.keys(themeVariables(themes[0].light, 'light'))
        );
      }
  });
});
