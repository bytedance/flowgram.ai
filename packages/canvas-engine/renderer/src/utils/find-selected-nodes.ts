/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { uniq } from 'lodash-es';
import { type FlowNodeEntity } from '@flowgram.ai/document';

export function isNodeSelectable(node: FlowNodeEntity): boolean {
  const selectable = node.getNodeMeta().selectable;
  return typeof selectable === 'function' ? selectable(node) : selectable !== false;
}

function getNodePath(node: FlowNodeEntity): FlowNodeEntity[] {
  const path: FlowNodeEntity[] = [node];
  node = node.parent as FlowNodeEntity;
  while (node) {
    path.push(node);
    node = node.parent as FlowNodeEntity;
  }
  return path.reverse();
}

/**
 * 将画布节点归并到允许选中的 originParent
 * @param entity
 */
function findRealEntity(entity: FlowNodeEntity): FlowNodeEntity {
  while (entity.originParent && isNodeSelectable(entity.originParent)) {
    entity = entity.originParent;
  }
  return entity;
}
/**
 * 生成选中节点的路径
 * 如
 *   [
 *     'root',
 *     'exclusiveSplit_30baf8b1da0',
 *     'exclusiveSplit_d0070ce5d04',
 *     'createRecord_47e8fe1dfc3'
 *   ],
 *   [
 *     'root',
 *     'exclusiveSplit_30baf8b1da0',
 *     'exclusiveSplit_d0070ce5d04',
 *     'createRecord_32dcdd10274'
 *   ],
 *   [
 *     'root',
 *     'exclusiveSplit_30baf8b1da0',
 *     'exclusiveSplit_d0070ce5d04',
 *     'exclusiveSplit_a5579b3997d', // 这里产生分叉
 *     'createRecord_b57b00eee94' // 父亲节点分叉了，这里就忽略了
 *   ]
 * ]
 * 1. 相同分支的节点，选择每个节点
 * 2. 跨分支的节点选择共同的父节点
 */
export function findSelectedNodes(nodes: FlowNodeEntity[]): FlowNodeEntity[] {
  if (nodes.length === 0) return [];
  /**
   * 生成节点的路径
   */
  const nodePathList: FlowNodeEntity[][] = nodes.map((n) => getNodePath(n));
  /**
   * 只需要比较最小的路径
   */
  const minLength = Math.min(...nodePathList.map((n) => n.length));
  let index = 0;
  let selectedItems: FlowNodeEntity[] = [];
  /**
   * 从二维数组的每一层打平去看，看看有没有分叉，如果有分叉就在当前层停止并作为选中的节点
   */
  while (index < minLength) {
    // eslint-disable-next-line no-loop-func
    selectedItems = uniq(nodePathList.map((p) => p[index]));
    // 存在分叉
    if (selectedItems.length > 1) {
      break;
    }
    index += 1;
  }
  return uniq(selectedItems.map((item) => findRealEntity(item)));
}
