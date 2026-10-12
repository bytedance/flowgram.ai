/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import * as React from 'react';

import { describe, expect, test } from 'vitest';
import { Container } from 'inversify';
import { render } from '@testing-library/react';
import { ConstantKeys, FlowDocumentOptions } from '@flowgram.ai/document';
import { PlaygroundReactContainerContext } from '@flowgram.ai/core';

import { useLineWidth } from '../../src/hooks/use-line-width';

function renderWithConstants(constants?: Record<string, any>) {
  const container = new Container();
  container.bind(FlowDocumentOptions).toConstantValue({ constants });

  const Probe = () => {
    const lineWidth = useLineWidth();
    return <div data-testid="probe">{String(lineWidth)}</div>;
  };

  return render(
    <PlaygroundReactContainerContext.Provider value={container}>
      <Probe />
    </PlaygroundReactContainerContext.Provider>
  );
}

describe('useLineWidth', () => {
  test('returns undefined when constants is not set', () => {
    const { getByTestId } = renderWithConstants(undefined);
    expect(getByTestId('probe').textContent).toBe('undefined');
  });

  test('returns undefined when LINE_WIDTH is not set', () => {
    const { getByTestId } = renderWithConstants({});
    expect(getByTestId('probe').textContent).toBe('undefined');
  });

  test('returns number when configured as number', () => {
    const { getByTestId } = renderWithConstants({ [ConstantKeys.LINE_WIDTH]: 4 });
    expect(getByTestId('probe').textContent).toBe('4');
  });

  test('returns string when configured with a css unit', () => {
    const { getByTestId } = renderWithConstants({ [ConstantKeys.LINE_WIDTH]: '2px' });
    expect(getByTestId('probe').textContent).toBe('2px');
  });

  test.each([null, ''])('ignores empty value %s', (value) => {
    const { getByTestId } = renderWithConstants({ [ConstantKeys.LINE_WIDTH]: value });
    expect(getByTestId('probe').textContent).toBe('undefined');
  });
});
