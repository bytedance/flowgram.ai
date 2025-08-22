/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { transformerCreator } from '@coze-editor/editor/preset-code';
import { Text } from '@coze-editor/editor/language-json';

import { CodeEditor, type CodeEditorPropsType } from '@/components/code-editor';

import { VariableTree } from './extensions/variable-tree';
import { VariableTagInject } from './extensions/variable-tag';
import { I18n } from '@flowgram.ai/editor';

type Match = { match: string; range: [number, number] };
function findAllMatches(inputString: string, regex: RegExp): Match[] {
  const globalRegex = new RegExp(
    regex,
    regex.flags.includes('g') ? regex.flags : regex.flags + 'g'
  );
  let match;
  const matches: Match[] = [];

  while ((match = globalRegex.exec(inputString)) !== null) {
    if (match.index === globalRegex.lastIndex) {
      globalRegex.lastIndex++;
    }
    matches.push({
      match: match[0],
      range: [match.index, match.index + match[0].length],
    });
  }

  return matches;
}

const transformer = transformerCreator((text: Text) => {
  const originalSource = text.toString();
  const matches = findAllMatches(originalSource, /\{\{([^\}]*)\}\}/g);

  if (matches.length > 0) {
    matches.forEach(({ range }) => {
      text.replaceRange(range[0], range[1], 'null');
    });
  }

  return text;
});

export function JsonEditorWithVariables(props: Omit<CodeEditorPropsType, 'languageId'>) {
  return (
    <CodeEditor
      languageId="json"
      activeLinePlaceholder={I18n.t("Press '@' to Select variable")}
      {...props}
      options={{
        transformer,
        ...(props.options || {}),
      }}
    >
      <VariableTree />
      <VariableTagInject />
    </CodeEditor>
  );
}
