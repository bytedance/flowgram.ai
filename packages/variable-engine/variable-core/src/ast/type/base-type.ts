/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { parseTypeJsonOrKind } from '../utils/helpers';
import { ASTKind, ASTNodeJSON, ASTNodeJSONOrKind } from '../types';
import { ASTNodeFlags } from '../flags';
import { BaseVariableField } from '../declaration';
import { ASTNode } from '../ast-node';
import { UnionJSON } from './union';

/**
 * Base class for all types.
 *
 * All other types should extend this class.
 */
export abstract class BaseType<JSON extends ASTNodeJSON = any, InjectOpts = any> extends ASTNode<
  JSON,
  InjectOpts
> {
  public flags: number = ASTNodeFlags.BasicType;

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

    return this.kind === targetTypeJSON?.kind;
  }

  /**
   * Get a variable field by key path.
   *
   * This method should be implemented by drillable types.
   * @param keyPath The key path to search for.
   * @returns The variable field if found, otherwise `undefined`.
   */
  getByKeyPath(keyPath: string[] = []): BaseVariableField | undefined {
    throw new Error(`Get By Key Path is not implemented for Type: ${this.kind}`);
  }

  /**
   * Serialize the node to a JSON object.
   * @returns The JSON representation of the node.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: this.kind,
    };
  }
}
