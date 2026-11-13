/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { tx } from './i18n';
import type { RuntimeEvent } from './types';
import type { Data } from '../components/node-inspector/model';

export function eventData(event: RuntimeEvent): Data { return JSON.parse(event.data) as Data; }
export function executionLabel(data: Data): string {
  const branches = (data.branchPath || []) as string[];
  const rounds = (data.iterationPath || []) as number[];
  return [...branches.map((id) => tx("分支 {0}", [id])), ...rounds.map((i) => tx("第 {0} 轮", [i + 1])), tx("执行 {0}", [String(data.executionId || '').slice(0, 8)])].join(' · ');
}
export function sampleBindings(events: RuntimeEvent[], selectedExecutionId?: string): Data {
  const parsed = events.map((event) => ({ ...event, value: eventData(event) }));
  const chosen = parsed.find((event) => event.value.executionId === selectedExecutionId);
  const scopes = new Set<unknown>();
  if (chosen) {
    let cursor: typeof chosen | undefined = chosen;
    const seen = new Set<unknown>();
    while (cursor && !seen.has(cursor.value.executionId)) {
      seen.add(cursor.value.executionId);
      scopes.add(cursor.value.scopeId);
      const parent: unknown = cursor.value.parentExecutionId;
      cursor = parent ? parsed.find((e) => e.value.executionId === parent) : undefined;
    }
  }
  const bindings = Object.fromEntries(parsed.filter((event) => event.kind === 'node_finished' && (
    chosen ? scopes.has(event.value.scopeId) : !((event.value.iterationPath || []) as unknown[]).length && !((event.value.branchPath || []) as unknown[]).length
  )).map((event) => [event.value.nodeId, event.value.outputs]));
  if (chosen) {
    for (const scope of Array.from(scopes).reverse()) {
      const entry = parsed.find((e) => e.kind === 'node_finished' && e.value.scopeId === scope && e.value.nodeType === 'block-start');
      const parent = entry && parsed.find((e) => e.value.executionId === entry.value.parentExecutionId);
      if (entry && parent) {
        const output = entry.value.outputs as Data;
        bindings[`${parent.value.nodeId}_locals`] = output;
        if (Object.hasOwn(output, 'state')) { bindings.state = output.state; bindings.index = output.index; }
      }
    }
  }
  return bindings;
}
