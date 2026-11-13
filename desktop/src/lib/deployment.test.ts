/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import type { Workflow } from './types';
import {
  credentialAvailable,
  nextVersion,
  requiredSlots,
  type DeploymentCredential,
} from './deployment';

const workflow = (id: string, nodes: unknown[]): Workflow =>
  ({
    id,
    projectId: 'project',
    name: id,
    revision: 1,
    updatedAt: '',
    schema: { nodes, edges: [] },
  }) as Workflow;
describe('deployment scope and dependency requirements', () => {
  it('distinguishes globally available, restricted and revoked credentials', () => {
    const credential = { projectIds: null } as DeploymentCredential;
    expect(credentialAvailable(credential, 'orders')).toBe(true);
    expect(credentialAvailable({ ...credential, projectIds: ['orders'] }, 'finance')).toBe(false);
    expect(credentialAvailable({ ...credential, projectIds: [] }, 'orders')).toBe(false);
  });
  it('finds credential requirements through nested blocks and shared subworkflows without exposing unrelated roots', () => {
    const connection = (slot: string) => ({
      id: slot,
      type: 'http',
      data: { inputsValues: { credentialEnv: { type: 'constant', content: slot } } },
    });
    const workflows = [
      workflow('root', [
        {
          id: 'loop',
          type: 'loop',
          data: {},
          blocks: [
            {
              id: 'call',
              type: 'subworkflow',
              data: { inputsValues: { workflowId: { type: 'constant', content: 'shared' } } },
            },
          ],
        },
      ]),
      workflow('shared', [connection('FLOWGRAM_CONNECTION_ERP')]),
      workflow('private', [connection('FLOWGRAM_CONNECTION_PRIVATE')]),
    ];
    expect(requiredSlots(workflows, [{ workflowId: 'root' }] as never)).toEqual([
      'FLOWGRAM_CONNECTION_ERP',
    ]);
  });
  it('increments the highest numeric version without lexicographic sorting or prerelease collisions', () => {
    expect(nextVersion(['1.9.9', '1.10.0', '2.0.0-preview'])).toBe('1.10.1');
    expect(nextVersion([])).toBe('1.0.0');
  });
});
