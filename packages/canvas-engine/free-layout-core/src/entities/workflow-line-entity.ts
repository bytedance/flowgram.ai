/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isEqual } from 'lodash-es';
import { domUtils, type IPoint, Rectangle, Emitter, Disposable } from '@flowgram.ai/utils';
import { Entity, type EntityOpts } from '@flowgram.ai/core';

import { type WorkflowLinesManager } from '../workflow-lines-manager';
import { type WorkflowDocument } from '../workflow-document';
import { WORKFLOW_LINE_ENTITY } from '../utils/statics';
import {
  LineRenderType,
  type LinePosition,
  LinePoint,
  LineCenterPoint,
} from '../typings/workflow-line';
import { type WorkflowEdgeJSON } from '../typings';
import { WorkflowLineRenderData } from '../entity-datas';
import { type WorkflowPortEntity } from './workflow-port-entity';
import { type WorkflowNodeEntity } from './workflow-node-entity';

export const LINE_HOVER_DISTANCE = 8; // 线条 hover 的最小检测距离
export const POINT_RADIUS = 10;

export interface WorkflowLinePortInfo {
  from?: string; // 前置节点 id
  to?: string; // 后置节点 id
  fromPort?: string | number; // 连线的 port 位置
  toPort?: string | number; // 连线的 port 位置
  data?: any;
}

export interface WorkflowLineEntityOpts extends EntityOpts, WorkflowLinePortInfo {
  document: WorkflowDocument;
  linesManager: WorkflowLinesManager;
  drawingTo?: LinePoint;
  drawingFrom?: LinePoint;
  uiState?: Partial<WorkflowLineUIState>;
}

export interface WorkflowLineInfo extends WorkflowLinePortInfo {
  drawingTo?: LinePoint; // 正在画中的元素
  drawingFrom?: LinePoint;
}

export interface WorkflowLineUIState {
  /**
   * 是否出错
   */
  hasError: boolean;
  /**
   * 流动
   */
  flowing: boolean;
  /**
   * 禁用
   */
  disabled: boolean;
  /**
   * 箭头反转
   */
  reverse: boolean;
  /**
   * 隐藏箭头
   */
  hideArrow: boolean;
  /**
   * 线条宽度
   * @default 2
   */
  strokeWidth?: number;
  /**
   * 选中后的线条宽度
   * @default 3
   */
  strokeWidthSelected?: number;
  /**
   * 收缩
   * @default 10
   */
  shrink: number;
  /**
   * @deprecated use `lockedColor` instead
   */
  highlightColor: string;
  /**
   * 曲率
   * only for Bezier,
   * @default 0.25
   */
  curvature: number;
  /**
   * Line locked color
   */
  lockedColor: string;
  /**
   * React className
   */
  className?: string;
  /**
   * React style
   */
  style?: React.CSSProperties;
}

/**
 * 线条
 */
export class WorkflowLineEntity extends Entity<WorkflowLineEntityOpts> {
  static type = WORKFLOW_LINE_ENTITY;

  /**
   * 转成线条 id
   * @param info
   */
  static portInfoToLineId(info: WorkflowLinePortInfo): string {
    const { from, to, fromPort, toPort } = info;
    return `${from}_${fromPort || ''}-${to || ''}_${toPort || ''}`;
  }

  private _onLineDataChangeEmitter = new Emitter<{ oldValue: any; newValue: any }>();

  readonly document: WorkflowDocument;

  readonly linesManager: WorkflowLinesManager;

  readonly onLineDataChange = this._onLineDataChangeEmitter.event;

  private _from?: WorkflowNodeEntity;

  private _to?: WorkflowNodeEntity;

  private _lineData: any;

  private _uiState: WorkflowLineUIState = {
    hasError: false,
    flowing: false,
    disabled: false,
    hideArrow: false,
    reverse: false,
    shrink: 10,
    curvature: 0.25,
    highlightColor: '',
    lockedColor: '',
  };

  /**
   * 线条的 UI 状态
   */
  get uiState(): WorkflowLineUIState {
    return this._uiState;
  }

