/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Renderer, EditorProvider } from '@coze-editor/editor/react';
import preset from '@coze-editor/editor/preset-prompt';

import { PropsType } from './types';
import { UIContainer } from './styles';

export function PromptEditor(props: PropsType) {
  const { value, onChange, style } = props || {};

  return (
    <UIContainer style={style}>
      <EditorProvider>
        <Renderer
          plugins={preset}
          defaultValue={String(value?.content)}
          onChange={(e) => {
            onChange({ type: 'template', content: e.value });
          }}
        />
      </EditorProvider>
    </UIContainer>
  );
}
