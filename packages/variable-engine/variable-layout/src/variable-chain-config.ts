/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeEntity } from '@flowgram.ai/document';

import { type ScopeChainNode } from './types';
import { IScopeTransformer } from './services/scope-chain-transform-service';

export interface VariableChainConfig {
  /**
   * The output variables of a node's children cannot be accessed by subsequent nodes.
   *
   * @param node
   * @returns
   */
  isNodeChildrenPrivate?: (node: ScopeChainNode) => boolean;

  /**
   * For fixed layout scenarios: there are a large number of useless nodes between parent and child (such as inlineBlocks, etc., which need to be configured to be skipped)
   * For free canvas scenarios: in some scenarios, the parent-child relationship between nodes is expressed through connections or other interactive forms, which needs to be configurable
   */
  getNodeChildren?: (node: FlowNodeEntity) => FlowNodeEntity[];
  getNodeParent?: (node: FlowNodeEntity) => FlowNodeEntity | undefined;

  /**
   * Fine-tune the dependency scope
   */
  transformDeps?: IScopeTransformer;

  /**
   * 对依赖作用域进行微调
   */
  transformCovers?: IScopeTransformer;
}

export const VariableChainConfig = Symbol('VariableChainConfig');
