/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind, ASTNodeJSON } from './types';
import { StringJSON } from './type/string';
import { MapJSON } from './type/map';
import { ArrayJSON } from './type/array';
import { CustomTypeJSON, ObjectJSON, UnionJSON } from './type';
import {
  EnumerateExpressionJSON,
  KeyPathExpressionJSON,
  WrapArrayExpressionJSON,
} from './expression';
import { PropertyJSON, VariableDeclarationJSON, VariableDeclarationListJSON } from './declaration';
import { ASTNode } from './ast-node';

/**
 * Variable-core ASTNode factories.
 */
export namespace ASTFactory {
  /**
   * Type-related factories.
   */

  /**
   * Creates a `String` type node.
   */
  export const createString = (json?: StringJSON) => ({
    kind: ASTKind.String,
    ...(json || {}),
  });

  /**
   * Creates a `Number` type node.
   */
  export const createNumber = () => ({ kind: ASTKind.Number });

  /**
   * Creates a `Boolean` type node.
   */
  export const createBoolean = () => ({ kind: ASTKind.Boolean });

  /**
   * Creates an `Integer` type node.
   */
  export const createInteger = () => ({ kind: ASTKind.Integer });

  /**
   * Creates an `Object` type node.
   */
  export const createObject = (json: ObjectJSON) => ({
    kind: ASTKind.Object,
    ...json,
  });

  /**
   * Creates an `Array` type node.
   */
  export const createArray = (json: ArrayJSON) => ({
    kind: ASTKind.Array,
    ...json,
  });

  /**
   * Creates a `Map` type node.
   */
  export const createMap = (json: MapJSON) => ({
    kind: ASTKind.Map,
    ...json,
  });

  /**
   * Creates a `Union` type node.
   */
  export const createUnion = (json: UnionJSON) => ({
    kind: ASTKind.Union,
    ...json,
  });

  /**
   * Creates a `CustomType` node.
   */
  export const createCustomType = (json: CustomTypeJSON) => ({
    kind: ASTKind.CustomType,
    ...json,
  });

  /**
   * Declaration-related factories.
   */

  /**
   * Creates a `VariableDeclaration` node.
   */
  export const createVariableDeclaration = <VariableMeta = any>(
    json: VariableDeclarationJSON<VariableMeta>
  ) => ({
    kind: ASTKind.VariableDeclaration,
    ...json,
  });

  /**
   * Creates a `Property` node.
   */
  export const createProperty = <VariableMeta = any>(json: PropertyJSON<VariableMeta>) => ({
    kind: ASTKind.Property,
    ...json,
  });

  /**
   * Creates a `VariableDeclarationList` node.
   */
  export const createVariableDeclarationList = (json: VariableDeclarationListJSON) => ({
    kind: ASTKind.VariableDeclarationList,
    ...json,
  });

  /**
   * Expression-related factories.
   */

  /**
   * Creates an `EnumerateExpression` node.
   */
  export const createEnumerateExpression = (json: EnumerateExpressionJSON) => ({
    kind: ASTKind.EnumerateExpression,
    ...json,
  });

  /**
   * Creates a `KeyPathExpression` node.
   */
  export const createKeyPathExpression = (json: KeyPathExpressionJSON) => ({
    kind: ASTKind.KeyPathExpression,
    ...json,
  });

  /**
   * Creates a `WrapArrayExpression` node.
   */
  export const createWrapArrayExpression = (json: WrapArrayExpressionJSON) => ({
    kind: ASTKind.WrapArrayExpression,
    ...json,
  });

  /**
   * Create by AST Class.
   */

  /**
   * Creates Type-Safe ASTNodeJSON object based on the provided AST class.
   *
   * @param targetType Target ASTNode class.
   * @param json The JSON data for the node.
   * @returns The ASTNode JSON object.
   */
  export const create = <JSON extends ASTNodeJSON>(
    targetType: { kind: string; new (...args: any[]): ASTNode<JSON> },
    json: JSON
  ) => ({ kind: targetType.kind, ...json });
}
