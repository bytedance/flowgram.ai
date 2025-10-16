/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { interfaces } from 'inversify';

import { type ASTNode } from '../ast-node';

export const injectToAST = (serviceIdentifier: interfaces.ServiceIdentifier) =>
  function (target: any, propertyKey: string) {
    if (!serviceIdentifier) {
      throw new Error(
        `ServiceIdentifier ${serviceIdentifier} in @lazyInject is Empty, it might be caused by file circular dependency, please check it.`
      );
    }

    const descriptor = {
      get() {
        const container = (this as ASTNode).scope.variableEngine.container;
        return container.get(serviceIdentifier);
      },
      set() {},
      configurable: true,
      enumerable: true,
    } as any;

    // Object.defineProperty(target, propertyKey, descriptor);

    return descriptor;
  };

export const POST_CONSTRUCT_AST_SYMBOL = Symbol('post_construct_ast');

export const postConstructAST = () => (target: any, propertyKey: string) => {
  // Only run once.
  if (!Reflect.hasMetadata(POST_CONSTRUCT_AST_SYMBOL, target)) {
    Reflect.defineMetadata(POST_CONSTRUCT_AST_SYMBOL, propertyKey, target);
  } else {
    throw Error('Duplication Post Construct AST');
  }
};
