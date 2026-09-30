/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { IJsonSchema } from '@/plugins';
import type { ConstantRendererProps } from '@/plugins';

export interface Strategy<Value = any> {
  hit: (schema: IJsonSchema) => boolean;
  Renderer: React.FC<ConstantRendererProps<Value>>;
}

export interface PropsType extends ConstantRendererProps {
  schema: IJsonSchema;
  strategies?: Strategy[];
  fallbackRenderer?: React.FC<ConstantRendererProps>;
  [key: string]: any;
}
