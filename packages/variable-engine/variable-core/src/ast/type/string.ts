/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ASTKind } from '../types';
import { ASTNodeFlags } from '../flags';
import { BaseType } from './base-type';

/**
 * ASTNodeJSON representation of the `StringType`.
 */
export interface StringJSON {
  /**
   * see https://json-schema.org/understanding-json-schema/reference/type#format
   */
  format?: string;
}

export class StringType extends BaseType {
  public flags: ASTNodeFlags = ASTNodeFlags.BasicType;

  static kind: string = ASTKind.String;

  protected _format?: string;

  /**
   * see https://json-schema.org/understanding-json-schema/reference/string#format
   */
  get format() {
    return this._format;
  }

  /**
   * Deserialize the `StringJSON` to the `StringType`.
   *
   * @param json StringJSON representation of the `StringType`.
   */
  fromJSON(json?: StringJSON): void {
    if (json?.format !== this._format) {
      this._format = json?.format;
      this.fireChange();
    }
  }
}
