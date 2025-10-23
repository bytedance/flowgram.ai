/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';

import { useRefresh, useService } from '@flowgram.ai/core';

import { useCurrentScope } from '../context';
import { VariableEngine } from '../../variable-engine';
import { VariableDeclaration } from '../../ast';

/**
 * Get available variable list in the current scope.
 *
 * - If no scope, return global variable list.
 * - The hook is reactive to variable list or any variables change.
 */
export function useAvailableVariables(): VariableDeclaration[] {
  const scope = useCurrentScope();
  const variableEngine: VariableEngine = useService(VariableEngine);

  const refresh = useRefresh();

  useEffect(() => {
    // 没有作用域时，监听全局变量表
    if (!scope) {
      const disposable = variableEngine.globalVariableTable.onListOrAnyVarChange(() => {
        refresh();
      });

      return () => disposable.dispose();
    }

    const disposable = scope.available.onDataChange(() => {
      refresh();
    });

    return () => disposable.dispose();
  }, []);

  // 没有作用域时，使用全局变量表
  return scope ? scope.available.variables : variableEngine.globalVariableTable.variables;
}
