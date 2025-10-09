/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { HistoryPluginOptions, OperationMeta } from '@flowgram.ai/history';
import { FlowNodeEntity, FlowNodeJSON } from '@flowgram.ai/document';
import { PluginContext } from '@flowgram.ai/core';

export interface IHistoryDocument {
  addFromNode(fromNode: FlowNodeEntity | string, json: FlowNodeJSON): FlowNodeEntity;
  addBlock(
    target: FlowNodeEntity | string,
    blockData: FlowNodeJSON,
    parent?: FlowNodeEntity,
    index?: number
  ): FlowNodeEntity;
  deleteNode(fromNode: FlowNodeEntity): void;
}

/**
 * 将node转成json
 */
export type NodeToJson = (node: FlowNodeEntity) => FlowNodeJSON;
/**
 * 根据节点id获取label
 */
export type GetNodeLabelById = (id: string) => string;
/**
 * 根据节点获取label
 */
export type GetNodeLabel = (node: FlowNodeJSON) => string;
/**
 * 根据分支获取label
 */
export type GetBlockLabel = (node: FlowNodeJSON) => string;
/**
 * 根据节点获取URI
 */
export type GetNodeURI = (id: string) => string | any;
/**
 * 获取文档JSON
 */
export type GetDocumentJSON = () => unknown;

/**
 * 插件配置
 */
export interface FixedHistoryPluginOptions<CTX extends PluginContext = PluginContext>
  extends HistoryPluginOptions<CTX> {
  nodeToJSON?: (ctx: CTX) => NodeToJson;
  getDocumentJSON?: (ctx: CTX) => GetDocumentJSON;
  getNodeLabelById?: (ctx: CTX) => GetNodeLabelById;
  getNodeLabel?: (ctx: CTX) => GetNodeLabel;
  getBlockLabel?: (ctx: CTX) => GetBlockLabel;
  getNodeURI?: (ctx: CTX) => GetNodeURI;
  operationMetas?: OperationMeta[];
  uri?: string | any;
}
