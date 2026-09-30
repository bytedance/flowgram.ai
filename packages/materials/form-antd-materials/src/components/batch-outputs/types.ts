/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IFlowRefValue } from '@/shared';

export type ValueType = Record<string, IFlowRefValue | undefined>;

export interface OutputItem {
  id: number;
  key?: string;
  value?: IFlowRefValue;
}

export interface PropsType {
  value?: ValueType;
  onChange: (value?: ValueType) => void;
  readonly?: boolean;
  hasError?: boolean;
  style?: React.CSSProperties;
}
