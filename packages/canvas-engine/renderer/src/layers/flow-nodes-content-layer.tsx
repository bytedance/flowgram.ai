/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactDOM from 'react-dom';
import React from 'react';

import { inject, injectable } from 'inversify';
import { domUtils, Rectangle } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowDocumentTransformerEntity,
  FlowNodeEntity,
  FlowNodeRenderData,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import {
  Layer,
  observeEntity,
  observeEntityDatas,
  PlaygroundEntityContext,
} from '@flowgram.ai/core';

import { FlowRendererKey, FlowRendererRegistry } from '../flow-renderer-registry';

interface NodePortalProps {
  entity: FlowNodeEntity;
  /** 节点内容挂载的宿主 DOM（由 transform layer 创建并定位） */
  container: HTMLElement;
  version: number | undefined;
  activated: boolean | undefined;
  readonly: boolean;
  disabled: boolean;
  Renderer: (props: any) => JSX.Element;
}

/**
 * 单个节点的 Portal 组件。
 *
 * 关键点：用 React.memo 做「每节点」级别的隔离。父层（FlowNodesContentLayer）在
 * 任意节点数据变化或视口变化时都会整体 re-render，但只有 version / activated /
 * readonly / disabled 真正变化的节点才会重新渲染并进入 React commit，其余节点
 * 直接 bail-out，避免 O(N) 的 createPortal / reconcile 开销。
 */
const NodePortal = React.memo(function NodePortal(props: NodePortalProps): JSX.Element {
  const { entity, container, version, activated, readonly, disabled, Renderer } = props;
  React.useEffect(() => {
    // 首次挂载（或重新进入视口挂载）时把真实宽高回写到 transform 数据
    if (
      !entity.getNodeMeta().autoResizeDisable &&
      container.clientWidth &&
      container.clientHeight
    ) {
      const transform = entity.getData<FlowNodeTransformData>(FlowNodeTransformData);
      if (transform) {
        transform.size = {
          width: container.clientWidth,
          height: container.clientHeight,
        };
      }
    }
  }, [entity, container]);
  // 这里使用 portal，改 dom 样式不会引起 react 重新渲染
  return ReactDOM.createPortal(
    <PlaygroundEntityContext.Provider value={entity}>
      <Renderer
        node={entity}
        version={version}
        activated={activated}
        readonly={readonly}
        disabled={disabled}
      />
    </PlaygroundEntityContext.Provider>,
    container
  );
});

/**
 * 渲染节点内容
 */
@injectable()
export class FlowNodesContentLayer extends Layer {
  @inject(FlowDocument) readonly document: FlowDocument;

  @inject(FlowRendererRegistry) readonly rendererRegistry: FlowRendererRegistry;

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  @observeEntityDatas(FlowNodeEntity, FlowNodeRenderData)
  _renderStates: FlowNodeRenderData[];

  get renderStatesVisible(): FlowNodeRenderData[] {
    return this.document.getRenderDatas<FlowNodeRenderData>(FlowNodeRenderData, false);
  }

  /**
   * 是否关闭视口裁剪（虚拟化）。默认开启；如需回退旧的「全量渲染」行为，
   * 可在子类或注册时置为 true。
   */
  protected viewportCullDisable = false;

  /**
   * 视口外预渲染边距（画布坐标，未乘 scale），用于减少快速平移时的露白 / 闪烁。
   */
  protected overscan = 300;

  private renderMemoCache = new WeakMap<any, any>();

  private lastVisibleSignature = '';

  private visibleRenderStatesCache: FlowNodeRenderData[] | undefined;

  private lastViewportBucket = '';

  private lastRenderStatesSignature = '';

  node = domUtils.createDivWithClass('gedit-flow-nodes-layer');

  getPortalRenderer(data: FlowNodeRenderData): (props: any) => JSX.Element {
    const meta = data.entity.getNodeMeta();
    const renderer = this.rendererRegistry.getRendererComponent(
      (meta.renderKey as FlowRendererKey) || FlowRendererKey.NODE_RENDER
    );
    const reactRenderer = renderer.renderer as any;
    let memoCache = this.renderMemoCache.get(reactRenderer);
    if (!memoCache) {
      memoCache = React.memo(reactRenderer);
      this.renderMemoCache.set(reactRenderer, memoCache);
    }
    return memoCache;
  }

  /**
   * 监听缩放，目前采用整体缩放
   * @param scale
   */
  onZoom(scale: number) {
    this.node!.style.transform = `scale(${scale})`;
  }

  onReady() {
    this.node!.style.zIndex = '10';
  }

