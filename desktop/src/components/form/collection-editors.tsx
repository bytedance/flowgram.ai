/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, useState } from 'react';

import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';

import { Input } from '../ui/input';
import { signature, type Data } from '../node-inspector/model';
import { errorText, tx } from '../../lib/i18n';
import { ValueEditor } from './value-editor';
import { clearEditorErrors, useFormSession } from './session';
import { Select } from './field';

export interface RecordColumn {
  key: string;
  label: string;
  choices?: Array<[string, string]>;
  required?: boolean;
}
interface Row {
  id: string;
  value: Data;
}
function useRows(
  value: Data[],
  change: (value: Data[]) => void,
  bufferKey: string,
  columns: RecordColumn[]
) {
  const session = useFormSession();
  const key = `${session.node.id}:${bufferKey}:collection`;
  const current = signature(value);
  const read = () => {
    const buffer = session.buffers[key];
    try {
      if (buffer && (buffer.invalid || buffer.signature === current))
        return JSON.parse(buffer.text) as Row[];
    } catch {
      /* Restore execution values. */
    }
    return value.map((value) => ({ id: crypto.randomUUID(), value }));
  };
  const [rows, setRows] = useState<Row[]>(read);
  const last = useRef({ key, signature: current });
  useEffect(() => {
    if (key !== last.current.key || current !== last.current.signature) {
      setRows(read());
      last.current = { key, signature: current };
    }
  }, [key, current]);
  const update = (next: Row[]) => {
    rows
      .filter((row) => !next.some((r) => r.id === row.id))
      .forEach((row) => clearEditorErrors(session, `${bufferKey}.${row.id}`));
    const invalid = next.some((row) =>
      columns.some((column) => column.required && !String(row.value[column.key] ?? '').trim())
    )
      ? tx('请补全必填列')
      : undefined;
    const result = next.map((row) => row.value);
    const nextSignature = invalid ? current : signature(result);
    setRows(next);
    session.setBuffer(key, { text: JSON.stringify(next), signature: nextSignature, invalid });
    if (!invalid) {
      last.current = { key, signature: nextSignature };
      change(result);
    }
  };
  return { rows, update, error: session.buffers[key]?.invalid };
}
export function RecordsEditor({
  value,
  columns,
  onChange,
  bufferKey,
  label = tx('规则'),
}: {
  value: Data[];
  columns: RecordColumn[];
  onChange: (value: Data[]) => void;
  bufferKey: string;
  label?: string;
}) {
  const { rows, update, error } = useRows(value, onChange, bufferKey, columns);
  const move = (index: number, offset: number) => {
    const next = [...rows];
    [next[index], next[index + offset]] = [next[index + offset], next[index]];
    update(next);
  };
  return (
    <div className="nf-collection">
      {rows.map((row, index) => (
        <div key={row.id} className="nf-collection-row">
          <div className="nf-collection-actions">
            <span>
              {label} {index + 1}
            </span>
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('上移{0} {1}', [label, index + 1])}
              disabled={!index}
              onClick={() => move(index, -1)}
            >
              <ArrowUp size={13} />
            </button>
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('下移{0} {1}', [label, index + 1])}
              disabled={index === rows.length - 1}
              onClick={() => move(index, 1)}
            >
              <ArrowDown size={13} />
            </button>
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('移除{0} {1}', [label, index + 1])}
              onClick={() => update(rows.filter((r) => r.id !== row.id))}
            >
              <Trash2 size={13} />
            </button>
          </div>
          <div className="nf-collection-columns">
            {columns.map((column) => {
              const change = (value: string) =>
                update(
                  rows.map((r) =>
                    r.id === row.id ? { ...r, value: { ...r.value, [column.key]: value } } : r
                  )
                );
              return (
                <label key={column.key}>
                  <span>
                    {column.label}
                    {column.required ? ' *' : ''}
                  </span>
                  {column.choices ? (
                    <Select
                      aria-label={`${label} ${index + 1} ${column.label}`}
                      value={String(row.value[column.key] ?? column.choices[0]?.[0] ?? '')}
                      onValueChange={(selectedValue) => change(selectedValue)}
                      options={[
                        ...(column.choices.map(([value, label]) => ({
                          value: value,
                          label: label,
                        })) || []),
                      ]}
                    />
                  ) : (
                    <Input
                      aria-label={`${label} ${index + 1} ${column.label}`}
                      value={String(row.value[column.key] ?? '')}
                      placeholder={column.key === 'path' ? tx('空路径表示当前项') : ''}
                      onChange={(e) => change(e.target.value)}
                    />
                  )}
                </label>
              );
            })}
          </div>
        </div>
      ))}
      {error && (
        <p role="alert" className="nf-error">
          {errorText(error)}
        </p>
      )}
      <button
        type="button"
        className="nf-text-action"
        onClick={() =>
          update([
            ...rows,
            {
              id: crypto.randomUUID(),
              value: Object.fromEntries(columns.map((c) => [c.key, c.choices?.[0]?.[0] ?? ''])),
            },
          ])
        }
      >
        <Plus size={14} />
        {tx('添加')}
        {label}
      </button>
    </div>
  );
}
export function PathsEditor({
  value,
  onChange,
  bufferKey,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  bufferKey: string;
}) {
  return (
    <RecordsEditor
      value={value.map((path) => ({ path }))}
      onChange={(rows) => onChange(rows.map((row) => String(row.path)))}
      bufferKey={bufferKey}
      label={tx('路径')}
      columns={[{ key: 'path', label: tx('字段路径'), required: true }]}
    />
  );
}
export function PredicateEditor({
  value,
  onChange,
  bufferKey,
  depth = 0,
  operators,
}: {
  value: Data;
  onChange: (value: Data) => void;
  bufferKey: string;
  depth?: number;
  operators: Array<[string, string]>;
}) {
  const session = useFormSession();
  const rules = (value.rules || []) as Data[];
  const { rows, update } = useRows(rules, (rules) => onChange({ ...value, rules }), bufferKey, []);
  const changeRule = (index: number, rule: Data) =>
    update(rows.map((row, i) => (i === index ? { ...row, value: rule } : row)));
  return (
    <div className="nf-predicate">
      <div className="nf-predicate-heading">
        <Select
          aria-label={tx('条件组 {0} 组合方式', [depth + 1])}
          value={String(value.combinator || 'and')}
          onValueChange={(selectedValue) => onChange({ ...value, combinator: selectedValue })}
          options={[
            { value: 'and', label: tx('满足全部条件（AND）') },
            { value: 'or', label: tx('满足任意条件（OR）') },
          ]}
        />
      </div>
      {rows.map(({ id, value: rule }, index) => (
        <div key={id} className="nf-predicate-rule">
          <div className="nf-collection-actions">
            <span>
              {rule.rules ? tx('条件组') : tx('条件')} {index + 1}
            </span>
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('移除条件 {0}', [index + 1])}
              onClick={() => update(rows.filter((row) => row.id !== id))}
            >
              <Trash2 size={13} />
            </button>
          </div>
          {rule.rules ? (
            <PredicateEditor
              value={rule}
              onChange={(r) => changeRule(index, r)}
              bufferKey={`${bufferKey}.${id}`}
              depth={depth + 1}
              operators={operators}
            />
          ) : (
            <>
              <ValueEditor
                label={tx('条件 {0} 左值', [index + 1])}
                value={rule.left}
                expected="any"
                bufferKey={`${bufferKey}.${id}.left`}
                onChange={(left) => changeRule(index, { ...rule, left })}
              />
              <Select
                aria-label={tx('条件 {0} 运算符', [index + 1])}
                value={String(rule.operator || 'eq')}
                onValueChange={(selectedValue) => {
                  if (['exists', 'missing', 'null', 'empty'].includes(selectedValue))
                    clearEditorErrors(session, `${bufferKey}.${id}.right`);
                  changeRule(index, { ...rule, operator: selectedValue });
                }}
                options={[...(operators.map(([op, label]) => ({ value: op, label: label })) || [])]}
              />
              {!['exists', 'missing', 'null', 'empty'].includes(String(rule.operator)) && (
                <ValueEditor
                  label={tx('条件 {0} 右值', [index + 1])}
                  value={rule.right}
                  expected="any"
                  bufferKey={`${bufferKey}.${id}.right`}
                  onChange={(right) => changeRule(index, { ...rule, right })}
                />
              )}
            </>
          )}
        </div>
      ))}
      {!rows.length && <p className="nf-hint">{tx('添加至少一个条件。')}</p>}
      <div className="nf-predicate-add">
        <button
          type="button"
          className="nf-text-action"
          onClick={() =>
            update([
              ...rows,
              {
                id: crypto.randomUUID(),
                value: {
                  left: { type: 'ref', content: ['item'] },
                  operator: 'eq',
                  right: { type: 'constant', content: '' },
                },
              },
            ])
          }
        >
          <Plus size={14} />
          {tx('添加条件')}
        </button>
        {depth < 7 && (
          <button
            type="button"
            className="nf-text-action"
            onClick={() =>
              update([
                ...rows,
                { id: crypto.randomUUID(), value: { combinator: 'and', rules: [] } },
              ])
            }
          >
            <Plus size={14} />
            {tx('条件组')}
          </button>
        )}
      </div>
    </div>
  );
}
