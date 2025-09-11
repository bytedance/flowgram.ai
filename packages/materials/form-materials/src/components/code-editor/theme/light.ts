/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createTheme, tags as t } from '@flowgram.ai/coze-editor/preset-code';
import { type Extension } from '@codemirror/state';

export const colors = {
  background: '#f4f5f5',
  foreground: '#444d56',
  selection: '#0366d625',
  cursor: '#044289',
  dropdownBackground: '#fff',
  dropdownBorder: '#e1e4e8',
  activeLine: '#c6c6c622',
  matchingBracket: '#34d05840',
  keyword: '#d73a49',
  storage: '#d73a49',
  variable: '#e36209',
  parameter: '#24292e',
  function: '#005cc5',
  string: '#032f62',
  constant: '#005cc5',
  type: '#005cc5',
  class: '#6f42c1',
  number: '#005cc5',
  comment: '#6a737d',
  heading: '#005cc5',
  invalid: '#cb2431',
  regexp: '#032f62',
};

export const lightTheme: Extension = createTheme({
  variant: 'light',
  settings: {
    background: colors.background,
    foreground: colors.foreground,
    caret: colors.cursor,
    selection: colors.selection,
    gutterBackground: colors.background,
    gutterForeground: colors.foreground,
    gutterBorderColor: 'transparent',
    gutterBorderWidth: 0,
    lineHighlight: colors.background,
    bracketColors: ['#F59E0B', '#8B5CF6', '#06B6D4'],
    tooltip: {
      backgroundColor: colors.dropdownBackground,
      color: colors.foreground,
      border: 'none',
      boxShadow: '0 0 1px rgba(0, 0, 0, .3), 0 4px 14px rgba(0, 0, 0, .1)!important',
      maxWidth: '400px',
    },
    link: {
      color: '#2563EB',
      caret: colors.cursor,
    },
    completionItemHover: {
      backgroundColor: '#F3F4F6',
    },
    completionItemSelected: {
      backgroundColor: colors.selection,
      color: colors.foreground,
    },
    completionItemIcon: {
      color: '#4B5563',
    },
    completionItemLabel: {
      color: '#1F2937',
    },
    completionItemInfo: {
      color: '#4B5563',
    },
    completionItemDetail: {
      color: '#6B7280',
    },
  },
  styles: [
    { tag: t.keyword, color: colors.keyword },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: colors.variable,
    },
    { tag: [t.propertyName], color: colors.function },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: colors.string,
    },
    { tag: [t.function(t.variableName), t.labelName], color: colors.function },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: colors.constant,
    },
    { tag: [t.definition(t.name), t.separator], color: colors.variable },
    { tag: [t.className], color: colors.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: colors.number,
    },
    { tag: [t.typeName], color: colors.type, fontStyle: colors.type },
    { tag: [t.operator, t.operatorKeyword], color: colors.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: colors.regexp },
    { tag: [t.meta, t.comment], color: colors.comment },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.link, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: colors.heading },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: colors.variable },
    { tag: t.invalid, color: colors.invalid },
    { tag: t.strikethrough, textDecoration: 'line-through' },
  ],
});
