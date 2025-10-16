/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Scope } from '@flowgram.ai/variable-core';
import { FlowNodeEntity } from '@flowgram.ai/document';

/**
 * Enum for flow node scope types.
 */
export enum FlowNodeScopeTypeEnum {
  /**
   * Public scope.
   */
  public = 'public',
  /**
   * Private scope.
   */
  private = 'private',
}

/**
 * Metadata for a flow node scope.
 */
export interface FlowNodeScopeMeta {
  /**
   * The flow node entity associated with the scope.
   */
  node?: FlowNodeEntity;
  /**
   * The type of the scope.
   */
  type?: FlowNodeScopeTypeEnum;
}

/**
 * Represents a virtual node in the scope chain.
 */
export interface ScopeVirtualNode {
  /**
   * The ID of the virtual node.
   */
  id: string;
  /**
   * The type of the flow node.
   */
  flowNodeType: 'virtualNode';
}

/**
 * Represents a node in the scope chain, which can be either a flow node entity or a virtual node.
 */
export type ScopeChainNode = FlowNodeEntity | ScopeVirtualNode;

/**
 * Represents a scope associated with a flow node.
 */
export interface FlowNodeScope extends Scope<FlowNodeScopeMeta> {}
