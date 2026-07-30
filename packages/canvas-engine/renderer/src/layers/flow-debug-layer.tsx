/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { domUtils } from '@flowgram.ai/utils';
import {
  FlowDocument,
  FlowDocumentTransformerEntity,
  FlowNodeEntity,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import { Layer, observeEntity, observeEntityDatas } from '@flowgram.ai/core';

import { getScrollViewport } from '../utils';

let rgbTimes = 0;

function randomColor(percent: number): string {
  const max = Math.min((percent / 10) * 255, 255);
  rgbTimes += 1;
  // rgb 轮询就可以错开颜色
  const rgb = rgbTimes % 3;
  const random = () => Math.floor(Math.random() * max);
  return `rgb(${rgb === 0 ? random() : 0}, ${rgb === 1 ? random() : 0}, ${
    rgb === 2 ? random() : 0
  })`;
}

/**
 * 调试用，会绘出所有节点的边界
 */
@injectable()
export class FlowDebugLayer extends Layer {
  @inject(FlowDocument) readonly document: FlowDocument;

  @observeEntity(FlowDocumentTransformerEntity)
  readonly documentTransformer: FlowDocumentTransformerEntity;

  @observeEntityDatas(FlowNodeEntity, FlowNodeTransformData) _transforms: FlowNodeTransformData[];

  get transforms(): FlowNodeTransformData[] {
    return this.document.getRenderDatas<FlowNodeTransformData>(FlowNodeTransformData);
  }

  node = document.createElement('div') as HTMLElement;

  viewport = domUtils.createDivWithClass('gedit-flow-debug-bounds');

  boundsNodes = domUtils.createDivWithClass('gedit-flow-debug-bounds');

  pointsNodes = domUtils.createDivWithClass('gedit-flow-debug-points');

  versionNodes = domUtils.createDivWithClass('gedit-flow-debug-versions gedit-hidden');

  /**
   * ?debug=xxxx, 则返回 xxxx
   */
  filterKey = window.location.search.match(/debug=([^&]+)/)?.[1] || '';

  protected originLine = document.createElement('div') as HTMLDivElement;

  domCache = new WeakMap<
    FlowNodeTransformData,
    {
      color: string;
      bbox: HTMLDivElement;
      version: HTMLDivElement;
      input: HTMLDivElement;
      output: HTMLDivElement;
    }
  >();

  onReady() {
    this.node!.style.zIndex = '20';
    domUtils.setStyle(this.originLine, {
      position: 'absolute',
      width: 1,
      height: '100%',
      left: `${-this.config.config.scrollX}px`,
      top: 0,
      borderLeft: '1px dashed rgba(255, 0, 0, 0.5)',
    });
    this.pipelineNode.parentElement!.appendChild(this.originLine);
    this.node.appendChild(this.viewport);
    this.node.appendChild(this.versionNodes);
    this.node.appendChild(this.boundsNodes);
    this.node.appendChild(this.pointsNodes);
    this.renderScrollViewportBounds();
  }

  onScroll() {
    this.originLine.style.left = `${-this.config.config.scrollX}px`;
    this.renderScrollViewportBounds();
  }

  onResize() {
    this.renderScrollViewportBounds();
  }

  onZoom(scale: number) {
    this.node!.style.transform = `scale(${scale})`;
    this.renderScrollViewportBounds();
  }

  createBounds(transform: FlowNodeTransformData, color: string, depth: number): void {
    // 根据 debug=xxxx 进行匹配过滤
    if (this.filterKey && transform.key.indexOf(this.filterKey) === -1) return;
    let cache = this.domCache.get(transform)!;
    const { bounds, inputPoint, outputPoint } = transform;
    if (!cache) {
      const bbox = domUtils.createDivWithClass('') as HTMLDivElement;
      const input = domUtils.createDivWithClass('') as HTMLDivElement;
      const output = domUtils.createDivWithClass('') as HTMLDivElement;
      const version = domUtils.createDivWithClass('') as HTMLDivElement;
      bbox.title = transform.key;
      input.title = transform.key + '(input)';
      output.title = transform.key + '(output)';
      version.title = transform.key;
      this.boundsNodes.appendChild(bbox);
      this.pointsNodes.appendChild(input);
      this.pointsNodes.appendChild(output);
      this.versionNodes.appendChild(version);
      transform.onDispose(() => {
        bbox.remove();
        input.remove();
        output.remove();
      });
      cache = { bbox, input, output, version, color };
      this.domCache.set(transform, cache);
    }
    domUtils.setStyle(cache.version, {
      position: 'absolute',
      marginLeft: '-9px',
      marginTop: '-10px',
      borderRadius: 12,
      background: '#f54a45',
      padding: 4,
      color: 'navajowhite',
      display: transform.renderState.hidden ? 'none' : 'block',
      zIndex: depth + 1000,
      left: bounds.center.x,
      top: bounds.center.y,
    });
    cache.version.innerHTML = transform.version.toString();
    domUtils.setStyle(cache.input, {
      position: 'absolute',
      width: 10,
      height: 10,
      marginLeft: -5,
      marginTop: -5,
      borderRadius: 5,
      left: inputPoint.x,
      top: inputPoint.y,
      opacity: 0.4,
      zIndex: depth,
      backgroundColor: cache.color,
      whiteSpace: 'nowrap',
      overflow: 'visible',
    });
    cache.input.innerHTML = `${inputPoint.x},${inputPoint.y}`;
    domUtils.setStyle(cache.output, {
      position: 'absolute',
      width: 10,
      height: 10,
      marginLeft: -5,
      marginTop: -5,
      borderRadius: 5,
      left: outputPoint.x,
      top: outputPoint.y,
      opacity: 0.4,
      zIndex: depth,
      backgroundColor: cache.color,
      whiteSpace: 'nowrap',
      overflow: 'visible',
    });
    cache.output.innerHTML = `${outputPoint.x},${outputPoint.y}`;
    domUtils.setStyle(cache.bbox, {
      position: 'absolute',
      width: bounds.width,
      height: bounds.height,
      left: bounds.left,
      top: bounds.top,
      opacity: `${depth / 30}`,
      backgroundColor: cache.color,
    });
  }

  /**
   * 显示 viewport 可滚动区域
   */
  renderScrollViewportBounds() {
    const viewportBounds = getScrollViewport(
      {
        scrollX: this.config.config.scrollX,
        scrollY: this.config.config.scrollY,
      },
      this.config
    );
    domUtils.setStyle(this.viewport, {
      position: 'absolute',
      width: viewportBounds.width - 2,
      height: viewportBounds.height - 2,
      left: viewportBounds.left + 1,
      top: viewportBounds.top + 1,
      border: '1px solid rgba(200, 200, 255, 0.5)',
    });
  }

  autorun() {
    if (this.documentTransformer.loading) return;
    this.documentTransformer.refresh();
    // let lastDepth = 0
    let color = randomColor(0);
    this.document.traverse((entity, depth) => {
      const transform = entity.getData<FlowNodeTransformData>(FlowNodeTransformData)!;
      // if (lastDepth !== depth) {
      //   // 层级变化则更新颜色
      // }
      color = randomColor(depth);
      this.createBounds(transform, color, depth);
      // lastDepth = depth
    });
    this.renderScrollViewportBounds();
  }
}
