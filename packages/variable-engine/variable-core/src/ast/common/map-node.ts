/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { updateChildNodeHelper } from '../utils/helpers';
import { ASTKind, ASTNodeJSON } from '../types';
import { ASTNode } from '../ast-node';

/**
 * ASTNodeJSON representation of `MapNode`
 */
export interface MapNodeJSON {
  /**
   * The map of nodes.
   */
  map: [string, ASTNodeJSON][];
}

/**
 * Represents a map of nodes.
 */
export class MapNode extends ASTNode<MapNodeJSON> {
  static kind: string = ASTKind.MapNode;

  protected map: Map<string, ASTNode> = new Map<string, ASTNode>();

  /**
   * Deserializes the `MapNodeJSON` to the `MapNode`.
   * @param json The `MapNodeJSON` to deserialize.
   */
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

  /**
   * Serialize the `MapNode` to `MapNodeJSON`.
   * @returns The JSON representation of `MapNode`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.MapNode,
      map: Array.from(this.map.entries()),
    };
  }

  /**
   * Set a node in the map.
   * @param key The key of the node.
   * @param nextJSON The JSON representation of the node.
   * @returns The node instance.
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
   * Remove a node from the map.
   * @param key The key of the node.
   */
  remove(key: string) {
    this.get(key)?.dispose();
    this.map.delete(key);
    this.fireChange();
  }

  /**
   * Get a node from the map.
   * @param key The key of the node.
   * @returns The node instance if found, otherwise `undefined`.
   */
  get<Node extends ASTNode = ASTNode>(key: string): Node | undefined {
    return this.map.get(key) as Node | undefined;
  }
}
