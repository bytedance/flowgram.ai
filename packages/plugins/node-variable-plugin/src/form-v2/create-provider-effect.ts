/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FlowNodeVariableData, type Scope, ASTKind } from '@flowgram.ai/variable-plugin';
import { DataEvent, type Effect, type EffectOptions } from '@flowgram.ai/node';
import { FlowNodeEntity } from '@flowgram.ai/document';

import { type VariableProviderAbilityOptions } from '../types';

/**
 * 根据 VariableProvider 生成 FormV2 的 Effect
 * @param options
 * @returns
 */
export function createEffectFromVariableProvider(
  options: VariableProviderAbilityOptions
): EffectOptions[] {
  const getScope = (node: FlowNodeEntity): Scope => {
    const variableData: FlowNodeVariableData = node.getData(FlowNodeVariableData);

    if (options.private || options.scope === 'private') {
      return variableData.initPrivate();
    }
    return variableData.public;
  };

  const transformValueToAST: Effect = ({ value, name, context, formValues, form }) => {
    if (!context) {
      return;
    }
    const { node } = context;
    const scope = getScope(node);

    const parsedValue = options.parse(value, {
      node,
      scope,
      options,
      name,
      formValues,
      form,
    });

    // Fix: When parsedValue is not an array, transform it to array
    scope.ast.set(options.namespace || name || '', {
      kind: ASTKind.VariableDeclarationList,
      declarations: Array.isArray(parsedValue) ? parsedValue : [parsedValue],
    });
  };

  return [
    {
      event: DataEvent.onValueInit,
      effect: ((params) => {
        const { context } = params;

        const scope = getScope(context.node);
        const disposable = options.onInit?.({
          node: context.node,
          scope,
          options,
          name: params.name,
          formValues: params.formValues,
          form: params.form,
        });

        transformValueToAST(params);

        return () => {
          disposable?.dispose();
        };
      }) as Effect,
    },
    {
      event: DataEvent.onValueChange,
      effect: ((params) => {
        transformValueToAST(params);
      }) as Effect,
    },
  ];
}
