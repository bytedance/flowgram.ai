/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind, ASTNodeJSON } from '../types';
import { ArrayType } from '../type/array';
import { BaseType } from '../type';
import { BaseExpression } from './base-expression';

/**
 * ASTNodeJSON representation of `EnumerateExpression`
 */
export interface EnumerateExpressionJSON {
  /**
   * The expression to be enumerated.
   */
  enumerateFor: ASTNodeJSON;
}

/**
 * Represents an enumeration expression, which iterates over a list and returns the type of the enumerated variable.
 */
export class EnumerateExpression extends BaseExpression<EnumerateExpressionJSON> {
  static kind: string = ASTKind.EnumerateExpression;

  protected _enumerateFor: BaseExpression | undefined;

  /**
   * The expression to be enumerated.
   */
  get enumerateFor() {
    return this._enumerateFor;
  }

  /**
   * The return type of the expression.
   */
  get returnType(): BaseType | undefined {
    // The return value of the enumerated expression.
    const childReturnType = this.enumerateFor?.returnType;

    if (childReturnType?.kind === ASTKind.Array) {
      // Get the item type of the array.
      return (childReturnType as ArrayType).items;
    }

    return undefined;
  }

  /**
   * Get the variable fields referenced by the expression.
   * @returns An empty array, as this expression does not reference any variables.
   */
  getRefFields(): [] {
    return [];
  }

  /**
   * Deserializes the `EnumerateExpressionJSON` to the `EnumerateExpression`.
   * @param json The `EnumerateExpressionJSON` to deserialize.
   */
  fromJSON({ enumerateFor: expression }: EnumerateExpressionJSON): void {
    this.updateChildNodeByKey('_enumerateFor', expression);
  }

  /**
   * Serialize the `EnumerateExpression` to `EnumerateExpressionJSON`.
   * @returns The JSON representation of `EnumerateExpression`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.EnumerateExpression,
      enumerateFor: this.enumerateFor?.toJSON(),
    };
  }
}
