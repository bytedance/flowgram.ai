/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { last } from 'lodash-es';
import { inject, injectable } from 'inversify';
import { DisposableCollection, Emitter, type IPoint, Rectangle } from '@flowgram.ai/utils';
import { FlowNodeRenderData, FlowNodeTransformData } from '@flowgram.ai/document';
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
  PORT_SIZE,
  WorkflowLineEntity,
  type WorkflowLineInfo,
  type WorkflowLinePortInfo,
  WorkflowNodeEntity,
  WorkflowPortEntity,
} from './entities';

const SPATIAL_INDEX_THRESHOLD = 128;
const SPATIAL_INDEX_CELL_SIZE = 512;

class SpatialIndex<T> {
  private cells = new Map<string, T[]>();

  constructor(
    private readonly items: T[],
    private readonly getBounds: (item: T) => Rectangle | undefined,
    private readonly cellSize = SPATIAL_INDEX_CELL_SIZE
  ) {
    this.rebuild();
  }

  search(bounds: Rectangle): T[] {
    const result: T[] = [];
    const seen = new Set<T>();
    this.forEachCell(bounds, (key) => {
      const items = this.cells.get(key);
      if (!items) {
        return;
      }
      items.forEach((item) => {
        if (seen.has(item)) {
          return;
        }
        const itemBounds = this.getBounds(item);
        if (itemBounds && Rectangle.isViewportVisible(itemBounds, bounds)) {
          seen.add(item);
          result.push(item);
        }
      });
    });
    return result;
  }

  private rebuild(): void {
    this.items.forEach((item) => {
      const bounds = this.getBounds(item);
      if (!bounds) {
        return;
      }
      this.forEachCell(bounds, (key) => {
        const items = this.cells.get(key) || [];
        items.push(item);
        this.cells.set(key, items);
      });
    });
  }

