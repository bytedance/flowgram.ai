/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { difference } from 'lodash-es';
import { inject, injectable, postConstruct, preDestroy } from 'inversify';
import { DisposableCollection, Emitter } from '@flowgram.ai/utils';

import { VariableEngine } from '../variable-engine';
import {
  ASTNode,
  BaseVariableField,
  ObjectPropertiesChangeAction,
  VariableDeclarationListChangeAction,
} from '../ast';

interface RenameInfo {
  before: BaseVariableField;
  after: BaseVariableField;
}

/**
 * This service is responsible for detecting when a variable field's key is renamed.
 * It listens for changes in variable declaration lists and object properties, and
 * determines if a change constitutes a rename operation.
 */
@injectable()
export class VariableFieldKeyRenameService {
  @inject(VariableEngine) variableEngine: VariableEngine;

  toDispose = new DisposableCollection();

  renameEmitter = new Emitter<RenameInfo>();

  /**
   * Emits events for fields that are disposed of during a list change, but not renamed.
   * This helps distinguish between a field that was truly removed and one that was renamed.
   */
  disposeInListEmitter = new Emitter<BaseVariableField>();

  /**
   * An event that fires when a variable field key is successfully renamed.
   */
  onRename = this.renameEmitter.event;

  /**
   * An event that fires when a field is removed from a list (and not part of a rename).
   */
  onDisposeInList = this.disposeInListEmitter.event;

  /**
   * Handles changes in a list of fields to detect rename operations.
   * @param ast The AST node where the change occurred.
   * @param prev The list of fields before the change.
   * @param next The list of fields after the change.
   */
  handleFieldListChange(ast?: ASTNode, prev?: BaseVariableField[], next?: BaseVariableField[]) {
    // 1. Check if a rename is possible.
    if (!ast || !prev?.length || !next?.length) {
      this.notifyFieldsDispose(prev, next);
      return;
    }

    // 2. The lengths of the lists must be the same for a rename.
    if (prev.length !== next.length) {
      this.notifyFieldsDispose(prev, next);
      return;
    }

    let renameNodeInfo: RenameInfo | null = null;
    let existFieldChanged = false;

    for (const [index, prevField] of prev.entries()) {
      const nextField = next[index];

      if (prevField.key !== nextField.key) {
        // Only one rename is allowed at a time.
        if (existFieldChanged) {
          this.notifyFieldsDispose(prev, next);
          return;
        }
        existFieldChanged = true;

        if (prevField.type?.kind === nextField.type?.kind) {
          renameNodeInfo = { before: prevField, after: nextField };
        }
      }
    }

    if (!renameNodeInfo) {
      this.notifyFieldsDispose(prev, next);
      return;
    }

    this.renameEmitter.fire(renameNodeInfo);
  }

  /**
   * Notifies listeners about fields that were removed from a list.
   * @param prev The list of fields before the change.
   * @param next The list of fields after the change.
   */
  notifyFieldsDispose(prev?: BaseVariableField[], next?: BaseVariableField[]) {
    const removedFields = difference(prev || [], next || []);
    removedFields.forEach((_field) => this.disposeInListEmitter.fire(_field));
  }

  @postConstruct()
  init() {
    this.toDispose.pushAll([
      this.variableEngine.onGlobalEvent<VariableDeclarationListChangeAction>(
        'VariableListChange',
        (_action) => {
          this.handleFieldListChange(_action.ast, _action.payload?.prev, _action.payload?.next);
        }
      ),
      this.variableEngine.onGlobalEvent<ObjectPropertiesChangeAction>(
        'ObjectPropertiesChange',
        (_action) => {
          this.handleFieldListChange(_action.ast, _action.payload?.prev, _action.payload?.next);
        }
      ),
    ]);
  }

  @preDestroy()
  dispose() {
    this.toDispose.dispose();
  }
}
