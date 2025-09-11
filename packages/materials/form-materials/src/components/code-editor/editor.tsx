/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef } from 'react';

import {
  ActiveLinePlaceholder,
  createRenderer,
  EditorProvider,
  InferValues,
} from '@flowgram.ai/coze-editor/react';
import preset, { type EditorAPI } from '@flowgram.ai/coze-editor/preset-code';
import { Skeleton } from '@douyinfe/semi-ui';
import { EditorView } from '@codemirror/view';

import { getSuffixByLanguageId } from './utils';
import { useDynamicLoadLanguage } from './language-features';

const OriginCodeEditor = createRenderer(preset, [
  EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
    },
  }),
]);

type Preset = typeof preset;
type Options = Partial<InferValues<Preset[number]>>;

export interface CodeEditorPropsType extends React.PropsWithChildren<{}> {
  value?: string;
  onChange?: (value: string) => void;
  languageId: 'python' | 'typescript' | 'shell' | 'json';
  theme?: 'dark' | 'light';
  placeholder?: string;
  activeLinePlaceholder?: string;
  readonly?: boolean;
  options?: Options;
}

export function CodeEditor({
  value,
  onChange,
  languageId = 'python',
  theme = 'light',
  children,
  placeholder,
  activeLinePlaceholder,
  options,
  readonly,
}: CodeEditorPropsType) {
  const { loaded } = useDynamicLoadLanguage(languageId);

  const editorRef = useRef<EditorAPI | null>(null);

  useEffect(() => {
    // listen to value change
    if (editorRef.current?.getValue() !== value) {
      editorRef.current?.setValue(String(value || ''));
    }
  }, [value]);

  if (!loaded) {
    return <Skeleton />;
  }

  return (
    <EditorProvider>
      <OriginCodeEditor
        defaultValue={String(value || '')}
        options={{
          uri: `file:///untitled${getSuffixByLanguageId(languageId)}`,
          languageId,
          theme,
          placeholder,
          readOnly: readonly,
          editable: !readonly,
          ...(options || {}),
        }}
        didMount={(editor: EditorAPI) => {
          editorRef.current = editor;
        }}
        onChange={(e) => onChange?.(e.value)}
      >
        {activeLinePlaceholder && (
          <ActiveLinePlaceholder>{activeLinePlaceholder}</ActiveLinePlaceholder>
        )}
        {children}
      </OriginCodeEditor>
    </EditorProvider>
  );
}
