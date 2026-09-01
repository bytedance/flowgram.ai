/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { IJsonSchema } from '@flowgram.ai/json-schema';

export interface IFlowValueExtra {
  index?: number;
}

export type FlowValueType = 'constant' | 'ref' | 'expression' | 'template';

export interface IFlowConstantValue {
  type: 'constant';
  content?: any;
  schema?: IJsonSchema;
  extra?: IFlowValueExtra;
}

export interface IFlowRefValue {
  type: 'ref';
  content?: string[];
  extra?: IFlowValueExtra;
}

export interface IFlowExpressionValue {
  type: 'expression';
  content?: string;
  extra?: IFlowValueExtra;
}

export interface IFlowTemplateValue {
  type: 'template';
  content?: string;
  extra?: IFlowValueExtra;
}

export type IFlowValue =
  | IFlowConstantValue
  | IFlowRefValue
  | IFlowExpressionValue
  | IFlowTemplateValue;

export type IFlowConstantRefValue = IFlowConstantValue | IFlowRefValue;

export interface IInputsValues {
  [key: string]: IInputsValues | IFlowValue | undefined;
}
