/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { DisposableCollection, Emitter, type IPoint, type Rectangle } from '@flowgram.ai/utils';
import { FlowNodeBaseType, FlowNodeRenderData, FlowNodeTransformData } from '@flowgram.ai/document';
import { EntityManager, PlaygroundConfigEntity } from '@flowgram.ai/core';

import { WorkflowDocumentOptions } from './workflow-document-option';
import { type WorkflowDocument } from './workflow-document';
import { getPortEntityIdByNodeId } from './utils/statics';
import { WorkflowPortType } from './utils';
import {
  LineColor,
  LineColors,
  LinePoint,
  LineRenderType,
  LineType,
  type WorkflowLineRenderContributionFactory,
} from './typings/workflow-line';
import {
  type WorkflowContentChangeEvent,
  WorkflowContentChangeType,
  type WorkflowEdgeJSON,
  WorkflowNodeRegistry,
} from './typings';
import { WorkflowHoverService, WorkflowSelectService } from './service';
import { WorkflowNodeLinesData } from './entity-datas/workflow-node-lines-data';
import { WorkflowLineRenderData } from './entity-datas';
import {
  LINE_HOVER_DISTANCE,
  WorkflowLineEntity,
  type WorkflowLineInfo,
  type WorkflowLinePortInfo,
  WorkflowNodeEntity,
  WorkflowPortEntity,
} from './entities';

/**
 * 线条管理
 */
@injectable()
export class WorkflowLinesManager {
  protected document: WorkflowDocument;

  protected toDispose = new DisposableCollection();

  protected readonly portLineMap = new Map<string, Set<WorkflowLineEntity>>();
  // 线条类型

  protected _lineType: LineRenderType = LineType.BEZIER;

  protected onAvailableLinesChangeEmitter = new Emitter<WorkflowContentChangeEvent>();

  protected onForceUpdateEmitter = new Emitter<void>();

  private sortedNodesCache?: WorkflowNodeEntity[];

  private sortedNodesCacheVersion?: number;

  private hoverNodesCache?: WorkflowNodeEntity[];

  private hoverNodesCacheVersion?: number;

  private hoverNodesCacheActivatedID?: string;

  @inject(WorkflowHoverService) hoverService: WorkflowHoverService;

  @inject(WorkflowSelectService) selectService: WorkflowSelectService;

  @inject(EntityManager) protected readonly entityManager: EntityManager;

  @inject(WorkflowDocumentOptions)
  readonly options: WorkflowDocumentOptions;

  /**
   * 有效的线条被添加或者删除时候触发，未连上的线条不算
   */
  readonly onAvailableLinesChange = this.onAvailableLinesChangeEmitter.event;

  /**
   * 强制渲染 lines
   */
  readonly onForceUpdate = this.onForceUpdateEmitter.event;

  readonly contributionFactories: WorkflowLineRenderContributionFactory[] = [];

  init(doc: WorkflowDocument): void {
    this.document = doc;
  }

  forceUpdate() {
    this.onForceUpdateEmitter.fire();
  }

  invalidateSortedNodesCache(): void {
    this.sortedNodesCache = undefined;
    this.sortedNodesCacheVersion = undefined;
  }

  get lineType() {
    return this._lineType;
  }

  get lineColor(): LineColor {
    const color: LineColor = {
      default: LineColors.DEFUALT,
      error: LineColors.ERROR,
      hidden: LineColors.HIDDEN,
      drawing: LineColors.DRAWING,
      hovered: LineColors.HOVER,
      selected: LineColors.SELECTED,
      flowing: LineColors.FLOWING,
    };
    if (this.options.lineColor) {
      Object.assign(color, this.options.lineColor);
    }
    return color;
  }

  switchLineType(newType?: LineRenderType): LineRenderType {
    if (newType === undefined) {
      if (this._lineType === LineType.BEZIER) {
        newType = LineType.LINE_CHART;
      } else {
        newType = LineType.BEZIER;
      }
    }
    if (newType !== this._lineType) {
      this._lineType = newType;
      // 更新线条数据
      this.getAllLines().forEach((line) => {
        line.getData(WorkflowLineRenderData).update();
      });
      window.requestAnimationFrame(() => {
        // 触发线条重渲染
        this.entityManager.fireEntityChanged(WorkflowLineEntity.type);
      });
    }
    return this._lineType;
  }

