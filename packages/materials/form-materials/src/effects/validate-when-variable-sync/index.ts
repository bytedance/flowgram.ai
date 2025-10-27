/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  DataEvent,
  Effect,
  EffectOptions,
  getNodeScope,
  getNodePrivateScope,
} from '@flowgram.ai/editor';

export const validateWhenVariableSync = ({
  scope,
}: {
  scope?: 'private' | 'public';
} = {}): EffectOptions[] => [
  {
    event: DataEvent.onValueInit,
    effect: (({ context, form, name }) => {
      const nodeScope =
        scope === 'private' ? getNodePrivateScope(context.node) : getNodeScope(context.node);

      const disposable = nodeScope.available.onListOrAnyVarChange(() => {
        const errorKeys = Object.entries(form.state.errors || {})
          .filter(([_, errors]) => errors?.length > 0)
          .filter(([key]) => key.startsWith(name) || name.startsWith(key))
          .map(([key]) => key);

        if (errorKeys.length > 0) {
          form.validate();
        }
      });

      return () => disposable.dispose();
    }) as Effect,
  },
];
