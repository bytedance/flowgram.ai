/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createContext, useContext } from 'react';

import { BaseVariableField } from '@flowgram.ai/editor';

export const VariableSelectorContext = createContext<{
  skipVariable?: (variable?: BaseVariableField) => boolean;
}>({});

export const useVariableSelectorContext = () => useContext(VariableSelectorContext);

export const VariableSelectorProvider = VariableSelectorContext.Provider;
