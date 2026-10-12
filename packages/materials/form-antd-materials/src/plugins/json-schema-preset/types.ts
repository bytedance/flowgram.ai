/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  type IJsonSchema,
  JsonSchemaTypeRegistry as OriginJsonSchemaTypeRegistry,
} from '@flowgram.ai/json-schema';

import { IConditionRule, IConditionRuleFactory } from '@/components/condition-context/types';

export interface ConstantRendererProps<Value = any> {
  value?: Value;
  onChange?: (value: Value) => void;
  readonly?: boolean;
  schema?: IJsonSchema;
  [key: string]: any;
}
export interface JsonSchemaTypeRegistry<Value = any> extends OriginJsonSchemaTypeRegistry {
  /**
   * The icon displayed when this type is used as an array item
   */
  arrayIcon?: React.JSX.Element;

  /**
   * Render Constant Input
   */
  ConstantRenderer: React.FC<ConstantRendererProps<Value>>;

  /**
   * Condition Rules
   */
  conditionRule?: IConditionRule | IConditionRuleFactory;
}
