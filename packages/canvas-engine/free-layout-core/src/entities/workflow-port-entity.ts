/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type IPoint, Rectangle, Emitter, Compare } from '@flowgram.ai/utils';
import { FlowNodeTransformData } from '@flowgram.ai/document';
import {
  Entity,
  type EntityOpts,
  PlaygroundConfigEntity,
  TransformData,
  type EntityRegistry,
} from '@flowgram.ai/core';

import { type WorkflowDocument } from '../workflow-document';
import {
  type WorkflowPortType,
  getPortEntityId,
  WORKFLOW_LINE_ENTITY,
  domReactToBounds,
} from '../utils/statics';
import { locationConfigToPoint } from '../utils/location-config-to-point';
import { type WorkflowNodeMeta, LinePointLocation, LinePoint } from '../typings';
import { type WorkflowNodeEntity } from './workflow-node-entity';
import { type WorkflowLineEntity } from './workflow-line-entity';

// port 的宽度
export const PORT_SIZE = 24;

export interface WorkflowPort {
  /**
   * 没有代表 默认连接点，默认 input 类型 为最左边中心，output 类型为最右边中心
   */
  portID?: string | number;
  /**
   * 输入或者输出点
   */
  type: WorkflowPortType;
  /**
   * 端口位置
   */
  location?: LinePointLocation;
  /**
   * 端口位置配置
   * @example
   *  // bottom-center
   *  {
   *    left: '50%',
   *    bottom: 0
   *  }
   *  // right-center
   *  {
   *    right: 0,
   *    top: '50%'
   *  }
   */
  locationConfig?: {
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
  };
  /**
   * 相对于 location 的偏移
   */
  offset?: IPoint;
  /**
   * 端口热区大小
   */
  size?: { width: number; height: number };
  /**
   * 禁用端口
   */
  disabled?: boolean;
  /**
   * 将点位渲染到该父节点上
   */
  targetElement?: HTMLElement;
}

export type WorkflowPorts = WorkflowPort[];

export interface WorkflowPortEntityOpts extends EntityOpts, WorkflowPort {
  /**
   * port 属于哪个节点
   */
  node: WorkflowNodeEntity;
}

/**
 * Port 抽象的 Entity
 */
export class WorkflowPortEntity extends Entity<WorkflowPortEntityOpts> {
  static type = 'WorkflowPortEntity';

  readonly node: WorkflowNodeEntity;

  readonly portID: string | number = '';

  readonly portType: WorkflowPortType;

  private _disabled?: boolean;

  private _hasError = false;

  private _location?: LinePointLocation;

  private _locationConfig?: WorkflowPort['locationConfig'];

  private _size?: { width: number; height: number };

  private _offset?: IPoint;

  protected readonly _onErrorChangedEmitter = new Emitter<void>();

  onErrorChanged = this._onErrorChangedEmitter.event;

  targetElement?: HTMLElement;

  static getPortEntityId(
    node: WorkflowNodeEntity,
    portType: WorkflowPortType,
    portID: string | number = ''
  ): string {
    return getPortEntityId(node, portType, portID);
  }

  get position(): LinePointLocation | undefined {
    return this._location;
  }

  constructor(opts: WorkflowPortEntityOpts) {
    super(opts);
    this.portID = opts.portID || '';
    this.portType = opts.type;
    this._disabled = opts.disabled;
    this._offset = opts.offset;
    this._locationConfig = opts.locationConfig;
    this._location = opts.location;
    this._size = opts.size;
    this.node = opts.node;
    this.updateTargetElement(opts.targetElement);
    this.toDispose.push(this.node.getData(TransformData)!.onDataChange(() => this.fireChange()));
    this.toDispose.push(this.node.onDispose(this.dispose.bind(this)));
  }

  // 获取连线是否为错误态
  get hasError() {
    return this._hasError;
  }

  // 设置连线的错误态，外部应使用 validate 进行更新
  set hasError(hasError: boolean) {
    if (hasError !== this._hasError) {
      this._hasError = hasError;
      this._onErrorChangedEmitter.fire();
    }
  }

  validate() {
    // 一个端口可能连接很多线，需要保证所有的连线都不包含错误
    const anyLineHasError = this.allLines.some((line) => {
      // 忽略已销毁和被隐藏的线
      if (line.disposed || line.isHidden) {
        return false;
      }

      return line.hasError;
    });
    // 如果没有连线错误，需校验端口自身错误
    const isPortHasError = (this.node.document as WorkflowDocument).isErrorPort(this);
    this.hasError = anyLineHasError || isPortHasError;
  }

  isErrorPort() {
    return (this.node.document as WorkflowDocument).isErrorPort(this, this.hasError);
  }

