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
  arrayIcon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.6139 1.58105H0V14.4186H3.6139V13.1264H1.36702V2.87326H3.6139V1.58105ZM3.41656 13.3266V13.3264H1.16987V13.3266H3.41656ZM0.197537 14.2186H0.197344V1.78105H3.41656V1.78125H0.197537V14.2186ZM16 1.58105H12.3861V2.87326H14.633V13.1264H12.3861V14.4186H16V1.58105ZM12.5834 1.78105V2.67326H12.5836V1.78125H15.8027V1.78105H12.5834ZM12.5836 14.2186V13.3266H14.8305V2.67345H14.8303V13.3264H12.5834V14.2186H12.5836Z"
        fill="currentColor"
      />
      <path
        d="M6.01442 7.34421C5.89401 7.46462 5.89401 7.65985 6.01442 7.78026L7.78218 9.54802C7.9026 9.66844 8.09782 9.66844 8.21823 9.54802L9.986 7.78026C10.1064 7.65985 10.1064 7.46462 9.986 7.34421L9.69137 7.04958C9.57096 6.92917 9.37573 6.92917 9.25532 7.04958L8.00021 8.3047L6.74509 7.04958C6.62468 6.92917 6.42946 6.92917 6.30904 7.04958L6.01442 7.34421ZM3.31699 7.99984C3.31699 10.5864 5.41379 12.6832 8.00033 12.6832C10.5869 12.6832 12.6837 10.5864 12.6837 7.99984C12.6837 5.4133 10.5869 3.3165 8.00033 3.3165C5.41379 3.3165 3.31699 5.4133 3.31699 7.99984ZM11.6503 7.99984C11.6503 10.0157 10.0162 11.6498 8.00033 11.6498C5.98449 11.6498 4.35033 10.0157 4.35033 7.99984C4.35033 5.984 5.98449 4.34984 8.00033 4.34984C10.0162 4.34984 11.6503 5.984 11.6503 7.99984Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.2"
      />
    </svg>
  ),
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
