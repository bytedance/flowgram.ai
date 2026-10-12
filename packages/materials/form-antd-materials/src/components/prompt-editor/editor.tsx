/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef } from 'react';

import {
  Renderer,
  EditorProvider,
  ActiveLinePlaceholder,
  InferValues,
} from '@flowgram.ai/coze-editor/react';
import preset, { EditorAPI } from '@flowgram.ai/coze-editor/preset-prompt';

import { PropsType } from './types';
import MarkdownHighlight from './extensions/markdown';
import LanguageSupport from './extensions/language-support';
import JinjaHighlight from './extensions/jinja';

import './styles.css';

type Preset = typeof preset;
type Options = Partial<InferValues<Preset[number]>>;

export interface PromptEditorPropsType extends PropsType {
  options?: Options;
}

export function PromptEditor(props: PromptEditorPropsType) {
  const {
    value,
    onChange,
    readonly,
    placeholder,
    activeLinePlaceholder,
    style,
    hasError,
    children,
    disableMarkdownHighlight,
    options,
  } = props || {};

  const editorRef = useRef<EditorAPI | null>(null);

  const editorValue = String(value?.content || '');

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
    <div className={`gedit-m-prompt-editor-container ${hasError ? 'has-error' : ''}`} style={style}>
      <EditorProvider>
        <Renderer
          didMount={(editor: EditorAPI) => {
            editorRef.current = editor;
          }}
          plugins={preset}
          defaultValue={editorValue}
          options={{
            readOnly: readonly,
            editable: !readonly,
            placeholder,
            ...options,
          }}
          onChange={(e) => {
            onChange({ type: 'template', content: e.value });
          }}
        />
        {activeLinePlaceholder && (
          <ActiveLinePlaceholder>{activeLinePlaceholder}</ActiveLinePlaceholder>
        )}
        {!disableMarkdownHighlight && <MarkdownHighlight />}
        <LanguageSupport />
        <JinjaHighlight />
        {children}
      </EditorProvider>
    </div>
  );
}
