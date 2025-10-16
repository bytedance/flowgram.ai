/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind } from '../types';
import { BaseType } from './base-type';

/**
 * Represents a number type.
 */
export class NumberType extends BaseType {
  static kind: string = ASTKind.Number;

  /**
   * Deserializes the `NumberJSON` to the `NumberType`.
   * @param json The `NumberJSON` to deserialize.
   */
  fromJSON(): void {
    // noop
  }
}
