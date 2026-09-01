/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import {
  type IJsonSchema,
  useTypeManager as useOriginTypeManager,
  TypePresetProvider as OriginTypePresetProvider,
  JsonSchemaTypeManager,
} from '@flowgram.ai/json-schema';

import { type JsonSchemaTypeRegistry } from './types';
import { initRegistries, jsonSchemaTypePreset } from './type-definition';

// If you want to use new type Manager, init registries
initRegistries();

export const useTypeManager = () =>
  useOriginTypeManager() as JsonSchemaTypeManager<IJsonSchema, JsonSchemaTypeRegistry>;

export const JsonSchemaTypePresetProvider = ({
  types = [],
  children,
}: React.PropsWithChildren<{ types: JsonSchemaTypeRegistry[] }>) => (
  <OriginTypePresetProvider types={[...jsonSchemaTypePreset, ...types]}>
    {children}
  </OriginTypePresetProvider>
);
