/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import {
  FolderOpen,
  Loader2,
  MessageCircle,
  PanelLeft,
  PanelRightClose,
  Plus,
  Workflow as WorkflowIcon,
  X,
} from 'lucide-react';

import { applyWorkflowChanges, type WorkflowChanges } from './lib/workflow-patches';
import {
  emptyWorkbench,
  sessionWorkspace,
  workbenchAction,
  type Workbench,
  type WorkbenchAction,
  type WorkspaceDocument,
} from './lib/workbench';
import type { ModelSettings, Project, Snapshot, Workflow } from './lib/types';
import { ProjectScope } from './lib/project-context';
import { workflowTemplates } from './lib/node-catalog';
import { refreshModels } from './lib/models';
import { errorText, getSystemLocale, t, tx, useLocale } from './lib/i18n';
import type { PublishIntent } from './lib/deployment';
import { api, connectDesktop, subscribeEvents } from './lib/api';
import { WorkspaceHeader } from './components/workspace-header';
import { WorkflowPanel, type WorkflowPanelHandle } from './components/workflow-panel';
import { WorkbenchTabs } from './components/workbench-tabs';
import { Select } from './components/ui/select';
import { Presence, useContentTransition } from './components/ui/presence';
import { Input } from './components/ui/input';
import { Dialog } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { SettingsPage } from './components/settings-page';
import { SessionPanel } from './components/session-panel';
import { RunPage } from './components/run-page';
import { RunList } from './components/run-inspector/run-list';
import { ResourcesPage } from './components/resources-page';
import { ResizablePanel } from './components/resizable-panel';
import { ProjectTransfer } from './components/project-transfer';
import { ProjectMenu, ProjectSidebar, type ProjectAction } from './components/project-navigation';
import { ProjectManagement, type ProjectManagementAction } from './components/project-management';

