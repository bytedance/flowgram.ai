/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Observable, Subject, merge, share, skip, switchMap } from 'rxjs';
import { DisposableCollection, Emitter } from '@flowgram.ai/utils';

import { subsToDisposable } from '../utils/toDisposable';
import { BaseVariableField } from '../ast/declaration/base-variable-field';
import { VariableDeclaration } from '../ast';
import { IVariableTable } from './types';

/**
 * A class that stores and manages variables in a table-like structure.
 * It provides methods for adding, removing, and retrieving variables, as well as
 * observables for listening to changes in the variable list and individual variables.
 */
export class VariableTable implements IVariableTable {
  protected table: Map<string, VariableDeclaration> = new Map();

  toDispose = new DisposableCollection();

  /**
   * @deprecated
   */
  protected onDataChangeEmitter = new Emitter<void>();

  protected variables$: Subject<VariableDeclaration[]> = new Subject<VariableDeclaration[]>();

  /**
   * An observable that listens for value changes on any variable within the table.
   */
  protected anyVariableChange$: Observable<VariableDeclaration> = this.variables$.pipe(
    switchMap((_variables) =>
      merge(
        ..._variables.map((_v) =>
          _v.value$.pipe<any>(
            // Skip the initial value of the BehaviorSubject
            skip(1)
          )
        )
      )
    ),
    share()
  );

  /**
   * Subscribes to updates on any variable in the list.
   * @param observer A function to be called when any variable's value changes.
   * @returns A disposable object to unsubscribe from the updates.
   */
  onAnyVariableChange(observer: (changedVariable: VariableDeclaration) => void) {
    return subsToDisposable(this.anyVariableChange$.subscribe(observer));
  }

  /**
   * Subscribes to changes in the variable list (additions or removals).
   * @param observer A function to be called when the list of variables changes.
   * @returns A disposable object to unsubscribe from the updates.
   */
  onVariableListChange(observer: (variables: VariableDeclaration[]) => void) {
    return subsToDisposable(this.variables$.subscribe(observer));
  }

  /**
   * Subscribes to both variable list changes and updates to any variable in the list.
   * @param observer A function to be called when either the list or a variable in it changes.
   * @returns A disposable collection to unsubscribe from both events.
   */
  onListOrAnyVarChange(observer: () => void) {
    const disposables = new DisposableCollection();
    disposables.pushAll([this.onVariableListChange(observer), this.onAnyVariableChange(observer)]);
    return disposables;
  }

  /**
   * @deprecated Use onListOrAnyVarChange instead.
   */
  public onDataChange = this.onDataChangeEmitter.event;

  protected _version: number = 0;

  /**
   * Fires change events to notify listeners that the data has been updated.
   */
  fireChange() {
    this.bumpVersion();
    this.onDataChangeEmitter.fire();
    this.variables$.next(this.variables);
    this.parentTable?.fireChange();
  }

  /**
   * The current version of the variable table, incremented on each change.
   */
  get version(): number {
    return this._version;
  }

  /**
   * Increments the version number, resetting to 0 if it reaches MAX_SAFE_INTEGER.
   */
  protected bumpVersion() {
    this._version = this._version + 1;
    if (this._version === Number.MAX_SAFE_INTEGER) {
      this._version = 0;
    }
  }

  constructor(
    /**
     * An optional parent table. If provided, this table will contain all variables
     * from the current table.
     */
    public parentTable?: IVariableTable
  ) {
    this.toDispose.pushAll([
      this.onDataChangeEmitter,
      // Activate the share() operator
      this.onAnyVariableChange(() => {
        this.bumpVersion();
      }),
    ]);
  }

  /**
   * An array of all variables in the table.
   */
  get variables(): VariableDeclaration[] {
    return Array.from(this.table.values());
  }

  /**
   * An array of all variable keys in the table.
   */
  get variableKeys(): string[] {
    return Array.from(this.table.keys());
  }

  /**
   * Retrieves a variable or a nested property field by its key path.
   * @param keyPath An array of keys representing the path to the desired field.
   * @returns The found variable or property field, or undefined if not found.
   */
  getByKeyPath(keyPath: string[]): BaseVariableField | undefined {
    const [variableKey, ...propertyKeys] = keyPath || [];

    if (!variableKey) {
      return;
    }

    const variable = this.getVariableByKey(variableKey);

    return propertyKeys.length ? variable?.getByKeyPath(propertyKeys) : variable;
  }

  /**
   * Retrieves a variable by its key.
   * @param key The key of the variable to retrieve.
   * @returns The variable declaration if found, otherwise undefined.
   */
  getVariableByKey(key: string) {
    return this.table.get(key);
  }

  /**
   * Adds a variable to the table.
   * If a parent table exists, the variable is also added to the parent.
   * @param variable The variable declaration to add.
   */
  addVariableToTable(variable: VariableDeclaration) {
    this.table.set(variable.key, variable);
    if (this.parentTable) {
      (this.parentTable as VariableTable).addVariableToTable(variable);
    }
  }

  /**
   * Removes a variable from the table.
   * If a parent table exists, the variable is also removed from the parent.
   * @param key The key of the variable to remove.
   */
  removeVariableFromTable(key: string) {
    this.table.delete(key);
    if (this.parentTable) {
      (this.parentTable as VariableTable).removeVariableFromTable(key);
    }
  }

  /**
   * Disposes of all resources used by the variable table.
   */
  dispose(): void {
    this.variableKeys.forEach((_key) =>
      (this.parentTable as VariableTable)?.removeVariableFromTable(_key)
    );
    this.parentTable?.fireChange();
    this.variables$.complete();
    this.variables$.unsubscribe();
    this.toDispose.dispose();
  }
}
