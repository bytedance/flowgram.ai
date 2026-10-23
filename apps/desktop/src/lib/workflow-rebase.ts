/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import type { WorkflowSchema } from './types';
type Json = unknown;
const same = (a: Json, b: Json) => JSON.stringify(a) === JSON.stringify(b);
const record = (value: Json): value is Record<string, Json> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

/** Three-way merge by stable node/edge identity. Conflicts never replace a local draft. */
export function rebaseWorkflow(
  base: WorkflowSchema,
  local: WorkflowSchema,
  remote: WorkflowSchema
): { schema: WorkflowSchema; conflicts: string[] } {
  const conflicts: string[] = [];
  function merge(a: Json, b: Json, c: Json, path: string): Json {
    if (same(b, a)) return c;
    if (same(c, a) || same(b, c)) return b;
    if (record(a) && record(b) && record(c)) {
      const result: Record<string, Json> = {};
      for (const key of new Set([...Object.keys(a), ...Object.keys(b), ...Object.keys(c)])) {
        const value = merge(a[key], b[key], c[key], `${path}/${key}`);
        if (value !== undefined) result[key] = value;
      }
      return result;
    }
    if (Array.isArray(a) && Array.isArray(b) && Array.isArray(c)) {
      const all = [...a, ...b, ...c];
      const field = ['id', 'key', 'name'].find((key) =>
        all.every((v) => record(v) && typeof v[key] === 'string')
      );
      const edges =
        all.length > 0 &&
        all.every(
          (v) =>
            record(v) && typeof v.sourceNodeID === 'string' && typeof v.targetNodeID === 'string'
        );
      const identity = field
        ? (v: Record<string, Json>) => String(v[field])
        : edges
        ? (v: Record<string, Json>) =>
            JSON.stringify([
              v.sourceNodeID,
              v.sourcePortID || '',
              v.targetNodeID,
              v.targetPortID || '',
            ])
        : null;
      if (identity) {
        const maps = [a, b, c].map((rows) => new Map(rows.map((row) => [identity(row), row])));
        if (maps.some((map, i) => map.size !== [a, b, c][i].length)) {
          conflicts.push(path);
          return b;
        }
        const [original, left, right] = maps;
        const baseOrder = [...original.keys()];
        const common = (map: Map<string, Json>) =>
          [...map.keys()].filter((key) => original.has(key) && left.has(key) && right.has(key));
        const orderedBase = baseOrder.filter((key) => left.has(key) && right.has(key));
        const localReordered = !same(common(left), orderedBase);
        const remoteReordered = !same(common(right), orderedBase);
        if (localReordered && remoteReordered && !same(common(left), common(right))) {
          conflicts.push(`${path}/order`);
          return b;
        }
        const order = [
          ...new Set([...(localReordered ? left : right).keys(), ...left.keys(), ...right.keys()]),
        ];
        const result = order
          .map((key) => merge(original.get(key), left.get(key), right.get(key), `${path}/${key}`))
          .filter((row) => row !== undefined);
        if (edges) {
          const ports = new Set<string>();
          for (const row of result) {
            const edge = row as Record<string, Json>;
            const port = JSON.stringify([edge.sourceNodeID, edge.sourcePortID || '']);
            if (ports.has(port)) conflicts.push(`${path}/sourcePort`);
            ports.add(port);
          }
        }
        return result;
      }
    }
    conflicts.push(path);
    return b;
  }
  const schema = merge(base, local, remote, '') as WorkflowSchema;
  return { schema: conflicts.length ? local : schema, conflicts };
}
