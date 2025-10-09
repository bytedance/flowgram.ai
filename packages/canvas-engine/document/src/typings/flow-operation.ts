/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Event } from '@flowgram.ai/utils';
import { Disposable } from '@flowgram.ai/utils';

import { type FlowNodeEntity } from '../entities/flow-node-entity';
import { AddNodeData, FlowNodeJSON } from './flow';

export enum OperationType {
  addFromNode = 'addFromNode',
  deleteFromNode = 'deleteFromNode',
  addBlock = 'addBlock',
  deleteBlock = 'deleteBlock',
  createGroup = 'createGroup',
  ungroup = 'ungroup',
  moveNodes = 'moveNodes',
  moveBlock = 'moveBlock',
  moveChildNodes = 'moveChildNodes',
  addNodes = 'addNodes',
  deleteNodes = 'deleteNodes',
  addChildNode = 'addChildNode',
  deleteChildNode = 'deleteChildNode',
  addNode = 'addNode',
  deleteNode = 'deleteNode',
}

export interface AddOrDeleteFromNodeOperationValue {
  fromId: string;
  data: FlowNodeJSON;
}

export interface AddOrDeleteNodeOperationValue {
  fromId: string;
  data: FlowNodeJSON;
}

export interface AddFromNodeOperation {
  type: OperationType.addFromNode;
  value: AddOrDeleteFromNodeOperationValue;
}

export interface DeleteFromNodeOperation {
  type: OperationType.deleteFromNode;
  value: AddOrDeleteFromNodeOperationValue;
}

export interface AddOrDeleteBlockValue {
  targetId: string;
  index?: number;
  blockData: FlowNodeJSON;
  parentId?: string;
}

export interface createOrUngroupValue {
  targetId: string;
  groupId: string;
  nodeIds: string[];
}

export interface AddBlockOperation {
  type: OperationType.addBlock;
  value: AddOrDeleteBlockValue;
}

export interface DeleteBlockOperation {
  type: OperationType.deleteBlock;
  value: AddOrDeleteBlockValue;
}

export interface CreateGroupOperation {
  type: OperationType.createGroup;
  value: createOrUngroupValue;
}

export interface UngroupOperation {
  type: OperationType.ungroup;
  value: createOrUngroupValue;
}

export interface MoveNodesOperationValue {
  fromId: string;
  toId: string;
  nodeIds: string[];
}

export interface MoveNodesOperation {
  type: OperationType.moveNodes;
  value: MoveNodesOperationValue;
}

export interface AddOrDeleteNodesOperationValue {
  fromId: string;
  nodes: FlowNodeJSON[];
}

export interface AddNodesOperation {
  type: OperationType.addNodes;
  value: AddOrDeleteNodesOperationValue;
}

export interface DeleteNodesOperation {
  type: OperationType.deleteNodes;
  value: AddOrDeleteNodesOperationValue;
}

export interface MoveChildNodesOperationValue {
  nodeIds: string[];
  fromParentId: string;
  fromIndex: number;
  toParentId: string;
  toIndex: number;
}

export type MoveBlockOperationValue = {
  nodeId: string;
  fromParentId: string;
  fromIndex: number;
  toParentId: string;
  toIndex: number;
};

export interface MoveBlockOperation {
  type: OperationType.moveBlock;
  value: MoveBlockOperationValue;
}

export interface MoveChildNodesOperation {
  type: OperationType.moveChildNodes;
  value: MoveChildNodesOperationValue;
}

export interface AddChildNodeOperation {
  type: OperationType.addChildNode;
  value: AddOrDeleteChildNodeValue;
}

export interface DeleteChildNodeOperation {
  type: OperationType.deleteChildNode;
  value: AddOrDeleteChildNodeValue;
}

export interface AddOrDeleteChildNodeValue {
  data: FlowNodeJSON;
  parentId?: string;
  index?: number;
  originParentId?: string;
  hidden?: boolean;
}

export interface AddNodeOperation {
  type: OperationType.addNode;
  value: AddOrDeleteNodeValue;
}

