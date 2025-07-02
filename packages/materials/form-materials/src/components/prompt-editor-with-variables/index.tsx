/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import Variable from './extensions/variable';
import { PromptEditor, PromptEditorPropsType } from '../prompt-editor';

export function PromptEditorWithVariables(props: PromptEditorPropsType) {
  return (
    <PromptEditor {...props}>
      <Variable />
    </PromptEditor>
  );
}