  getAllLines(): WorkflowLineEntity[] {
    return this.entityManager.getEntities(WorkflowLineEntity);
  }

  getLinesByPortId(portId: string): WorkflowLineEntity[] {
    return Array.from(this.portLineMap.get(portId) || []);
  }

  rebindLinePorts(
    line: WorkflowLineEntity,
    prevInfo?: WorkflowLineInfo,
    nextInfo?: WorkflowLineInfo
  ): void {
    const prevFromPortId = this.getLinePortId(prevInfo, 'output');
    const prevToPortId = this.getLinePortId(prevInfo, 'input');
    const nextFromPortId = this.getLinePortId(nextInfo, 'output');
    const nextToPortId = this.getLinePortId(nextInfo, 'input');

    if (prevFromPortId !== nextFromPortId) {
      this.detachLineFromPortId(line, prevFromPortId);
      this.attachLineToPortId(line, nextFromPortId);
    }

    if (prevToPortId !== nextToPortId) {
      this.detachLineFromPortId(line, prevToPortId);
      this.attachLineToPortId(line, nextToPortId);
    }
  }

  private attachLineToPortId(line: WorkflowLineEntity, portId?: string): void {
    if (!portId) {
      return;
    }
    let lines = this.portLineMap.get(portId);
    if (!lines) {
      lines = new Set();
      this.portLineMap.set(portId, lines);
    }
    lines.add(line);
  }

  private detachLineFromPortId(line: WorkflowLineEntity, portId?: string): void {
    if (!portId) {
      return;
    }
    const lines = this.portLineMap.get(portId);
    if (!lines) {
      return;
    }
    lines.delete(line);
    if (!lines.size) {
      this.portLineMap.delete(portId);
    }
  }

  private getLinePortId(
    info: WorkflowLineInfo | undefined,
    portType: WorkflowPortType
  ): string | undefined {
    if (!info) {
      return undefined;
    }
    const nodeId = portType === 'output' ? info.from : info.to;
    if (!nodeId) {
      return undefined;
    }
    const portId = portType === 'output' ? info.fromPort : info.toPort;
    return getPortEntityIdByNodeId(nodeId, portType, portId);
  }

  getAllAvailableLines(): WorkflowLineEntity[] {
    return this.getAllLines().filter((l) => !l.isDrawing && !l.isHidden);
  }

  hasLine(portInfo: Omit<WorkflowLinePortInfo, 'data'>): boolean {
    return !!this.entityManager.getEntityById<WorkflowLineEntity>(
      WorkflowLineEntity.portInfoToLineId(portInfo)
    );
  }

  getLine(portInfo: Omit<WorkflowLinePortInfo, 'data'>): WorkflowLineEntity | undefined {
    return this.entityManager.getEntityById<WorkflowLineEntity>(
      WorkflowLineEntity.portInfoToLineId(portInfo)
    );
  }

  getLineById(id: string): WorkflowLineEntity | undefined {
    return this.entityManager.getEntityById<WorkflowLineEntity>(id);
  }

  replaceLine(
    oldPortInfo: Omit<WorkflowLinePortInfo, 'data'>,
    newPortInfo: Omit<WorkflowLinePortInfo, 'data'>
  ): WorkflowLineEntity {
    const oldLine = this.getLine(oldPortInfo);
    if (oldLine) {
      oldLine.dispose();
    }
    return this.createLine(newPortInfo)!;
  }

