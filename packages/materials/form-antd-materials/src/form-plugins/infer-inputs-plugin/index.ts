/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { get, omit, set } from 'lodash-es';
import { Immer } from 'immer';
import { defineFormPluginCreator, getNodePrivateScope, getNodeScope } from '@flowgram.ai/editor';

import { FlowValueUtils } from '@/shared';

const { produce } = new Immer({ autoFreeze: false });

interface InputConfig {
  sourceKey: string;
  targetKey: string;
  scope?: 'private' | 'public';
  /**
   * For backend runtime, constant schema is redundant, so we can choose to ignore it
   */
  ignoreConstantSchema?: boolean;
}

export const createInferInputsPlugin = defineFormPluginCreator<InputConfig>({
  onSetupFormMeta(
    { addFormatOnSubmit, addFormatOnInit },
    { sourceKey, targetKey, scope, ignoreConstantSchema }
  ) {
    if (!sourceKey || !targetKey) {
      return;
    }

    addFormatOnSubmit((formData, ctx) =>
      produce(formData, (draft: any) => {
        const sourceData = get(formData, sourceKey);

        set(
          draft,
          targetKey,
          FlowValueUtils.inferJsonSchema(
            sourceData,
            scope === 'private' ? getNodePrivateScope(ctx.node) : getNodeScope(ctx.node)
          )
        );

        if (ignoreConstantSchema) {
          for (const { value, path } of FlowValueUtils.traverse(sourceData, {
            includeTypes: ['constant'],
          })) {
            if (FlowValueUtils.isConstant(value) && value?.schema) {
              set(formData, `${sourceKey}.${path}`, omit(value, ['schema']));
            }
          }
        }
      })
    );

    if (ignoreConstantSchema) {
      // Revert Schema in frontend
      addFormatOnInit((formData, ctx) => {
        const targetSchema = get(formData, targetKey);

        if (!targetSchema) {
          return formData;
        }

        // For backend data, it's not necessary to use immer
        for (const { value, pathArr } of FlowValueUtils.traverse(get(formData, sourceKey), {
          includeTypes: ['constant'],
        })) {
          if (FlowValueUtils.isConstant(value) && !value?.schema) {
            const schemaPath = pathArr.map((_item) => `properties.${_item}`).join('.');
            const schema = get(targetSchema, schemaPath);
            if (schema) {
              set(value, 'schema', schema);
            }
          }
        }

        return formData;
      });
    }
  },
});
