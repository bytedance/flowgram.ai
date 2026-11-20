/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, type ReactNode } from 'react';

import { Braces, ChevronDown, Search, Workflow, X } from 'lucide-react';

import { Popover } from '../ui/popover';
import { Input } from '../ui/input';
import {
  accessibleNodes,
  asValue,
  readPath,
  signature,
  type FlowValue,
  type Schema,
} from '../node-inspector/model';
import { definitionFor } from '../node-inspector/definitions';
import { nodeSpec } from '../../lib/node-catalog';
import { errorText, tx } from '../../lib/i18n';
import { useFormSession } from './session';
import { Select } from './field';

function actualType(value: unknown): string {
  return value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
}
export function compatible(expected: string | undefined, actual: string | undefined) {
  return (
    !expected ||
    expected === 'any' ||
    !actual ||
    actual === 'any' ||
    expected === actual ||
    (expected === 'number' && actual === 'integer') ||
    (expected === 'integer' && actual === 'number')
  );
}

export function BufferedInput({
  value,
  onChange,
  label,
  bufferKey,
  kind = 'json',
  expected,
  min,
  max,
  optional = false,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
  label: string;
  bufferKey: string;
  kind?: 'json' | 'number';
  expected?: string;
  min?: number;
  max?: number;
  optional?: boolean;
}) {
  const session = useFormSession();
  const key = `${session.node.id}:${bufferKey}`;
  const serialized = signature(value);
  const buffer = session.buffers[key];
  const text =
    buffer && (buffer.invalid || buffer.signature === serialized)
      ? buffer.text
      : value === undefined
      ? ''
      : kind === 'number'
      ? String(value)
      : JSON.stringify(value, null, 2);
  const edit = (next: string) => {
    let parsed: unknown;
    let error: string | undefined;
    try {
      if (!next.trim() && optional) parsed = undefined;
      else if (kind === 'number') {
        if (!next.trim()) throw new Error(tx('请输入数值'));
        parsed = Number(next);
        if (!Number.isFinite(parsed) || (expected === 'integer' && !Number.isInteger(parsed)))
          throw new Error(tx('请输入有效的') + (expected === 'integer' ? tx('整数') : tx('数值')));
        if (
          (min !== undefined && (parsed as number) < min) ||
          (max !== undefined && (parsed as number) > max)
        )
          throw new Error(tx('数值范围为 {0}–{1}', [min ?? tx('不限'), max ?? tx('不限')]));
      } else {
        parsed = JSON.parse(next);
        if (!compatible(expected, actualType(parsed)))
          throw new Error(tx('需要 {0} 类型的数据', [expected]));
      }
    } catch (e) {
      error = (e as Error).message;
    }
    session.setBuffer(key, {
      text: next,
      invalid: error,
      signature: error ? serialized : signature(parsed),
    });
    if (!error) onChange(parsed);
  };
  return (
    <div className="nf-buffer">
      {kind === 'number' ? (
        <Input
          aria-label={label}
          inputMode="decimal"
          value={text}
          aria-invalid={!!buffer?.invalid}
          onChange={(e) => edit(e.target.value)}
        />
      ) : (
        <textarea
          aria-label={label}
          className="nf-textarea nf-code"
          spellCheck={false}
          value={text}
          aria-invalid={!!buffer?.invalid}
          onChange={(e) => edit(e.target.value)}
        />
      )}
      {buffer?.invalid && (
        <p className="nf-error" role="alert">
          {errorText(buffer.invalid)}
        </p>
      )}
    </div>
  );
}

