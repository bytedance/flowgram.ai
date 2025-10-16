/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { shallowEqual } from 'fast-equals';

import { getParentFields } from '../utils/variable-field';
import { ASTNodeJSON, ASTNodeJSONOrKind, Identifier } from '../types';
import { type BaseType } from '../type';
import { ASTNodeFlags } from '../flags';
import { type BaseExpression } from '../expression';
import { ASTNode } from '../ast-node';

/**
 * ASTNodeJSON representation of `BaseVariableField`
 */
export type BaseVariableFieldJSON<VariableMeta = any> = {
  /**
   * key of the variable field
   * - For `VariableDeclaration`, the key should be global unique.
   * - For `Property`, the key is the property name.
   */
  key?: Identifier;
  /**
   * type of the variable field, similar to js code:
   * `const v: string`
   */
  type?: ASTNodeJSONOrKind;
  /**
   * initializer of the variable field, similar to js code:
   * `const v = 'hello'`
   *
   * with initializer, the type of field will be inferred from the initializer.
   */
  initializer?: ASTNodeJSON;
  /**
   * meta data of the variable field, you cans store information like `title`, `icon`, etc.
   */
  meta?: VariableMeta;
};

/**
 * Variable Field abstract class, which is the base class for `VariableDeclaration` and `Property`
 *
 * - `VariableDeclaration` is used to declare a variable in a block scope.
 * - `Property` is used to declare a property in an object.
 */
export abstract class BaseVariableField<VariableMeta = any> extends ASTNode<
  BaseVariableFieldJSON<VariableMeta>
> {
  public flags: ASTNodeFlags = ASTNodeFlags.VariableField;

  protected _type?: BaseType;

  protected _meta: VariableMeta = {} as any;

  protected _initializer?: BaseExpression;

  /**
   * Parent variable fields, sorted from closest to farthest
   */
  get parentFields(): BaseVariableField[] {
    return getParentFields(this);
  }

  /**
   * KeyPath of the variable field, sorted from farthest to closest
   */
  get keyPath(): string[] {
    return [...this.parentFields.reverse().map((_field) => _field.key), this.key];
  }

  /**
   * Metadata of the variable field, you cans store information like `title`, `icon`, etc.
   */
  get meta(): VariableMeta {
    return this._meta;
  }

  /**
   * Type of the variable field, similar to js code:
   * `const v: string`
   */
  get type(): BaseType {
    return (this._initializer?.returnType || this._type)!;
  }

  /**
   * Initializer of the variable field, similar to js code:
   * `const v = 'hello'`
   *
   * with initializer, the type of field will be inferred from the initializer.
   */
  get initializer(): BaseExpression | undefined {
    return this._initializer;
  }

  /**
   * The global unique hash of the field, and will be changed when the field is updated.
   */
  get hash(): string {
    return `[${this._version}]${this.keyPath.join('.')}`;
  }

  /**
   * Deserialize the `BaseVariableFieldJSON` to the `BaseVariableField`.
   * @param json ASTJSON representation of `BaseVariableField`
   */
  fromJSON({ type, initializer, meta }: BaseVariableFieldJSON<VariableMeta>): void {
    // 类型变化
    this.updateType(type);

    // 表达式更新
    this.updateInitializer(initializer);

    // Extra 更新
    this.updateMeta(meta!);
  }

  /**
   * Update the type of the variable field
   * @param type type ASTJSON representation of Type
   */
  updateType(type: BaseVariableFieldJSON['type']) {
    const nextTypeJson = typeof type === 'string' ? { kind: type } : type;
    this.updateChildNodeByKey('_type', nextTypeJson);
  }

  /**
   * Update the initializer of the variable field
   * @param nextInitializer initializer ASTJSON representation of Expression
   */
  updateInitializer(nextInitializer?: BaseVariableFieldJSON['initializer']) {
    this.updateChildNodeByKey('_initializer', nextInitializer);
  }

  /**
   * Update the meta data of the variable field
   * @param nextMeta meta data of the variable field
   */
  updateMeta(nextMeta: VariableMeta) {
    if (!shallowEqual(nextMeta, this._meta)) {
      this._meta = nextMeta;
      this.fireChange();
    }
  }

  /**
   * Get the variable field by keyPath, similar to js code:
   * `v.a.b`
   * @param keyPath
   * @returns
   */
  getByKeyPath(keyPath: string[]): BaseVariableField | undefined {
    if (this.type?.flags & ASTNodeFlags.DrilldownType) {
      return this.type.getByKeyPath(keyPath) as BaseVariableField | undefined;
    }

    return undefined;
  }

  /**
   * Subscribe to type change of the variable field
   * @param observer
   * @returns
   */
  onTypeChange(observer: (type: ASTNode | undefined) => void) {
    return this.subscribe(observer, { selector: (curr) => curr.type });
  }

  /**
   * Serialize the variable field to JSON
   * @returns ASTNodeJSON representation of `BaseVariableField`
   */
  toJSON(): BaseVariableFieldJSON<VariableMeta> & { kind: string } {
    return {
      kind: this.kind,
      key: this.key,
      type: this.type?.toJSON(),
      initializer: this.initializer?.toJSON(),
      meta: this._meta,
    };
  }
}
