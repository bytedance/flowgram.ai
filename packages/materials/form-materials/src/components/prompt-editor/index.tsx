/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Renderer, EditorProvider } from '@coze-editor/editor/react';
import preset from '@coze-editor/editor/preset-prompt';

import { PropsType } from './types';
import { UIContainer } from './styles';
import MarkdownHighlight from './extensions/markdown';
import LanguageSupport from './extensions/language-support';
import JinjaHighlight from './extensions/jinja';

export type PromptEditorPropsType = PropsType;

export function PromptEditor(props: PropsType) {
  const { value, onChange, readonly, style, hasError, children } = props || {};

  return (
    <UIContainer $hasError={hasError} style={style}>
      <EditorProvider>
        <Renderer
          plugins={preset}
          defaultValue={String(value?.content)}
          options={{
            readOnly: readonly,
            editable: !readonly,
          }}
          onChange={(e) => {
            onChange({ type: 'template', content: e.value });
          }}
        />
        <MarkdownHighlight />
        <LanguageSupport />
        <JinjaHighlight />
        {children}
      </EditorProvider>
    </UIContainer>
  );
}
