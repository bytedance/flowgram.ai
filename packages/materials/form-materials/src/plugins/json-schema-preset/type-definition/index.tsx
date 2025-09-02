/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { jsonSchemaTypeManager } from '@flowgram.ai/json-schema';

import { stringRegistry } from './string';
import { objectRegistry } from './object';
import { numberRegistry } from './number';
import { integerRegistry } from './integer';
import { dateTimeRegistry } from './date-time';
import { booleanRegistry } from './boolean';
import { arrayRegistry } from './array';

export const jsonSchemaTypePreset = [
  stringRegistry,
  objectRegistry,
  numberRegistry,
  integerRegistry,
  booleanRegistry,
  arrayRegistry,
  dateTimeRegistry,
];

jsonSchemaTypePreset.forEach((_type) => jsonSchemaTypeManager.register(_type));
