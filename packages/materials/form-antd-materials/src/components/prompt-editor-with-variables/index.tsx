/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { PromptEditor, PromptEditorPropsType } from '@/components/prompt-editor';
import { EditorVariableTree, EditorVariableTagInject } from '@/components/coze-editor-extensions';

export interface PromptEditorWithVariablesProps extends PromptEditorPropsType {}

export function PromptEditorWithVariables(props: PromptEditorWithVariablesProps) {
  return (
    <PromptEditor {...props}>
      <EditorVariableTree />
      <EditorVariableTagInject />
    </PromptEditor>
  );
}