  /**
   * 更新线条的 ui 状态
   * @param newState
   */
  updateUIState(newState: Partial<WorkflowLineUIState>): void {
    let changed = false;
    Object.keys(newState).forEach((key: string) => {
      const value: any = newState[key as keyof WorkflowLineUIState] as any;
      if (this._uiState[key as keyof WorkflowLineUIState] !== value) {
        (this._uiState as any)[key as keyof WorkflowLineUIState] = value;
        changed = true;
      }
    });
    if (changed) {
      this.fireChange();
    }
  }

  /**
   * 线条的扩展数据
   */
  get lineData(): any {
    return this._lineData;
  }

  /**
   * 更新线条扩展数据
   * @param data
   */
  set lineData(newValue: any) {
    const oldValue = this._lineData;
    if (!isEqual(oldValue, newValue)) {
      this._lineData = newValue;
      this._onLineDataChangeEmitter.fire({ oldValue, newValue });
      this.fireChange();
    }
  }

  public stackIndex = 0;

  /**
   * 线条数据
   */
  info: WorkflowLineInfo = {
    from: '',
  };

  readonly isDrawing: boolean;

  /**
   * 线条 Portal 挂载的 div
   */
  private _node?: HTMLDivElement;

  constructor(opts: WorkflowLineEntityOpts) {
    super(opts);
    this.document = opts.document;
    this.linesManager = opts.linesManager;
    // 初始化
    this.initInfo({
      from: opts.from,
      to: opts.to,
      drawingTo: opts.drawingTo,
      fromPort: opts.fromPort,
      drawingFrom: opts.drawingFrom,
      toPort: opts.toPort,
      data: opts.data,
    });
    if (opts.uiState) {
      this._uiState = {
        ...this._uiState,
        ...opts.uiState,
      };
    }
    if (opts.drawingTo || opts.drawingFrom) {
      this.isDrawing = true;
    }
    this.onEntityChange(() => {
      this.fromPort?.validate();
      this.toPort?.validate();
    });
    this.onDispose(() => {
      this.fromPort?.validate();
      this.toPort?.validate();
    });
    this.toDispose.push(this._onLineDataChangeEmitter);
    this.preDispose.push(
      Disposable.create(() => this.linesManager.rebindLinePorts(this, this.info, undefined))
    );
    // this.onDispose(() => {
    // this._infoDispose.dispose();
    // });
  }

  /**
   * 获取线条的前置节点
   */
  get from(): WorkflowNodeEntity | undefined {
    return this._from;
  }

  /**
   * 获取线条的后置节点
   */
  get to(): WorkflowNodeEntity | undefined {
    return this._to;
  }

  get isHidden(): boolean {
    return this.highlightColor === this.linesManager.lineColor.hidden;
  }

  get inContainer(): boolean {
    const nodeInContainer = (node?: WorkflowNodeEntity) =>
      !!node?.parent && node.parent.flowNodeType !== 'root';
    return nodeInContainer(this.from) || nodeInContainer(this.to);
  }

  /**
   * 获取是否 testrun processing
   * @deprecated  use `flowing` instead
   */
  get processing(): boolean {
    return this._uiState.flowing;
  }

  /**
   * 设置 testrun processing 状态
   * @deprecated  use `flowing` instead
   */
  set processing(status: boolean) {
    this.flowing = status;
  }

  // 获取连线是否为错误态
  get hasError() {
    return this.uiState.hasError;
  }

  // 设置连线的错误态
  set hasError(hasError: boolean) {
    this.updateUIState({
      hasError,
    });
    if (this._node) {
      this._node.dataset.hasError = this.hasError ? 'true' : 'false';
    }
  }

  /**
   * 设置线条的后置节点
   */
  setToPort(toPort?: WorkflowPortEntity) {
    // 只有绘制中的线条才允许设置 port, 主要用于吸附到点
    if (!this.isDrawing) {
      throw new Error('[setToPort] only support drawing line.');
    }
    if (this.toPort === toPort) {
      return;
    }
    const prePort = this.toPort;
    if (
      toPort &&
      toPort.portType === 'input' &&
      this.linesManager.canAddLine(this.fromPort!, toPort, true)
    ) {
      const { node, portID } = toPort;
      this.updateInfo((nextInfo) => {
        nextInfo.drawingTo = undefined;
        nextInfo.to = node.id;
        nextInfo.toPort = portID;
      });
    } else {
      this.updateInfo((nextInfo) => {
        nextInfo.to = undefined;
        nextInfo.toPort = '';
      });
    }
    /**
     * 移动到端口又快速移出，需要更新 prePort 的状态
     */
    if (prePort) {
      prePort.validate();
    }
  }

