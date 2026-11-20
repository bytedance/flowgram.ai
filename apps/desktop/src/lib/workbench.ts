/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type { ConversationItem } from './types';

export type NavigationSection = 'sessions' | 'workflows' | 'runs' | 'resources';
export type WorkspaceDocument = { kind: 'workflow' | 'run'; id: string };
export type DocumentView =
  | { kind: 'workflows' | 'session' | 'runs' | 'resources' }
  | WorkspaceDocument;
export interface SessionWorkspace {
  documents: WorkspaceDocument[];
  active: WorkspaceDocument | null;
  open: boolean;
  focusLocked: boolean;
  lastTurnId: string | null;
  suppressedTurnId: string | null;
  handledItems: string[];
}
export interface Workbench {
  view: DocumentView;
  sessionId: string | null;
  sessionEpoch: number;
  sessionInitialized: boolean;
  openedWorkflowIds: string[];
  standaloneWorkflowId: string | null;
  selectedRunId: string | null;
  sessionWorkspaces: Record<string, SessionWorkspace>;
  referenceIntent?: { workflowId: string | null; sequence: number };
  referenceSequence: number;
}
export const emptySessionWorkspace = (): SessionWorkspace => ({
  documents: [],
  active: null,
  open: false,
  focusLocked: false,
  lastTurnId: null,
  suppressedTurnId: null,
  handledItems: [],
});
export const emptyWorkbench = (): Workbench => ({
  view: { kind: 'workflows' },
  sessionId: null,
  sessionEpoch: 0,
  sessionInitialized: false,
  openedWorkflowIds: [],
  standaloneWorkflowId: null,
  selectedRunId: null,
  sessionWorkspaces: {},
  referenceSequence: 0,
});
export function sessionKey(state: Workbench) {
  return state.sessionId || `new.${state.sessionEpoch}`;
}
export function sessionWorkspace(state: Workbench) {
  return state.sessionWorkspaces[sessionKey(state)] || emptySessionWorkspace();
}
export function navigationSection(state: Workbench): NavigationSection {
  return state.view.kind === 'session'
    ? 'sessions'
    : state.view.kind === 'workflow' || state.view.kind === 'workflows'
    ? 'workflows'
    : state.view.kind === 'run'
    ? 'runs'
    : state.view.kind;
}
export function sameDocument(left: WorkspaceDocument | null, right: WorkspaceDocument | null) {
  return left?.kind === right?.kind && left?.id === right?.id;
}
function remember(state: Workbench, doc: WorkspaceDocument) {
  return doc.kind === 'workflow' && !state.openedWorkflowIds.includes(doc.id)
    ? [...state.openedWorkflowIds, doc.id]
    : state.openedWorkflowIds;
}
function withWorkspace(
  state: Workbench,
  workspace: SessionWorkspace,
  key = sessionKey(state)
): Workbench {
  return {
    ...state,
    sessionWorkspaces: { ...state.sessionWorkspaces, [key]: workspace },
  };
}
function openDocument(
  workspace: SessionWorkspace,
  doc: WorkspaceDocument,
  manual: boolean
): SessionWorkspace {
  return {
    ...workspace,
    documents: workspace.documents.some((item) => sameDocument(item, doc))
      ? workspace.documents
      : [...workspace.documents, doc],
    active: doc,
    open: true,
    focusLocked: manual || workspace.focusLocked,
  };
}
export type WorkbenchAction =
  | { type: 'navigate'; section: NavigationSection }
  | { type: 'workflow'; id: string }
  | { type: 'session'; id: string | null }
  | { type: 'assist'; workflowId: string; sessionId?: string }
  | {
      type: 'session-created';
      id: string;
      previous: string | null;
      epoch: number;
    }
  | { type: 'session-document'; document: WorkspaceDocument }
  | { type: 'toggle-workbench'; turnId?: string | null }
  | { type: 'turn'; sessionId: string | null; turnId: string | null }
  | {
      type: 'workflow-activity';
      sessionId: string;
      turnId: string;
      itemId: string;
      workflowId: string;
      runId?: string;
    }
  | { type: 'view'; view: DocumentView }
  | { type: 'remove-object'; kind: 'session' | 'workflow'; id: string }
  | { type: 'close-document'; document: WorkspaceDocument };
