/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind, ASTNodeJSON } from '../types';
import { ASTNode } from '../ast-node';

/**
 * ASTNodeJSON representation of `ListNode`
 */
export interface ListNodeJSON {
  /**
   * The list of nodes.
   */
  list: ASTNodeJSON[];
}

/**
 * Represents a list of nodes.
 */
export class ListNode extends ASTNode<ListNodeJSON> {
  static kind: string = ASTKind.ListNode;

  protected _list: ASTNode[];

  /**
   * The list of nodes.
   */
  get list(): ASTNode[] {
    return this._list;
  }

  /**
   * Deserializes the `ListNodeJSON` to the `ListNode`.
   * @param json The `ListNodeJSON` to deserialize.
   */
  fromJSON({ list }: ListNodeJSON): void {
    // Children that exceed the length need to be destroyed.
    this._list.slice(list.length).forEach((_item) => {
      _item.dispose();
      this.fireChange();
    });

    // Processing of remaining children.
    this._list = list.map((_item, idx) => {
      const prevItem = this._list[idx];

      if (prevItem.kind !== _item.kind) {
        prevItem.dispose();
        this.fireChange();
        return this.createChildNode(_item);
      }

      prevItem.fromJSON(_item);
      return prevItem;
    });
  }

  /**
   * Serialize the `ListNode` to `ListNodeJSON`.
   * @returns The JSON representation of `ListNode`.
   */
  toJSON(): ASTNodeJSON {
    return {
      kind: ASTKind.ListNode,
      list: this._list.map((item) => item.toJSON()),
    };
  }
}
