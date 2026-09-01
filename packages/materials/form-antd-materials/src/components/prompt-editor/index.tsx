/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazySuspense } from '@/shared';

export const PromptEditor = lazySuspense(() =>
  import('./editor').then((module) => ({ default: module.PromptEditor }))
);

export type { PromptEditorPropsType } from './editor';
