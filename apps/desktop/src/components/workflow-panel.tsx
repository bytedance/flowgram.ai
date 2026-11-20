/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useId,
  useImperativeHandle,
  type ReactNode,
  type Ref,
} from 'react';

import {
  Check,
  Focus,
  MessageCircle,
  MoreHorizontal,
  PanelRightClose,
  PanelBottom,
  Play,
  Plus,
  Save,
  Send,
  X,
} from 'lucide-react';

import { rebaseWorkflow } from '../lib/workflow-rebase';
import {
  copyNodes,
  pasteNodes,
  removeNodes,
  deletionReason,
  insertNode,
  sameEdge,
  type InsertionIntent,
  type NodeClipboard,
  type NodeCommand,
  type Edge,
} from '../lib/workflow-editing';
import { useRunFollow } from '../lib/use-run-follow';
import type {
  ModelSettings,
  RuntimeEvent,
  Run,
  Workflow,
  WorkflowNode,
  WorkflowSchema,
} from '../lib/types';
import { aggregateStatus, type TraceDetail } from '../lib/run-trace';
import { useProjectApi } from '../lib/project-context';
import { canvasExecutions, type CanvasExecution } from '../lib/node-execution';
import { tx, errorText } from '../lib/i18n';
import { t } from '../lib/i18n';
import { eventData, executionLabel, sampleBindings } from '../lib/execution-samples';
import { takeDebugIntent, type DebugOrigin } from '../lib/debug-intent';
import { isLoop, mapScope, editControlConfiguration, scopeFor } from '../lib/control-nodes';
const WorkflowCanvas = lazy(() =>
  import('./workflow-canvas').then((module) => ({
    default: module.WorkflowCanvas,
  }))
);
import { WorkspaceHeader } from './workspace-header';
import { WorkflowConflictReview } from './workflow-conflict-review';
import type { CanvasHandle } from './workflow-canvas';
import { MenuButton } from './ui/menu-button';
import { Dialog } from './ui/dialog';
import { CommandMenu, type MenuCommand } from './ui/command-menu';
import { Button } from './ui/button';
import { RunInspector } from './run-inspector/run-inspector';
import { ResizablePanel } from './resizable-panel';
import { NodePalette } from './node-palette';
import { NodeInspector, type RunDetail } from './node-inspector/node-inspector';
import { flattenNodes, executionSignature, signature, type Data } from './node-inspector/model';
import { FormSessionProvider, type EditorBuffer } from './form/session';
import { defaultRunInputs, withRunDefaults, RunInputForm } from './form/run-input-form';
import './node-inspector/node-inspector.css';

function findNode(nodes: WorkflowNode[], id: string | null): WorkflowNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const child = node.blocks && findNode(node.blocks, id);
    if (child) return child;
  }
}

