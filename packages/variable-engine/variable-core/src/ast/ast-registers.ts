/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { omit } from 'lodash-es';
import { injectable } from 'inversify';

import { POST_CONSTRUCT_AST_SYMBOL } from './utils/inversify';
import { ASTKindType, ASTNodeJSON, CreateASTParams, NewASTAction } from './types';
import { ArrayType } from './type/array';
import {
  BooleanType,
  CustomType,
  IntegerType,
  MapType,
  NumberType,
  ObjectType,
  StringType,
} from './type';
import { EnumerateExpression, KeyPathExpression, WrapArrayExpression } from './expression';
import { Property, VariableDeclaration, VariableDeclarationList } from './declaration';
import { DataNode, MapNode } from './common';
import { ASTNode, ASTNodeRegistry } from './ast-node';

type DataInjector = () => Record<string, any>;

/**
 * Register the AST node to the engine.
 */
@injectable()
export class ASTRegisters {
  protected injectors: Map<ASTKindType, DataInjector> = new Map();

  protected astMap: Map<ASTKindType, ASTNodeRegistry> = new Map();

  /**
   * Core AST node registration.
   */
  constructor() {
    this.registerAST(StringType);
    this.registerAST(NumberType);
    this.registerAST(BooleanType);
    this.registerAST(IntegerType);
    this.registerAST(ObjectType);
    this.registerAST(ArrayType);
    this.registerAST(MapType);
    this.registerAST(CustomType);
    this.registerAST(Property);
    this.registerAST(VariableDeclaration);
    this.registerAST(VariableDeclarationList);
    this.registerAST(KeyPathExpression);

    this.registerAST(EnumerateExpression);
    this.registerAST(WrapArrayExpression);
    this.registerAST(MapNode);
    this.registerAST(DataNode);
  }

  /**
   * Creates an AST node.
   * @param param Creation parameters.
   * @returns
   */
  createAST<ReturnNode extends ASTNode = ASTNode>(
    json: ASTNodeJSON,
    { parent, scope }: CreateASTParams
  ): ReturnNode {
    const Registry = this.astMap.get(json.kind!);

    if (!Registry) {
      throw Error(`ASTKind: ${String(json.kind)} can not find its ASTNode Registry`);
    }

    const injector = this.injectors.get(json.kind!);

    const node = new Registry(
      {
        key: json.key,
        scope,
        parent,
      },
      injector?.() || {}
    ) as ReturnNode;

    // Do not trigger fireChange during initial creation.
    node.changeLocked = true;
    node.fromJSON(omit(json, ['key', 'kind']));
    node.changeLocked = false;

    node.dispatchGlobalEvent<NewASTAction>({ type: 'NewAST' });

    if (Reflect.hasMetadata(POST_CONSTRUCT_AST_SYMBOL, node)) {
      const postConstructKey = Reflect.getMetadata(POST_CONSTRUCT_AST_SYMBOL, node);
      (node[postConstructKey] as () => void)?.();
    }

    return node;
  }

  /**
   * Gets the node Registry by AST node type.
   * @param kind
   * @returns
   */
  getASTRegistryByKind(kind: ASTKindType) {
    return this.astMap.get(kind);
  }

  /**
   * Registers an AST node.
   * @param ASTNode
   * @param injector
   */
  registerAST(ASTNode: ASTNodeRegistry, injector?: DataInjector) {
    this.astMap.set(ASTNode.kind, ASTNode);
    if (injector) {
      this.injectors.set(ASTNode.kind, injector);
    }
  }
}
