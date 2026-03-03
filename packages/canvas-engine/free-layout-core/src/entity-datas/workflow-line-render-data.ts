/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IPoint, Rectangle } from '@flowgram.ai/utils';
import { EntityData } from '@flowgram.ai/core';

import {
  LineCenterPoint,
  LinePosition,
  LineRenderType,
  WorkflowLineRenderContribution,
  WorkflowLineRenderContributionFactory,
} from '../typings';
import { WorkflowLineEntity } from '../entities';

export interface WorkflowLineRenderDataSchema {
  version: string;
  contributions: Map<LineRenderType, WorkflowLineRenderContribution>;
  position: LinePosition;
}

export class WorkflowLineRenderData extends EntityData<WorkflowLineRenderDataSchema> {
  static type = 'WorkflowLineRenderData';

  declare entity: WorkflowLineEntity;

  constructor(entity: WorkflowLineEntity) {
    super(entity);
    this.syncContributions();
  }

  public getDefaultData(): WorkflowLineRenderDataSchema {
    return {
      version: '',
      contributions: new Map(),
      position: {
        from: { x: 0, y: 0, location: 'right' },
        to: { x: 0, y: 0, location: 'left' },
      },
    };
  }

  public get renderVersion(): string {
    return this.data.version;
  }

  public get position(): LinePosition {
    return this.data.position;
  }

  public get path(): string {
    return this.currentLine?.path ?? '';
  }

  public calcDistance(pos: IPoint): number {
    return this.currentLine?.calcDistance(pos) ?? Number.MAX_SAFE_INTEGER;
  }

  public get bounds(): Rectangle {
    return this.currentLine?.bounds ?? new Rectangle();
  }

  /**
   * 更新数据
   * WARNING: 这个方法，必须在 requestAnimationFrame / useLayoutEffect 中调用，否则会引起浏览器强制重排
   */
  public update(): void {
    this.syncContributions();
    const oldVersion = this.data.version;
    this.updatePosition();
    const newVersion = this.data.version;
    if (oldVersion === newVersion) {
      return;
    }
    this.data.version = newVersion;
    this.currentLine?.update({
      fromPos: this.data.position.from,
      toPos: this.data.position.to,
    });
  }

  private get lineType(): LineRenderType {
    return this.entity.renderType ?? this.entity.linesManager.lineType;
  }

  /**
   * 获取 center 位置
   */
  get center(): LineCenterPoint {
    return this.currentLine?.center || { x: 0, y: 0, labelX: 0, labelY: 0 };
  }

  /**
   * 更新版本
   * WARNING: 这个方法，必须在 requestAnimationFrame / useLayoutEffect 中调用，否则会引起浏览器强制重排
   */
  private updatePosition(): void {
    this.data.position.from = this.entity.drawingFrom || this.entity.fromPort!.point;
    this.data.position.to = this.entity.drawingTo || this.entity.toPort!.point;

    this.data.version = [
      this.lineType,
      this.data.position.from.x,
      this.data.position.from.y,
      this.data.position.from.location,
      this.data.position.to.x,
      this.data.position.to.y,
      this.data.position.to.location,
      this.entity.uiState.shrink, // 这个会影响线条的变化
      this.entity.uiState.curvature,
    ].join('-');
  }

  private get currentLine(): WorkflowLineRenderContribution | undefined {
    return this.data.contributions.get(this.lineType);
  }

  private syncContributions(): void {
    if (this.entity.linesManager.contributionFactories.length === this.data.contributions.size) {
      return;
    }
    this.entity.linesManager.contributionFactories.forEach((factory) => {
      this.registerContribution(factory);
    });
  }

  private registerContribution(contributionFactory: WorkflowLineRenderContributionFactory): void {
    if (this.data.contributions.has(contributionFactory.type)) {
      return;
    }
    const contribution = new contributionFactory(this.entity);
    this.data.contributions.set(contributionFactory.type, contribution);
  }
}