  get location(): LinePointLocation {
    if (this._location) {
      return this._location;
    }
    if (this.portType === 'input') {
      return 'left';
    }
    return 'right';
  }

  get point(): LinePoint {
    const { targetElement, _locationConfig } = this;
    const { bounds } = this.node.getData(FlowNodeTransformData)!;
    const location = this.location;
    if (targetElement) {
      const pos = domReactToBounds(targetElement.getBoundingClientRect()).center;
      const point = this.entityManager
        .getEntity<PlaygroundConfigEntity>(PlaygroundConfigEntity)!
        .getPosFromMouseEvent({
          clientX: pos.x,
          clientY: pos.y,
        });
      return {
        x: point.x,
        y: point.y,
        location,
      };
    }
    if (_locationConfig) {
      return {
        ...locationConfigToPoint(bounds, _locationConfig, this._offset),
        location,
      };
    }
    const offset = this._offset || { x: 0, y: 0 };
    let point = { x: 0, y: 0 };
    switch (location) {
      case 'left':
        point = bounds.leftCenter;
        break;
      case 'top':
        point = bounds.topCenter;
        break;
      case 'right':
        point = bounds.rightCenter;
        break;
      case 'bottom':
        point = bounds.bottomCenter;
        break;
    }
    return {
      x: point.x + offset.x,
      y: point.y + offset.y,
      location,
    };
  }

  /**
   * 端口热区
   */
  get bounds(): Rectangle {
    const { point } = this;
    const size = this._size || { width: PORT_SIZE, height: PORT_SIZE };
    return new Rectangle(
      point.x - size.width / 2,
      point.y - size.height / 2,
      size.width,
      size.height
    );
  }

  isHovered(x: number, y: number): boolean {
    return this.bounds.contains(x, y);
  }

  /**
   * 相对节点左上角的位置
   */
  get relativePosition(): IPoint {
    const { point } = this;
    const { bounds } = this.node.getData(FlowNodeTransformData)!;
    return {
      x: point.x - bounds.x,
      y: point.y - bounds.y,
    };
  }

  updateTargetElement(el?: HTMLElement): void {
    if (el !== this.targetElement) {
      this.targetElement = el;
      this.fireChange();
    }
  }

  /**
   * 是否被禁用
   */
  get disabled(): boolean {
    const document = this.node.document as WorkflowDocument;
    if (typeof document.options.isDisabledPort === 'function') {
      return document.options.isDisabledPort(this);
    }
    if (this._disabled) {
      return true;
    }
    const meta = this.node.getNodeMeta<WorkflowNodeMeta>();
    if (this.portType === 'input') {
      return !!meta.inputDisable;
    }
    return !!meta.outputDisable;
  }

  /**
   * 当前点位上连接的线条
   * @deprecated use `availableLines` instead
   */
  get lines(): WorkflowLineEntity[] {
    return this.allLines.filter((line) => !line.isDrawing);
  }

  /**
   * 当前有效的线条，不包含正在画的线条和隐藏的线条（这个出现在线条重连会先把原来的线条隐藏）
   */
  get availableLines(): WorkflowLineEntity[] {
    return this.allLines.filter((line) => !line.isDrawing && !line.isHidden);
  }

  /**
   * 当前点位上连接的线条（包含 isDrawing === true 的线条）
   */
  get allLines() {
    const lines: WorkflowLineEntity[] = [];
    // TODO: 后续 sdk 支持 getEntitiesByType 单独根据 type 获取功能后修改
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const allLines = this.entityManager.getEntities<WorkflowLineEntity>({
      type: WORKFLOW_LINE_ENTITY,
    } as EntityRegistry);
    allLines.forEach((line) => {
      // 不包含 drawing 的线条
      if (line.toPort === this || line.fromPort === this) {
        lines.push(line);
      }
    });
    return lines;
  }

  update(data: Exclude<WorkflowPort, 'portID' | 'type'>) {
    let changed = false;
    if (data.targetElement !== this.targetElement) {
      this.targetElement = data.targetElement;
      changed = true;
    }
    if (data.location !== this._location) {
      this._location = data.location;
      changed = true;
    }
    if (Compare.isChanged(data.offset, this._offset)) {
      this._offset = data.offset;
      changed = true;
    }
    if (Compare.isChanged(data.locationConfig, this._locationConfig)) {
      this._locationConfig = data.locationConfig;
      changed = true;
    }
    if (Compare.isChanged(data.size, this._size)) {
      this._size = data.size;
      changed = true;
    }
    if (data.disabled !== this._disabled) {
      this._disabled = data.disabled;
      changed = true;
    }
    if (changed) {
      this.fireChange();
    }
  }

  dispose(): void {
    // 点位被删除，对应的线条也要删除
    this.lines.forEach((l) => l.dispose());
    super.dispose();
  }
}
