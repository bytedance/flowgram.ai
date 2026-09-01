/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { I18n } from '@flowgram.ai/editor';

import { ConditionPresetOp } from '@/components/condition-context/op';
import { JsonCodeEditor } from '@/components/code-editor';

import { type JsonSchemaTypeRegistry } from '../types';

export const arrayRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'array',
  ConstantRenderer: (props) => (
    <JsonCodeEditor
      mini
      value={props.value}
      onChange={(v) => props.onChange?.(v)}
      placeholder={I18n.t('Please Input Array')}
      readonly={props.readonly}
    />
  ),
  conditionRule: {
    [ConditionPresetOp.IS_EMPTY]: null,
    [ConditionPresetOp.IS_NOT_EMPTY]: null,
    [ConditionPresetOp.CONTAINS]: { type: 'array', extra: { weak: true } },
    [ConditionPresetOp.NOT_CONTAINS]: { type: 'array', extra: { weak: true } },
    [ConditionPresetOp.EQ]: { type: 'array', extra: { weak: true } },
    [ConditionPresetOp.NEQ]: { type: 'array', extra: { weak: true } },
  },
};
