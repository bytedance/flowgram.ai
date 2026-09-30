/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema } from '@flowgram.ai/json-schema';

import { IFlowConstantRefValue } from '@/shared';

export interface DBConditionRowValueType {
  left?: string;
  operator?: string;
  right?: IFlowConstantRefValue;
}

export interface DBConditionOptionType {
  label: string | JSX.Element;
  value: string;
  schema: IJsonSchema;
}
