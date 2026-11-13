/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { RotateCcw } from 'lucide-react';

import {
  themes,
  useThemePreferences,
  setThemeMode,
  setThemePalette,
  resetThemePalettes,
  type ColorMode,
  type ThemeMode,
  type ThemeId,
} from '../lib/themes';
import { tx } from '../lib/i18n';
import { VisualChoice } from './ui/visual-choice';
import { Button } from './ui/button';

function ThemePreview({
  id,
  mode,
  compact = false,
}: {
  id: ThemeId;
  mode: ColorMode;
  compact?: boolean;
}) {
  const colors = themes.find((theme) => theme.id === id)![mode];
  return (
    <span
      aria-hidden="true"
      className={`flex overflow-hidden rounded-lg border ${compact ? 'h-16' : 'h-24'}`}
      style={{ background: colors.canvas, borderColor: colors.foreground + '26' }}
    >
      <span className="flex w-1/4 flex-col gap-2 p-2" style={{ background: colors.sidebar }}>
        <span
          className="h-1 w-4/5 rounded"
          style={{ background: colors.foreground, opacity: 0.6 }}
        />
        <span
          className="h-1 w-full rounded"
          style={{ background: colors.foreground, opacity: 0.15 }}
        />
        <span
          className="h-1 w-3/4 rounded"
          style={{ background: colors.foreground, opacity: 0.15 }}
        />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-center gap-2 p-2">
        {[0, 1].map((node) => (
          <span
            key={node}
            className="flex h-8 w-12 flex-col justify-center gap-1 rounded-md border p-1.5"
            style={{
              background: colors.surface,
              borderColor: node ? colors.selection : colors.foreground + '26',
            }}
          >
            <span className="h-1 w-2 rounded-sm" style={{ background: colors.accent }} />
            <span
              className="h-0.5 w-3/4 rounded"
              style={{ background: colors.foreground, opacity: 0.6 }}
            />
          </span>
        ))}
      </span>
    </span>
  );
}

export function ThemeSettings() {
  const preferences = useThemePreferences();
  return (
    <div className="space-y-7 pb-7">
      <div>
        <p className="mb-4 text-xs leading-5 text-muted-foreground">
          {tx('明暗模式与主题配色独立设置，切换立即生效。')}
        </p>
        <VisualChoice<ThemeMode>
          label={tx('界面外观')}
          value={preferences.mode}
          onValueChange={setThemeMode}
          className="grid-cols-3"
          options={(['system', 'light', 'dark'] as const).map((mode) => ({
            value: mode,
            label: tx(mode === 'system' ? '跟随系统' : mode === 'light' ? '浅色' : '深色'),
            preview:
              mode === 'system' ? (
                <span className="relative block overflow-hidden rounded-lg">
                  <ThemePreview id={preferences.light} mode="light" />
                  <span className="absolute inset-0 [clip-path:polygon(50%_0,100%_0,100%_100%,50%_100%)]">
                    <ThemePreview id={preferences.dark} mode="dark" />
                  </span>
                </span>
              ) : (
                <ThemePreview id={preferences[mode]} mode={mode} />
              ),
          }))}
        />
      </div>
      <p className="text-xs leading-5 text-muted-foreground">
        {tx(
          '浅色和深色主题分别保存，跟随系统时自动切换。配色同时应用于界面、画布、节点与选中状态。'
        )}
      </p>
      {(['light', 'dark'] as const).map((mode) => (
        <VisualChoice<ThemeId>
          key={mode}
          label={tx(mode === 'light' ? '浅色主题' : '深色主题')}
          value={preferences[mode]}
          onValueChange={(id) => setThemePalette(mode, id)}
          className="grid-cols-[repeat(auto-fit,minmax(144px,1fr))]"
          options={themes.map((theme) => ({
            value: theme.id,
            label: tx(theme.name),
            description: tx(theme.description),
            preview: <ThemePreview id={theme.id} mode={mode} compact />,
          }))}
        />
      ))}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={resetThemePalettes}>
          <RotateCcw />
          {tx('恢复默认主题')}
        </Button>
        <span className="text-xs text-muted-foreground">
          {tx('保留明暗模式、语言与动态效果偏好。')}
        </span>
      </div>
    </div>
  );
}
