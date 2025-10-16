/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { VariableTable } from '../variable-table';
import { IVariableTable } from '../types';
import { type Scope } from '../scope';
import { type VariableEngine } from '../../variable-engine';
import { createMemo } from '../../utils/memo';
import { NewASTAction } from '../../ast/types';
import { DisposeASTAction } from '../../ast/types';
import { ReSortVariableDeclarationsAction } from '../../ast/declaration/variable-declaration';
import { ASTKind, type VariableDeclaration } from '../../ast';

/**
 * Manages the output variables of a scope.
 */
export class ScopeOutputData {
  protected variableTable: IVariableTable;

  protected memo = createMemo();

  /**
   * The variable engine instance.
   */
  get variableEngine(): VariableEngine {
    return this.scope.variableEngine;
  }

  /**
   * The global variable table from the variable engine.
   */
  get globalVariableTable(): IVariableTable {
    return this.scope.variableEngine.globalVariableTable;
  }

  /**
   * The current version of the output data, which increments on each change.
   */
  get version() {
    return this.variableTable.version;
  }

  /**
   * @deprecated use onListOrAnyVarChange instead
   */
  get onDataChange() {
    return this.variableTable.onDataChange.bind(this.variableTable);
  }

  /**
   * An event that fires when the list of output variables changes.
   */
  get onVariableListChange() {
    return this.variableTable.onVariableListChange.bind(this.variableTable);
  }

  /**
   * An event that fires when any output variable's value changes.
   */
  get onAnyVariableChange() {
    return this.variableTable.onAnyVariableChange.bind(this.variableTable);
  }

  /**
   * An event that fires when the output variable list changes or any variable's value is updated.
   */
  get onListOrAnyVarChange() {
    return this.variableTable.onListOrAnyVarChange.bind(this.variableTable);
  }

  protected _hasChanges = false;

  constructor(public readonly scope: Scope) {
    // Setup scope variable table based on globalVariableTable
    this.variableTable = new VariableTable(scope.variableEngine.globalVariableTable);

    this.scope.toDispose.pushAll([
      // When the root AST node is updated, check if there are any changes.
      this.scope.ast.subscribe(() => {
        if (this._hasChanges) {
          this.memo.clear();
          this.notifyCoversChange();
          this.variableTable.fireChange();
          this._hasChanges = false;
        }
      }),
      this.scope.event.on<DisposeASTAction>('DisposeAST', (_action) => {
        if (_action.ast?.kind === ASTKind.VariableDeclaration) {
          this.removeVariableFromTable(_action.ast.key);
        }
      }),
      this.scope.event.on<NewASTAction>('NewAST', (_action) => {
        if (_action.ast?.kind === ASTKind.VariableDeclaration) {
          this.addVariableToTable(_action.ast as VariableDeclaration);
        }
      }),
      this.scope.event.on<ReSortVariableDeclarationsAction>('ReSortVariableDeclarations', () => {
        this._hasChanges = true;
      }),
      this.variableTable,
    ]);
  }

  /**
   * The output variable declarations of the scope, sorted by order.
   */
  get variables(): VariableDeclaration[] {
    return this.memo('variables', () =>
      this.variableTable.variables.sort((a, b) => a.order - b.order)
    );
  }

  /**
   * The keys of the output variables.
   */
  get variableKeys(): string[] {
    return this.memo('variableKeys', () => this.variableTable.variableKeys);
  }

  protected addVariableToTable(variable: VariableDeclaration) {
    if (variable.scope !== this.scope) {
      throw Error('VariableDeclaration must be a ast node in scope');
    }

    (this.variableTable as VariableTable).addVariableToTable(variable);
    this._hasChanges = true;
  }

  protected removeVariableFromTable(key: string) {
    (this.variableTable as VariableTable).removeVariableFromTable(key);
    this._hasChanges = true;
  }

  /**
   * Retrieves a variable declaration by its key.
   * @param key The key of the variable.
   * @returns The `VariableDeclaration` or `undefined` if not found.
   */
  getVariableByKey(key: string) {
    return this.variableTable.getVariableByKey(key);
  }

  /**
   * Notifies the covering scopes that the available variables have changed.
   */
  notifyCoversChange(): void {
    this.scope.coverScopes.forEach((scope) => scope.available.refresh());
  }
}
