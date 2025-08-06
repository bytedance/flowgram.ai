/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { I18n } from '@flowgram.ai/editor';
import { InputNumber } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../manager';

export const numberRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'number',
  ConstantRenderer: (props) => (
    <InputNumber
      placeholder={I18n.t('Please Input Number')}
      size="small"
      disabled={props.readonly}
      hideButtons
      {...props}
    />
  ),
};
