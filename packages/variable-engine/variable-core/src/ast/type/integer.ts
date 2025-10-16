/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind } from '../types';
import { ASTNodeFlags } from '../flags';
import { BaseType } from './base-type';

/**
 * Represents an integer type.
 */
export class IntegerType extends BaseType {
  public flags: ASTNodeFlags = ASTNodeFlags.BasicType;

  static kind: string = ASTKind.Integer;

  /**
   * Deserializes the `IntegerJSON` to the `IntegerType`.
   * @param json The `IntegerJSON` to deserialize.
   */
  fromJSON(): void {
    // noop
  }
}
