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
import { EditorView } from '@codemirror/view';

import { getSuffixByLanguageId } from './utils';

import './styles.css';

const OriginCodeEditor = createRenderer(preset, [
  EditorView.theme({
    '&.cm-focused': {
      outline: 'none',
    },
  }),
]);

// CSS styles are in styles.css

type Preset = typeof preset;
type Options = Partial<InferValues<Preset[number]>>;

export interface CodeEditorPropsType extends React.PropsWithChildren<{}> {
  value?: string;
  onChange?: (value: string) => void;
  languageId: 'python' | 'typescript' | 'shell' | 'json' | 'sql';
  theme?: 'dark' | 'light';
  placeholder?: string;
  activeLinePlaceholder?: string;
  readonly?: boolean;
  options?: Options;
  mini?: boolean;
}

export function BaseCodeEditor({
  value,
  onChange,
  languageId = 'python',
  theme = 'light',
  children,
  placeholder,
  activeLinePlaceholder,
  options,
  readonly,
  mini,
}: CodeEditorPropsType) {
  const editorRef = useRef<EditorAPI | null>(null);

  const editorValue = String(value || '');

  useEffect(() => {
    // listen to value change
    if (editorRef.current?.getValue() !== editorValue) {
      // apply updates on readonly mode
      const editorView = editorRef.current?.$view;
      editorView?.dispatch({
        changes: {
          from: 0,
          to: editorView?.state.doc.length,
          insert: editorValue,
        },
      });
    }
  }, [editorValue]);

  return (
    <div className={`gedit-m-code-editor-container ${mini ? 'mini' : ''}`}>
      <EditorProvider>
        <OriginCodeEditor
          defaultValue={editorValue}
          options={{
            uri: `file:///untitled${getSuffixByLanguageId(languageId)}`,
            languageId,
            theme,
            placeholder,
            readOnly: readonly,
            editable: !readonly,
            ...(mini
              ? {
                  lineNumbersGutter: false,
                  foldGutter: false,
                  minHeight: 24,
                }
              : {}),
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
    </div>
  );
}
