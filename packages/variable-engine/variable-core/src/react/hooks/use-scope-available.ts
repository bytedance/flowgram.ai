/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect } from 'react';

import { useRefresh } from '@flowgram.ai/core';

import { useCurrentScope } from '../context';
import { ScopeAvailableData } from '../../scope/datas';

/**
 * Get the available variables in the current scope.
 * 获取作用域的可访问变量
 *
 * @returns the available variables in the current scope
 */
export function useScopeAvailable(params?: { autoRefresh?: boolean }): ScopeAvailableData {
  const { autoRefresh = true } = params || {};

  const scope = useCurrentScope({ strict: true });
  const refresh = useRefresh();

  useEffect(() => {
    if (!autoRefresh) {
      return () => null;
    }

    const disposable = scope.available.onListOrAnyVarChange(() => {
      refresh();
    });

    return () => disposable.dispose();
  }, [autoRefresh]);

  return scope.available;
}
