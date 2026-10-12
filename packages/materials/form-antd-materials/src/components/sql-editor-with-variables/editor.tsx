/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { I18n } from '@flowgram.ai/editor';

import { EditorVariableTree, EditorVariableTagInject } from '@/components/coze-editor-extensions';
import { SQLCodeEditor, type CodeEditorPropsType } from '@/components/code-editor';

export interface SQLEditorWithVariablesProps extends Omit<CodeEditorPropsType, 'languageId'> {}

export function SQLEditorWithVariables(props: SQLEditorWithVariablesProps) {
  return (
    <SQLCodeEditor
      activeLinePlaceholder={I18n.t("Press '@' to Select variable")}
      {...props}
      options={{
        ...(props.options || {}),
      }}
    >
      <EditorVariableTree />
      <EditorVariableTagInject />
    </SQLCodeEditor>
  );
}
