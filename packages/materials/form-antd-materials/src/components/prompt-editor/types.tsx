/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IFlowTemplateValue } from '@/shared';

export type PropsType = React.PropsWithChildren<{
  value?: IFlowTemplateValue;
  onChange: (value?: IFlowTemplateValue) => void;
  readonly?: boolean;
  hasError?: boolean;
  placeholder?: string;
  activeLinePlaceholder?: string;
  disableMarkdownHighlight?: boolean;
  style?: React.CSSProperties;
}>;
