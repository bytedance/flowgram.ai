/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export { FlowNodeVariableData } from './flow-node-variable-data';
export { FreeLayoutScopeChain } from './chains/free-layout-scope-chain';
export { VariableChainConfig } from './variable-chain-config';
export { FixedLayoutScopeChain } from './chains/fixed-layout-scope-chain';
export {
  type FlowNodeScopeMeta,
  type FlowNodeScope,
  FlowNodeScopeTypeEnum as FlowNodeScopeType,
} from './types';
export { GlobalScope, bindGlobalScope } from './scopes/global-scope';
export { ScopeChainTransformService } from './services/scope-chain-transform-service';
export { getNodeScope, getNodePrivateScope } from './utils';