  createLine(
    options: {
      drawingTo?: LinePoint; // 无连接的线条
      drawingFrom?: LinePoint;
      key?: string; // 自定义 key
    } & WorkflowLinePortInfo
  ): WorkflowLineEntity | undefined {
    const { from, to, drawingTo, fromPort, drawingFrom, toPort, data } = options;
    const available = Boolean(from && to);
    const key = options.key || WorkflowLineEntity.portInfoToLineId(options);
    let line = this.entityManager.getEntityById<WorkflowLineEntity>(key)!;
    if (line) {
      // 如果之前有线条，则先把颜色去掉
      line.highlightColor = '';
      line.validate();
      return line;
    }

    const fromNode = from
      ? this.entityManager
          .getEntityById<WorkflowNodeEntity>(from)!
          .getData<WorkflowNodeLinesData>(WorkflowNodeLinesData)
      : undefined;
    const toNode = to
      ? this.entityManager
          .getEntityById<WorkflowNodeEntity>(to)!
          .getData<WorkflowNodeLinesData>(WorkflowNodeLinesData)!
      : undefined;

    if (!fromNode && !toNode) {
      // 非法情况
      return;
    }

    this.isDrawing = Boolean(drawingTo || drawingFrom);
    line = this.entityManager.createEntity<WorkflowLineEntity>(WorkflowLineEntity, {
      id: key,
      document: this.document,
      linesManager: this,
      from,
      fromPort,
      toPort,
      to,
      drawingTo,
      drawingFrom,
      data,
    });

    this.registerData(line);

    fromNode?.addLine(line);
    toNode?.addLine(line);
    line.onDispose(() => {
      this.isDrawing = false;
      fromNode?.removeLine(line);
      toNode?.removeLine(line);
    });
    line.onDispose(() => {
      if (available) {
        this.onAvailableLinesChangeEmitter.fire({
          type: WorkflowContentChangeType.DELETE_LINE,
          toJSON: () => line.toJSON(),
          entity: line,
        });
      }
    });
    line.onLineDataChange(({ oldValue }) => {
      this.onAvailableLinesChangeEmitter.fire({
        type: WorkflowContentChangeType.LINE_DATA_CHANGE,
        toJSON: () => line.toJSON(),
        oldValue,
        entity: line,
      });
    });
    // 是否为有效的线条
    if (available) {
      this.onAvailableLinesChangeEmitter.fire({
        type: WorkflowContentChangeType.ADD_LINE,
        toJSON: () => line.toJSON(),
        entity: line,
      });
    }
    // 创建时检验 连线错误态 & 端口错误态
    line.validate();
    return line;
  }

  /**
   * 获取线条中距离鼠标位置最近的线条和距离
   * @param mousePos 鼠标位置
   * @param minDistance 最小检测距离
   * @returns 距离鼠标位置最近的线条 以及距离
   */
  getCloseInLineFromMousePos(
    mousePos: IPoint,
    minDistance: number = LINE_HOVER_DISTANCE
  ): WorkflowLineEntity | undefined {
    let targetLine: WorkflowLineEntity | undefined, targetLineDist: number | undefined;
    const lines = this.getAllLines();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!this.isPointInBounds(mousePos, line.bounds, minDistance)) {
        continue;
      }
      const dist = line.getHoverDist(mousePos);

