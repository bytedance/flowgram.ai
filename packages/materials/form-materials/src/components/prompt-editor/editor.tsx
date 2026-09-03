/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useEffect, useRef, useState } from 'react';

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
  // Delay ActiveLinePlaceholder until the CM view exists; otherwise
  // coordsAtPos can throw "No tile at position -1" during first measure (#1130).
  const [viewReady, setViewReady] = useState(false);

  const editorValue = String(value?.content || '');

  useEffect(() => {
    const api = editorRef.current;
    const editorView = api?.$view;
    if (!api || !editorView) {
      return;
    }
    if (api.getValue() === editorValue) {
      return;
    }
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: editorValue,
      },
    });
  }, [editorValue]);

  return (
    <div className={`gedit-m-prompt-editor-container ${hasError ? 'has-error' : ''}`} style={style}>
      <EditorProvider>
        <Renderer
          didMount={(editor: EditorAPI) => {
            editorRef.current = editor;
            setViewReady(Boolean(editor?.$view));
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
        >
          {activeLinePlaceholder && viewReady && (
            <ActiveLinePlaceholder>{activeLinePlaceholder}</ActiveLinePlaceholder>
          )}
          {!disableMarkdownHighlight && <MarkdownHighlight />}
          <LanguageSupport />
          <JinjaHighlight />
          {children}
        </Renderer>
      </EditorProvider>
    </div>
  );
}
