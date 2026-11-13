/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';

import { modelUnavailable, type ModelInventory } from './models';
import { modelRequirements } from '../components/deployment-models';
import type { Workflow } from './types';

const catalog: ModelInventory = { connections: [{ id: 'connection', name: 'Gateway', provider: 'custom', protocol: 'responses', baseUrl: 'http://localhost:9000', credentialId: 'credential', enabled: true, timeoutMs: 1000, revision: 1, updatedAt: '' }], models: [{ id: 'model', connectionId: 'connection', name: 'Does not imply capabilities', modelId: 'model-tools-stream', enabled: true, capabilities: { reasoningEfforts: [] }, contextWindow: null, parameters: {}, revision: 1, updatedAt: '' }], defaults: { chat: null, workflow: null, revision: 0 }, credentials: [{ id: 'credential', name: 'Team', purpose: 'connection', projectIds: ['one'], hasValue: true, updatedAt: '' }], verifications: {} };
describe('model availability and deployment model slots', () => {
  it('requires explicit capabilities and project grants without inferring from names', () => {
    expect(modelUnavailable(catalog, catalog.models[0], 'one', true, true)).toBe('需要工具调用能力');
    expect(modelUnavailable(catalog, catalog.models[0], 'two')).toBe('凭证未授权此项目');
    const confirmed = { ...catalog.models[0], capabilities: { ...catalog.models[0].capabilities, tools: true, streaming: true } };
    expect(modelUnavailable(catalog, confirmed, 'one', true, true)).toBe('');
    expect(modelUnavailable({ ...catalog, connections: [{ ...catalog.connections[0], enabled: false }] }, confirmed, 'one')).toBe('已停用');
  });
  it('finds nested and transitive requirements and combines tools for shared model slots', () => {
    const workflow = (id: string, nodes: Workflow['schema']['nodes']): Workflow => ({ id, projectId: 'project', name: id, schema: { nodes, edges: [] }, revision: 1, updatedAt: '' });
    const workflows = [workflow('main', [{ id: 'model', type: 'llm', data: { model: { modelId: 'shared' } } }, { id: 'loop', type: 'foreach', data: {}, blocks: [{ id: 'agent', type: 'agent', data: { model: { modelId: 'shared' } } }] }, { id: 'call', type: 'subworkflow', data: { inputsValues: { workflowId: { type: 'constant', content: 'child' } } } }]), workflow('child', [{ id: 'default', type: 'llm', data: {} }]), workflow('unselected', [{ id: 'unused', type: 'agent', data: { model: { modelId: 'unused' } } }])];
    expect(modelRequirements(workflows, ['main'])).toEqual([{ slot: 'shared', tools: true }, { slot: 'workflow-default', tools: false }]);
  });
});
