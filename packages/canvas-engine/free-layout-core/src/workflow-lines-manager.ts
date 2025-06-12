import { last } from 'lodash-es';
import { inject, injectable } from 'inversify';
import { DisposableCollection, Emitter, type IPoint } from '@flowgram.ai/utils';
import { FlowNodeRenderData, FlowNodeTransformData } from '@flowgram.ai/document';
import { EntityManager, PlaygroundConfigEntity, TransformData } from '@flowgram.ai/core';

import { WorkflowDocumentOptions } from './workflow-document-option';
import { type WorkflowDocument } from './workflow-document';
import {
  LineColor,
  LineColors,
  LineRenderType,
  LineType,
  type WorkflowLineRenderContributionFactory,
} from './typings/workflow-line';
import {
  type WorkflowContentChangeEvent,
  WorkflowContentChangeType,
  type WorkflowEdgeJSON,
} from './typings';
import { WorkflowHoverService, WorkflowSelectService } from './service';
import { WorkflowNodeLinesData } from './entity-datas/workflow-node-lines-data';
import { WorkflowLineRenderData } from './entity-datas';
import {
  LINE_HOVER_DISTANCE,
  WorkflowLineEntity,
  type WorkflowLinePortInfo,
  type WorkflowNodeEntity,
  WorkflowPortEntity,
} from './entities';

/**
 * 线条管理
 */
@injectable()
export class WorkflowLinesManager {
  protected document: WorkflowDocument;

  protected toDispose = new DisposableCollection();
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

  hasLine(portInfo: WorkflowLinePortInfo): boolean {
    return !!this.entityManager.getEntityById<WorkflowLineEntity>(
      WorkflowLineEntity.portInfoToLineId(portInfo)
    );
  }

  getLine(portInfo: WorkflowLinePortInfo): WorkflowLineEntity | undefined {
    return this.entityManager.getEntityById<WorkflowLineEntity>(
      WorkflowLineEntity.portInfoToLineId(portInfo)
    );
  }

  replaceLine(
    oldPortInfo: WorkflowLinePortInfo,
    newPortInfo: WorkflowLinePortInfo
  ): WorkflowLineEntity {
    const oldLine = this.getLine(oldPortInfo);
    if (oldLine) {
      oldLine.dispose();
    }
    return this.createLine(newPortInfo)!;
  }

  createLine(
    options: {
      drawingTo?: IPoint; // 无连接的线条
      key?: string; // 自定义 key
    } & WorkflowLinePortInfo
  ): WorkflowLineEntity | undefined {
    const { from, to, drawingTo, fromPort, toPort } = options;
    const available = Boolean(from && to);
    const key = options.key || WorkflowLineEntity.portInfoToLineId(options);
    let line = this.entityManager.getEntityById<WorkflowLineEntity>(key)!;
    if (line) {
      // 如果之前有线条，则先把颜色去掉
      line.highlightColor = '';
      line.validate();
      return line;
    }

    const fromNode = this.entityManager
      .getEntityById<WorkflowNodeEntity>(from)
      ?.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData);
    const toNode = to
      ? this.entityManager
          .getEntityById<WorkflowNodeEntity>(to)!
          .getData<WorkflowNodeLinesData>(WorkflowNodeLinesData)!
      : undefined;

    if (!fromNode) {
      // 非法情况
      return;
    }

    this.isDrawing = Boolean(drawingTo);
    line = this.entityManager.createEntity<WorkflowLineEntity>(WorkflowLineEntity, {
      id: key,
      document: this.document,
      linesManager: this,
      from,
      fromPort,
      toPort,
      to,
      drawingTo,
    });

    this.registerData(line);

    fromNode.addLine(line);
    toNode?.addLine(line);
    line.onDispose(() => {
      if (drawingTo) {
        this.isDrawing = false;
      }
      fromNode.removeLine(line);
      toNode?.removeLine(line);
      // 连线销毁时检验 连线错误态 & 端口错误态
      line.validate();
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
    this.getAllLines().forEach((line) => {
      const dist = line.getHoverDist(mousePos);

      if (dist <= minDistance && (!targetLineDist || targetLineDist >= dist)) {
        targetLineDist = dist;
        targetLine = line;
      }
    });
    return targetLine;
  }

  /**
   * 是否在调整线条
   */
  isDrawing = false;

  dispose(): void {
    this.toDispose.dispose();
  }

  get disposed(): boolean {
    return this.toDispose.disposed;
  }

  isErrorLine(fromPort: WorkflowPortEntity, toPort?: WorkflowPortEntity) {
    if (this.options.isErrorLine) {
      return this.options.isErrorLine(fromPort, toPort, this);
    }

    return false;
  }

  isReverseLine(line: WorkflowLineEntity): boolean {
    if (this.options.isReverseLine) {
      return this.options.isReverseLine(line);
    }

    return false;
  }

  isHideArrowLine(line: WorkflowLineEntity): boolean {
    if (this.options.isHideArrowLine) {
      return this.options.isHideArrowLine(line);
    }

    return false;
  }

  isFlowingLine(line: WorkflowLineEntity): boolean {
    if (this.options.isFlowingLine) {
      return this.options.isFlowingLine(line);
    }

    return false;
  }

  isDisabledLine(line: WorkflowLineEntity): boolean {
    if (this.options.isDisabledLine) {
      return this.options.isDisabledLine(line);
    }
    return false;
  }

  isVerticalLine(line: WorkflowLineEntity): boolean {
    if (this.options.isVerticalLine) {
      return this.options.isVerticalLine(line);
    }

    return false;
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
      toPort.disabled
    ) {
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
    newLineInfo?: Required<WorkflowLinePortInfo>,
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

  canReset(
    fromPort: WorkflowPortEntity,
    oldToPort: WorkflowPortEntity,
    newToPort: WorkflowPortEntity
  ): boolean {
    if (
      this.options &&
      this.options.canResetLine &&
      !this.options.canResetLine(fromPort, oldToPort, newToPort, this)
    ) {
      return false;
    }
    return true;
  }

  /**
   * 根据鼠标位置找到 port
   * @param pos
   */
  getPortFromMousePos(pos: IPoint): WorkflowPortEntity | undefined {
    const allPorts = this.entityManager
      .getEntities<WorkflowPortEntity>(WorkflowPortEntity)
      .filter((port) => port.node.flowNodeType !== 'root');
    const targetPort = allPorts.find((port) => port.isHovered(pos.x, pos.y));
    if (targetPort) {
      // 后创建的要先校验
      const targetNode = this.document
        .getAllNodes()
        .slice()
        .reverse()
        .filter((node) => targetPort.node?.parent?.id !== node.id)
        .find((node) => node.getData(TransformData)!.contains(pos.x, pos.y));
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
    const allNodes = this.document
      .getAllNodes()
      .sort((a, b) => this.getNodeIndex(a) - this.getNodeIndex(b));
    // 先挑选出 bounds 区域符合的 node
    const containNodes: WorkflowNodeEntity[] = [];
    const { selection } = this.selectService;
    const zoom =
      this.entityManager.getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)?.config?.zoom ||
      1;
    allNodes.forEach((node) => {
      const { bounds } = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // 交互要求，节点边缘 4px 的时候就生效连线逻辑
      if (
        bounds
          .clone()
          .pad(4 / zoom)
          .contains(pos.x, pos.y)
      ) {
        containNodes.push(node);
      }
    });
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

  private getNodeIndex(node: WorkflowNodeEntity): number {
    const nodeRenderData = node.getData(FlowNodeRenderData);
    return nodeRenderData.stackIndex;
  }
}
