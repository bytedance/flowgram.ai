/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IJsonSchema, JsonSchemaTypeRegistryCreator } from '../types';
import { arrayNumberIcon } from './array-icons';

export const numberRegistryCreator: JsonSchemaTypeRegistryCreator = () => ({
  type: 'number',

  label: 'Number',

  extend: 'integer',

  icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.44151 5.3068C3.44151 3.83404 4.71542 2.64014 6.18818 2.64014C7.66094 2.64014 8.93484 3.83404 8.93484 5.3068V10.6135C8.93484 12.0862 7.66094 13.2801 6.18818 13.2801C4.71542 13.2801 3.44151 12.0862 3.44151 10.6135V5.3068ZM7.60151 5.3068C7.60151 4.57042 6.92456 3.97347 6.18818 3.97347C5.4518 3.97347 4.77484 4.57042 4.77484 5.3068V10.6135C4.77484 11.3498 5.4518 11.9468 6.18818 11.9468C6.92456 11.9468 7.60151 11.3498 7.60151 10.6135V5.3068Z"
        fill="currentColor"
      />
      <path
        d="M12.9882 2.64014C11.5154 2.64014 10.2415 3.83404 10.2415 5.3068V10.6135C10.2415 12.0862 11.5154 13.2801 12.9882 13.2801C14.4609 13.2801 15.7348 12.0862 15.7348 10.6135V5.3068C15.7348 3.83404 14.4609 2.64014 12.9882 2.64014ZM14.4015 10.6135C14.4015 11.3498 13.7246 11.9468 12.9882 11.9468C12.2518 11.9468 11.5748 11.3498 11.5748 10.6135V5.3068C11.5748 4.57042 12.2518 3.97347 12.9882 3.97347C13.7246 3.97347 14.4015 4.57042 14.4015 5.3068V10.6135Z"
        fill="currentColor"
      />
      <path
        d="M1.21484 13.2001C1.76713 13.2001 2.21484 12.7524 2.21484 12.2001C2.21484 11.6479 1.76713 11.2001 1.21484 11.2001C0.662559 11.2001 0.214844 11.6479 0.214844 12.2001C0.214844 12.7524 0.662559 13.2001 1.21484 13.2001Z"
        fill="currentColor"
      />
    </svg>
  ),

  arrayIcon: arrayNumberIcon,

  getValueText: (value?: unknown) => (value ? `${value}` : ''),

  getDefaultSchema: (): IJsonSchema => ({ type: 'number' }),
});
