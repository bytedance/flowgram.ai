/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useContext } from 'react';

import { IConditionRule, ConditionOpConfigs } from './types';
import { defaultConditionOpConfigs } from './op';

interface ContextType {
  rules?: Record<string, IConditionRule>;
  ops?: ConditionOpConfigs;
}

export const ConditionContext = createContext<ContextType>({
  rules: {},
  ops: defaultConditionOpConfigs,
});

export const ConditionProvider = (props: React.PropsWithChildren<ContextType>) => {
  const { rules, ops } = props;
  return (
    <ConditionContext.Provider value={{ rules, ops }}>{props.children}</ConditionContext.Provider>
  );
};

export const useConditionContext = () => useContext(ConditionContext);
