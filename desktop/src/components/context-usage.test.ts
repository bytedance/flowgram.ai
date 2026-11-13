/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createElement } from 'react';

import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import type { ContextUsage as Usage } from '../lib/types';
import { ContextUsage } from './context-usage';

const usage: Usage = {
  revision: 1,
  modelId: 'model',
  inputTokens: 16000,
  contextWindow: 32000,
  effectiveWindow: 32000,
  autoCompactTokenLimit: 22000,
  outputReserve: 8000,
  source: 'provider',
  status: 'ready',
  compactions: 0,
};
describe('context usage', () => {
  it('shows nothing until a budget exists, and bounds the accessible meter', () => {
    expect(renderToStaticMarkup(createElement(ContextUsage, {}))).toBe('');
    const html = renderToStaticMarkup(
      createElement(ContextUsage, { value: { ...usage, inputTokens: 40000 } })
    );
    expect(html).toContain('aria-valuenow="100"');
    expect(html).toContain('40,000 / 32,000 tokens');
    expect(html).toContain('Reserved for model output: 8,000 tokens');
  });
  it('distinguishes compaction and an unknown model window without implying a real limit', () => {
    const html = renderToStaticMarkup(
      createElement(ContextUsage, {
        value: { ...usage, contextWindow: null, status: 'compacting' },
      })
    );
    expect(html).toContain('Compacting context');
    expect(html).toContain('conservative budget');
    expect(html).not.toContain('role="meter"');
  });
});
