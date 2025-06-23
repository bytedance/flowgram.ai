import { FlowNodeEntity } from '@flowgram.ai/document';

import { type ScopeChainNode } from './types';
import { IScopeTransformer } from './services/scope-chain-transform-service';

export interface VariableLayoutConfig {
  /**
   * 节点的子节点输出变量，不能被后续节点所访问，用于固定布局场景
   * @param node
   * @returns
   */
  isNodeChildrenPrivate?: (node: ScopeChainNode) => boolean;

  /**
   * 用于自由画布场景，部分场景通过连线或者其他交互形式来表达节点之间的父子关系，需要可配置化
   */
  getFreeChildren?: (node: FlowNodeEntity) => FlowNodeEntity[];
  getFreeParent?: (node: FlowNodeEntity) => FlowNodeEntity | undefined;

  /**
   * @deprecated
   * 对依赖作用域进行微调
   */
  transformDeps?: IScopeTransformer;

  /**
   * @deprecated
   * 对依赖作用域进行微调
   */
  transformCovers?: IScopeTransformer;
}

export const VariableLayoutConfig = Symbol('VariableLayoutConfig');
