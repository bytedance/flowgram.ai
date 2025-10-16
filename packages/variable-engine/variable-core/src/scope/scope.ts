/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { DisposableCollection } from '@flowgram.ai/utils';

import { type VariableEngine } from '../variable-engine';
import { createMemo } from '../utils/memo';
import { ASTKind, type ASTNode, type ASTNodeJSON, MapNode } from '../ast';
import { ScopeAvailableData, ScopeEventData, ScopeOutputData } from './datas';

/**
 * Interface for the Scope constructor.
 */
export interface IScopeConstructor {
  new (options: {
    id: string | symbol;
    variableEngine: VariableEngine;
    meta?: Record<string, any>;
  }): Scope;
}

/**
 * Represents a variable scope, which manages its own set of variables and their lifecycle.
 * - `scope.output` represents the variables declared within this scope.
 * - `scope.available` represents all variables accessible from this scope, including those from parent scopes.
 */
export class Scope<ScopeMeta extends Record<string, any> = Record<string, any>> {
  /**
   * A unique identifier for the scope.
   */
  readonly id: string | symbol;

  /**
   * The variable engine instance this scope belongs to.
   */
  readonly variableEngine: VariableEngine;

  /**
   * Metadata associated with the scope, which can be extended by higher-level business logic.
   */
  readonly meta: ScopeMeta;

  /**
   * The root AST node for this scope, which is a MapNode.
   * It stores various data related to the scope, such as `outputs`.
   */
  readonly ast: MapNode;

  /**
   * Manages the available variables for this scope.
   */
  readonly available: ScopeAvailableData;

  /**
   * Manages the output variables for this scope.
   */
  readonly output: ScopeOutputData;

  /**
   * Manages event dispatching and handling for this scope.
   */
  readonly event: ScopeEventData;

  /**
   * A memoization utility for caching computed values.
   */
  protected memo = createMemo();

  public toDispose: DisposableCollection = new DisposableCollection();

  constructor(options: { id: string | symbol; variableEngine: VariableEngine; meta?: ScopeMeta }) {
    this.id = options.id;
    this.meta = options.meta || ({} as any);
    this.variableEngine = options.variableEngine;

    this.event = new ScopeEventData(this);

    this.ast = this.variableEngine.astRegisters.createAST(
      {
        kind: ASTKind.MapNode,
        key: String(this.id),
      },
      {
        scope: this,
      }
    ) as MapNode;

    this.output = new ScopeOutputData(this);
    this.available = new ScopeAvailableData(this);
  }

  /**
   * Refreshes the covering scopes.
   */
  refreshCovers(): void {
    this.memo.clear('covers');
  }

  /**
   * Refreshes the dependency scopes and the available variables.
   */
  refreshDeps(): void {
    this.memo.clear('deps');
    this.available.refresh();
  }

  /**
   * Gets the scopes that this scope depends on.
   */
  get depScopes(): Scope[] {
    return this.memo('deps', () =>
      this.variableEngine.chain
        .getDeps(this)
        .filter((_scope) => Boolean(_scope) && !_scope?.disposed)
    );
  }

  /**
   * Gets the scopes that are covered by this scope.
   */
  get coverScopes(): Scope[] {
    return this.memo('covers', () =>
      this.variableEngine.chain
        .getCovers(this)
        .filter((_scope) => Boolean(_scope) && !_scope?.disposed)
    );
  }

  /**
   * Disposes of the scope and its resources.
   * This will also trigger updates in dependent and covering scopes.
   */
  dispose(): void {
    this.ast.dispose();
    this.toDispose.dispose();

    // When a scope is disposed, update its dependent and covering scopes.
    this.coverScopes.forEach((_scope) => _scope.refreshDeps());
    this.depScopes.forEach((_scope) => _scope.refreshCovers());
  }

  onDispose = this.toDispose.onDispose;

  get disposed(): boolean {
    return this.toDispose.disposed;
  }

  /**
   * Sets a variable in the scope with the default key 'outputs'.
   *
   * @param json The JSON representation of the AST node to set.
   * @returns The created or updated AST node.
   */
  public setVar<Node extends ASTNode = ASTNode>(json: ASTNodeJSON): Node;

  /**
   * Sets a variable in the scope with a specified key.
   *
   * @param key The key of the variable to set.
   * @param json The JSON representation of the AST node to set.
   * @returns The created or updated AST node.
   */
  public setVar<Node extends ASTNode = ASTNode>(key: string, json: ASTNodeJSON): Node;

  public setVar<Node extends ASTNode = ASTNode>(
    arg1: string | ASTNodeJSON,
    arg2?: ASTNodeJSON
  ): Node {
    if (typeof arg1 === 'string' && arg2 !== undefined) {
      return this.ast.set(arg1, arg2);
    }

    if (typeof arg1 === 'object' && arg2 === undefined) {
      return this.ast.set('outputs', arg1);
    }

    throw new Error('Invalid arguments');
  }

  /**
   * Retrieves a variable from the scope by its key.
   *
   * @param key The key of the variable to retrieve. Defaults to 'outputs'.
   * @returns The AST node for the variable, or `undefined` if not found.
   */
  public getVar<Node extends ASTNode = ASTNode>(key: string = 'outputs') {
    return this.ast.get<Node>(key);
  }

  /**
   * Clears a variable from the scope by its key.
   *
   * @param key The key of the variable to clear. Defaults to 'outputs'.
   */
  public clearVar(key: string = 'outputs') {
    return this.ast.remove(key);
  }
}
