/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { CodeEditorFactory } from './factory';
import { loadTypescriptLanguage } from './editor-ts';
import { loadSqlLanguage } from './editor-sql';
import { loadShellLanguage } from './editor-shell';
import { loadPythonLanguage } from './editor-python';
import { loadJsonLanguage } from './editor-json';

const languageLoaders: Record<string, (languageId: string) => Promise<any>> = {
  json: loadJsonLanguage,
  python: loadPythonLanguage,
  sql: loadSqlLanguage,
  typescript: loadTypescriptLanguage,
  shell: loadShellLanguage,
};

/**
 * @deprecated CodeEditor will bundle all languages features, use XXXCodeEditor instead for better bundle experience
 */
export const CodeEditor = CodeEditorFactory<false>(
  (languageId) => languageLoaders[languageId]?.(languageId),
  {
    displayName: 'CodeEditor',
    fixLanguageId: undefined,
  }
);
