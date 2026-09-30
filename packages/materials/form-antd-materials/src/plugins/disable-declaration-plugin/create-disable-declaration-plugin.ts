/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  ASTMatch,
  definePluginCreator,
  type GlobalEventActionType,
  VariableEngine,
} from '@flowgram.ai/editor';

export const createDisableDeclarationPlugin = definePluginCreator<void>({
  onInit(ctx) {
    const variableEngine = ctx.get(VariableEngine);

    const handleEvent = (action: GlobalEventActionType) => {
      if (ASTMatch.isVariableDeclaration(action.ast)) {
        if (!action.ast.meta?.disabled) {
          action.ast.updateMeta({
            ...(action.ast.meta || {}),
            disabled: true,
          });
        }
      }
    };

    variableEngine.onGlobalEvent('NewAST', handleEvent);
    variableEngine.onGlobalEvent('UpdateAST', handleEvent);
  },
});
