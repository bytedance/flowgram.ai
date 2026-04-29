/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { I18n } from '@flowgram.ai/editor';
import { InputNumber } from '@douyinfe/semi-ui';

import { ConditionPresetOp } from '@/components/condition-context/op';

import { type JsonSchemaTypeRegistry } from '../types';

export const numberRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'number',
  ConstantRenderer: ({ readonly, schema, ...rest }) => (
    <InputNumber
      placeholder={I18n.t('Please Input Number')}
      size="small"
      disabled={readonly}
      hideButtons
      {...rest}
    />
  ),
  conditionRule: {
    [ConditionPresetOp.EQ]: { type: 'number' },
    [ConditionPresetOp.NEQ]: { type: 'number' },
    [ConditionPresetOp.GT]: { type: 'number' },
    [ConditionPresetOp.GTE]: { type: 'number' },
    [ConditionPresetOp.LT]: { type: 'number' },
    [ConditionPresetOp.LTE]: { type: 'number' },
    [ConditionPresetOp.IN]: {
      type: 'array',
      extra: { weak: true },
    },
    [ConditionPresetOp.NIN]: {
      type: 'array',
      extra: { weak: true },
    },
  },
};
