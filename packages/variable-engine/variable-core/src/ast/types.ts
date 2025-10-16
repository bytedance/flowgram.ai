/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type Observer } from 'rxjs';

import { type Scope } from '../scope';
import { type ASTNode } from './ast-node';

export type ASTKindType = string;
export type Identifier = string;

/**
 * ASTNodeJSON is the JSON representation of an ASTNode.
 */
export interface ASTNodeJSON {
  /**
   * Kind is the type of the AST node.
   */
  kind?: ASTKindType;

  /**
   * Key is the unique identifier of the node.
   * If not provided, the node will generate a default key value.
   */
  key?: Identifier;
  [key: string]: any;
}

/**
 * Core AST node types.
 */
export enum ASTKind {
  /**
   * # Type-related.
   * - A set of type AST nodes based on JSON types is implemented internally by default.
   */

  /**
   * String type.
   */
  String = 'String',
  /**
   * Number type.
   */
  Number = 'Number',
  /**
   * Integer type.
   */
  Integer = 'Integer',
  /**
   * Boolean type.
   */
  Boolean = 'Boolean',
  /**
   * Object type.
   */
  Object = 'Object',
  /**
   * Array type.
   */
  Array = 'Array',
  /**
   * Map type.
   */
  Map = 'Map',
  /**
   * Union type.
   * Commonly used for type checking, generally not exposed to the business.
   */
  Union = 'Union',
  /**
   * Any type.
   * Commonly used for business logic.
   */
  Any = 'Any',
  /**
   * Custom type.
   * For business-defined types.
   */
  CustomType = 'CustomType',

  /**
   * # Declaration-related.
   */

  /**
   * Field definition for Object drill-down.
   */
  Property = 'Property',
  /**
   * Variable declaration.
   */
  VariableDeclaration = 'VariableDeclaration',
  /**
   * Variable declaration list.
   */
  VariableDeclarationList = 'VariableDeclarationList',

  /**
   * # Expression-related.
   */

  /**
   * Access fields on variables through the path system.
   */
  KeyPathExpression = 'KeyPathExpression',
  /**
   * Iterate over specified data.
   */
  EnumerateExpression = 'EnumerateExpression',
  /**
   * Wrap with Array Type.
   */
  WrapArrayExpression = 'WrapArrayExpression',

  /**
   * # General-purpose AST nodes.
   */

  /**
   * General-purpose List<ASTNode> storage node.
   */
  ListNode = 'ListNode',
  /**
   * General-purpose data storage node.
   */
  DataNode = 'DataNode',
  /**
   * General-purpose Map<string, ASTNode> storage node.
   */
  MapNode = 'MapNode',
}

export interface CreateASTParams {
  scope: Scope;
  key?: Identifier;
  parent?: ASTNode;
}

export type ASTNodeJSONOrKind = string | ASTNodeJSON;

export type ObserverOrNext<T> = Partial<Observer<T>> | ((value: T) => void);

export interface SubscribeConfig<This, Data> {
  // Merge all changes within one animationFrame into a single one.
  debounceAnimation?: boolean;
  // Respond with a value by default upon subscription.
  triggerOnInit?: boolean;
  selector?: (curr: This) => Data;
}

/**
 * TypeUtils to get the JSON representation of an AST node with a specific kind.
 */
export type GetKindJSON<KindType extends string, JSON extends ASTNodeJSON> = {
  kind: KindType;
  key?: Identifier;
} & JSON;

/**
 * TypeUtils to get the JSON representation of an AST node with a specific kind or just the kind string.
 */
export type GetKindJSONOrKind<KindType extends string, JSON extends ASTNodeJSON> =
  | ({
      kind: KindType;
      key?: Identifier;
    } & JSON)
  | KindType;

/**
 * Global event action type.
 * - Global event might be dispatched from `ASTNode` or `Scope`.
 */
export interface GlobalEventActionType<
  Type = string,
  Payload = any,
  AST extends ASTNode = ASTNode
> {
  type: Type;
  payload?: Payload;
  ast?: AST;
}

export type NewASTAction = GlobalEventActionType<'NewAST'>;
export type UpdateASTAction = GlobalEventActionType<'UpdateAST'>;
export type DisposeASTAction = GlobalEventActionType<'DisposeAST'>;
