/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { IJsonSchema } from '@flowgram.ai/json-schema';

export function jsonToSchema(jsonString: string): IJsonSchema {
  // 1. 解析 JSON
  const data = JSON.parse(jsonString); // 会自动抛出语法错误

  // 2. 生成 schema
  return generateSchema(data);
}

function generateSchema(value: any): IJsonSchema {
  // null
  if (value === null) {
    return { type: 'string' };
  }

  // array
  if (Array.isArray(value)) {
    const schema: IJsonSchema = { type: 'array' };
    if (value.length > 0) {
      schema.items = generateSchema(value[0]);
    }
    return schema;
  }

  // object
  if (typeof value === 'object') {
    const schema: IJsonSchema = {
      type: 'object',
      properties: {},
      required: [],
    };

    for (const [key, val] of Object.entries(value)) {
      schema.properties![key] = generateSchema(val);
      schema.required!.push(key);
    }

    return schema;
  }

  // primitive types
  const type = typeof value;
  return { type: type as any };
}
