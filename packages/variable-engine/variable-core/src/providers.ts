/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { interfaces } from 'inversify';

import { type VariableEngine } from './variable-engine';

/**
 * A provider for dynamically obtaining the `VariableEngine` instance.
 * This is used to prevent circular dependencies when injecting `VariableEngine`.
 */
export const VariableEngineProvider = Symbol('DynamicVariableEngine');
export type VariableEngineProvider = () => VariableEngine;

/**
 * A provider for obtaining the Inversify container instance.
 * This allows other parts of the application, like AST nodes, to access the container for dependency injection.
 */
export const ContainerProvider = Symbol('ContainerProvider');
export type ContainerProvider = () => interfaces.Container;
