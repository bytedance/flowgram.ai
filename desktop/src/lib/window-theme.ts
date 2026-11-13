/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { ThemeMode } from './themes';

let pending = Promise.resolve();

/** Keep native chrome in the same palette without changing browser previews. */
export function syncWindowTheme(mode: ThemeMode, background: string): Promise<void> {
  if (!('__TAURI_INTERNALS__' in window)) return Promise.resolve();
  // Native calls are asynchronous: a slow earlier update must not overwrite a newer palette.
  pending = pending.catch(() => {}).then(async () => {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const native = getCurrentWindow();
    // Returning to system must also release the native appearance override, otherwise
    // prefers-color-scheme would keep reporting the previous explicit app appearance.
    await native.setTheme(mode === 'system' ? null : mode);
    await native.setBackgroundColor(background);
  });
  return pending;
}