const empty: Snapshot = { projects: [], sessions: [], workflows: [], runs: [] };
function readWorkbenches(): Record<string, Workbench> {
  try {
    const workbenches = JSON.parse(localStorage.getItem('flowgram.workbench.v3') || '{}') as Record<
      string,
      Workbench
    >;
    for (const key of Object.keys(workbenches)) {
      if ((workbenches[key].view.kind as string) === 'services')
        workbenches[key].view = { kind: 'workflows' };
    }
    return workbenches;
  } catch {
    return {};
  }
}
export function App() {
  useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectId, setProjectId] = useState(
    () => localStorage.getItem('flowgram.project.v2') || ''
  );
  const [snapshots, setSnapshots] = useState<Record<string, Snapshot>>({});
  const snapshotsRef = useRef(snapshots);
  snapshotsRef.current = snapshots;
  const [workbenches, setWorkbenches] = useState(readWorkbenches);
  const [ready, setReady] = useState(false);
  const [online, setOnline] = useState(false);
  const [model, setModel] = useState<ModelSettings | null>(null);
  const [settings, setSettings] = useState(false);
  useEffect(() => {
    const open = () => setSettings(true);
    window.addEventListener('flowgram:open-model-settings', open);
    return () => window.removeEventListener('flowgram:open-model-settings', open);
  }, []);
  const [sidebar, setSidebar] = useState(
    () => localStorage.getItem('flowgram.layout.sidebar.visible') !== 'false'
  );
  const [notice, setNotice] = useState<{
    message: string;
    projectId: string | null;
  } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [projectManagement, setProjectManagement] = useState<{
    action: ProjectManagementAction;
    project: Project;
  } | null>(null);
  const [transfer, setTransfer] = useState<'import' | 'export' | null>(null);
  const editors = useRef(new Map<string, WorkflowPanelHandle>());
  const archiving = useRef(new Set<string>());
  const [createKind, setCreateKind] = useState<'project' | 'workflow' | 'open' | null>(null);
  const [name, setName] = useState('');
  const [directory, setDirectory] = useState('');
  const [createError, setCreateError] = useState('');
  const [creating, setCreating] = useState(false);
  const [assist, setAssist] = useState<{
    workflowId: string;
    projectId: string;
  } | null>(null);
  const [assistSession, setAssistSession] = useState('new');
  const project = projects.find((item) => item.id === projectId);
  const data = snapshots[projectId] || empty;
  const bench = workbenches[projectId] || emptyWorkbench();
  const [publishIntent, setPublishIntent] = useState<PublishIntent | null>(null);
  const handlePublishIntent = useCallback(() => setPublishIntent(null), []);
  const view = bench.view;
  const destinationSurface = useRef<HTMLDivElement>(null);
  useContentTransition(destinationSurface, view.kind);
  const workspace = sessionWorkspace(bench);
  const showSession = !!project && view.kind === 'session';
  const paired = showSession && workspace.open;
  const document: WorkspaceDocument | null = showSession
    ? workspace.open
      ? workspace.active
      : null
    : view.kind === 'workflow' || view.kind === 'run'
    ? view
    : null;
  const report = (message: string, scope: string | null = projectId || null) =>
    setNotice({ message, projectId: scope });
  function dispatch(action: WorkbenchAction, scope = projectId) {
    setWorkbenches((current) => ({
      ...current,
      [scope]: workbenchAction(current[scope] || emptyWorkbench(), action),
    }));
  }
  const refresh = useCallback(async (scope: string) => {
    const next = await api<Snapshot>(
      '/api/bootstrap',
      'GET',
      undefined,
      undefined,
      scope || undefined
    );
    setProjects(next.projects);
    if (scope)
      setSnapshots((current) => ({
        ...current,
        [scope]: {
          ...next,
          workflows: next.workflows.map((workflow) => {
            const existing = current[scope]?.workflows.find((item) => item.id === workflow.id);
            return existing && existing.revision > workflow.revision ? existing : workflow;
          }),
        },
      }));
    if (scope)
      setWorkbenches((current) => {
        let state = current[scope];
        if (!state) return current;
        for (const id of state.openedWorkflowIds) {
          if (!next.workflows.some((item) => item.id === id))
            state = workbenchAction(state, {
              type: 'remove-object',
              kind: 'workflow',
              id,
            });
        }
        if (state.sessionId && !next.sessions.some((item) => item.id === state.sessionId))
          state = workbenchAction(state, {
            type: 'remove-object',
            kind: 'session',
            id: state.sessionId,
          });
        return state === current[scope] ? current : { ...current, [scope]: state };
      });
    return next;
  }, []);
  useEffect(() => {
    let disposed = false;
    void connectDesktop()
      .then(async () => {
        // Retry any catalog read that ran before the native service connection was ready.
        void refreshModels(true).catch(() => undefined);
        await api('/api/projects/initialize', 'POST', {
          locale: getSystemLocale(),
        });
        const next = await refresh('');
        if (disposed) return;
        setProjectId((id) =>
          next.projects.some((item) => item.id === id) ? id : next.projects[0]?.id || ''
        );
        const configured = await api<ModelSettings>('/api/settings/model');
        if (!disposed) {
          setModel(configured);
          setReady(true);
          setOnline(true);
        }
      })
      .catch((cause) => {
        if (!disposed) setNotice({ message: cause.message, projectId: null });
      });
    return () => {
      disposed = true;
    };
  }, [refresh]);
  useEffect(() => {
    localStorage.setItem('flowgram.project.v2', projectId);
    if (!ready || !projectId) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    void refresh(projectId).catch((cause) => {
      if (!controller.signal.aborted) setNotice({ message: cause.message, projectId });
    });
    const syncing = new Map<string, Promise<void>>();
    const cache = new Map<string, Workflow>();
    const syncWorkflow = (id: string) => {
      const pending = (syncing.get(id) || Promise.resolve())
        .then(async () => {
          if (controller.signal.aborted) return;
          const rendered = snapshotsRef.current[projectId]?.workflows.find((w) => w.id === id);
          const cached = cache.get(id);
          let workflow =
            cached && (!rendered || cached.revision > rendered.revision) ? cached : rendered;
          if (workflow) {
            try {
              let more = true;
              while (more) {
                const page = await api<WorkflowChanges>(
                  `/api/workflows/${id}/changes?afterRevision=${workflow.revision}`,
                  'GET',
                  undefined,
                  controller.signal,
                  projectId
                );
                if (page.requiresSnapshot)
                  throw new Error('Workflow change history is unavailable');
                workflow = applyWorkflowChanges(workflow, page.changes);
                more = page.hasMore;
                if (more && !page.changes.length)
                  throw new Error('Workflow change history did not advance');
              }
            } catch (cause) {
              if (controller.signal.aborted) return;
              workflow = await api<Workflow>(
                `/api/workflows/${id}`,
                'GET',
                undefined,
                controller.signal,
                projectId
              );
            }
          } else
            workflow = await api<Workflow>(
              `/api/workflows/${id}`,
              'GET',
              undefined,
              controller.signal,
              projectId
            );
          if (controller.signal.aborted) return;
          const latest = workflow;
          cache.set(id, latest);
          setSnapshots((current) => {
            const snapshot = current[projectId];
            if (!snapshot) return current;
            const exists = snapshot.workflows.find((w) => w.id === id);
            if (exists && exists.revision >= latest.revision) return current;
            return {
              ...current,
              [projectId]: {
                ...snapshot,
                workflows: exists
                  ? snapshot.workflows.map((w) => (w.id === id ? latest : w))
                  : [...snapshot.workflows, latest],
              },
            };
          });
        })
        .catch((cause) => {
          if (!controller.signal.aborted) setNotice({ message: cause.message, projectId });
        });
      syncing.set(id, pending);
    };
    void subscribeEvents(
      controller.signal,
      (event) => {
        if (event.kind === 'workflow_patch') {
          const patch = JSON.parse(event.data) as { workflowId: string };
          syncWorkflow(patch.workflowId);
          return;
        }
        if (event.kind === 'project_deleted') {
          forgetProjectDrafts(projectId);
          setSnapshots((current) => {
            const next = { ...current };
            delete next[projectId];
            return next;
          });
          setWorkbenches((current) => {
            const next = { ...current };
            delete next[projectId];
            return next;
          });
          void refresh('')
            .then((next) =>
              setProjectId((current) =>
                next.projects.some((item) => item.id === current)
                  ? current
                  : next.projects[0]?.id || ''
              )
            )
            .catch((cause) => report(cause.message, null));
          return;
        }
        if (
          [
            'object_archived',
            'object_restored',
            'object_deleted',
            'project_changed',
            'workflow_changed',
            'session_status',
            'run_started',
            'run_finished',
            'conversation_turn',
          ].includes(event.kind)
        ) {
          if (event.kind === 'object_archived' || event.kind === 'object_deleted') {
            const object = JSON.parse(event.data) as {
              kind: 'session' | 'workflow';
              id: string;
            };
            if (event.kind === 'object_deleted')
              forgetDeletedDraft(projectId, object.kind, object.id);
            dispatch({ type: 'remove-object', ...object }, projectId);
          }
          clearTimeout(timer);
          timer = setTimeout(() => {
            void refresh(projectId).catch((cause) => {
              if (!controller.signal.aborted) setNotice({ message: cause.message, projectId });
            });
          }, 120);
        }
      },
      (connected) => {
        if (!controller.signal.aborted) {
          setOnline(connected);
          if (connected)
            for (const workflow of snapshotsRef.current[projectId]?.workflows || [])
              syncWorkflow(workflow.id);
        }
      },
      undefined,
      0,
      projectId
    );
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [projectId, ready, refresh]);
  useEffect(() => {
    localStorage.setItem('flowgram.layout.sidebar.visible', String(sidebar));
  }, [sidebar]);
  useEffect(() => {
    localStorage.setItem(
      'flowgram.workbench.v3',
      JSON.stringify(
        Object.fromEntries(
          Object.entries(workbenches).map(([id, value]) => [
            id,
            { ...value, referenceIntent: undefined },
          ])
        )
      )
    );
  }, [workbenches]);
  const commands = useRef({
    newSession: () => {},
    settings: () => {},
    search: () => {},
  });
  commands.current = {
    newSession: () => {
      if (projectId) dispatch({ type: 'session', id: null });
    },
    settings: () => setSettings(true),
    search: () => {
      if (projectId) setSearchOpen(true);
    },
  };
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.defaultPrevented || documentIsModal()) return;
      const action =
        event.key === 'n'
          ? commands.current.newSession
          : event.key === 'k'
          ? commands.current.search
          : event.key === ','
          ? commands.current.settings
          : null;
      if (action) {
        event.preventDefault();
        action();
      }
      if (event.key === 'b') {
        event.preventDefault();
        setSidebar((value) => !value);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  async function selectProject(id: string) {
    if (id === projectId) return;
    try {
      await refresh(id);
      setProjectId(id);
      setNotice(null);
    } catch (cause) {
      setName('');
      setDirectory(projects.find((item) => item.id === id)?.directory || '');
      setCreateError((cause as Error).message);
      setCreateKind('open');
    }
  }
  function openCreate(kind: NonNullable<typeof createKind>) {
    setName('');
    setDirectory('');
    setCreateError('');
    setCreateKind(kind);
  }
  function projectAction(action: ProjectAction, targetId = projectId) {
    if (action === 'details' || action === 'rename' || action === 'delete') {
      const target = projects.find((item) => item.id === targetId);
      if (target) setProjectManagement({ action, project: target });
    } else if (action === 'import' || action === 'export') setTransfer(action);
    else openCreate(action);
  }
  async function chooseDirectory() {
    try {
      const { open } = await import('@tauri-apps/plugin-dialog');
      const value = await open({ directory: true, multiple: false });
      if (typeof value === 'string') setDirectory(value);
    } catch (cause) {
      setCreateError((cause as Error).message);
    }
  }
  async function create() {
    const scope = projectId;
    if (creating) return;
    setCreating(true);
    setCreateError('');
    try {
      if (createKind === 'workflow') {
        const created = await api<Workflow>(
          '/api/workflows',
          'POST',
          { projectId: scope, name },
          undefined,
          scope
        );
        await refresh(scope);
        dispatch({ type: 'workflow', id: created.id }, scope);
      } else {
        const created = await api<Project>(
          createKind === 'open' ? '/api/projects/open' : '/api/projects',
          'POST',
          createKind === 'open' ? { directory } : { name, directory: directory || undefined }
        );
        await refresh(created.id);
        setProjectId(created.id);
        setNotice(null);
      }
      setCreateKind(null);
    } catch (cause) {
      setCreateError((cause as Error).message);
    } finally {
      setCreating(false);
    }
  }
  function saved(workflow: Workflow) {
    setSnapshots((current) => {
      const snapshot = current[workflow.projectId];
      if (!snapshot) return current;
      return {
        ...current,
        [workflow.projectId]: {
          ...snapshot,
          workflows: snapshot.workflows.map((item) => (item.id === workflow.id ? workflow : item)),
        },
      };
    });
  }
  function sessionDocument(doc: WorkspaceDocument, scope = projectId) {
    if (
      doc.kind === 'workflow' &&
      !snapshots[scope]?.workflows.some((item) => item.id === doc.id)
    ) {
      report(tx('此工作流已归档或删除，请先在设置中恢复。'), scope);
      return;
    }
    dispatch({ type: 'session-document', document: doc }, scope);
  }
  async function archiveObject(kind: 'session' | 'workflow', id: string, scope = projectId) {
    const key = `${scope}:${kind}:${id}`;
    if (archiving.current.has(key)) return;
    archiving.current.add(key);
    try {
      if (kind === 'workflow') await editors.current.get(`${scope}:${id}`)?.flush();
      await api(
        `/api/${kind === 'session' ? 'sessions' : 'workflows'}/${id}/archive`,
        'POST',
        undefined,
        undefined,
        scope
      );
      dispatch({ type: 'remove-object', kind, id }, scope);
      await refresh(scope);
      report(tx('已归档，可在设置中恢复。'), scope);
    } catch (cause) {
      report((cause as Error).message, scope);
    } finally {
      archiving.current.delete(key);
    }
  }
  function headerLeading(): ReactNode {
    return (
      !sidebar && (
        <>
          <Button
            variant="ghost"
            size="icon"
            aria-label={tx('打开侧栏')}
            title={tx('打开侧栏')}
            onClick={() => setSidebar(true)}
          >
            <PanelLeft />
          </Button>
          <ProjectMenu
            projects={projects}
            projectId={projectId}
            onSelect={(id) => void selectProject(id)}
            onAction={projectAction}
            compact
          />
          <span className="mx-1 h-4 w-px shrink-0 bg-border" />
        </>
      )
    );
  }
  function tabsFor(scope: string, state: Workbench, active: WorkspaceDocument) {
    const owner = sessionWorkspace(state);
    const snapshot = snapshots[scope] || empty;
    return owner.documents.length > 1 ? (
      <WorkbenchTabs
        documents={owner.documents}
        active={active}
        workflows={snapshot.workflows}
        runs={snapshot.runs}
        onSelect={(doc) => sessionDocument(doc, scope)}
        onClose={(doc) => dispatch({ type: 'close-document', document: doc }, scope)}
      />
    ) : undefined;
  }
  return (
    <>
      <div
        className="flex h-dvh min-h-0 overflow-hidden bg-background text-foreground"
        inert={settings || undefined}
      >
        <ResizablePanel
          storageKey="flowgram.layout.sidebar"
          label={tx('侧栏宽度')}
          initial={248}
          min={200}
          max={340}
          reserve={640}
          hidden={!sidebar}
          className="border-r border-border"
        >
          <ProjectSidebar
            projects={projects}
            projectId={project?.id || ''}
            snapshot={data}
            bench={bench}
            onSelectProject={(id) => void selectProject(id)}
            onProjectAction={projectAction}
            onCollapse={() => setSidebar(false)}
            onSearch={() => setSearchOpen(true)}
            onNewSession={() => dispatch({ type: 'session', id: null })}
            onNewWorkflow={() => openCreate('workflow')}
            onSession={(id) => dispatch({ type: 'session', id })}
            onWorkflow={(id) => dispatch({ type: 'workflow', id })}
            onRuns={() => dispatch({ type: 'view', view: { kind: 'runs' } })}
            onResources={() => dispatch({ type: 'view', view: { kind: 'resources' } })}
            onSettings={() => setSettings(true)}
            onArchive={(kind, id) => void archiveObject(kind, id)}
          />
        </ResizablePanel>
        <main className="relative flex min-h-0 min-w-0 flex-1">
          {!project ? (
            <div className="flex min-w-0 flex-1 flex-col">
              <WorkspaceHeader title="FlowGram" leading={headerLeading()} />
              <div className="flex flex-1 items-center justify-center p-8">
                <div className="max-w-md">
                  <h1 className="text-2xl font-medium">{tx('从一个工作流项目开始')}</h1>
                  <p className="my-4 text-sm leading-6 text-muted-foreground">
                    {tx('把工作流、资源、会话和运行记录放在同一个工程中。')}
                  </p>
                  <div className="flex gap-3">
                    <Button onClick={() => openCreate('project')} disabled={!ready}>
                      <Plus />
                      {t('newProject')}
                    </Button>
                    <Button variant="outline" onClick={() => openCreate('open')} disabled={!ready}>
                      <FolderOpen />
                      {tx('打开项目')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ResizablePanel
                storageKey="flowgram.layout.conversation"
                label={tx('会话面板宽度')}
                initial={420}
                min={320}
                max={640}
                reserve={320}
                hidden={!showSession}
                fill={!paired}
                className={paired ? 'border-r border-border' : undefined}
              >
                <div className="relative min-h-0 flex-1">
                  {Object.entries(workbenches)
                    .filter(([, state]) => state.sessionInitialized)
                    .map(([scope, state]) => {
                      const owner = projects.find((item) => item.id === scope);
                      if (!owner) return null;
                      const snapshot = snapshots[scope] || empty;
                      const visible = scope === projectId && showSession;
                      return (
                        <div
                          key={scope}
                          className="workspace-document absolute inset-0"
                          data-active={visible}
                          inert={!visible || undefined}
                        >
                          <ProjectScope projectId={scope}>
                            <SessionPanel
                              project={owner}
                              sessionId={state.sessionId}
                              sessionEpoch={state.sessionEpoch}
                              sessions={snapshot.sessions}
                              workflows={snapshot.workflows}
                              runs={snapshot.runs}
                              model={model}
                              online={online}
                              ready={ready && scope === projectId}
                              referenceIntent={state.referenceIntent}
                              headerLeading={visible ? headerLeading() : undefined}
                              workbenchOpen={sessionWorkspace(state).open}
                              onToggleWorkbench={(turnId) =>
                                dispatch({ type: 'toggle-workbench', turnId }, scope)
                              }
                              onNewSession={() => dispatch({ type: 'session', id: null }, scope)}
                              onArchive={() => {
                                if (state.sessionId)
                                  void archiveObject('session', state.sessionId, scope);
                              }}
                              onCreated={(id, previous) => {
                                dispatch(
                                  {
                                    type: 'session-created',
                                    id,
                                    previous,
                                    epoch: state.sessionEpoch,
                                  },
                                  scope
                                );
                                void refresh(scope).catch((cause) => report(cause.message, scope));
                              }}
                              onChanged={() => {
                                void refresh(scope).catch((cause) => report(cause.message, scope));
                              }}
                              onOpenWorkflow={(id) =>
                                sessionDocument({ kind: 'workflow', id }, scope)
                              }
                              onOpenRun={(run) =>
                                sessionDocument({ kind: 'run', id: run.id }, scope)
                              }
                              onSettings={() => setSettings(true)}
                              onActivity={(activity) => {
                                dispatch({ type: 'workflow-activity', ...activity }, scope);
                                if (
                                  !snapshot.workflows.some(
                                    (item) => item.id === activity.workflowId
                                  )
                                )
                                  void refresh(scope).catch((cause) =>
                                    report(cause.message, scope)
                                  );
                              }}
                              onTurn={(turnId) =>
                                dispatch(
                                  {
                                    type: 'turn',
                                    sessionId: state.sessionId,
                                    turnId,
                                  },
                                  scope
                                )
                              }
                            />
                          </ProjectScope>
                        </div>
                      );
                    })}
                </div>
              </ResizablePanel>
              <div
                ref={destinationSurface}
                className="workspace-workbench relative min-h-0 min-w-0 flex-1"
                data-active={!showSession || paired}
                inert={(showSession && !paired) || undefined}
              >
                {Object.entries(workbenches).flatMap(([scope, state]) =>
                  state.openedWorkflowIds.map((id) => {
                    const snapshot = snapshots[scope];
                    const workflow = snapshot?.workflows.find((item) => item.id === id);
                    if (!workflow) return null;
                    const visible =
                      scope === projectId && document?.kind === 'workflow' && document.id === id;
                    const isPaired = visible && paired;
                    return (
                      <div
                        key={`${scope}:${id}`}
                        className="workspace-document absolute inset-0 flex min-h-0"
                        data-active={visible}
                        inert={!visible || undefined}
                      >
                        <ProjectScope projectId={scope}>
                          <WorkflowPanel
                            ref={(handle) => {
                              if (handle) editors.current.set(`${scope}:${id}`, handle);
                              else editors.current.delete(`${scope}:${id}`);
                            }}
                            onArchive={() => void archiveObject('workflow', id, scope)}
                            workflow={workflow}
                            model={model}
                            onOpenSettings={() => setSettings(true)}
                            workflows={snapshot.workflows}
                            runs={snapshot.runs}
                            selectedRunId={null}
                            onSaved={saved}
                            onPublish={(workflow) => {
                              setPublishIntent({
                                projectId: scope,
                                workflowId: workflow.id,
                              });
                              setSettings(true);
                            }}
                            onClose={() =>
                              dispatch(
                                {
                                  type: 'close-document',
                                  document: { kind: 'workflow', id },
                                },
                                scope
                              )
                            }
                            onCollapse={
                              isPaired
                                ? () => dispatch({ type: 'toggle-workbench' }, scope)
                                : undefined
                            }
                            headerLeading={visible && !paired ? headerLeading() : undefined}
                            documentTabs={
                              isPaired
                                ? tabsFor(scope, state, {
                                    kind: 'workflow',
                                    id,
                                  })
                                : undefined
                            }
                            onInspectRun={(runId) =>
                              isPaired
                                ? sessionDocument({ kind: 'run', id: runId }, scope)
                                : dispatch(
                                    {
                                      type: 'view',
                                      view: { kind: 'run', id: runId },
                                    },
                                    scope
                                  )
                            }
                            onRun={() => {
                              void refresh(scope).catch((cause) => report(cause.message, scope));
                            }}
                            onAssist={() => {
                              setAssistSession('new');
                              setAssist({ workflowId: id, projectId: scope });
                            }}
                            error={(message) => report(message, scope)}
                          />
                        </ProjectScope>
                      </div>
                    );
                  })
                )}
                {document?.kind === 'workflow' &&
                  !data.workflows.some((item) => item.id === document.id) && (
                    <div className="flex h-full flex-col">
                      <WorkspaceHeader
                        title={tx('工作流')}
                        leading={!paired ? headerLeading() : undefined}
                      />
                      <p className="p-6 text-sm text-muted-foreground">
                        <Loader2 className="mr-2 inline animate-spin" size={14} />
                        {t('loading')}
                      </p>
                    </div>
                  )}
                {document?.kind === 'run' && (
                  <ProjectScope projectId={projectId}>
                    <RunPage
                      key={`${projectId}:${document.id}`}
                      id={document.id}
                      onDebugPrepared={async (workflow) => {
                        await refresh(projectId);
                        if (paired)
                          dispatch({
                            type: 'session-document',
                            document: { kind: 'workflow', id: workflow.id },
                          });
                        else dispatch({ type: 'workflow', id: workflow.id });
                      }}
                      workflows={data.workflows}
                      sessions={data.sessions}
                      headerLeading={!paired ? headerLeading() : undefined}
                      documentTabs={paired ? tabsFor(projectId, bench, document) : undefined}
                      onClose={() => dispatch({ type: 'close-document', document })}
                      onCollapse={paired ? () => dispatch({ type: 'toggle-workbench' }) : undefined}
                      onWorkflow={(id) => {
                        if (!data.workflows.some((item) => item.id === id))
                          report(tx('此工作流已归档或删除，请先在设置中恢复。'));
                        else if (paired) sessionDocument({ kind: 'workflow', id });
                        else dispatch({ type: 'workflow', id });
                      }}
                      onSession={(id) => {
                        if (data.sessions.some((item) => item.id === id))
                          dispatch({ type: 'session', id });
                        else report(tx('此会话已归档或删除，请先在设置中恢复。'));
                      }}
                    />
                  </ProjectScope>
                )}
                {showSession && paired && !document && (
                  <div className="flex h-full flex-col">
                    <WorkspaceHeader title={tx('工作流工作台')}>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={tx('收起工作台')}
                        onClick={() => dispatch({ type: 'toggle-workbench' })}
                      >
                        <PanelRightClose />
                      </Button>
                    </WorkspaceHeader>
                    <div className="m-auto max-w-sm p-6">
                      <WorkflowIcon size={24} className="mb-4 text-muted-foreground" />
                      <h2 className="text-base font-medium">{tx('选择要查看的工作流')}</h2>
                      <p className="mb-5 mt-2 text-sm leading-6 text-muted-foreground">
                        {tx('会话操作到具体工作流时，会自动在这里打开。')}
                      </p>
                      {data.workflows.map((item) => (
                        <button
                          key={item.id}
                          className="sidebar-row"
                          onClick={() => sessionDocument({ kind: 'workflow', id: item.id })}
                        >
                          <WorkflowIcon size={15} />
                          {item.name}
                        </button>
                      ))}
                      {!data.workflows.length && (
                        <p className="text-xs text-muted-foreground">{t('emptyWorkflows')}</p>
                      )}
                    </div>
                  </div>
                )}
                {view.kind === 'workflows' && (
                  <div className="flex h-full flex-col">
                    <WorkspaceHeader title={tx('主页')} leading={headerLeading()}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => dispatch({ type: 'session', id: null })}
                      >
                        <MessageCircle />
                        {tx('让助手搭建')}
                      </Button>
                      <Button size="sm" onClick={() => openCreate('workflow')}>
                        <Plus />
                        {t('newWorkflow')}
                      </Button>
                    </WorkspaceHeader>
                    <div className="min-h-0 flex-1 overflow-auto p-7">
                      <h1 className="text-xl font-medium">{project.name}</h1>
                      <p className="mb-7 mt-2 text-sm text-muted-foreground">
                        {tx('查看项目工作流，或从模板开始搭建。')}
                      </p>
                      <h2 className="mb-2 text-xs font-medium text-muted-foreground">
                        {tx('工作流')}
                      </h2>
                      {data.workflows.map((item) => (
                        <button
                          key={item.id}
                          className="flex w-full items-center gap-4 border-b border-border py-4 text-left hover:bg-secondary/40"
                          onClick={() => dispatch({ type: 'workflow', id: item.id })}
                        >
                          <WorkflowIcon size={18} />
                          <span className="flex-1 text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground">v{item.revision}</span>
                        </button>
                      ))}
                      {!data.workflows.length && (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                          {t('emptyWorkflows')}
                        </p>
                      )}
                      <h2 className="mb-3 mt-8 text-xs text-muted-foreground">
                        {tx('从模板创建')}
                      </h2>
                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        {workflowTemplates.map((template) => (
                          <button
                            className="template-card"
                            key={template.id}
                            onClick={() => {
                              const scope = projectId;
                              void api<Workflow>(
                                '/api/workflows',
                                'POST',
                                {
                                  projectId: scope,
                                  name: template.name,
                                  schema: template.schema,
                                },
                                undefined,
                                scope
                              )
                                .then(async (created) => {
                                  await refresh(scope);
                                  dispatch({ type: 'workflow', id: created.id }, scope);
                                })
                                .catch((cause) => report(cause.message, scope));
                            }}
                          >
                            <span className="text-sm font-medium">{template.name}</span>
                            <span className="mt-2 block text-xs text-muted-foreground">
                              {template.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {view.kind === 'runs' && (
                  <div className="flex h-full flex-col">
                    <WorkspaceHeader title={tx('运行记录')} leading={headerLeading()} />
                    <ProjectScope projectId={projectId}>
                      <RunList
                        onOpen={(id) => dispatch({ type: 'view', view: { kind: 'run', id } })}
                      />
                    </ProjectScope>
                  </div>
                )}
                {view.kind === 'resources' && (
                  <div className="flex h-full flex-col">
                    <WorkspaceHeader title={tx('项目资源')} leading={headerLeading()} />
                    <div className="min-h-0 flex-1">
                      <ProjectScope projectId={projectId}>
                        <ResourcesPage key={projectId} />
                      </ProjectScope>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      {notice && (notice.projectId === null || notice.projectId === projectId) && !settings && (
        <div role="alert" className="app-notice">
          <span className="min-w-0 text-sm">{errorText(notice.message)}</span>
          <Button
            size="icon"
            variant="ghost"
            aria-label={tx('关闭提示')}
            onClick={() => setNotice(null)}
          >
            <X />
          </Button>
        </div>
      )}
      <Dialog
        open={!!createKind}
        onOpenChange={(value) => {
          if (!value && !creating) setCreateKind(null);
        }}
        title={
          createKind === 'workflow'
            ? t('newWorkflow')
            : createKind === 'open'
            ? tx('打开项目')
            : t('newProject')
        }
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void create();
          }}
          className="space-y-4"
        >
          {createKind !== 'open' && (
            <label className="grid gap-2 text-xs">
              {createKind === 'workflow' ? t('workflowName') : t('projectName')}
              <Input
                autoFocus
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          )}
          {createKind !== 'workflow' && (
            <label className="grid gap-2 text-xs">
              {tx('工程目录')}
              <div className="flex gap-2">
                <Input
                  autoFocus={createKind === 'open'}
                  required={createKind === 'open'}
                  value={directory}
                  onChange={(event) => setDirectory(event.target.value)}
                  placeholder={
                    createKind === 'open'
                      ? tx('选择包含工程清单的目录')
                      : tx('留空使用应用管理的位置')
                  }
                />
                {'__TAURI_INTERNALS__' in window && (
                  <Button
                    type="button"
                    variant="outline"
                    aria-label={tx('选择目录')}
                    onClick={() => void chooseDirectory()}
                  >
                    <FolderOpen />
                  </Button>
                )}
              </div>
            </label>
          )}
          {createError && (
            <p role="alert" className="text-sm leading-6 text-destructive">
              {errorText(createError)}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              disabled={creating}
              onClick={() => setCreateKind(null)}
            >
              {t('cancel')}
            </Button>
            <Button
              disabled={creating || (createKind === 'open' ? !directory.trim() : !name.trim())}
            >
              {creating
                ? t('saving')
                : createKind === 'open'
                ? createError
                  ? tx('重试打开')
                  : t('open')
                : t('create')}
            </Button>
          </div>
        </form>
      </Dialog>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen} title={tx('搜索项目内容')}>
        <Input
          autoFocus
          aria-label={tx('搜索项目内容')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="mt-4 space-y-1">
          {data.workflows
            .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <button
                key={item.id}
                className="sidebar-row"
                onClick={() => {
                  dispatch({ type: 'workflow', id: item.id });
                  setSearchOpen(false);
                }}
              >
                <WorkflowIcon size={15} />
                {item.name}
              </button>
            ))}
          {data.sessions
            .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <button
                key={item.id}
                className="sidebar-row"
                onClick={() => {
                  dispatch({ type: 'session', id: item.id });
                  setSearchOpen(false);
                }}
              >
                <MessageCircle size={15} />
                {item.title}
              </button>
            ))}
        </div>
      </Dialog>
      <Dialog
        open={!!assist}
        onOpenChange={(value) => {
          if (!value) setAssist(null);
        }}
        title={tx('让助手修改')}
      >
        <p className="mb-4 text-sm text-muted-foreground">
          {tx('工作流会在右侧保留，并作为本次输入的显式引用。')}
        </p>
        <label className="grid gap-2 text-xs">
          {tx('选择会话')}
          <Select
            value={assistSession}
            onValueChange={setAssistSession}
            options={[
              { value: 'new', label: t('newSession') },
              ...(snapshots[assist?.projectId || '']?.sessions || []).map((item) => ({
                value: item.id,
                label: item.title,
              })),
            ]}
          />
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setAssist(null)}>
            {t('cancel')}
          </Button>
          <Button
            onClick={() => {
              if (!assist) return;
              dispatch(
                {
                  type: 'assist',
                  workflowId: assist.workflowId,
                  sessionId: assistSession === 'new' ? undefined : assistSession,
                },
                assist.projectId
              );
              setAssist(null);
            }}
          >
            {tx('开始协作')}
          </Button>
        </div>
      </Dialog>
      {transfer && (
        <ProjectTransfer
          mode={transfer}
          project={project}
          close={() => setTransfer(null)}
          imported={async (created) => {
            setProjects((current) => [
              created,
              ...current.filter((item) => item.id !== created.id),
            ]);
            setProjectId(created.id);
            dispatch({ type: 'view', view: { kind: 'workflows' } }, created.id);
            setNotice(null);
            void refresh(created.id).catch((cause) => report(cause.message, created.id));
          }}
        />
      )}
      {projectManagement && (
        <ProjectManagement
          key={`${projectManagement.action}:${projectManagement.project.id}`}
          action={projectManagement.action}
          project={projectManagement.project}
          close={() => setProjectManagement(null)}
          renamed={(updated) => {
            setProjects((current) =>
              current.map((item) => (item.id === updated.id ? updated : item))
            );
          }}
          deleted={async (id) => {
            setSnapshots((current) => {
              const next = { ...current };
              delete next[id];
              return next;
            });
            setWorkbenches((current) => {
              const next = { ...current };
              delete next[id];
              return next;
            });
            forgetProjectDrafts(id);
            const next = await refresh('');
            setProjectId((current) =>
              current === id || !next.projects.some((item) => item.id === current)
                ? next.projects[0]?.id || ''
                : current
            );
            setNotice(null);
          }}
        />
      )}
      {ready && (
        <Presence open={settings} keepMounted className="settings-presence fixed inset-0 z-40">
          <SettingsPage
            onArchiveChanged={(scope, kind, id, deleted) => {
              if (deleted) {
                forgetDeletedDraft(scope, kind, id);
                dispatch({ type: 'remove-object', kind, id }, scope);
              }
              void refresh(scope).catch((cause) => report(cause.message, scope));
            }}
            visible={settings}
            close={() => setSettings(false)}
            model={model}
            saved={setModel}
            online={online}
            deploymentIntent={publishIntent}
            onDeploymentHandled={handlePublishIntent}
            openDeploymentWorkflow={(scope, id) => {
              setProjectId(scope);
              dispatch({ type: 'workflow', id }, scope);
              setSettings(false);
            }}
            openDeploymentRun={(scope, id) => {
              setProjectId(scope);
              dispatch({ type: 'view', view: { kind: 'run', id } }, scope);
              setSettings(false);
            }}
          />
        </Presence>
      )}
    </>
  );
}
function documentIsModal() {
  return !!window.document.querySelector('[role="dialog"],[role="menu"],[role="listbox"]');
}
function forgetDeletedDraft(projectId: string, kind: 'session' | 'workflow', id: string) {
  if (kind === 'workflow') {
    sessionStorage.removeItem(`flowgram.draft.${projectId}.${id}`);
    sessionStorage.removeItem(`flowgram.node-editors.${projectId}.${id}`);
  } else {
    const key = `flowgram.compose.v2.${projectId}`;
    let drafts: Record<string, unknown> = {};
    try {
      drafts = JSON.parse(sessionStorage.getItem(key) || '{}');
    } catch {
      /* Discard an invalid local cache. */
    }
    delete drafts[id];
    sessionStorage.setItem(key, JSON.stringify(drafts));
    sessionStorage.removeItem(`flowgram.pending.v2.${projectId}.${id}`);
    window.dispatchEvent(
      new CustomEvent('flowgram:session-deleted', { detail: { projectId, id } })
    );
  }
}

function forgetProjectDrafts(projectId: string) {
  for (const key of Object.keys(sessionStorage)) {
    if (
      key === `flowgram.compose.v2.${projectId}` ||
      [
        `flowgram.pending.v2.${projectId}.`,
        `flowgram.draft.${projectId}.`,
        `flowgram.node-editors.${projectId}.`,
      ].some((prefix) => key.startsWith(prefix))
    )
      sessionStorage.removeItem(key);
  }
}
