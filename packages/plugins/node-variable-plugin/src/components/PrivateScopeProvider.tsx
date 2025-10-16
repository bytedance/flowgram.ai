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
 * PrivateScopeProvider provides the private scope to its children via context.
 */
export const PrivateScopeProvider = ({ children }: VariableProviderProps) => {
  const node = useEntityFromContext();

  const privateScope: Scope = useMemo(() => {
    const variableData: FlowNodeVariableData = node.getData(FlowNodeVariableData);
    if (!variableData.private) {
      variableData.initPrivate();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return variableData.private!;
  }, [node]);

  return <ScopeProvider scope={privateScope}>{children}</ScopeProvider>;
};
