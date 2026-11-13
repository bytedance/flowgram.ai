/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, useState } from 'react';

import { ChevronRight, Plus, Trash2 } from 'lucide-react';

import { Input } from '../ui/input';
import { asValue, signature, type Data, type Schema } from '../node-inspector/model';
import { errorText, tx } from '../../lib/i18n';
import { ValueEditor } from './value-editor';
import { useFormSession } from './session';
import { Select } from './field';

interface Row {
  id: string;
  name: string;
  value: unknown;
}
function useRecordRows(value: Data, onChange: (value: Data) => void, bufferKey: string) {
  const session = useFormSession();
  const key = `${session.node.id}:${bufferKey}:rows`;
  const saved = session.buffers[key];
  const make = () =>
    Object.entries(value).map(([name, value]) => ({ id: crypto.randomUUID(), name, value }));
  const [rows, setRows] = useState<Row[]>(() => {
    try {
      if (saved && (saved.invalid || saved.signature === signature(value)))
        return JSON.parse(saved.text) as Row[];
    } catch {
      /* Use the saved execution definition. */
    }
    return make();
  });
  const last = useRef(signature(value));
  const current = signature(value);
  useEffect(() => {
    if (current !== last.current) {
      setRows(make());
      last.current = current;
    }
  }, [current]);
  const update = (next: Row[]) => {
    rows
      .filter((row) => !next.some((item) => item.id === row.id))
      .forEach((row) => {
        const prefix = `${session.node.id}:${bufferKey}.${row.id}`;
        Object.entries(session.buffers).forEach(([key, buffer]) => {
          if (
            (key === prefix || key.startsWith(prefix + '.') || key.startsWith(prefix + ':')) &&
            buffer.invalid
          )
            session.setBuffer(key, { ...buffer, invalid: undefined });
        });
      });
    setRows(next);
    const names = next.map((row) => row.name.trim());
    const invalid = names.some((name) => !name)
      ? tx('字段名称不能为空')
      : new Set(names).size !== names.length
      ? tx('字段名称不能重复')
      : undefined;
    const result = Object.fromEntries(next.map((row) => [row.name.trim(), row.value]));
    const nextSignature = invalid ? current : signature(result);
    session.setBuffer(key, { text: JSON.stringify(next), invalid, signature: nextSignature });
    if (!invalid) {
      last.current = nextSignature;
      onChange(result);
    }
  };
  return {
    rows,
    update,
    error: session.buffers[key]?.invalid,
    add: (initial: unknown) => {
      let index = rows.length + 1;
      while (rows.some((r) => r.name === `field${index}`)) index++;
      update([...rows, { id: crypto.randomUUID(), name: `field${index}`, value: initial }]);
    },
  };
}
export function MappingEditor({
  value,
  onChange,
  bufferKey,
  literal = false,
  literalType = 'any',
}: {
  value: Data;
  onChange: (value: Data) => void;
  bufferKey: string;
  literal?: boolean;
  literalType?: string;
}) {
  const { rows, update, error, add } = useRecordRows(value, onChange, bufferKey);
  return (
    <div className={`nf-record-editor ${literal ? 'nf-key-value-editor' : ''}`}>
      {rows.map((row, index) => (
        <div className={`nf-mapping-row ${literal ? 'nf-key-value-row' : ''}`} key={row.id}>
          <div className="nf-row-heading">
            <Input
              aria-label={tx('字段名称 {0}', [index + 1])}
              value={row.name}
              onChange={(e) =>
                update(rows.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r)))
              }
            />
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('移除字段 {0}', [index + 1])}
              onClick={() => update(rows.filter((r) => r.id !== row.id))}
            >
              <Trash2 size={13} />
            </button>
          </div>
          <ValueEditor
            value={literal ? { type: 'constant', content: row.value } : row.value}
            expected={literal ? literalType : 'any'}
            allowBinding={!literal}
            label={tx('{0}的值', [row.name || tx('字段')])}
            bufferKey={`${bufferKey}.${row.id}`}
            onChange={(value) =>
              update(
                rows.map((r) =>
                  r.id === row.id ? { ...r, value: literal ? asValue(value).content : value } : r
                )
              )
            }
          />
        </div>
      ))}
      {error && (
        <p className="nf-error" role="alert">
          {errorText(error)}
        </p>
      )}
      <button
        type="button"
        className="nf-text-action"
        onClick={() => add(literal ? '' : { type: 'constant', content: '' })}
      >
        <Plus size={14} />
        {tx('添加字段')}
      </button>
    </div>
  );
}

