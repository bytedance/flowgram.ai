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

export interface TransformerContext {
  scope: FlowNodeScope;
  document: FlowDocument;
  variableEngine: VariableEngine;
}

export type IScopeTransformer = (scopes: Scope[], ctx: TransformerContext) => Scope[];

const passthrough: IScopeTransformer = (scopes, ctx) => scopes;

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
   * @param transformer
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
