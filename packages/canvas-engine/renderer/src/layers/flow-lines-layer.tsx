import React from 'react';

import { groupBy, throttle } from 'lodash';
import { inject, injectable } from 'inversify';
import { domUtils } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowDocumentTransformerEntity,
  FlowNodeEntity,
  FlowNodeTransitionData,
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

  /**
   * 监听 transition 变化
   */
  @observeEntityDatas(FlowNodeEntity, FlowNodeTransitionData)
  _transitions: FlowNodeTransitionData[];

  get transitions(): FlowNodeTransitionData[] {
    return this.document.getRenderDatas<FlowNodeTransitionData>(FlowNodeTransitionData);
  }

  /**
   * 可视区域变化
   */
  onViewportChange = throttle(() => {
    this.render();
  }, 100);

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
    // 还没初始化
    if (this.documentTransformer.loading) return <></>;
    this.documentTransformer.refresh();

    this.transitions.forEach((transition) => {
      createLines({
        data: transition,
        rendererRegistry: this.rendererRegistry,
        isViewportVisible,
        linesSave: allLines,
        dragService: this.dragService,
      });
    });

    // svg 没有 z-index，只能通过顺序来设置前后层级
    // 通过将 activated 的项排到最后，防止 hover 层级覆盖
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