export function SchemaEditor({
  value,
  onChange,
  bufferKey,
  depth = 0,
}: {
  value: Schema;
  onChange: (schema: Schema) => void;
  bufferKey: string;
  depth?: number;
}) {
  const fields = Object.fromEntries(
    Object.entries(value.properties || {}).map(([key, schema]) => [
      key,
      { ...schema, _required: value.required?.includes(key) || false },
    ])
  );
  const { rows, update, error, add } = useRecordRows(
    fields,
    (record) => {
      const properties: Record<string, Schema> = {};
      const required: string[] = [];
      Object.entries(record).forEach(([name, raw]) => {
        const { _required, ...schema } = raw as Data;
        properties[name] = schema as Schema;
        if (_required) required.push(name);
      });
      onChange({ ...value, type: 'object', properties, required });
    },
    bufferKey
  );
  const patch = (row: Row, change: Data) =>
    update(
      rows.map((r) => (r.id === row.id ? { ...r, value: { ...(r.value as Data), ...change } } : r))
    );
  return (
    <div className="nf-schema-editor">
      {rows.map((row, index) => {
        const schema = row.value as Schema & { _required?: boolean };
        return (
          <div className="nf-schema-item" key={row.id}>
            <div className="nf-schema-row">
              <Input
                aria-label={tx('输出字段名 {0}-{1}', [depth, index + 1])}
                value={row.name}
                onChange={(e) =>
                  update(rows.map((r) => (r.id === row.id ? { ...r, name: e.target.value } : r)))
                }
              />
              <Select
                aria-label={tx('字段类型 {0}-{1}', [depth, index + 1])}
                value={schema.type || 'string'}
                onValueChange={(selectedValue) =>
                  patch(row, {
                    type: selectedValue,
                    properties: selectedValue === 'object' ? {} : undefined,
                    items: selectedValue === 'array' ? { type: 'string' } : undefined,
                  })
                }
                options={[
                  ...(['string', 'number', 'integer', 'boolean', 'object', 'array', 'null'].map(
                    (type) => ({ value: type, label: type })
                  ) || []),
                ]}
              />
              <label className="nf-required-toggle" aria-label={tx('字段 {0} 必填', [row.name])}>
                <input
                  type="checkbox"
                  checked={!!schema._required}
                  onChange={(e) => patch(row, { _required: e.target.checked })}
                />
                <span>*</span>
              </label>
              <button
                type="button"
                className="nf-icon-button"
                aria-label={tx('删除字段 {0}', [row.name])}
                onClick={() => update(rows.filter((r) => r.id !== row.id))}
              >
                <Trash2 size={13} />
              </button>
            </div>
            {schema.type === 'object' && depth < 5 && (
              <details className="nf-nested-schema">
                <summary>
                  <ChevronRight size={12} />
                  {tx('子字段')}
                </summary>
                <SchemaEditor
                  value={schema}
                  onChange={(next) => patch(row, next as Data)}
                  bufferKey={`${bufferKey}.${row.id}`}
                  depth={depth + 1}
                />
              </details>
            )}
            {schema.type === 'array' && (
              <div className="nf-array-type">
                <span>{tx('元素类型')}</span>
                <Select
                  aria-label={tx('{0}元素类型', [row.name])}
                  value={schema.items?.type || 'string'}
                  onValueChange={(selectedValue) =>
                    patch(row, {
                      items: {
                        type: selectedValue,
                        ...(selectedValue === 'object' ? { properties: {} } : {}),
                      },
                    })
                  }
                  options={[
                    ...(['string', 'number', 'boolean', 'object', 'array'].map((type) => ({
                      value: type,
                      label: type,
                    })) || []),
                  ]}
                />
                {schema.items?.type === 'object' && depth < 5 && (
                  <SchemaEditor
                    value={schema.items}
                    onChange={(items) => patch(row, { items })}
                    bufferKey={`${bufferKey}.${row.id}.items`}
                    depth={depth + 1}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
      {error && (
        <p className="nf-error" role="alert">
          {errorText(error)}
        </p>
      )}
      <button
        type="button"
        className="nf-text-action"
        onClick={() => add({ type: 'string', _required: false })}
      >
        <Plus size={14} />
        {tx('添加字段')}
      </button>
    </div>
  );
}

export function ConditionBuilder({
  value,
  onChange,
  bufferKey,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
  bufferKey: string;
}) {
  const list = Array.isArray(value) ? value : [];
  const { rows, update, add } = useRecordRows(
    Object.fromEntries(list.map((v, i) => [String(i), v])),
    (record) => onChange(Object.values(record)),
    bufferKey
  );
  return (
    <div className="nf-conditions">
      {rows.map((row, index) => {
        const condition = row.value as {
          key: string;
          value: { left: unknown; right: unknown; operator: string };
        };
        const patch = (change: Data) =>
          update(
            rows.map((r) =>
              r.id === row.id
                ? { ...r, value: { ...condition, value: { ...condition.value, ...change } } }
                : r
            )
          );
        return (
          <div key={row.id}>
            {index > 0 && <div className="nf-condition-or">{tx('或者')}</div>}
            <div className="nf-condition">
              <div className="nf-condition-heading">
                <span>
                  {tx('规则')}
                  {index + 1} → {condition.key === 'else' ? tx('否则') : tx('通过')}
                </span>
                <button
                  type="button"
                  className="nf-icon-button"
                  aria-label={tx('删除规则 {0}', [index + 1])}
                  onClick={() => update(rows.filter((r) => r.id !== row.id))}
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <ValueEditor
                label={tx('规则 {0} 左值', [index + 1])}
                expected="any"
                value={condition.value?.left}
                onChange={(left) => patch({ left })}
                bufferKey={`${bufferKey}.${row.id}.left`}
              />
              <Select
                aria-label={tx('规则 {0} 运算符', [index + 1])}
                value={condition.value?.operator || 'eq'}
                onValueChange={(selectedValue) => patch({ operator: selectedValue })}
                options={[
                  ...([
                    ['eq', tx('等于')],
                    ['neq', tx('不等于')],
                    ['gt', tx('大于')],
                    ['lt', tx('小于')],
                    ['contains', tx('包含')],
                  ].map(([v, l]) => ({ value: v, label: l })) || []),
                ]}
              />
              <ValueEditor
                label={tx('规则 {0} 右值', [index + 1])}
                expected="any"
                value={condition.value?.right}
                onChange={(right) => patch({ right })}
                bufferKey={`${bufferKey}.${row.id}.right`}
              />
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="nf-text-action"
        onClick={() =>
          add({
            key: 'true',
            value: {
              left: { type: 'constant', content: '' },
              operator: 'eq',
              right: { type: 'constant', content: '' },
            },
          })
        }
      >
        <Plus size={14} />
        {tx('添加规则')}
      </button>
      <p className="nf-hint">{tx('没有规则命中时，走“否则”分支。')}</p>
    </div>
  );
}
