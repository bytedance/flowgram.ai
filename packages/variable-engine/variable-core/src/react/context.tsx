/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */

import React, { createContext, useContext } from 'react';

import { Scope } from '../scope';

interface ScopeContextProps {
  scope: Scope;
}

const ScopeContext = createContext<ScopeContextProps>(null!);

/**
 * ScopeProvider provides the scope to its children via context.
 */
export const ScopeProvider = (
  props: React.PropsWithChildren<{
    /**
     * scope used in the context
     */
    scope?: Scope;
    /**
     * @deprecated use scope prop instead, this is kept for backward compatibility
     */
    value?: ScopeContextProps;
  }>
) => {
  const { scope, value, children } = props;

  const scopeToUse = scope || value?.scope;

  if (!scopeToUse) {
    throw new Error('[ScopeProvider] scope is required');
  }

  return <ScopeContext.Provider value={{ scope: scopeToUse }}>{children}</ScopeContext.Provider>;
};

/**
 * useCurrentScope returns the scope provided by ScopeProvider.
 * @returns
 */
export const useCurrentScope = <Strict extends boolean = false>(params?: {
  /**
   * whether to throw error when no scope in ScopeProvider is found
   */
  strict: Strict;
}): Strict extends true ? Scope : Scope | undefined => {
  const { strict = false } = params || {};

  const context = useContext(ScopeContext);

  if (!context) {
    if (strict) {
      throw new Error('useCurrentScope must be used within a <ScopeProvider scope={scope}>');
    }
    console.warn('useCurrentScope should be used within a <ScopeProvider scope={scope}>');
  }

  return context?.scope;
};
