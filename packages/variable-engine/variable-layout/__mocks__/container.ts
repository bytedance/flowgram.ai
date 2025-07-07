/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Container } from 'inversify';
import {
  ASTFactory,
  ScopeChain,
  VariableContainerModule,
} from '@flowgram.ai/variable-core';
import { createPlaygroundContainer } from '@flowgram.ai/core';
import {
  FreeLayoutScopeChain,
  FixedLayoutScopeChain,
  FlowNodeVariableData,
  VariableChainConfig,
  GlobalScope,
  bindGlobalScope,
  ScopeChainTransformService,
} from '../src';
import { EntityManager } from '@flowgram.ai/core';
import { VariableEngine } from '@flowgram.ai/variable-core';
import {
  FlowDocument,
  FlowDocumentContainerModule,
} from '@flowgram.ai/document';
import { WorkflowDocumentContainerModule, WorkflowLinesManager, WorkflowSimpleLineContribution } from '@flowgram.ai/free-layout-core';

export interface TestConfig extends VariableChainConfig {
  enableGlobalScope?: boolean;
  onInit?: (container: Container) => void;
  runExtraTest?: (container: Container) => void
}

export function getContainer(layout: 'free' | 'fixed', config?: TestConfig): Container {
  const { enableGlobalScope, onInit, runExtraTest, ...layoutConfig } = config || {};

  const container = createPlaygroundContainer() as Container;
  container.load(VariableContainerModule);
  container.load(FlowDocumentContainerModule);

  if (layout === 'free') {
    container.load(WorkflowDocumentContainerModule);
    container.get(WorkflowLinesManager).registerContribution(WorkflowSimpleLineContribution);
    container.get(WorkflowLinesManager).switchLineType(WorkflowSimpleLineContribution.type);
  }

  if (layoutConfig) {
    container.bind(VariableChainConfig).toConstantValue(layoutConfig);
  }
  if (layout === 'free') {
    container.bind(ScopeChain).to(FreeLayoutScopeChain).inSingletonScope();
  }
  if (layout === 'fixed') {
    container.bind(ScopeChain).to(FixedLayoutScopeChain).inSingletonScope();
  }

  container.bind(ScopeChainTransformService).toSelf().inSingletonScope();

  bindGlobalScope(container.bind.bind(container))

  const entityManager = container.get<EntityManager>(EntityManager);
  const variableEngine = container.get<VariableEngine>(VariableEngine);
  const document = container.get<FlowDocument>(FlowDocument);

  if (enableGlobalScope) {
    // when get global scope, it will auto create it if not exists
    container.get(GlobalScope).setVar(ASTFactory.createVariableDeclaration({
      key: 'GlobalScope',
      type: ASTFactory.createString(),
    }));
  }

  /**
   * 扩展 FlowNodeVariableData
   */
  entityManager.registerEntityData(
    FlowNodeVariableData,
    () => ({ variableEngine } as any),
  );
  document.registerNodeDatas(FlowNodeVariableData);

  onInit?.(container);

  return container;
}
