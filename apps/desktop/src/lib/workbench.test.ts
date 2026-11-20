/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import {
  emptyWorkbench,
  navigationSection,
  sessionWorkspace,
  workbenchAction,
  workflowActivity,
  type Workbench,
} from './workbench';
import type { ConversationItem } from './types';

function session(id = 'session-a') {
  return workbenchAction(emptyWorkbench(), { type: 'session', id });
}
function activity(
  state: Workbench,
  workflowId = 'flow-a',
  itemId = 'tool-1',
  turnId = 'turn-1',
  sessionId = 'session-a'
) {
  return workbenchAction(state, {
    type: 'workflow-activity',
    sessionId,
    turnId,
    itemId,
    workflowId,
  });
}
function tool(name: string, extra: Partial<ConversationItem> = {}): ConversationItem {
  return {
    id: 'tool',
    sessionId: 'session',
    turnId: 'turn',
    ordinal: 1,
    kind: 'tool',
    phase: 'tool',
    status: 'completed',
    revision: 1,
    content: '',
    payload: { name, arguments: { workflowId: 'flow' } },
    createdAt: 'now',
    updatedAt: 'now',
    ...extra,
  };
}

describe('workspace entry and project ownership', () => {
  it('opens sidebar workflows in a standalone editor without discarding the selected session', () => {
    const original = activity(session());
    const next = workbenchAction(original, { type: 'workflow', id: 'flow-b' });
    expect(navigationSection(next)).toBe('workflows');
    expect(next.view).toEqual({ kind: 'workflow', id: 'flow-b' });
    expect(next.sessionId).toBe('session-a');
    expect(sessionWorkspace(next)).toEqual(sessionWorkspace(original));
    expect(workbenchAction(next, { type: 'navigate', section: 'sessions' }).view).toEqual({
      kind: 'session',
    });
  });
  it('opens an explicit session reference on the right without changing its input reference', () => {
    let state = workbenchAction(emptyWorkbench(), { type: 'assist', workflowId: 'flow-a' });
    const reference = state.referenceIntent;
    state = workbenchAction(state, {
      type: 'session-document',
      document: { kind: 'workflow', id: 'flow-b' },
    });
    expect(state.view.kind).toBe('session');
    expect(sessionWorkspace(state).active).toEqual({ kind: 'workflow', id: 'flow-b' });
    expect(state.referenceIntent).toBe(reference);
  });
  it('starts assistant editing in a fresh session by default and supports an explicit existing session', () => {
    const fresh = workbenchAction(session(), { type: 'assist', workflowId: 'flow-a' });
    expect(fresh.sessionId).toBeNull();
    expect(fresh.referenceIntent?.workflowId).toBe('flow-a');
    expect(sessionWorkspace(fresh).open).toBe(true);
    const existing = workbenchAction(fresh, {
      type: 'assist',
      workflowId: 'flow-b',
      sessionId: 'session-b',
    });
    expect(existing.sessionId).toBe('session-b');
    expect(sessionWorkspace(existing).active?.id).toBe('flow-b');
  });
  it('restores each session workspace and starts blank sessions without an inherited canvas', () => {
    const first = activity(session());
    const second = workbenchAction(first, { type: 'session', id: 'session-b' });
    expect(sessionWorkspace(second).open).toBe(false);
    const back = workbenchAction(second, { type: 'session', id: 'session-a' });
    expect(sessionWorkspace(back).active?.id).toBe('flow-a');
    const blank = workbenchAction(back, { type: 'session', id: null });
    expect(sessionWorkspace(blank).documents).toEqual([]);
    expect(blank.referenceIntent?.workflowId).toBeNull();
  });
  it('preserves another project when closing the current document', () => {
    const other = workbenchAction(emptyWorkbench(), { type: 'workflow', id: 'other-flow' });
    const original = activity(session());
    const next = workbenchAction(original, {
      type: 'close-document',
      document: { kind: 'workflow', id: 'flow-a' },
    });
    expect(next.sessionId).toBe('session-a');
    expect(next.view.kind).toBe('session');
    expect(sessionWorkspace(next).open).toBe(false);
    expect(other.view).toEqual({ kind: 'workflow', id: 'other-flow' });
  });
  it('transfers a new session workspace after persistence without hijacking a newer selection', () => {
    const pending = workbenchAction(emptyWorkbench(), { type: 'assist', workflowId: 'flow-a' });
    const newer = workbenchAction(pending, { type: 'session', id: null });
    const result = workbenchAction(newer, {
      type: 'session-created',
      id: 'late-session',
      previous: null,
      epoch: pending.sessionEpoch,
    });
    expect(result.sessionId).toBeNull();
    expect(sessionWorkspace(result).open).toBe(false);
    expect(result.sessionWorkspaces['late-session'].active?.id).toBe('flow-a');
    const normal = workbenchAction(pending, {
      type: 'session-created',
      id: 'new-session',
      previous: null,
      epoch: pending.sessionEpoch,
    });
    expect(normal.sessionId).toBe('new-session');
    expect(sessionWorkspace(normal).active?.id).toBe('flow-a');
  });
});

