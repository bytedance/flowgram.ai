/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { shallowEqual } from 'fast-equals';

import { ASTNodeJSON, ASTKind, CreateASTParams } from '../types';
import { BaseType } from '../type';
import { ASTNodeFlags } from '../flags';
import { type BaseVariableField } from '../declaration';
import { BaseExpression } from './base-expression';

/**
 * ASTNodeJSON representation of `KeyPathExpression`
 */
export interface KeyPathExpressionJSON {
  /**
   * The key path of the variable.
   */
  keyPath: string[];
}

/**
 * @deprecated Use `KeyPathExpression` instead.
 * Represents a key path expression, which is used to reference a variable by its key path.
 */
export class LegacyKeyPathExpression<
  CustomPathJSON extends ASTNodeJSON = KeyPathExpressionJSON
> extends BaseExpression<CustomPathJSON> {
  static kind: string = ASTKind.KeyPathExpression;

  protected _keyPath: string[] = [];

  /**
   * The key path of the variable.
   */
  get keyPath(): string[] {
    return this._keyPath;
  }

  /**
   * Get the variable fields referenced by the expression.
   * @returns An array of referenced variable fields.
   */
  getRefFields(): BaseVariableField[] {
    const ref = this.scope.available.getByKeyPath(this._keyPath);
    return ref ? [ref] : [];
  }

  /**
   * The return type of the expression.
   */
  get returnType(): BaseType | undefined {
    const [refNode] = this._refs || [];

    // Get the type of the referenced variable.
    if (refNode && refNode.flags & ASTNodeFlags.VariableField) {
      return refNode.type;
    }

    return;
  }

  /**
   * Parse the business-defined path expression into a key path.
   *
   * Businesses can quickly customize their own path expressions by modifying this method.
   * @param json The path expression defined by the business.
   * @returns The key path.
   */
  protected parseToKeyPath(json: CustomPathJSON): string[] {
    // The default JSON is in KeyPathExpressionJSON format.
    return (json as unknown as KeyPathExpressionJSON).keyPath;
  }

  /**
   * Deserializes the `KeyPathExpressionJSON` to the `KeyPathExpression`.
   * @param json The `KeyPathExpressionJSON` to deserialize.
   */
  fromJSON(json: CustomPathJSON): void {
    const keyPath = this.parseToKeyPath(json);

    if (!shallowEqual(keyPath, this._keyPath)) {
      this._keyPath = keyPath;

      // After the keyPath is updated, the referenced variables need to be refreshed.
      this.refreshRefs();
    }
  }

  constructor(params: CreateASTParams, opts: any) {
    super(params, opts);

    this.toDispose.pushAll([
      // Can be used when the variable list changes (when there are additions or deletions).
      this.scope.available.onVariableListChange(() => {
        this.refreshRefs();
      }),
      // When the referable variable pointed to by this._keyPath changes, refresh the reference data.
      this.scope.available.onAnyVariableChange((_v) => {
        if (_v.key === this._keyPath[0]) {
          this.refreshRefs();
        }
      }),
    ]);
  }

  /**
   * Serialize the `KeyPathExpression` to `KeyPathExpressionJSON`.
   * @returns The JSON representation of `KeyPathExpression`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.KeyPathExpression,
      keyPath: this._keyPath,
    };
  }
}
