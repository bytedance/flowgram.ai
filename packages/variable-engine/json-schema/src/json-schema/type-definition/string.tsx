/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { JsonSchemaTypeRegistryCreator } from '../types';
import { arrayStringIcon } from './array-icons';

export const stringRegistryCreator: JsonSchemaTypeRegistryCreator = () => ({
  type: 'string',

  label: 'String',

  icon: (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.3342 3.33321C8.96601 3.33321 8.66753 3.63169 8.66753 3.99988C8.66753 4.36807 8.96601 4.66655 9.3342 4.66655H14.6675C15.0357 4.66655 15.3342 4.36807 15.3342 3.99988C15.3342 3.63169 15.0357 3.33321 14.6675 3.33321H9.3342Z"
        fill="currentColor"
      />
      <path
        d="M10.0009 7.99988C10.0009 7.63169 10.2993 7.33321 10.6675 7.33321H14.6675C15.0357 7.33321 15.3342 7.63169 15.3342 7.99988C15.3342 8.36807 15.0357 8.66655 14.6675 8.66655H10.6675C10.2993 8.66655 10.0009 8.36807 10.0009 7.99988Z"
        fill="currentColor"
      />
      <path
        d="M12.0009 11.3332C11.6327 11.3332 11.3342 11.6317 11.3342 11.9999C11.3342 12.3681 11.6327 12.6665 12.0009 12.6665H14.6675C15.0357 12.6665 15.3342 12.3681 15.3342 11.9999C15.3342 11.6317 15.0357 11.3332 14.6675 11.3332H12.0009Z"
        fill="currentColor"
      />
      <path
        d="M9.86659 14.1482L8.23444 10.1844H3.18136C3.13868 10.1844 3.09685 10.1808 3.05616 10.1738L1.66589 14.1129C1.53049 14.4965 1.10971 14.6978 0.726058 14.5624C0.342408 14.427 0.141166 14.0062 0.276572 13.6225L4.37566 2.00848C4.71323 1.05202 6.05321 1.01763 6.4394 1.95552L11.2289 13.5872C11.3838 13.9634 11.2044 14.394 10.8282 14.5489C10.452 14.7038 10.0215 14.5244 9.86659 14.1482ZM5.44412 3.40791L3.57241 8.71109H7.62778L5.44412 3.40791Z"
        fill="currentColor"
      />
    </svg>
  ),

  arrayIcon: arrayStringIcon,

  getDefaultSchema: () => ({
    type: 'string',
  }),

  getValueText: (value?: unknown) => (value ? `${value}` : ''),

  getDefaultValue: () => '',
});
