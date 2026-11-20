/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useSyncExternalStore } from 'react';

import { syncWindowTheme } from './window-theme';

export type ColorMode = 'light' | 'dark';
export type ThemeMode = ColorMode | 'system';
interface ThemeColors {
  background: string;
  sidebar: string;
  surface: string;
  canvas: string;
  secondary: string;
  foreground: string;
  muted: string;
  accent: string;
  selection: string;
  dot: string;
  line: string;
  destructive: string;
}
const base: Record<ColorMode, ThemeColors> = {
  light: {
    background: '#fcfcfb',
    sidebar: '#f5f5f3',
    surface: '#ffffff',
    canvas: '#faf9f5',
    secondary: '#f0eee6',
    foreground: '#20201e',
    muted: '#6b6863',
    accent: '#b95c3d',
    selection: '#72786c',
    dot: '#d9d7d0',
    line: '#a4a19b',
    destructive: '#b84040',
  },
  dark: {
    background: '#151515',
    sidebar: '#10110f',
    surface: '#242522',
    canvas: '#1b1c1a',
    secondary: '#292927',
    foreground: '#eeeeea',
    muted: '#a4a19b',
    accent: '#e09b80',
    selection: '#b6bba9',
    dot: '#41433e',
    line: '#898c83',
    destructive: '#ef9090',
  },
};
function palette(mode: ColorMode, overrides: Partial<ThemeColors>): ThemeColors {
  return { ...base[mode], ...overrides };
}

