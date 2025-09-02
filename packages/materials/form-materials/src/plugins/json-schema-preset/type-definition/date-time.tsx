/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { DatePicker } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../manager';

export const dateTimeRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'date-time',
  ConstantRenderer: (props) => (
    <DatePicker
      size="small"
      type="dateTime"
      density="compact"
      style={{ width: '100%', ...(props.style || {}) }}
      disabled={props.readonly}
      {...props}
    />
  ),
};
