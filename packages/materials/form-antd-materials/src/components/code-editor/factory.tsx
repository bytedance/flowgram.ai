/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import { Skeleton } from 'antd';
import { languages } from '@flowgram.ai/coze-editor/preset-code';

import { lazySuspense } from '@/shared';

import type { CodeEditorPropsType } from './editor';

export const BaseCodeEditor = lazySuspense(() =>
  Promise.all([import('./editor'), import('./theme')]).then(([editorModule]) => ({
    default: editorModule.BaseCodeEditor,
  }))
);

interface FactoryParams<FixLanguageId extends boolean> {
  displayName: string;
  fixLanguageId: FixLanguageId extends true ? CodeEditorPropsType['languageId'] : undefined;
}

export const CodeEditorFactory = <FixLanguageId extends boolean>(
  loadLanguage: (languageId: string) => Promise<any>,
  { displayName, fixLanguageId }: FactoryParams<FixLanguageId>
): FixLanguageId extends true
  ? React.FC<Omit<CodeEditorPropsType, 'languageId'>>
  : React.FC<CodeEditorPropsType> => {
  const EditorWithLoad = (props: CodeEditorPropsType) => {
    const { languageId = fixLanguageId } = props;

    if (!languageId) {
      throw new Error('CodeEditorFactory: languageId is required');
    }

    const [loaded, setLoaded] = useState(useMemo(() => !!languages.get(languageId), [languageId]));

    useEffect(() => {
      if (!loaded && loadLanguage) {
        loadLanguage(languageId).then(() => {
          setLoaded(true);
        });
      }
    }, [languageId, loaded]);

    if (!loaded) {
      return <Skeleton active paragraph={{ rows: 1 }} title={false} />;
    }

    return <BaseCodeEditor {...props} languageId={fixLanguageId || languageId} />;
  };
  EditorWithLoad.displayName = displayName;

  return EditorWithLoad as FixLanguageId extends true
    ? React.FC<Omit<CodeEditorPropsType, 'languageId'>>
    : React.FC<CodeEditorPropsType>;
};
