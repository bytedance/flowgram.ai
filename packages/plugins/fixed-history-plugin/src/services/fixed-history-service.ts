/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { injectable, inject } from 'inversify';
import { HistoryService, Operation } from '@flowgram.ai/history';
import { OperationRegistry } from '@flowgram.ai/history';
import { OperationMeta } from '@flowgram.ai/history';
import {
  AddOrDeleteBlockValue,
  AddOrDeleteChildNodeValue,
  AddOrDeleteFromNodeOperationValue,
  FlowNodeEntity,
  FlowNodeJSON,
  OperationType,
} from '@flowgram.ai/document';
import { FlowDocument } from '@flowgram.ai/document';
import { FlowOperationBaseService } from '@flowgram.ai/document';
import { PluginContext } from '@flowgram.ai/core';

import { IHistoryDocument } from '../types';
import { FixedHistoryConfig } from '../fixed-history-config';
import { FixedHistoryOperationService } from './fixed-history-operation-service';

@injectable()
export class FixedHistoryService implements IHistoryDocument {
  @inject(HistoryService) historyService: HistoryService;

  @inject(OperationRegistry) operationRegistry: OperationRegistry;

  @inject(FlowOperationBaseService)
  fixedHistoryOperationService: FixedHistoryOperationService;

  @inject(FlowDocument) document: FlowDocument;

  @inject(FixedHistoryConfig) config: FixedHistoryConfig;

  setSource(source: PluginContext) {
    this.historyService.context.source = source;
  }

  /**
   * 注册操作
   * @param operationMetas
   */
  public registerOperationMetas(operationMetas: OperationMeta[]) {
    operationMetas.forEach((operationMeta) => {
      this.operationRegistry.registerOperationMeta(operationMeta);
    });
  }

  /**
   * 事务
   * @param transaction
   */
  public transact(transaction: () => void) {
    this.historyService.transact(transaction);
  }

  /**
   * 撤销
   */
  async undo() {
    await this.historyService.undo();
  }

  /**
   * 重做
   */
  async redo() {
    await this.historyService.redo();
  }

  /**
   * 是否可重做
   */
  canRedo() {
    return this.historyService.canRedo();
  }

  /**
   * 是否可撤销
   */
  canUndo() {
    return this.historyService.canUndo();
  }

  /**
   * 添加一个操作
   * @param operation
   */
  pushHistoryOperation(operation: Operation) {
    return this.historyService.pushOperation(operation);
  }

  /**
   * 获取历史操作
   */
  getHistoryOperations() {
    return this.historyService.getHistoryOperations();
  }

  /**
   * 添加节点
   * @param value 添加节点配置
   * @returns
   * @deprecated 请使用 `FlowOperationService.addFromNode` 代替
   */
  addFromNode(fromNode: FlowNodeEntity | string, json: FlowNodeJSON): FlowNodeEntity {
    const value: AddOrDeleteFromNodeOperationValue = {
      fromId: typeof fromNode === 'string' ? fromNode : fromNode.id,
      data: json,
    };
    return this.historyService.pushOperation({
      type: OperationType.addFromNode,
      value,
      uri: this.config.getNodeURI(json.id),
    });
  }

  /**
   * 删除节点
   * @param node 节点
   * @returns
   * @deprecated 请使用 `FlowOperationService.deleteNode` 代替
   */
  deleteNode(node: FlowNodeEntity): void {
    const { originParent, parent } = node;
    const uri = this.config.getNodeURI(node.id);
    let nodeJSON = this.config.nodeToJSON(node);

    // 非数据节点
    if (!nodeJSON) {
      nodeJSON = {
        id: node.id,
        type: node.flowNodeType,
      };
    }

    if (parent) {
      const index = parent.children.findIndex((child) => child === node);

      if (originParent) {
        // 分支节点
        let parentId: string | undefined = originParent.id;
        if (!parentId) {
          console.warn('no parent found');
          return;
        }

        const value: AddOrDeleteBlockValue = {
          targetId: parentId,
          blockData: nodeJSON,
        };

        if (index >= 0) {
          value.index = index;
        }

        return this.historyService.pushOperation({
          type: OperationType.deleteBlock,
          value,
          uri,
        });
      } else {
        // Reactor节点
        const value: AddOrDeleteChildNodeValue = {
          data: nodeJSON,
          parentId: parent.id,
        };

        if (index >= 0) {
          value.index = index;
        }

        return this.historyService.pushOperation({
          type: OperationType.deleteChildNode,
          value,
          uri,
        });
      }
    } else {
      // 普通节点
      if (!node.pre) {
        console.warn('no pre found');
        return;
      }

      return this.historyService.pushOperation({
        type: OperationType.deleteFromNode,
        value: {
          fromId: node.pre.id,
          data: nodeJSON,
          uri,
        },
      });
    }
  }

  /**
   * 添加子节点
   * @param data
   * @param parent
   * @param index
   * @param originParent
   * @returns
   * @deprecated 请使用 `FlowOperationService.addNode` 代替
   */
  addChildNode(
    data: FlowNodeJSON,
    parent?: FlowNodeEntity,
    index?: number,
    originParent?: FlowNodeEntity
  ) {
    const value: AddOrDeleteChildNodeValue = {
      data,
      parentId: parent?.id,
      originParentId: originParent?.id,
      index,
    };

    return this.historyService.pushOperation({
      type: OperationType.addChildNode,
      value: value,
      uri: this.config.getNodeURI(data.id),
    });
  }

  /**
   * 批量删除
   * @param nodes
   * @deprecated 请使用 `FlowOperationService.deleteNodes` 代替
   */
  deleteNodes(nodes: FlowNodeEntity[]) {
    if (nodes.length === 0) {
      return;
    }

    this.historyService.transact(() => {
      nodes.reverse().forEach((node) => {
        this.deleteNode(node);
      });
    });
  }

  /**
   * 批量添加
   * @param from
   * @param nodes
   */
  addFromNodes(from: FlowNodeEntity, nodes: FlowNodeEntity[]) {
    if (nodes.length === 0) {
      return;
    }
    return this.historyService.pushOperation({
      type: OperationType.addNodes,
      value: {
        fromId: from.id,
        nodes: nodes.map((node) => this.config.nodeToJSON(node)),
        uri: this.config.getNodeURI(nodes[0].id),
      },
    });
  }

  /**
   * 添加块级元素
   * @param target 目标
   * @param blockData 块数据
   * @param parent 父级
   * @returns
   * @deprecated 请使用 `FlowOperationService.addBlock` 代替
   */
  addBlock(
    target: string | FlowNodeEntity,
    blockData: FlowNodeJSON,
    parent?: FlowNodeEntity | undefined,
    index?: number
  ): FlowNodeEntity {
    const value: AddOrDeleteBlockValue = {
      targetId: typeof target === 'string' ? target : target.id,
      blockData,
      index,
    };

    if (parent) {
      value.parentId = parent.id;
    }

    return this.historyService.pushOperation({
      type: OperationType.addBlock,
      value,
      uri: this.config.getNodeURI(value.blockData.id),
    });
  }

  /**
   * 移动节点
   * @param node 被移动的节点
   * @param toNode 被放置的节点
   * @returns
   */
  moveNode(node: FlowNodeEntity, toNode: FlowNodeEntity) {
    return this.fixedHistoryOperationService.dragNodes({
      dropNode: toNode,
      nodes: [node],
    });
  }
}