  setFromPort(fromPort?: WorkflowPortEntity) {
    // 只有绘制中的线条才允许设置 port, 主要用于吸附到点
    if (!this.isDrawing) {
      throw new Error('[setFromPort] only support drawing line.');
    }
    if (this.fromPort === fromPort) {
      return;
    }
    const prePort = this.fromPort;
    if (
      fromPort &&
      fromPort.portType === 'output' &&
      this.linesManager.canAddLine(fromPort, this.toPort!, true)
    ) {
      const { node, portID } = fromPort;
      this.updateInfo((nextInfo) => {
        nextInfo.drawingFrom = undefined;
        nextInfo.from = node.id;
        nextInfo.fromPort = portID;
      });
    } else {
      this.updateInfo((nextInfo) => {
        nextInfo.from = undefined;
        nextInfo.fromPort = '';
      });
    }
    /**
     * 移动到端口又快速移出，需要更新 prePort 的状态
     */
    if (prePort) {
      prePort.validate();
    }
  }

  /**
   * 设置线条画线时的目标位置
   */
  set drawingTo(pos: LinePoint | undefined) {
    const oldDrawingTo = this.info.drawingTo;
    if (!pos) {
      if (oldDrawingTo === undefined) {
        this.fireChange();
        return;
      }
      this.updateInfo((nextInfo) => {
        nextInfo.drawingTo = undefined;
      });
      return;
    }
    if (!oldDrawingTo || pos.x !== oldDrawingTo.x || pos.y !== oldDrawingTo.y) {
      this.updateInfo((nextInfo) => {
        nextInfo.to = undefined;
        nextInfo.toPort = '';
        nextInfo.drawingTo = pos;
      });
    }
  }

  set drawingFrom(pos: LinePoint | undefined) {
    const oldDrawingFrom = this.info.drawingFrom;
    if (!pos) {
      if (oldDrawingFrom === undefined) {
        this.fireChange();
        return;
      }
      this.updateInfo((nextInfo) => {
        nextInfo.drawingFrom = undefined;
      });
      return;
    }
    if (!oldDrawingFrom || pos.x !== oldDrawingFrom.x || pos.y !== oldDrawingFrom.y) {
      this.updateInfo((nextInfo) => {
        nextInfo.from = undefined;
        nextInfo.fromPort = '';
        nextInfo.drawingFrom = pos;
      });
    }
  }

  get drawingFrom(): LinePoint | undefined {
    return this.info.drawingFrom;
  }

  /**
   * 获取线条正在画线的位置
   */
  get drawingTo(): LinePoint | undefined {
    return this.info.drawingTo;
  }

  get highlightColor(): string {
    return this.uiState.highlightColor || '';
  }

  set highlightColor(highlightColor) {
    this.updateUIState({
      highlightColor,
    });
  }

  get lockedColor(): string {
    return this.uiState.lockedColor;
  }

  set lockedColor(lockedColor: string) {
    this.updateUIState({
      lockedColor,
    });
  }

  /**
   * 获取线条的边框位置大小
   */
  get bounds(): Rectangle {
    return this.getData(WorkflowLineRenderData).bounds;
  }

  get center(): LineCenterPoint {
    return this.getData(WorkflowLineRenderData).center;
  }

  /**
   * 获取点和线最接近的距离
   */
  getHoverDist(pos: IPoint): number {
    return this.getData(WorkflowLineRenderData).calcDistance(pos);
  }

  get fromPort(): WorkflowPortEntity | undefined {
    if (!this.from) {
      return undefined;
    }
    return this.from.ports.getPortEntityByKey('output', this.info.fromPort);
  }

  get toPort(): WorkflowPortEntity | undefined {
    if (!this.to) {
      return undefined;
    }
    return this.to.ports.getPortEntityByKey('input', this.info.toPort);
  }

  /**
   * 获取线条真实的输入输出节点坐标
   */
  get position(): LinePosition {
    return this.getData(WorkflowLineRenderData).position;
  }

  /** 是否反转箭头 */
  get reverse(): boolean {
    return this.linesManager.isReverseLine(this, this.uiState.reverse);
  }

