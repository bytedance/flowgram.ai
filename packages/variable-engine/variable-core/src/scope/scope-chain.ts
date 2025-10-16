/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable } from 'inversify';
import { DisposableCollection, type Event } from '@flowgram.ai/utils';

import { VariableEngineProvider } from '../providers';
import { type Scope } from './scope';

/**
 * Manages the dependency relationships between scopes.
 * This is an abstract class, and specific implementations determine how the scope order is managed.
 */
@injectable()
export abstract class ScopeChain {
  readonly toDispose: DisposableCollection = new DisposableCollection();

  @inject(VariableEngineProvider) variableEngineProvider: VariableEngineProvider;

  get variableEngine() {
    return this.variableEngineProvider();
  }

  constructor() {}

  /**
   * Refreshes the dependency and coverage relationships for all scopes.
   */
  refreshAllChange(): void {
    this.variableEngine.getAllScopes().forEach((_scope) => {
      _scope.refreshCovers();
      _scope.refreshDeps();
    });
  }

  /**
   * Gets the dependency scopes for a given scope.
   * @param scope The scope to get dependencies for.
   * @returns An array of dependency scopes.
   */
  abstract getDeps(scope: Scope): Scope[];

  /**
   * Gets the covering scopes for a given scope.
   * @param scope The scope to get covers for.
   * @returns An array of covering scopes.
   */
  abstract getCovers(scope: Scope): Scope[];

  /**
   * Sorts all scopes based on their dependency relationships.
   * @returns A sorted array of all scopes.
   */
  abstract sortAll(): Scope[];

  dispose(): void {
    this.toDispose.dispose();
  }

  get disposed(): boolean {
    return this.toDispose.disposed;
  }

  get onDispose(): Event<void> {
    return this.toDispose.onDispose;
  }
}