export const themes = [
  {
    id: 'graphite',
    name: '石墨',
    description: '纯净灰阶与克制的层次',
    light: palette('light', {
      background: '#fafafa',
      sidebar: '#f0f0f0',
      canvas: '#f5f5f5',
      secondary: '#eaeaea',
      foreground: '#242424',
      muted: '#666666',
      accent: '#555555',
      selection: '#707070',
      dot: '#d3d3d3',
      line: '#999999',
    }),
    dark: palette('dark', {
      background: '#151515',
      sidebar: '#101010',
      surface: '#252525',
      canvas: '#1c1c1c',
      secondary: '#303030',
      foreground: '#eeeeee',
      muted: '#ababab',
      accent: '#c6c6c6',
      selection: '#b5b5b5',
      dot: '#424242',
      line: '#8b8b8b',
    }),
  },
  {
    id: 'flowgram',
    name: '纸墨',
    description: '柔和纸面与温暖中性色',
    light: base.light,
    dark: base.dark,
  },
  {
    id: 'sandstone',
    name: '暖砂',
    description: '米色纸张与柔和棕调',
    light: palette('light', {
      background: '#faf7f1',
      sidebar: '#f0eae0',
      surface: '#fffdf8',
      canvas: '#f5efe4',
      secondary: '#ebe2d4',
      foreground: '#342d24',
      muted: '#756653',
      accent: '#91602d',
      selection: '#8a704e',
      dot: '#d7cbbb',
      line: '#a19483',
    }),
    dark: palette('dark', {
      background: '#201c17',
      sidebar: '#191611',
      surface: '#302a22',
      canvas: '#252019',
      secondary: '#3a3227',
      foreground: '#eee4d4',
      muted: '#b6a58e',
      accent: '#d8b07b',
      selection: '#c3af90',
      dot: '#4d4234',
      line: '#a18d73',
    }),
  },
  {
    id: 'ocean',
    name: '海湾',
    description: '清爽蓝灰与安静的深海',
    light: palette('light', {
      background: '#f7fafc',
      sidebar: '#eaf1f7',
      canvas: '#f0f5f9',
      secondary: '#e1ebf3',
      foreground: '#203143',
      muted: '#576c80',
      accent: '#28689b',
      selection: '#527da0',
      dot: '#cbd9e5',
      line: '#8b9faf',
    }),
    dark: palette('dark', {
      background: '#131c27',
      sidebar: '#0e1620',
      surface: '#223144',
      canvas: '#192533',
      secondary: '#2a3b50',
      foreground: '#e3edf7',
      muted: '#9db1c7',
      accent: '#85b8e3',
      selection: '#92b5d1',
      dot: '#374b61',
      line: '#809ab4',
    }),
  },
  {
    id: 'forest',
    name: '松林',
    description: '灰绿底色与自然的松木调',
    light: palette('light', {
      background: '#f7faf6',
      sidebar: '#eaf0e7',
      surface: '#fdfffb',
      canvas: '#f0f5ed',
      secondary: '#e1eadd',
      foreground: '#273626',
      muted: '#5f715b',
      accent: '#3e7348',
      selection: '#65825e',
      dot: '#cbd8c5',
      line: '#91a28a',
    }),
    dark: palette('dark', {
      background: '#171f19',
      sidebar: '#111813',
      surface: '#28362b',
      canvas: '#1d2920',
      secondary: '#324336',
      foreground: '#e5ede1',
      muted: '#a3b59b',
      accent: '#9bc593',
      selection: '#abc2a0',
      dot: '#3c5140',
      line: '#8b9f83',
    }),
  },
  {
    id: 'rose',
    name: '玫瑰',
    description: '低饱和玫瑰与细腻暖灰',
    light: palette('light', {
      background: '#fcf8f9',
      sidebar: '#f2e9ed',
      surface: '#fffdfd',
      canvas: '#f7f0f3',
      secondary: '#eddee5',
      foreground: '#3c2933',
      muted: '#79606c',
      accent: '#a34f72',
      selection: '#967080',
      dot: '#decbd4',
      line: '#ac939f',
    }),
    dark: palette('dark', {
      background: '#241a20',
      sidebar: '#1b1318',
      surface: '#382a32',
      canvas: '#2b2027',
      secondary: '#45323e',
      foreground: '#f3e4ec',
      muted: '#bda2b1',
      accent: '#dfa0bd',
      selection: '#ccabba',
      dot: '#533c4a',
      line: '#ad8e9f',
    }),
  },
  {
    id: 'iris',
    name: '鸢尾',
    description: '轻盈紫灰与沉静的夜色',
    light: palette('light', {
      background: '#faf9fe',
      sidebar: '#efecf7',
      canvas: '#f3f0fa',
      secondary: '#e7e1f3',
      foreground: '#302a43',
      muted: '#6e6483',
      accent: '#7654ad',
      selection: '#8874a6',
      dot: '#d8cee8',
      line: '#a194b6',
    }),
    dark: palette('dark', {
      background: '#1d1929',
      sidebar: '#15121f',
      surface: '#302a40',
      canvas: '#241f33',
      secondary: '#3c3350',
      foreground: '#ece6f7',
      muted: '#b2a5c9',
      accent: '#b8a0e0',
      selection: '#bfb0d8',
      dot: '#483d60',
      line: '#9e8fb6',
    }),
  },
  {
    id: 'amber',
    name: '琥珀',
    description: '明亮奶油色与温润琥珀',
    light: palette('light', {
      background: '#fcfaef',
      sidebar: '#f2edd6',
      surface: '#fffef7',
      canvas: '#f6f1dc',
      secondary: '#ece4c4',
      foreground: '#3a3420',
      muted: '#766b47',
      accent: '#886518',
      selection: '#897744',
      dot: '#ddd1a8',
      line: '#a79a70',
    }),
    dark: palette('dark', {
      background: '#242014',
      sidebar: '#1b180e',
      surface: '#373021',
      canvas: '#2b2619',
      secondary: '#433a27',
      foreground: '#f0e8cc',
      muted: '#bbad81',
      accent: '#d6ba6f',
      selection: '#c8ba8b',
      dot: '#51462b',
      line: '#aa9968',
    }),
  },
] as const;
export type ThemeId = (typeof themes)[number]['id'];
export interface ThemePreferences {
  mode: ThemeMode;
  light: ThemeId;
  dark: ThemeId;
}
const MODE_KEY = 'flowgram.theme';
const PALETTE_KEY = 'flowgram.theme.palettes';
const defaults: ThemePreferences = { mode: 'system', light: 'graphite', dark: 'graphite' };
const listeners = new Set<() => void>();
let preferences = defaults;
let systemDark = false;

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}
export function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}
export function readThemePreferences(): ThemePreferences {
  try {
    const mode = localStorage.getItem(MODE_KEY);
    let stored;
    try {
      stored = JSON.parse(localStorage.getItem(PALETTE_KEY) || '{}');
    } catch {
      stored = {};
    }
    return {
      mode: isThemeMode(mode) ? mode : defaults.mode,
      light: isThemeId(stored?.light) ? stored.light : defaults.light,
      dark: isThemeId(stored?.dark) ? stored.dark : defaults.dark,
    };
  } catch {
    return defaults;
  }
}
export function resolvedMode(mode: ThemeMode, dark: boolean): ColorMode {
  return mode === 'system' ? (dark ? 'dark' : 'light') : mode;
}
function mix(background: string, foreground: string, amount: number) {
  return (
    '#' +
    [1, 3, 5]
      .map((start) =>
        Math.round(
          parseInt(background.slice(start, start + 2), 16) * (1 - amount) +
            parseInt(foreground.slice(start, start + 2), 16) * amount
        )
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}
export function themeVariables(colors: ThemeColors, mode: ColorMode): Record<string, string> {
  const dark = mode === 'dark';
  return {
    '--background': colors.background,
    '--sidebar': colors.sidebar,
    '--surface-panel': colors.surface,
    '--surface-node': colors.surface,
    '--surface-canvas': colors.canvas,
    '--secondary': colors.secondary,
    '--foreground': colors.foreground,
    '--primary': colors.foreground,
    '--primary-foreground': colors.background,
    '--muted-foreground': colors.muted,
    '--border': colors.foreground + (dark ? '2b' : '26'),
    '--ring': colors.accent,
    '--destructive': colors.destructive,
    '--clay': colors.accent,
    '--clay-hover': colors.accent,
    '--clay-light': mix(colors.background, colors.accent, dark ? 0.16 : 0.08),
    '--canvas-dot': colors.dot,
    '--canvas-line': colors.line,
    '--canvas-line-muted': mix(colors.canvas, colors.line, 0.45),
    '--canvas-selection-stroke': colors.selection,
    '--canvas-selection-boundary': mix(colors.canvas, colors.selection, 0.72),
    '--canvas-selection-fill': colors.selection + '12',
    '--canvas-selection-halo': colors.selection + '1c',
    '--canvas-focus-ring': mix(colors.selection, colors.foreground, 0.45),
    '--node-blue-bg': dark ? '#283948' : '#eff3f7',
    '--node-blue-fg': dark ? '#abc5db' : '#566b80',
    '--node-green-bg': dark ? '#2d3b2c' : '#eef2ec',
    '--node-green-fg': dark ? '#b4cba6' : '#64785c',
    '--node-amber-bg': dark ? '#423724' : '#f6f0e4',
    '--node-amber-fg': dark ? '#ddc08a' : '#93733c',
  };
}
function applyTheme() {
  const mode = resolvedMode(preferences.mode, systemDark);
  const theme = themes.find((item) => item.id === preferences[mode])!;
  const root = document.documentElement;
  root.dataset.theme = mode;
  root.dataset.themeMode = preferences.mode;
  root.dataset.palette = theme.id;
  root.style.colorScheme = mode;
  for (const [key, value] of Object.entries(themeVariables(theme[mode], mode)))
    root.style.setProperty(key, value);
  void syncWindowTheme(preferences.mode, theme[mode].background).catch((error) =>
    console.error('Unable to synchronize the native window theme', error)
  );
}
function publish(next: ThemePreferences) {
  preferences = next;
  applyTheme();
  listeners.forEach((listener) => listener());
}
export function initializeTheme() {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  systemDark = media.matches;
  publish(readThemePreferences());
  const changed = (event: MediaQueryListEvent) => {
    systemDark = event.matches;
    if (preferences.mode === 'system') applyTheme();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === MODE_KEY || event.key === PALETTE_KEY || event.key === null)
      publish(readThemePreferences());
  };
  media.addEventListener('change', changed);
  window.addEventListener('storage', storage);
  return () => {
    media.removeEventListener('change', changed);
    window.removeEventListener('storage', storage);
  };
}
export function setThemeMode(mode: ThemeMode) {
  if (!isThemeMode(mode)) return;
  localStorage.setItem(MODE_KEY, mode);
  publish({ ...preferences, mode });
}
export function setThemePalette(mode: ColorMode, id: ThemeId) {
  if (!isThemeId(id)) return;
  const next = { ...preferences, [mode]: id };
  localStorage.setItem(PALETTE_KEY, JSON.stringify({ light: next.light, dark: next.dark }));
  publish(next);
}
export function resetThemePalettes() {
  localStorage.removeItem(PALETTE_KEY);
  publish({ ...defaults, mode: preferences.mode });
}
export function useThemePreferences() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => preferences
  );
}
