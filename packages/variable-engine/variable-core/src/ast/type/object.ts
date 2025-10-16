/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { xor } from 'lodash-es';

import { parseTypeJsonOrKind } from '../utils/helpers';
import { ASTNodeJSON, ASTKind, ASTNodeJSONOrKind, type GlobalEventActionType } from '../types';
import { ASTNodeFlags } from '../flags';
import { Property, type PropertyJSON } from '../declaration/property';
import { BaseType } from './base-type';

/**
 * ASTNodeJSON representation of `ObjectType`
 */
export interface ObjectJSON<VariableMeta = any> {
  /**
   * The properties of the object.
   *
   * The `properties` of an Object must be of type `Property`, so the business can omit the `kind` field.
   */
  properties?: PropertyJSON<VariableMeta>[];
}

/**
 * Action type for object properties change.
 */
export type ObjectPropertiesChangeAction = GlobalEventActionType<
  'ObjectPropertiesChange',
  {
    prev: Property[];
    next: Property[];
  },
  ObjectType
>;

/**
 * Represents an object type.
 */
export class ObjectType extends BaseType<ObjectJSON> {
  public flags: ASTNodeFlags = ASTNodeFlags.DrilldownType;

  static kind: string = ASTKind.Object;

  /**
   * A map of property keys to `Property` instances.
   */
  propertyTable: Map<string, Property> = new Map();

  /**
   * An array of `Property` instances.
   */
  properties: Property[];

  /**
   * Deserializes the `ObjectJSON` to the `ObjectType`.
   * @param json The `ObjectJSON` to deserialize.
   */
  fromJSON({ properties }: ObjectJSON): void {
    const removedKeys = new Set(this.propertyTable.keys());
    const prev = [...(this.properties || [])];

    // Iterate over the new properties.
    this.properties = (properties || []).map((property: PropertyJSON) => {
      const existProperty = this.propertyTable.get(property.key);
      removedKeys.delete(property.key);

      if (existProperty) {
        existProperty.fromJSON(property as PropertyJSON);

        return existProperty;
      } else {
        const newProperty = this.createChildNode({
          ...property,
          kind: ASTKind.Property,
        }) as Property;

        this.fireChange();

        this.propertyTable.set(property.key, newProperty);
        // TODO: When a child node is actively destroyed, delete the information in the table.

        return newProperty;
      }
    });

    // Delete properties that no longer exist.
    removedKeys.forEach((key) => {
      const property = this.propertyTable.get(key);
      property?.dispose();
      this.propertyTable.delete(key);
      this.fireChange();
    });

    this.dispatchGlobalEvent<ObjectPropertiesChangeAction>({
      type: 'ObjectPropertiesChange',
      payload: {
        prev,
        next: [...this.properties],
      },
    });
  }

  /**
   * Serialize the `ObjectType` to `ObjectJSON`.
   * @returns The JSON representation of `ObjectType`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.Object,
      properties: this.properties.map((_property) => _property.toJSON()),
    };
  }

  /**
   * Get a variable field by key path.
   * @param keyPath The key path to search for.
   * @returns The variable field if found, otherwise `undefined`.
   */
  getByKeyPath(keyPath: string[]): Property | undefined {
    const [curr, ...restKeyPath] = keyPath;

    const property = this.propertyTable.get(curr);

    // Found the end of the path.
    if (!restKeyPath.length) {
      return property;
    }

    // Otherwise, continue searching downwards.
    if (property?.type && property?.type?.flags & ASTNodeFlags.DrilldownType) {
      return property.type.getByKeyPath(restKeyPath) as Property | undefined;
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
   * Object type strong comparison.
   * @param targetTypeJSON The type to compare with.
   * @returns `true` if the types are equal, `false` otherwise.
   */
  protected customStrongEqual(targetTypeJSON: ASTNodeJSON): boolean {
    const targetProperties = (targetTypeJSON as ObjectJSON).properties || [];

    const sourcePropertyKeys = Array.from(this.propertyTable.keys());
    const targetPropertyKeys = targetProperties.map((_target) => _target.key);

    const isKeyStrongEqual = !xor(sourcePropertyKeys, targetPropertyKeys).length;

    return (
      isKeyStrongEqual &&
      targetProperties.every((targetProperty) => {
        const sourceProperty = this.propertyTable.get(targetProperty.key);

        return (
          sourceProperty &&
          sourceProperty.key === targetProperty.key &&
          sourceProperty.type?.isTypeEqual(targetProperty?.type)
        );
      })
    );
  }
}
