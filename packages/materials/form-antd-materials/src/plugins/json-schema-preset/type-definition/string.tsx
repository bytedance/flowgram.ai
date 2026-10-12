/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Input } from 'antd';
import { I18n } from '@flowgram.ai/editor';

import { ConditionPresetOp } from '@/components/condition-context/op';

import { type JsonSchemaTypeRegistry } from '../types';

export const stringRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'string',
  ConstantRenderer: ({ readonly, schema, enableMultiLineStr, value, onChange, ...rest }) => {
    const commonProps = {
      ...rest,
      value,
      placeholder: I18n.t('Please Input String'),
      disabled: readonly,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        onChange?.(event.target.value),
    };

    return enableMultiLineStr ? (
      <Input.TextArea autoSize={{ minRows: 1 }} {...commonProps} />
    ) : (
      <Input size="small" {...commonProps} />
    );
  },
  conditionRule: {
    [ConditionPresetOp.EQ]: { type: 'string' },
    [ConditionPresetOp.NEQ]: { type: 'string' },
    [ConditionPresetOp.CONTAINS]: { type: 'string' },
    [ConditionPresetOp.NOT_CONTAINS]: { type: 'string' },
    [ConditionPresetOp.IN]: {
      type: 'array',
      items: { type: 'string' },
    },
    [ConditionPresetOp.NIN]: {
      type: 'array',
      items: { type: 'string' },
    },
    [ConditionPresetOp.IS_EMPTY]: null,
    [ConditionPresetOp.IS_NOT_EMPTY]: null,
  },
};
