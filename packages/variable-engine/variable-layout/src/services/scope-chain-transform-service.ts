import { inject, injectable, optional } from 'inversify';
import { Scope, VariableEngine } from '@flowgram.ai/variable-core';
import { FlowDocument } from '@flowgram.ai/document';
import { lazyInject } from '@flowgram.ai/core';

import { VariableLayoutConfig } from '../variable-layout-config';
import { FlowNodeScope } from '../types';

export interface TransformerContext {
  scope: FlowNodeScope;
  document: FlowDocument;
  variableEngine: VariableEngine;
}

export type IScopeTransformer = (scopes: Scope[], ctx: TransformerContext) => Scope[];

@injectable()
export class ScopeChainTransformService {
  protected transformDepsFns: IScopeTransformer[] = [];

  protected transformCoversFns: IScopeTransformer[] = [];

  @lazyInject(FlowDocument) document: FlowDocument;

  @lazyInject(VariableEngine) variableEngine: VariableEngine;

  constructor(
    @optional()
    @inject(VariableLayoutConfig)
    protected configs?: VariableLayoutConfig
  ) {
    if (this.configs?.transformDeps) {
      this.transformDepsFns.push(this.configs.transformDeps);
    }
    if (this.configs?.transformCovers) {
      this.transformCoversFns.push(this.configs.transformCovers);
    }
  }

  registerTransformDeps(transformer: IScopeTransformer) {
    this.transformDepsFns.push(transformer);
  }

  registerTransformCovers(transformer: IScopeTransformer) {
    this.transformCoversFns.push(transformer);
  }

  transformDeps(scopes: Scope[], { scope }: { scope: Scope }): Scope[] {
    return this.transformDepsFns.reduce(
      (scopes, transformer) =>
        transformer(scopes, {
          scope,
          document: this.document,
          variableEngine: this.variableEngine,
        }),
      scopes
    );
  }

  transformCovers(scopes: Scope[], { scope }: { scope: Scope }): Scope[] {
    return this.transformCoversFns.reduce(
      (scopes, transformer) =>
        transformer(scopes, {
          scope,
          document: this.document,
          variableEngine: this.variableEngine,
        }),
      scopes
    );
  }
}
