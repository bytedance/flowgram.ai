/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { JsonSchemaTypeRegistryCreator } from '../types';
import { arrayBooleanIcon } from './array-icons';

export const booleanRegistryCreator: JsonSchemaTypeRegistryCreator = () => ({
  type: 'boolean',

  label: 'Boolean',

  icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.668 4.66683H5.33463C3.49369 4.66683 2.0013 6.15921 2.0013 8.00016C2.0013 9.84111 3.49369 11.3335 5.33463 11.3335H10.668C12.5089 11.3335 14.0013 9.84111 14.0013 8.00016C14.0013 6.15921 12.5089 4.66683 10.668 4.66683ZM5.33463 3.3335C2.75731 3.3335 0.667969 5.42283 0.667969 8.00016C0.667969 10.5775 2.75731 12.6668 5.33463 12.6668H10.668C13.2453 12.6668 15.3346 10.5775 15.3346 8.00016C15.3346 5.42283 13.2453 3.3335 10.668 3.3335H5.33463Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66797 8.00016C8.66797 6.89559 9.5634 6.00016 10.668 6.00016C11.7725 6.00016 12.668 6.89559 12.668 8.00016C12.668 9.10473 11.7725 10.0002 10.668 10.0002C9.5634 10.0002 8.66797 9.10473 8.66797 8.00016ZM10.668 7.3335C10.2998 7.3335 10.0013 7.63197 10.0013 8.00016C10.0013 8.36835 10.2998 8.66683 10.668 8.66683C11.0362 8.66683 11.3346 8.36835 11.3346 8.00016C11.3346 7.63197 11.0362 7.3335 10.668 7.3335Z"
        fill="currentColor"
      />
    </svg>
  ),

  arrayIcon: arrayBooleanIcon,

  getDefaultSchema: () => ({ type: 'boolean' }),

  getValueText: (value?: unknown) => (value === undefined ? '' : value ? 'True' : 'False'),

  getDefaultValue: () => false,
});
