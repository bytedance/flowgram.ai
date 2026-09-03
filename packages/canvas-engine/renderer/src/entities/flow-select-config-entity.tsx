/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  type FlowNodeEntity,
  FlowNodeRenderData,
  FlowNodeTransformData,
} from '@flowgram.ai/document';
import { ConfigEntity } from '@flowgram.ai/core';
import { Compare, Rectangle } from '@flowgram.ai/utils';

import { findSelectedNodes } from '../utils/find-selected-nodes';


function isNodeSelectable(node: FlowNodeEntity): boolean {
  const selectable = node.getNodeMeta().selectable;
  if (typeof selectable === 'function') {
    return selectable(node);
  }
  return selectable !== false;
}
interface FlowSelectConfigEntityData {
  selectedNodes: FlowNodeEntity[];
}

const BOUNDS_PADDING_DEFAULT = 10;

/**
 * 圈选节点相关数据存储
 */
export class FlowSelectConfigEntity extends ConfigEntity<FlowSelectConfigEntityData> {
  static type = 'FlowSelectConfigEntity';

  boundsPadding = BOUNDS_PADDING_DEFAULT;

  getDefaultConfig(): FlowSelectConfigEntityData {
    return {
      selectedNodes: [],
    };
  }

  get selectedNodes(): FlowNodeEntity[] {
    return this.config.selectedNodes;
  }

  /**
   * 选中节点
   * @param nodes
   */
  set selectedNodes(nodes: FlowNodeEntity[]) {
    nodes = findSelectedNodes(nodes);
    // if (nodes.length === 1 && nodes[0].flowNodeType === FlowNodeBaseType.END) {
    //   nodes = [];
    // }
    if (
      nodes.length !== this.config.selectedNodes.length ||
      nodes.some(n => !this.config.selectedNodes.includes(n))
    ) {
      this.config.selectedNodes.forEach(oldNode => {
        if (!nodes.includes(oldNode)) {
          oldNode.getData(FlowNodeRenderData)!.activated = false;
        }
      });
      // 高亮选中的节点
      nodes.forEach(node => {
        node.getData(FlowNodeRenderData)!.activated = true;
      });
      if (Compare.isArrayShallowChanged(this.config.selectedNodes, nodes)) {
        this.updateConfig({
          selectedNodes: nodes,
        });
      }
    }
  }

  /**
   * 清除选中节点
   */
  clearSelectedNodes() {
    if (this.config.selectedNodes.length === 0) return;
    this.config.selectedNodes.forEach(node => {
      node.getData(FlowNodeRenderData)!.activated = false;
    });
    this.updateConfig({
      selectedNodes: [],
    });
  }

  /**
   * 通过选择框选中节点
   * @param rect
   * @param transforms
   */
  selectFromBounds(rect: Rectangle, transforms: FlowNodeTransformData[]): void {
    const selectedNodes: FlowNodeEntity[] = [];
    transforms.forEach(transform => {
      if (Rectangle.intersects(rect, transform.bounds)) {
        if (transform.entity.originParent) {
          const parent = transform.entity.originParent;
          if (isNodeSelectable(parent)) {
            selectedNodes.push(parent);
          } else if (isNodeSelectable(transform.entity)) {
            selectedNodes.push(transform.entity);
          }
        } else {
          selectedNodes.push(transform.entity);
        }
      }
    });
    this.selectedNodes = selectedNodes;
  }

  /**
   * 获取选中节点外围的最大边框
   */
  getSelectedBounds(): Rectangle {
    const nodes = this.selectedNodes;
    if (nodes.length === 0) {
      return Rectangle.EMPTY;
    }
    return Rectangle.enlarge(nodes.map(n => n.getData(FlowNodeTransformData)!.bounds)).pad(
      this.boundsPadding,
    );
  }
}
