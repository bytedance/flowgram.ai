/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export interface NodePreviewToken {
  kind: 'text' | 'reference' | 'field' | 'code' | 'resource' | 'count';
  text: string;
  detail?: string;
  description?: string;
}
export interface NodePreviewRow {
  label?: string;
  tokens: NodePreviewToken[];
}

export const summaryFields: Record<string, string[]> = {
  'data.map-fields': ['mapping', 'inputsValues.preserve'],
  'data.select-fields': ['inputsValues.operation', 'paths'],
  'data.merge-objects': ['inputsValues.depth', 'inputsValues.conflict'],
  'data.get-value': ['inputsValues.path', 'inputsValues.data'],
  'data.default': ['inputsValues.replace', 'inputsValues.fallback'],
  'data.convert': ['inputsValues.target', 'inputsValues.value'],
  'data.parse-json': ['inputsValues.text', 'inputsValues.validate'],
  'data.stringify-json': ['inputsValues.value', 'inputsValues.indent'],
  'data.validate': ['schema', 'inputsValues.failure'],
  'list.filter': ['predicate', 'inputsValues.items'],
  'list.map': ['mapping', 'inputsValues.items'],
  'list.sort': ['keys', 'inputsValues.items'],
  'list.deduplicate': ['keys', 'inputsValues.keep'],
  'list.slice': ['inputsValues.operation', 'inputsValues.length'],
  'list.flatten': ['inputsValues.depth', 'inputsValues.items'],
  'list.batch': ['inputsValues.size', 'inputsValues.remainder'],
  'list.group': ['keys', 'inputsValues.items'],
  'list.aggregate': ['keys', 'metrics'],
  'list.concat': ['inputsValues.lists'],
  'list.join': ['inputsValues.mode', 'inputsValues.leftKey'],
  'list.set': ['inputsValues.operation', 'keys'],
  'text.transform': ['inputsValues.operation', 'inputsValues.text'],
  'text.regex': ['inputsValues.operation', 'inputsValues.pattern'],
  'text.template': ['inputsValues.format', 'inputsValues.template'],
  'value.math': ['inputsValues.operation', 'inputsValues.operands'],
  'value.datetime': ['inputsValues.operation', 'inputsValues.timezone'],
  'value.encode': ['inputsValues.operation', 'inputsValues.encoding'],
  'value.hash': ['inputsValues.algorithm', 'inputsValues.encoding'],
  'document.chunk': ['inputsValues.mode', 'inputsValues.size'],
};

// Geometry is derived from declared content slots, never DOM measurements or locale.
export function previewRowCount(type: string): number {
  if (['block-start', 'block-end', 'control.break', 'control.continue'].includes(type)) return 0;
  if (
    [
      'start',
      'end',
      'assign',
      'wait',
      'delay',
      'condition',
      'control.switch',
      'control.parallel',
      'control.join',
      'control.merge-branches',
      'template',
      'json-parse',
      'json-stringify',
    ].includes(type)
  )
    return 1;
  return Math.min(2, summaryFields[type]?.length || 2);
}
