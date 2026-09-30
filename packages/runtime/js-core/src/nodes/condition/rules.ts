/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { ConditionOperator, WorkflowVariableType } from '@flowgram.ai/runtime-interface';

import { ConditionRules } from './type';

export const conditionRules: ConditionRules = {
  [WorkflowVariableType.String]: {
    [ConditionOperator.EQ]: WorkflowVariableType.String,
    [ConditionOperator.NEQ]: WorkflowVariableType.String,
    [ConditionOperator.CONTAINS]: WorkflowVariableType.String,
    [ConditionOperator.NOT_CONTAINS]: WorkflowVariableType.String,
    [ConditionOperator.IN]: WorkflowVariableType.Array,
    [ConditionOperator.NIN]: WorkflowVariableType.Array,
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Number]: {
    [ConditionOperator.EQ]: WorkflowVariableType.Number,
    [ConditionOperator.NEQ]: WorkflowVariableType.Number,
    [ConditionOperator.GT]: WorkflowVariableType.Number,
    [ConditionOperator.GTE]: WorkflowVariableType.Number,
    [ConditionOperator.LT]: WorkflowVariableType.Number,
    [ConditionOperator.LTE]: WorkflowVariableType.Number,
    [ConditionOperator.IN]: WorkflowVariableType.Array,
    [ConditionOperator.NIN]: WorkflowVariableType.Array,
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Integer]: {
    [ConditionOperator.EQ]: WorkflowVariableType.Integer,
    [ConditionOperator.NEQ]: WorkflowVariableType.Integer,
    [ConditionOperator.GT]: WorkflowVariableType.Integer,
    [ConditionOperator.GTE]: WorkflowVariableType.Integer,
    [ConditionOperator.LT]: WorkflowVariableType.Integer,
    [ConditionOperator.LTE]: WorkflowVariableType.Integer,
    [ConditionOperator.IN]: WorkflowVariableType.Array,
    [ConditionOperator.NIN]: WorkflowVariableType.Array,
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Boolean]: {
    [ConditionOperator.EQ]: WorkflowVariableType.Boolean,
    [ConditionOperator.NEQ]: WorkflowVariableType.Boolean,
    [ConditionOperator.IS_TRUE]: WorkflowVariableType.Null,
    [ConditionOperator.IS_FALSE]: WorkflowVariableType.Null,
    [ConditionOperator.IN]: WorkflowVariableType.Array,
    [ConditionOperator.NIN]: WorkflowVariableType.Array,
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Object]: {
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Map]: {
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.DateTime]: {
    [ConditionOperator.EQ]: WorkflowVariableType.DateTime,
    [ConditionOperator.NEQ]: WorkflowVariableType.DateTime,
    [ConditionOperator.GT]: WorkflowVariableType.DateTime,
    [ConditionOperator.GTE]: WorkflowVariableType.DateTime,
    [ConditionOperator.LT]: WorkflowVariableType.DateTime,
    [ConditionOperator.LTE]: WorkflowVariableType.DateTime,
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Array]: {
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
  [WorkflowVariableType.Null]: {
    [ConditionOperator.EQ]: WorkflowVariableType.Null,
    [ConditionOperator.IS_EMPTY]: WorkflowVariableType.Null,
    [ConditionOperator.IS_NOT_EMPTY]: WorkflowVariableType.Null,
  },
};
