/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { languages } from '@flowgram.ai/coze-editor/preset-code';

import { CodeEditorFactory } from './factory';

export const loadTypescriptLanguage = () =>
  import('@flowgram.ai/coze-editor/language-typescript').then((module) => {
    languages.register('typescript', module.typescript);

    // Init TypeScript language service
    const tsWorker = new Worker(
      new URL(`@flowgram.ai/coze-editor/language-typescript/worker`, import.meta.url),
      { type: 'module' }
    );
    module.typescript.languageService.initialize(tsWorker, {
      compilerOptions: {
        // eliminate Promise error
        lib: ['es2015', 'dom'],
        noImplicitAny: false,
      },
    });
  });

export const TypeScriptCodeEditor = CodeEditorFactory<true>(loadTypescriptLanguage, {
  displayName: 'TypeScriptCodeEditor',
  fixLanguageId: 'typescript',
});
