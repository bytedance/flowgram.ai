/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { postConstructAST } from '../utils/inversify';
import { ASTKind, ASTNodeJSON } from '../types';
import { BaseType } from '../type';
import { BaseExpression } from './base-expression';

/**
 * ASTNodeJSON representation of `WrapArrayExpression`
 */
export interface WrapArrayExpressionJSON {
  /**
   * The expression to be wrapped.
   */
  wrapFor: ASTNodeJSON;
}

/**
 * Represents a wrap expression, which wraps an expression with an array.
 */
export class WrapArrayExpression extends BaseExpression<WrapArrayExpressionJSON> {
  static kind: string = ASTKind.WrapArrayExpression;

  protected _wrapFor: BaseExpression | undefined;

  protected _returnType: BaseType | undefined;

  /**
   * The expression to be wrapped.
   */
  get wrapFor() {
    return this._wrapFor;
  }

  /**
   * The return type of the expression.
   */
  get returnType(): BaseType | undefined {
    return this._returnType;
  }

  /**
   * Refresh the return type of the expression.
   */
  refreshReturnType() {
    // The return value of the wrapped expression.
    const childReturnTypeJSON = this.wrapFor?.returnType?.toJSON();

    this.updateChildNodeByKey('_returnType', {
      kind: ASTKind.Array,
      items: childReturnTypeJSON,
    });
  }

  /**
   * Get the variable fields referenced by the expression.
   * @returns An empty array, as this expression does not reference any variables.
   */
  getRefFields(): [] {
    return [];
  }

  /**
   * Deserializes the `WrapArrayExpressionJSON` to the `WrapArrayExpression`.
   * @param json The `WrapArrayExpressionJSON` to deserialize.
   */
  fromJSON({ wrapFor: expression }: WrapArrayExpressionJSON): void {
    this.updateChildNodeByKey('_wrapFor', expression);
  }

  /**
   * Serialize the `WrapArrayExpression` to `WrapArrayExpressionJSON`.
   * @returns The JSON representation of `WrapArrayExpression`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.WrapArrayExpression,
      wrapFor: this.wrapFor?.toJSON(),
    };
  }

  @postConstructAST()
  protected init() {
    this.refreshReturnType = this.refreshReturnType.bind(this);

    this.toDispose.push(
      this.subscribe(this.refreshReturnType, {
        selector: (curr) => curr.wrapFor?.returnType,
        triggerOnInit: true,
      })
    );
  }
}
