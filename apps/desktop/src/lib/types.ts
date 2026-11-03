/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  directory: string;
}
export interface Session {
  id: string;
  projectId: string;
  title: string;
  status: string;
  createdAt: string;
}
export interface WorkflowNode {
  id: string;
  type: string;
  meta?: { position?: { x: number; y: number } };
  data: Record<string, unknown>;
  blocks?: WorkflowNode[];
  edges?: WorkflowSchema['edges'];
}
export interface WorkflowSchema {
  nodes: WorkflowNode[];
  edges: Array<{
    sourceNodeID: string;
    targetNodeID: string;
    sourcePortID?: string;
    targetPortID?: string;
  }>;
}
export interface Workflow {
  id: string;
  projectId: string;
  name: string;
  revision: number;
  schema: WorkflowSchema;
  updatedAt: string;
}
export interface Run {
  id: string;
  workflowId: string;
  sessionId: string | null;
  status: string;
  inputs: Record<string, unknown>;
  outputs: unknown;
  error: string | null;
  revision: number;
  createdAt: string;
  testNodeId?: string | null;
}
export interface RuntimeEvent {
  sequence: number;
  kind: string;
  objectId: string;
  data: string;
  createdAt: string;
}
export interface Snapshot {
  projects: Project[];
  sessions: Session[];
  workflows: Workflow[];
  runs: Run[];
}
export interface ModelSettings {
  baseUrl: string;
  displayName: string;
  configured: boolean;
  hasApiKey: boolean;
}

export type DeliveryMode = 'queue' | 'steer';
export interface ConversationInput {
  model?: import('./models').ModelSelection | null;
  id: string;
  clientInputId: string;
  sessionId: string;
  content: string;
  references: import('./mentions').WorkflowReferences | null;
  deliveryMode: DeliveryMode;
  turnId: string | null;
  status: 'queued' | 'pending' | 'accepted' | 'cancelled' | 'rejected';
  revision: number;
  createdAt: string;
  error: string | null;
}
export interface Turn {
  origin?: 'agent' | 'authored';
  estimatedDurationMs?: number | null;
  model?: import('./models').ModelTrace | null;
  id: string;
  sessionId: string;
  initiatingInputId: string;
  ordinal: number;
  status: 'running' | 'stopping' | 'completed' | 'failed' | 'interrupted';
  phase: string;
  revision: number;
  startedAt: string;
  endedAt: string | null;
  finalItemId: string | null;
  error: string | null;
}
export interface ConversationItem {
  id: string;
  sessionId: string;
  turnId: string;
  ordinal: number;
  kind: 'user' | 'assistant' | 'tool' | 'compaction';
  phase: string;
  status: string;
  revision: number;
  content: string;
  payload: {
    name?: string;
    callId?: string;
    arguments?: unknown;
    result?: Record<string, unknown>;
    startedAt?: string;
    endedAt?: string;
    isError?: boolean;
    references?: import('./mentions').WorkflowReferences | null;
    attempt?: number;
    contextResultId?: string | null;
    beforeTokens?: number;
    afterTokens?: number;
    error?: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface ConversationSnapshot {
  contextUsage?: ContextUsage | null;
  modelSelection?: import('./models').ModelSelection;
  sessionId: string;
  turns: Turn[];
  items: ConversationItem[];
  inputs: ConversationInput[];
  paused: boolean;
  watermark: number;
  nextBefore: number | null;
}
export interface ContextUsage {
  revision: number;
  modelId: string;
  inputTokens: number;
  contextWindow: number | null;
  effectiveWindow: number;
  autoCompactTokenLimit: number;
  outputReserve: number;
  source: 'provider' | 'estimate';
  status: 'ready' | 'compacting';
  compactions: number;
}
