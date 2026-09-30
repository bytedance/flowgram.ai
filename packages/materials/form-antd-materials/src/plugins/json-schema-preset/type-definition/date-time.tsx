/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import dayjs from 'dayjs';
import { format } from 'date-fns';
import { DatePicker } from 'antd';

import { ConditionPresetOp } from '@/components/condition-context/op';

import { type JsonSchemaTypeRegistry } from '../types';

const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

const stringifyDateTime = (value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const date =
    value instanceof Date
      ? value
      : typeof value === 'number'
      ? new Date(value)
      : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return format(date, DATE_TIME_FORMAT);
};

export const dateTimeRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'date-time',
  ConstantRenderer: (props) => {
    const { readonly, schema, value, onChange, ...rest } = props;
    const dateValue = value ? dayjs(value as string | number | Date) : null;

    return (
      <DatePicker
        size="small"
        showTime
        style={{ width: '100%', ...(rest.style || {}) }}
        disabled={readonly}
        {...rest}
        onChange={(date) => {
          onChange?.(date ? stringifyDateTime(date.toDate()) : '');
        }}
        value={dateValue}
      />
    );
  },
  conditionRule: {
    [ConditionPresetOp.EQ]: { type: 'date-time' },
    [ConditionPresetOp.NEQ]: { type: 'date-time' },
    [ConditionPresetOp.GT]: { type: 'date-time' },
    [ConditionPresetOp.GTE]: { type: 'date-time' },
    [ConditionPresetOp.LT]: { type: 'date-time' },
    [ConditionPresetOp.LTE]: { type: 'date-time' },
    [ConditionPresetOp.IS_EMPTY]: null,
    [ConditionPresetOp.IS_NOT_EMPTY]: null,
  },
};
