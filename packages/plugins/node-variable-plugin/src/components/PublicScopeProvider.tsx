/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo } from 'react';

import { FlowNodeVariableData, type Scope, ScopeProvider } from '@flowgram.ai/variable-plugin';
import { useEntityFromContext } from '@flowgram.ai/core';

interface VariableProviderProps {
  children: React.ReactElement;
}

/**
 * PublicScopeProvider provides the public scope to its children via context.
 */
export const PublicScopeProvider = ({ children }: VariableProviderProps) => {
  const node = useEntityFromContext();

  const publicScope: Scope = useMemo(() => node.getData(FlowNodeVariableData).public, [node]);

  return <ScopeProvider scope={publicScope}>{children}</ScopeProvider>;
};
