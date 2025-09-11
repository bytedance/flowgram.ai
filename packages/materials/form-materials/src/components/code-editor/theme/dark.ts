/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createTheme, tags as t } from '@flowgram.ai/coze-editor/preset-code';
import { type Extension } from '@codemirror/state';

export const colors = {
  background: '#24292e',
  foreground: '#d1d5da',
  selection: '#3392FF44',
  cursor: '#c8e1ff',
  dropdownBackground: '#24292e',
  dropdownBorder: '#1b1f23',
  activeLine: '#4d566022',
  matchingBracket: '#888892',
  keyword: '#9197F1',
  storage: '#f97583',
  variable: '#ffab70',
  variableName: '#D9DCFA',
  parameter: '#e1e4e8',
  function: '#FFCA66',
  string: '#FF9878',
  constant: '#79b8ff',
  type: '#79b8ff',
  class: '#b392f0',
  number: '#2EC7D9',
  comment: '#568B2A',
  heading: '#79b8ff',
  invalid: '#f97583',
  regexp: '#9ecbff',
  propertyName: '#9197F1',
  separator: '#888892',
  gutters: '#888892',
  moduleKeyword: '#CC4FD4',
};

export const darkTheme: Extension = createTheme({
  variant: 'dark',
  settings: {
    background: colors.background,
    foreground: colors.foreground,
    caret: colors.cursor,
    selection: colors.selection,
    gutterBackground: colors.background,
    gutterForeground: colors.foreground,
    gutterBorderColor: 'transparent',
    gutterBorderWidth: 0,
    lineHighlight: '#21262D',
    bracketColors: ['#FBBF24', '#A78BFA', '#7DD3FC'],
    tooltip: {
      backgroundColor: '#21262D',
      color: '#E6EDF3',
      border: '1px solid #30363D',
    },
    link: {
      color: '#58A6FF',
    },
    completionItemHover: {
      backgroundColor: '#21262D',
    },
    completionItemSelected: {
      backgroundColor: colors.selection,
      color: colors.foreground,
    },
    completionItemIcon: {
      color: '#8B949E',
    },
    completionItemLabel: {
      color: '#E6EDF3',
    },
    completionItemInfo: {
      color: '#8B949E',
    },
    completionItemDetail: {
      color: '#6E7681',
    },
  },
  styles: [
    { tag: t.keyword, color: colors.keyword },
    { tag: t.variableName, color: colors.variableName },
    {
      tag: [t.name, t.deleted, t.character, t.macroName],
      color: colors.variable,
    },
    { tag: [t.propertyName], color: colors.propertyName },
    {
      tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)],
      color: colors.string,
    },
    {
      tag: [t.function(t.variableName), t.function(t.propertyName), t.labelName],
      color: colors.function,
    },
    {
      tag: [t.moduleKeyword, t.controlKeyword],
      color: colors.moduleKeyword,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: colors.constant,
    },
    { tag: t.definition(t.name), color: colors.variable },
    { tag: [t.className], color: colors.class },
    {
      tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: colors.number,
    },
    { tag: [t.typeName], color: colors.type, fontStyle: colors.type },
    { tag: [t.operatorKeyword], color: colors.keyword },
    { tag: [t.url, t.escape, t.regexp, t.link], color: colors.regexp },
    { tag: [t.meta, t.comment], color: colors.comment },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.link, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: colors.heading },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: colors.variable },
    { tag: t.invalid, color: colors.invalid },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.separator, color: colors.separator },
  ],
});
