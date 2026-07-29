/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactDOM from 'react-dom';
import React from 'react';

import { inject, injectable } from 'inversify';
import { Cache, type CacheOriginItem, type Disposable, domUtils } from '@flowgram.ai/utils';
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
  ViewportCullingService,
} from '@flowgram.ai/core';

import { FlowRendererKey, FlowRendererRegistry } from '../flow-renderer-registry';

interface NodePortal extends CacheOriginItem {
  id: string;
  Portal: () => JSX.Element;
  entityId: string;
}

/**
 * Renders node content with viewport-based virtualization.
 * Only mounts React Portals for nodes currently visible in the viewport.
 */
@injectable()
export class FlowNodesContentLayer extends Layer {
  @inject(FlowDocument) readonly document: FlowDocument;

  @inject(FlowRendererRegistry) readonly rendererRegistry: FlowRendererRegistry;

  @inject(ViewportCullingService)
  readonly cullingService: ViewportCullingService;

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  @observeEntityDatas(FlowNodeEntity, FlowNodeRenderData)
  _renderStates: FlowNodeRenderData[];

  private _cullingDispose: Disposable | undefined;

  private _enableCulling = true;

  get renderStatesVisible(): FlowNodeRenderData[] {
    return this.document.getRenderDatas<FlowNodeRenderData>(FlowNodeRenderData, false);
  }

  private renderMemoCache = new WeakMap<any, any>();

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

  onZoom(scale: number) {
    this.node!.style.transform = `scale(${scale})`;
  }

  onReady() {
    this.node!.style.zIndex = '10';
    if (this._enableCulling) {
      this._cullingDispose = this.cullingService.onVisibilityChange(() => {
        // Re-render when visibility changes
        this.render();
      });
    }
  }

  dispose(): void {
    this._cullingDispose?.dispose();
    this.reactPortals.dispose();
    super.dispose();
  }

  onReadonlyOrDisabledChange() {
    this.render();
  }

  protected reactPortals = Cache.create<NodePortal, FlowNodeRenderData>(
    (data?: FlowNodeRenderData) => {
      const { node, entity } = data!;
      const { config } = this;
      const PortalRenderer = this.getPortalRenderer(data!);

      function Portal(): JSX.Element {
        React.useEffect(() => {
          if (!entity.getNodeMeta().autoResizeDisable && node.clientWidth && node.clientHeight) {
            const transform = entity.getData<FlowNodeTransformData>(FlowNodeTransformData);
            if (transform)
              transform.size = {
                width: node.clientWidth,
                height: node.clientHeight,
              };
          }
        }, [entity, node]);
        return ReactDOM.createPortal(
          <PlaygroundEntityContext.Provider value={entity}>
            <PortalRenderer
              node={entity}
              version={data?.version}
              activated={data?.activated}
              readonly={config.readonly}
              disabled={config.disabled}
            />
          </PlaygroundEntityContext.Provider>,
          node
        );
      }

      return {
        id: node.id || entity.id,
        entityId: entity.id,
        dispose: () => {},
        Portal,
      } as NodePortal;
    }
  );

  getPortals(): NodePortal[] {
    return this.reactPortals.getMoreByItems(this.renderStatesVisible);
  }

  render() {
    if (this.documentTransformer.loading) return <></>;
    this.documentTransformer.refresh();

    const allPortals = this.getPortals();

    // Viewport culling: only render portals for visible nodes
    if (this._enableCulling && this.cullingService.totalItems > 0) {
      const visibleIds = this.cullingService.visibleIds;
      const visiblePortals = allPortals.filter((portal) => visibleIds.has(portal.entityId));
      return (
        <>
          {visiblePortals.map((portal) => (
            <portal.Portal key={portal.id} />
          ))}
        </>
      );
    }

    // Fallback: render all (when culling not ready)
    return (
      <>
        {allPortals.map((portal) => (
          <portal.Portal key={portal.id} />
        ))}
      </>
    );
  }
}
