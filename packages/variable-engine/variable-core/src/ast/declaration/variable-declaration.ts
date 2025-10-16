/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind, GlobalEventActionType, type CreateASTParams } from '../types';
import { BaseVariableField, BaseVariableFieldJSON } from './base-variable-field';

/**
 * ASTNodeJSON representation of the `VariableDeclaration`.
 */
export type VariableDeclarationJSON<VariableMeta = any> = BaseVariableFieldJSON<VariableMeta> & {
  /**
   * Variable sorting order, which is used to sort variables in `scope.outputs.variables`
   */
  order?: number;
};

/**
 * Action type for re-sorting variable declarations.
 */
export type ReSortVariableDeclarationsAction = GlobalEventActionType<'ReSortVariableDeclarations'>;

/**
 * `VariableDeclaration` is a variable field that represents a variable declaration.
 */
export class VariableDeclaration<VariableMeta = any> extends BaseVariableField<VariableMeta> {
  static kind: string = ASTKind.VariableDeclaration;

  protected _order: number = 0;

  /**
   * Variable sorting order, which is used to sort variables in `scope.outputs.variables`
   */
  get order(): number {
    return this._order;
  }

  constructor(params: CreateASTParams) {
    super(params);
  }

  /**
   * Deserialize the `VariableDeclarationJSON` to the `VariableDeclaration`.
   */
  fromJSON({ order, ...rest }: VariableDeclarationJSON<VariableMeta>): void {
    // Update order.
    this.updateOrder(order);

    // Update other information.
    super.fromJSON(rest as BaseVariableFieldJSON<VariableMeta>);
  }

  /**
   * Update the sorting order of the variable declaration.
   * @param order Variable sorting order. Default is 0.
   */
  updateOrder(order: number = 0): void {
    if (order !== this._order) {
      this._order = order;
      this.dispatchGlobalEvent<ReSortVariableDeclarationsAction>({
        type: 'ReSortVariableDeclarations',
      });
      this.fireChange();
    }
  }
}
