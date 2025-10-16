/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { inject, injectable, optional } from 'inversify';
import { Scope, VariableEngine } from '@flowgram.ai/variable-core';
import { FlowDocument } from '@flowgram.ai/document';
import { lazyInject } from '@flowgram.ai/core';

import { VariableChainConfig } from '../variable-chain-config';
import { FlowNodeScope } from '../types';

/**
 * Context for scope transformers.
 */
export interface TransformerContext {
  /**
   * The current scope
   */
  scope: FlowNodeScope;
  /**
   * The flow document.
   */
  document: FlowDocument;
  /**
   * The variable engine.
   */
  variableEngine: VariableEngine;
}

/**
 * A function that transforms an array of scopes.
 * @param scopes The array of scopes to transform.
 * @param ctx The transformer context.
 * @returns The transformed array of scopes.
 */
export type IScopeTransformer = (scopes: Scope[], ctx: TransformerContext) => Scope[];

const passthrough: IScopeTransformer = (scopes, ctx) => scopes;

/**
 * A service for transforming scope chains.
 */
@injectable()
export class ScopeChainTransformService {
  protected transformerMap: Map<
    string,
    { transformDeps: IScopeTransformer; transformCovers: IScopeTransformer }
  > = new Map();

  @lazyInject(FlowDocument) document: FlowDocument;

  @lazyInject(VariableEngine) variableEngine: VariableEngine;

  constructor(
    @optional()
    @inject(VariableChainConfig)
    protected configs?: VariableChainConfig
  ) {
    if (this.configs?.transformDeps || this.configs?.transformCovers) {
      this.transformerMap.set('VARIABLE_LAYOUT_CONFIG', {
        transformDeps: this.configs.transformDeps || passthrough,
        transformCovers: this.configs.transformCovers || passthrough,
      });
    }
  }

  /**
   * check if transformer registered
   * @param transformerId used to identify transformer, prevent duplicated
   * @returns
   */
  hasTransformer(transformerId: string) {
    return this.transformerMap.has(transformerId);
  }

  /**
   * register new transform function
   * @param transformerId used to identify transformer, prevent duplicated transformer
   * @param transformer The transformer to register.
   */
  registerTransformer(
    transformerId: string,
    transformer: {
      transformDeps: IScopeTransformer;
      transformCovers: IScopeTransformer;
    }
  ) {
    this.transformerMap.set(transformerId, transformer);
  }

  /**
   * Transforms the dependency scopes.
   * @param scopes The array of scopes to transform.
   * @param param1 The context for the transformation.
   * @returns The transformed array of scopes.
   */
  transformDeps(scopes: Scope[], { scope }: { scope: Scope }): Scope[] {
    return Array.from(this.transformerMap.values()).reduce((scopes, transformer) => {
      if (!transformer.transformDeps) {
        return scopes;
      }

      scopes = transformer.transformDeps(scopes, {
        scope,
        document: this.document,
        variableEngine: this.variableEngine,
      });
      return scopes;
    }, scopes);
  }

  /**
   * Transforms the cover scopes.
   * @param scopes The array of scopes to transform.
   * @param param1 The context for the transformation.
   * @returns The transformed array of scopes.
   */
  transformCovers(scopes: Scope[], { scope }: { scope: Scope }): Scope[] {
    return Array.from(this.transformerMap.values()).reduce((scopes, transformer) => {
      if (!transformer.transformCovers) {
        return scopes;
      }

      scopes = transformer.transformCovers(scopes, {
        scope,
        document: this.document,
        variableEngine: this.variableEngine,
      });
      return scopes;
    }, scopes);
  }
}
