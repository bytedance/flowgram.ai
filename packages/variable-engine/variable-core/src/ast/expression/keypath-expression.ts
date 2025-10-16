/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { shallowEqual } from 'fast-equals';

import { checkRefCycle } from '../utils/expression';
import { ASTNodeJSON, ASTKind, CreateASTParams } from '../types';
import { BaseType } from '../type';
import { type BaseVariableField } from '../declaration';
import { subsToDisposable } from '../../utils/toDisposable';
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
 * Represents a key path expression, which is used to reference a variable by its key path.
 *
 * This is the V2 of `KeyPathExpression`, with the following improvements:
 * - `returnType` is copied to a new instance to avoid reference issues.
 * - Circular reference detection is introduced.
 */
export class KeyPathExpression<
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

    // When refreshing references, check for circular references. If a circular reference exists, do not reference the variable.
    if (checkRefCycle(this, [ref])) {
      // Prompt that a circular reference exists.
      console.warn(
        '[CustomKeyPathExpression] checkRefCycle: Reference Cycle Existed',
        this.parentFields.map((_field) => _field.key).reverse()
      );
      return [];
    }

    return ref ? [ref] : [];
  }

  /**
   * The return type of the expression.
   *
   * A new `returnType` node is generated directly, instead of reusing the existing one, to ensure that different key paths do not point to the same field.
   */
  _returnType: BaseType;

  /**
   * The return type of the expression.
   */
  get returnType() {
    return this._returnType;
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

  /**
   * Get the return type JSON by reference.
   * @param _ref The referenced variable field.
   * @returns The JSON representation of the return type.
   */
  getReturnTypeJSONByRef(_ref: BaseVariableField | undefined): ASTNodeJSON | undefined {
    return _ref?.type?.toJSON();
  }

  protected prevRefTypeHash: string | undefined;

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
      subsToDisposable(
        this.refs$.subscribe((_type) => {
          const [ref] = this._refs;

          if (this.prevRefTypeHash !== ref?.type?.hash) {
            this.prevRefTypeHash = ref?.type?.hash;
            this.updateChildNodeByKey('_returnType', this.getReturnTypeJSONByRef(ref));
          }
        })
      ),
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
