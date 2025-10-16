/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Subject } from 'rxjs';
import { inject, injectable, interfaces, preDestroy } from 'inversify';
import { Disposable, DisposableCollection } from '@flowgram.ai/utils';
import { Emitter } from '@flowgram.ai/utils';

import { subsToDisposable } from './utils/toDisposable';
import { createMemo } from './utils/memo';
import { VariableTable } from './scope/variable-table';
import { ScopeChangeAction } from './scope/types';
import { IScopeConstructor } from './scope/scope';
import { Scope, ScopeChain, type IVariableTable } from './scope';
import { ContainerProvider } from './providers';
import { ASTRegisters, type GlobalEventActionType } from './ast';

/**
 * The core of the variable engine system.
 * It manages scopes, variables, and events within the system.
 */
@injectable()
export class VariableEngine implements Disposable {
  protected toDispose = new DisposableCollection();

  protected memo = createMemo();

  protected scopeMap = new Map<string | symbol, Scope>();

  /**
   * A rxjs subject that emits global events occurring within the variable engine.
   */
  globalEvent$: Subject<GlobalEventActionType> = new Subject<GlobalEventActionType>();

  protected onScopeChangeEmitter = new Emitter<ScopeChangeAction>();

  /**
   * A table containing all global variables.
   */
  public globalVariableTable: IVariableTable = new VariableTable();

  /**
   * An event that fires whenever a scope is added, updated, or deleted.
   */
  public onScopeChange = this.onScopeChangeEmitter.event;

  @inject(ContainerProvider) private readonly containerProvider: ContainerProvider;

  /**
   * The Inversify container instance.
   */
  get container(): interfaces.Container {
    return this.containerProvider();
  }

  constructor(
    /**
     * The scope chain, which manages the dependency relationships between scopes.
     */
    @inject(ScopeChain)
    public readonly chain: ScopeChain,
    /**
     * The registry for all AST node types.
     */
    @inject(ASTRegisters)
    public readonly astRegisters: ASTRegisters
  ) {
    this.toDispose.pushAll([
      chain,
      Disposable.create(() => {
        // Dispose all scopes
        this.getAllScopes().forEach((scope) => scope.dispose());
        this.globalVariableTable.dispose();
      }),
    ]);
  }

  /**
   * Disposes of all resources used by the variable engine.
   */
  @preDestroy()
  dispose(): void {
    this.toDispose.dispose();
  }

  /**
   * Retrieves a scope by its unique identifier.
   * @param scopeId The ID of the scope to retrieve.
   * @returns The scope if found, otherwise undefined.
   */
  getScopeById(scopeId: string | symbol): Scope | undefined {
    return this.scopeMap.get(scopeId);
  }

  /**
   * Removes a scope by its unique identifier and disposes of it.
   * @param scopeId The ID of the scope to remove.
   */
  removeScopeById(scopeId: string | symbol): void {
    this.getScopeById(scopeId)?.dispose();
  }

  /**
   * Creates a new scope or retrieves an existing one if the ID and type match.
   * @param id The unique identifier for the scope.
   * @param meta Optional metadata for the scope, defined by the user.
   * @param options Options for creating the scope.
   * @param options.ScopeConstructor The constructor to use for creating the scope. Defaults to `Scope`.
   * @returns The created or existing scope.
   */
  createScope(
    id: string | symbol,
    meta?: Record<string, any>,
    options: {
      ScopeConstructor?: IScopeConstructor;
    } = {}
  ): Scope {
    const { ScopeConstructor = Scope } = options;

    let scope = this.getScopeById(id);

    if (!scope) {
      scope = new ScopeConstructor({ variableEngine: this, meta, id });
      this.scopeMap.set(id, scope);
      this.onScopeChangeEmitter.fire({ type: 'add', scope: scope! });

      scope.toDispose.pushAll([
        scope.ast.subscribe(() => {
          this.onScopeChangeEmitter.fire({ type: 'update', scope: scope! });
        }),
        // Fires when available variables change
        scope.available.onDataChange(() => {
          this.onScopeChangeEmitter.fire({ type: 'available', scope: scope! });
        }),
      ]);
      scope.onDispose(() => {
        this.scopeMap.delete(id);
        this.onScopeChangeEmitter.fire({ type: 'delete', scope: scope! });
      });
    }

    return scope;
  }

  /**
   * Retrieves all scopes currently managed by the engine.
   * @param options Options for retrieving the scopes.
   * @param options.sort Whether to sort the scopes based on their dependency chain.
   * @returns An array of all scopes.
   */
  getAllScopes({
    sort,
  }: {
    sort?: boolean;
  } = {}): Scope[] {
    const allScopes = Array.from(this.scopeMap.values());

    if (sort) {
      const sortScopes = this.chain.sortAll();
      const remainScopes = new Set(allScopes);
      sortScopes.forEach((_scope) => remainScopes.delete(_scope));

      return [...sortScopes, ...Array.from(remainScopes)];
    }

    return [...allScopes];
  }

  /**
   * Fires a global event to be broadcast to all listeners.
   * @param event The global event to fire.
   */
  fireGlobalEvent(event: GlobalEventActionType) {
    this.globalEvent$.next(event);
  }

  /**
   * Subscribes to a specific type of global event.
   * @param type The type of the event to listen for.
   * @param observer A function to be called when the event is observed.
   * @returns A disposable object to unsubscribe from the event.
   */
  onGlobalEvent<ActionType extends GlobalEventActionType = GlobalEventActionType>(
    type: ActionType['type'],
    observer: (action: ActionType) => void
  ): Disposable {
    return subsToDisposable(
      this.globalEvent$.subscribe((_action) => {
        if (_action.type === type) {
          observer(_action as ActionType);
        }
      })
    );
  }
}
