/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { interfaces } from 'inversify';
import { cleanup, render } from '@testing-library/react';
import { Message } from '@phosphor/messaging';

import { PlaygroundReactProvider, PlaygroundReactRenderer } from '../src/react';
import { createPlaygroundContainer } from '../src/playground-container';
import { createLayerReactAutorun } from '../src/core/pipeline/pipline-react-utils';
import { PipelineEntitiesImpl, PipelineMessage } from '../src/core';
import { ConfigEntity } from '../src/common';
import { createPlayground } from '../__mocks__/playground-container.mock';
import {
  TestUtilsLayer,
  TestRenderLayer1,
  TestRenderLayer2,
  TestRenderLayer3,
  _TestEntity,
  MockEntityDataRegistry,
} from '../__mocks__/layers.mock';
import { entityManager } from '../__mocks__/create-entity.mock';

class TestConfigEntity extends ConfigEntity<any> {
  static type = TestConfigEntity.name;
}

describe('pipeline render', () => {
  beforeAll(() => {
    // Mock the ResizeObserver
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // Stub the global ResizeObserver
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });
  it('should pipeline rendered', () => {
    const modules: interfaces.ContainerModule[] = [];
    const playgroundRender = render(
      <PlaygroundReactProvider containerModules={modules}>
        <PlaygroundReactRenderer>
          <div></div>
        </PlaygroundReactRenderer>
      </PlaygroundReactProvider>,
    );

    expect(playgroundRender.asFragment()).toMatchSnapshot();
  });

  it('should pipeline rendered with flowContainer', () => {
    const modules: interfaces.ContainerModule[] = [];
    const playgroundRender = render(
      <PlaygroundReactProvider
        containerModules={modules}
        playgroundContainer={createPlaygroundContainer()}
      >
        <PlaygroundReactRenderer />
      </PlaygroundReactProvider>,
    );

    expect(playgroundRender.asFragment()).toMatchSnapshot();
  });

  it('should pipeline rendered with playgroundContext', () => {
    const modules: interfaces.ContainerModule[] = [];
    const playgroundRender = render(
      <PlaygroundReactProvider containerModules={modules} playgroundContext={{}}>
        <PlaygroundReactRenderer />
      </PlaygroundReactProvider>,
    );

    expect(playgroundRender.asFragment()).toMatchSnapshot();
  });

  it('should pipeline implement entities', () => {
    const pipelineEntitiesImpl = new PipelineEntitiesImpl(entityManager);
    expect(pipelineEntitiesImpl.size).toEqual(0);
    entityManager.registerEntity(TestConfigEntity);
    expect(pipelineEntitiesImpl.has(TestConfigEntity)).toEqual(false);
  });

  it('pipeline-react-utils', () => {
    const playground = createPlayground();
    let cbSignal = 1;
    playground.ready();
    const testLayer = new TestUtilsLayer();
    playground.registerLayer(TestUtilsLayer);
    const mockOriginRender = () => <div></div>;
    const renderer = playground.pipelineRegistry.renderer;
    renderer.isReady = false;
    const renderCb = () => {
      cbSignal++;
    };
    const { portal: Portal1, autorun } = createLayerReactAutorun(
      testLayer,
      mockOriginRender,
      renderCb,
      renderer,
    );
    render(<Portal1 />);
    autorun();
    // 1. 没有渲染 dom
    testLayer.setRenderWithReactMemo(false);
    expect(cbSignal).toEqual(1);
    renderer.isReady = true;
    const { portal: Portal2 } = createLayerReactAutorun(
      testLayer,
      mockOriginRender,
      renderCb,
      renderer,
    );
    render(<Portal2 />);
    // 2. 渲染完成调用 renderCb
    expect(cbSignal).toEqual(2);
    const { portal: Portal3 } = createLayerReactAutorun(
      testLayer,
      mockOriginRender,
      renderCb,
      renderer,
    );
    // 3, 使用 undefined 触发 catchError 分支
    render(<Portal3 />);
    cleanup();
    // 4. 渲染空组件
    const mockOriginRenderReturnNull = () => {};
    const { portal: Portal4 } = createLayerReactAutorun(
      testLayer,
      mockOriginRenderReturnNull,
      renderCb,
      renderer,
    );
    const { container } = render(<Portal4 />);
    expect(container).toMatchSnapshot();
  });

  it('pipeline-registry', () => {
    const playground = createPlayground();
    playground.ready();
    // mock 方法
    playground.registerLayer(TestRenderLayer3);
    const registry = playground.pipelineRegistry;
    // 已经注册的 layer 一定有
    const testLayer = registry.getLayer(TestRenderLayer3) as TestRenderLayer3;
    registry.onResizeEmitter.fire({ width: 0, height: 0, clientX: 0, clientY: 0 });
    registry.onFocusEmitter.fire();
    registry.onBlurEmitter.fire();
    registry.onZoomEmitter.fire(1);
    registry.onScrollEmitter.fire({ scrollX: 0, scrollY: 0 });
    expect(testLayer.resizeTimes).toEqual(1);
    expect(testLayer.focusTimes).toEqual(1);
    expect(testLayer.blurTimes).toEqual(1);
    expect(testLayer.zoomTimes).toEqual(1);
    expect(testLayer.scrollTimes).toEqual(1);

    // 模拟事件调用
    registry.listenPlaygroundEvent('test', () => undefined);
    registry.renderer.node.parentNode!.dispatchEvent(new Event('test'));
    registry.renderer.node.parentNode!.dispatchEvent(new Event('test'));

    registry.processMessage(new Message(PipelineMessage.ZOOM));
    registry.processMessage(new Message(PipelineMessage.SCROLL));
    registry.processMessage(new Message('123'));
    expect(testLayer.zoomTimes).toEqual(2);
    expect(testLayer.scrollTimes).toEqual(2);
    testLayer.reloadEntities();
    expect(testLayer.isFocused).toEqual(false);
  });

  it('pipeline-entities', () => {
    const playground = createPlayground();
    playground.ready();
    // autorun 和 render 分支
    playground.registerLayer(TestRenderLayer1);
    playground.registerLayer(TestRenderLayer2);
    const layer1 = playground.getLayer(TestRenderLayer1)!;
    const layer2 = playground.getLayer(TestRenderLayer2)!;
    layer1.autorun();
    layer2.render();
    const renderer = playground.pipelineRegistry.renderer;
    renderer.toReactComponent();
    const Comp = renderer.toReactComponent();
    expect(render(<Comp />)).toMatchSnapshot();
  });

  it('pipeline-entities', () => {
    const playground = createPlayground();
    playground.ready();
    // autorun 和 render 分支
    playground.registerLayer(TestRenderLayer1);
    const layer = playground.getLayer(TestRenderLayer1);
    entityManager.registerEntityData(MockEntityDataRegistry);
    // mock 数据一定能获取值
    const data = entityManager.getDataRegistryByType('mock') as any;
    const observeManager = layer?.observeManager;
    observeManager?.getEntities(data);
    observeManager?.createEntity(data, { savedInManager: false });
    expect(observeManager?.get(data, 'type')).toEqual(undefined);
    observeManager?.updateConfig(data, {});
    expect(observeManager?.getConfig(data)).toEqual(undefined);
    observeManager?.removeEntities(data);
    // 创建 entity
    expect(observeManager?.createEntity(_TestEntity).type).toEqual('test-entity');
    // 第一次运行 set
    observeManager?.getEntityDatas(data, data);
    // 第二次运行有 cache
    observeManager?.getEntityDatas(data, data);
    expect(observeManager?.getConfig(data)).toEqual(undefined);
    // 打印所有的 observeEntities
    for (let i of observeManager!) {
      expect(i).toMatchSnapshot();
    }
  });

  it('pipeline-entities-selector', () => {
    const playground = createPlayground();
    playground.ready();
    const selector = playground.pipelineRegistry.selector;
    playground.registerLayer(TestRenderLayer1);
    const layer1 = playground.getLayer(TestRenderLayer1)!;
    // mock EntityData
    entityManager.registerEntityData(MockEntityDataRegistry);
    const data = entityManager.getDataRegistryByType('mock') as any;
    selector.subscribleEntityByData(layer1, _TestEntity, data);
    const { datas } = selector.getLayerEntityDatas(layer1);
    expect(datas?.length).toEqual(0);
  });
});
