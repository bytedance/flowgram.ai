/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema, JsonSchemaUtils } from '@flowgram.ai/json-schema';
import {
  BaseType,
  DataEvent,
  Effect,
  EffectFuncProps,
  EffectOptions,
  getNodeScope,
} from '@flowgram.ai/editor';

import { IFlowRefValue } from '@/shared';

/**
 * Example:
 * const formMeta = {
 *   effect: {
 *     'inputsValues.*': listenRefSchemaChange(({ name, schema, form }) => {
 *       form.setValueIn(`${name}.schema`, schema);
 *     })
 *   }
 * }
 * @param cb
 * @returns
 */
export const listenRefSchemaChange = (
  cb: (props: EffectFuncProps<IFlowRefValue> & { schema?: IJsonSchema }) => void
): EffectOptions[] => [
  {
    event: DataEvent.onValueInitOrChange,
    effect: ((params) => {
      const { context, value } = params;

      if (value?.type !== 'ref') {
        return () => null;
      }

      const disposable = getNodeScope(context.node).available.trackByKeyPath<BaseType | undefined>(
        value?.content || [],
        (_type) => {
          cb({ ...params, schema: JsonSchemaUtils.astToSchema(_type) });
        },
        {
          selector: (_v) => _v?.type,
        }
      );
      return () => {
        disposable.dispose();
      };
    }) as Effect,
  },
];
