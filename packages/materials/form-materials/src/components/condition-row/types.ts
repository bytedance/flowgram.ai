/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IFlowConstantRefValue, IFlowRefValue } from '../../typings';

export enum Op {
  EQ = 'eq',
  NEQ = 'neq',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  IN = 'in',
  NIN = 'nin',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  IS_EMPTY = 'is_empty',
  IS_NOT_EMPTY = 'is_not_empty',
  IS_TRUE = 'is_true',
  IS_FALSE = 'is_false',
}

export interface OpConfig {
  label: string;
  abbreviation: string;
  // When right is not a value, display this text
  rightDisplay?: string;
}

export type OpConfigs = Record<string, OpConfig>;

export type IRule = Partial<Record<string, string | null>>;

export type IRules = Record<string, IRule>;

export interface ConditionRowValueType {
  left?: IFlowRefValue;
  operator?: string;
  right?: IFlowConstantRefValue;
}
