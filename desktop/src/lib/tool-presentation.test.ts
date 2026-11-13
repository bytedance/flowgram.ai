/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from 'vitest';
import { toolData, toolIdentity } from './tool-presentation';
import type { ConversationItem } from './types';
const item = (args: Record<string, unknown> = {}): ConversationItem =>
  ({ payload: { name: 'edit_workflow', arguments: args } } as ConversationItem);
describe('semantic tool presentation', () => {
  it('distinguishes prompt edits, models, text replacement and connection changes', () => {
    expect(
      toolIdentity(
        item({
          operations: [
            {
              op: 'update_node',
              set: { '/inputsValues/prompt/content': 'New prompt' },
            },
          ],
        })
      )
    ).toBe('edit_workflow/prompt');
    expect(
      toolIdentity(
        item({
          operations: [{ op: 'update_node', set: { '/model/modelId': 'model' } }],
        })
      )
    ).toBe('edit_workflow/model');
    expect(toolIdentity(item({ operations: [{ op: 'replace_text' }] }))).toBe(
      'edit_workflow/replace_text'
    );
    expect(toolIdentity(item({ operations: [{ op: 'connect' }] }))).toBe('edit_workflow/connect');
    expect(toolIdentity(item({ operations: [{ op: 'connect' }, { op: 'add_node' }] }))).toBe(
      'edit_workflow'
    );
  });
  it('reads new mutation and execution envelopes without inventing run identities', () => {
    const tool = item();
    tool.payload.result = {
      ok: true,
      context: { workflowId: 'flow', revision: 5 },
      data: { changedNodes: ['a'] },
    };
    expect(toolData(tool)).toMatchObject({
      id: 'flow',
      revision: 5,
      changedNodes: ['a'],
    });
    tool.payload.name = 'run_workflow';
    tool.payload.result.data = { state: 'pending', accepted: false };
    expect(toolData(tool).id).toBeUndefined();
    tool.payload.result.data = { runId: 'run', status: 'running' };
    expect(toolData(tool)).toMatchObject({
      id: 'run',
      workflowId: 'flow',
      status: 'running',
    });
  });
});

it('summarizes actual changes and never reports a failed or unchanged edit as applied', async () => {
  const { toolSummary } = await import('./tool-presentation');
  const tool = item({ operations: [{ op: 'update_node', set: { '/inputsValues/prompt/content': 'Write' } }] });
  tool.status = 'completed';
  tool.payload.result = { ok: true, data: { changed: true, changedNodeCount: 2 } };
  expect(toolSummary(tool)).toContain('2');
  tool.payload.result.data = { changed: false, changedNodeCount: 0 };
  expect(toolSummary(tool)).not.toContain('2');
  tool.status = 'failed';
  expect(toolSummary(tool)).not.toContain('2');
});
