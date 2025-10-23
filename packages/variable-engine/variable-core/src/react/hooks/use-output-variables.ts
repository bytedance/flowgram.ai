/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';

import { useRefresh } from '@flowgram.ai/core';

import { useCurrentScope } from '../context';
import { VariableDeclaration } from '../../ast';

/**
 * Get output variable list in the current scope.
 *
 * - The hook is reactive to variable list or any variables change.
 */
export function useOutputVariables(): VariableDeclaration[] {
  const scope = useCurrentScope();

  const refresh = useRefresh();

  useEffect(() => {
    if (!scope) {
      throw new Error(
        '[useOutputVariables]: No scope found, useOutputVariables must be used in <ScopeProvider>'
      );
    }

    const disposable = scope.output.onListOrAnyVarChange(() => {
      refresh();
    });

    return () => disposable.dispose();
  }, []);

  return scope.output.variables;
}