  private forEachCell(bounds: Rectangle, fn: (key: string) => void): void {
    const minX = Math.floor(bounds.left / this.cellSize);
    const maxX = Math.floor(bounds.right / this.cellSize);
    const minY = Math.floor(bounds.top / this.cellSize);
    const maxY = Math.floor(bounds.bottom / this.cellSize);
    for (let x = minX; x <= maxX; x += 1) {
      for (let y = minY; y <= maxY; y += 1) {
        fn(`${x}:${y}`);
      }
    }
  }
}

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

  private nodeIndex?: SpatialIndex<WorkflowNodeEntity>;

  private nodeIndexSignature = '';

  private lineIndex?: SpatialIndex<WorkflowLineEntity>;

  private lineIndexSignature = '';

  private portIndexByType = new Map<string, SpatialIndex<WorkflowPortEntity>>();

  private portIndexSignature = '';

  init(doc: WorkflowDocument): void {
    this.document = doc;
  }

  forceUpdate() {
    this.onForceUpdateEmitter.fire();
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
    this.getLineCandidates(mousePos, minDistance).forEach((line) => {
      const dist = line.getHoverDist(mousePos);

      if (dist <= minDistance && (!targetLineDist || targetLineDist >= dist)) {
        targetLineDist = dist;
        targetLine = line;
      }
    });
    return targetLine;
  }

  getLineCandidatesByBounds(bounds: Rectangle): WorkflowLineEntity[] {
    const allLines = this.getAllLines();
    if (allLines.length < SPATIAL_INDEX_THRESHOLD) {
      return allLines.filter((line) => Rectangle.isViewportVisible(line.bounds, bounds));
    }
    return this.getLineIndex().search(bounds);
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
    const allPorts = this.getPortCandidates(pos, portType);
    const targetPort = allPorts.find((port) => port.isHovered(pos.x, pos.y));
    if (targetPort) {
      const containNodes = this.getContainNodesFromMousePos(pos);
      const targetNode = last(containNodes);
      // 点位可能会被节点覆盖
      if (targetNode && targetNode !== targetPort.node) {
        return;
      }
    }
    return targetPort;
  }

  /**
   * 根据鼠标位置找到 node
   * @param pos - 鼠标位置
   */
  getNodeFromMousePos(pos: IPoint): WorkflowNodeEntity | undefined {
    // 先挑选出 bounds 区域符合的 node
    const { selection } = this.selectService;
    const containNodes = this.getContainNodesFromMousePos(pos);
    // 当有元素被选中的时候选中元素在顶层
    if (selection?.length) {
      const filteredNodes = containNodes.filter((node) =>
        selection.some((_node) => node.id === _node.id)
      );
      if (filteredNodes?.length) {
        return last(filteredNodes);
      }
    }
    // 默认取最顶层的
    return last(containNodes);
  }

  registerContribution(factory: WorkflowLineRenderContributionFactory): this {
    this.contributionFactories.push(factory);
    return this;
  }

  private registerData(line: WorkflowLineEntity) {
    line.addData(WorkflowLineRenderData);
  }

  private getSortedNodes() {
    return this.document.getAllNodes().sort((a, b) => this.getNodeIndex(a) - this.getNodeIndex(b));
  }

  /** 获取鼠标坐标位置的所有节点（stackIndex 从小到大排序） */
  getContainNodesFromMousePos(pos: IPoint): WorkflowNodeEntity[] {
    const allNodes = this.getNodeCandidates(pos);
    const zoom =
      this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)?.config?.zoom ||
      1;
    const containNodes = allNodes
      .map((node) => {
        const { bounds } = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
        // 交互要求，节点边缘 4px 的时候就认为选中节点
        if (
          bounds
            .clone()
            .pad(4 / zoom)
            .contains(pos.x, pos.y)
        ) {
          return node;
        }
      })
      .filter(Boolean) as WorkflowNodeEntity[];
    containNodes.sort((a, b) => this.getNodeIndex(a) - this.getNodeIndex(b));
    return containNodes;
  }

  private getNodeCandidates(pos: IPoint): WorkflowNodeEntity[] {
    if (this.entityManager.getEntities(WorkflowNodeEntity).length < SPATIAL_INDEX_THRESHOLD) {
      return this.getSortedNodes();
    }
    const zoom =
      this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)?.config?.zoom ||
      1;
    return this.getNodeIndexCache().search(new Rectangle(pos.x, pos.y, 0, 0).pad(4 / zoom));
  }

  private getPortCandidates(pos: IPoint, portType?: WorkflowPortType): WorkflowPortEntity[] {
    const allPorts = this.getAllPorts(portType);
    if (allPorts.length < SPATIAL_INDEX_THRESHOLD) {
      return allPorts;
    }
    return this.getPortIndex(portType).search(new Rectangle(pos.x, pos.y, 0, 0).pad(PORT_SIZE));
  }

  private getLineCandidates(pos: IPoint, minDistance: number): WorkflowLineEntity[] {
    const allLines = this.getAllLines();
    if (allLines.length < SPATIAL_INDEX_THRESHOLD) {
      return allLines;
    }
    return this.getLineIndex().search(new Rectangle(pos.x, pos.y, 0, 0).pad(minDistance));
  }

  private getAllPorts(portType?: WorkflowPortType): WorkflowPortEntity[] {
    const nodes = this.getSortedNodes().reverse();
    return nodes
      .map((node) => {
        if (!portType) {
          return node.ports.allPorts;
        }
        return portType === 'input' ? node.ports.inputPorts : node.ports.outputPorts;
      })
      .flat();
  }

  private getNodeIndexCache(): SpatialIndex<WorkflowNodeEntity> {
    const signature = [
      this.entityManager.getEntityVersion(WorkflowNodeEntity),
      this.entityManager.getEntityDataVersion(FlowNodeTransformData),
    ].join('|');
    if (!this.nodeIndex || this.nodeIndexSignature !== signature) {
      this.nodeIndexSignature = signature;
      this.nodeIndex = new SpatialIndex(
        this.getSortedNodes(),
        (node) => node.getData<FlowNodeTransformData>(FlowNodeTransformData)?.bounds
      );
    }
    return this.nodeIndex;
  }

  private getPortIndex(portType?: WorkflowPortType): SpatialIndex<WorkflowPortEntity> {
    const key = portType || 'all';
    const signature = [
      this.entityManager.getEntityVersion(WorkflowPortEntity),
      this.entityManager.getEntityDataVersion(FlowNodeTransformData),
    ].join('|');
    if (this.portIndexSignature !== signature) {
      this.portIndexSignature = signature;
      this.portIndexByType.clear();
    }
    let index = this.portIndexByType.get(key);
    if (!index) {
      index = new SpatialIndex(this.getAllPorts(portType), (port) => port.bounds);
      this.portIndexByType.set(key, index);
    }
    return index;
  }

  private getLineIndex(): SpatialIndex<WorkflowLineEntity> {
    const signature = [
      this.entityManager.getEntityVersion(WorkflowLineEntity),
      this.entityManager.getEntityDataVersion(WorkflowLineRenderData),
    ].join('|');
    if (!this.lineIndex || this.lineIndexSignature !== signature) {
      this.lineIndexSignature = signature;
      this.lineIndex = new SpatialIndex(this.getAllLines(), (line) => line.bounds);
    }
    return this.lineIndex;
  }

  private getNodeIndex(node: WorkflowNodeEntity): number {
    const nodeRenderData = node.getData(FlowNodeRenderData);
    return nodeRenderData.stackIndex;
  }
}