interface Variable {
  path: string[];
  label: string;
  source: string;
  type?: string;
  sample: unknown;
}
export function VariablePicker({
  expected,
  select,
}: {
  expected?: string;
  select: (path: string[]) => void;
}) {
  const session = useFormSession();
  const [query, setQuery] = useState('');
  const nodes = session.variableNodes || accessibleNodes(session.schema, session.node.id);
  const variables: Variable[] = [];
  function visit(path: string[], label: string, source: string, schema: Schema, depth: number) {
    if (variables.length >= 250 || depth > 5) return;
    const sample = readPath(session.bindings, path);
    variables.push({ path, label, source, type: schema.type, sample });
    const properties =
      schema.properties ||
      (sample && typeof sample === 'object' && !Array.isArray(sample)
        ? Object.fromEntries(
            Object.entries(sample)
              .slice(0, 40)
              .map(([key, value]) => [key, { type: actualType(value) }])
          )
        : {});
    Object.entries(properties).forEach(([key, child]) =>
      visit([...path, key], `${label} / ${key}`, source, child, depth + 1)
    );
    if (schema.type === 'array' && schema.items)
      visit([...path, '0'], tx('{0} / 第一项', [label]), source, schema.items, depth + 1);
  }
  nodes.forEach((node) =>
    visit(
      [node.id],
      String(node.data.title || nodeSpec(node.type).title),
      node.id,
      definitionFor(node).output(node.data),
      0
    )
  );
  const matches = variables.filter((v) =>
    `${v.label} ${v.path.join('.')}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <div className="nf-picker-search">
        <Search size={15} />
        <input
          autoFocus
          aria-label={tx('搜索变量')}
          placeholder={tx('搜索上游字段…')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="nf-picker-options">
        {!matches.length && (
          <p className="nf-empty">{tx('没有可访问的上游变量。先连接节点并定义输入。')}</p>
        )}
        {matches.map((v) => (
          <button
            key={JSON.stringify(v.path)}
            type="button"
            className="nf-variable-option"
            disabled={!compatible(expected, v.type)}
            onClick={() => select(v.path)}
          >
            <Workflow size={14} />
            <span>
              <span>{v.label}</span>
              {v.sample !== undefined && (
                <small>
                  {typeof v.sample === 'string'
                    ? v.sample.slice(0, 80)
                    : JSON.stringify(v.sample).slice(0, 80)}
                </small>
              )}
            </span>
            <code>{v.type || tx('未知')}</code>
          </button>
        ))}
      </div>
    </>
  );
}

export function ValueEditor({
  value,
  onChange,
  label,
  bufferKey,
  expected = 'string',
  multiline,
  min,
  max,
  renderConstant,
  allowBinding = true,
}: {
  value: unknown;
  onChange: (value: FlowValue | undefined) => void;
  label: string;
  bufferKey: string;
  expected?: string;
  multiline?: boolean;
  min?: number;
  max?: number;
  allowBinding?: boolean;
  renderConstant?: (value: unknown, change: (value: unknown) => void) => ReactNode;
}) {
  const session = useFormSession();
  const current = asValue(value);
  const modeKey = `${session.node.id}:${bufferKey}:mode:`;
  const mode = current.type;
  const clearBufferErrors = () => {
    const prefix = `${session.node.id}:${bufferKey}`;
    Object.entries(session.buffers).forEach(([key, buffer]) => {
      if (
        (key === prefix || key.startsWith(prefix + '.') || key.startsWith(prefix + ':')) &&
        !key.includes(':mode:') &&
        buffer.invalid
      )
        session.setBuffer(key, { ...buffer, invalid: undefined });
    });
  };
  const setMode = (type: FlowValue['type']) => {
    if (type === mode) return;
    const prefix = `${session.node.id}:${bufferKey}`;
    const pending = Object.entries(session.buffers).filter(
      ([key]) =>
        (key === prefix || key.startsWith(prefix + '.') || key.startsWith(prefix + ':')) &&
        !key.includes(':mode:')
    );
    session.setBuffer(modeKey + mode + ':buffers', {
      text: JSON.stringify(pending),
      signature: '',
    });
    clearBufferErrors();
    try {
      const previousBuffers = session.buffers[modeKey + type + ':buffers'];
      if (previousBuffers)
        (
          JSON.parse(previousBuffers.text) as Array<[string, import('./session').EditorBuffer]>
        ).forEach(([key, buffer]) => session.setBuffer(key, buffer));
    } catch {
      /* An absent mode buffer starts clean. */
    }
    session.setBuffer(modeKey + mode, {
      text: JSON.stringify(current.content) ?? '',
      signature: '',
    });
    const previous = session.buffers[modeKey + type]?.text;
    let content: unknown;
    try {
      content = previous ? JSON.parse(previous) : undefined;
    } catch {
      /* A new mode starts with an empty value. */
    }
    if (content === undefined)
      content =
        type === 'ref'
          ? []
          : expected === 'object'
          ? {}
          : expected === 'array'
          ? []
          : expected === 'boolean'
          ? false
          : ['integer', 'number'].includes(expected)
          ? 0
          : '';
    onChange({ type, content });
  };
  const path = Array.isArray(current.content) ? (current.content as string[]) : [];
  const source = session.schema.nodes.length
    ? (session.variableNodes || accessibleNodes(session.schema, session.node.id)).find(
        (n) => n.id === path[0]
      )
    : undefined;
  const missing = mode === 'ref' && path.length > 0 && !source;
  const sampleType = actualType(current.content);
  const type =
    expected === 'any'
      ? ['undefined', 'string'].includes(sampleType)
        ? 'string'
        : sampleType
      : expected;
  const modeTrigger = (
    <button type="button" className="nf-value-mode" aria-label={tx('{0}取值方式', [label])}>
      {mode === 'ref' ? (
        <Braces size={14} />
      ) : mode === 'template' ? (
        'T'
      ) : type === 'number' || type === 'integer' ? (
        '#'
      ) : (
        'Aa'
      )}
      <ChevronDown size={10} />
    </button>
  );
  return (
    <div className={`nf-value-editor ${missing ? 'nf-invalid' : ''}`}>
      <div
        className={`nf-value-input ${multiline && mode !== 'ref' ? 'nf-multiline' : ''} ${
          renderConstant && mode === 'constant' ? 'nf-composite' : ''
        }`}
      >
        <Popover label={tx('取值方式')} width={180} trigger={modeTrigger}>
          {(close) => (
            <div className="nf-menu">
              {(
                [
                  ['constant', tx('固定值')],
                  ...(allowBinding ? [['ref', tx('变量引用')]] : []),
                  ...(allowBinding && (expected === 'string' || expected === 'any')
                    ? [['template', tx('文本模板')]]
                    : []),
                ] as Array<[FlowValue['type'], string]>
              ).map(([type, text]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setMode(type);
                    close();
                  }}
                >
                  {text}
                  <span>{mode === type ? '✓' : ''}</span>
                </button>
              ))}
              {expected === 'any' && (
                <>
                  <div className="nf-menu-caption">{tx('固定值类型')}</div>
                  {[
                    ['string', tx('文本')],
                    ['number', tx('数字')],
                    ['boolean', tx('布尔')],
                    ['object', tx('对象')],
                    ['array', tx('列表')],
                    ['null', tx('空值')],
                  ].map(([dataType, text]) => (
                    <button
                      key={dataType}
                      type="button"
                      aria-label={tx('{0}设为{1}', [label, text])}
                      onClick={() => {
                        clearBufferErrors();
                        const defaults: Record<string, unknown> = {
                          string: '',
                          number: 0,
                          boolean: false,
                          object: {},
                          array: [],
                          null: null,
                        };
                        onChange({ type: 'constant', content: defaults[dataType] });
                        close();
                      }}
                    >
                      {text}
                      <span>{mode === 'constant' && type === dataType ? '✓' : ''}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </Popover>
        {mode === 'ref' ? (
          <div className="nf-reference">
            <Popover
              label={tx('选择变量')}
              trigger={
                <button
                  type="button"
                  className="nf-reference-trigger"
                  aria-label={tx('选择{0}变量', [label])}
                >
                  {path.length ? (
                    <span className="nf-variable-chip">
                      <Workflow size={13} />
                      {String(source?.data.title || path[0])}
                      {path.length > 1 ? ` / ${path.slice(1).join(' / ')}` : ''}
                    </span>
                  ) : (
                    <span className="nf-placeholder">{tx('选择上游变量')}</span>
                  )}
                </button>
              }
            >
              {(close) => (
                <VariablePicker
                  expected={expected}
                  select={(content) => {
                    onChange({ type: 'ref', content });
                    close();
                  }}
                />
              )}
            </Popover>
            {path.length > 0 && (
              <button
                type="button"
                className="nf-value-clear"
                aria-label={tx('清除{0}引用', [label])}
                onClick={() => onChange({ type: 'ref', content: [] })}
              >
                <X size={12} />
              </button>
            )}
          </div>
        ) : mode === 'template' ? (
          <div className="nf-template">
            <textarea
              className="nf-plain-textarea"
              aria-label={label}
              value={String(current.content ?? '')}
              onChange={(e) => onChange({ type: 'template', content: e.target.value })}
            />
            <Popover
              label={tx('插入模板变量')}
              trigger={
                <button type="button" className="nf-text-action">
                  {tx('插入变量')}
                </button>
              }
            >
              {(close) => (
                <VariablePicker
                  select={(path) => {
                    onChange({
                      type: 'template',
                      content: `${String(current.content ?? '')}{{${path.join('.')}}}`,
                    });
                    close();
                  }}
                />
              )}
            </Popover>
          </div>
        ) : mode === 'expression' ? (
          <p className="nf-error">{tx('当前执行器不支持表达式，请切换取值方式。')}</p>
        ) : (
          <div className="nf-constant">
            {renderConstant ? (
              renderConstant(current.content, (content) => onChange({ type: 'constant', content }))
            ) : ['number', 'integer'].includes(type) ? (
              <BufferedInput
                value={current.content}
                onChange={(content) => onChange({ type: 'constant', content })}
                label={label}
                bufferKey={bufferKey}
                kind="number"
                expected={type}
                min={min}
                max={max}
              />
            ) : type === 'boolean' ? (
              <Select
                aria-label={label}
                value={String(current.content ?? false)}
                onValueChange={(selectedValue) =>
                  onChange({ type: 'constant', content: selectedValue === 'true' })
                }
                options={[
                  { value: 'false', label: tx('否') },
                  { value: 'true', label: tx('是') },
                ]}
              />
            ) : ['object', 'array', 'null'].includes(type) ? (
              <BufferedInput
                value={current.content ?? (type === 'object' ? {} : type === 'array' ? [] : null)}
                onChange={(content) => onChange({ type: 'constant', content })}
                label={label}
                bufferKey={bufferKey}
                expected={type}
              />
            ) : multiline ? (
              <textarea
                className="nf-plain-textarea"
                aria-label={label}
                value={String(current.content ?? '')}
                onChange={(e) => onChange({ type: 'constant', content: e.target.value })}
              />
            ) : (
              <input
                className="nf-plain-input"
                aria-label={label}
                value={String(current.content ?? '')}
                onChange={(e) => onChange({ type: 'constant', content: e.target.value })}
              />
            )}
          </div>
        )}
      </div>
      {missing && <p className="nf-error">{tx('引用不在当前可访问路径中，请重新选择变量。')}</p>}
    </div>
  );
}
