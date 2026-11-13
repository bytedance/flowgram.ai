/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

vi.mock('@flowgram.ai/free-layout-editor', () => ({
  useClientContext: () => ({
    playground: { config: { zoom: 1, config: { minZoom: 0.1, maxZoom: 2 } } },
  }),
}));

import { setLanguagePreference } from '../lib/i18n';
import { WorkflowCanvasToolbar } from './workflow-canvas-toolbar';

afterEach(() => vi.unstubAllGlobals());
describe('canvas layout command', () => {
  it('exposes a localized layout action in editable canvases and hides it in historical canvases', () => {
    vi.stubGlobal('localStorage', { setItem: () => {} });
    const render = (readOnly = false) =>
      renderToStaticMarkup(
        <WorkflowCanvasToolbar
          readOnly={readOnly}
          onHistory={async () => {}}
          onFit={() => {}}
          onAutoLayout={async () => {}}
        />
      );
    setLanguagePreference('en');
    expect(render()).toContain('aria-label="Auto layout"');
    expect(render()).not.toContain('>Auto layout<');
    expect(render(true)).not.toContain('aria-label="Auto layout"');
    setLanguagePreference('zh-CN');
    expect(render()).toContain('aria-label="自动布局"');
    expect(render()).not.toContain('>自动布局<');
    setLanguagePreference('system');
  });
});
