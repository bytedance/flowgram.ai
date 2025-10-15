/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { updateChildNodeHelper } from '../utils/helpers';
import { ASTKind, ASTNodeJSON } from '../types';
import { ASTNode } from '../ast-node';

export interface MapNodeJSON {
  map: [string, ASTNodeJSON][];
}

export class MapNode extends ASTNode<MapNodeJSON> {
  static kind: string = ASTKind.MapNode;

  protected map: Map<string, ASTNode> = new Map<string, ASTNode>();

  fromJSON({ map }: MapNodeJSON): void {
    const removedKeys = new Set(this.map.keys());

    for (const [key, item] of map || []) {
      removedKeys.delete(key);
      this.set(key, item);
    }

    for (const removeKey of Array.from(removedKeys)) {
      this.remove(removeKey);
    }
  }

  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.MapNode,
      map: Array.from(this.map.entries()),
    };
  }

  /**
   * 往 Map 中设置 ASTNode
   * @param key ASTNode 的索引，
   * @param json
   */
  set<Node extends ASTNode = ASTNode>(key: string, nextJSON: ASTNodeJSON): Node {
    return this.withBatchUpdate(updateChildNodeHelper).call(this, {
      getChildNode: () => this.get(key),
      removeChildNode: () => this.map.delete(key),
      updateChildNode: (nextNode) => this.map.set(key, nextNode),
      nextJSON,
    }) as Node;
  }

  /**
   * 移除指定 ASTNode
   * @param key
   */
  remove(key: string) {
    this.get(key)?.dispose();
    this.map.delete(key);
    this.fireChange();
  }

  /**
   * 获取 ASTNode
   * @param key
   * @returns
   */
  get<Node extends ASTNode = ASTNode>(key: string): Node | undefined {
    return this.map.get(key) as Node | undefined;
  }
}
