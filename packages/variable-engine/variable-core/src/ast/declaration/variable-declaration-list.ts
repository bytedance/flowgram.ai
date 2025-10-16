/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind, ASTNodeJSON } from '../types';
import { GlobalEventActionType } from '../types';
import { ASTNode } from '../ast-node';
import { type VariableDeclarationJSON, VariableDeclaration } from './variable-declaration';

export interface VariableDeclarationListJSON<VariableMeta = any> {
  /**
   * `declarations` must be of type `VariableDeclaration`, so the business can omit the `kind` field.
   */
  declarations?: VariableDeclarationJSON<VariableMeta>[];
  /**
   * The starting order number for variables.
   */
  startOrder?: number;
}

export type VariableDeclarationListChangeAction = GlobalEventActionType<
  'VariableListChange',
  {
    prev: VariableDeclaration[];
    next: VariableDeclaration[];
  },
  VariableDeclarationList
>;

export class VariableDeclarationList extends ASTNode<VariableDeclarationListJSON> {
  static kind: string = ASTKind.VariableDeclarationList;

  /**
   * Map of variable declarations, keyed by variable name.
   */
  declarationTable: Map<string, VariableDeclaration> = new Map();

  /**
   * Variable declarations, sorted by `order`.
   */
  declarations: VariableDeclaration[];

  /**
   * Deserialize the `VariableDeclarationListJSON` to the `VariableDeclarationList`.
   * - VariableDeclarationListChangeAction will be dispatched after deserialization.
   *
   * @param declarations Variable declarations.
   * @param startOrder The starting order number for variables. Default is 0.
   */
  fromJSON({ declarations, startOrder }: VariableDeclarationListJSON): void {
    const removedKeys = new Set(this.declarationTable.keys());
    const prev = [...(this.declarations || [])];

    // Iterate over the new properties.
    this.declarations = (declarations || []).map(
      (declaration: VariableDeclarationJSON, idx: number) => {
        const order = (startOrder || 0) + idx;

        // If the key is not set, reuse the previous key.
        const declarationKey = declaration.key || this.declarations?.[idx]?.key;
        const existDeclaration = this.declarationTable.get(declarationKey);
        if (declarationKey) {
          removedKeys.delete(declarationKey);
        }

        if (existDeclaration) {
          existDeclaration.fromJSON({ order, ...declaration });

          return existDeclaration;
        } else {
          const newDeclaration = this.createChildNode({
            order,
            ...declaration,
            kind: ASTKind.VariableDeclaration,
          }) as VariableDeclaration;
          this.fireChange();

          this.declarationTable.set(newDeclaration.key, newDeclaration);

          return newDeclaration;
        }
      }
    );

    // Delete variables that no longer exist.
    removedKeys.forEach((key) => {
      const declaration = this.declarationTable.get(key);
      declaration?.dispose();
      this.declarationTable.delete(key);
    });

    this.dispatchGlobalEvent<VariableDeclarationListChangeAction>({
      type: 'VariableListChange',
      payload: {
        prev,
        next: [...this.declarations],
      },
    });
  }

  /**
   * Serialize the `VariableDeclarationList` to the `VariableDeclarationListJSON`.
   * @returns ASTJSON representation of `VariableDeclarationList`
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.VariableDeclarationList,
      declarations: this.declarations.map((_declaration) => _declaration.toJSON()),
    };
  }
}