  /**
   * 监听readonly和 disabled 状态 并刷新layer, 并刷新节点
   */
  onReadonlyOrDisabledChange() {
    this.render();
  }

  /**
   * 视口变化（平移 / 缩放 / resize）时，重算需要渲染的节点，做视口裁剪。
   *
   * 平移过程的 scroll 事件频率很高，如果每次都 force render，React 仍会进入
   * portal 列表 reconcile / commit。这里先用视口 bucket 和可见集合签名短路：
   * 只有可见节点集合真的变化时才触发 React 更新，让常规拖拽尽量只走外层 DOM transform。
   */
  onViewportChange() {
    if (this.viewportCullDisable) return;
    const viewportBucket = this.getViewportBucket();
    if (viewportBucket === this.lastViewportBucket) return;
    this.lastViewportBucket = viewportBucket;
    const visibleRenderStates = this.collectVisibleRenderStates();
    const visibleSignature = this.getVisibleSignature(visibleRenderStates);
    if (visibleSignature === this.lastVisibleSignature) return;
    this.visibleRenderStatesCache = visibleRenderStates;
    this.lastVisibleSignature = visibleSignature;
    this.render();
  }

  /**
   * 仅返回视口内（含 overscan）需要渲染的节点。
   * 离屏节点不生成 Portal，其内容 DOM 会被 React 卸载，从而大幅降低同屏
   * DOM 数量与 React commit 阶段的挂载 / reconcile 开销。
   */
  getVisibleRenderStates(): FlowNodeRenderData[] {
    const all = this.renderStatesVisible;
    if (this.viewportCullDisable) return all;
    const renderStatesSignature = this.getRenderStatesSignature(all);
    if (renderStatesSignature !== this.lastRenderStatesSignature) {
      const visibleRenderStates = this.collectVisibleRenderStates(all);
      this.visibleRenderStatesCache = visibleRenderStates;
      this.lastVisibleSignature = this.getVisibleSignature(visibleRenderStates);
      this.lastViewportBucket = this.getViewportBucket();
      this.lastRenderStatesSignature = renderStatesSignature;
      return visibleRenderStates;
    }
    if (!this.visibleRenderStatesCache) {
      const visibleRenderStates = this.collectVisibleRenderStates(all);
      this.visibleRenderStatesCache = visibleRenderStates;
      this.lastVisibleSignature = this.getVisibleSignature(visibleRenderStates);
      this.lastViewportBucket = this.getViewportBucket();
      this.lastRenderStatesSignature = renderStatesSignature;
    }
    return this.visibleRenderStatesCache;
  }

  private collectVisibleRenderStates(all = this.renderStatesVisible): FlowNodeRenderData[] {
    const viewport = this.config.getViewport();
    const expanded = new Rectangle(
      viewport.x - this.overscan,
      viewport.y - this.overscan,
      viewport.width + this.overscan * 2,
      viewport.height + this.overscan * 2
    );
    return all.filter((data) => {
      const transform = data.entity.getData<FlowNodeTransformData>(FlowNodeTransformData);
      const bounds = transform?.bounds;
      // 尺寸 / 位置未知（尚未测量）的节点先保留，避免首屏布局丢失
      if (!bounds || (bounds.width === 0 && bounds.height === 0)) {
        return true;
      }
      return Rectangle.isViewportVisible(bounds, expanded);
    });
  }

  private getVisibleSignature(renderStates: FlowNodeRenderData[]): string {
    return renderStates.map((data) => data.entity.id).join('|');
  }

  private getRenderStatesSignature(renderStates: FlowNodeRenderData[]): string {
    return renderStates
      .map(
        (data) =>
          `${data.entity.id}:${data.version ?? ''}:${data.activated ? 1 : 0}:${data.node ? 1 : 0}`
      )
      .join('|');
  }

  private getViewportBucket(): string {
    const viewport = this.config.getViewport();
    const bucketSize = Math.max(1, this.overscan / 2);
    return [
      Math.floor(viewport.x / bucketSize),
      Math.floor(viewport.y / bucketSize),
      Math.round(viewport.width),
      Math.round(viewport.height),
      Math.round(this.config.finalScale * 1000),
    ].join('|');
  }

  render() {
    if (this.documentTransformer.loading) return <></>;
    this.documentTransformer.refresh();

    const readonly = this.config.readonly;
    const disabled = this.config.disabled;

    return (
      <>
        {this.getVisibleRenderStates().map((data) => (
          <NodePortal
            key={data.entity.id}
            entity={data.entity}
            container={data.node}
            version={data.version}
            activated={data.activated}
            readonly={readonly}
            disabled={disabled}
            Renderer={this.getPortalRenderer(data)}
          />
        ))}
      </>
    );
  }
}
