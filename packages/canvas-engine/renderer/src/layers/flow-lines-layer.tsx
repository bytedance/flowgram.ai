/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { groupBy, throttle } from 'lodash-es';
import { inject, injectable } from 'inversify';
import { domUtils, Rectangle } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowDocumentTransformerEntity,
  FlowNodeEntity,
  FlowNodeTransitionData,
  FlowNodeTransformData,
  FlowRendererStateEntity,
  FlowDragService,
} from '@flowgram.ai/document';
import { Layer, observeEntity, observeEntityDatas } from '@flowgram.ai/core';

import { FlowRendererRegistry } from '../flow-renderer-registry';
import { createLines } from '../components/LinesRenderer';

@injectable()
export class FlowLinesLayer extends Layer {
  @inject(FlowDocument) readonly document: FlowDocument;

  @inject(FlowDragService)
  protected readonly dragService: FlowDragService;

  @inject(FlowRendererRegistry) readonly rendererRegistry: FlowRendererRegistry;

  node = domUtils.createDivWithClass('gedit-flow-lines-layer');

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  @observeEntity(FlowRendererStateEntity)
  readonly flowRenderState: FlowRendererStateEntity;

  @observeEntityDatas(FlowNodeEntity, FlowNodeTransitionData)
  _transitions: FlowNodeTransitionData[];

  get transitions(): FlowNodeTransitionData[] {
    return this.document.getRenderDatas<FlowNodeTransitionData>(FlowNodeTransitionData);
  }

  onViewportChange: ReturnType<typeof throttle> = throttle(() => {
    this.render();
  }, 50);

  onZoom() {
    const svgContainer = this.node!.querySelector('svg.flow-lines-container')!;
    svgContainer?.setAttribute?.('viewBox', this.viewBox);
  }

  onReady() {
    this.node.style.zIndex = '1';
  }

  get viewBox(): string {
    const ratio = 1000 / this.config.finalScale;
    return `0 0 ${ratio} ${ratio}`;
  }

  render(): JSX.Element {
    const allLines: JSX.Element[] = [];
    const isViewportVisible = this.config.isViewportVisible.bind(this.config);
    if (this.documentTransformer.loading) return <></>;
    this.documentTransformer.refresh();

    // Pre-filter transitions by viewport: skip transitions whose node is far off-screen
    const viewport = this.config.getViewport(true);
    const expandedViewport = new Rectangle(
      viewport.x - viewport.width * 0.5,
      viewport.y - viewport.height * 0.5,
      viewport.width * 2,
      viewport.height * 2
    );

    const transitions = this.transitions;
    for (let i = 0; i < transitions.length; i++) {
      const transition = transitions[i];
      // Quick reject: if the node's bounds are entirely outside the expanded viewport, skip
      const nodeBounds = transition.entity.getData(FlowNodeTransformData)?.bounds;
      if (nodeBounds && !Rectangle.intersects(nodeBounds, expandedViewport)) {
        continue;
      }
      createLines({
        data: transition,
        rendererRegistry: this.rendererRegistry,
        isViewportVisible,
        linesSave: allLines,
        dragService: this.dragService,
      });
    }

    const { activateLines = [], normalLines = [] } = groupBy(allLines, (line) =>
      line.props.activated ? 'activateLines' : 'normalLines'
    );
    const resultLines = [...normalLines, ...activateLines];

    return (
      <svg
        className="flow-lines-container"
        width="1000"
        height="1000"
        overflow="visible"
        viewBox={this.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {resultLines}
      </svg>
    );
  }
}
