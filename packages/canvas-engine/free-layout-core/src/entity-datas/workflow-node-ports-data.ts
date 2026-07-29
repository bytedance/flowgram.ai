/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { isEqual } from 'lodash-es';
import { FlowNodeRenderData } from '@flowgram.ai/document';
import { EntityData, SizeData } from '@flowgram.ai/core';

import { type WorkflowPortType, getPortEntityId } from '../utils/statics';
import { type LinePoint, LinePointLocation, type WorkflowNodeMeta } from '../typings';
import { WorkflowPortEntity } from '../entities/workflow-port-entity';
import { type WorkflowNodeEntity, type WorkflowPort, type WorkflowPorts } from '../entities';

/**
 * 节点的点位信息
 * portsData 只监听点位的数目和类型，不监听点位的 position 变化
 */
export class WorkflowNodePortsData extends EntityData {
  public static readonly type = 'WorkflowNodePortsData';

  public readonly entity: WorkflowNodeEntity;

  /** 静态的 ports 数据 */
  protected _staticPorts: WorkflowPorts = [];

  /** 存储 port 实体的 id，用于判断 port 是否存在 */
  protected _portIDSet = new Set<string>();

  protected _portDisposeIDSet = new Set<string>();

  /** 上一次的 ports 数据，用于判断 ports 是否发生变化 */
  protected _prePorts: WorkflowPorts;

  protected _allPortsCache?: WorkflowPortEntity[];

  protected _inputPortsCache?: WorkflowPortEntity[];

  protected _outputPortsCache?: WorkflowPortEntity[];

  constructor(entity: WorkflowNodeEntity) {
    super(entity);
    this.entity = entity;
    const meta = entity.getNodeMeta<WorkflowNodeMeta>();
    // 动态模式默认为空, 非动态模式默认左右两个点位
    const defaultPorts: WorkflowPorts = meta.useDynamicPort
      ? []
      : [{ type: 'input' }, { type: 'output' }];
    this._staticPorts = meta.defaultPorts?.slice() || defaultPorts;
    this.updatePorts(this._staticPorts);
    if (meta.useDynamicPort) {
      this.toDispose.push(
        // 只需要监听节点的大小，因为算的是相对位置
        entity.getData!(SizeData)!.onDataChange(() => {
          // 有可能节点被销毁了
          if (entity.getData!(SizeData).width && entity.getData!(SizeData).height) {
            this.updateDynamicPorts();
          }
        })
      );
    }
    this.onDispose(() => {
      this.allPorts.forEach((port) => port.dispose());
    });
  }

  public getDefaultData(): any {
    return {};
  }

  /**
   * Update all ports data, includes static ports and dynamic ports
   * @param ports
   */
  public updateAllPorts(ports?: WorkflowPorts) {
    const meta = this.entity.getNodeMeta<WorkflowNodeMeta>();
    if (ports) {
      this._staticPorts = ports;
    }
    if (meta.useDynamicPort) {
      this.updateDynamicPorts();
    } else {
      this.updatePorts(this._staticPorts);
    }
  }

  /**
   * @deprecated use `updateAllPorts` instead
   */
  public updateStaticPorts(ports: WorkflowPorts): void {
    this.updateAllPorts(ports);
  }

  /**
   * 动态计算点位，通过 dom 的 data-port-key
   */
  public updateDynamicPorts(): void {
    const domNode = this.entity.getData(FlowNodeRenderData)!.node;
    const elements = domNode.querySelectorAll<HTMLDivElement>('[data-port-id]');
    const staticPorts: WorkflowPorts = this._staticPorts;
    const dynamicPorts: WorkflowPorts = [];
    if (elements.length > 0) {
      dynamicPorts.push(
        ...Array.from(elements).map((element) => ({
          portID: element.getAttribute('data-port-id')!,
          type: element.getAttribute('data-port-type')! as WorkflowPortType,
          location: element.getAttribute('data-port-location')! as LinePointLocation,
          targetElement: element,
        }))
      );
    }
    this.updatePorts(staticPorts.concat(dynamicPorts));
  }

  /**
   * 根据 key 获取 port 实体
   */
  public getPortEntityByKey(
    portType: WorkflowPortType,
    portKey?: string | number
  ): WorkflowPortEntity {
    const entity = this.getOrCreatePortEntity({
      type: portType,
      portID: portKey,
    });
    return entity;
  }

