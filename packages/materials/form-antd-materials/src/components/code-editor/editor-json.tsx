/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { languages } from '@flowgram.ai/coze-editor/preset-code';
import { mixLanguages } from '@flowgram.ai/coze-editor';

import { CodeEditorFactory } from './factory';

export const loadJsonLanguage = () =>
  import('@flowgram.ai/coze-editor/language-json').then((module) => {
    languages.register('json', {
      // mixLanguages is used to solve the problem that interpolation also uses parentheses, which causes incorrect highlighting
      language: mixLanguages({
        outerLanguage: module.json.language,
      }),
      languageService: module.json.languageService,
    });
  });

export const JsonCodeEditor = CodeEditorFactory<true>(loadJsonLanguage, {
  displayName: 'JsonCodeEditor',
  fixLanguageId: 'json',
});