describe('live workflow activity', () => {
  it('opens and reuses concrete workflow documents while remaining in the conversation', () => {
    const state = activity(activity(session()), 'flow-a', 'tool-2');
    expect(state.view.kind).toBe('session');
    expect(sessionWorkspace(state).documents).toEqual([{ kind: 'workflow', id: 'flow-a' }]);
    expect(sessionWorkspace(state).open).toBe(true);
    expect(activity(state, 'flow-a', 'tool-2')).toBe(state);
  });
  it('does not reopen a workbench manually closed during the same turn', () => {
    const closed = workbenchAction(activity(session()), {
      type: 'toggle-workbench',
      turnId: 'turn-1',
    });
    const next = activity(closed, 'flow-b', 'tool-2');
    expect(sessionWorkspace(next).open).toBe(false);
    expect(sessionWorkspace(next).documents).toHaveLength(2);
    const later = activity(next, 'flow-c', 'tool-3', 'turn-2');
    expect(sessionWorkspace(later).open).toBe(true);
    expect(sessionWorkspace(later).active?.id).toBe('flow-c');
  });
  it('does not steal a manually selected document, but follows a later turn', () => {
    let state = activity(session());
    state = workbenchAction(state, {
      type: 'session-document',
      document: { kind: 'workflow', id: 'flow-b' },
    });
    state = activity(state, 'flow-c', 'tool-2');
    expect(sessionWorkspace(state).active?.id).toBe('flow-b');
    state = workbenchAction(state, { type: 'turn', sessionId: 'session-a', turnId: 'turn-2' });
    expect(sessionWorkspace(activity(state, 'flow-c', 'tool-3', 'turn-2')).active?.id).toBe(
      'flow-c'
    );
  });
  it('does not navigate away from standalone editing or a different session', () => {
    const standalone = workbenchAction(session(), { type: 'workflow', id: 'flow-b' });
    expect(activity(standalone).view).toEqual({ kind: 'workflow', id: 'flow-b' });
    const selected = workbenchAction(session(), { type: 'session', id: 'session-b' });
    const next = activity(selected);
    expect(next.sessionId).toBe('session-b');
    expect(sessionWorkspace(next).open).toBe(false);
  });
  it('opens the historical run for frozen workflow inspection', () => {
    const event = workflowActivity(
      tool('read_workflow', {
        payload: {
          name: 'read_workflow',
          arguments: { workflowId: 'flow', source: { runId: 'run-then' } },
          result: {
            ok: true,
            context: { workflowId: 'flow', runId: 'run-then', revision: 1 },
            data: {},
          },
        },
      })
    )!;
    const next = workbenchAction(session(event.sessionId), { type: 'workflow-activity', ...event });
    expect(sessionWorkspace(next).active).toEqual({ kind: 'run', id: 'run-then' });
    expect(next.openedWorkflowIds).not.toContain('flow');
  });
  it('only reveals completed workflow calls using structured context identities', () => {
    expect(workflowActivity(tool('read_workflow'))?.workflowId).toBe('flow');
    expect(workflowActivity(tool('validate_workflow'))?.workflowId).toBe('flow');
    expect(workflowActivity(tool('layout_workflow'))?.workflowId).toBe('flow');
    expect(workflowActivity(tool('layout_workflow', { status: 'running' }))).toBeNull();
    expect(
      workflowActivity(
        tool('create_workflow', {
          payload: {
            name: 'create_workflow',
            result: {
              ok: true,
              context: { workflowId: 'created', revision: 1 },
              data: { valueRef: { resultId: 'retained' } },
            },
          },
        })
      )?.workflowId
    ).toBe('created');
    for (const name of ['list_workflows', 'search_node_types'])
      expect(workflowActivity(tool(name))).toBeNull();
    for (const status of ['drafting', 'running', 'failed', 'cancelled'])
      expect(workflowActivity(tool('read_workflow', { status }))).toBeNull();
    expect(
      workflowActivity(
        tool('read_workflow', {
          payload: { name: 'read_workflow', isError: true, arguments: { workflowId: 'flow' } },
        })
      )
    ).toBeNull();
  });
});

describe('archive workspace reconciliation', () => {
  it('closes an archived workflow across session tabs while preserving other documents', () => {
    let state = activity(session(), 'flow-a');
    state = workbenchAction(state, {
      type: 'session-document',
      document: { kind: 'workflow', id: 'flow-b' },
    });
    state = workbenchAction(state, { type: 'workflow', id: 'flow-a' });
    const next = workbenchAction(state, {
      type: 'remove-object',
      kind: 'workflow',
      id: 'flow-a',
    });
    expect(next.view.kind).toBe('workflows');
    expect(next.openedWorkflowIds).toEqual(['flow-b']);
    expect(next.sessionWorkspaces['session-a'].documents).toEqual([
      { kind: 'workflow', id: 'flow-b' },
    ]);
    expect(next.sessionWorkspaces['session-a'].active?.id).toBe('flow-b');
    expect(next.sessionId).toBe('session-a');
  });
  it('closes an archived current session without discarding an unrelated standalone workflow', () => {
    const state = workbenchAction(activity(session()), {
      type: 'workflow',
      id: 'flow-b',
    });
    const next = workbenchAction(state, {
      type: 'remove-object',
      kind: 'session',
      id: 'session-a',
    });
    expect(next.view).toEqual({ kind: 'workflow', id: 'flow-b' });
    expect(next.sessionId).toBeNull();
    expect(next.sessionWorkspaces['session-a']).toBeUndefined();
    const current = workbenchAction(activity(session()), {
      type: 'remove-object',
      kind: 'session',
      id: 'session-a',
    });
    expect(current.view.kind).toBe('workflows');
    expect(current.sessionId).toBeNull();
  });
});
