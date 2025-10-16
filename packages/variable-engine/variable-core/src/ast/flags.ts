/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/**
 * ASTNode flags. Stored in the `flags` property of the `ASTNode`.
 */
export enum ASTNodeFlags {
  /**
   * None.
   */
  None = 0,

  /**
   * Variable Field.
   */
  VariableField = 1 << 0,

  /**
   * Expression.
   */
  Expression = 1 << 2,

  /**
   * # Variable Type Flags
   */

  /**
   *  Basic type.
   */
  BasicType = 1 << 3,
  /**
   * Drillable variable type.
   */
  DrilldownType = 1 << 4,
  /**
   * Enumerable variable type.
   */
  EnumerateType = 1 << 5,
  /**
   * Composite type, currently not in use.
   */
  UnionType = 1 << 6,

  /**
   * Variable type.
   */
  VariableType = BasicType | DrilldownType | EnumerateType | UnionType,
}
