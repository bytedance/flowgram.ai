/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import {
  ArrowLeft,
  ArrowUpRight,
  Columns2,
  ListTree,
  MoreHorizontal,
  FlaskConical,
  Loader2,
  PanelRightClose,
  Square,
  X,
} from 'lucide-react';

import { WorkspaceHeader } from '../workspace-header';
import { Select } from '../ui/select';
import { MenuButton } from '../ui/menu-button';
import { Button } from '../ui/button';
import { ResizablePanel } from '../resizable-panel';
import { flattenNodes } from '../node-inspector/model';
import type { Session, Workflow } from '../../lib/types';
import {
  aggregateStatus,
  duration,
  executionPath,
  sourceLabel,
  statusLabel,
  type Execution,
  type TraceDetail,
} from '../../lib/run-trace';
import { canvasExecutions, scopedCanvasExecutions } from '../../lib/node-execution';
import { nodeSpec } from '../../lib/node-catalog';
import { errorText, tx } from '../../lib/i18n';
import { scopeFor } from '../../lib/control-nodes';
import { useRunInspection } from './use-run-inspection';
import { TraceCanvas } from './trace-canvas';
import type { RunRef } from './run-comparison';
import { ExecutionTree, StatusIcon } from './execution-tree';
import { ExecutionDetail } from './execution-detail';
import './trace.css';

const RunComparison = lazy(() =>
  import('./run-comparison').then((module) => ({ default: module.RunComparison }))
);
const ComparePicker = lazy(() =>
  import('./compare-picker').then((module) => ({ default: module.ComparePicker }))
);
const DebugDialog = lazy(() =>
  import('./debug-dialog').then((module) => ({ default: module.DebugDialog }))
);

