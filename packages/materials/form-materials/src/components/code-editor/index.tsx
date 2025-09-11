/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { lazySuspense } from '@/shared';

export const CodeEditor = lazySuspense(() =>
  Promise.all([import('./editor'), import('./theme')]).then(([editorModule]) => ({
    default: editorModule.CodeEditor,
  }))
);

export type { CodeEditorPropsType } from './editor';
