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

export namespace ASTFactory {
  /**
   * 类型相关
   * @returns
   */
  export const createString = (json?: StringJSON) => ({
    kind: ASTKind.String,
    ...(json || {}),
  });
  export const createNumber = () => ({ kind: ASTKind.Number });
  export const createBoolean = () => ({ kind: ASTKind.Boolean });
  export const createInteger = () => ({ kind: ASTKind.Integer });
  export const createObject = (json: ObjectJSON) => ({
    kind: ASTKind.Object,
    ...json,
  });
  export const createArray = (json: ArrayJSON) => ({
    kind: ASTKind.Array,
    ...json,
  });
  export const createMap = (json: MapJSON) => ({
    kind: ASTKind.Map,
    ...json,
  });
  export const createUnion = (json: UnionJSON) => ({
    kind: ASTKind.Union,
    ...json,
  });
  export const createCustomType = (json: CustomTypeJSON) => ({
    kind: ASTKind.CustomType,
    ...json,
  });

  /**
   * 声明相关
   */
  export const createVariableDeclaration = <VariableMeta = any>(
    json: VariableDeclarationJSON<VariableMeta>
  ) => ({
    kind: ASTKind.VariableDeclaration,
    ...json,
  });
  export const createProperty = <VariableMeta = any>(json: PropertyJSON<VariableMeta>) => ({
    kind: ASTKind.Property,
    ...json,
  });
  export const createVariableDeclarationList = (json: VariableDeclarationListJSON) => ({
    kind: ASTKind.VariableDeclarationList,
    ...json,
  });

  /**
   * 表达式相关
   */
  export const createEnumerateExpression = (json: EnumerateExpressionJSON) => ({
    kind: ASTKind.EnumerateExpression,
    ...json,
  });
  export const createKeyPathExpression = (json: KeyPathExpressionJSON) => ({
    kind: ASTKind.KeyPathExpression,
    ...json,
  });
  export const createWrapArrayExpression = (json: WrapArrayExpressionJSON) => ({
    kind: ASTKind.WrapArrayExpression,
    ...json,
  });

  /**
   * 通过 AST Class 创建
   */
  export const create = <JSON extends ASTNodeJSON>(
    targetType: { kind: string; new (...args: any[]): ASTNode<JSON> },
    json: JSON
  ) => ({ kind: targetType.kind, ...json });
}
