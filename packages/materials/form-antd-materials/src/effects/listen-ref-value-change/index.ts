/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  BaseVariableField,
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
 *     'inputsValues.*': listenRefValueChange(({ name, variable, form }) => {
 *       const schema = JsonSchemaUtils.astToSchema(variable?.type);
 *       form.setValueIn(`${name}.schema`, schema);
 *     })
 *   }
 * }
 * @param cb
 * @returns
 */
export const listenRefValueChange = (
  cb: (props: EffectFuncProps<IFlowRefValue> & { variable?: BaseVariableField }) => void
): EffectOptions[] => [
  {
    event: DataEvent.onValueInitOrChange,
    effect: ((params) => {
      const { context, value } = params;

      if (value?.type !== 'ref') {
        return () => null;
      }

      const disposable = getNodeScope(context.node).available.trackByKeyPath(
        value?.content || [],
        (v) => {
          cb({ ...params, variable: v });
        }
      );
      return () => {
        disposable.dispose();
      };
    }) as Effect,
  },
];
