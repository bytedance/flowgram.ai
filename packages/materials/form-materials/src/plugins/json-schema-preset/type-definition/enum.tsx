/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Select } from '@douyinfe/semi-ui';

import { type JsonSchemaTypeRegistry } from '../types';

export const enumRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'enum',
  parentType: [],
  ConstantRenderer: (props) => {
    const { schema, readonly, enableMultiLineStr, ...rest } = props;

    return (
      <Select
        size="small"
        disabled={readonly}
        optionList={(schema?.enum || []).map((value) => ({
          label: `${value}`,
          value,
        }))}
        {...rest}
      />
    );
  },
};
