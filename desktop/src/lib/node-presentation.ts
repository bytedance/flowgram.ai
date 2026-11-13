/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import {
  definitionFor,
  visibleFields,
  type FieldDefinition,
} from '../components/node-inspector/definitions';
import {
  asValue,
  flattenNodes,
  readPath,
  type Data,
  type Schema,
} from '../components/node-inspector/model';
import type { WorkflowNode, WorkflowSchema } from './types';
import type { ModelInventory, ModelTrace } from './models';
import { tx } from './i18n';
import { nodeSpec } from './node-catalog';
import { summaryFields, type NodePreviewRow, type NodePreviewToken } from './node-preview';

export interface NodeResources {
  names: Record<string, string>;
  workflows: Record<string, string>;
  models?: ModelInventory;
  modelTraces?: Record<string, ModelTrace>;
  readOnly?: boolean;
  owners?: Record<string, { title: string; type: string }>;
}
export function nodeNames(schema: WorkflowSchema) {
  return Object.fromEntries(
    flattenNodes(schema.nodes).map((node) => [
      node.id,
      String(node.data.title || nodeSpec(node.type).title),
    ])
  );
}
export function loopOwners(
  schema: WorkflowSchema,
  owner?: { title: string; type: string }
): NonNullable<NodeResources['owners']> {
  return Object.fromEntries(
    schema.nodes.flatMap((node) => [
      ...(owner ? [[node.id, owner]] : []),
      ...Object.entries(
        node.blocks
          ? loopOwners(
              { nodes: node.blocks, edges: node.edges || [] },
              { title: String(node.data.title || nodeSpec(node.type).title), type: node.type }
            )
          : {}
      ),
    ])
  );
}
const sensitive = /authorization|password|secret|token|api.?key|headers|credential/i;
export function describeValue(raw: unknown, resources: NodeResources): string {
  const value = asValue(raw);
  if (value.type === 'ref') {
    const path = Array.isArray(value.content) ? value.content.map(String) : [];
    const local = {
      item: tx('当前项'),
      index: tx('当前序号'),
      state: tx('循环状态'),
      loop_locals: tx('循环变量'),
    } as Record<string, string>;
    return path.length
      ? `「${resources.names[path[0]] || local[path[0]] || tx('来源节点')}」${
          path.length > 1 ? '.' + path.slice(1).join('.') : ''
        }`
      : tx('未指定引用');
  }
  if (value.type === 'expression') return tx('表达式');
  if (value.type === 'template') return tx('文本模板');
  if (value.content == null) return value.content === null ? 'null' : tx('未配置');
  if (Array.isArray(value.content)) return tx('{0} 项', [value.content.length]);
  if (typeof value.content === 'object')
    return tx('{0} 个字段', [Object.keys(value.content).length]);
  if (value.content === '') return '""';
  return String(value.content).replace(/\s+/g, ' ').slice(0, 180);
}
const operators: Record<string, string> = {
  eq: '=',
  neq: '≠',
  gt: '>',
  gte: '≥',
  lt: '<',
  lte: '≤',
  contains: '包含',
  starts: '开头是',
  ends: '结尾是',
  in: '属于',
  exists: '已设置',
  missing: '未设置',
  null: '为空值',
  empty: '为空',
};
export function describePredicate(raw: unknown, resources: NodeResources, depth = 0): string {
  const data = (raw || {}) as Data;
  if (depth > 4) return tx('嵌套条件');
  if (Array.isArray(data.rules)) {
    const join = data.combinator === 'or' ? ` ${tx('或')} ` : ` ${tx('且')} `;
    return (
      data.rules
        .map((rule) => describePredicate(rule, resources, depth + 1))
        .filter(Boolean)
        .join(join) || tx('请配置条件')
    );
  }
  if (!data.operator) return tx('请配置条件');
  const op = String(data.operator);
  return [
    describeValue(data.left, resources),
    tx(operators[op] || op),
    ...(['exists', 'missing', 'null', 'empty'].includes(op)
      ? []
      : [describeValue(data.right, resources)]),
  ].join(' ');
}
export function describePort(node: WorkflowNode, id: string, resources: NodeResources) {
  if (id === 'else' && ['control.switch', 'condition'].includes(node.type))
    return tx('未匹配其他条件');
  if (node.type === 'control.switch') {
    const branch = ((node.data.branches as Data[]) || []).find((branch) => branch.id === id);
    return describePredicate(branch?.predicate, resources);
  }
  if (node.type === 'condition') {
    const conditions = ((node.data.conditions as Data[]) || []).filter(
      (condition) => String(condition.key || 'true') === id
    );
    return conditions
      .map((condition) => describePredicate(condition.value, resources))
      .join(` ${tx('且')} `);
  }
  return '';
}
export function safeRequestAddress(raw: unknown, resources: NodeResources) {
  const value = asValue(raw);
  if (value.type !== 'constant') return describeValue(raw, resources);
  if (!value.content) return tx('请配置请求地址');
  try {
    const url = new URL(String(value.content));
    if (!['http:', 'https:'].includes(url.protocol)) return tx('请求地址无效');
    return url.host + url.pathname;
  } catch {
    return tx('请求地址无效');
  }
}
function fieldText(node: WorkflowNode, field: FieldDefinition, resources: NodeResources) {
  const raw = readPath(node.data, field.key.split('.')) ?? field.defaultValue;
  const value = asValue(raw);
  if (value.type !== 'constant') return describeValue(raw, resources);
  if (field.choices && value.type === 'constant')
    return (
      field.choices.find(([key]) => key === String(value.content))?.[1] ||
      describeValue(raw, resources)
    );
  if (field.editor === 'predicate') return describePredicate(raw, resources);
  if (field.editor === 'mapping' || field.editor === 'branch-mappings') {
    const entries = Object.entries((raw || {}) as Data);
    return (
      entries
        .slice(0, 2)
        .map(([key, value]) => `${key} ← ${describeValue(value, resources)}`)
        .join(' · ') || tx('请配置字段映射')
    );
  }
  if (field.editor === 'schema') {
    const properties = (raw as Schema)?.properties || {};
    return (
      Object.entries(properties)
        .map(([key, value]) => `${key}: ${value.type || 'unknown'}`)
        .join(' · ') || tx('未声明字段')
    );
  }
  if (field.multiline && typeof value.content === 'string')
    return (
      value.content
        .split(/\r?\n/)
        .find((line) => line.trim())
        ?.trim()
        .slice(0, 180) || '""'
    );
  if (Array.isArray(value.content))
    return (
      value.content
        .slice(0, 3)
        .map((item) =>
          item === null || typeof item !== 'object'
            ? describeValue(item, resources)
            : Object.entries((item as Data) || {})
                .filter(([key]) => !sensitive.test(key))
                .map(([key, val]) => `${key}: ${describeValue(val, resources)}`)
                .join(' ')
        )
        .join(' · ') || tx('未配置')
    );
  return describeValue(raw, resources);
}
// Summary selection is declarative; the renderer has no per-node-type markup.
export function previewValue(raw: unknown, resources: NodeResources): NodePreviewToken {
  const value = asValue(raw);
  if (value.type === 'ref' && Array.isArray(value.content) && value.content.length) {
    const [source, ...path] = value.content.map(String);
    const locals: Record<string, string> = {
      item: tx('当前项'),
      index: tx('当前序号'),
      state: tx('循环状态'),
      loop_locals: tx('循环变量'),
    };
    return {
      kind: 'reference',
      text: resources.names[source] || locals[source] || tx('来源节点'),
      detail: path.join('.') || undefined,
    };
  }
  if (value.type === 'constant' && value.content === '') return { kind: 'code', text: '""' };
  return {
    kind:
      value.type === 'expression' ||
      typeof value.content === 'number' ||
      typeof value.content === 'boolean' ||
      value.content === null
        ? 'code'
        : 'text',
    text: describeValue(raw, resources),
  };
}
export function previewPredicate(
  raw: unknown,
  resources: NodeResources,
  depth = 0
): NodePreviewToken[] {
  const data = (raw || {}) as Data;
  if (depth > 4) return [{ kind: 'text', text: tx('嵌套条件') }];
  if (Array.isArray(data.rules)) {
    if (!data.rules.length) return [{ kind: 'text', text: tx('请配置条件') }];
    const tokens = data.rules.flatMap((rule, index) => [
      ...(index
        ? [{ kind: 'text' as const, text: tx(data.combinator === 'or' ? '或' : '且') }]
        : []),
      ...previewPredicate(rule, resources, depth + 1),
    ]);
    return depth && data.rules.length > 1
      ? [{ kind: 'text', text: '(' }, ...tokens, { kind: 'text', text: ')' }]
      : tokens;
  }
  if (!data.operator) return [{ kind: 'text', text: tx('请配置条件') }];
  const op = String(data.operator);
  return [
    previewValue(data.left, resources),
    { kind: 'text', text: tx(operators[op] || op) },
    ...(['exists', 'missing', 'null', 'empty'].includes(op)
      ? []
      : [previewValue(data.right, resources)]),
  ];
}
function fieldTokens(properties: Record<string, Schema>): NodePreviewToken[] {
  const entries = Object.entries(properties);
  return entries.length
    ? [
        ...entries
          .slice(0, 2)
          .map(([text, schema]) => ({ kind: 'field' as const, text, detail: schema.type })),
        ...(entries.length > 2
          ? [
              {
                kind: 'count' as const,
                text: `+${entries.length - 2}`,
                detail: entries
                  .slice(2)
                  .map(([name, schema]) => `${name}: ${schema.type || 'unknown'}`)
                  .join(' · '),
              },
            ]
          : []),
      ]
    : [{ kind: 'text', text: tx('未声明字段') }];
}
export function presentNode(node: WorkflowNode, resources: NodeResources) {
  const data = node.data;
  const inputs = (data.inputsValues || {}) as Data;
  const scalar = (key: string, fallback?: unknown) => asValue(inputs[key]).content ?? fallback;
  const text = (text: string): NodePreviewToken => ({ kind: 'text', text });
  const row = (tokens: NodePreviewToken[], label?: string): NodePreviewRow => ({ label, tokens });
  const fields = visibleFields(node);
  const missing = fields.find((field) => {
    if (!field.required || (node.type === 'subworkflow' && field.key === 'inputsValues.inputs'))
      return false;
    const value = asValue(readPath(data, field.key.split('.')) ?? field.defaultValue);
    return (
      value.content === undefined ||
      value.content === '' ||
      value.content === null ||
      (value.type === 'ref' && (!Array.isArray(value.content) || !value.content.length))
    );
  });
  const issue = missing ? tx('请配置{0}', [missing.label]) : undefined;
  const present = (rows: NodePreviewRow[], diagnostic = issue) => ({
    rows,
    // Plain text is also used by search, accessible descriptions and contract tests.
    lines: rows.map(({ label, tokens }) =>
      [
        label,
        tokens
          .map((token) =>
            token.kind === 'reference'
              ? `「${token.text}」${token.detail ? '.' + token.detail : ''}`
              : token.text + (token.kind === 'field' && token.detail ? ': ' + token.detail : '')
          )
          .join(' · '),
      ]
        .filter(Boolean)
        .join(' · ')
    ),
    issue: diagnostic,
  });
  if (node.type === 'http') {
    const address = safeRequestAddress(inputs.url, resources);
    const method = asValue(inputs.method);
    return present(
      [
        row(
          [
            method.type === 'constant'
              ? { kind: 'code', text: String(method.content ?? 'GET') }
              : previewValue(inputs.method, resources),
          ],
          tx('方法')
        ),
        row(
          [
            asValue(inputs.url).type === 'constant'
              ? { kind: 'text', text: address }
              : previewValue(inputs.url, resources),
          ],
          tx('地址')
        ),
      ],
      issue || ([tx('请求地址无效'), tx('请配置请求地址')].includes(address) ? address : undefined)
    );
  }
  if (['wait', 'delay'].includes(node.type)) {
    const value = asValue(inputs.durationMs);
    const duration =
      typeof value.content === 'number' && value.type === 'constant'
        ? value.content >= 1000
          ? `${value.content / 1000} s`
          : `${value.content} ms`
        : undefined;
    return present([
      row(
        duration
          ? [{ kind: 'code', text: duration }]
          : [previewValue(inputs.durationMs, resources), text('ms')],
        tx('时长')
      ),
    ]);
  }
  if (['llm', 'agent'].includes(node.type)) {
    const trace = resources.modelTraces?.[node.id];
    const selected =
      (data.model as { modelId?: string })?.modelId || resources.models?.defaults.workflow;
    const model = resources.models?.models.find((model) => model.id === selected);
    const name = trace?.modelName || (!resources.readOnly && model?.name);
    const schema =
      trace?.parameters.outputSchema ||
      (data.model as { parameters?: { outputSchema?: unknown } })?.parameters?.outputSchema ||
      (!resources.readOnly && model?.parameters.outputSchema);
    return present(
      [
        row([
          {
            kind: 'resource',
            text: name || (resources.readOnly ? tx('未采集模型配置') : tx('请选择模型')),
          },
        ]),
        row([
          text(
            node.type === 'agent'
              ? `${tx('{0} 个工具', [
                  definitionFor(node).fields.find((field) => field.editor === 'tools')?.tools
                    ?.length || 0,
                ])} · ${tx('最多 {0} 轮', [scalar('maxSteps', 6) as number])}`
              : schema
              ? tx('结构化输出')
              : tx('文本输出')
          ),
        ]),
      ],
      issue || (!resources.readOnly && !model ? tx('请选择模型') : undefined)
    );
  }
  if (node.type === 'subworkflow') {
    const reference = asValue(inputs.workflowId);
    const name =
      reference.type === 'constant'
        ? resources.workflows[String(reference.content)]
        : describeValue(inputs.workflowId, resources);
    return present(
      [
        row([{ kind: 'resource', text: name || tx('请选择工作流') }]),
        row([text(tx('运行时固定依赖版本'))]),
      ],
      issue || (!name && !resources.readOnly ? tx('请选择工作流') : undefined)
    );
  }
  if (node.type === 'loop')
    return present([
      row([previewValue(data.loopFor, resources)], tx('遍历')),
      row([
        text(
          data.mode === 'parallel' ? tx('并发 {0}', [Number(data.concurrency || 4)]) : tx('串行')
        ),
        text(
          data.errorMode === 'collect'
            ? tx('保留失败项')
            : data.errorMode === 'skip'
            ? tx('跳过失败项')
            : tx('失败时停止')
        ),
      ]),
    ]);
  if (node.type === 'control.repeat')
    return present([
      row(previewPredicate(data.predicate, resources), tx('直到')),
      row([
        text(tx('最多 {0} 轮', [Number(data.maxIterations || 20)])),
        text(tx(data.check === 'after' ? '执行后检查' : '执行前检查')),
      ]),
    ]);
  if (node.type === 'control.switch')
    return present(
      [row([text(tx(data.mode === 'all' ? '所有匹配分支' : '首个匹配分支'))])],
      issue || (!((data.branches as Data[]) || []).length ? tx('请配置分支') : undefined)
    );
  if (node.type === 'control.parallel')
    return present([row([text(tx('全部启动 · 并发 {0}', [Number(data.concurrency || 4)]))])]);
  if (node.type === 'condition') return present([row([text(tx('首个匹配分支'))])]);
  if (node.type === 'control.join')
    return present([
      row([
        text(
          data.policy === 'first-success'
            ? tx('等待首个成功分支')
            : data.policy === 'quorum'
            ? tx('等待 {0} 个成功分支', [Number(data.quorum || 1)])
            : tx('等待全部活动分支')
        ),
      ]),
    ]);
  if (node.type === 'control.merge-branches')
    return present([row([text(tx('合并命中的互斥分支'))])]);
  if (['block-start', 'block-end', 'control.break', 'control.continue'].includes(node.type))
    return present([]);
  if (node.type === 'start')
    return present([row(fieldTokens((data.outputs as Schema)?.properties || {}))]);
  if (['end', 'assign'].includes(node.type))
    return present([
      row(fieldTokens(Object.fromEntries(Object.keys(inputs).map((key) => [key, {}])))),
    ]);
  const selectedFields = summaryFields[node.type];
  const selected = selectedFields
    ? selectedFields
        .map((key) => fields.find((field) => field.key === key))
        .filter((field): field is FieldDefinition => !!field)
    : fields.filter((field) => !sensitive.test(field.key) && field.editor !== 'tools').slice(0, 2);
  return present(
    selected.slice(0, 2).map((field) => {
      const raw = readPath(data, field.key.split('.')) ?? field.defaultValue;
      if (field.editor === 'records' && field.columns?.length && Array.isArray(raw)) {
        const columns = field.columns;
        const describeCell = (
          record: Data,
          column: NonNullable<FieldDefinition['columns']>[number]
        ) => {
          const value = record[column.key];
          return (
            column.choices?.find(([key]) => key === String(value))?.[1] ||
            describeValue(value, resources)
          );
        };
        return row(
          [
            ...raw.slice(0, 2).map(
              (record: Data): NodePreviewToken => ({
                kind: 'field',
                text: describeCell(record, columns[0]),
                detail: columns[1] ? describeCell(record, columns[1]) : undefined,
                description: columns
                  .map((column) => `${column.label}: ${describeCell(record, column)}`)
                  .join(' · '),
              })
            ),
            ...(raw.length > 2 ? [{ kind: 'count' as const, text: `+${raw.length - 2}` }] : []),
            ...(!raw.length ? [text(tx('未配置'))] : []),
          ],
          field.label
        );
      }
      if (field.editor === 'schema')
        return row(fieldTokens((raw as Schema)?.properties || {}), field.label);
      if (field.editor === 'predicate') return row(previewPredicate(raw, resources));
      if (field.editor === 'mapping' || field.editor === 'branch-mappings') {
        const entries = Object.entries((raw || {}) as Data).filter(([key]) => !sensitive.test(key));
        const first = entries[0];
        return row(
          first
            ? [
                { kind: 'field', text: first[0] },
                text('←'),
                previewValue(first[1], resources),
                ...(entries.length > 1
                  ? [
                      {
                        kind: 'count' as const,
                        text: `+${entries.length - 1}`,
                        detail: entries
                          .slice(1)
                          .map(([key]) => key)
                          .join(' · '),
                      },
                    ]
                  : []),
              ]
            : [text(tx('请配置字段映射'))]
        );
      }
      return row(
        [
          asValue(raw).type !== 'constant'
            ? previewValue(raw, resources)
            : {
                kind: field.editor === 'select' ? 'code' : 'text',
                text: fieldText(node, field, resources),
              },
        ],
        field.label
      );
    })
  );
}
