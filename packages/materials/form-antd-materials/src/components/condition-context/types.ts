/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { type IJsonSchema } from '@flowgram.ai/json-schema';

export interface ConditionOpConfig {
  label: string;
  abbreviation: string;
  // When right is not a value, display this text
  rightDisplay?: string;
}

export type OpKey = string;

export type ConditionOpConfigs = Record<OpKey, ConditionOpConfig>;

export type IConditionRule = Record<OpKey, string | IJsonSchema | null>;
export type IConditionRuleFactory = (
  schema?: IJsonSchema
) => Record<OpKey, string | IJsonSchema | null>;