  /** 是否隐藏箭头 */
  get hideArrow(): boolean {
    return this.linesManager.isHideArrowLine(this, this.uiState.hideArrow);
  }

  /** 是否流动 */
  get flowing(): boolean {
    return this.linesManager.isFlowingLine(this, this.uiState.flowing);
  }

  set flowing(flowing: boolean) {
    if (this._uiState.flowing !== flowing) {
      this._uiState.flowing = flowing;
      this.fireChange();
    }
  }

  /** 是否禁用 */
  get disabled(): boolean {
    return this.linesManager.isDisabledLine(this, this.uiState.disabled);
  }

  /**
   * @deprecated
   */
  get vertical(): boolean {
    const fromLocation = this.fromPort?.location;
    const toLocation = this.toPort?.location;
    if (toLocation) {
      return toLocation === 'top';
    } else {
      return fromLocation === 'bottom';
    }
  }

  /** 获取线条渲染器类型 */
  get renderType(): LineRenderType | undefined {
    return this.linesManager.setLineRenderType(this);
  }

  /** 获取线条样式 */
  get className(): string {
    return [this.linesManager.setLineClassName(this), this._uiState.className]
      .filter((s) => !!s)
      .join(' ');
  }

  get color(): string | undefined {
    return this.linesManager.getLineColor(this);
  }

  /**
   * 初始化线条
   * @param info 线条信息
   */
  protected initInfo(info: WorkflowLineInfo): void {
    this.applyInfo(info);
  }

  private updateInfo(mutator: (nextInfo: WorkflowLineInfo) => void): void {
    const nextInfo = {
      ...this.info,
    };
    mutator(nextInfo);
    this.applyInfo(nextInfo);
  }

  private applyInfo(nextInfo: WorkflowLineInfo): void {
    if (isEqual(nextInfo, this.info)) {
      return;
    }
    const prevInfo = this.info;
    this.info = nextInfo;
    this._from = nextInfo.from ? this.document.getNode(nextInfo.from) : undefined;
    this._to = nextInfo.to ? this.document.getNode(nextInfo.to) : undefined;
    this._lineData = nextInfo.data;
    this.linesManager.rebindLinePorts(this, prevInfo, nextInfo);
    this.fireChange();
  }

  // 校验连线是否为错误态
  validate() {
    this.validateSelf();
  }

  /**
   * use `validate` instead
   * @deprecated
   */
  protected validateSelf() {
    const { fromPort, toPort } = this;

    if (fromPort) {
      this.hasError = this.linesManager.isErrorLine(fromPort, toPort, this.uiState.hasError);
    }
  }

  is(line: WorkflowLineEntity | WorkflowLinePortInfo): boolean {
    if (line instanceof WorkflowLineEntity) {
      return this === line;
    }
    return WorkflowLineEntity.portInfoToLineId(line as WorkflowLinePortInfo) === this.id;
  }

  canRemove(newLineInfo?: Required<WorkflowLinePortInfo>): boolean {
    return this.linesManager.canRemove(this, newLineInfo);
  }

  get node(): HTMLDivElement {
    if (this._node) return this._node;
    this._node = domUtils.createDivWithClass('gedit-flow-activity-line');
    this._node.dataset.testid = 'sdk.workflow.canvas.line';
    this._node.dataset.lineId = this.id;
    this._node.dataset.fromNodeId = this.from?.id ?? '';
    this._node.dataset.fromPortId = this.fromPort?.id ?? '';
    this._node.dataset.toNodeId = this.to?.id ?? '';
    this._node.dataset.toPortId = this.toPort?.id ?? '';
    this._node.dataset.hasError = this.hasError ? 'true' : 'false';
    return this._node;
  }

  toJSON(): WorkflowEdgeJSON {
    const json: WorkflowEdgeJSON = {
      sourceNodeID: this.info.from!,
      targetNodeID: this.info.to!,
      sourcePortID: this.info.fromPort,
      targetPortID: this.info.toPort,
    };
    if (this._lineData !== undefined) {
      json.data = this._lineData;
    }
    if (!json.sourcePortID) {
      delete json.sourcePortID;
    }
    if (!json.targetPortID) {
      delete json.targetPortID;
    }
    return json;
  }

  /** 触发线条渲染 */
  fireRender(): void {
    this.fireChange();
  }
}
