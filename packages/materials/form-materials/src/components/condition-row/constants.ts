/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IRules, Op, OpConfigs } from './types';

export const defaultRules: IRules = {
  string: {
    [Op.EQ]: 'string',
    [Op.NEQ]: 'string',
    [Op.CONTAINS]: 'string',
    [Op.NOT_CONTAINS]: 'string',
    [Op.IN]: 'array',
    [Op.NIN]: 'array',
    [Op.IS_EMPTY]: null,
    [Op.IS_NOT_EMPTY]: null,
  },
  number: {
    [Op.EQ]: 'number',
    [Op.NEQ]: 'number',
    [Op.GT]: 'number',
    [Op.GTE]: 'number',
    [Op.LT]: 'number',
    [Op.LTE]: 'number',
    [Op.IN]: 'array',
    [Op.NIN]: 'array',
  },
  integer: {
    [Op.EQ]: 'number',
    [Op.NEQ]: 'number',
    [Op.GT]: 'number',
    [Op.GTE]: 'number',
    [Op.LT]: 'number',
    [Op.LTE]: 'number',
    [Op.IN]: 'array',
    [Op.NIN]: 'array',
  },
  boolean: {
    [Op.EQ]: 'boolean',
    [Op.NEQ]: 'boolean',
    [Op.IS_TRUE]: null,
    [Op.IS_FALSE]: null,
    [Op.IN]: 'array',
    [Op.NIN]: 'array',
  },
  object: {
    [Op.IS_EMPTY]: null,
    [Op.IS_NOT_EMPTY]: null,
  },
  array: {
    [Op.IS_EMPTY]: null,
    [Op.IS_NOT_EMPTY]: null,
    [Op.CONTAINS]: 'array',
    [Op.NOT_CONTAINS]: 'array',
    [Op.EQ]: 'array',
    [Op.NEQ]: 'array',
  },
  map: {
    [Op.IS_EMPTY]: null,
    [Op.IS_NOT_EMPTY]: null,
  },
};

export const defaultOpConfigs: OpConfigs = {
  [Op.EQ]: {
    label: 'Equal',
    abbreviation: '=',
  },
  [Op.NEQ]: {
    label: 'Not Equal',
    abbreviation: '≠',
  },
  [Op.GT]: {
    label: 'Greater Than',
    abbreviation: '>',
  },
  [Op.GTE]: {
    label: 'Greater Than or Equal',
    abbreviation: '>=',
  },
  [Op.LT]: {
    label: 'Less Than',
    abbreviation: '<',
  },
  [Op.LTE]: {
    label: 'Less Than or Equal',
    abbreviation: '<=',
  },
  [Op.IN]: {
    label: 'In',
    abbreviation: '∈',
  },
  [Op.NIN]: {
    label: 'Not In',
    abbreviation: '∉',
  },
  [Op.CONTAINS]: {
    label: 'Contains',
    abbreviation: '⊇',
  },
  [Op.NOT_CONTAINS]: {
    label: 'Not Contains',
    abbreviation: '⊉',
  },
  [Op.IS_EMPTY]: {
    label: 'Is Empty',
    abbreviation: '=',
    rightDisplay: 'Empty',
  },
  [Op.IS_NOT_EMPTY]: {
    label: 'Is Not Empty',
    abbreviation: '≠',
    rightDisplay: 'Empty',
  },
  [Op.IS_TRUE]: {
    label: 'Is True',
    abbreviation: '=',
    rightDisplay: 'True',
  },
  [Op.IS_FALSE]: {
    label: 'Is False',
    abbreviation: '=',
    rightDisplay: 'False',
  },
};
