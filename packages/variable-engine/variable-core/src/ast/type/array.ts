/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { parseTypeJsonOrKind } from '../utils/helpers';
import { ASTKind, ASTNodeJSON, ASTNodeJSONOrKind } from '../types';
import { ASTNodeFlags } from '../flags';
import { type BaseVariableField } from '../declaration';
import { BaseType } from './base-type';

/**
 * ASTNodeJSON representation of `ArrayType`
 */
export interface ArrayJSON {
  /**
   * The type of the items in the array.
   */
  items?: ASTNodeJSONOrKind;
}

/**
 * Represents an array type.
 */
export class ArrayType extends BaseType<ArrayJSON> {
  public flags: ASTNodeFlags = ASTNodeFlags.DrilldownType | ASTNodeFlags.EnumerateType;

  static kind: string = ASTKind.Array;

  /**
   * The type of the items in the array.
   */
  items: BaseType;

  /**
   * Deserializes the `ArrayJSON` to the `ArrayType`.
   * @param json The `ArrayJSON` to deserialize.
   */
  fromJSON({ items }: ArrayJSON): void {
    this.updateChildNodeByKey('items', parseTypeJsonOrKind(items));
  }

  /**
   * Whether the items type can be drilled down.
   */
  get canDrilldownItems(): boolean {
    return !!(this.items?.flags & ASTNodeFlags.DrilldownType);
  }

  /**
   * Get a variable field by key path.
   * @param keyPath The key path to search for.
   * @returns The variable field if found, otherwise `undefined`.
   */
  getByKeyPath(keyPath: string[]): BaseVariableField | undefined {
    const [curr, ...rest] = keyPath || [];

    if (curr === '0' && this.canDrilldownItems) {
      // The first item of the array.
      return this.items.getByKeyPath(rest);
    }

    return undefined;
  }

  /**
   * Check if the current type is equal to the target type.
   * @param targetTypeJSONOrKind The type to compare with.
   * @returns `true` if the types are equal, `false` otherwise.
   */
  public isTypeEqual(targetTypeJSONOrKind?: ASTNodeJSONOrKind): boolean {
    const targetTypeJSON = parseTypeJsonOrKind(targetTypeJSONOrKind);
    const isSuperEqual = super.isTypeEqual(targetTypeJSONOrKind);

    if (targetTypeJSON?.weak || targetTypeJSON?.kind === ASTKind.Union) {
      return isSuperEqual;
    }

    return (
      targetTypeJSON &&
      isSuperEqual &&
      // Weak comparison, only need to compare the Kind.
      (targetTypeJSON?.weak || this.customStrongEqual(targetTypeJSON))
    );
  }

  /**
   * Array strong comparison.
   * @param targetTypeJSON The type to compare with.
   * @returns `true` if the types are equal, `false` otherwise.
   */
  protected customStrongEqual(targetTypeJSON: ASTNodeJSON): boolean {
    if (!this.items) {
      return !(targetTypeJSON as ArrayJSON)?.items;
    }
    return this.items?.isTypeEqual((targetTypeJSON as ArrayJSON).items);
  }

  /**
   * Serialize the `ArrayType` to `ArrayJSON`
   * @returns The JSON representation of `ArrayType`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.Array,
      items: this.items?.toJSON(),
    };
  }
}
