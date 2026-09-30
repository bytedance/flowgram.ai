/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { languages } from '@flowgram.ai/coze-editor/preset-code';
import { mixLanguages } from '@flowgram.ai/coze-editor';

import { CodeEditorFactory } from './factory';

export const loadSqlLanguage = () =>
  import('@flowgram.ai/coze-editor/language-sql').then((module) => {
    languages.register('sql', {
      ...module.sql,
      language: mixLanguages({
        outerLanguage: module.sql.language,
      }),
    });
  });

export const SQLCodeEditor = CodeEditorFactory<true>(loadSqlLanguage, {
  displayName: 'SQLCodeEditor',
  fixLanguageId: 'sql',
});