export interface DeleteNodeOperation {
  type: OperationType.deleteNode;
  value: AddOrDeleteNodeValue;
}

export interface AddOrDeleteNodeValue {
  data: FlowNodeJSON;
  parentId?: string;
  index?: number;
  hidden?: boolean;
}

export type FlowOperation =
  | AddFromNodeOperation
  | DeleteFromNodeOperation
  | AddBlockOperation
  | DeleteBlockOperation
  | CreateGroupOperation
  | UngroupOperation
  | MoveNodesOperation
  | AddNodesOperation
  | DeleteNodesOperation
  | MoveBlockOperation
  | AddChildNodeOperation
  | DeleteChildNodeOperation
  | MoveChildNodesOperation
  | AddNodeOperation
  | DeleteNodeOperation;

export type FlowNodeEntityOrId = string | FlowNodeEntity;

// 添加节点时的配置
export type AddNodeConfig = {
  // 父节点
  parent?: FlowNodeEntityOrId;
  // 是否隐藏
  hidden?: boolean;
  // 插入位置
  index?: number;
};

/**
 * 添加block时的配置
 */
export interface AddBlockConfig {
  // 父节点，默认去找 $inlineBlocks$
  parent?: FlowNodeEntity;
  // 插入位置，默认最后
  index?: number;
}

/**
 * 移动节点时的配置
 */
export interface MoveNodeConfig {
  // 目标父节点,如果不传,默认使用移动节点的父节点
  parent?: FlowNodeEntityOrId;
  // 目标位置, 默认移动到最后
  index?: number;
}

/**
 * 节点添加事件
 */
export interface OnNodeAddEvent {
  node: FlowNodeEntity;
  data: AddNodeData;
}

/**
 * 节点移动事件
 */
export interface OnNodeMoveEvent {
  node: FlowNodeEntity;
  fromParent: FlowNodeEntity;
  fromIndex: number;
  toParent: FlowNodeEntity;
  toIndex: number;
}

export interface FlowOperationBaseService extends Disposable {
  /**
   * 执行操作
   * @param operation 可序列化的操作
   * @returns 操作返回
   */
  apply(operation: FlowOperation): any;

  /**
   * 添加节点，如果节点已经存在则不会重复创建
   * @param nodeJSON 节点数据
   * @param config 配置
   * @returns 成功添加的节点
   */
  addNode(nodeJSON: FlowNodeJSON, config?: AddNodeConfig): FlowNodeEntity;

  /**
   * 基于某一个起始节点往后面添加
   * @param fromNode 起始节点
   * @param nodeJSON 添加的节点JSON
   */
  addFromNode(fromNode: FlowNodeEntityOrId, nodeJSON: FlowNodeJSON): FlowNodeEntity;

  /**
   * 删除节点
   * @param node 节点
   * @returns
   */
  deleteNode(node: FlowNodeEntityOrId): void;

  /**
   * 批量删除节点
   * @param nodes
   */
  deleteNodes(nodes: FlowNodeEntityOrId[]): void;

  /**
   * 添加块（分支）
   * @param target 目标
   * @param blockJSON 块数据
   * @param config 配置
   * @returns
   */
  addBlock(
    target: FlowNodeEntityOrId,
    blockJSON: FlowNodeJSON,
    config?: AddBlockConfig
  ): FlowNodeEntity;

  /**
   * 移动节点
   * @param node 被移动的节点
   * @param config 移动节点配置
   */
  moveNode(node: FlowNodeEntityOrId, config?: MoveNodeConfig): void;

  /**
   * 拖拽节点
   * @param param0
   * @returns
   */
  dragNodes({ dropNode, nodes }: { dropNode: FlowNodeEntity; nodes: FlowNodeEntity[] }): void;

  /**
   * 添加节点的回调
   */
  onNodeAdd: Event<OnNodeAddEvent>;

  /**
   * 节点移动的回调
   */
  onNodeMove: Event<OnNodeMoveEvent>;
}

export const FlowOperationBaseService = Symbol('FlowOperationBaseService');
