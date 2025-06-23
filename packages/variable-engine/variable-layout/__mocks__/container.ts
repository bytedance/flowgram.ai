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
  VariableLayoutConfig,
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

export interface TestConfig extends VariableLayoutConfig {
  enableGlobalScope?: boolean;
}

export function getContainer(layout: 'free' | 'fixed', config?: TestConfig): Container {
  const { enableGlobalScope, ...layoutConfig } = config || {};

  const container = createPlaygroundContainer() as Container;
  container.load(VariableContainerModule);
  container.load(FlowDocumentContainerModule);

  if (layout === 'free') {
    container.load(WorkflowDocumentContainerModule);
    container.get(WorkflowLinesManager).registerContribution(WorkflowSimpleLineContribution);
    container.get(WorkflowLinesManager).switchLineType(WorkflowSimpleLineContribution.type);
  }

  if (layoutConfig) {
    container.bind(VariableLayoutConfig).toConstantValue(layoutConfig);
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

  return container;
}
