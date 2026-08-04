/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Container, decorate, injectable, type interfaces } from 'inversify';
import {
  FlowDocument,
  FlowDocumentContainerModule,
  FlowDocumentContribution,
  FlowNodeRenderData,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import {
  createDefaultPlaygroundConfig,
  PlaygroundConfigEntity,
  PlaygroundConfig,
  PlaygroundContainerModule,
} from '@flowgram.ai/core';

import { FlowRendererRegistry } from '../../src/flow-renderer-registry';
import { FlowRendererContribution } from '../../src/flow-renderer-contribution';
import { FlowRendererContainerModule } from '../../src/flow-renderer-container-module';
import { FlowNodesTransformLayer } from '../../src';
import { flowJson } from '../../__mocks__/flow-json.mock';
import { FlowDocumentMockRegister } from '../../__mocks__/flow-document-container.mock';

class FlowRenderMockRegister implements FlowRendererContribution {
  registerRenderer(registry: FlowRendererRegistry): void {
    registry.registerLayers(FlowNodesTransformLayer);
  }
}

decorate(injectable(), FlowRenderMockRegister);

function createDocumentContainer(): interfaces.Container {
  const container = new Container();
  container.load(FlowDocumentContainerModule);
  container.bind(FlowDocumentContribution).to(FlowDocumentMockRegister);
  return container;
}

// layer 层 drag entity 单测
describe('flow-transform-layer', () => {
  let container = createDocumentContainer();
  let document: FlowDocument;
  let registry: FlowRendererRegistry;

  beforeEach(() => {
    container = createDocumentContainer();
    container.load(FlowRendererContainerModule);
    container.load(PlaygroundContainerModule);
    container.bind(FlowRendererContribution).to(FlowRenderMockRegister);
    container.bind(PlaygroundConfig).toConstantValue(createDefaultPlaygroundConfig());

    document = container.get<FlowDocument>(FlowDocument);
    document.init();
    document.fromJSON(flowJson);
    registry = container.get<FlowRendererRegistry>(FlowRendererRegistry);
    registry.init();

    // Mock the ResizeObserver
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    // Stub the global ResizeObserver
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  // 测试初始化
  it('test ready', () => {
    registry.pipeline.renderer.layers.forEach((layer) => {
      (layer as FlowNodesTransformLayer).onReady();
      expect(layer.node.style.zIndex).toEqual('10');
    });
  });

  // 缩放
  it('test zoom', () => {
    registry.pipeline.renderer.layers.forEach((layer) => {
      (layer as FlowNodesTransformLayer).onZoom(2);
      expect(layer.node!.style.transform).toEqual('scale(2)');
    });
  });

  // FIXME: render 单测目前不全
  // 渲染
  it('test render', () => {
    registry.pipeline.renderer.layers.forEach((layer) => {
      // const autorun = registry.pipeline.renderer.layerAutorunMap.get(layer);
      // autorun?.();
      (layer as FlowNodesTransformLayer).updateNodesBounds();
    });
  });

  it('culls transform host dom outside viewport and remounts when visible', () => {
    const layer = registry.pipeline.renderer.layers[0] as FlowNodesTransformLayer;
    layer.onReady();
    (layer as any).config.updateConfig({
      width: 100,
      height: 100,
      viewportCulling: true,
      viewportCullingOverscan: 0,
    });
    document.transformer.refresh();
    const nodes = document
      .getAllNodes()
      .filter((node) => node.id !== 'root')
      .sort(
        (a, b) =>
          a.getData<FlowNodeTransformData>(FlowNodeTransformData).bounds.x -
          b.getData<FlowNodeTransformData>(FlowNodeTransformData).bounds.x
      );
    const visibleNode = nodes[0];
    const hiddenNode = nodes[nodes.length - 1];
    const visibleBounds = visibleNode.getData<FlowNodeTransformData>(FlowNodeTransformData).bounds;
    const hiddenBounds = hiddenNode.getData<FlowNodeTransformData>(FlowNodeTransformData).bounds;
    (layer as any).config.updateConfig({
      scrollX: visibleBounds.x,
      scrollY: visibleBounds.y,
    });

    layer.updateNodesBounds();

    expect(visibleNode.getData<FlowNodeRenderData>(FlowNodeRenderData).node.parentElement).toBe(
      layer.node
    );
    expect(
      hiddenNode.getData<FlowNodeRenderData>(FlowNodeRenderData).node.parentElement
    ).toBeNull();

    (layer as any).config.updateConfig({
      scrollX: hiddenBounds.x,
      scrollY: hiddenBounds.y,
    });
    layer.updateNodesBounds();

    expect(hiddenNode.getData<FlowNodeRenderData>(FlowNodeRenderData).node.parentElement).toBe(
      layer.node
    );
  });

  it('keeps interactive offscreen transform host mounted', () => {
    const layer = registry.pipeline.renderer.layers[0] as FlowNodesTransformLayer;
    layer.onReady();
    (layer as any).config.updateConfig({
      width: 100,
      height: 100,
      viewportCulling: true,
      viewportCullingOverscan: 0,
    });
    const node = document.getAllNodes().find((n) => n.id !== 'root')!;
    document.transformer.refresh();
    const bounds = node.getData<FlowNodeTransformData>(FlowNodeTransformData).bounds;
    (layer as any).config.updateConfig({
      scrollX: bounds.x + 1000,
      scrollY: bounds.y + 1000,
    });
    node.getData<FlowNodeRenderData>(FlowNodeRenderData).activated = true;

    layer.updateNodesBounds();

    expect(node.getData<FlowNodeRenderData>(FlowNodeRenderData).node.parentElement).toBe(
      layer.node
    );
  });

  it('culls offscreen transform host when auto resize is disabled', () => {
    const layer = registry.pipeline.renderer.layers[0] as FlowNodesTransformLayer;
    layer.onReady();
    (layer as any).config.updateConfig({
      width: 100,
      height: 100,
      viewportCulling: true,
      viewportCullingOverscan: 0,
    });
    const node = document.getAllNodes().find((n) => n.id !== 'root')!;
    vi.spyOn(node, 'getNodeMeta').mockReturnValue({
      ...node.getNodeMeta(),
      autoResizeDisable: true,
    });
    document.transformer.refresh();
    const bounds = node.getData<FlowNodeTransformData>(FlowNodeTransformData).bounds;
    (layer as any).config.updateConfig({
      scrollX: bounds.x,
      scrollY: bounds.y,
    });
    layer.updateNodesBounds();
    expect(node.getData<FlowNodeRenderData>(FlowNodeRenderData).node.parentElement).toBe(
      layer.node
    );

    (layer as any).config.updateConfig({
      scrollX: bounds.x + 1000,
      scrollY: bounds.y + 1000,
    });
    layer.updateNodesBounds();

    expect(node.getData<FlowNodeRenderData>(FlowNodeRenderData).node.parentElement).toBeNull();
  });
});