export function workbenchAction(state: Workbench, action: WorkbenchAction): Workbench {
  switch (action.type) {
    case 'remove-object': {
      if (action.kind === 'session') {
        const workspaces = { ...state.sessionWorkspaces };
        delete workspaces[action.id];
        return {
          ...state,
          sessionWorkspaces: workspaces,
          sessionId: state.sessionId === action.id ? null : state.sessionId,
          sessionEpoch: state.sessionId === action.id ? state.sessionEpoch + 1 : state.sessionEpoch,
          view:
            state.view.kind === 'session' && state.sessionId === action.id
              ? { kind: 'workflows' }
              : state.view,
        };
      }
      const workspaces = Object.fromEntries(
        Object.entries(state.sessionWorkspaces).map(([key, workspace]) => {
          const documents = workspace.documents.filter(
            (doc) => !(doc.kind === 'workflow' && doc.id === action.id)
          );
          const active =
            workspace.active?.kind === 'workflow' && workspace.active.id === action.id
              ? documents.at(-1) || null
              : workspace.active;
          return [
            key,
            {
              ...workspace,
              documents,
              active,
              open: workspace.open && !!active,
            },
          ];
        })
      );
      return {
        ...state,
        sessionWorkspaces: workspaces,
        openedWorkflowIds: state.openedWorkflowIds.filter((id) => id !== action.id),
        standaloneWorkflowId:
          state.standaloneWorkflowId === action.id ? null : state.standaloneWorkflowId,
        view:
          state.view.kind === 'workflow' && state.view.id === action.id
            ? { kind: 'workflows' }
            : state.view,
        referenceIntent:
          state.referenceIntent?.workflowId === action.id
            ? { workflowId: null, sequence: state.referenceSequence + 1 }
            : state.referenceIntent,
        referenceSequence: state.referenceSequence + 1,
      };
    }
    case 'navigate':
      return {
        ...state,
        view:
          action.section === 'sessions'
            ? { kind: 'session' }
            : action.section === 'workflows' && state.standaloneWorkflowId
            ? { kind: 'workflow', id: state.standaloneWorkflowId }
            : action.section === 'runs' && state.selectedRunId
            ? { kind: 'run', id: state.selectedRunId }
            : { kind: action.section },
        sessionInitialized: state.sessionInitialized || action.section === 'sessions',
      };
    case 'workflow':
      return {
        ...state,
        view: { kind: 'workflow', id: action.id },
        standaloneWorkflowId: action.id,
        openedWorkflowIds: remember(state, { kind: 'workflow', id: action.id }),
      };
    case 'session': {
      const sequence = state.referenceSequence + 1;
      return {
        ...state,
        view: { kind: 'session' },
        sessionInitialized: true,
        sessionId: action.id,
        sessionEpoch: state.sessionEpoch + 1,
        referenceSequence: sequence,
        referenceIntent: action.id ? undefined : { workflowId: null, sequence },
      };
    }
    case 'assist': {
      const sequence = state.referenceSequence + 1;
      const next: Workbench = {
        ...state,
        view: { kind: 'session' },
        sessionInitialized: true,
        sessionId: action.sessionId || null,
        sessionEpoch: state.sessionEpoch + 1,
        referenceSequence: sequence,
        referenceIntent: { workflowId: action.workflowId, sequence },
        openedWorkflowIds: remember(state, {
          kind: 'workflow',
          id: action.workflowId,
        }),
      };
      return withWorkspace(
        next,
        openDocument(sessionWorkspace(next), { kind: 'workflow', id: action.workflowId }, true)
      );
    }
    case 'session-created': {
      const oldKey = action.previous || `new.${action.epoch}`;
      const workspaces = { ...state.sessionWorkspaces };
      if (workspaces[oldKey]) {
        workspaces[action.id] = workspaces[oldKey];
        delete workspaces[oldKey];
      }
      return {
        ...state,
        sessionWorkspaces: workspaces,
        sessionId:
          state.sessionId === action.previous && state.sessionEpoch === action.epoch
            ? action.id
            : state.sessionId,
      };
    }
    case 'session-document':
      return {
        ...withWorkspace(state, openDocument(sessionWorkspace(state), action.document, true)),
        openedWorkflowIds: remember(state, action.document),
      };
    case 'toggle-workbench': {
      const workspace = sessionWorkspace(state);
      return withWorkspace(state, {
        ...workspace,
        open: !workspace.open,
        suppressedTurnId: workspace.open
          ? action.turnId || workspace.lastTurnId
          : workspace.suppressedTurnId,
      });
    }
    case 'turn': {
      if (state.sessionId !== action.sessionId || !action.turnId) return state;
      const workspace = sessionWorkspace(state);
      return workspace.lastTurnId === action.turnId
        ? state
        : withWorkspace(state, {
            ...workspace,
            lastTurnId: action.turnId,
            focusLocked: false,
            suppressedTurnId: null,
          });
    }
    case 'workflow-activity': {
      // Activities may update an inactive session's document list, but never navigate away.
      const key = action.sessionId;
      const workspace = state.sessionWorkspaces[key] || emptySessionWorkspace();
      if (workspace.handledItems.includes(action.itemId)) return state;
      const newTurn = workspace.lastTurnId !== action.turnId;
      const doc: WorkspaceDocument = action.runId
        ? { kind: 'run', id: action.runId }
        : { kind: 'workflow', id: action.workflowId };
      const mayReveal =
        workspace.suppressedTurnId !== action.turnId && (newTurn || !workspace.focusLocked);
      const updated = {
        ...workspace,
        lastTurnId: action.turnId,
        focusLocked: newTurn ? false : workspace.focusLocked,
        handledItems: [...workspace.handledItems.slice(-127), action.itemId],
        documents: workspace.documents.some((item) => sameDocument(item, doc))
          ? workspace.documents
          : [...workspace.documents, doc],
        active: mayReveal ? doc : workspace.active,
        open: mayReveal ? true : workspace.open,
      };
      return {
        ...withWorkspace(state, updated, key),
        openedWorkflowIds: remember(state, doc),
      };
    }
    case 'view':
      return {
        ...state,
        view: action.view,
        selectedRunId: action.view.kind === 'run' ? action.view.id : state.selectedRunId,
      };
    case 'close-document': {
      if (state.view.kind !== 'session')
        return {
          ...state,
          view: {
            kind: action.document.kind === 'workflow' ? 'workflows' : 'runs',
          },
          standaloneWorkflowId:
            action.document.kind === 'workflow' ? null : state.standaloneWorkflowId,
          selectedRunId: action.document.kind === 'run' ? null : state.selectedRunId,
        };
      const workspace = sessionWorkspace(state);
      const documents = workspace.documents.filter((doc) => !sameDocument(doc, action.document));
      return withWorkspace(state, {
        ...workspace,
        documents,
        active: sameDocument(workspace.active, action.document)
          ? documents.at(-1) || null
          : workspace.active,
        open: !!documents.length && workspace.open,
        focusLocked: true,
        suppressedTurnId: documents.length ? workspace.suppressedTurnId : workspace.lastTurnId,
      });
    }
  }
}
/** Only completed calls with a concrete workflow identity may reveal the editor. */
export function workflowActivity(item: ConversationItem) {
  if (item.kind !== 'tool' || item.status !== 'completed' || item.payload.isError) return null;
  if (
    ![
      'read_workflow',
      'search_workflow',
      'edit_workflow',
      'revert_workflow_change',
      'create_workflow',
      'layout_workflow',
      'validate_workflow',
      'run_workflow',
      'test_node',
    ].includes(item.payload.name || '')
  )
    return null;
  const args = item.payload.arguments as Record<string, unknown> | undefined;
  const result = item.payload.result;
  const workflowId =
    (result?.context as Record<string, unknown> | undefined)?.workflowId ||
    args?.workflowId ||
    (result?.data as Record<string, unknown> | undefined)?.workflowId;
  const source = args?.source as { runId?: string } | undefined;
  const runId = ['read_workflow', 'search_workflow'].includes(item.payload.name || '')
    ? source?.runId || (result?.context as { runId?: string } | undefined)?.runId
    : undefined;
  return typeof workflowId === 'string' && workflowId
    ? {
        sessionId: item.sessionId,
        turnId: item.turnId,
        itemId: item.id,
        workflowId,
        ...(runId ? { runId } : {}),
      }
    : null;
}
export function clearLegacyViewState() {
  if (localStorage.getItem('flowgram.workbench.version') === '2') return;
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of Object.keys(storage))
      if (
        ['flowgram.project', 'flowgram.task', 'flowgram.workflow'].includes(key) ||
        [
          'flowgram.draft.',
          'flowgram.input.',
          'flowgram.node-editors.',
          'flowgram.backup.',
          'flowgram.pending-input.',
        ].some((prefix) => key.startsWith(prefix))
      )
        storage.removeItem(key);
  }
  localStorage.setItem('flowgram.workbench.version', '2');
}
