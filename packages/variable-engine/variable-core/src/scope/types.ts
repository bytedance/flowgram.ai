/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Event, Disposable } from '@flowgram.ai/utils';

import { BaseVariableField, VariableDeclaration } from '../ast';
import { type Scope } from './scope';

/**
 * Parameters for getting all scopes.
 */
export interface GetAllScopeParams {
  /**
   * Whether to sort the scopes.
   */
  sort?: boolean;
}

/**
 * Action type for scope changes.
 */
export interface ScopeChangeAction {
  type: 'add' | 'delete' | 'update' | 'available';
  scope: Scope;
}

/**
 * Interface for a variable table.
 */
export interface IVariableTable extends Disposable {
  /**
   * The parent variable table.
   */
  parentTable?: IVariableTable;

  /**
   * @deprecated Use `onVariableListChange` or `onAnyVariableChange` instead.
   */
  onDataChange: Event<void>;

  /**
   * The current version of the variable table.
   */
  version: number;

  /**
   * The list of variables in the table.
   */
  variables: VariableDeclaration[];

  /**
   * The keys of the variables in the table.
   */
  variableKeys: string[];

  /**
   * Fires a change event.
   */
  fireChange(): void;

  /**
   * Gets a variable or property by its key path.
   * @param keyPath The key path to the variable or property.
   * @returns The found `BaseVariableField` or `undefined`.
   */
  getByKeyPath(keyPath: string[]): BaseVariableField | undefined;

  /**
   * Gets a variable by its key.
   * @param key The key of the variable.
   * @returns The found `VariableDeclaration` or `undefined`.
   */
  getVariableByKey(key: string): VariableDeclaration | undefined;

  /**
   * Disposes the variable table.
   */
  dispose(): void;

  /**
   * Subscribes to changes in the variable list.
   * @param observer The observer function.
   * @returns A disposable to unsubscribe.
   */
  onVariableListChange(observer: (variables: VariableDeclaration[]) => void): Disposable;

  /**
   * Subscribes to changes in any variable's value.
   * @param observer The observer function.
   * @returns A disposable to unsubscribe.
   */
  onAnyVariableChange(observer: (changedVariable: VariableDeclaration) => void): Disposable;

  /**
   * Subscribes to both variable list changes and any variable's value changes.
   * @param observer The observer function.
   * @returns A disposable to unsubscribe.
   */
  onListOrAnyVarChange(observer: () => void): Disposable;
}
