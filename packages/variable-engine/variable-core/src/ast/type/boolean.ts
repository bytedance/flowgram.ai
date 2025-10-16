/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind } from '../types';
import { BaseType } from './base-type';

/**
 * Represents a boolean type.
 */
export class BooleanType extends BaseType {
  static kind: string = ASTKind.Boolean;

  /**
   * Deserializes the `BooleanJSON` to the `BooleanType`.
   * @param json The `BooleanJSON` to deserialize.
   */
  fromJSON(): void {
    // noop
  }
}
