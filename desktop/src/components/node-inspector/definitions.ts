/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { WorkflowNode } from '../../lib/types';
import { localized } from '../../lib/i18n';
import { controlNodes } from '../../lib/control-nodes';
import { atomicNodes } from '../../lib/atomic-nodes';
import { asValue, readPath, type Data, type Schema } from './model';

export type EditorId =
  | 'value'
  | 'select'
  | 'mapping'
  | 'schema'
  | 'conditions'
  | 'resource'
  | 'tools'
  | 'number'
  | 'key-value'
  | 'paths'
  | 'records'
  | 'predicate'
  | 'branches'
  | 'branch-mappings'
  | 'node-select';
export interface FieldDefinition {
  key: string;
  label: string;
  editor: EditorId;
  type?: string;
  required?: boolean;
  hint?: string;
  multiline?: boolean;
  defaultValue?: unknown;
  valueType?: string;
  resource?: 'model' | 'workflow';
  scope?: 'children' | 'items';
  columns?: Array<{ key: string; label: string; choices?: Array<[string, string]> }>;
  operators?: Array<[string, string]>;
  tools?: string[];
  row?: string;
  rowLabel?: string;
  choices?: Array<[string, string]>;
  min?: number;
  max?: number;
  section?: string;
  visible?: { field: string; values: unknown[] };
}
export interface NodeDefinition {
  fields: FieldDefinition[];
  output: (data: Data) => Schema;
  aliases?: string[];
}
const value = (
  key: string,
  label: string,
  type = 'string',
  extra: Partial<FieldDefinition> = {}
): FieldDefinition => ({ key: `inputsValues.${key}`, label, type, editor: 'value', ...extra });
const select = (key: string, label: string, choices: Array<[string, string]>): FieldDefinition => ({
  key: `inputsValues.${key}`,
  label,
  editor: 'select',
  choices,
});
const result = (type?: string): Schema => ({ type: 'object', properties: { result: { type } } });
const mapping: FieldDefinition = localized({
  key: 'inputsValues',
  label: '输出字段',
  editor: 'mapping',
});
const mappedOutput = (data: Data): Schema => ({
  type: 'object',
  properties: Object.fromEntries(
    Object.entries((data.inputsValues || {}) as Data).map(([key, v]) => {
      const content = asValue(v).content;
      return [
        key,
        {
          type:
            asValue(v).type !== 'constant'
              ? undefined
              : content === null
              ? 'null'
              : Array.isArray(content)
              ? 'array'
              : typeof content,
        },
      ];
    })
  ),
});
export const nodeDefinitions: Record<string, NodeDefinition> = localized({
  start: {
    fields: [
      { key: 'outputs', label: '输入字段', editor: 'schema', hint: '定义调用工作流时提供的数据。' },
    ],
    output: (d) => (d.outputs as Schema) || { type: 'object' },
  },
  'block-start': {
    fields: [],
    output: (d) =>
      (d.outputs as Schema) || {
        type: 'object',
        properties: { item: {}, index: { type: 'integer' } },
      },
  },
  end: { fields: [mapping], output: mappedOutput },
  'block-end': { fields: [mapping], output: mappedOutput },
  assign: {
    fields: [{ ...mapping, label: '字段映射' }],
    output: mappedOutput,
    aliases: ['字段映射', '设置默认值'],
  },
  template: {
    fields: [
      value('text', '模板内容', 'string', {
        multiline: true,
        required: true,
        hint: '使用 {{节点ID.字段}} 插入变量，也可从变量选择器插入。',
      }),
    ],
    output: () => result('string'),
  },
  'json-parse': {
    fields: [value('text', 'JSON 文本', 'string', { multiline: true, required: true })],
    output: () => result(),
  },
  'json-stringify': {
    fields: [value('value', '需要转换的数据', 'any', { required: true })],
    output: () => result('string'),
  },
  text: {
    fields: [
      select('operation', '处理方式', [
        ['trim', '去除首尾空白'],
        ['upper', '转为大写'],
        ['lower', '转为小写'],
        ['replace', '替换文本'],
        ['split', '分割文本'],
      ]),
      value('text', '文本', 'string', { multiline: true, required: true }),
      value('search', '查找内容', 'string', {
        required: true,
        visible: { field: 'operation', values: ['replace'] },
      }),
      value('replacement', '替换为', 'string', {
        visible: { field: 'operation', values: ['replace'] },
      }),
      value('separator', '分隔符', 'string', {
        defaultValue: ',',
        visible: { field: 'operation', values: ['split'] },
      }),
    ],
    output: (d) =>
      result(asValue((d.inputsValues as Data)?.operation).content === 'split' ? 'array' : 'string'),
    aliases: ['去空格', '去空白', 'trim', '替换', '分割', '大小写'],
  },
  array: {
    fields: [
      select('operation', '处理方式', [
        ['unique', '去除重复项'],
        ['length', '统计数量'],
        ['first', '取第一项'],
        ['last', '取最后一项'],
        ['flatten', '展开嵌套列表'],
        ['join', '拼接为文本'],
      ]),
      value('items', '列表', 'array', { required: true }),
      value('separator', '分隔符', 'string', { visible: { field: 'operation', values: ['join'] } }),
    ],
    output: (d) =>
      result(
        ({ length: 'integer', join: 'string', unique: 'array', flatten: 'array' } as Data)[
          String(asValue((d.inputsValues as Data)?.operation).content)
        ] as string | undefined
      ),
    aliases: ['去重', '拼接', '展开', '数量'],
  },
  llm: {
    fields: [
      { key: 'model', label: '模型', editor: 'resource', resource: 'model' },
      value('prompt', '生成要求', 'string', { multiline: true, required: true }),
    ],
    output: () => result('string'),
  },
  agent: {
    fields: [
      { key: 'model', label: '模型', editor: 'resource', resource: 'model' },
      value('prompt', '目标', 'string', { multiline: true, required: true }),
      {
        key: '_tools',
        tools: ['列出工作流', '查看流程结构', '校验工作流', '查看运行结果', '查询节点类型'],
        label: '可用工具',
        editor: 'tools',
        hint: '当前 Agent 使用项目内的只读工作流工具。',
      },
      { ...value('maxSteps', '模型轮次上限', 'integer'), min: 1, max: 8, section: '执行预算' },
    ],
    output: () => ({ type: 'object', properties: { result: { type: 'string' } } }),
  },
  http: {
    fields: [
      {
        ...select(
          'method',
          '请求方法',
          ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'].map((x) => [x, x])
        ),
        row: 'request',
        rowLabel: '请求地址',
      },
      value('url', '请求地址', 'string', { required: true, row: 'request', rowLabel: '请求地址' }),
      { ...value('query', '查询参数', 'object'), editor: 'key-value' },
      {
        ...value('headers', '请求头', 'object', { section: '请求头' }),
        editor: 'key-value',
        valueType: 'string',
      },
      value('body', '请求内容', 'any', { multiline: true, section: '请求内容' }),
      value('credentialEnv', '凭证环境变量', 'string', {
        section: '服务凭证',
        hint: '使用静态 FLOWGRAM_CONNECTION_ 环境变量名，密钥只在主机注入。',
      }),
      value('credentialHeader', '凭证请求头', 'string', { section: '服务凭证' }),
      value('credentialPrefix', '凭证前缀', 'string', { section: '服务凭证' }),
    ],
    output: () => ({
      type: 'object',
      properties: { statusCode: { type: 'integer' }, headers: { type: 'object' }, body: {} },
    }),
  },
  subworkflow: {
    fields: [
      {
        key: 'inputsValues.workflowId',
        label: '工作流',
        editor: 'resource',
        resource: 'workflow',
        required: true,
      },
      value('inputs', '工作流输入', 'object', { required: true }),
    ],
    output: () => ({ type: 'object' }),
  },
  condition: {
    fields: [
      {
        key: 'conditions',
        label: '分支规则',
        editor: 'conditions',
        hint: '按顺序匹配，首个命中的分支执行；未命中时进入否则分支。',
      },
    ],
    output: () => ({ type: 'object', properties: { branch: { type: 'string' } } }),
  },
  delay: {
    fields: [
      {
        ...value('durationMs', '等待时长', 'integer', {
          required: true,
          hint: '单位为毫秒，单次最长 30 秒。',
        }),
        min: 0,
        max: 30_000,
      },
    ],
    output: () => ({ type: 'object', properties: { durationMs: { type: 'integer' } } }),
  },
});
[...atomicNodes, ...controlNodes].forEach((node) => {
  nodeDefinitions[node.type] = {
    fields: node.fields,
    aliases: node.aliases,
    output: (data) => {
      if (node.type === 'loop')
        return {
          type: 'object',
          properties: {
            ...node.outputSchema.properties,
            ...Object.fromEntries(
              Object.keys((data.loopOutputs || {}) as Data).map((key) => [key, { type: 'array' }])
            ),
          },
        };
      if (node.type === 'control.merge-branches')
        return (data.outputs as Schema) || { type: 'object' };
      const operation =
        asValue((data.inputsValues as Data)?.operation).content ??
        asValue((node.defaults.inputsValues as Data)?.operation).content;
      return node.outputsByOperation?.[String(operation)] || node.outputSchema;
    },
  };
});
export function definitionFor(node: WorkflowNode): NodeDefinition {
  return nodeDefinitions[node.type] || { fields: [], output: () => ({ type: 'object' }) };
}
export function visibleFields(node: WorkflowNode) {
  return definitionFor(node).fields.filter((field) => {
    if (!field.visible) return true;
    const source = definitionFor(node).fields.find(
      (candidate) =>
        candidate.key === field.visible!.field ||
        candidate.key === `inputsValues.${field.visible!.field}`
    );
    const value = source
      ? readPath(node.data, source.key.split('.'))
      : (node.data.inputsValues as Data)?.[field.visible.field];
    return field.visible.values.includes(asValue(value).content ?? source?.defaultValue);
  });
}
