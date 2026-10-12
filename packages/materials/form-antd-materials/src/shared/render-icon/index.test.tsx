/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { describe, expect, it } from 'vitest';

import { renderMaterialIcon } from './index';

describe('renderMaterialIcon', () => {
  it('renders Next.js StaticImageData-like values as image elements', () => {
    const rendered = renderMaterialIcon({ src: '/node-icon.jpg' });

    expect(React.isValidElement(rendered)).toBe(true);
    expect((rendered as React.ReactElement<{ src: string }>).props.src).toBe('/node-icon.jpg');
  });

  it('preserves existing React elements', () => {
    const icon = <span data-testid="custom-icon" />;
    expect(renderMaterialIcon(icon)).toBe(icon);
  });
});
