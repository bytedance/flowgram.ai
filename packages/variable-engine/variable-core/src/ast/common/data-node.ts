/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { shallowEqual } from 'fast-equals';

import { ASTKind, ASTNodeJSON } from '../types';
import { ASTNode } from '../ast-node';

/**
 * Represents a general data node with no child nodes.
 */
export class DataNode<Data = any> extends ASTNode {
  static kind: string = ASTKind.DataNode;

  protected _data: Data;

  /**
   * The data of the node.
   */
  get data(): Data {
    return this._data;
  }

  /**
   * Deserializes the `DataNodeJSON` to the `DataNode`.
   * @param json The `DataNodeJSON` to deserialize.
   */
  fromJSON(json: Data): void {
    const { kind, ...restData } = json as ASTNodeJSON;

    if (!shallowEqual(restData, this._data)) {
      this._data = restData as unknown as Data;
      this.fireChange();
    }
  }

  /**
   * Serialize the `DataNode` to `DataNodeJSON`.
   * @returns The JSON representation of `DataNode`.
   */
  toJSON() {
    return {
      kind: ASTKind.DataNode,
      ...this._data,
    };
  }

  /**
   * Partially update the data of the node.
   * @param nextData The data to be updated.
   */
  partialUpdate(nextData: Data) {
    if (!shallowEqual(nextData, this._data)) {
      this._data = {
        ...this._data,
        ...nextData,
      };
      this.fireChange();
    }
  }
}
