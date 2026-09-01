/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { set } from 'lodash-es';
import { JsonSchemaUtils } from '@flowgram.ai/json-schema';
import {
  ASTFactory,
  createEffectFromVariableProvider,
  defineFormPluginCreator,
  FlowNodeRegistry,
  getNodePrivateScope,
  getNodeScope,
  ScopeChainTransformService,
  type EffectOptions,
  type FormPluginCreator,
  FlowNodeScopeType,
} from '@flowgram.ai/editor';

import { IFlowRefValue } from '@/shared';

export const provideBatchOutputsEffect: EffectOptions[] = createEffectFromVariableProvider({
  parse: (value: Record<string, IFlowRefValue>, ctx) => [
    ASTFactory.createVariableDeclaration({
      key: `${ctx.node.id}`,
      meta: {
        title: ctx.node.form?.getValueIn('title'),
        icon: ctx.node.getNodeRegistry<FlowNodeRegistry>().info?.icon,
      },
      type: ASTFactory.createObject({
        properties: Object.entries(value).map(([_key, value]) =>
          ASTFactory.createProperty({
            key: _key,
            initializer: ASTFactory.createWrapArrayExpression({
              wrapFor: ASTFactory.createKeyPathExpression({
                keyPath: value?.content || [],
              }),
            }),
          })
        ),
      }),
    }),
  ],
});

/**
 * Free Layout only right now
 */
export const createBatchOutputsFormPlugin: FormPluginCreator<{
  outputKey: string;
  /**
   * if set, infer json schema to inferTargetKey when submit
   */
  inferTargetKey?: string;
}> = defineFormPluginCreator({
  name: 'batch-outputs-plugin',
  onSetupFormMeta({ mergeEffect, addFormatOnSubmit }, { outputKey, inferTargetKey }) {
    mergeEffect({
      [outputKey]: provideBatchOutputsEffect,
    });

    if (inferTargetKey) {
      addFormatOnSubmit((formData, ctx) => {
        const outputVariable = getNodeScope(ctx.node).output.variables?.[0];

        if (outputVariable?.type) {
          set(formData, inferTargetKey, JsonSchemaUtils.astToSchema(outputVariable?.type));
        }

        return formData;
      });
    }
  },
  onInit(ctx, { outputKey }) {
    const chainTransformService = ctx.node.getService(ScopeChainTransformService);

    const batchNodeType = ctx.node.flowNodeType;

    const transformerId = `${batchNodeType}-outputs`;

    if (chainTransformService.hasTransformer(transformerId)) {
      return;
    }

    chainTransformService.registerTransformer(transformerId, {
      transformCovers: (covers, ctx) => {
        const node = ctx.scope.meta?.node;

        // Child Node's variable can cover parent
        if (node?.parent?.flowNodeType === batchNodeType) {
          return [...covers, getNodeScope(node.parent)];
        }

        return covers;
      },
      transformDeps(scopes, ctx) {
        const scopeMeta = ctx.scope.meta;

        if (scopeMeta?.type === FlowNodeScopeType.private) {
          return scopes;
        }

        const node = scopeMeta?.node;

        // Public of Loop Node depends on child Node
        if (node?.flowNodeType === batchNodeType) {
          // Get all child blocks
          const childBlocks = node.blocks;

          // public scope of all child blocks
          return [
            getNodePrivateScope(node),
            ...childBlocks.map((_childBlock) => getNodeScope(_childBlock)),
          ];
        }

        return scopes;
      },
    });
  },
});