  /**
   * 更新 ports 数据
   */
  protected updatePorts(ports: WorkflowPorts): void {
    if (!isEqual(this._prePorts, ports)) {
      const portKeys = ports.map((port) => this.getPortId(port.type, port.portID));
      this._portIDSet.forEach((portId) => {
        if (!portKeys.includes(portId)) {
          this.getPortEntity(portId)?.dispose();
        }
      });
      ports.forEach((port) => this.updatePortEntity(port));
      this._prePorts = ports;
      this.clearPortsCache();
      this.fireChange();
    }

    // Note: 为什么调用 port.validate 不够，需要调用 line.validate
    // 原因：假设有这样的连线：dynamic port → end 节点。
    // line.validate 时，line.fromPort 可能为 undefined（未创建实体），导致 end 节点上的 port 未正确校验
    // 所以需要在所有 port entities 准备完成后，通过再次调用 line.validate 来触发连线另一端的 port 更新
    this.allPorts.forEach((port) => {
      port.allLines.forEach((line) => {
        line.validate();
      });
    });
  }

  /**
   * 获取所有 port entities
   */
  public get allPorts(): WorkflowPortEntity[] {
    if (!this._allPortsCache) {
      this._allPortsCache = Array.from(this._portIDSet)
        .map((portId) => this.getPortEntity(portId)!)
        .filter(Boolean); // dispose 时，会获取不到 port
    }
    return this._allPortsCache;
  }

  /**
   * 获取输入点位
   */
  public get inputPorts(): WorkflowPortEntity[] {
    if (!this._inputPortsCache) {
      this._inputPortsCache = this.allPorts.filter((port) => port.portType === 'input');
    }
    return this._inputPortsCache;
  }

  /**
   * 获取输出点位
   */
  public get outputPorts(): WorkflowPortEntity[] {
    if (!this._outputPortsCache) {
      this._outputPortsCache = this.allPorts.filter((port) => port.portType === 'output');
    }
    return this._outputPortsCache;
  }

  /**
   * 获取输入点位置
   */
  public get inputPoints(): LinePoint[] {
    return this.inputPorts.map((port) => port.point);
  }

  /**
   * 获取输出点位置
   */
  public get outputPoints(): LinePoint[] {
    return this.outputPorts.map((port) => port.point);
  }

  /**
   * 根据 key 获取 输入点位置
   */
  public getInputPoint(key?: string | number): LinePoint {
    return this.getPortEntityByKey('input', key).point;
  }

  /**
   * 根据 key 获取输出点位置
   */
  public getOutputPoint(key?: string | number): LinePoint {
    return this.getPortEntityByKey('output', key).point;
  }

  /**
   * 获取 port 实体
   */
  protected getPortEntity(portId: string): WorkflowPortEntity | undefined {
    if (!this._portIDSet.has(portId)) {
      // 如果不是自身创建的 port，则返回 undefined
      return undefined;
    }
    return this.entity.entityManager.getEntityById<WorkflowPortEntity>(portId)!;
  }

  /**
   * 拼接 port 实体的 id
   */
  protected getPortId(portType: WorkflowPortType, portKey: string | number = ''): string {
    return getPortEntityId(this.entity, portType, portKey);
  }

  protected clearPortsCache(): void {
    this._allPortsCache = undefined;
    this._inputPortsCache = undefined;
    this._outputPortsCache = undefined;
  }

  /**
   * 创建 port 实体
   */
  protected createPortEntity(portInfo: WorkflowPort): WorkflowPortEntity {
    const id = this.getPortId(portInfo.type, portInfo.portID);
    let portEntity = this.entity.entityManager.getEntityById<WorkflowPortEntity>(id);
    if (!portEntity) {
      portEntity = this.entity.entityManager.createEntity<WorkflowPortEntity>(WorkflowPortEntity, {
        id,
        node: this.entity,
        ...portInfo,
      });
    }
    if (!this._portDisposeIDSet.has(id)) {
      this._portDisposeIDSet.add(id);
      portEntity.onDispose(() => {
        this._portIDSet.delete(id);
        this._portDisposeIDSet.delete(id);
        this.clearPortsCache();
      });
    }
    if (!this._portIDSet.has(id)) {
      this._portIDSet.add(id);
      this.clearPortsCache();
    }
    return portEntity;
  }

  /**
   * 获取或创建 port 实体
   */
  protected getOrCreatePortEntity(portInfo: WorkflowPort): WorkflowPortEntity {
    const id = this.getPortId(portInfo.type, portInfo.portID);
    return this.getPortEntity(id) ?? this.createPortEntity(portInfo);
  }

  /**
   * 更新 port 实体
   */
  protected updatePortEntity(portInfo: WorkflowPort): WorkflowPortEntity {
    const portEntity = this.getOrCreatePortEntity(portInfo);
    portEntity.update(portInfo);
    return portEntity;
  }
}
