/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { createContext, useContext, useMemo } from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { BaseVariableField } from '@flowgram.ai/editor';

type VariableField = BaseVariableField<{
  icon?: string | JSX.Element;
  title?: string;
  disabled?: boolean;
}>;

export const VariableSelectorContext = createContext<{
  includeSchema?: IJsonSchema | IJsonSchema[];
  excludeSchema?: IJsonSchema | IJsonSchema[];
  skipVariable?: (variable: VariableField) => boolean;
}>({});

export const useVariableSelectorContext = () => useContext(VariableSelectorContext);

export const VariableSelectorProvider = ({
  children,
  skipVariable,
  includeSchema,
  excludeSchema,
}: {
  skipVariable?: (variable?: BaseVariableField) => boolean;
  includeSchema?: IJsonSchema | IJsonSchema[];
  excludeSchema?: IJsonSchema | IJsonSchema[];
  children: React.ReactNode;
}) => {
  const context = useMemo(
    () => ({
      skipVariable,
      includeSchema,
      excludeSchema,
    }),
    [skipVariable, includeSchema, excludeSchema]
  );

  return (
    <VariableSelectorContext.Provider value={context}>{children}</VariableSelectorContext.Provider>
  );
};
