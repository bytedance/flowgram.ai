/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTNodeJSON, ASTNodeJSONOrKind } from '../types';
import { ASTMatch } from '../match';
import { ASTNode } from '../ast-node';

export function updateChildNodeHelper(
  this: ASTNode,
  {
    getChildNode,
    updateChildNode,
    removeChildNode,
    nextJSON,
  }: {
    getChildNode: () => ASTNode | undefined;
    updateChildNode: (nextNode: ASTNode) => void;
    removeChildNode: () => void;
    nextJSON?: ASTNodeJSON;
  }
): ASTNode | undefined {
  const currNode: ASTNode | undefined = getChildNode();

  const isNewKind = currNode?.kind !== nextJSON?.kind;
  // If `nextJSON` does not pass a key value, the key value remains unchanged by default.
  const isNewKey = nextJSON?.key && nextJSON?.key !== currNode?.key;

  if (isNewKind || isNewKey) {
    // The previous node needs to be destroyed.
    if (currNode) {
      currNode.dispose();
      removeChildNode();
    }

    if (nextJSON) {
      const newNode = this.createChildNode(nextJSON);
      updateChildNode(newNode);
      this.fireChange();
      return newNode;
    } else {
      // Also trigger an update when deleting a child node directly.
      this.fireChange();
    }
  } else if (nextJSON) {
    currNode?.fromJSON(nextJSON);
  }

  return currNode;
}

export function parseTypeJsonOrKind(typeJSONOrKind?: ASTNodeJSONOrKind): ASTNodeJSON | undefined {
  return typeof typeJSONOrKind === 'string' ? { kind: typeJSONOrKind } : typeJSONOrKind;
}

// Get all children.
export function getAllChildren(ast: ASTNode): ASTNode[] {
  return [...ast.children, ...ast.children.map((_child) => getAllChildren(_child)).flat()];
}

/**
 * isMatchAST is same as ASTMatch.is
 * @param node
 * @param targetType
 * @returns
 */
export function isMatchAST<TargetASTNode extends ASTNode>(
  node?: ASTNode,
  targetType?: { kind: string; new (...args: any[]): TargetASTNode }
): node is TargetASTNode {
  return ASTMatch.is(node, targetType);
}
