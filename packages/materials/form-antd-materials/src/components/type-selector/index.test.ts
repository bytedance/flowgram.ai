/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import { getTypeSelectValue, parseTypeSelectValue } from './index';

describe('TypeSelector schema conversion', () => {
  it('round-trips a nested array schema', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'array',
        items: { type: 'string' },
      },
    };

    expect(getTypeSelectValue(schema)).toEqual(['array', 'array', 'string']);
    expect(parseTypeSelectValue(['array', 'array', 'string'])).toEqual(schema);
  });

  it('returns undefined when no type is selected', () => {
    expect(getTypeSelectValue()).toBeUndefined();
    expect(parseTypeSelectValue()).toBeUndefined();
    expect(parseTypeSelectValue([])).toBeUndefined();
  });
});
