/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { BaseVariableField, VariableEngine } from '@flowgram.ai/variable-core';
import { type ASTNode, ASTNodeJSON } from '@flowgram.ai/variable-core';
import { FlowNodeEntity } from '@flowgram.ai/document';
import { EntityData } from '@flowgram.ai/core';

import { FlowNodeScope, FlowNodeScopeMeta, FlowNodeScopeTypeEnum } from './types';

interface Options {
  variableEngine: VariableEngine;
}

/**
 * Manages variable data for a flow node, including public and private scopes.
 */
export class FlowNodeVariableData extends EntityData {
  static type: string = 'FlowNodeVariableData';

  declare entity: FlowNodeEntity;

  readonly variableEngine: VariableEngine;

  /**
   * Private variables can be accessed by public ones, but not the other way around.
   */
  protected _private?: FlowNodeScope;

  protected _public: FlowNodeScope;

  /**
   * The private scope of the node.
   */
  get private() {
    return this._private;
  }

  /**
   * The public scope of the node.
   */
  get public() {
    return this._public;
  }

  /**
   * Sets a variable in the public AST (Abstract Syntax Tree) with the given key and JSON value.
   *
   * @param key - The key under which the variable will be stored.
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setVar(key: string, json: ASTNodeJSON): ASTNode;

  /**
   * Sets a variable in the public AST (Abstract Syntax Tree) with the default key 'outputs'.
   *
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setVar(json: ASTNodeJSON): ASTNode;

  public setVar(arg1: string | ASTNodeJSON, arg2?: ASTNodeJSON): ASTNode {
    if (typeof arg1 === 'string' && arg2 !== undefined) {
      return this.public.ast.set(arg1, arg2);
    }

    if (typeof arg1 === 'object' && arg2 === undefined) {
      return this.public.ast.set('outputs', arg1);
    }

    throw new Error('Invalid arguments');
  }

  /**
   * Retrieves a variable from the public AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to retrieve. Defaults to 'outputs'.
   * @returns The value of the variable, or undefined if not found.
   */
  public getVar(key: string = 'outputs') {
    return this.public.ast.get(key);
  }

  /**
   * Clears a variable from the public AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to clear. Defaults to 'outputs'.
   * @returns The updated AST node.
   */
  public clearVar(key: string = 'outputs') {
    return this.public.ast.remove(key);
  }

  /**
   * Sets a variable in the private AST (Abstract Syntax Tree) with the given key and JSON value.
   *
   * @param key - The key under which the variable will be stored.
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setPrivateVar(key: string, json: ASTNodeJSON): ASTNode;

  /**
   * Sets a variable in the private AST (Abstract Syntax Tree) with the default key 'outputs'.
   *
   * @param json - The JSON value to store.
   * @returns The updated AST node.
   */
  public setPrivateVar(json: ASTNodeJSON): ASTNode;

  public setPrivateVar(arg1: string | ASTNodeJSON, arg2?: ASTNodeJSON): ASTNode {
    if (typeof arg1 === 'string' && arg2 !== undefined) {
      return this.initPrivate().ast.set(arg1, arg2);
    }

    if (typeof arg1 === 'object' && arg2 === undefined) {
      return this.initPrivate().ast.set('outputs', arg1);
    }

    throw new Error('Invalid arguments');
  }

  /**
   * Retrieves a variable from the private AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to retrieve. Defaults to 'outputs'.
   * @returns The value of the variable, or undefined if not found.
   */
  public getPrivateVar(key: string = 'outputs') {
    return this.private?.ast.get(key);
  }

  /**
   * Clears a variable from the private AST (Abstract Syntax Tree) by key.
   *
   * @param key - The key of the variable to clear. Defaults to 'outputs'.
   * @returns The updated AST node.
   */
  public clearPrivateVar(key: string = 'outputs') {
    return this.private?.ast.remove(key);
  }

  /**
   * An array containing all scopes (public and private) of the node.
   */
  get allScopes(): FlowNodeScope[] {
    const res = [];

    if (this._public) {
      res.push(this._public);
    }
    if (this._private) {
      res.push(this._private);
    }

    return res;
  }

  getDefaultData() {
    return {};
  }

  constructor(entity: FlowNodeEntity, readonly opts: Options) {
    super(entity);

    const { variableEngine } = opts || {};
    this.variableEngine = variableEngine;
    this._public = this.variableEngine.createScope(this.entity.id, {
      node: this.entity,
      type: FlowNodeScopeTypeEnum.public,
    } as FlowNodeScopeMeta);
    this.toDispose.push(this._public);
  }

  /**
   * Initializes and returns the private scope for the node.
   * If the private scope already exists, it returns the existing one.
   * @returns The private scope of the node.
   */
  initPrivate(): FlowNodeScope {
    if (!this._private) {
      this._private = this.variableEngine.createScope(`${this.entity.id}_private`, {
        node: this.entity,
        type: FlowNodeScopeTypeEnum.private,
      } as FlowNodeScopeMeta);

      this.variableEngine.chain.refreshAllChange();

      this.toDispose.push(this._private);
    }
    return this._private;
  }

  /**
   * Find a variable field by key path in the public scope by scope chain.
   * @param keyPath - The key path of the variable field.
   * @returns The variable field, or undefined if not found.
   */
  getByKeyPath(keyPath: string[]): BaseVariableField | undefined {
    return this.public.available.getByKeyPath(keyPath);
  }

  /**
   * Find a variable field by key path in the private scope by scope chain.
   * @param keyPath - The key path of the variable field.
   * @returns The variable field, or undefined if not found.
   */
  getByKeyPathInPrivate(keyPath: string[]): BaseVariableField | undefined {
    return this.private?.available.getByKeyPath(keyPath);
  }
}
