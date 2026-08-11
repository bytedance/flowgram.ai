/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazySuspense } from '@/shared';

export const SQLEditorWithVariables = lazySuspense(() =>
  import('./editor').then((module) => ({ default: module.SQLEditorWithVariables }))
);

export type { SQLEditorWithVariablesProps } from './editor';
