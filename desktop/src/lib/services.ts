/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { Workflow } from './types';
export interface ServiceOperation {
  name: string;
  description: string;
  workflowId: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  bindings: Record<string, string>;
  timeoutMs: number;
  readOnly: boolean;
}
export interface ServiceRelease {
  service: string;
  title: string;
  version: string;
  digest: string;
  createdAt: string;
  operations: ServiceOperation[];
  workflows: { id: string; name: string; revision: number }[];
}
export interface ServiceDeployment {
  service: string;
  environment: string;
  version: string;
  enabled: boolean;
  maxConcurrency: number;
  bindings: Record<string, unknown>;
  modelBindings: Record<string, string>;
  callback: { url: string; secretEnv: string } | null;
}
export interface ServiceInventory {
  releases: ServiceRelease[];
  deployments: ServiceDeployment[];
  publicBase: string;
}
export interface ServiceConsumer {
  id: string;
  name: string;
  operations: string[];
  canCancel: boolean;
  revoked: boolean;
  createdAt: string;
}
export interface ServiceRun {
  runId: string;
  callerId: string;
  operation: string;
  version: string;
  status: string;
  createdAt: string;
  callbackStatus: string | null;
  callbackAttempts: number | null;
  callbackError: string | null;
}
export function operationFromWorkflow(workflow: Workflow): ServiceOperation {
  const start = workflow.schema.nodes.find((node) => node.type === 'start');
  const end = workflow.schema.nodes.find((node) => node.type === 'end');
  const input = start?.data.outputs as Record<string, unknown> | undefined;
  const output = end?.data.outputs as Record<string, unknown> | undefined;
  return {
    name: 'execute_workflow',
    description: 'Execute the workflow and return its validated business result.',
    workflowId: workflow.id,
    inputSchema: { type: 'object', properties: {}, ...input, additionalProperties: false },
    outputSchema: { type: 'object', properties: {}, ...output },
    bindings: {},
    timeoutMs: 180000,
    readOnly: false,
  };
}
export function downloadJson(value: unknown, filename: string) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' })
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Bound fields belong to the deployment, not the caller's public input contract. */
export function bindOperation(
  operation: ServiceOperation,
  bindings: Record<string, string>
): ServiceOperation {
  const schema = { ...operation.inputSchema };
  const properties = { ...((schema.properties as Record<string, unknown>) || {}) };
  for (const name of Object.keys(bindings)) delete properties[name];
  schema.properties = properties;
  if (Array.isArray(schema.required))
    schema.required = schema.required.filter((name) => !(String(name) in bindings));
  return { ...operation, inputSchema: schema, bindings };
}
export function serviceExample(schema: Record<string, unknown>, depth = 0): unknown {
  if (depth > 8) return null;
  if ('default' in schema) return schema.default;
  if (Array.isArray(schema.examples) && schema.examples.length) return schema.examples[0];
  if (Array.isArray(schema.enum)) return schema.enum[0];
  if (schema.type === 'object') {
    const properties = (schema.properties as Record<string, Record<string, unknown>>) || {};
    return Object.fromEntries(
      Object.entries(properties)
        .filter(
          ([name, field]) =>
            'default' in field || (Array.isArray(schema.required) && schema.required.includes(name))
        )
        .map(([name, field]) => [name, serviceExample(field, depth + 1)])
    );
  }
  if (schema.type === 'array') return [];
  if (schema.type === 'integer' || schema.type === 'number') return schema.minimum || 0;
  if (schema.type === 'boolean') return false;
  return '<value>';
}
