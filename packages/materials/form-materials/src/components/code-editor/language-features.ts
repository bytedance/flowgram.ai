/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useMemo, useState } from 'react';

import { languages } from '@flowgram.ai/coze-editor/preset-code';
import { mixLanguages } from '@flowgram.ai/coze-editor';

export const dynamicLoadLanguages: Record<string, () => Promise<void>> = {
  python: () =>
    import('@flowgram.ai/coze-editor/language-python').then((module) => {
      languages.register('python', module.python);
    }),
  shell: () =>
    import('@flowgram.ai/coze-editor/language-shell').then((module) => {
      languages.register('shell', module.shell);
    }),
  typescript: () =>
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
    }),
  json: () =>
    import('@flowgram.ai/coze-editor/language-json').then((module) => {
      languages.register('json', {
        // mixLanguages is used to solve the problem that interpolation also uses parentheses, which causes incorrect highlighting
        language: mixLanguages({
          outerLanguage: module.json.language,
        }),
        languageService: module.json.languageService,
      });
    }),
};

export const useDynamicLoadLanguage = (languageId: string) => {
  const [loaded, setLoaded] = useState(useMemo(() => !!languages.get(languageId), [languageId]));

  useEffect(() => {
    if (!loaded && dynamicLoadLanguages[languageId]) {
      dynamicLoadLanguages[languageId]().then(() => {
        setLoaded(true);
      });
    }
  }, [languageId, loaded]);

  return { loaded };
};
