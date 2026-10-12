/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema } from '@flowgram.ai/json-schema';

import { IInputsValues } from '@/shared';
import { ConstantInputStrategy } from '@/components/constant-input';

export interface PropsType {
  value?: IInputsValues;
  onChange: (value?: IInputsValues) => void;
  readonly?: boolean;
  hasError?: boolean;
  schema?: IJsonSchema;
  style?: React.CSSProperties;
  constantProps?: {
    strategies?: ConstantInputStrategy[];
    [key: string]: any;
  };
}