      if (dist <= minDistance && (targetLineDist === undefined || targetLineDist >= dist)) {
        targetLineDist = dist;
        targetLine = line;
      }
    }
    return targetLine;
  }

  /**
   * 是否在调整线条
   */
  isDrawing = false;

  dispose(): void {
    this.portLineMap.clear();
    this.toDispose.dispose();
  }

  get disposed(): boolean {
    return this.toDispose.disposed;
  }

  isErrorLine(fromPort?: WorkflowPortEntity, toPort?: WorkflowPortEntity, defaultValue?: boolean) {
    if (this.options.isErrorLine) {
      return this.options.isErrorLine(fromPort, toPort, this);
    }

    return !!defaultValue;
  }

  isReverseLine(line: WorkflowLineEntity, defaultValue = false): boolean {
    if (this.options.isReverseLine) {
      return this.options.isReverseLine(line);
    }

    return defaultValue;
  }

  isHideArrowLine(line: WorkflowLineEntity, defaultValue = false): boolean {
    if (this.options.isHideArrowLine) {
      return this.options.isHideArrowLine(line);
    }

    return defaultValue;
  }

  isFlowingLine(line: WorkflowLineEntity, defaultValue = false): boolean {
    if (this.options.isFlowingLine) {
      return this.options.isFlowingLine(line);
    }

    return defaultValue;
  }

  isDisabledLine(line: WorkflowLineEntity, defaultValue = false): boolean {
    if (this.options.isDisabledLine) {
      return this.options.isDisabledLine(line);
    }
    return defaultValue;
  }

  setLineRenderType(line: WorkflowLineEntity): LineRenderType | undefined {
    if (this.options.setLineRenderType) {
      return this.options.setLineRenderType(line);
    }
    return undefined;
  }

  setLineClassName(line: WorkflowLineEntity): string | undefined {
    if (this.options.setLineClassName) {
      return this.options.setLineClassName(line);
    }
    return undefined;
  }

  getLineColor(line: WorkflowLineEntity): string | undefined {
    // 隐藏的优先级比 hasError 高
    if (line.isHidden) {
      return this.lineColor.hidden;
    }
    // 颜色锁定
    if (line.lockedColor) {
      return line.lockedColor;
    }
    if (line.hasError) {
      return this.lineColor.error;
    }
    if (line.highlightColor) {
      return line.highlightColor;
    }
    if (line.drawingTo) {
      return this.lineColor.drawing;
    }
    if (this.hoverService.isHovered(line.id)) {
      return this.lineColor.hovered;
    }
    if (this.selectService.isSelected(line.id)) {
      return this.lineColor.selected;
    }
    // 检查是否为流动线条
    if (this.isFlowingLine(line)) {
      return this.lineColor.flowing;
    }
    return this.lineColor.default;
  }

  canAddLine(fromPort: WorkflowPortEntity, toPort: WorkflowPortEntity, silent?: boolean): boolean {
    if (
      fromPort === toPort ||
      fromPort.node === toPort.node ||
      fromPort.portType !== 'output' ||
      toPort.portType !== 'input' ||
      fromPort.disabled ||
      toPort.disabled
    ) {
      return false;
    }
    const fromCanAdd = fromPort.node.getNodeRegistry<WorkflowNodeRegistry>().canAddLine;
    const toCanAdd = toPort.node.getNodeRegistry<WorkflowNodeRegistry>().canAddLine;
    if (fromCanAdd && !fromCanAdd(fromPort, toPort, this, silent)) {
      return false;
    }
    if (toCanAdd && !toCanAdd(fromPort, toPort, this, silent)) {
      return false;
    }
    if (this.options.canAddLine) {
      return this.options.canAddLine(fromPort, toPort, this, silent);
    }
    // 默认不能连接自己
    return fromPort.node !== toPort.node;
  }

  toJSON(): WorkflowEdgeJSON[] {
    return this.getAllLines()
      .filter((l) => !l.isDrawing)
      .map((l) => l.toJSON());
  }

  getPortById(portId: string): WorkflowPortEntity | undefined {
    return this.entityManager.getEntityById<WorkflowPortEntity>(portId);
  }

  canRemove(
    line: WorkflowLineEntity,
    newLineInfo?: Required<Omit<WorkflowLinePortInfo, 'data'>>,
    silent?: boolean
  ): boolean {
    if (
      this.options &&
      this.options.canDeleteLine &&
      !this.options.canDeleteLine(line, newLineInfo, silent)
    ) {
      return false;
    }
    return true;
  }

  canReset(oldLine: WorkflowLineEntity, newLineInfo: Required<WorkflowLinePortInfo>): boolean {
    if (
      this.options &&
      this.options.canResetLine &&
      !this.options.canResetLine(oldLine, newLineInfo, this)
    ) {
      return false;
    }
    return true;
  }

  /**
   * 根据鼠标位置找到 port
   * @param pos
   */
  getPortFromMousePos(pos: IPoint, portType?: WorkflowPortType): WorkflowPortEntity | undefined {
    return this.getHoveredPortFromSortedNodes(pos, this.getSortedNodes(), portType);
  }

  getPortsFromMousePos(pos: IPoint): {
    input?: WorkflowPortEntity;
    output?: WorkflowPortEntity;
  } {
    return this.getHoveredPortsFromSortedNodes(pos, this.getSortedNodes(), undefined, {
      collectBoth: true,
    });
  }

  getNodeAndPortFromMousePos(
    pos: IPoint,
    portType?: WorkflowPortType
  ): {
    node?: WorkflowNodeEntity;
    port?: WorkflowPortEntity;
  } {
    const sortedNodes = this.getSortedNodes();
    const nodeHitInfo = this.getNodeHitInfoFromSortedNodes(
      pos,
      sortedNodes,
      this.selectService.selection
    );
    const ports = this.getHoveredPortsFromSortedNodes(pos, sortedNodes, portType, {
      topCoverNode: nodeHitInfo.topCoverNode,
    });
    return {
      node: nodeHitInfo.topNode,
      port: ports.port,
    };
  }

  getHoverNodeFromMousePos(pos: IPoint): WorkflowNodeEntity | undefined {
    const nodes = this.getHoverNodes();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const { bounds } = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      if (this.isPointInBounds(pos, bounds)) {
        return node;
      }
    }
  }

  /**
   * 根据鼠标位置找到 node
   * @param pos - 鼠标位置
   */
  getNodeFromMousePos(pos: IPoint): WorkflowNodeEntity | undefined {
    // 先挑选出 bounds 区域符合的 node
    return this.getTopNodeFromSortedNodes(pos, this.getSortedNodes(), this.selectService.selection);
  }

  registerContribution(factory: WorkflowLineRenderContributionFactory): this {
    this.contributionFactories.push(factory);
    return this;
  }

  private registerData(line: WorkflowLineEntity) {
    line.addData(WorkflowLineRenderData);
  }

  private getSortedNodes() {
    const nodeVersion = this.entityManager.getEntityVersion(WorkflowNodeEntity);
    if (this.sortedNodesCache && this.sortedNodesCacheVersion === nodeVersion) {
      return this.sortedNodesCache;
    }
    this.sortedNodesCache = [...this.document.getAllNodes()].sort(
      (a, b) => this.getNodeIndex(a) - this.getNodeIndex(b)
    );
    this.sortedNodesCacheVersion = nodeVersion;
    return this.sortedNodesCache;
  }

  private getHoveredPortFromSortedNodes(
    pos: IPoint,
    sortedNodes: WorkflowNodeEntity[],
    portType?: WorkflowPortType
  ): WorkflowPortEntity | undefined {
    return this.getHoveredPortsFromSortedNodes(pos, sortedNodes, portType).port;
  }

  private getHoveredPortsFromSortedNodes(
    pos: IPoint,
    sortedNodes: WorkflowNodeEntity[],
    portType?: WorkflowPortType,
    options: {
      collectBoth?: boolean;
      topCoverNode?: WorkflowNodeEntity;
    } = {}
  ): {
    input?: WorkflowPortEntity;
    output?: WorkflowPortEntity;
    port?: WorkflowPortEntity;
  } {
    let inputPort: WorkflowPortEntity | undefined;
    let outputPort: WorkflowPortEntity | undefined;
    let anyPort: WorkflowPortEntity | undefined;
    const { collectBoth = false } = options;

    for (let i = sortedNodes.length - 1; i >= 0; i--) {
      const node = sortedNodes[i];
      if (!portType && !anyPort) {
        anyPort = this.findHoveredPort(node.ports.allPorts, pos);
      }
      if ((!portType || portType === 'output') && !outputPort) {
        outputPort = this.findHoveredPort(node.ports.outputPorts, pos);
      }
      if ((!portType || portType === 'input') && !inputPort) {
        inputPort = this.findHoveredPort(node.ports.inputPorts, pos);
      }
      if (
        (portType === 'input' && inputPort) ||
        (portType === 'output' && outputPort) ||
        (!portType && (collectBoth ? inputPort && outputPort : anyPort))
      ) {
        break;
      }
    }

    const needCoverCheck = inputPort || outputPort || anyPort;
    const topCoverNode = needCoverCheck
      ? options.topCoverNode || this.getNodeHitInfoFromSortedNodes(pos, sortedNodes).topCoverNode
      : undefined;

    inputPort = this.filterCoveredPort(inputPort, topCoverNode);
    outputPort = this.filterCoveredPort(outputPort, topCoverNode);
    anyPort = this.filterCoveredPort(anyPort, topCoverNode);

    return {
      input: inputPort,
      output: outputPort,
      port: portType === 'input' ? inputPort : portType === 'output' ? outputPort : anyPort,
    };
  }

  private findHoveredPort(
    ports: WorkflowPortEntity[],
    pos: IPoint
  ): WorkflowPortEntity | undefined {
    for (let i = 0; i < ports.length; i++) {
      const port = ports[i];
      if (port.isHovered(pos.x, pos.y)) {
        return port;
      }
    }
  }

  private filterCoveredPort(
    port: WorkflowPortEntity | undefined,
    topCoverNode: WorkflowNodeEntity | undefined
  ): WorkflowPortEntity | undefined {
    // 点位可能会被节点覆盖
    if (port && topCoverNode && topCoverNode !== port.node) {
      return undefined;
    }
    return port;
  }

  private getTopNodeFromSortedNodes(
    pos: IPoint,
    sortedNodes: WorkflowNodeEntity[],
    selection?: WorkflowSelectService['selection']
  ): WorkflowNodeEntity | undefined {
    return this.getNodeHitInfoFromSortedNodes(pos, sortedNodes, selection).topNode;
  }

  private getNodeHitInfoFromSortedNodes(
    pos: IPoint,
    sortedNodes: WorkflowNodeEntity[],
    selection?: WorkflowSelectService['selection']
  ): {
    topCoverNode?: WorkflowNodeEntity;
    topNode?: WorkflowNodeEntity;
  } {
    const zoom =
      this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)?.config?.zoom ||
      1;
    const padding = 4 / zoom;
    const selectedIDs = selection?.length ? new Set(selection.map((node) => node.id)) : undefined;
    let topCoverNode: WorkflowNodeEntity | undefined;

    for (let i = sortedNodes.length - 1; i >= 0; i--) {
      const node = sortedNodes[i];
      const { bounds } = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // 交互要求，节点边缘 4px 的时候就认为选中节点
      if (!this.isPointInBounds(pos, bounds, padding)) {
        continue;
      }

      if (!topCoverNode) {
        topCoverNode = node;
      }
      if (!selectedIDs) {
        return {
          topCoverNode,
          topNode: node,
        };
      }
      if (selectedIDs.has(node.id)) {
        return {
          topCoverNode,
          topNode: node,
        };
      }
    }

    return {
      topCoverNode,
      topNode: topCoverNode,
    };
  }

  private getHoverNodes(): WorkflowNodeEntity[] {
    const nodeVersion = this.entityManager.getEntityVersion(WorkflowNodeEntity);
    const activatedID = this.selectService.activatedNode?.id;
    if (
      this.hoverNodesCache &&
      this.hoverNodesCacheVersion === nodeVersion &&
      this.hoverNodesCacheActivatedID === activatedID
    ) {
      return this.hoverNodesCache;
    }

    const nodes = this.document
      .getAllNodes()
      .filter(
        (node) =>
          node.id !== 'root' &&
          node.flowNodeType !== FlowNodeBaseType.ROOT &&
          node.flowNodeType !== FlowNodeBaseType.GROUP
      )
      .reverse();
    if (activatedID) {
      const activatedIndex = nodes.findIndex((node) => node.id === activatedID);
      if (activatedIndex > 0) {
        const [activatedNode] = nodes.splice(activatedIndex, 1);
        nodes.unshift(activatedNode);
      }
    }

    this.hoverNodesCache = nodes;
    this.hoverNodesCacheVersion = nodeVersion;
    this.hoverNodesCacheActivatedID = activatedID;
    return this.hoverNodesCache;
  }

  private isPointInBounds(pos: IPoint, bounds: Rectangle, padding = 0): boolean {
    if (bounds.width + padding * 2 <= 0 || bounds.height + padding * 2 <= 0) {
      return false;
    }
    return (
      pos.x >= bounds.x - padding &&
      pos.x <= bounds.right + padding &&
      pos.y >= bounds.y - padding &&
      pos.y <= bounds.bottom + padding
    );
  }

  private getNodeIndex(node: WorkflowNodeEntity): number {
    const nodeRenderData = node.getData(FlowNodeRenderData);
    return nodeRenderData.stackIndex;
  }
}
