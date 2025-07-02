/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IFlowTemplateValue } from '../../typings';

export type PropsType = React.PropsWithChildren<{
  value?: IFlowTemplateValue;
  onChange: (value?: IFlowTemplateValue) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
}>;
