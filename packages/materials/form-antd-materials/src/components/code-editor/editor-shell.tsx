/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { languages } from '@flowgram.ai/coze-editor/preset-code';

import { CodeEditorFactory } from './factory';

export const loadShellLanguage = () =>
  import('@flowgram.ai/coze-editor/language-shell').then((module) =>
    languages.register('shell', module.shell)
  );

export const ShellCodeEditor = CodeEditorFactory<true>(loadShellLanguage, {
  displayName: 'ShellCodeEditor',
  fixLanguageId: 'shell',
});
