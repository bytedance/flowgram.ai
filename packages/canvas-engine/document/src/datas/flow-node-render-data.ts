/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Compare, Disposable, domUtils, Emitter } from '@flowgram.ai/utils';
import { EntityData } from '@flowgram.ai/core';

import { FlowNodeBaseType } from '../typings';
import type { FlowNodeEntity } from '../entities';
import { FlowNodeTransformData } from './index';


function isNodeSelectable(node: FlowNodeEntity): boolean {
  const selectable = node.getNodeMeta().selectable;
  if (typeof selectable === 'function') {
    return selectable(node);
  }
  return selectable !== false;
}
export interface FlowNodeRenderSchema {
  addable: boolean; // 是否可添加节点
  expandable: boolean; // 是否可展开
  collapsed?: boolean; // 复合节点是否收起
  expanded: boolean;
  activated: boolean; // 是否高亮节点
  hovered: boolean; // 是否悬浮在节点上
  dragging: boolean; // 是否正在拖拽
  stackIndex: number; // 渲染层级
  extInfo?: Record<string, any>; // 扩展渲染状态字段
}

/**
 * 节点渲染状态相关数据
 */
export class FlowNodeRenderData extends EntityData<FlowNodeRenderSchema> {
  static type = 'FlowNodeRenderData';

  declare entity: FlowNodeEntity;

  private _node?: HTMLDivElement;

  protected onExtInfoChangeEmitter = new Emitter<{ newInfo: any; oldInfo: any }>();

  readonly onExtInfoChange = this.onExtInfoChangeEmitter.event;

  get key(): string {
    return this.entity.id;
  }

  getDefaultData(): FlowNodeRenderSchema {
    const { addable, expandable, defaultExpanded } = this.entity.getNodeMeta();
    return {
      addable,
      expandable,
      expanded: defaultExpanded || false,
      activated: false,
      hovered: false,
      dragging: false,
      stackIndex: 0,
    };
  }

  updateExtInfo(info: Record<string, any>, fullUpdate?: boolean) {
    const oldInfo = this.data.extInfo;
    const newInfo = fullUpdate ? info : { ...oldInfo, ...info };
    if (Compare.isChanged(oldInfo, newInfo)) {
      this.update({
        extInfo: newInfo,
      });
      this.onExtInfoChangeEmitter.fire({ oldInfo, newInfo });
    }
  }

  getExtInfo(): Record<string, any> | undefined {
    return this.data.extInfo;
  }

  constructor(entity: FlowNodeEntity) {
    super(entity);
    this.toDispose.push(
      Disposable.create(() => {
        if (this._node) this._node.remove();
      })
    );
  }

  get addable(): boolean {
    return this.data.addable;
  }

  get expandable(): boolean {
    return this.data.expandable;
  }

  get draggable(): boolean {
    const { draggable } = this.entity.getNodeMeta();

    if (typeof draggable === 'function') {
      return draggable(this.entity);
    }

    return draggable;
  }

  get expanded(): boolean {
    return this.data.expanded;
  }

  set expanded(expanded: boolean) {
    if (this.expandable && this.data.expanded !== expanded) {
      this.data.expanded = expanded;
      this.fireChange();
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  mouseLeaveTimeout?: ReturnType<typeof setTimeout>;

  toggleMouseEnter(silent = false) {
    this.entity.document.renderState.setNodeHovered(this.entity);
    if (silent) return;
    const transform = this.entity.getData(FlowNodeTransformData)!;
    if (transform.renderState.hidden) {
      return;
    }
    if (this.mouseLeaveTimeout) {
      clearTimeout(this.mouseLeaveTimeout);
      this.mouseLeaveTimeout = undefined;
    }

    transform.renderState.hovered = true;

    if (this.entity.isFirst && this.entity.parent?.id !== 'root') {
      const parent = this.entity.parent!;
      // Respect selectable:false on dynamicSplit parents (#433).
      if (isNodeSelectable(parent)) {
        transform.parent!.renderState.activated = true;
      } else {
        transform.renderState.activated = true;
      }
    } else {
      transform.renderState.activated = true;
    }
  }

  toggleMouseLeave(silent = false) {
    this.entity.document.renderState.setNodeHovered(undefined);
    if (silent) return;
    const transform = this.entity.getData(FlowNodeTransformData)!;
    this.mouseLeaveTimeout = setTimeout(() => {
      transform.renderState.hovered = false;

      if (this.entity.isFirst && this.entity.parent?.id !== 'root') {
        const parent = this.entity.parent!;
        if (isNodeSelectable(parent)) {
          transform.parent!.renderState.activated = false;
        }
      }
      transform.renderState.activated = false;
    }, 200);
  }

  get hidden(): boolean {
    return this.entity.hidden;
  }

  set hovered(hovered: boolean) {
    this.data.hovered = hovered;
    this.fireChange();
  }

  get hovered() {
    return this.data.hovered;
  }

  get dragging(): boolean {
    return this.data.dragging;
  }

  set dragging(dragging: boolean) {
    if (this.data.dragging !== dragging) {
      this.data.dragging = dragging;
      this.fireChange();
    }
  }

  set activated(activated: boolean) {
    if (this.entity.flowNodeType === FlowNodeBaseType.BLOCK_ICON && this.entity.parent) {
      const parent = this.entity.parent;
      if (isNodeSelectable(parent)) {
        parent.getData<FlowNodeRenderData>(FlowNodeRenderData)!.activated = activated;
      } else if (this.data.activated !== activated) {
        this.data.activated = activated;
        this.fireChange();
      }
      return;
    }
    if (this.data.activated !== activated) {
      this.data.activated = activated;
      this.fireChange();
    }
  }

  get activated() {
    const { entity } = this;
    if (entity.parent && entity.parent.getData<FlowNodeRenderData>(FlowNodeRenderData)!.activated) {
      return true;
    }
    return this.data.activated;
  }

  get stackIndex(): number {
    return this.data.stackIndex;
  }

  set stackIndex(index: number) {
    this.data.stackIndex = index;
  }

  get lineActivated() {
    const { activated } = this;
    if (!activated) return false;
    // 只有 parent 高亮的情况才高亮下面的线条，否则只高亮 node
    // inlineBlock 仅看自身
    // 圈选情况下个节点被高量，则也跟着高量
    return Boolean(
      this.entity.parent?.getData(FlowNodeRenderData)?.activated ||
        this.entity.isInlineBlock ||
        this.entity.next?.getData(FlowNodeRenderData)!.activated
    );
  }

  get node(): HTMLDivElement {
    if (this._node) return this._node;
    this._node = domUtils.createDivWithClass('gedit-flow-activity-node');
    this._node.dataset.testid = 'sdk.workflow.canvas.node';
    this._node.dataset.nodeId = this.entity.id;
    return this._node;
  }

  dispose() {
    super.dispose();
    this.onExtInfoChangeEmitter.dispose();
  }
}
