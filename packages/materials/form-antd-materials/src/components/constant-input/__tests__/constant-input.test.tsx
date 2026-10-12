/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import { ConstantInput } from '../index';

describe('ConstantInput', () => {
  it.each(['string', 'number', 'integer', 'boolean'])(
    'does not forward readonly for %s inputs',
    (type) => {
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});
      try {
        const html = renderToStaticMarkup(<ConstantInput schema={{ type }} readonly value={1} />);
        const warnings = error.mock.calls.flat().join(' ');
        expect(warnings).not.toContain('Invalid DOM property');
        expect(html).toContain('disabled');
      } finally {
        error.mockRestore();
      }
    }
  );
});
