/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { set, uniqBy } from 'lodash-es';
import { JsonSchemaUtils } from '@flowgram.ai/json-schema';
import {
  ASTFactory,
  createEffectFromVariableProvider,
  defineFormPluginCreator,
  FlowNodeRegistry,
  getNodeScope,
} from '@flowgram.ai/editor';

import { IFlowRefValue, IFlowValue } from '@/shared';

type AssignValueType =
  | {
      operator: 'assign';
      left?: IFlowRefValue;
      right?: IFlowValue;
    }
  | {
      operator: 'declare';
      left?: string;
      right?: IFlowValue;
    };

interface InputConfig {
  assignKey: string;
  outputKey: string;
}

export const createInferAssignPlugin = defineFormPluginCreator<InputConfig>({
  onSetupFormMeta({ addFormatOnSubmit, mergeEffect }, { assignKey, outputKey }) {
    if (!assignKey || !outputKey) {
      return;
    }

    mergeEffect({
      [assignKey]: createEffectFromVariableProvider({
        parse: (value: AssignValueType[], ctx) => {
          const declareRows = uniqBy(
            value.filter((_v) => _v.operator === 'declare' && _v.left && _v.right),
            'left'
          );

          return [
            ASTFactory.createVariableDeclaration({
              key: `${ctx.node.id}`,
              meta: {
                title: ctx.node.form?.getValueIn('title'),
                icon: ctx.node.getNodeRegistry<FlowNodeRegistry>().info?.icon,
              },
              type: ASTFactory.createObject({
                properties: declareRows.map((_v) =>
                  ASTFactory.createProperty({
                    key: _v.left as string,
                    type:
                      _v.right?.type === 'constant'
                        ? JsonSchemaUtils.schemaToAST(_v.right?.schema || {})
                        : undefined,
                    initializer:
                      _v.right?.type === 'ref'
                        ? ASTFactory.createKeyPathExpression({
                            keyPath: _v.right?.content || [],
                          })
                        : {},
                  })
                ),
              }),
            }),
          ];
        },
      }),
    });

    addFormatOnSubmit((formData, ctx) => {
      set(
        formData,
        outputKey,
        JsonSchemaUtils.astToSchema(getNodeScope(ctx.node).output.variables?.[0]?.type)
      );

      return formData;
    });
  },
});
