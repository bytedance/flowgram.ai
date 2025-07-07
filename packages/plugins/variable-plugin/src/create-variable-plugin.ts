/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  FlowNodeVariableData,
  FreeLayoutScopeChain,
  FixedLayoutScopeChain,
  VariableChainConfig,
  bindGlobalScope,
  ScopeChainTransformService,
} from '@flowgram.ai/variable-layout';
import {
  VariableContainerModule,
  ASTNodeRegistry,
  ASTRegisters,
  VariableEngine,
  ScopeChain,
} from '@flowgram.ai/variable-core';
import { FlowDocument } from '@flowgram.ai/document';
import { PluginContext, definePluginCreator } from '@flowgram.ai/core';
import { EntityManager } from '@flowgram.ai/core';

/**
 * @deprecated 请使用 @injectToAst(XXXService) declare xxxService: XXXService 实现外部依赖注入
 */
type Injector = (ctx: PluginContext) => Record<string, any>;

export interface VariablePluginOptions {
  enable?: boolean;
  /**
   * Custom Extends ASTNode
   */
  extendASTNodes?: (ASTNodeRegistry | [ASTNodeRegistry] | [ASTNodeRegistry, Injector])[];
  /**
   * Layout method
   */
  layout?: 'fixed' | 'free';
  /**
   * @deprecated use chainConfig instead
   */
  layoutConfig?: VariableChainConfig;
  /**
   * Configuration for scope chain
   */
  chainConfig?: VariableChainConfig;
}

export const createVariablePlugin = definePluginCreator<VariablePluginOptions>({
  onBind({ bind }, opts) {
    const { layout, layoutConfig, chainConfig } = opts;

    bind(ScopeChainTransformService).toSelf().inSingletonScope();

    if (layout === 'free') {
      bind(ScopeChain).to(FreeLayoutScopeChain).inSingletonScope();
    }
    if (layout === 'fixed') {
      bind(ScopeChain).to(FixedLayoutScopeChain).inSingletonScope();
    }
    if (chainConfig) {
      bind(VariableChainConfig).toConstantValue(chainConfig || {});
    } else if (layoutConfig) {
      console.warn(`Layout Config deprecated, use chainConfig instead`);
      bind(VariableChainConfig).toConstantValue(layoutConfig || {});
    }

    bindGlobalScope(bind);
  },
  onInit(ctx, opts) {
    const { extendASTNodes } = opts || {};

    const variableEngine = ctx.get<VariableEngine>(VariableEngine);
    const astRegisters = ctx.get<ASTRegisters>(ASTRegisters);
    const entityManager = ctx.get<EntityManager>(EntityManager);
    const document = ctx.get<FlowDocument>(FlowDocument);

    /**
     * 注册扩展 AST 节点
     */
    (extendASTNodes || []).forEach((info) => {
      if (Array.isArray(info)) {
        const [extendASTNode, injector] = info;

        astRegisters.registerAST(extendASTNode, injector ? () => injector(ctx) : undefined);

        return;
      }

      astRegisters.registerAST(info);
    });

    /**
     * 扩展 FlowNodeVariableData
     */
    entityManager.registerEntityData(FlowNodeVariableData, () => ({ variableEngine } as any));
    document.registerNodeDatas(FlowNodeVariableData);
  },
  containerModules: [VariableContainerModule],
});
