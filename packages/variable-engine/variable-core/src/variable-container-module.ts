/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ContainerModule } from 'inversify';

import { VariableEngine } from './variable-engine';
import { VariableFieldKeyRenameService } from './services';
import { ContainerProvider, VariableEngineProvider } from './providers';
import { ASTRegisters } from './ast';

/**
 * An InversifyJS container module that binds all the necessary services for the variable engine.
 * This module sets up the dependency injection for the core components of the variable engine.
 */
export const VariableContainerModule = new ContainerModule((bind) => {
  bind(VariableEngine).toSelf().inSingletonScope();
  bind(ASTRegisters).toSelf().inSingletonScope();

  bind(VariableFieldKeyRenameService).toSelf().inSingletonScope();

  // Provide a dynamic provider for VariableEngine to prevent circular dependencies.
  bind(VariableEngineProvider).toDynamicValue((ctx) => () => ctx.container.get(VariableEngine));

  // Provide a ContainerProvider to allow AST nodes and other components to access the container.
  bind(ContainerProvider).toDynamicValue((ctx) => () => ctx.container);
});
