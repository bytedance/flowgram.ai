/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ConditionOpConfigs } from './types';

export enum ConditionPresetOp {
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

export const defaultConditionOpConfigs: ConditionOpConfigs = {
  [ConditionPresetOp.EQ]: {
    label: 'Equal',
    abbreviation: '=',
  },
  [ConditionPresetOp.NEQ]: {
    label: 'Not Equal',
    abbreviation: '≠',
  },
  [ConditionPresetOp.GT]: {
    label: 'Greater Than',
    abbreviation: '>',
  },
  [ConditionPresetOp.GTE]: {
    label: 'Greater Than or Equal',
    abbreviation: '>=',
  },
  [ConditionPresetOp.LT]: {
    label: 'Less Than',
    abbreviation: '<',
  },
  [ConditionPresetOp.LTE]: {
    label: 'Less Than or Equal',
    abbreviation: '<=',
  },
  [ConditionPresetOp.IN]: {
    label: 'In',
    abbreviation: '∈',
  },
  [ConditionPresetOp.NIN]: {
    label: 'Not In',
    abbreviation: '∉',
  },
  [ConditionPresetOp.CONTAINS]: {
    label: 'Contains',
    abbreviation: '⊇',
  },
  [ConditionPresetOp.NOT_CONTAINS]: {
    label: 'Not Contains',
    abbreviation: '⊉',
  },
  [ConditionPresetOp.IS_EMPTY]: {
    label: 'Is Empty',
    abbreviation: '=',
    rightDisplay: 'Empty',
  },
  [ConditionPresetOp.IS_NOT_EMPTY]: {
    label: 'Is Not Empty',
    abbreviation: '≠',
    rightDisplay: 'Empty',
  },
  [ConditionPresetOp.IS_TRUE]: {
    label: 'Is True',
    abbreviation: '=',
    rightDisplay: 'True',
  },
  [ConditionPresetOp.IS_FALSE]: {
    label: 'Is False',
    abbreviation: '=',
    rightDisplay: 'False',
  },
};
