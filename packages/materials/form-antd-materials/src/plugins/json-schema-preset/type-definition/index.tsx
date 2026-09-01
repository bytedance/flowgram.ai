/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { jsonSchemaTypeManager } from '@flowgram.ai/json-schema';

import { stringRegistry } from './string';
import { objectRegistry } from './object';
import { numberRegistry } from './number';
import { mapRegistry } from './map';
import { integerRegistry } from './integer';
import { enumRegistry } from './enum';
import { dateTimeRegistry } from './date-time';
import { booleanRegistry } from './boolean';
import { arrayRegistry } from './array';
import { type JsonSchemaTypeRegistry } from '../types';

export const jsonSchemaTypePreset = [
  stringRegistry,
  objectRegistry,
  numberRegistry,
  integerRegistry,
  booleanRegistry,
  arrayRegistry,
  mapRegistry,
  enumRegistry,
  dateTimeRegistry,
];

export const initRegistries = () => {
  if ((jsonSchemaTypeManager.getTypeByName('string') as JsonSchemaTypeRegistry)?.ConstantRenderer) {
    return;
  }

  jsonSchemaTypePreset.forEach((_type) => jsonSchemaTypeManager.register(_type));
};