export interface WorkflowPanelHandle {
  flush: () => Promise<Workflow>;
}
export function WorkflowPanel({
  ref,
  onArchive,
  workflow,
  onSaved,
  onClose,
  onRun,
  onInspectRun,
  onAssist,
  onPublish,
  onCollapse,
  headerLeading,
  documentTabs,
  error,
  runs,
  selectedRunId,
  runViewRequest = 0,
  workflows,
  model,
  onOpenSettings,
}: {
  ref?: Ref<WorkflowPanelHandle>;
  onArchive: () => void;
  workflow: Workflow;
  model: ModelSettings | null;
  onOpenSettings: () => void;
  onSaved: (workflow: Workflow) => void;
  onClose: () => void;
  onRun: (run: Run) => void;
  onInspectRun: (id: string) => void;
  onAssist: () => void;
  onPublish: (workflow: Workflow) => void;
  onCollapse?: () => void;
  headerLeading?: ReactNode;
  documentTabs?: ReactNode;
  error: (message: string) => void;
  runs: Run[];
  selectedRunId: string | null;
  runViewRequest?: number;
  workflows: Workflow[];
}) {
  const api = useProjectApi();
  const [schema, setSchema] = useState<WorkflowSchema>(() => {
    try {
      return (
        JSON.parse(
          sessionStorage.getItem(`flowgram.draft.${workflow.projectId}.${workflow.id}`) || 'null'
        )?.schema || workflow.schema
      );
    } catch {
      return workflow.schema;
    }
  });
  const [dirty, setDirty] = useState(
    () => !!sessionStorage.getItem(`flowgram.draft.${workflow.projectId}.${workflow.id}`)
  );
  const [saving, setSaving] = useState(false);
  const canvas = useRef<CanvasHandle>(null);
  const host = useRef<HTMLDivElement>(null);
  const [hostWidth, setHostWidth] = useState(900);
  const [editorExpanded, setEditorExpanded] = useState(false);
  const [saveError, setSaveError] = useState('');
  const savingRequest = useRef<Promise<Workflow> | null>(null);
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  const [buffers, setBuffers] = useState<Record<string, EditorBuffer>>(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem(`flowgram.node-editors.${workflow.projectId}.${workflow.id}`) || '{}'
      );
    } catch {
      return {};
    }
  });
  useEffect(() => {
    sessionStorage.setItem(
      `flowgram.node-editors.${workflow.projectId}.${workflow.id}`,
      JSON.stringify(buffers)
    );
  }, [buffers, workflow.id]);
  useEffect(() => {
    if (!host.current) return;
    const observer = new ResizeObserver(([entry]) => setHostWidth(entry.contentRect.width));
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [inspector, setInspector] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [renaming, setRenaming] = useState<{
    id: string;
    location: 'canvas' | 'inspector';
  } | null>(null);
  const [insertion, setInsertion] = useState<InsertionIntent>({});
  const [menu, setMenu] = useState<{
    point: { x: number; y: number };
    ids: string[];
    edge?: Edge;
    intent?: InsertionIntent;
    origin?: 'inspector';
  } | null>(null);
  const [tabRequest, setTabRequest] = useState<{
    nodeId: string;
    tab: string;
    sequence: number;
  }>();
  const clipboard = useRef<NodeClipboard | null>(null);
  const [jsonText, setJsonText] = useState('');
  const [jsonOpen, setJsonOpen] = useState(false);
  const [runOpen, setRunOpen] = useState(false);
  const [debugOrigin, setDebugOrigin] = useState<DebugOrigin | null>(null);
  const [resultsVisible, setResultsVisible] = useState(
    () => localStorage.getItem('flowgram.layout.results.visible') !== 'false'
  );
  const resultsId = useId();
  const resultsToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    localStorage.setItem('flowgram.layout.results.visible', String(resultsVisible));
  }, [resultsVisible]);
  useEffect(() => {
    const reset = () => setResultsVisible(true);
    window.addEventListener('flowgram:reset-layout', reset);
    return () => window.removeEventListener('flowgram:reset-layout', reset);
  }, []);
  useEffect(() => {
    if (
      runs.some(
        (item) => item.id === selectedRunId && item.workflowId === workflow.id && !item.testNodeId
      )
    )
      setResultsVisible(true);
  }, [selectedRunId, workflow.id, runViewRequest]);
  const [input, setInput] = useState(() =>
    JSON.stringify(defaultRunInputs(workflow.schema), null, 2)
  );
  const [run, setRun] = useState<Run | null>(null);
  const follow = useRunFollow(run, workflow.id, workflow.revision, dirty, schema);
  useEffect(() => {
    const receive = () => {
      const intent = takeDebugIntent(workflow.projectId, workflow.id);
      if (!intent) return;
      setDebugOrigin(intent.origin);
      if (intent.nodeId) {
        const nodeId = intent.nodeId;
        setInspector(nodeId);
        setSelectedIds([nodeId]);
        setBuffers((previous) => ({
          ...previous,
          [`${nodeId}:__test.inputs`]: {
            text: JSON.stringify(intent.inputs, null, 2),
            signature: '',
          },
          [`${nodeId}:__test.bindings`]: {
            text: JSON.stringify(intent.bindings || {}, null, 2),
            signature: '',
          },
        }));
        setTabRequest({ nodeId, tab: 'test', sequence: Date.now() });
      } else {
        setInput(JSON.stringify(intent.inputs, null, 2));
        setRunOpen(true);
      }
    };
    receive();
    window.addEventListener('flowgram:debug-inputs', receive);
    return () => window.removeEventListener('flowgram:debug-inputs', receive);
  }, [workflow.projectId, workflow.id]);
  const [events, setEvents] = useState<RuntimeEvent[]>([]);
  const [nodeExecutions, setNodeExecutions] = useState<Record<string, CanvasExecution>>({});
  const [traceFocus, setTraceFocus] = useState<{
    nodeId: string;
    sequence: number;
  }>();
  const [nodeStates, setNodeStates] = useState<Record<string, string>>({});
  const [validation, setValidation] = useState<string | null>(null);
  const [conflictOpen, setConflictOpen] = useState(false);
  const localRevision = useRef<number>(
    (() => {
      try {
        return (
          JSON.parse(
            sessionStorage.getItem(`flowgram.draft.${workflow.projectId}.${workflow.id}`) || 'null'
          )?.revision || workflow.revision
        );
      } catch {
        return workflow.revision;
      }
    })()
  );
  const [selectedExecutions, setSelectedExecutions] = useState<Record<string, string>>({});
  const [nodeSamples, setNodeSamples] = useState<Record<string, RunDetail>>({});
  const cachedTests = useRef(new Set<string>());
  const sampleRunIds = runs
    .filter(
      (item) => item.workflowId === workflow.id && item.testNodeId && item.status === 'succeeded'
    )
    .map((item) => item.id)
    .join(',');
  useEffect(() => {
    const controller = new AbortController();
    const latest = new Map<string, string>();
    runs
      .filter(
        (item) => item.workflowId === workflow.id && item.testNodeId && item.status === 'succeeded'
      )
      .forEach((item) => {
        if (!latest.has(item.testNodeId!)) latest.set(item.testNodeId!, item.id);
      });
    latest.forEach((runId, nodeId) => {
      if (cachedTests.current.has(runId)) return;
      api<RunDetail>(`/api/runs/${runId}`, 'GET', undefined, controller.signal)
        .then((detail) => {
          if (controller.signal.aborted) return;
          cachedTests.current.add(runId);
          setNodeSamples((current) => ({ ...current, [nodeId]: detail }));
        })
        .catch(() => {});
    });
    return () => controller.abort();
  }, [sampleRunIds, workflow.id]);
  const selectedNode = findNode(schema.nodes, inspector);
  const baseSchema = useRef(
    (() => {
      try {
        const stored = JSON.parse(
          sessionStorage.getItem(`flowgram.draft.${workflow.projectId}.${workflow.id}`) || 'null'
        );
        if (stored?.base) return stored.base as { revision: number; schema: WorkflowSchema };
      } catch {
        /* A malformed draft cannot supply a merge base. */
      }
      return { revision: workflow.revision, schema: workflow.schema };
    })()
  );
  const draft = useRef(schema);
  draft.current = schema;
  useEffect(() => {
    if (dirty && localRevision.current !== workflow.revision) {
      const invalidBufferOverlap = Object.entries(buffers).some(([key, buffer]) => {
        const nodeId = key.split(':')[0];
        return (
          buffer.invalid &&
          signature(findNode(baseSchema.current.schema.nodes, nodeId)) !==
            signature(findNode(workflow.schema.nodes, nodeId))
        );
      });
      const rebased = rebaseWorkflow(baseSchema.current.schema, draft.current, workflow.schema);
      if (
        baseSchema.current.revision !== localRevision.current ||
        invalidBufferOverlap ||
        rebased.conflicts.length
      ) {
        setValidation(t('remoteConflict'));
        return;
      }
      localRevision.current = workflow.revision;
      baseSchema.current = {
        revision: workflow.revision,
        schema: workflow.schema,
      };
      draft.current = rebased.schema;
      setSchema(rebased.schema);
      setValidation(null);
      setSaveError('');
      return;
    }
    if (dirty) return;
    localRevision.current = workflow.revision;
    baseSchema.current = {
      revision: workflow.revision,
      schema: workflow.schema,
    };
    setSchema(workflow.schema);
    setDirty(false);
  }, [workflow.id, workflow.revision]);
  useEffect(() => {
    setRun((current) => {
      const target = selectedRunId || current?.id;
      return (
        (target
          ? runs.find(
              (item) => item.id === target && item.workflowId === workflow.id && !item.testNodeId
            )
          : runs.find((item) => item.workflowId === workflow.id && !item.testNodeId)) || current
      );
    });
  }, [runs, workflow.id, selectedRunId]);
  useEffect(() => {
    if (!run) return;
    let disposed = false;
    setEvents([]);
    setNodeStates({});
    setNodeExecutions({});
    api<{
      run: Run;
      events: RuntimeEvent[];
      nodeStates?: Record<string, string>;
    }>(`/api/runs/${run.id}?workflowId=${encodeURIComponent(workflow.id)}`)
      .then((detail) => {
        if (!disposed) {
          setEvents(detail.events);
          const projection = (detail as typeof detail & Pick<TraceDetail, 'trace'>).trace;
          if (projection) setNodeExecutions(canvasExecutions({ trace: projection }, workflow.id));
          setNodeStates(
            projection
              ? Object.fromEntries(
                  projection.nodes
                    .filter((node) => node.workflowId === workflow.id)
                    .map((node) => [node.nodeId, aggregateStatus(node.counts)])
                )
              : detail.nodeStates || {}
          );
        }
      })
      .catch((e) => error(e.message));
    return () => {
      disposed = true;
    };
  }, [run?.id, run?.status]);
  function save(): Promise<Workflow> {
    if (localRevision.current !== workflow.revision) {
      setConflictOpen(true);
      return Promise.reject(new Error(tx('请先处理工作流冲突')));
    }
    if (savingRequest.current) return savingRequest.current;
    if (!dirtyRef.current)
      return Promise.resolve({
        ...workflow,
        revision: localRevision.current,
        schema: draft.current,
      });
    setSaving(true);
    setSaveError('');
    const snapshot = draft.current;
    const request = api<Workflow>(`/api/workflows/${workflow.id}`, 'PUT', {
      revision: localRevision.current,
      name: workflow.name,
      schema: snapshot,
    })
      .then((updated) => {
        localRevision.current = updated.revision;
        baseSchema.current = {
          revision: updated.revision,
          schema: updated.schema,
        };
        onSaved(updated);
        if (draft.current === snapshot) {
          dirtyRef.current = false;
          setDirty(false);
        }
        return updated;
      })
      .catch((e: Error) => {
        setSaveError(e.message);
        throw e;
      })
      .finally(() => {
        savingRequest.current = null;
        setSaving(false);
      });
    savingRequest.current = request;
    return request;
  }
  useEffect(() => {
    if (!dirty || saving || saveError || localRevision.current !== workflow.revision) return;
    const timer = setTimeout(() => {
      void save().catch(() => {});
    }, 650);
    return () => clearTimeout(timer);
  }, [schema, dirty, saving, saveError, workflow.revision]);
  async function flush() {
    let saved = {
      ...workflow,
      revision: localRevision.current,
      schema: draft.current,
    };
    for (let index = 0; index < 5 && dirtyRef.current; index++) saved = await save();
    if (dirtyRef.current) throw new Error(tx('配置仍在变更，请稍后重试'));
    return saved;
  }
  useImperativeHandle(ref, () => ({ flush }));
  async function testNode(nodeId: string, inputs: Data, bindings: Data) {
    const initial = signature(findNode(draft.current.nodes, nodeId));
    const saved = await flush();
    if (initial !== signature(findNode(draft.current.nodes, nodeId)))
      throw new Error(tx('节点配置已变更，请确认测试输入后重试'));
    const result = await api<Run>(
      `/api/workflows/${workflow.id}/nodes/${encodeURIComponent(nodeId)}/test`,
      'POST',
      {
        revision: saved.revision,
        inputs,
        bindings,
        ...(debugOrigin ? { origin: debugOrigin } : {}),
      }
    );
    onRun(result);
    return result;
  }
  useEffect(() => {
    if (dirty)
      sessionStorage.setItem(
        `flowgram.draft.${workflow.projectId}.${workflow.id}`,
        JSON.stringify({
          revision: localRevision.current,
          schema: draft.current,
          base: baseSchema.current,
        })
      );
    else sessionStorage.removeItem(`flowgram.draft.${workflow.projectId}.${workflow.id}`);
  }, [schema, dirty, workflow.id]);
  function change(next: WorkflowSchema) {
    draft.current = next;
    dirtyRef.current = true;
    setSchema(next);
    setDirty(true);
    setSaveError('');
    setValidation(null);
  }
  function canLeaveRename() {
    const input = host.current?.querySelector<HTMLInputElement>('[data-inline-rename] input');
    if (input && !input.value.trim()) {
      input.focus();
      return false;
    }
    return true;
  }
  function selectNode(id: string) {
    if (!canLeaveRename()) return;
    canvas.current?.select([id]);
    setInspector(id);
    setRenaming(null);
  }
  function renameNode(id: string, title: string) {
    const node = findNode(draft.current.nodes, id);
    if (!node || title === node.data.title) return;
    change(editControlConfiguration(draft.current, id, { ...node.data, title }));
  }
  function openPalette(intent: InsertionIntent = {}) {
    if (!canLeaveRename()) return;
    if (intent.source && !intent.edge) {
      const source = intent.source;
      const graph = scopeFor(draft.current, source.nodeId);
      const connected = graph.edges.filter(
        (edge) => edge.sourceNodeID === source.nodeId && (edge.sourcePortID || '') === source.portId
      );
      if (connected.length > 1) {
        error(tx('请选择要插入的连线'));
        return;
      }
      if (connected.length === 1) intent = { ...intent, edge: connected[0] };
    }
    setInsertion({
      ...intent,
      mode:
        intent.mode ||
        (intent.position || intent.source || intent.edge || intent.scopeId ? 'quick' : 'library'),
      position: intent.position || canvas.current?.insertionPosition(),
    });
    setMenu(null);
    setPaletteOpen(true);
  }
  async function nodeCommand(command: NodeCommand | 'paste', ids: string[]) {
    try {
      if (!canLeaveRename()) return;
      if (command === 'open' && ids.length === 1) {
        selectNode(ids[0]);
        return;
      }
      if (command === 'rename' && ids.length === 1) {
        canvas.current?.select(ids);
        setRenaming({
          id: ids[0],
          location: menu?.origin === 'inspector' ? 'inspector' : 'canvas',
        });
        return;
      }
      if (command === 'copy-id' && ids.length === 1) {
        await navigator.clipboard.writeText(ids[0]);
        return;
      }
      if (command === 'delete') {
        change(removeNodes(draft.current, ids));
        canvas.current?.select([]);
        return;
      }
      if (['copy', 'cut', 'duplicate'].includes(command)) {
        const snapshot = draft.current;
        const content = copyNodes(snapshot, ids, workflow.id);
        if (command === 'cut') {
          const reason = deletionReason(draft.current, ids);
          if (reason) throw new Error(reason);
        }
        if (command !== 'duplicate') {
          await navigator.clipboard.writeText(JSON.stringify(content));
          clipboard.current = content;
        }
        if (command === 'cut') {
          if (draft.current !== snapshot)
            throw new Error('The workflow changed while copying. Cut was canceled.');
          change(removeNodes(draft.current, ids));
          canvas.current?.select([]);
        }
        if (command === 'duplicate') {
          const result = pasteNodes(draft.current, content, { scopeId: ids[0] }, workflow.id);
          change(result.schema);
          requestAnimationFrame(() => canvas.current?.select(result.ids));
          if (inspector && result.ids.length === 1) setInspector(result.ids[0]);
        }
        return;
      }
      if (command === 'paste') {
        // Read the system clipboard first, never silently paste stale internal data.
        let content: NodeClipboard;
        try {
          content = JSON.parse(await navigator.clipboard.readText());
        } catch (cause) {
          if (!clipboard.current || cause instanceof SyntaxError)
            throw new Error('The clipboard does not contain FlowGram nodes');
          content = clipboard.current;
        }
        const result = pasteNodes(
          draft.current,
          content,
          menu?.intent || {
            position: canvas.current?.insertionPosition(),
            scopeId: ids[0],
          },
          workflow.id
        );
        change(result.schema);
        requestAnimationFrame(() => canvas.current?.select(result.ids));
      }
    } catch (cause) {
      error(errorText((cause as Error).message));
    } finally {
      if (command !== 'rename') requestAnimationFrame(() => canvas.current?.focus());
    }
  }
  useEffect(() => {
    if (inspector && !findNode(schema.nodes, inspector)) setInspector(null);
    if (renaming && !findNode(schema.nodes, renaming.id)) setRenaming(null);
  }, [schema]);
  useEffect(() => {
    const selected = runs.find(
      (item) => item.id === selectedRunId && item.workflowId === workflow.id
    );
    if (selected?.testNodeId) setInspector(selected.testNodeId);
  }, [selectedRunId, workflow.id]);
  async function validate() {
    try {
      await flush();
      const data = await api<{ valid: boolean; errors: string[] }>(
        `/api/workflows/${workflow.id}/validate`,
        'POST',
        {}
      );
      setValidation(data.valid ? t('valid') : data.errors.map(errorText).join('；'));
    } catch (e) {
      error((e as Error).message);
    }
  }
  async function execute() {
    try {
      const inputs: unknown = JSON.parse(input);
      if (inputs && typeof inputs === 'object' && !Array.isArray(inputs)) {
        const fields =
          (
            schema.nodes.find((node) => node.type === 'start')?.data.outputs as {
              properties?: Record<string, { type?: string }>;
            }
          )?.properties || {};
        for (const [key, property] of Object.entries(fields)) {
          const record = inputs as Record<string, unknown>;
          if (
            ['object', 'array'].includes(property.type || '') &&
            typeof record[key] === 'string'
          ) {
            try {
              record[key] = JSON.parse(record[key] as string);
            } catch {
              throw new Error(
                tx('{0} 需要有效的 JSON {1}', [
                  key,
                  property.type === 'array' ? tx('列表') : tx('对象'),
                ])
              );
            }
          }
          if (property.type === 'array' && !Array.isArray(record[key]))
            throw new Error(tx('{0} 需要列表输入', [key]));
        }
      }
      await flush();
      const result = await api<Run>(`/api/workflows/${workflow.id}/run`, 'POST', {
        inputs,
        ...(debugOrigin ? { origin: debugOrigin } : {}),
      });
      setRun(result);
      follow.start(result.id);
      setResultsVisible(true);
      onRun(result);
      setRunOpen(false);
    } catch (e) {
      error((e as Error).message);
    }
  }
  const statuses = useMemo(() => {
    const result: Record<string, string> = {};
    if (dirty || run?.revision !== workflow.revision) return result;
    for (const event of events) {
      const data = JSON.parse(event.data);
      if (event.kind.startsWith('node_'))
        result[data.nodeId] =
          event.kind === 'node_finished'
            ? 'succeeded'
            : event.kind === 'node_failed'
            ? 'failed'
            : event.kind === 'node_started'
            ? 'running'
            : event.kind === 'node_waiting'
            ? 'waiting'
            : event.kind === 'node_canceled'
            ? 'canceled'
            : 'skipped';
    }
    for (const [id, kind] of Object.entries(nodeStates)) {
      result[id] =
        (
          {
            node_finished: 'succeeded',
            node_failed: 'failed',
            node_started: 'running',
            node_waiting: 'waiting',
            node_canceled: 'canceled',
            node_skipped: 'skipped',
          } as Record<string, string>
        )[kind] || kind;
    }
    return result;
  }, [events, nodeStates, dirty, run?.revision, workflow.revision]);
  function addNode(kind: string, ports: { input?: string; output?: string } = {}) {
    try {
      const result = insertNode(draft.current, kind, insertion, ports);
      change(result.schema);
      setPaletteOpen(false);
      setInspector(result.id);
      requestAnimationFrame(() => {
        canvas.current?.select([result.id]);
        canvas.current?.focus();
      });
    } catch (cause) {
      error(errorText((cause as Error).message));
    }
  }
  const multiple = selectedIds.length > 1;
  const menuCommands: MenuCommand[] = menu
    ? (() => {
        if (menu.edge)
          return [
            { id: 'insert', label: tx('在连线中插入节点') },
            { id: 'delete-edge', label: tx('删除连线'), danger: true },
          ];
        if (!menu.ids.length)
          return [
            { id: 'add', label: tx('添加节点'), shortcut: 'N' },
            { id: 'paste', label: tx('粘贴'), shortcut: '⌘/Ctrl V' },
            { id: 'fit', label: tx('适应画布') },
          ];
        const single = menu.ids.length === 1;
        const node = findNode(schema.nodes, menu.ids[0]);
        let copyReason: string | undefined;
        try {
          copyNodes(schema, menu.ids);
        } catch (cause) {
          copyReason = errorText((cause as Error).message);
        }
        const reason = deletionReason(schema, menu.ids);
        return [
          ...(single
            ? [
                { id: 'open', label: tx('打开节点配置'), shortcut: 'Enter' },
                { id: 'rename', label: tx('重命名'), shortcut: 'F2' },
                ...(node && isLoop(node.type)
                  ? [{ id: 'add-inside', label: tx('添加到循环内部') }]
                  : []),
              ]
            : []),
          {
            id: 'copy',
            label: tx('复制'),
            shortcut: '⌘/Ctrl C',
            disabled: copyReason,
          },
          {
            id: 'cut',
            label: tx('剪切'),
            shortcut: '⌘/Ctrl X',
            disabled: copyReason || (reason ? errorText(reason) : undefined),
          },
          {
            id: 'duplicate',
            label: tx('创建副本'),
            shortcut: '⌘/Ctrl D',
            disabled: copyReason,
          },
          ...(single ? [{ id: 'copy-id', label: tx('复制节点 ID') }] : []),
          {
            id: 'delete',
            label: tx('删除'),
            shortcut: '⌫',
            danger: true,
            disabled: reason ? errorText(reason) : undefined,
          },
        ];
      })()
    : [];
  function menuCommand(command: string) {
    if (!menu) return;
    if (command === 'add' || command === 'insert') {
      openPalette({
        ...menu.intent,
        anchor: menu.point,
        ...(menu.edge ? { edge: menu.edge } : {}),
      });
      return;
    }
    if (command === 'add-inside') {
      const node = findNode(schema.nodes, menu.ids[0]);
      if (node?.blocks?.[0])
        openPalette({
          scopeId: node.blocks[0].id,
          position: { x: 220, y: 140 },
        });
      return;
    }
    if (command === 'delete-edge' && menu.edge) {
      change(
        mapScope(draft.current, menu.edge.sourceNodeID, (graph) => ({
          ...graph,
          edges: graph.edges.filter((edge) => !sameEdge(edge, menu.edge!)),
        }))
      );
      return;
    }
    if (command === 'fit') {
      canvas.current?.fit();
      return;
    }
    void nodeCommand(command as NodeCommand | 'paste', menu.ids);
  }

  return (
    <section
      className="workflow-editor-surface flex h-full min-h-0 min-w-0 flex-1 flex-col bg-background"
      aria-label={t('canvas')}
    >
      <WorkspaceHeader
        leading={headerLeading}
        title={
          <div className="flex min-w-0 items-center gap-3">
            {documentTabs || <span className="truncate">{workflow.name}</span>}
            <span
              className="shrink-0 text-[11px] font-normal text-muted-foreground"
              role="status"
              title={`v${workflow.revision}`}
            >
              {saveError
                ? tx('保存失败')
                : saving
                ? t('saving')
                : dirty
                ? t('unsaved')
                : t('saved')}
            </span>
          </div>
        }
      >
        <MenuButton
          label={tx('工作流更多操作')}
          commands={[
            { id: 'json', label: t('schema') },
            { id: 'copy', label: tx('复制工作流名称') },
            { id: 'archive', label: tx('归档工作流') },
          ]}
          onCommand={(command) => {
            if (command === 'archive') onArchive();
            else if (command === 'json') {
              setInspector(null);
              setJsonText(JSON.stringify(schema, null, 2));
              setJsonOpen(true);
            } else
              void navigator.clipboard
                .writeText(workflow.name)
                .catch((cause) => error(cause.message));
          }}
        >
          <MoreHorizontal />
        </MenuButton>
        {onCollapse ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCollapse}
            aria-label={tx('收起工作台')}
            title={tx('收起工作台')}
          >
            <PanelRightClose />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label={tx('关闭工作流')}
            title={tx('关闭工作流')}
          >
            <X />
          </Button>
        )}
      </WorkspaceHeader>
      <div className="workflow-toolbar flex min-h-12 shrink-0 flex-wrap items-center justify-end gap-2 px-4 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            aria-label={tx('让助手修改')}
            title={tx('让助手修改')}
            onClick={onAssist}
          >
            <MessageCircle />
            <span className="workflow-toolbar-label">{tx('让助手修改')}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            aria-label={t('save')}
            title={saving ? t('saving') : t('save')}
            disabled={!dirty || saving}
            onClick={() => save().catch((e) => error(e.message))}
          >
            <Save />
            <span className="workflow-toolbar-label">{saving ? t('saving') : t('save')}</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={saving}
            onClick={() =>
              void save()
                .then(onPublish)
                .catch((cause) => error(cause.message))
            }
          >
            <Send />
            <span className="workflow-toolbar-label">{tx('发布')}</span>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setInput((current) => withRunDefaults(schema, current));
              setRunOpen(true);
            }}
          >
            <Play />
            {t('run')}
          </Button>
        </div>
      </div>
      {(validation || localRevision.current !== workflow.revision) && (
        <div role="status" className="border-y border-border bg-secondary/50 px-4 py-2 text-xs">
          {(validation || t('remoteConflict'))
            .split('；')
            .map((message) => errorText(message))
            .join(' · ')}
          {localRevision.current !== workflow.revision && (
            <Button
              size="sm"
              variant="outline"
              className="ml-3"
              onClick={() => setConflictOpen(true)}
            >
              {tx('比较并合并')}
            </Button>
          )}
        </div>
      )}
      {conflictOpen && (
        <WorkflowConflictReview
          key={workflow.revision}
          base={
            baseSchema.current.revision === localRevision.current
              ? baseSchema.current.schema
              : undefined
          }
          local={schema}
          remote={workflow.schema}
          revision={workflow.revision}
          blocked={Object.values(buffers).some((buffer) => buffer.invalid)}
          onClose={() => setConflictOpen(false)}
          onApply={(merged) => {
            sessionStorage.setItem(
              `flowgram.backup.${workflow.projectId}.${workflow.id}`,
              JSON.stringify({
                local: draft.current,
                remote: workflow.schema,
                base: baseSchema.current,
                buffers,
              })
            );
            localRevision.current = workflow.revision;
            baseSchema.current = { revision: workflow.revision, schema: workflow.schema };
            draft.current = merged;
            dirtyRef.current = true;
            setSchema(merged);
            setDirty(true);
            setValidation(null);
            setSaveError('');
            setConflictOpen(false);
          }}
        />
      )}
      <div ref={host} className="nf-expanded-host relative flex min-h-[220px] min-w-0 flex-1">
        <div
          inert={
            paletteOpen || (inspector && (editorExpanded || hostWidth < 600)) ? true : undefined
          }
          className="workflow-canvas-region relative min-w-0 flex-1 bg-[var(--surface-canvas)]"
        >
          <Suspense fallback={<p className="p-4 text-xs text-muted-foreground">{t('loading')}</p>}>
            <WorkflowCanvas
              ref={canvas}
              followNodeId={follow.nodeId}
              followRequest={follow.request}
              onManualNavigate={follow.pause}
              statuses={statuses}
              executions={nodeExecutions}
              workflowNames={Object.fromEntries(
                workflows
                  .filter((item) => item.projectId === workflow.projectId)
                  .map((item) => [item.id, item.name])
              )}
              onInspectExecution={(nodeId) => {
                if (run) {
                  setResultsVisible(true);
                  setTraceFocus({ nodeId, sequence: Date.now() });
                }
              }}
              toolbarLeading={
                <Button
                  size="sm"
                  variant="ghost"
                  aria-label={t('addNode')}
                  title={t('addNode')}
                  onClick={() => openPalette()}
                >
                  <Plus />
                  <span className="workflow-canvas-tool-label">{t('addNode')}</span>
                </Button>
              }
              toolbarTrailing={
                <>
                  {follow.available && (
                    <Button
                      data-run-follow-control
                      variant="ghost"
                      size="icon"
                      aria-pressed={!follow.paused}
                      aria-label={tx(follow.paused ? '继续跟随运行' : '暂停跟随运行')}
                      title={tx(follow.paused ? '继续跟随运行' : '暂停跟随运行')}
                      onClick={follow.toggle}
                    >
                      <Focus />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={t('validate')}
                    title={t('validate')}
                    onClick={validate}
                  >
                    <Check />
                    <span className="workflow-canvas-tool-label">{t('validate')}</span>
                  </Button>
                  <Button
                    data-preserve-run-follow
                    ref={resultsToggle}
                    size="sm"
                    variant="ghost"
                    aria-label={resultsVisible ? tx('隐藏运行结果') : tx('显示运行结果')}
                    title={resultsVisible ? tx('隐藏运行结果') : tx('显示运行结果')}
                    aria-expanded={resultsVisible}
                    aria-controls={resultsId}
                    className={resultsVisible ? 'bg-secondary' : undefined}
                    onClick={() => setResultsVisible((visible) => !visible)}
                  >
                    <PanelBottom />
                    <span className="workflow-canvas-tool-label">{tx('运行结果')}</span>
                  </Button>
                </>
              }
              schema={schema}
              onChange={change}
              onOpen={selectNode}
              onNodeClick={(id) => {
                if (inspector && canLeaveRename()) {
                  setInspector(id);
                  setRenaming(null);
                }
              }}
              onSelectionChange={setSelectedIds}
              onEscape={() => {
                if (!inspector) return false;
                setInspector(null);
                setEditorExpanded(false);
                return true;
              }}
              onConnectionError={(message) => error(errorText(message))}
              onDeleteConnections={(edges) =>
                change(
                  edges.reduce(
                    (graph, edge) =>
                      mapScope(graph, edge.sourceNodeID, (scope) => ({
                        ...scope,
                        edges: scope.edges.filter((item) => !sameEdge(item, edge)),
                      })),
                    draft.current
                  )
                )
              }
              onMenu={(point, ids, edge, intent) => setMenu({ point, ids, edge, intent })}
              onAdd={openPalette}
              onCommand={(command, ids) => {
                void nodeCommand(command, ids);
              }}
              renameId={renaming?.location === 'canvas' ? renaming.id : null}
              onRename={renameNode}
              onEndRename={() => {
                setRenaming(null);
                canvas.current?.focus();
              }}
            />
          </Suspense>
        </div>
        <ResizablePanel
          hidden={!selectedNode}
          unmountOnExit
          storageKey="flowgram.layout.inspector"
          label={tx('节点配置宽度')}
          initial={400}
          min={320}
          max={520}
          reserve={240}
          edge="left"
          fill={editorExpanded || hostWidth < 600}
          className={`workflow-node-panel ${
            editorExpanded || hostWidth < 600 ? 'nf-inspector-expanded' : ''
          }`}
        >
          {selectedNode && (
            <div className="workflow-node-panel-surface">
              {multiple && (
                <div className="workflow-selection-summary">
                  <strong>{tx('已选中 {0} 个节点', [selectedIds.length])}</strong>
                  <p>{tx('批量操作会保留控制流配对与循环结构。')}</p>
                  {(['copy', 'duplicate', 'delete'] as const).map((command) => (
                    <Button
                      key={command}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        void nodeCommand(command, selectedIds);
                      }}
                      disabled={command === 'delete' && !!deletionReason(schema, selectedIds)}
                    >
                      {tx(
                        command === 'copy' ? '复制' : command === 'duplicate' ? '创建副本' : '删除'
                      )}
                    </Button>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => setInspector(null)}>
                    {tx('关闭节点配置')}
                  </Button>
                </div>
              )}
              <div
                inert={paletteOpen ? true : undefined}
                style={{ display: multiple ? 'none' : 'contents' }}
              >
                <FormSessionProvider
                  value={{
                    node: selectedNode,
                    schema,
                    workflows: workflows.filter(
                      (w) => w.projectId === workflow.projectId && w.id !== workflow.id
                    ),
                    model,
                    bindings: {
                      ...(run?.revision === workflow.revision && !dirty
                        ? sampleBindings(events, selectedExecutions[selectedNode.id])
                        : {}),
                      ...Object.fromEntries(
                        Object.entries(nodeSamples)
                          .filter(([id, detail]) => {
                            const current = findNode(schema.nodes, id);
                            return (
                              current &&
                              detail.nodeTest &&
                              executionSignature(current) ===
                                executionSignature(detail.nodeTest.node)
                            );
                          })
                          .map(([id, detail]) => [id, detail.run.outputs])
                      ),
                    },
                    buffers,
                    setBuffer: (key, value) =>
                      setBuffers((current) => ({ ...current, [key]: value })),
                    openSettings: onOpenSettings,
                  }}
                >
                  <NodeInspector
                    renaming={renaming?.id === selectedNode.id && renaming.location === 'inspector'}
                    onRenameStart={() =>
                      setRenaming({
                        id: selectedNode.id,
                        location: 'inspector',
                      })
                    }
                    onRename={(title) => renameNode(selectedNode.id, title)}
                    onRenameEnd={() => setRenaming(null)}
                    onMenu={(point) =>
                      setMenu({
                        point,
                        ids: [selectedNode.id],
                        origin: 'inspector',
                      })
                    }
                    tabRequest={tabRequest}
                    expanded={editorExpanded || hostWidth < 600}
                    onExpand={() => {
                      if (hostWidth < 600) setInspector(null);
                      else setEditorExpanded((value) => !value);
                    }}
                    onClose={() => {
                      if (!canLeaveRename()) return;
                      setInspector(null);
                      setEditorExpanded(false);
                    }}
                    executions={events.filter(
                      (event) =>
                        event.kind === 'node_finished' &&
                        eventData(event).nodeId === selectedNode.id
                    )}
                    selectedExecutionId={selectedExecutions[selectedNode.id]}
                    onSelectExecution={(id) =>
                      setSelectedExecutions((current) => ({
                        ...current,
                        [selectedNode.id]: id,
                      }))
                    }
                    onEdit={(data) =>
                      change(editControlConfiguration(draft.current, selectedNode.id, data))
                    }
                    onTest={testNode}
                    onInspectRun={onInspectRun}
                    workflowRunId={run?.id}
                    runs={runs.filter((item) => item.workflowId === workflow.id)}
                    selectedTestId={
                      runs.find((item) => item.id === selectedRunId)?.testNodeId === selectedNode.id
                        ? selectedRunId || undefined
                        : undefined
                    }
                    saveStatus={
                      saveError
                        ? tx('保存失败 · 点击重试')
                        : saving
                        ? tx('正在保存')
                        : dirty
                        ? tx('等待保存')
                        : tx('草稿已保存')
                    }
                    onSave={() => {
                      void save().catch((e) => error(e.message));
                    }}
                    onSelectNode={selectNode}
                    navigation={flattenNodes(schema.nodes)}
                  />
                </FormSessionProvider>
              </div>
            </div>
          )}
        </ResizablePanel>
        <NodePalette
          open={paletteOpen}
          close={() => {
            setPaletteOpen(false);
            canvas.current?.focus();
          }}
          add={addNode}
          intent={insertion}
          insideLoop={
            !!(insertion.scopeId || insertion.source?.nodeId || insertion.edge?.sourceNodeID) &&
            !schema.nodes.some(
              (node) =>
                node.id ===
                (insertion.scopeId || insertion.source?.nodeId || insertion.edge?.sourceNodeID)
            )
          }
        />
        {menu && (
          <CommandMenu
            point={menu.point}
            commands={menuCommands}
            label={tx('节点更多操作')}
            onCommand={menuCommand}
            onClose={(restore) => {
              setMenu(null);
              if (restore) canvas.current?.focus();
            }}
          />
        )}
      </div>
      <ResizablePanel
        storageKey="flowgram.layout.results"
        label={tx('执行结果高度')}
        initial={180}
        min={92}
        max={420}
        axis="vertical"
        edge="left"
        reserve={280}
        hidden={!resultsVisible}
        className="border-t border-border bg-background"
      >
        <div
          id={resultsId}
          role="region"
          aria-label={tx('运行结果')}
          className="min-h-0 flex-1 overflow-hidden"
        >
          {!run && (
            <>
              <div className="flex items-center justify-between px-4 py-3 text-xs">
                <span className="font-medium">{t('output')}</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={tx('隐藏运行结果')}
                    onClick={() => {
                      setResultsVisible(false);
                      resultsToggle.current?.focus();
                    }}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            </>
          )}
          {run ? (
            <div className="h-full min-h-0">
              <RunInspector
                id={run.id}
                compact
                focusRequest={traceFocus}
                onProjection={(detail) => {
                  setNodeExecutions(canvasExecutions(detail, workflow.id));
                  setNodeStates(
                    Object.fromEntries(
                      detail.trace.nodes
                        .filter((node) => node.workflowId === workflow.id)
                        .map((node) => [node.nodeId, aggregateStatus(node.counts)])
                    )
                  );
                }}
                onSelectExecution={(entry) => {
                  if (
                    entry.workflowId === workflow.id &&
                    run.revision === workflow.revision &&
                    !dirty
                  ) {
                    follow.pause();
                    canvas.current?.select([entry.nodeId]);
                    canvas.current?.reveal(entry.nodeId);
                  }
                }}
                onExpand={() => onInspectRun(run.id)}
                onHide={() => {
                  setResultsVisible(false);
                  resultsToggle.current?.focus();
                }}
              />
            </div>
          ) : (
            <p className="px-4 pb-5 text-xs text-muted-foreground">{t('runEmpty')}</p>
          )}
        </div>
      </ResizablePanel>
      <Dialog open={jsonOpen} onOpenChange={setJsonOpen} title={t('schema')}>
        <textarea
          aria-label={t('schema')}
          className="h-80 w-full rounded-lg border border-input p-3 font-mono text-xs"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => {
              try {
                const next = JSON.parse(jsonText) as WorkflowSchema;
                if (!Array.isArray(next.nodes) || !Array.isArray(next.edges))
                  throw new Error(tx('JSON 必须包含 nodes 和 edges'));
                change(next);

                setJsonOpen(false);
              } catch (e) {
                error((e as Error).message);
              }
            }}
          >
            {t('apply')}
          </Button>
        </div>
      </Dialog>
      <Dialog open={runOpen} onOpenChange={setRunOpen} title={t('run')}>
        {debugOrigin && (
          <p className="mb-4 text-xs text-muted-foreground">
            {tx('输入来自历史运行 {0}，请确认配置与输入后运行。', [debugOrigin.runId.slice(0, 8)])}
          </p>
        )}
        <RunInputForm schema={schema} value={input} onChange={setInput} />
        <details className="mt-5 text-xs text-muted-foreground">
          <summary>{tx('高级输入 JSON')}</summary>
          <textarea
            id="run-input"
            aria-label={t('input')}
            className="mt-3 h-40 w-full rounded-lg border border-input p-3 font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </details>
        <div className="mt-4 flex justify-end">
          <Button onClick={execute}>
            <Play />
            {t('run')}
          </Button>
        </div>
      </Dialog>
    </section>
  );
}
