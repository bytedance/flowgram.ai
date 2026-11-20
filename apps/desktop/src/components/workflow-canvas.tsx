/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import {
  createContext,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';

import { Plus } from 'lucide-react';
import {
  EditorRenderer,
  getNodeForm,
  FreeLayoutEditorProvider,
  WorkflowNodeRenderer,
  WorkflowNodePortsData,
  WorkflowDragService,
  WorkflowHoverService,
  WorkflowLineEntity,
  WorkflowNodeEntity,
  SelectorBoxConfigEntity,
  WorkflowOperationBaseService,
  FreeOperationType,
  FlowNodeTransformData,
  FlowRendererRegistry,
  Rectangle,
  useListenEvents,
  useNodeRender,
  useWatchFormValues,
  type FreeLayoutProps,
  type WorkflowNodeProps,
  type FlowNodeEntity,
  type FreeLayoutPluginContext,
} from '@flowgram.ai/free-layout-editor';

import type { InsertionIntent, NodeCommand, Edge } from '../lib/workflow-editing';
import type { WorkflowNode, WorkflowSchema } from '../lib/types';
import { RunFollowCamera } from '../lib/run-follow';
import { presentNode, nodeNames, loopOwners, type NodeResources } from '../lib/node-presentation';
import { nodeFamily, NODE_LAYOUT } from '../lib/node-layout';
import type { CanvasExecution } from '../lib/node-execution';
import { nodeCatalog, nodeSpec } from '../lib/node-catalog';
import { motionDuration, observeMotionPreference } from '../lib/motion';
import { useModels, type ModelTrace } from '../lib/models';
import { tx, useLocale } from '../lib/i18n';
import {
  isLoop,
  portModels,
  portModelSignature,
  scopeFor,
  staticPorts,
} from '../lib/control-nodes';
import { isJoin } from '../lib/control-nodes';
import { canvasChanges } from '../lib/canvas-changes';
import { WorkflowCanvasToolbar } from './workflow-canvas-toolbar';
import {
  CanvasNodeHeader,
  CanvasNodeSummary,
  CanvasNodeRoutes,
  CanvasNodeRunBadge,
} from './canvas-node';
import { CanvasEdgeArrow } from './canvas-edge-arrow';
import '@flowgram.ai/free-layout-editor/index.css';

function fitCanvas(ctx: FreeLayoutPluginContext | null) {
  if (!ctx) return;
  const bounds = ctx.document
    .getAllNodes()
    .map((node) => node.getData(FlowNodeTransformData).bounds);
  if (bounds.length)
    void ctx.playground.config
      .fitView(Rectangle.enlarge(bounds), false, 40)
      .then(() => ctx.document.linesManager.forceUpdate());
}

interface CanvasInteraction {
  click: (id: string) => void;
  open: (id: string) => void;
  menu: (id: string, event: ReactMouseEvent) => void;
  add: (intent: InsertionIntent) => void;
  addInside: (id: string, event: ReactMouseEvent) => void;
  select: (id: string, toggle?: boolean) => void;
  renameId: string | null;
  rename: (id: string, title: string) => void;
  endRename: () => void;
  suppressClick: () => boolean;
  readOnly: boolean;
  inspect: (id: string) => void;
}
const InteractionContext = createContext<CanvasInteraction>(null!);
const PortContext = createContext<ReturnType<typeof portModels>>({});
const ExecutionContext = createContext<{
  entries: Record<string, CanvasExecution>;
  now: number;
  resources: NodeResources;
}>({
  entries: {},
  now: 0,
  resources: { names: {}, workflows: {} },
});
function NodeFields({ type }: { type: string }) {
  const interaction = useContext(InteractionContext);
  const { entries, now, resources } = useContext(ExecutionContext);
  const { node } = useNodeRender();
  const values = useWatchFormValues<Record<string, unknown>>(node) || {};
  const models = useContext(PortContext);
  const layout = models[node.id];
  if (!layout) return null;
  const spec = nodeSpec(type);
  const model: WorkflowNode = { id: node.id, type, data: values };
  const presentation = presentNode(model, resources);
  const routeSide = isJoin(type) ? 'input' : 'output';
  const routePorts = layout[routeSide];
  const title = String(values.title || spec.title);
  return (
    <>
      {!interaction.readOnly &&
        layout.output.map((port, index) => {
          const top = layout.ports.filter((port) => port.type === 'output')[index].locationConfig
            .top;
          return (
            <button
              key={port.id}
              type="button"
              className="node-port-add flow-canvas-not-draggable"
              style={{ top: typeof top === 'number' ? top - 12 : `calc(${top} - 12px)` }}
              aria-label={tx('在「{0}」后添加节点', [port.label])}
              title={tx('在「{0}」后添加节点', [port.label])}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                interaction.add({
                  anchor: { x: event.clientX, y: event.clientY },
                  source: { nodeId: node.id, portId: port.id },
                  position: {
                    x:
                      node.transform.position.x +
                      (layout.family === 'container'
                        ? Math.max(layout.width, node.transform.bounds.width)
                        : layout.width) +
                      80,
                    y: node.transform.position.y + index * 80,
                  },
                });
              }}
            >
              <Plus size={13} />
            </button>
          );
        })}
      <CanvasNodeHeader
        title={title}
        boundaryLabel={
          !values.title ||
          /^(in|out|input|output|entry|exit|start|end)$/i.test(title) ||
          title === spec.title
            ? type === 'block-start'
              ? tx(resources.owners?.[node.id]?.type === 'control.repeat' ? '本轮输入' : '当前项')
              : type === 'block-end'
              ? tx('本轮结果')
              : undefined
            : undefined
        }
        spec={spec}
        issue={resources.readOnly ? undefined : presentation.issue}
        readOnly={interaction.readOnly}
        renaming={interaction.renameId === node.id}
        onRename={(title) => interaction.rename(node.id, title)}
        onEndRename={interaction.endRename}
        onMenu={(event) => interaction.menu(node.id, event)}
      />
      <CanvasNodeSummary rows={presentation.rows} />
      {layout.family === 'route' && (
        <CanvasNodeRoutes node={model} side={routeSide} ports={routePorts} resources={resources} />
      )}
      {(['input', 'output'] as const).map(
        (side) =>
          layout[side].length === 1 &&
          layout.family !== 'route' && (
            <span
              key={side}
              className="node-port-hint"
              data-side={side}
              style={{
                top: layout.ports.find((port) => port.type === side)?.locationConfig.top || 0,
              }}
            >
              {tx(side === 'input' ? '进入此步骤' : '执行后继续')}
            </span>
          )
      )}
      {entries[node.id] && (
        <CanvasNodeRunBadge
          entry={entries[node.id]}
          now={now}
          onInspect={() => interaction.inspect(node.id)}
        />
      )}
    </>
  );
}
function NodeCard(props: WorkflowNodeProps) {
  const { node, form } = useNodeRender();
  const interaction = useContext(InteractionContext);
  const pointer = useRef({ x: 0, y: 0 });
  const models = useContext(PortContext);
  const layout = models[node.id] || {
    width: NODE_LAYOUT.width,
    height: NODE_LAYOUT.height,
    family: nodeFamily(String(node.flowNodeType)),
  };
  const execution = useContext(ExecutionContext).entries[node.id];
  const transform = node.getData(FlowNodeTransformData);
  useListenEvents(transform.onDataChange);
  const container = isLoop(String(node.flowNodeType));
  return (
    <div
      data-workflow-node-id={node.id}
      data-execution-status={execution?.status}
      data-node-family={layout.family}
      tabIndex={0}
      role="group"
      aria-label={String(form?.values?.title || nodeSpec(String(node.flowNodeType)).title)}
      onPointerDownCapture={(event) => {
        pointer.current = { x: event.clientX, y: event.clientY };
      }}
      onDragStartCapture={(event) => {
        if (
          interaction.readOnly ||
          (container && !(event.target as Element).closest('.workflow-node-heading')) ||
          (event.target as Element).closest('button,input,.flow-canvas-not-draggable')
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onClickCapture={(event) => {
        if ((event.target as Element).closest('button,input')) return;
        if (event.metaKey || event.ctrlKey) {
          event.stopPropagation();
          interaction.select(node.id, true);
        }
      }}
      onClick={(event) => {
        event.stopPropagation();
        if ((event.target as Element).closest('button,input,[data-port-entity-id]')) return;
        if (
          Math.hypot(event.clientX - pointer.current.x, event.clientY - pointer.current.y) > 5 ||
          interaction.suppressClick()
        )
          return;
        if (!event.shiftKey && !event.metaKey && !event.ctrlKey) interaction.click(node.id);
      }}
      onDoubleClick={(event) => {
        event.stopPropagation();
        if ((event.target as Element).closest('button,input,[data-port-entity-id]')) return;
        if (interaction.readOnly) interaction.click(node.id);
        else if (container && !(event.target as Element).closest('.workflow-node-heading'))
          interaction.addInside(node.id, event);
        else interaction.open(node.id);
      }}
    >
      <WorkflowNodeRenderer
        node={props.node}
        className={`flowgram-node flowgram-node-${node.flowNodeType}`}
        style={
          container
            ? {
                width: transform.bounds.width || 720,
                height: transform.bounds.height || 330,
              }
            : { width: layout.width, height: layout.height }
        }
        portPrimaryColor="var(--canvas-line)"
        portSecondaryColor="var(--muted-foreground)"
        portBackgroundColor="var(--surface-node)"
        portErrorColor="var(--destructive)"
      >
        {form?.render()}
      </WorkflowNodeRenderer>
    </div>
  );
}
export interface CanvasHandle {
  fit: () => void;
  insertionPosition: () => { x: number; y: number } | undefined;
  select: (ids: string[]) => void;
  focus: () => void;
  undo: () => void;
  redo: () => void;
  reveal: (id: string) => void;
}
export const WorkflowCanvas = memo(
  forwardRef<
    CanvasHandle,
    {
      schema: WorkflowSchema;
      readOnly?: boolean;
      selectedIds?: string[];
      edgeStates?: Record<string, string>;
      onChange: (schema: WorkflowSchema) => void;
      onOpen: (id: string) => void;
      onNodeClick: (id: string) => void;
      onSelectionChange: (ids: string[]) => void;
      onMenu: (
        point: { x: number; y: number },
        ids: string[],
        edge?: Edge,
        intent?: InsertionIntent
      ) => void;
      onAdd: (intent: InsertionIntent) => void;
      onCommand: (command: NodeCommand | 'paste', ids: string[]) => void;
      onDeleteConnections: (edges: Edge[]) => void;
      onConnectionError: (message: string) => void;
      onEscape: () => boolean;
      renameId: string | null;
      onRename: (id: string, title: string) => void;
      onEndRename: () => void;
      statuses?: Record<string, string>;
      executions?: Record<string, CanvasExecution>;
      workflowNames?: Record<string, string>;
      modelTraces?: Record<string, ModelTrace>;
      onInspectExecution?: (id: string) => void;
      followNodeId?: string | null;
      followRequest?: number;
      onManualNavigate?: () => void;
      toolbarLeading?: ReactNode;
      toolbarTrailing?: ReactNode;
    }
  >(function WorkflowCanvas(
    {
      schema,
      readOnly = false,
      selectedIds,
      edgeStates,
      onChange,
      onOpen,
      onNodeClick,
      onSelectionChange,
      onMenu,
      onAdd,
      onCommand,
      onDeleteConnections,
      onConnectionError,
      onEscape,
      renameId,
      onRename,
      onEndRename,
      statuses = {},
      executions = {},
      workflowNames = {},
      modelTraces,
      onInspectExecution,
      followNodeId,
      followRequest,
      onManualNavigate,
      toolbarLeading,
      toolbarTrailing,
    },
    ref
  ) {
    const handlers = useRef({
      onOpen,
      onNodeClick,
      onSelectionChange,
      onMenu,
      onAdd,
      onCommand,
      onConnectionError,
    });
    handlers.current = {
      onOpen,
      onNodeClick,
      onSelectionChange,
      onMenu,
      onAdd,
      onCommand,
      onConnectionError,
    };
    const suppressed = useRef(false);
    const lineCanceled = useRef(false);
    const [lineAction, setLineAction] = useState<{
      edge: Edge;
      x: number;
      y: number;
      position: { x: number; y: number };
    } | null>(null);
    const disposables = useRef<Array<{ dispose: () => void }>>([]);
    const root = useRef<HTMLDivElement>(null);
    const portSignature = portModelSignature(schema);
    const locale = useLocale();
    const modelInventory = useModels();
    const resources = useMemo<NodeResources>(
      () => ({
        names: nodeNames(schema),
        owners: loopOwners(schema),
        workflows: workflowNames,
        models: modelInventory,
        modelTraces,
        readOnly,
      }),
      [schema, workflowNames, modelInventory, modelTraces, readOnly, locale]
    );
    const [now, setNow] = useState(() => Date.now());
    const activeExecution = Object.values(statuses).some((status) => status === 'running');
    useEffect(() => {
      if (!activeExecution) return;
      const timer = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(timer);
    }, [activeExecution]);
    const executionContext = useMemo(
      () => ({
        entries: Object.fromEntries(
          Object.entries(statuses).map(([id, status]) => [id, { ...executions[id], status }])
        ),
        now,
        resources,
      }),
      [statuses, executions, now, resources]
    );
    const models = useMemo(() => portModels(schema), [portSignature, locale]);
    const portCache = useRef(new WeakMap<object, string>());
    function updatePorts(entity: FlowNodeEntity, model: WorkflowNode, graph: WorkflowSchema) {
      const layout = staticPorts(model, graph);
      const ports = layout.ports;
      if (!isLoop(model.type))
        entity.getData(FlowNodeTransformData).size = {
          width: layout.width,
          height: layout.height,
        };
      const signature = JSON.stringify(ports);
      if (portCache.current.get(entity) === signature) return;
      portCache.current.set(entity, signature);
      entity.getData(WorkflowNodePortsData).updateAllPorts(ports);
    }
    const callback = useRef(onChange);
    callback.current = onChange;
    const selectedRef = useRef(selectedIds);
    selectedRef.current = selectedIds;
    const latest = useRef(schema);
    latest.current = schema;
    const initial = useRef(schema);
    const ready = useRef(false);
    const context = useRef<FreeLayoutPluginContext | null>(null);
    const [viewportReady, setViewportReady] = useState(false);
    const navigation = useRef(onManualNavigate);
    navigation.current = onManualNavigate;
    const camera = useMemo(
      () =>
        new RunFollowCamera(
          async (id) => {
            const ctx = context.current;
            const node = ctx?.document.getNode(id);
            if (
              !ctx ||
              !node ||
              !root.current?.clientWidth ||
              !root.current?.clientHeight ||
              root.current.closest('[inert], [hidden]')
            )
              return;
            const duration = motionDuration('panel') * 2;
            await ctx.playground.config.scrollToView({
              entities: [node],
              zoom: Math.max(ctx.playground.config.zoom, 0.65),
              scrollToCenter: true,
              easing: duration > 0,
              easingDuration: duration,
            });
          },
          () => {
            void context.current?.playground.config.scroll({}, false);
          }
        ),
      []
    );
    function manualNavigate() {
      camera.stop();
      navigation.current?.();
    }
    useEffect(() => {
      if (viewportReady && followNodeId) camera.follow(followNodeId);
      else camera.stop();
    }, [viewportReady, followNodeId, followRequest, camera]);
    const followTarget = useRef(followNodeId);
    followTarget.current = followNodeId;
    useEffect(() => {
      const dispose = observeMotionPreference(() => {
        camera.stop();
        if (followTarget.current) camera.follow(followTarget.current);
      });
      return () => {
        camera.stop();
        dispose();
      };
    }, [camera]);
    const updating = useRef(false);
    const historyBusy = useRef(false);
    async function autoLayout() {
      const ctx = context.current;
      if (!ctx || readOnly || historyBusy.current) return;
      historyBusy.current = true;
      updating.current = true;
      suppressed.current = true;
      try {
        await ctx.tools.autoLayout({
          enableAnimation: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          animationDuration: 180,
          disableFitView: true,
          layoutConfig: {
            rankdir: 'LR',
            nodesep: NODE_LAYOUT.nodeGap,
            ranksep: NODE_LAYOUT.rankGap,
          },
        });
        callback.current(ctx.document.toJSON() as WorkflowSchema);
        fitCanvas(ctx);
      } catch (cause) {
        handlers.current.onConnectionError((cause as Error).message);
      } finally {
        updating.current = false;
        historyBusy.current = false;
        suppressed.current = false;
        ctx.playground.node.focus({ preventScroll: true });
      }
    }
    async function runHistory(redo = false) {
      const ctx = context.current;
      if (!ctx || readOnly || historyBusy.current) return;
      historyBusy.current = true;
      updating.current = true;
      try {
        await (redo ? ctx.history.redo() : ctx.history.undo());
      } catch (cause) {
        handlers.current.onConnectionError((cause as Error).message);
      } finally {
        updating.current = false;
        historyBusy.current = false;
        ctx.selection.selection = ctx.selection.selection.filter((entity) => !entity.disposed);
        callback.current(ctx.document.toJSON() as WorkflowSchema);
        ctx.playground.node.focus({ preventScroll: true });
      }
    }
    useImperativeHandle(
      ref,
      () => ({
        reveal(id) {
          const ctx = context.current;
          const node = ctx?.document.getNode(id);
          if (ctx && node)
            void ctx.playground.config.scrollToView({
              entities: [node],
              zoom: Math.max(ctx.playground.config.zoom, 0.6),
              easing: false,
            });
        },
        select(ids) {
          const ctx = context.current;
          if (!ctx) return;
          ctx.selection.selection = ctx.document
            .getAllNodes()
            .filter((node) => ids.includes(node.id));
        },
        focus() {
          context.current?.playground.node.focus({ preventScroll: true });
        },
        undo() {
          void runHistory();
        },
        redo() {
          void runHistory(true);
        },
        fit() {
          fitCanvas(context.current);
        },
        insertionPosition() {
          const center = context.current?.playground.config.getViewport(true).center;
          return center && { x: center.x - 140, y: center.y - 75 };
        },
      }),
      []
    );
    function sync(next: WorkflowSchema) {
      const document = context.current?.document;
      if (
        !document ||
        !ready.current ||
        updating.current ||
        JSON.stringify(document.toJSON()) === JSON.stringify(next)
      )
        return;
      updating.current = true;
      try {
        const ctx = context.current!;
        const changes = canvasChanges(document.toJSON() as WorkflowSchema, next);
        if (changes) {
          ctx.operation.startTransaction();
          try {
            for (const change of changes) {
              const entity = document.getNode(change.id);
              if (!entity) continue;
              const form = getNodeForm(entity);
              if (JSON.stringify(form?.values) !== JSON.stringify(change.data))
                form?.updateFormValues(change.data);
              const position = change.meta?.position;
              if (
                position &&
                (entity.transform.position.x !== position.x ||
                  entity.transform.position.y !== position.y)
              )
                ctx.operation.updateNodePosition(entity, position);
            }
          } finally {
            ctx.operation.endTransaction();
          }
        } else {
          // Structural reconciliation reuses existing entity IDs in one transaction.
          ctx.operation.fromJSON(next);
        }
      } finally {
        updating.current = false;
      }
    }
    useEffect(() => {
      sync(schema);
    }, [schema]);
    useEffect(() => {
      // Undo can restore entities before React receives their configuration.
      // Reconcile static definitions after the graph is present; movement never invalidates them.
      context.current?.document.getAllNodes().forEach((entity) => {
        const graph = scopeFor(latest.current, entity.id);
        const model = graph.nodes.find((node) => node.id === entity.id);
        if (model) updatePorts(entity, model, graph);
      });
    }, [portSignature]);
    useEffect(() => {
      const ctx = context.current;
      if (ctx && selectedIds)
        ctx.selection.selection = ctx.document
          .getAllNodes()
          .filter((node) => selectedIds.includes(node.id));
    }, [selectedIds]);
    const executionEdges = useRef(edgeStates);
    executionEdges.current = edgeStates;
    function updateExecutionEdges() {
      const ctx = context.current;
      if (!ctx) return;
      for (const line of ctx.document.linesManager.getAllLines()) {
        const edge = line.toJSON() as Edge;
        const state =
          executionEdges.current?.[
            `${edge.sourceNodeID}:${edge.sourcePortID || ''}:${edge.targetNodeID}`
          ];
        line.updateUIState({ className: state ? `workflow-edge-${state}` : '' });
      }
    }
    useEffect(updateExecutionEdges, [edgeStates]);
    const props = useMemo<FreeLayoutProps>(
      () => ({
        readonly: readOnly,
        enableReadonlyNodeDragging: false,
        canDeleteNode: () => !readOnly,
        initialData: initial.current,
        onInit(ctx) {
          ctx.playground.config.updateConfig({ minZoom: 0.1 });
          ctx.document.linesManager.setDefaultUIState({
            strokeWidth: 1.5,
            strokeWidthSelected: 2,
            shrink: 4,
            curvature: 0.16,
          });
          ctx
            .get<FlowRendererRegistry>(FlowRendererRegistry)
            .registerReactComponent('arrow-renderer', CanvasEdgeArrow);
        },
        setLineClassName(ctx, line) {
          return [
            'workflow-edge',
            (ctx.selection.selection.includes(line) ||
              ctx.get<WorkflowHoverService>(WorkflowHoverService).isHovered(line.id) ||
              line.isDrawing) &&
              'workflow-edge-emphasized',
            line.position.to.x < line.position.from.x && 'workflow-edge-return',
            line.hasError && 'workflow-edge-error',
            line.isHidden && 'workflow-edge-hidden',
          ]
            .filter(Boolean)
            .join(' ');
        },
        onReady(ctx) {
          context.current = ctx;
          const updateDensity = (zoom: number) => {
            if (root.current)
              root.current.dataset.nodeDensity = zoom < 0.32 ? 'overview' : 'detail';
          };
          updateDensity(ctx.playground.config.zoom);
          disposables.current.push(ctx.playground.onZoom(updateDensity));
          const selector = ctx.playground.entityManager.getEntity<SelectorBoxConfigEntity>(
            SelectorBoxConfigEntity,
            true
          )!;
          const updateSelectionPhase = () => {
            const phase = selector.isMoving ? 'marquee' : 'idle';
            if (ctx.playground.node.dataset.selectionGesture !== phase)
              ctx.playground.node.dataset.selectionGesture = phase;
          };
          updateSelectionPhase();
          disposables.current.push(selector.onConfigChanged(updateSelectionPhase));
          // The public operation service and the history plugin's base service
          // can be distinct DI instances. Bridge programmatic moves so insertion
          // spacing is recorded inside the same transaction as the graph edit.
          if (
            ctx.operation !== ctx.get<WorkflowOperationBaseService>(WorkflowOperationBaseService)
          ) {
            disposables.current.push(
              ctx.operation.onNodePostionUpdate((event) => {
                ctx.history.pushOperation(
                  {
                    type: FreeOperationType.dragNodes,
                    value: {
                      ids: [event.node.id],
                      value: [event.newPosition],
                      oldValue: [event.oldPosition],
                    },
                  },
                  { noApply: true }
                );
              })
            );
          }
          disposables.current.push(
            ctx.selection.onSelectionChanged(() => {
              handlers.current.onSelectionChange(
                ctx.selection.selection
                  .filter((entity) => entity instanceof WorkflowNodeEntity && !entity.disposed)
                  .map((entity) => entity.id)
              );
            })
          );
          disposables.current.push(
            ctx.get<WorkflowDragService>(WorkflowDragService).onDragLineEventChange((event) => {
              if (event.type === 'onDrag') lineCanceled.current = false;
            })
          );
          disposables.current.push(
            ctx.get<WorkflowDragService>(WorkflowDragService).onNodesDrag((event) => {
              suppressed.current = true;
              if (event.type === 'onDragEnd')
                requestAnimationFrame(() => {
                  suppressed.current = false;
                });
            })
          );
        },
        onDispose() {
          disposables.current.forEach((item) => item.dispose());
        },
        canDropToNode: () => false,
        // A missed/cancelled reconnection must retain the original edge.
        canDeleteLine: (_ctx, _line, next) => !readOnly && !!next && !lineCanceled.current,
        canResetLine(ctx, old, next) {
          if (readOnly) return false;
          if (lineCanceled.current) return false;
          const from = ctx.document.getNode(next.from);
          const to = ctx.document.getNode(next.to);
          return (
            !!from &&
            !!to &&
            from !== to &&
            from.parent === to.parent &&
            !ctx.document.linesManager
              .getAllLines()
              .some(
                (line) =>
                  line !== old &&
                  !line.isDrawing &&
                  line.from?.id === next.from &&
                  String(line.fromPort?.portID || '') === String(next.fromPort || '')
              )
          );
        },
        canAddLine(ctx, from, to, _lines, silent) {
          if (readOnly) return false;
          if (lineCanceled.current) return false;
          const reason =
            from.node.parent !== to.node.parent
              ? 'Connections cannot cross a loop boundary'
              : ctx.document.linesManager
                  .getAllLines()
                  .some(
                    (line) =>
                      !line.isDrawing &&
                      line.highlightColor !== ctx.document.linesManager.lineColor.hidden &&
                      line.fromPort === from
                  )
              ? 'This output is already connected. Insert a node into the existing connection instead.'
              : null;
          if (reason && !silent) handlers.current.onConnectionError(reason);
          return !reason;
        },
        async onDragLineEnd(ctx, params) {
          if (readOnly) return;
          lineCanceled.current =
            !Number.isFinite(params.mousePos.x) || !Number.isFinite(params.mousePos.y);
          if (lineCanceled.current) return;
          if (params.originLine || !params.fromPort || params.toPort || !params.line) return;
          handlers.current.onAdd({
            position: params.mousePos,
            anchor: { x: params.event.clientX, y: params.event.clientY },
            source: {
              nodeId: params.fromPort.node.id,
              portId: String(params.fromPort.portID),
            },
          });
        },
        background: {
          gridSize: 28,
          dotSize: 0.7,
          dotColor: 'transparent',
          dotFillColor: 'var(--canvas-dot)',
          dotOpacity: 1,
          backgroundColor: 'var(--surface-canvas)',
        },
        nodeEngine: { enable: true },
        history: {
          enable: true,
          enableChangeNode: true,
          disableShortcuts: true,
        },
        nodeRegistries: [...nodeCatalog.map((node) => node.type), 'block-start', 'block-end'].map(
          (type) => ({
            type,
            meta: {
              isStart: type === 'start' || type === 'block-start',
              isContainer: isLoop(type),
              size: isLoop(type)
                ? { width: NODE_LAYOUT.containerWidth, height: NODE_LAYOUT.containerHeight }
                : { width: NODE_LAYOUT.width, height: NODE_LAYOUT.height },
              padding: isLoop(type)
                ? {
                    top: NODE_LAYOUT.containerTop,
                    left: NODE_LAYOUT.containerSide,
                    right: NODE_LAYOUT.containerSide,
                    bottom: NODE_LAYOUT.containerBottom,
                  }
                : undefined,
              defaultPorts: [],
              useDynamicPort: false,
            },
          })
        ),
        fromNodeJSON(node, json) {
          const model = json as unknown as WorkflowNode;
          updatePorts(node, model, scopeFor(latest.current, model.id));
          return json;
        },
        getNodeDefaultRegistry(type) {
          return {
            type,
            formMeta: { render: () => <NodeFields type={String(type)} /> },
          };
        },
        materials: { renderDefaultNode: NodeCard },
        onContentChange(ctx) {
          if (!readOnly && ready.current && !updating.current)
            callback.current(ctx.document.toJSON() as WorkflowSchema);
        },
        onAllLayersRendered(ctx) {
          context.current = ctx;
          if (!ready.current) {
            ready.current = true;
            sync(latest.current);
            // A newly opened split can start at zero width. Fit once at its
            // settled size; subsequent panel changes preserve this viewport.
            let fitted = false;
            let frame = 0;
            const fit = () => {
              if (fitted || !root.current) return;
              root.current.dataset.viewportPending = 'true';
              if (!root.current.clientWidth || !root.current.clientHeight) return;
              if (
                document.querySelector('[data-layout-animating]') ||
                document.documentElement.matches('.resizing-column, .resizing-row')
              ) {
                root.current.dataset.viewportPending = 'true';
                return;
              }
              fitted = true;
              observer.disconnect();
              visibilityObserver.disconnect();
              window.removeEventListener('flowgram:layout-settled', settled);
              updateExecutionEdges();
              const selected =
                readOnly && selectedRef.current?.length
                  ? ctx.document
                      .getAllNodes()
                      .filter((node) => selectedRef.current!.includes(node.id))
                  : [];
              if (selected.length) {
                ctx.selection.selection = selected;
                void ctx.playground.config.scrollToView({
                  entities: selected,
                  zoom: 0.6,
                  easing: false,
                });
              } else fitCanvas(ctx);
              delete root.current.dataset.viewportPending;
              setViewportReady(true);
            };
            const settled = () => {
              cancelAnimationFrame(frame);
              frame = requestAnimationFrame(fit);
            };
            const observer = new ResizeObserver(settled);
            observer.observe(ctx.playground.node);
            // A pane can finish its transition without another resize or a
            // layout-settled event. Observe visibility/transition completion so
            // the initial paint never remains hidden waiting for a lost event.
            const visibilityObserver = new MutationObserver(settled);
            visibilityObserver.observe(document.documentElement, {
              subtree: true,
              attributes: true,
              attributeFilter: ['data-layout-animating', 'data-active', 'inert', 'hidden', 'class'],
            });
            window.addEventListener('flowgram:layout-settled', settled);
            disposables.current.push({
              dispose() {
                cancelAnimationFrame(frame);
                observer.disconnect();
                visibilityObserver.disconnect();
                window.removeEventListener('flowgram:layout-settled', settled);
              },
            });
            fit();
          }
        },
      }),
      []
    );
    return (
      <PortContext.Provider value={models}>
        <InteractionContext.Provider
          value={{
            readOnly,
            click: onNodeClick,
            inspect: onInspectExecution || onNodeClick,
            open: onOpen,
            renameId,
            rename: onRename,
            endRename: onEndRename,
            suppressClick: () => suppressed.current,
            select(id, toggle = false) {
              const ctx = context.current;
              const entity = ctx?.document.getNode(id);
              if (!ctx || !entity) return;
              ctx.selection.selection = toggle
                ? ctx.selection.selection.some((item) => item.id === id)
                  ? ctx.selection.selection.filter((item) => item.id !== id)
                  : [...ctx.selection.selection, entity]
                : [entity];
            },
            menu(id, event) {
              const ctx = context.current;
              if (!ctx) return;
              if (!ctx.selection.selection.some((item) => item.id === id)) {
                const entity = ctx.document.getNode(id);
                if (entity) ctx.selection.selection = [entity];
              }
              onMenu(
                { x: event.clientX, y: event.clientY },
                ctx.selection.selection
                  .filter((entity) => entity instanceof WorkflowNodeEntity)
                  .map((entity) => entity.id)
              );
            },
            addInside(id, event) {
              const ctx = context.current;
              const model = scopeFor(latest.current, id).nodes.find((node) => node.id === id);
              const entity = ctx?.document.getNode(id);
              if (!ctx || !entity || !model?.blocks?.[0]) return;
              const position = ctx.playground.config.getPosFromMouseEvent(event);
              const bounds = entity.getData(FlowNodeTransformData).bounds;
              onAdd({
                scopeId: model.blocks[0].id,
                anchor: { x: event.clientX, y: event.clientY },
                position: {
                  x: Math.max(40, position.x - bounds.x),
                  y: Math.max(120, position.y - bounds.y),
                },
              });
            },
            add: onAdd,
          }}
        >
          <ExecutionContext.Provider value={executionContext}>
            <FreeLayoutEditorProvider {...props}>
              <div
                ref={root}
                className={`workflow-canvas-interactions h-full w-full ${
                  readOnly ? 'workflow-canvas-readonly' : ''
                }`}
                onPointerDownCapture={manualNavigate}
                onWheelCapture={manualNavigate}
                onPasteCapture={
                  readOnly
                    ? (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }
                    : undefined
                }
                onPointerMove={(event) => {
                  if (readOnly) return;
                  if ((event.target as Element).closest('.workflow-line-add')) return;
                  const ctx = context.current;
                  if (!ctx || event.buttons) {
                    setLineAction(null);
                    return;
                  }
                  const hovered = ctx.get<WorkflowHoverService>(WorkflowHoverService).someHovered;
                  if (hovered instanceof WorkflowLineEntity && !hovered.isDrawing) {
                    const rect = root.current!.getBoundingClientRect();
                    const canvasRect = ctx.playground.node.getBoundingClientRect();
                    const { zoom, config } = ctx.playground.config;
                    const center = hovered.center;
                    const x = center.x * zoom - config.scrollX + canvasRect.left - rect.left;
                    const y = center.y * zoom - config.scrollY + canvasRect.top - rect.top;
                    setLineAction((current) =>
                      current && Math.abs(current.x - x) < 1 && Math.abs(current.y - y) < 1
                        ? current
                        : {
                            edge: hovered.toJSON() as Edge,
                            x,
                            y,
                            position: { x: center.x, y: center.y },
                          }
                    );
                  } else if (lineAction) {
                    const rect = root.current!.getBoundingClientRect();
                    if (
                      Math.hypot(
                        event.clientX - rect.left - lineAction.x,
                        event.clientY - rect.top - lineAction.y
                      ) > 36
                    )
                      setLineAction(null);
                  }
                }}
                onPointerLeave={() => setLineAction(null)}
                onMouseDownCapture={(event) => {
                  // The engine's group-drag layer also listens to mousedown. Keep
                  // context menus, modifiers and controls out of that gesture.
                  const targetId = (event.target as Element).closest<HTMLElement>(
                    '[data-workflow-node-id]'
                  )?.dataset.workflowNodeId;
                  const targetNode =
                    targetId &&
                    scopeFor(latest.current, targetId).nodes.find((node) => node.id === targetId);
                  if (
                    (targetNode &&
                      isLoop(targetNode.type) &&
                      !(event.target as Element).closest('.workflow-node-heading')) ||
                    event.button === 2 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    (event.target as Element).closest(
                      'button,input,textarea,.flow-canvas-not-draggable'
                    )
                  )
                    event.stopPropagation();
                }}
                onKeyDownCapture={(event) => {
                  if (
                    [
                      ' ',
                      'ArrowUp',
                      'ArrowDown',
                      'ArrowLeft',
                      'ArrowRight',
                      '+',
                      '-',
                      '0',
                    ].includes(event.key)
                  )
                    manualNavigate();
                  if (readOnly) {
                    if (event.key === 'Enter') {
                      const node = context.current?.selection.selection.find(
                        (entity) => entity instanceof WorkflowNodeEntity
                      );
                      if (node) onNodeClick(node.id);
                    }
                    if (
                      ['Delete', 'Backspace', 'F2'].includes(event.key) ||
                      ((event.metaKey || event.ctrlKey) &&
                        ['v', 'x', 'z', 'd'].includes(event.key.toLowerCase()))
                    ) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                    return;
                  }
                  if (
                    event.defaultPrevented ||
                    event.nativeEvent.isComposing ||
                    (event.target as Element).closest(
                      'input,textarea,button,[contenteditable="true"],[role="dialog"],[role="menu"]'
                    )
                  )
                    return;
                  const ctx = context.current;
                  if (!ctx) return;
                  const ids = ctx.selection.selection
                    .filter((entity) => entity instanceof WorkflowNodeEntity)
                    .map((entity) => entity.id);
                  const modifier = event.metaKey || event.ctrlKey;
                  const key = event.key.toLowerCase();
                  let command: NodeCommand | 'paste' | undefined;
                  if (key === 'f2' && ids.length === 1) command = 'rename';
                  if (key === 'enter' && ids.length === 1) command = 'open';
                  if (key === 'delete' || key === 'backspace') {
                    const edges = ctx.selection.selection
                      .filter((entity) => entity instanceof WorkflowLineEntity)
                      .map((entity) => (entity as WorkflowLineEntity).toJSON() as Edge);
                    if (edges.length && !ids.length) {
                      event.preventDefault();
                      event.stopPropagation();
                      onDeleteConnections(edges);
                      return;
                    }
                    command = 'delete';
                  }
                  if (modifier && key === 'c') command = 'copy';
                  if (modifier && key === 'x') command = 'cut';
                  if (modifier && key === 'v') command = 'paste';
                  if (modifier && key === 'd') command = 'duplicate';
                  if (command) {
                    event.preventDefault();
                    event.stopPropagation();
                    onCommand(command, ids);
                    return;
                  }
                  if (modifier && key === 'z') {
                    event.preventDefault();
                    event.stopPropagation();
                    void runHistory(event.shiftKey);
                    return;
                  }
                  if (modifier && key === 'a') {
                    event.preventDefault();
                    event.stopPropagation();
                    ctx.selection.selection = ctx.document
                      .getAllNodes()
                      .filter(
                        (node) =>
                          node.parent ===
                          (ctx.document.getNode(ids[0])?.parent || ctx.document.root)
                      );
                    return;
                  }
                  if (
                    !modifier &&
                    ['arrowleft', 'arrowright', 'arrowup', 'arrowdown'].includes(key) &&
                    ids.length === 1
                  ) {
                    const current = ctx.document.getNode(ids[0]);
                    if (current) {
                      const origin = current.getData(FlowNodeTransformData).bounds.center;
                      const horizontal = key === 'arrowleft' || key === 'arrowright';
                      const positive = key === 'arrowright' || key === 'arrowdown';
                      const candidates = ctx.document
                        .getAllNodes()
                        .filter((node) => node !== current && node.parent === current.parent)
                        .map((node) => {
                          const center = node.getData(FlowNodeTransformData).bounds.center;
                          const primary = horizontal ? center.x - origin.x : center.y - origin.y;
                          const cross = horizontal ? center.y - origin.y : center.x - origin.x;
                          return {
                            node,
                            primary,
                            score: Math.abs(primary) + 2 * Math.abs(cross),
                          };
                        })
                        .filter((item) => (positive ? item.primary > 0 : item.primary < 0))
                        .sort((a, b) => a.score - b.score);
                      if (candidates[0]) {
                        event.preventDefault();
                        event.stopPropagation();
                        ctx.selection.selection = [candidates[0].node];
                        onNodeClick(candidates[0].node.id);
                      }
                    }
                  }
                  if (!modifier && key === 'n') {
                    event.preventDefault();
                    event.stopPropagation();
                    onAdd({
                      position: ctx.playground.config.getViewport(true).center,
                    });
                  }
                  if (key === 'escape') {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!onEscape()) ctx.selection.selection = [];
                  }
                  if (event.shiftKey && key === 'f10' && ids.length) {
                    event.preventDefault();
                    event.stopPropagation();
                    const rect = root.current!.getBoundingClientRect();
                    onMenu(
                      {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2,
                      },
                      ids
                    );
                  }
                }}
                onDoubleClick={(event) => {
                  if (readOnly) return;
                  if (
                    (event.target as Element).closest(
                      '[data-workflow-node-id],button,input,[data-port-entity-id]'
                    )
                  )
                    return;
                  const ctx = context.current;
                  if (ctx && !ctx.get<WorkflowHoverService>(WorkflowHoverService).someHovered)
                    onAdd({
                      position: ctx.playground.config.getPosFromMouseEvent(event),
                      anchor: { x: event.clientX, y: event.clientY },
                    });
                }}
                onContextMenuCapture={(event) => {
                  if ((event.target as Element).closest('input,textarea,[contenteditable="true"]'))
                    return;
                  event.preventDefault();
                  event.stopPropagation();
                  if (readOnly) return;
                  const ctx = context.current;
                  if (!ctx) return;
                  const hovered = ctx.get<WorkflowHoverService>(WorkflowHoverService).someHovered;
                  const nodeId =
                    (event.target as Element).closest<HTMLElement>('[data-workflow-node-id]')
                      ?.dataset.workflowNodeId ||
                    (hovered instanceof WorkflowNodeEntity ? hovered.id : undefined);
                  if (nodeId && !ctx.selection.selection.some((item) => item.id === nodeId)) {
                    const node = ctx.document.getNode(nodeId);
                    if (node) ctx.selection.selection = [node];
                  } else if (!nodeId && hovered instanceof WorkflowLineEntity)
                    ctx.selection.selection = [hovered];
                  const ids = nodeId
                    ? ctx.selection.selection
                        .filter((entity) => entity instanceof WorkflowNodeEntity)
                        .map((entity) => entity.id)
                    : [];
                  onMenu(
                    { x: event.clientX, y: event.clientY },
                    ids,
                    hovered instanceof WorkflowLineEntity && !nodeId
                      ? (hovered.toJSON() as Edge)
                      : undefined,
                    {
                      position: ctx.playground.config.getPosFromMouseEvent(event),
                      anchor: { x: event.clientX, y: event.clientY },
                    }
                  );
                }}
              >
                <EditorRenderer className="h-full w-full" />
                {lineAction && (
                  <button
                    type="button"
                    className="workflow-line-add"
                    aria-label={tx('在连线中插入节点')}
                    style={{ left: lineAction.x - 12, top: lineAction.y - 12 }}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => {
                      event.stopPropagation();
                      onAdd({
                        edge: lineAction.edge,
                        position: lineAction.position,
                        anchor: { x: event.clientX, y: event.clientY },
                      });
                      setLineAction(null);
                    }}
                  >
                    <Plus size={13} />
                  </button>
                )}
              </div>
              <WorkflowCanvasToolbar
                readOnly={readOnly}
                leading={toolbarLeading}
                trailing={toolbarTrailing}
                onNavigate={manualNavigate}
                onHistory={runHistory}
                onFit={() => fitCanvas(context.current)}
                onAutoLayout={autoLayout}
              />
            </FreeLayoutEditorProvider>
          </ExecutionContext.Provider>
        </InteractionContext.Provider>
      </PortContext.Provider>
    );
  })
);
