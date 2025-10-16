/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { intersection } from 'lodash-es';

import { ASTNodeFlags } from '../flags';
import { type BaseExpression } from '../expression';
import { type BaseVariableField } from '../declaration';
import { type ASTNode } from '../ast-node';
import { getParentFields } from './variable-field';
import { getAllChildren } from './helpers';

/**
 * Get all variables referenced by child ASTs.
 * @param ast The ASTNode to traverse.
 * @returns All variables referenced by child ASTs.
 */
export function getAllRefs(ast: ASTNode): BaseVariableField[] {
  return getAllChildren(ast)
    .filter((_child) => _child.flags & ASTNodeFlags.Expression)
    .map((_child) => (_child as BaseExpression).refs)
    .flat()
    .filter(Boolean) as BaseVariableField[];
}

/**
 * Checks for circular references.
 * @param curr The current expression.
 * @param refNode The referenced variable node.
 * @returns Whether a circular reference exists.
 */
export function checkRefCycle(
  curr: BaseExpression,
  refNodes: (BaseVariableField | undefined)[]
): boolean {
  // If there are no circular references in the scope, then it is impossible to have a circular reference.
  if (
    intersection(curr.scope.coverScopes, refNodes.map((_ref) => _ref?.scope).filter(Boolean))
      .length === 0
  ) {
    return false;
  }

  // BFS traversal.
  const visited = new Set<BaseVariableField>();
  const queue = [...refNodes];

  while (queue.length) {
    const currNode = queue.shift()!;
    visited.add(currNode);

    for (const ref of getAllRefs(currNode).filter((_ref) => !visited.has(_ref))) {
      queue.push(ref);
    }
  }

  // If the referenced variables include the parent variable of the expression, then there is a circular reference.
  return intersection(Array.from(visited), getParentFields(curr)).length > 0;
}
