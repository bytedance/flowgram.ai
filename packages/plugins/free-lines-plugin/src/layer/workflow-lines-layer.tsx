/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactDOM from 'react-dom';
import React, { ReactNode, useLayoutEffect, useState } from 'react';

import { throttle } from 'lodash-es';
import { inject, injectable } from 'inversify';
import { domUtils, Rectangle } from '@flowgram.ai/utils';
import { FlowRendererRegistry } from '@flowgram.ai/renderer';
import { StackingContextManager } from '@flowgram.ai/free-stack-plugin';
import {
  nanoid,
  WorkflowDocument,
  WorkflowHoverService,
  WorkflowLineEntity,
  WorkflowLineRenderData,
  WorkflowNodeEntity,
  WorkflowPortEntity,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-core';
import { Layer, observeEntities, observeEntityDatas, TransformData } from '@flowgram.ai/core';

import { LineRenderProps, LinesLayerOptions } from '../type';
import { WorkflowLineRender } from '../components';

const DEFAULT_VIEWPORT_CULLING_OVERSCAN = 300;

@injectable()
export class WorkflowLinesLayer extends Layer<LinesLayerOptions> {
  static type = 'WorkflowLinesLayer';

  @inject(WorkflowHoverService) hoverService: WorkflowHoverService;

  @inject(WorkflowSelectService) selectService: WorkflowSelectService;

  @inject(StackingContextManager) stackContext: StackingContextManager;

  @inject(FlowRendererRegistry) rendererRegistry: FlowRendererRegistry;

  @observeEntities(WorkflowLineEntity) readonly lines: WorkflowLineEntity[];

  @observeEntities(WorkflowPortEntity) readonly ports: WorkflowPortEntity[];

  @observeEntityDatas(WorkflowNodeEntity, TransformData)
  readonly trans: TransformData[];

  @inject(WorkflowDocument) protected workflowDocument: WorkflowDocument;

  private layerID = nanoid();

  private mountedLines: Map<
    string,
    {
      line: WorkflowLineEntity;
      portal: ReactNode;
      version: string;
    }
  > = new Map();

  private disposeBoundLineIds = new Set<string>();

  private _version = 0;

  /**
   * 节点线条
   */
  public node = domUtils.createDivWithClass('gedit-playground-layer gedit-flow-lines-layer');

  public onZoom(scale: number): void {
    this.node.style.transform = `scale(${scale})`;
  }

  public onViewportChange: ReturnType<typeof throttle> = throttle(() => {
    if (this.isLineViewportCullingEnabled()) {
      this.render();
    }
  }, 80);

  public onReady() {
    this.pipelineNode.appendChild(this.node);
    this.toDispose.pushAll([
      this.selectService.onSelectionChanged(() => this.render()),
      this.hoverService.onHoveredChange(() => this.render()),
      this.workflowDocument.linesManager.onForceUpdate(() => {
        this.mountedLines.clear();
        this.bumpVersion();
        this.render();
      }),
    ]);
  }

  public dispose() {
    this.mountedLines.clear();
    this.disposeBoundLineIds.clear();
  }

  public render(): JSX.Element {
    const [, forceUpdate] = useState({});
    const viewportSignature = this.getViewportSignature();

    useLayoutEffect(() => {
      const updateLines = (): void => {
        let needsUpdate = false;

        // 只更新当前需要渲染 / 保活的线条，避免大图下每帧遍历并计算所有 path。
        this.getRenderableLines().forEach((line) => {
          const renderData = line.getData(WorkflowLineRenderData);
          const oldVersion = renderData.renderVersion;
          renderData.update();
          // 如果有任何一条线发生变化，标记需要更新
          if (renderData.renderVersion !== oldVersion) {
            needsUpdate = true;
          }
        });

        // 只在确实需要更新时触发重渲染
        if (needsUpdate) {
          forceUpdate({});
        }
      };

      const rafId = requestAnimationFrame(updateLines);
      return () => cancelAnimationFrame(rafId);
    }, [this.lines, viewportSignature]); // 依赖项包含 lines 和视口 bucket

    const renderableLines = this.getRenderableLines();
    const renderableLineIds = new Set(renderableLines.map((line) => line.id));
    this.unmountHiddenLines(renderableLineIds);
    const lines = renderableLines.map((line) => this.renderLine(line));
    return <>{lines}</>;
  }

  // 用来绕过 memo
  private bumpVersion() {
    this._version = this._version + 1;
    if (this._version === Number.MAX_SAFE_INTEGER) {
      this._version = 0;
    }
  }

  private lineProps(line: WorkflowLineEntity): LineRenderProps {
    const { lineType } = this.workflowDocument.linesManager;
    const selected = this.selectService.isSelected(line.id);
    const hovered = this.hoverService.isHovered(line.id);
    const version = this.lineVersion(line);

    return {
      key: line.id,
      color: line.color,
      selected,
      hovered,
      line,
      lineType,
      version,
      strokePrefix: this.layerID,
      rendererRegistry: this.rendererRegistry,
    };
  }

  private lineVersion(line: WorkflowLineEntity): string {
    const renderData = line.getData(WorkflowLineRenderData);
    const { renderVersion } = renderData;
    const selected = this.selectService.isSelected(line.id);
    const hovered = this.hoverService.isHovered(line.id);
    const { version: lineVersion, color } = line;

    const version = `v:${this._version},lv:${lineVersion},rv:${renderVersion},c:${color},s:${
      selected ? 'T' : 'F'
    },h:${hovered ? 'T' : 'F'}`;

    return version;
  }

  private lineComponent(props: LineRenderProps): ReactNode {
    const RenderInsideLine = this.options.renderInsideLine ?? (() => <></>);
    return (
      <WorkflowLineRender {...props}>
        <RenderInsideLine {...props} />
      </WorkflowLineRender>
    );
  }

  private renderLine(line: WorkflowLineEntity): ReactNode {
    const lineProps = this.lineProps(line);
    const cache = this.mountedLines.get(line.id);
    const isCached = cache !== undefined;
    const { portal: cachedPortal, version: cachedVersion } = cache ?? {};
    if (isCached && cachedVersion === lineProps.version) {
      // 如果已有缓存且版本相同，则直接返回缓存的 portal
      return cachedPortal;
    }
    if (!isCached) {
      // 如果缓存不存在，则将 line 挂载到 renderElement 上
      this.renderElement.appendChild(line.node);
      this.bindLineDispose(line);
    }
    // 刷新缓存
    const portal = ReactDOM.createPortal(this.lineComponent(lineProps), line.node);
    this.mountedLines.set(line.id, { line, portal, version: lineProps.version });
    return portal;
  }

  private getRenderableLines(): WorkflowLineEntity[] {
    if (!this.isLineViewportCullingEnabled()) {
      return this.lines;
    }
    const viewport = this.getExpandedViewport();
    return this.lines.filter((line) => this.shouldRenderLine(line, viewport));
  }

  private getViewportSignature(): string {
    const viewport = this.config.getViewport();
    const bucketSize = Math.max(1, this.getViewportCullingOverscan() / 2);
    return [
      Math.floor(viewport.x / bucketSize),
      Math.floor(viewport.y / bucketSize),
      Math.round(viewport.width),
      Math.round(viewport.height),
      Math.round(this.config.finalScale * 1000),
    ].join('|');
  }

  private shouldRenderLine(line: WorkflowLineEntity, viewport: Rectangle): boolean {
    if (
      line.isDrawing ||
      line.hasError ||
      line.flowing ||
      this.selectService.isSelected(line.id) ||
      this.hoverService.isHovered(line.id)
    ) {
      return true;
    }
    const bounds = this.getLineCoarseBounds(line);
    return bounds ? this.isBoundsVisible(bounds, viewport) : true;
  }

  private getLineCoarseBounds(line: WorkflowLineEntity): Rectangle | undefined {
    const from = line.drawingFrom || line.fromPort?.point;
    const to = line.drawingTo || line.toPort?.point;
    if (!from || !to) {
      return line.bounds;
    }
    const left = Math.min(from.x, to.x);
    const top = Math.min(from.y, to.y);
    const right = Math.max(from.x, to.x);
    const bottom = Math.max(from.y, to.y);
    return new Rectangle(left, top, right - left, bottom - top).pad(40);
  }

  private unmountHiddenLines(renderableLineIds: Set<string>): void {
    this.mountedLines.forEach(({ line }, id) => {
      if (renderableLineIds.has(id)) {
        return;
      }
      line.node.remove();
      this.mountedLines.delete(id);
    });
  }

  private bindLineDispose(line: WorkflowLineEntity): void {
    if (this.disposeBoundLineIds.has(line.id)) {
      return;
    }
    this.disposeBoundLineIds.add(line.id);
    line.onDispose(() => {
      this.disposeBoundLineIds.delete(line.id);
      this.mountedLines.delete(line.id);
      line.node.remove();
    });
  }

  private isLineViewportCullingEnabled(): boolean {
    return (
      this.options.viewportCulling !== false &&
      (this.config.config as { lineViewportCulling?: boolean }).lineViewportCulling !== false
    );
  }

  private getViewportCullingOverscan(): number {
    return (
      this.options.viewportCullingOverscan ??
      (this.config.config as { viewportCullingOverscan?: number }).viewportCullingOverscan ??
      DEFAULT_VIEWPORT_CULLING_OVERSCAN
    );
  }

  private getExpandedViewport(): Rectangle {
    const viewport = this.config.getViewport();
    const padding = this.getViewportCullingOverscan();
    return new Rectangle(
      viewport.x - padding,
      viewport.y - padding,
      viewport.width + padding * 2,
      viewport.height + padding * 2
    );
  }

  private isBoundsVisible(bounds: Rectangle, viewport: Rectangle): boolean {
    if (!bounds || (bounds.width === 0 && bounds.height === 0)) {
      return true;
    }
    return Rectangle.isViewportVisible(bounds, viewport);
  }

  private get renderElement(): HTMLElement {
    return this.stackContext.node;
  }
}
