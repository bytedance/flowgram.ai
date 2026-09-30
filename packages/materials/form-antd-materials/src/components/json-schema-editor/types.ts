/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema } from '@flowgram.ai/json-schema';

export interface PropertyValueType extends IJsonSchema {
  name?: string;
  key?: number;
  isPropertyRequired?: boolean;
}

export type PropertiesValueType = Pick<PropertyValueType, 'properties' | 'required'>;

export type JsonSchemaProperties = IJsonSchema['properties'];

export interface ConfigType {
  placeholder?: string;
  descTitle?: string;
  descPlaceholder?: string;
  defaultValueTitle?: string;
  defaultValuePlaceholder?: string;
  addButtonText?: string;
  jsonFormatText?: string;
}
