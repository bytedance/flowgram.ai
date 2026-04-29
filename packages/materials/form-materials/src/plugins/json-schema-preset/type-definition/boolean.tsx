/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { I18n } from '@flowgram.ai/editor';
import { Select } from '@douyinfe/semi-ui';

import { ConditionPresetOp } from '@/components/condition-context/op';

import { type JsonSchemaTypeRegistry } from '../types';

export const booleanRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'boolean',
  ConstantRenderer: (props) => {
    const { value, onChange, readonly, schema, ...rest } = props;
    return (
      <Select
        placeholder={I18n.t('Please Select Boolean')}
        size="small"
        disabled={readonly}
        optionList={[
          { label: I18n.t('True'), value: 1 },
          { label: I18n.t('False'), value: 0 },
        ]}
        value={value ? 1 : 0}
        onChange={(value) => onChange?.(!!value)}
        {...rest}
      />
    );
  },
  conditionRule: {
    [ConditionPresetOp.EQ]: { type: 'boolean' },
    [ConditionPresetOp.NEQ]: { type: 'boolean' },
    [ConditionPresetOp.IS_TRUE]: null,
    [ConditionPresetOp.IS_FALSE]: null,
    [ConditionPresetOp.IN]: {
      type: 'array',
      items: { type: 'boolean' },
    },
    [ConditionPresetOp.NIN]: {
      type: 'array',
      items: { type: 'boolean' },
    },
  },
};
