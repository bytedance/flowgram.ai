/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { CodeEditor, type CodeEditorPropsType } from '@/components/code-editor';

/**
 * @deprecated use mini in CodeEditorPropsType instead
 */
export function CodeEditorMini(props: CodeEditorPropsType) {
  return (
    <div className="gedit-m-code-editor-mini">
      <CodeEditor
        {...props}
        mini
        options={{
          lineNumbersGutter: false,
          foldGutter: false,
          minHeight: 24,
          ...(props.options || {}),
        }}
      />
    </div>
  );
}
