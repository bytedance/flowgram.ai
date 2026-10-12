/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  DataEvent,
  Effect,
  EffectOptions,
  FlowNodeRegistry,
  FlowNodeVariableData,
} from '@flowgram.ai/editor';

export const syncVariableTitle: EffectOptions[] = [
  {
    event: DataEvent.onValueChange,
    effect: (({ value, context }) => {
      context.node.getData(FlowNodeVariableData).allScopes.forEach((_scope) => {
        _scope.output.variables.forEach((_var) => {
          _var.updateMeta({
            ...(_var.meta || {}),
            title: value || context.node.id,
            icon: context.node.getNodeRegistry<FlowNodeRegistry>().info?.icon,
          });
        });
      });
    }) as Effect,
  },
];
