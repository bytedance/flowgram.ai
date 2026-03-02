/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, it, expect } from 'vitest';
import { ContainerModule } from 'inversify';

import { EntityManager, PlaygroundLayer, PlaygroundMockTools, Playground, Layer } from '../src';

const { createContainer, createLayerTestState, createPlayground } = PlaygroundMockTools;

describe('playground-mock-tools', () => {
  it('createContainer', () => {
    const container = createContainer();
    expect(container.get(EntityManager)).toBeInstanceOf(EntityManager);
    const container2 = createContainer([
      new ContainerModule((bind) => {
        bind('abc').toConstantValue('abc');
      }),
    ]);
    expect(container2.get('abc')).toEqual('abc');
  });
  it('createPlayground', () => {
    const playground = createPlayground();
    expect(playground).toBeInstanceOf(Playground);
  });
  it('createLayerTestState base', async () => {
    class MockLayer extends Layer<any> {
      onReady() {}

      onResize() {}

      onFocus() {}

      onBlur() {}

      onZoom() {}

      onScroll() {}

      onViewportChange() {}

      onReadonlyOrDisabledChange() {}

      autorun() {}
    }

    const layer = createLayerTestState(MockLayer);
    expect(layer.onReady.mock.calls.length).toEqual(1);
    // resize 会触发一次
    expect(layer.onResize.mock.calls.length).toEqual(0);
    expect(layer.onViewportChange.mock.calls.length).toEqual(0);
    expect(layer.autorun.mock.calls.length).toEqual(1);
    expect(layer.onFocus.mock.calls.length).toEqual(0);
    expect(layer.onBlur.mock.calls.length).toEqual(0);
    expect(layer.onZoom.mock.calls.length).toEqual(0);
    expect(layer.onScroll.mock.calls.length).toEqual(0);
    expect(layer.onReadonlyOrDisabledChange.mock.calls.length).toEqual(0);
    layer.playground.focus();
    expect(layer.onFocus.mock.calls.length).toEqual(1);
    layer.playground.focus(); // 重复触发 focus
    expect(layer.onFocus.mock.calls.length).toEqual(1);
    layer.playground.blur();
    expect(layer.onBlur.mock.calls.length).toEqual(1);
    layer.playground.blur(); // 重复触发 blur
    expect(layer.onBlur.mock.calls.length).toEqual(1);
    layer.playground.config.updateConfig({
      zoom: 0.8,
    });
    expect(layer.onZoom.mock.calls).toEqual([[0.8]]);
    expect(layer.onViewportChange.mock.calls.length).toEqual(1);
    layer.playground.config.updateConfig({
      scrollX: 100,
      scrollY: 100,
    });
    expect(layer.onScroll.mock.calls).toEqual([
      [
        {
          scrollX: 100,
          scrollY: 100,
        },
      ],
    ]);
    expect(layer.onViewportChange.mock.calls.length).toEqual(2);
    layer.playground.resize({
      width: 100,
      height: 100,
    });
    expect(layer.onResize.mock.calls).toEqual([[{ width: 100, height: 100 }]]);
    expect(layer.onViewportChange.mock.calls.length).toEqual(3);
    layer.playground.config.readonly = true;
    layer.playground.config.disabled = true;
    expect(layer.onReadonlyOrDisabledChange.mock.calls).toEqual([
      [{ readonly: true, disabled: false }],
      [{ readonly: true, disabled: true }],
    ]);
  });
  it('createLayerTestState playgroundLayer', () => {
    const layerState = createLayerTestState(PlaygroundLayer);
    expect(layerState.onReady.mock.calls.length).toEqual(1);
    expect(layerState.autorun.mock.calls.length).toEqual(1);
    layerState.playground.config.updateConfig({
      scrollX: 100,
    });
    expect(layerState.onReady.mock.calls.length).toEqual(1);
    expect(layerState.autorun.mock.calls.length).toEqual(2);
    layerState.playground.resize({
      width: 100,
      height: 100,
    });
    expect(layerState.autorun.mock.calls.length).toEqual(3);
  });
});
