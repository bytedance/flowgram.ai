/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { ReactNode } from 'react';

import { Check, ChevronDown, Plug, Workflow } from 'lucide-react';

import { Popover } from '../ui/popover';
import { ModelPicker } from '../model-picker';
import { BufferedInput, ValueEditor } from '../form/value-editor';
import { FormSessionProvider, useFormSession } from '../form/session';
import { FormField, FormSection, Select } from '../form/field';
import { ConditionBuilder, MappingEditor, SchemaEditor } from '../form/editors';
import { BranchEditor, BranchMappingsEditor, NodeLinkEditor } from '../form/control-editors';
import { PathsEditor, PredicateEditor, RecordsEditor } from '../form/collection-editors';
import { useProject } from '../../lib/project-context';
import type { ModelSelection } from '../../lib/models';
import { tx } from '../../lib/i18n';
import type { Branch } from '../../lib/control-nodes';
import {
  asValue,
  accessibleNodes,
  flattenNodes,
  readPath,
  resolveSample,
  writePath,
  type Data,
  type Schema,
} from './model';
import { definitionFor, visibleFields, type FieldDefinition } from './definitions';

function ResourcePicker({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const session = useFormSession();
  const { projectId } = useProject();
  if (field.resource === 'model')
    return (
      <ModelPicker
        value={(value || {}) as ModelSelection}
        onChange={onChange}
        projectId={projectId}
        tools={session.node.type === 'agent'}
      />
    );
  const current = asValue(value).content;
  const selected = session.workflows.find((w) => w.id === current);
  return (
    <Popover
      label={tx('选择工作流')}
      trigger={
        <button type="button" className="nf-resource">
          <Workflow size={15} />
          <span>{selected?.name || tx('选择项目中的工作流')}</span>
          <ChevronDown size={13} />
        </button>
      }
    >
      {(close) => (
        <div className="nf-menu">
          {session.workflows.length ? (
            session.workflows.map((workflow) => (
              <button
                key={workflow.id}
                type="button"
                onClick={() => {
                  onChange({ type: 'constant', content: workflow.id });
                  close();
                }}
              >
                {workflow.name}
                <small>v{workflow.revision}</small>
              </button>
            ))
          ) : (
            <p className="nf-empty">{tx('当前项目没有其他可调用的工作流。')}</p>
          )}
        </div>
      )}
    </Popover>
  );
}
function ToolSet({ tools }: { tools: string[] }) {
  return (
    <div className="nf-tool-set">
      {tools.map((name) => (
        <div className="nf-tool-row" key={name}>
          <Plug size={14} />
          <span>{name}</span>
          <Check size={12} />
        </div>
      ))}
    </div>
  );
}
export function OutputTree({ schema, path = '' }: { schema: Schema; path?: string }) {
  return (
    <div className="nf-output-tree">
      {Object.entries(schema.properties || {}).map(([key, child]) => (
        <div key={key}>
          {child.type === 'object' && child.properties ? (
            <details>
              <summary>
                <ChevronDown size={12} />
                <code>{key}</code>
                <span>{child.type}</span>
              </summary>
              <OutputTree schema={child} path={`${path}${key}.`} />
            </details>
          ) : (
            <div className="nf-output-row">
              <code>{key}</code>
              <span>
                {child.type || tx('未知类型')}
                {child.type === 'array' && child.items?.type ? `<${child.items.type}>` : ''}
              </span>
            </div>
          )}
          {child.description && <p className="nf-hint">{child.description}</p>}
        </div>
      ))}
      {!Object.keys(schema.properties || {}).length && (
        <p className="nf-hint">{tx('结果字段由执行数据决定，可在测试后查看实际结果。')}</p>
      )}
    </div>
  );
}
export function NodeForm({ onChange }: { onChange: (data: Data) => void }) {
  const session = useFormSession();
  const { node } = session;
  const fields = visibleFields(node);
  const itemScope = () => {
    const input = asValue((node.data.inputsValues as Data)?.items);
    let sample = resolveSample(input, session.bindings);
    if (!Array.isArray(sample)) {
      try {
        sample = JSON.parse(session.buffers[`${node.id}:__test.inputs`]?.text || '{}').items;
      } catch {
        /* An unfinished test input cannot supply a preview. */
      }
    }
    const item = Array.isArray(sample) ? sample[0] : undefined;
    const infer = (value: unknown): Schema =>
      value === null
        ? { type: 'null' }
        : Array.isArray(value)
        ? { type: 'array', items: value.length ? infer(value[0]) : {} }
        : typeof value === 'object' && value
        ? {
            type: 'object',
            properties: Object.fromEntries(
              Object.entries(value).map(([key, value]) => [key, infer(value)])
            ),
          }
        : value === undefined
        ? {}
        : { type: typeof value };
    let itemSchema = infer(item);
    if (input.type === 'ref' && Array.isArray(input.content)) {
      const path = input.content as string[];
      const upstream = flattenNodes(session.schema.nodes).find((n) => n.id === path[0]);
      let schema: Schema | undefined = upstream
        ? definitionFor(upstream).output(upstream.data)
        : undefined;
      path.slice(1).forEach((key) => {
        schema = schema?.type === 'array' ? schema.items : schema?.properties?.[key];
      });
      if (schema?.items) itemSchema = schema.items;
    }
    return {
      ...session,
      bindings: { ...session.bindings, ...(item === undefined ? {} : { item }), index: 0 },
      variableNodes: [
        ...accessibleNodes(session.schema, node.id),
        { id: 'item', type: 'start', data: { title: tx('当前项'), outputs: itemSchema } },
        {
          id: 'index',
          type: 'start',
          data: { title: tx('当前索引'), outputs: { type: 'integer' } },
        },
      ],
    };
  };
  const render = (field: FieldDefinition, bare = false) => {
    const path = field.key.split('.');
    const raw =
      readPath(node.data, path) ??
      (field.defaultValue === undefined
        ? undefined
        : field.key.startsWith('inputsValues.')
        ? { type: 'constant', content: field.defaultValue }
        : field.defaultValue);
    const update = (value: unknown) => onChange(writePath(node.data, path, value));
    let editor: ReactNode;
    switch (field.editor) {
      case 'branches':
        editor = (
          <BranchEditor
            value={(raw || []) as Branch[]}
            onChange={update}
            operators={field.operators || []}
          />
        );
        break;
      case 'branch-mappings':
        editor = <BranchMappingsEditor value={(raw || {}) as Data} onChange={update} />;
        break;
      case 'node-select':
        editor = <NodeLinkEditor field={field.key} value={raw} onChange={update} />;
        break;
      case 'number':
        editor = (
          <BufferedInput
            kind="number"
            expected="integer"
            value={raw}
            onChange={update}
            bufferKey={field.key}
            label={field.label}
            min={field.min}
            max={field.max}
          />
        );
        break;
      case 'paths':
        editor = (
          <PathsEditor value={(raw || []) as string[]} onChange={update} bufferKey={field.key} />
        );
        break;
      case 'records':
        editor = (
          <RecordsEditor
            value={(raw || []) as Data[]}
            columns={field.columns || []}
            onChange={update}
            bufferKey={field.key}
            label={field.label}
          />
        );
        break;
      case 'predicate':
        editor = (
          <PredicateEditor
            value={(raw || { combinator: 'and', rules: [] }) as Data}
            onChange={update}
            bufferKey={field.key}
            operators={field.operators || []}
          />
        );
        break;
      case 'resource':
        editor = <ResourcePicker field={field} value={raw} onChange={update} />;
        break;
      case 'tools':
        editor = <ToolSet tools={field.tools || []} />;
        break;
      case 'select':
        editor = (
          <Select
            aria-label={field.label}
            value={String(asValue(raw).content ?? field.choices?.[0]?.[0] ?? '')}
            onValueChange={(selectedValue) =>
              update(
                field.key.startsWith('inputsValues.')
                  ? { type: 'constant', content: selectedValue }
                  : selectedValue
              )
            }
            options={[
              ...(field.choices?.map(([value, label]) => ({ value: value, label: label })) || []),
            ]}
          />
        );
        break;
      case 'mapping': {
        const child =
          field.scope === 'children' ? node.blocks?.find((n) => n.type === 'block-end') : undefined;
        const variableNodes = child
          ? [...accessibleNodes(session.schema, child.id), child]
          : session.variableNodes;
        editor = (
          <FormSessionProvider
            value={field.scope === 'items' ? itemScope() : { ...session, variableNodes }}
          >
            <MappingEditor value={(raw || {}) as Data} onChange={update} bufferKey={field.key} />
          </FormSessionProvider>
        );
        break;
      }
      case 'schema':
        editor = (
          <SchemaEditor
            value={(raw || { type: 'object', properties: {} }) as Schema}
            onChange={update}
            bufferKey={field.key}
          />
        );
        break;
      case 'key-value':
        editor = (
          <ValueEditor
            value={raw}
            onChange={update}
            label={field.label}
            bufferKey={field.key}
            expected="object"
            renderConstant={(value, change) => (
              <MappingEditor
                literal
                literalType={field.valueType || 'any'}
                value={(value || {}) as Data}
                onChange={change}
                bufferKey={field.key}
              />
            )}
          />
        );
        break;
      case 'conditions':
        editor = <ConditionBuilder value={raw} onChange={update} bufferKey={field.key} />;
        break;
      default:
        editor = (
          <ValueEditor
            value={raw}
            onChange={update}
            label={field.label}
            expected={field.type}
            multiline={field.multiline}
            min={field.min}
            max={field.max}
            bufferKey={field.key}
          />
        );
    }
    if (node.type === 'control.repeat' && field.key === 'predicate')
      editor = (
        <FormSessionProvider
          value={{
            ...session,
            variableNodes: [
              ...accessibleNodes(session.schema, node.id),
              {
                id: 'state',
                type: 'start',
                data: { title: tx('当前循环状态'), outputs: node.data.stateSchema },
              },
              {
                id: 'index',
                type: 'start',
                data: { title: tx('当前轮次'), outputs: { type: 'integer' } },
              },
            ],
          }}
        >
          {editor}
        </FormSessionProvider>
      );
    if (field.scope === 'items' && field.editor !== 'mapping')
      editor = <FormSessionProvider value={itemScope()}>{editor}</FormSessionProvider>;
    if (bare) return <div key={field.key}>{editor}</div>;
    return (
      <FormField key={field.key} label={field.label} required={field.required} hint={field.hint}>
        {editor}
      </FormField>
    );
  };
  const groups = Array.from(
    new Set(fields.map((field) => field.section).filter(Boolean))
  ) as string[];
  return (
    <div className="nf-form">
      {fields
        .filter((field) => !field.section)
        .map((field, index, all) => {
          if (!field.row) return render(field);
          if (all.findIndex((candidate) => candidate.row === field.row) !== index) return null;
          const row = all.filter((candidate) => candidate.row === field.row);
          return (
            <FormField
              key={field.row}
              label={field.rowLabel || field.label}
              required={row.some((f) => f.required)}
            >
              <div className="nf-inline-fields">{row.map((f) => render(f, true))}</div>
            </FormField>
          );
        })}
      {groups.map((group) => (
        <FormSection key={group} title={group}>
          {fields.filter((field) => field.section === group).map((field) => render(field))}
        </FormSection>
      ))}
      <FormSection title={tx('运行设置')} summary={tx('超时与取消')}>
        <FormField
          label={tx('执行超时')}
          hint={tx('单位毫秒；留空使用执行器默认值，最大 180 秒。')}
        >
          <BufferedInput
            optional
            kind="number"
            expected="integer"
            min={10}
            max={180000}
            label={tx('执行超时')}
            bufferKey="runtime.timeoutMs"
            value={readPath(node.data, ['runtime', 'timeoutMs'])}
            onChange={(value) => onChange(writePath(node.data, ['runtime', 'timeoutMs'], value))}
          />
        </FormField>
        <p className="nf-hint">
          {tx('执行失败会停止当前作用域；测试与完整流程使用同一执行器，均支持取消。')}
        </p>
      </FormSection>
    </div>
  );
}
