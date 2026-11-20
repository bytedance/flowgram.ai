/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Select } from '../ui/select';
import { Input } from '../ui/input';
import type { WorkflowSchema } from '../../lib/types';
import { tx } from '../../lib/i18n';

/** Initial values come from the workflow contract, never from a fixed demo payload. */
export function defaultRunInputs(schema: WorkflowSchema): Record<string, unknown> {
  const properties =
    (
      schema.nodes.find((node) => node.type === 'start')?.data.outputs as {
        properties?: Record<string, { type?: string; default?: unknown }>;
      }
    )?.properties || {};
  return Object.fromEntries(
    Object.entries(properties).map(([key, property]) => [
      key,
      property.default !== undefined
        ? structuredClone(property.default)
        : property.type === 'array'
        ? []
        : property.type === 'object'
        ? {}
        : property.type === 'boolean'
        ? false
        : ['number', 'integer'].includes(property.type || '')
        ? 0
        : '',
    ])
  );
}

export function withRunDefaults(schema: WorkflowSchema, draft: string): string {
  try {
    const value: unknown = JSON.parse(draft);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return draft;
    return JSON.stringify({ ...defaultRunInputs(schema), ...value }, null, 2);
  } catch {
    return draft;
  }
}

export function RunInputForm({
  schema,
  value,
  onChange,
}: {
  schema: WorkflowSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  const start = schema.nodes.find((node) => node.type === 'start');
  const properties =
    (start?.data.outputs as { properties?: Record<string, { type?: string }> })?.properties || {};
  let inputs: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(value);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed))
      inputs = parsed as Record<string, unknown>;
  } catch {
    /* Advanced JSON input may be incomplete. */
  }
  const fields = Object.keys(properties);
  if (!fields.length)
    return (
      <p className="text-xs text-muted-foreground">
        {tx('此流程未声明输入字段，可展开高级输入设置。')}
      </p>
    );
  return (
    <div className="space-y-4">
      {fields.map((key) => (
        <label key={key} className="block space-y-2 text-xs text-muted-foreground">
          {key}
          {properties[key].type === 'boolean' ? (
            <Select
              className="settings-select w-full"
              aria-label={tx('运行输入 {0}', [key])}
              value={String(inputs[key] ?? false)}
              onValueChange={(selectedValue) =>
                onChange(JSON.stringify({ ...inputs, [key]: selectedValue === 'true' }, null, 2))
              }
              options={[
                { value: 'false', label: tx('否') },
                { value: 'true', label: tx('是') },
              ]}
            />
          ) : (
            <Input
              aria-label={tx('运行输入 {0}', [key])}
              type={['number', 'integer'].includes(properties[key].type || '') ? 'number' : 'text'}
              step={properties[key].type === 'integer' ? 1 : 'any'}
              value={
                typeof inputs[key] === 'object'
                  ? JSON.stringify(inputs[key])
                  : String(inputs[key] ?? '')
              }
              onChange={(e) => {
                let next: unknown = e.target.value;
                if (['number', 'integer'].includes(properties[key].type || ''))
                  next = e.target.value ? Number(e.target.value) : 0;
                if (properties[key].type === 'boolean') next = e.target.value === 'true';
                onChange(JSON.stringify({ ...inputs, [key]: next }, null, 2));
              }}
            />
          )}
        </label>
      ))}
    </div>
  );
}
