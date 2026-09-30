/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { languages } from '@flowgram.ai/coze-editor/preset-code';

import { CodeEditorFactory } from './factory';

export const loadPythonLanguage = () =>
  import('@flowgram.ai/coze-editor/language-python').then((module) =>
    languages.register('python', module.python)
  );

export const PythonCodeEditor = CodeEditorFactory<true>(loadPythonLanguage, {
  displayName: 'PythonCodeEditor',
  fixLanguageId: 'python',
});
