/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Container, ContainerModule, type interfaces } from 'inversify';
import { CommandService, CommandContainerModule } from '@flowgram.ai/command';

import { ContextMenuService } from './services/context-menu-service';
import {
  ClipboardService,
  DefaultClipboardService,
  LocalStorageService,
  SelectionService,
  StorageService,
  LoggerService,
  ViewportCullingService,
} from './services';
import { PluginContext } from './plugin';
import { PlaygroundContribution, PlaygroundRegistry } from './playground-contribution';
import { createDefaultPlaygroundConfig, PlaygroundConfig } from './playground-config';
import { Playground } from './playground';
import {
  type LayerRegistry,
  LayerOptions,
  // PipelineDispatcher,
  PipelineEntitiesSelector,
  PipelineLayerFactory,
  PipelineRegistry,
  PipelineRenderer,
  PlaygroundConfigEntity,
  LazyInjectContext,
} from './core';
import {
  // AbleManager,
  bindConfigEntity,
  bindContributionProvider,
  bindPlaygroundContextProvider,
  EntityManager,
  PlaygroundContainerFactory,
  PlaygroundContext,
  removeInjectedProperties,
} from './common';

export function createPluginContextDefault(container: interfaces.Container): PluginContext {
  return {
    container,
    playground: container.get(Playground),
    get<T>(identifier: interfaces.ServiceIdentifier): T {
      return container.get(identifier) as T;
    },
    getAll<T>(identifier: interfaces.ServiceIdentifier): T[] {
      return container.getAll(identifier) as T[];
    },
  };
}

export function createPlaygroundLayerDefault(
  container: interfaces.Container,
  layerRegistry: LayerRegistry,
  options: any = {}
) {
  const layerContainer = container.createChild();
  layerContainer.bind(layerRegistry).toSelf().inSingletonScope();
  layerContainer.bind(LayerOptions).toConstantValue(options);
  const layerInstance = layerContainer.get(layerRegistry);
  removeInjectedProperties(layerInstance);
  return layerInstance;
}

export const PlaygroundContainerModule = new ContainerModule((bind) => {
  // bind(AbleManager).toSelf().inSingletonScope();
  bind(EntityManager).toSelf().inSingletonScope();
  bind(PipelineRenderer).toSelf().inSingletonScope();
  bind(PlaygroundRegistry).toSelf().inSingletonScope();
  bind(Playground).toSelf().inSingletonScope();
  bind(PipelineEntitiesSelector).toSelf().inSingletonScope();
  bind(PipelineLayerFactory)
    .toDynamicValue(
      (context: interfaces.Context) => (layerRegistry: LayerRegistry, options?: any) =>
        createPlaygroundLayerDefault(context.container, layerRegistry, options)
    )
    .inSingletonScope();
  // bind(PipelineDispatcher).toSelf().inSingletonScope();
  bind(PipelineRegistry).toSelf().inSingletonScope();
  bind(PlaygroundContainerFactory)
    .toDynamicValue((ctx) => ctx.container)
    .inSingletonScope();
  bind(PlaygroundConfig).toConstantValue(createDefaultPlaygroundConfig());
  bind(PlaygroundContext).toConstantValue({});
  bindPlaygroundContextProvider(bind);

  bind(LoggerService).toSelf().inSingletonScope();
  bind(ViewportCullingService).toSelf().inSingletonScope();

  bind(ContextMenuService).toSelf().inSingletonScope();
  bind(SelectionService).toSelf().inSingletonScope();

  // 默认采用 LocalStorageService
  bind(StorageService).to(LocalStorageService).inSingletonScope();
  bind(ClipboardService).to(DefaultClipboardService).inSingletonScope();
  bindConfigEntity(bind, PlaygroundConfigEntity);
  bindContributionProvider(bind, PlaygroundContribution);
  bind(PluginContext)
    .toDynamicValue((ctx) => createPluginContextDefault(ctx.container))
    .inSingletonScope();

  bind(LazyInjectContext).toService(PluginContext);
});

export function createPlaygroundContainer(
  config?: PlaygroundConfig,
  parent?: interfaces.Container,
  container?: interfaces.Container
): interfaces.Container {
  const child = container || new Container({ defaultScope: 'Singleton' });
  if (parent) {
    child.parent = parent;
  }
  child.load(PlaygroundContainerModule);
  if (!child.isBound(CommandService)) {
    child.load(CommandContainerModule);
  }
  if (config) {
    child.rebind(PlaygroundConfig).toConstantValue(config);
    if (config.context) {
      child.rebind(PlaygroundContext).toConstantValue(config.context);
    }
  }
  return child;
}
