/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTNodeJSONOrKind } from '../types';

/**
 * ASTNodeJSON representation of `UnionType`, which union multiple `BaseType`.
 */
export interface UnionJSON {
  types?: ASTNodeJSONOrKind[];
}
