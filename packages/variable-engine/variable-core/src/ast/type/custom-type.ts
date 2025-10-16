/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { parseTypeJsonOrKind } from '../utils/helpers';
import { ASTKind, ASTNodeJSONOrKind } from '../types';
import { type UnionJSON } from './union';
import { BaseType } from './base-type';

/**
 * ASTNodeJSON representation of `CustomType`
 */
export interface CustomTypeJSON {
  /**
   * The name of the custom type.
   */
  typeName: string;
}

/**
 * Represents a custom type.
 */
export class CustomType extends BaseType<CustomTypeJSON> {
  static kind: string = ASTKind.CustomType;

  protected _typeName: string;

  /**
   * The name of the custom type.
   */
  get typeName(): string {
    return this._typeName;
  }

  /**
   * Deserializes the `CustomTypeJSON` to the `CustomType`.
   * @param json The `CustomTypeJSON` to deserialize.
   */
  fromJSON(json: CustomTypeJSON): void {
    if (this._typeName !== json.typeName) {
      this._typeName = json.typeName;
      this.fireChange();
    }
  }

  /**
   * Check if the current type is equal to the target type.
   * @param targetTypeJSONOrKind The type to compare with.
   * @returns `true` if the types are equal, `false` otherwise.
   */
  public isTypeEqual(targetTypeJSONOrKind?: ASTNodeJSONOrKind): boolean {
    const targetTypeJSON = parseTypeJsonOrKind(targetTypeJSONOrKind);

    // If it is a Union type, it is sufficient for one of the subtypes to be equal.
    if (targetTypeJSON?.kind === ASTKind.Union) {
      return ((targetTypeJSON as UnionJSON)?.types || [])?.some((_subType) =>
        this.isTypeEqual(_subType)
      );
    }

    return targetTypeJSON?.kind === this.kind && targetTypeJSON?.typeName === this.typeName;
  }
}
