/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { syncWindowTheme } from './window-theme';

const native = vi.hoisted(() => ({ setTheme: vi.fn(), setBackgroundColor: vi.fn() }));
vi.mock('@tauri-apps/api/window', () => ({ getCurrentWindow: () => native }));
beforeEach(() => {
  vi.resetAllMocks();
  vi.stubGlobal('window', { __TAURI_INTERNALS__: {} });
});
afterEach(() => vi.unstubAllGlobals());

describe('native window theme', () => {
  it('does not invoke native APIs in browser previews', async () => {
    vi.stubGlobal('window', {});
    await syncWindowTheme('dark', '#151515');
    expect(native.setTheme).not.toHaveBeenCalled();
    expect(native.setBackgroundColor).not.toHaveBeenCalled();
  });
  it('serializes rapid palette changes and releases explicit appearance in system mode', async () => {
    let release!: () => void;
    const gate = new Promise<void>((resolve) => { release = resolve; });
    native.setTheme.mockImplementationOnce(() => gate);
    const dark = syncWindowTheme('dark', '#151515');
    const light = syncWindowTheme('light', '#fafafa');
    const system = syncWindowTheme('system', '#201c17');
    await vi.waitFor(() => expect(native.setTheme).toHaveBeenCalledTimes(1));
    expect(native.setBackgroundColor).not.toHaveBeenCalled();
    release();
    await Promise.all([dark, light, system]);
    expect(native.setTheme.mock.calls).toEqual([['dark'], ['light'], [null]]);
    expect(native.setBackgroundColor.mock.calls).toEqual([['#151515'], ['#fafafa'], ['#201c17']]);
  });
  it('reports a failed native update but allows the next palette to recover', async () => {
    native.setTheme.mockRejectedValueOnce(new Error('Native update failed'));
    await expect(syncWindowTheme('dark', '#151515')).rejects.toThrow('Native update failed');
    await syncWindowTheme('light', '#fafafa');
    expect(native.setBackgroundColor).toHaveBeenLastCalledWith('#fafafa');
  });
});
