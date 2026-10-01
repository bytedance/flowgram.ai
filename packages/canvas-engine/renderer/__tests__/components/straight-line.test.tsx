/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import * as React from 'react';

import { describe, expect, test } from 'vitest';
import { Container } from 'inversify';
import { render } from '@testing-library/react';
import { FlowDocumentOptions, ConstantKeys } from '@flowgram.ai/document';
import { PlaygroundReactContainerContext } from '@flowgram.ai/core';

import StraightLine from '../../src/components/StraightLine';

const line = {
  lineId: 'line_1',
  type: 0,
  from: { x: 0, y: 0 },
  to: { x: 100, y: 0 },
} as any;

function renderLine(constants?: Record<string, any>) {
  const container = new Container();
  container.bind(FlowDocumentOptions).toConstantValue({ constants });

  return render(
    <PlaygroundReactContainerContext.Provider value={container}>
      <svg>
        <StraightLine {...line} />
      </svg>
    </PlaygroundReactContainerContext.Provider>
  );
}

describe('StraightLine line width', () => {
  test('keeps the default width when LINE_WIDTH is not configured', () => {
    const { container } = renderLine(undefined);
    expect(container.querySelector('path')!.getAttribute('stroke-width')).toBeNull();
  });

  test('applies LINE_WIDTH when configured', () => {
    const { container } = renderLine({ [ConstantKeys.LINE_WIDTH]: 4 });
    expect(container.querySelector('path')!.getAttribute('stroke-width')).toBe('4');
  });

  test('applies a LINE_WIDTH with css unit', () => {
    const { container } = renderLine({ [ConstantKeys.LINE_WIDTH]: '3px' });
    expect(container.querySelector('path')!.getAttribute('stroke-width')).toBe('3px');
  });
});
