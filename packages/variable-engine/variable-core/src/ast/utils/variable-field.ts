/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTNodeFlags } from '../flags';
import { BaseVariableField } from '../declaration';
import { ASTNode } from '../ast-node';

/**
 * Parent variable fields, sorted from nearest to farthest.
 */
export function getParentFields(ast: ASTNode): BaseVariableField[] {
  let curr = ast.parent;
  const res: BaseVariableField[] = [];

  while (curr) {
    if (curr.flags & ASTNodeFlags.VariableField) {
      res.push(curr as BaseVariableField);
    }
    curr = curr.parent;
  }

  return res;
}
