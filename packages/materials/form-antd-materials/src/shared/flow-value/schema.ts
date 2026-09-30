/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import z from 'zod';

// Shared extra schema for flow value types
export const extraSchema = z
  .object({
    index: z.number().optional(),
  })
  .optional();

export const constantSchema = z.object({
  type: z.literal('constant'),
  content: z.any().optional(),
  schema: z.any().optional(),
  extra: extraSchema,
});

export const refSchema = z.object({
  type: z.literal('ref'),
  content: z.array(z.string()).optional(),
  extra: extraSchema,
});

export const expressionSchema = z.object({
  type: z.literal('expression'),
  content: z.string().optional(),
  extra: extraSchema,
});

export const templateSchema = z.object({
  type: z.literal('template'),
  content: z.string().optional(),
  extra: extraSchema,
});