export interface RunInspectorProps {
  id: string;
  workflows?: Workflow[];
  sessions?: Session[];
  onWorkflow?: (id: string) => void;
  onSession?: (id: string) => void;
  headerLeading?: ReactNode;
  documentTabs?: ReactNode;
  onClose?: () => void;
  onCollapse?: () => void;
  onExpand?: () => void;
  onHide?: () => void;
  focusRequest?: { nodeId: string; sequence: number };
  onProjection?: (detail: TraceDetail) => void;
  onSelectExecution?: (entry: Execution) => void;
  requestRoot?: string;
  onDebugPrepared?: (workflow: Workflow) => void | Promise<void>;
  compact?: boolean;
}
export function RunInspector({
  id,
  workflows = [],
  sessions = [],
  onWorkflow,
  onSession,
  headerLeading,
  documentTabs,
  onClose,
  onCollapse,
  onExpand,
  onHide,
  onProjection,
  focusRequest,
  onSelectExecution,
  requestRoot,
  onDebugPrepared,
  compact = false,
}: RunInspectorProps) {
  const [at, setAt] = useState<number>();
  const [position, setPosition] = useState<number>();
  useEffect(() => {
    const timer = setTimeout(() => setAt(position), 120);
    return () => clearTimeout(timer);
  }, [position]);
  const inspection = useRunInspection(id, at);
  const { detail, selected, snapshot } = inspection;
  const projectionCallback = useRef(onProjection);
  projectionCallback.current = onProjection;
  useEffect(() => {
    if (detail) projectionCallback.current?.(detail);
  }, [detail]);
  const requestedFocus = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (detail && focusRequest && requestedFocus.current !== focusRequest.sequence) {
      requestedFocus.current = focusRequest.sequence;
      void inspection.selectNode(focusRequest.nodeId);
    }
  }, [!!detail, focusRequest?.sequence]);
  const [view, setView] = useState('canvas');
  const [treeVisible, setTreeVisible] = useState(true);
  const [inspectorVisible, setInspectorVisible] = useState(true);
  const [width, setWidth] = useState(1200);
  const container = useRef<HTMLDivElement>(null);
  const [visited, setVisited] = useState<Record<string, Workflow>>({});
  const [actionError, setActionError] = useState('');
  const [debug, setDebug] = useState<'run' | 'node' | null>(null);
  const [comparePicker, setComparePicker] = useState(false);
  const [comparison, setComparison] = useState<RunRef | null>(null);
  const [stopping, setStopping] = useState(false);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    setVisited({});
    setPosition(undefined);
    setAt(undefined);
  }, [id]);
  useEffect(() => {
    if (snapshot)
      setVisited((previous) =>
        previous[snapshot.id] ? previous : { ...previous, [snapshot.id]: snapshot }
      );
  }, [snapshot]);
  const nodes = useMemo(() => (snapshot ? flattenNodes(snapshot.schema.nodes) : []), [snapshot]);
  const names = useMemo(
    () =>
      Object.fromEntries(
        nodes.map((node) => [node.id, String(node.data.title || nodeSpec(node.type).title)])
      ),
    [nodes]
  );
  const allEntries = Object.values(inspection.pages).flatMap((page) => page.executions);
  const executionName = (entry: Execution) =>
    entry.name ||
    (entry.workflowId === snapshot?.id ? names[entry.nodeId] : undefined) ||
    entry.nodeId;
  const selectedNode = nodes.find((node) => node.id === (inspection.nodeId || selected?.nodeId));
  const nodeStatuses = useMemo(() => {
    const statuses: Record<string, string> = {};
    if (detail && snapshot)
      for (const node of flattenNodes(snapshot.schema.nodes))
        statuses[node.id] = detail.nodeTest ? 'untested' : 'pending';
    for (const node of detail?.trace.nodes || [])
      if (node.workflowId === snapshot?.id) statuses[node.nodeId] = aggregateStatus(node.counts);
    if (
      selected &&
      snapshot &&
      (selected.iterationPath.length || selected.workflowId !== detail?.run.workflowId)
    ) {
      for (const node of scopeFor(snapshot.schema, selected.nodeId).nodes)
        statuses[node.id] = 'pending';
      for (const entry of inspection.scopeEntries)
        if (entry.scopeId === selected.scopeId) statuses[entry.nodeId] = entry.status;
    }
    return statuses;
  }, [detail?.trace.nodes, snapshot, detail?.nodeTest, selected?.scopeId, inspection.scopeEntries]);
  const nodeExecutions = useMemo(() => {
    if (!detail || !snapshot) return {};
    const entries = canvasExecutions(detail, snapshot.id);
    if (
      selected &&
      (selected.iterationPath.length || selected.workflowId !== detail.run.workflowId)
    ) {
      for (const node of scopeFor(snapshot.schema, selected.nodeId).nodes) delete entries[node.id];
      Object.assign(
        entries,
        scopedCanvasExecutions(
          inspection.scopeEntries.filter((entry) => entry.scopeId === selected.scopeId),
          snapshot.id
        )
      );
    }
    return entries;
  }, [detail, snapshot, selected?.scopeId, inspection.scopeEntries]);
  const referenceNames = useMemo(
    () =>
      Object.fromEntries(
        (detail?.manifest?.workflows || []).map((item) => [item.workflowId, item.name])
      ),
    [detail?.manifest]
  );
  const edgeStates = useMemo(() => {
    const states: Record<string, string> = {};
    if (!snapshot) return states;
    function visit(schema: Workflow['schema']) {
      for (const edge of schema.edges) {
        const scoped =
          !!selected?.iterationPath.length &&
          scopeFor(snapshot!.schema, selected.nodeId).nodes.some(
            (node) => node.id === edge.targetNodeID
          );
        states[`${edge.sourceNodeID}:${edge.sourcePortID || ''}:${edge.targetNodeID}`] = (
          detail?.trace.links || []
        ).some(
          (link) =>
            link.workflowId === snapshot!.id &&
            (!scoped || link.scopeId === selected!.scopeId) &&
            link.sourceNodeId === edge.sourceNodeID &&
            link.targetNodeId === edge.targetNodeID &&
            (!link.sourcePortId || link.sourcePortId === edge.sourcePortID)
        )
          ? 'active'
          : 'muted';
      }
      for (const node of schema.nodes)
        if (node.blocks) visit({ nodes: node.blocks, edges: node.edges || [] });
    }
    visit(snapshot.schema);
    return states;
  }, [snapshot, detail?.trace.links, selected?.scopeId]);
  // Nested invocations are separate rows even when they share a definition node.
  function select(entry: Execution | null) {
    inspection.select(entry);
    if (entry) onSelectExecution?.(entry);
    setInspectorVisible(true);
    if (width < 950 && !compact) setTreeVisible(false);
  }
  function selectNode(node: string) {
    void inspection.selectNode(node);
    setInspectorVisible(true);
    if (width < 950 && !compact) setTreeVisible(false);
  }
  const title = detail?.snapshot?.name || tx('运行详情');
  const runStatus = detail?.run.status || 'running';
  const origin = Date.parse(detail?.run.createdAt || '') || 0;
  const span = Math.max(
    1,
    detail?.trace.durationMs ||
      Date.parse(detail?.trace.endedAt || detail?.trace.observedAt || detail?.run.createdAt || '') -
        origin
  );
  const tree = (
    <ExecutionTree
      pages={inspection.pages}
      expanded={inspection.expanded}
      selected={selected?.id || null}
      onSelect={select}
      onToggle={(entry) => void inspection.toggle(entry)}
      onPage={(parent, cursor) =>
        void inspection.loadPage(parent, cursor).catch((cause) => setActionError(cause.message))
      }
      name={executionName}
      runSelected={!selected && !inspection.nodeId}
      onRun={() => select(null)}
      origin={origin}
      span={span}
    />
  );
  const instancePicker = inspection.instances && inspection.instances.total !== 1 && (
    <div className={compact ? 'border-b border-border px-3 py-1' : 'border-b border-border p-3'}>
      <Select
        aria-label={tx('选择执行实例')}
        value={selected?.id || ''}
        placeholder={tx('选择执行实例')}
        options={[
          { value: '', label: tx('选择执行实例') },
          ...inspection.instances.executions.map((entry) => ({
            value: entry.id,
            label: `${executionPath(entry) || tx('工作流主路径')} · ${statusLabel(
              entry.status
            )} · ${duration(entry.durationMs)} · ${entry.id.slice(0, 6)}`,
          })),
        ]}
        onValueChange={(value) => {
          const entry = inspection.instances?.executions.find((entry) => entry.id === value);
          if (entry) inspection.selectInstance(entry);
        }}
      />
      {inspection.instances.nextCursor != null && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() =>
            void inspection.selectNode(inspection.nodeId!, inspection.instances!.nextCursor!)
          }
        >
          {tx('加载更多')}
        </Button>
      )}
    </div>
  );
  const inspect = detail ? (
    <div className="flex h-full min-h-0 flex-col">
      {instancePicker}
      <div className="min-h-0 flex-1">
        <ExecutionDetail
          detail={detail}
          entry={selected}
          node={selectedNode}
          events={inspection.events}
          loading={inspection.selectionLoading}
          error={inspection.eventError || inspection.instanceError}
          name={
            selected
              ? executionName(selected)
              : selectedNode
              ? names[selectedNode.id]
              : tx('运行概览')
          }
          compact={compact}
          onSource={selectNode}
          onNodeTest={
            onDebugPrepared &&
            selected?.kind === 'node' &&
            selectedNode &&
            ![
              'control.join',
              'control.merge-branches',
              'control.break',
              'control.continue',
            ].includes(selectedNode.type)
              ? () => setDebug('node')
              : undefined
          }
          onDependency={
            selectedNode?.type === 'subworkflow' && selected
              ? () =>
                  void inspection
                    .loadPage(selected.id)
                    .then((page) => {
                      const entry = page?.executions.find(
                        (entry) => entry.workflowId !== selected.workflowId
                      );
                      if (entry) select(entry);
                      else setActionError(tx('此调用没有可用的子工作流执行记录'));
                    })
                    .catch((cause) => setActionError(cause.message))
              : undefined
          }
        />
      </div>
    </div>
  ) : null;
  return (
    <section
      ref={container}
      className={`trace-inspector ${compact ? 'trace-compact' : ''}`}
      aria-label={tx('运行详情')}
    >
      <div
        className="flex h-full min-h-0 flex-1 flex-col"
        inert={!!comparison}
        aria-hidden={!!comparison}
        style={{ visibility: comparison ? 'hidden' : 'visible' }}
      >
        {!compact && (
          <WorkspaceHeader leading={headerLeading} title={documentTabs || title}>
            {(onCollapse || onClose) && (
              <Button
                variant="ghost"
                size="icon"
                aria-label={onCollapse ? tx('收起工作台') : tx('关闭运行详情')}
                onClick={onCollapse || onClose}
              >
                {onCollapse ? <PanelRightClose /> : <X />}
              </Button>
            )}
          </WorkspaceHeader>
        )}
        {!detail ? (
          <div className="p-5 text-xs text-muted-foreground">
            {inspection.error ? (
              <p role="alert" className="text-destructive">
                {errorText(inspection.error)}
              </p>
            ) : (
              <>
                <Loader2 size={14} className="mr-2 inline animate-spin" />
                {tx('加载运行记录…')}
              </>
            )}
          </div>
        ) : (
          <>
            <div
              className="trace-summary"
              role="group"
              aria-label={`${tx('运行状态')} · ${statusLabel(runStatus)}`}
            >
              <Button
                variant="ghost"
                size="icon"
                title={tx('执行过程')}
                aria-label={tx('执行过程')}
                aria-pressed={treeVisible}
                onClick={() => setTreeVisible(!treeVisible)}
              >
                <ListTree />
              </Button>
              <StatusIcon status={runStatus} />
              {width >= 480 && (
                <span className="shrink-0 text-xs" title={sourceLabel(detail.trace.source)}>
                  {statusLabel(runStatus)}
                </span>
              )}
              {width >= 1150 && (
                <span className="text-[10px] text-muted-foreground">
                  {sourceLabel(detail.trace.source)}
                </span>
              )}
              {width >= 560 && (
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {duration(detail.trace.durationMs)}
                </span>
              )}
              {width >= 1000 && (
                <span className="truncate text-[10px] text-muted-foreground" title={id}>
                  {detail.trace.publication
                    ? `${detail.trace.publication.environment} · ${detail.trace.publication.version}`
                    : `v${detail.run.revision}`}{' '}
                  · {id.slice(0, 8)}
                </span>
              )}
              <span className="ml-auto" />
              {!compact && width < 650 && (
                <Select
                  className="!w-28"
                  variant="ghost"
                  value={view}
                  onValueChange={setView}
                  aria-label={tx('运行视图')}
                  options={[
                    { value: 'canvas', label: tx('当时画布') },
                    { value: 'timeline', label: tx('时间线') },
                  ]}
                />
              )}
              {!compact && width >= 650 && (
                <div className="trace-tabs !border-0" role="tablist" aria-label={tx('运行视图')}>
                  {[
                    ['canvas', '当时画布'],
                    ['timeline', '时间线'],
                  ].map(([key, label]) => (
                    <button
                      type="button"
                      role="tab"
                      key={key}
                      aria-selected={view === key}
                      onClick={() => setView(key)}
                    >
                      {tx(label)}
                    </button>
                  ))}
                </div>
              )}
              {!compact && (
                <MenuButton
                  label={tx('运行更多操作')}
                  commands={[
                    ...(onWorkflow &&
                    workflows.some((workflow) => workflow.id === detail.run.workflowId)
                      ? [{ id: 'current', label: tx('打开当前工作流') }]
                      : []),
                    { id: 'compare', label: tx('比较运行') },
                    ...(detail.trace.origin ? [{ id: 'origin', label: tx('与原运行比较') }] : []),
                  ]}
                  onCommand={(command) => {
                    if (command === 'current') onWorkflow?.(detail.run.workflowId);
                    if (command === 'compare') setComparePicker(true);
                    if (command === 'origin' && detail.trace.origin)
                      setComparison({
                        id: detail.trace.origin.runId,
                        requestRoot: detail.trace.origin.requestRoot,
                      });
                  }}
                >
                  <MoreHorizontal />
                </MenuButton>
              )}
              {!compact && onDebugPrepared && (
                <Button
                  variant="outline"
                  size={width < 760 ? 'icon' : 'sm'}
                  aria-label={tx('用本次输入调试')}
                  title={tx('用本次输入调试')}
                  onClick={() => setDebug('run')}
                >
                  {width < 760 ? <FlaskConical /> : tx('用本次输入调试')}
                </Button>
              )}
              {runStatus === 'running' && (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={stopping}
                  aria-label={tx('停止运行')}
                  onClick={() => {
                    setStopping(true);
                    void inspection
                      .api(`/api/runs/${id}/cancel`, 'POST', {})
                      .catch((cause) => setActionError(cause.message))
                      .finally(() => setStopping(false));
                  }}
                >
                  <Square />
                </Button>
              )}
              {compact && onExpand && (
                <Button variant="ghost" size="sm" onClick={onExpand}>
                  {tx('展开运行详情')}
                  <ArrowUpRight />
                </Button>
              )}
              {compact && onHide && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={tx('隐藏运行结果')}
                  onClick={onHide}
                >
                  <X />
                </Button>
              )}
              {!compact && (
                <Button
                  variant="ghost"
                  size="icon"
                  title={tx('步骤详情')}
                  aria-label={tx('步骤详情')}
                  aria-pressed={inspectorVisible}
                  onClick={() => setInspectorVisible(!inspectorVisible)}
                >
                  <Columns2 />
                </Button>
              )}
            </div>
            {(inspection.error || actionError) && (
              <p role="alert" className="border-b border-border px-4 py-2 text-xs text-destructive">
                {errorText(inspection.error || actionError)}
              </p>
            )}
            {detail.run.error && !selected && !inspection.nodeId && (
              <button
                type="button"
                className="trace-failure-summary"
                onClick={() => {
                  const failure = detail.trace.focus?.at(-1);
                  if (failure) select(failure);
                }}
              >
                <StatusIcon status="failed" />
                <span className="min-w-0 truncate">{errorText(detail.run.error)}</span>
                <span className="ml-auto shrink-0">{tx('定位错误')}</span>
              </button>
            )}
            <div className="relative flex min-h-0 min-w-0 flex-1">
              {treeVisible && (compact || width >= 950) ? (
                <ResizablePanel
                  storageKey="flowgram.trace.tree"
                  label={tx('调整执行树宽度')}
                  initial={compact ? 220 : 252}
                  min={180}
                  max={380}
                  reserve={compact ? 240 : 650}
                  className="border-r border-border"
                >
                  {tree}
                </ResizablePanel>
              ) : (
                treeVisible && (
                  <div className="trace-tree-overlay">
                    <div className="flex justify-end border-b border-border p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={tx('收起步骤')}
                        onClick={() => setTreeVisible(false)}
                      >
                        <X />
                      </Button>
                    </div>
                    {tree}
                  </div>
                )
              )}
              {compact ? (
                <div className="min-h-0 min-w-0 flex-1">{inspect}</div>
              ) : (
                <>
                  <main
                    className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-[var(--surface-canvas)]"
                    aria-label={view === 'canvas' ? tx('历史画布') : tx('时间线')}
                  >
                    <div className="flex min-h-9 shrink-0 items-center gap-2 border-b border-border px-3 py-1 text-[10px] text-muted-foreground">
                      {snapshot?.id !== detail.run.workflowId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={tx('返回根工作流')}
                          onClick={() => select(null)}
                        >
                          <ArrowLeft />
                        </Button>
                      )}
                      <span className="truncate">
                        {snapshot?.name || title} · v{snapshot?.revision || detail.run.revision}
                      </span>
                      <span className="ml-auto shrink-0">{tx('只读快照')}</span>
                    </div>
                    <div className="relative min-h-0 flex-1">
                      <div
                        className="absolute inset-0"
                        style={{
                          visibility: view === 'canvas' ? 'visible' : 'hidden',
                          pointerEvents: view === 'canvas' ? 'auto' : 'none',
                        }}
                        aria-hidden={view !== 'canvas'}
                      >
                        {Object.values(visited).map((frozen) => (
                          <div
                            key={`${id}:${frozen.id}`}
                            className="absolute inset-0"
                            style={{
                              visibility: frozen.id === snapshot?.id ? 'visible' : 'hidden',
                              pointerEvents: frozen.id === snapshot?.id ? 'auto' : 'none',
                            }}
                            aria-hidden={frozen.id !== snapshot?.id}
                          >
                            <TraceCanvas
                              snapshot={frozen}
                              selectedId={frozen.id === snapshot?.id ? inspection.nodeId : null}
                              statuses={frozen.id === snapshot?.id ? nodeStatuses : {}}
                              executions={frozen.id === snapshot?.id ? nodeExecutions : {}}
                              workflowNames={referenceNames}
                              modelTraces={Object.fromEntries(
                                (detail.models || [])
                                  .filter((item) => item.workflowId === frozen.id)
                                  .map((item) => [item.nodeId, item.model])
                              )}
                              edgeStates={frozen.id === snapshot?.id ? edgeStates : undefined}
                              onSelect={selectNode}
                              active={view === 'canvas' && frozen.id === snapshot?.id}
                            />
                          </div>
                        ))}
                        {(!snapshot || inspection.snapshotError) && (
                          <p className="p-5 text-xs text-muted-foreground">
                            {inspection.snapshotError
                              ? errorText(inspection.snapshotError)
                              : tx('此运行未保留完整画布快照')}
                          </p>
                        )}
                      </div>
                      {view === 'timeline' && (
                        <div className="absolute inset-0 overflow-auto bg-background p-4">
                          <div className="mb-3 flex justify-between text-[10px] tabular-nums text-muted-foreground">
                            <span>0 s</span>
                            <span>{duration(span)}</span>
                          </div>
                          {allEntries.map((entry) => (
                            <button
                              key={entry.id}
                              type="button"
                              className="trace-waterfall-row"
                              data-selected={selected?.id === entry.id}
                              onClick={() => select(entry)}
                            >
                              <span className="flex min-w-0 items-center gap-2">
                                <StatusIcon status={entry.status} />
                                <span
                                  className="truncate"
                                  title={`${executionName(entry)} ${executionPath(entry)}`}
                                >
                                  {executionName(entry)}
                                  {entry.iterationPath.length > 0 && (
                                    <small className="ml-1 text-muted-foreground">
                                      {entry.iterationPath.map((i) => i + 1).join('.')}
                                    </small>
                                  )}
                                </span>
                              </span>
                              <span className="trace-waterfall-track">
                                <span
                                  data-status={entry.status}
                                  style={{
                                    left: `${Math.max(
                                      0,
                                      ((Date.parse(entry.startedAt) - origin) / span) * 100
                                    )}%`,
                                    width: `${Math.min(
                                      100,
                                      Math.max(0.7, ((entry.durationMs || 0) / span) * 100)
                                    )}%`,
                                  }}
                                />
                              </span>
                              <span className="text-right text-[10px] tabular-nums text-muted-foreground">
                                {duration(entry.durationMs)}
                              </span>
                            </button>
                          ))}
                          <p className="mt-4 text-[10px] text-muted-foreground">
                            {tx('时间线显示已展开的步骤，展开执行树可查看内部调用。')}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex min-h-10 shrink-0 items-center gap-3 border-t border-border bg-background px-3 text-[10px] text-muted-foreground">
                      <span className="shrink-0">
                        {detail.trace.at == null
                          ? tx('完整运行')
                          : tx('事件 {0}', [detail.trace.at])}
                      </span>
                      <input
                        className="min-w-12 flex-1 accent-[var(--foreground)]"
                        aria-label={tx('历史事件位置')}
                        type="range"
                        min={0}
                        max={detail.trace.watermark}
                        value={position ?? detail.trace.watermark}
                        onChange={(event) => setPosition(Number(event.target.value))}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={at === undefined}
                        onClick={() => setPosition(undefined)}
                      >
                        {tx('回到完整运行')}
                      </Button>
                    </div>
                  </main>
                  {inspectorVisible &&
                    (width >= 700 ? (
                      <ResizablePanel
                        storageKey="flowgram.trace.inspector"
                        label={tx('调整步骤详情宽度')}
                        initial={340}
                        min={280}
                        max={520}
                        reserve={width >= 950 ? 460 : 280}
                        edge="left"
                        className="border-l border-border"
                      >
                        {inspect}
                      </ResizablePanel>
                    ) : (
                      <div className="trace-detail-overlay">
                        <div className="flex justify-end border-b border-border p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={tx('关闭步骤详情')}
                            onClick={() => setInspectorVisible(false)}
                          >
                            <X />
                          </Button>
                        </div>
                        {inspect}
                      </div>
                    ))}
                </>
              )}
            </div>
            {!compact &&
              detail.run.sessionId &&
              onSession &&
              sessions.some((session) => session.id === detail.run.sessionId) && (
                <button
                  type="button"
                  className="border-t border-border px-4 py-2 text-left text-[10px] text-muted-foreground hover:bg-secondary"
                  onClick={() => onSession(detail.run.sessionId!)}
                >
                  {tx('来自会话')} ·{' '}
                  {sessions.find((session) => session.id === detail.run.sessionId)?.title}
                  <ArrowUpRight size={11} className="ml-1 inline" />
                </button>
              )}
          </>
        )}
        {detail && debug && onDebugPrepared && (
          <Suspense fallback={null}>
            <DebugDialog
              detail={detail}
              entry={debug === 'node' ? selected : null}
              workflows={workflows}
              requestRoot={requestRoot}
              onClose={() => setDebug(null)}
              onPrepared={onDebugPrepared}
            />
          </Suspense>
        )}
        {detail && comparePicker && (
          <Suspense fallback={null}>
            <ComparePicker
              id={id}
              onClose={() => setComparePicker(false)}
              onPick={(other) => {
                setComparePicker(false);
                setComparison({ id: other, requestRoot });
              }}
            />
          </Suspense>
        )}
      </div>
      {comparison && (
        <div className="absolute inset-0 z-40 bg-background">
          <Suspense fallback={<p className="p-5 text-xs text-muted-foreground">{tx('加载中…')}</p>}>
            <RunComparison
              left={comparison}
              right={{ id, requestRoot }}
              onBack={() => {
                setComparison(null);
                requestAnimationFrame(() =>
                  container.current
                    ?.querySelector<HTMLButtonElement>(
                      '.trace-summary button[aria-haspopup="menu"]'
                    )
                    ?.focus()
                );
              }}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
}
