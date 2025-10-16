/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { parseTypeJsonOrKind } from '../utils/helpers';
import { ASTKind, ASTNodeJSON, ASTNodeJSONOrKind } from '../types';
import { BaseType } from './base-type';

/**
 * ASTNodeJSON representation of `MapType`
 */
export interface MapJSON {
  /**
   * The type of the keys in the map.
   */
  keyType?: ASTNodeJSONOrKind;
  /**
   * The type of the values in the map.
   */
  valueType?: ASTNodeJSONOrKind;
}

/**
 * Represents a map type.
 */
export class MapType extends BaseType<MapJSON> {
  static kind: string = ASTKind.Map;

  /**
   * The type of the keys in the map.
   */
  keyType: BaseType;

  /**
   * The type of the values in the map.
   */
  valueType: BaseType;

  /**
   * Deserializes the `MapJSON` to the `MapType`.
   * @param json The `MapJSON` to deserialize.
   */
  fromJSON({ keyType = ASTKind.String, valueType }: MapJSON): void {
    // Key defaults to String.
    this.updateChildNodeByKey('keyType', parseTypeJsonOrKind(keyType));
    this.updateChildNodeByKey('valueType', parseTypeJsonOrKind(valueType));
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
   * Map strong comparison.
   * @param targetTypeJSON The type to compare with.
   * @returns `true` if the types are equal, `false` otherwise.
   */
  protected customStrongEqual(targetTypeJSON: ASTNodeJSON): boolean {
    const { keyType = ASTKind.String, valueType } = targetTypeJSON as MapJSON;

    const isValueTypeEqual =
      (!valueType && !this.valueType) || this.valueType?.isTypeEqual(valueType);

    return isValueTypeEqual && this.keyType?.isTypeEqual(keyType);
  }

  /**
   * Serialize the node to a JSON object.
   * @returns The JSON representation of the node.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.Map,
      keyType: this.keyType?.toJSON(),
      valueType: this.valueType?.toJSON(),
    };
  }
}
