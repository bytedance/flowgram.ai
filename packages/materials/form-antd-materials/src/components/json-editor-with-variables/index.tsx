/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazySuspense } from '@/shared';

export const JsonEditorWithVariables = lazySuspense(() =>
  import('./editor').then((module) => ({ default: module.JsonEditorWithVariables }))
);

export type { JsonEditorWithVariablesProps } from './editor';
