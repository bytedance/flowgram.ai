/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind } from './types';
import {
  type StringType,
  type NumberType,
  type BooleanType,
  type IntegerType,
  type ObjectType,
  type ArrayType,
  type MapType,
  type CustomType,
} from './type';
import { ASTNodeFlags } from './flags';
import {
  type WrapArrayExpression,
  type EnumerateExpression,
  type KeyPathExpression,
} from './expression';
import {
  type BaseVariableField,
  type Property,
  type VariableDeclaration,
  type VariableDeclarationList,
} from './declaration';
import { type ASTNode } from './ast-node';

/**
 * Variable-core ASTNode matchers.
 *
 * - Typescript code inside if statement will be type guarded.
 */
export namespace ASTMatch {
  /**
   * # Type-related matchers.
   */

  /**
   * Check if the node is a `StringType`.
   */
  export const isString = (node?: ASTNode): node is StringType => node?.kind === ASTKind.String;

  /**
   * Check if the node is a `NumberType`.
   */
  export const isNumber = (node?: ASTNode): node is NumberType => node?.kind === ASTKind.Number;

  /**
   * Check if the node is a `BooleanType`.
   */
  export const isBoolean = (node?: ASTNode): node is BooleanType => node?.kind === ASTKind.Boolean;

  /**
   * Check if the node is a `IntegerType`.
   */
  export const isInteger = (node?: ASTNode): node is IntegerType => node?.kind === ASTKind.Integer;

  /**
   * Check if the node is a `ObjectType`.
   */
  export const isObject = (node?: ASTNode): node is ObjectType => node?.kind === ASTKind.Object;

  /**
   * Check if the node is a `ArrayType`.
   */
  export const isArray = (node?: ASTNode): node is ArrayType => node?.kind === ASTKind.Array;

  /**
   * Check if the node is a `MapType`.
   */
  export const isMap = (node?: ASTNode): node is MapType => node?.kind === ASTKind.Map;

  /**
   * Check if the node is a `CustomType`.
   */
  export const isCustomType = (node?: ASTNode): node is CustomType =>
    node?.kind === ASTKind.CustomType;

  /**
   * # Declaration-related matchers.
   */

  /**
   * Check if the node is a `VariableDeclaration`.
   */
  export const isVariableDeclaration = <VariableMeta = any>(
    node?: ASTNode
  ): node is VariableDeclaration<VariableMeta> => node?.kind === ASTKind.VariableDeclaration;

  /**
   * Check if the node is a `Property`.
   */
  export const isProperty = <VariableMeta = any>(node?: ASTNode): node is Property<VariableMeta> =>
    node?.kind === ASTKind.Property;

  /**
   * Check if the node is a `BaseVariableField`.
   */
  export const isBaseVariableField = (node?: ASTNode): node is BaseVariableField =>
    !!(node?.flags || 0 & ASTNodeFlags.VariableField);

  /**
   * Check if the node is a `VariableDeclarationList`.
   */
  export const isVariableDeclarationList = (node?: ASTNode): node is VariableDeclarationList =>
    node?.kind === ASTKind.VariableDeclarationList;

  /**
   * # Expression-related matchers.
   */

  /**
   * Check if the node is a `EnumerateExpression`.
   */
  export const isEnumerateExpression = (node?: ASTNode): node is EnumerateExpression =>
    node?.kind === ASTKind.EnumerateExpression;

  /**
   * Check if the node is a `WrapArrayExpression`.
   */
  export const isWrapArrayExpression = (node?: ASTNode): node is WrapArrayExpression =>
    node?.kind === ASTKind.WrapArrayExpression;

  /**
   * Check if the node is a `KeyPathExpression`.
   */
  export const isKeyPathExpression = (node?: ASTNode): node is KeyPathExpression =>
    node?.kind === ASTKind.KeyPathExpression;

  /**
   * Check ASTNode Match by ASTClass
   *
   * @param node ASTNode to be checked.
   * @param targetType Target ASTNode class.
   * @returns Whether the node is of the target type.
   */
  export function is<TargetASTNode extends ASTNode>(
    node?: ASTNode,
    targetType?: { kind: string; new (...args: any[]): TargetASTNode }
  ): node is TargetASTNode {
    return node?.kind === targetType?.kind;
  }
}
