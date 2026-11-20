/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { Project, Workflow } from './types';
import type {
  ServiceConsumer,
  ServiceDeployment,
  ServiceOperation,
  ServiceRelease,
  ServiceRun,
} from './services';

export interface DeploymentCredential {
  id: string;
  name: string;
  purpose: 'connection' | 'management';
  projectIds: string[] | null;
  updatedAt: string;
  hasValue: boolean;
}
export interface RuntimeTarget {
  id: string;
  name: string;
  url: string;
  credentialId: string;
}
export interface PublicationDraft {
  title: string;
  version: string;
  notes: string;
  operations: ServiceOperation[];
  targetId: string;
  environment: string;
  maxConcurrency: number;
  bindings: Record<string, unknown>;
  credentialBindings: Record<string, string>;
  modelBindings: Record<string, string>;
  callback: { url: string; secretEnv: string } | null;
}
export interface PublicationActivation
  extends Omit<PublicationDraft, 'title' | 'notes' | 'operations'> {
  enabled: boolean;
}
export interface Publication {
  id: string;
  projectId: string;
  title: string;
  draft: PublicationDraft;
  versionCount: number;
  publicWorkflowCount: number | null;
  deployments: PublicationActivation[];
  createdAt: string;
  updatedAt: string;
}
export interface DeploymentInventory {
  projects: Project[];
  publications: Publication[];
  credentials: DeploymentCredential[];
  targets: RuntimeTarget[];
  credentialSync?: { credentialId: string; targetId: string; failed: boolean }[];
}
export interface PublicationDetail {
  id: string;
  projectId: string;
  service: string;
  draft: PublicationDraft;
  workflows: Workflow[];
  releases: ServiceRelease[];
  versions: { version: string; notes: string; createdAt: string }[];
}
export interface TargetDetail {
  deployment: ServiceDeployment;
  consumers: ServiceConsumer[];
  runs: ServiceRun[];
  publicBase: string;
  checkedAt: string;
}
export type PublishIntent = { projectId: string; workflowId: string };
export const deploymentPath = (id: string) =>
  `/api/deployment/publications/${encodeURIComponent(id)}`;
export const credentialAvailable = (credential: DeploymentCredential, projectId: string) =>
  credential.projectIds === null || credential.projectIds.includes(projectId);
export function nextVersion(versions: string[]) {
  const numbers = versions
    .map((v) => /^(\d+)\.(\d+)\.(\d+)$/.exec(v))
    .filter((v) => v !== null)
    .map((v) => v.slice(1).map(Number));
  numbers.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);
  const latest = numbers[0];
  return latest ? `${latest[0]}.${latest[1]}.${latest[2] + 1}` : '1.0.0';
}
export function requiredSlots(workflows: Workflow[], operations: ServiceOperation[]) {
  const selected = new Set(operations.map((op) => op.workflowId));
  const slots = new Set<string>();
  const visited = new Set<string>();
  function walkWorkflow(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const workflow = workflows.find((w) => w.id === id);
    if (workflow) walkNodes(workflow.schema.nodes);
  }
  function walkNodes(nodes: Workflow['schema']['nodes']) {
    for (const node of nodes) {
      const inputs = node.data.inputsValues as Record<string, { content?: unknown }> | undefined;
      if (
        node.type === 'http' &&
        typeof inputs?.credentialEnv?.content === 'string' &&
        inputs.credentialEnv.content
      )
        slots.add(inputs.credentialEnv.content);
      if (node.type === 'subworkflow' && typeof inputs?.workflowId?.content === 'string')
        walkWorkflow(inputs.workflowId.content);
      if (node.blocks) walkNodes(node.blocks);
    }
  }
  selected.forEach(walkWorkflow);
  return [...slots].sort();
}
