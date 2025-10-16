/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind } from '../types';
import { BaseVariableField, BaseVariableFieldJSON } from './base-variable-field';

/**
 * ASTNodeJSON representation of the `Property`.
 */
export type PropertyJSON<VariableMeta = any> = BaseVariableFieldJSON<VariableMeta> & {
  // Key is a required field.
  key: string;
};

/**
 * `Property` is a variable field that represents a property of a `ObjectType`.
 */
export class Property<VariableMeta = any> extends BaseVariableField<VariableMeta> {
  static kind: string = ASTKind.Property;
}
