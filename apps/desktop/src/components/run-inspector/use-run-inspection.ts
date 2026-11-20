/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import type { RuntimeEvent, Workflow } from '../../lib/types';
import {
  mergeExecutions,
  mergeExecutionPage,
  mergeTraceDetail,
  executionFromEvents,
  type TraceUpdate,
  type Execution,
  type ExecutionPage,
  type TraceDetail,
} from '../../lib/run-trace';
import { useProjectApi } from '../../lib/project-context';
import { scopeFor } from '../../lib/control-nodes';

export function useRunInspection(id: string, at?: number) {
  const api = useProjectApi();
  const [detail, setDetail] = useState<TraceDetail | null>(null);
  const [error, setError] = useState('');
  const [pages, setPages] = useState<Record<string, ExecutionPage>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Execution | null>(null);
  const [nodeId, setNodeId] = useState<string | null>(null);
  const [events, setEvents] = useState<RuntimeEvent[]>([]);
  const [scopeEntries, setScopeEntries] = useState<Execution[]>([]);
  const [eventError, setEventError] = useState('');
  const [snapshot, setSnapshot] = useState<Workflow | null>(null);
  const [viewedWorkflowId, setViewedWorkflowId] = useState<string | null>(null);
  const [snapshotError, setSnapshotError] = useState('');
  const [instances, setInstances] = useState<ExecutionPage | null>(null);
  const [instanceError, setInstanceError] = useState('');
  const [selectionLoading, setSelectionLoading] = useState(false);
  const initialized = useRef(false);
  const metadataReady = useRef(false);
  const eventSelection = useRef('');
  const nodeRequest = useRef(0);
  const session = useRef(0);
  const stamp = at === undefined ? '' : `&at=${at}`;
  const root = `/api/runs/${encodeURIComponent(id)}`;
  useEffect(() => {
    session.current++;
    initialized.current = false;
    metadataReady.current = false;
    setDetail(null);
    setError('');
    setPages({});
    setExpanded(new Set());
    setSelected(null);
    setNodeId(null);
    setInstances(null);
    setSnapshot(null);
    setViewedWorkflowId(null);
  }, [id, api]);
  const loadPage = useCallback(
    async (parent: string | null, cursor?: number, focus?: string) => {
      const generation = session.current;
      const page = await api<ExecutionPage>(
        `${root}?view=executions${parent ? `&parent=${encodeURIComponent(parent)}` : ''}${
          cursor !== undefined ? `&cursor=${cursor}` : ''
        }${focus ? `&execution=${encodeURIComponent(focus)}` : ''}${stamp}`
      );
      if (generation !== session.current) return;
      setPages((previous) => ({
        ...previous,
        [parent || 'root']: focus ? page : mergeExecutionPage(previous[parent || 'root'], page),
      }));
      return page;
    },
    [root, api, stamp]
  );
  useEffect(() => {
    session.current++;
    setPages({});
  }, [at]);
  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    async function load() {
      try {
        const next = await api<TraceUpdate>(
          `${root}?view=overview${stamp}${metadataReady.current ? '&light=true' : ''}`,
          'GET',
          undefined,
          controller.signal
        );
        if (controller.signal.aborted) return;
        metadataReady.current = true;
        setDetail((previous) => mergeTraceDetail(previous, next));
        setError('');
        const page = {
          executions: next.trace.executions,
          nextCursor: next.trace.nextCursor,
          total: next.trace.rootTotal,
        };
        setPages((previous) => ({
          ...previous,
          root: at === undefined ? mergeExecutionPage(previous.root, page) : page,
        }));
        if (!initialized.current) {
          initialized.current = true;
          const focus = next.trace.focus || [];
          if (focus.length && next.run.status === 'failed') {
            setSelected(focus[focus.length - 1]);
            setViewedWorkflowId(focus[focus.length - 1].workflowId);
            setNodeId(focus[focus.length - 1].nodeId);
            setExpanded(new Set(focus.slice(0, -1).map((entry) => entry.id)));
            for (let index = 0; index < focus.length; index++) {
              if (controller.signal.aborted) return;
              await loadPage(index ? focus[index - 1].id : null, undefined, focus[index].id);
            }
          }
        }
        if (next.run.status === 'running' && at === undefined) timer = setTimeout(load, 1000);
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError((cause as Error).message);
          timer = setTimeout(load, 3000);
        }
      }
    }
    void load();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [root, api, stamp, loadPage, at]);
  // Refresh expanded branches without losing user expansion or paged siblings.
  useEffect(() => {
    if (detail?.run.status !== 'running' && at === undefined) return;
    for (const parent of expanded) void loadPage(parent).catch((cause) => setError(cause.message));
  }, [detail?.trace.watermark, at, loadPage]);
  const workflowId = selected?.workflowId || viewedWorkflowId || detail?.run.workflowId;
  useEffect(() => {
    if (!detail || !workflowId) return;
    const controller = new AbortController();
    setSnapshotError('');
    if (workflowId === detail.run.workflowId) {
      setSnapshot(detail.snapshot);
      return;
    }
    setSnapshot(null);
    void api<{ snapshot: Workflow }>(
      `${root}?view=snapshot&workflowId=${encodeURIComponent(workflowId)}`,
      'GET',
      undefined,
      controller.signal
    )
      .then((value) => setSnapshot(value.snapshot))
      .catch((cause) => {
        if (!controller.signal.aborted) setSnapshotError(cause.message);
      });
    return () => controller.abort();
  }, [workflowId, detail?.snapshot, api, root]);
  useEffect(() => {
    const changed = eventSelection.current !== (selected?.id || '');
    eventSelection.current = selected?.id || '';
    if (changed) setEvents([]);
    setEventError('');
    if (!selected) return;
    const controller = new AbortController();
    if (changed) setSelectionLoading(true);
    void (async () => {
      const all: RuntimeEvent[] = [];
      let after = 0;
      do {
        const page = await api<{
          events: RuntimeEvent[];
          nextAfter: number | null;
        }>(
          `${root}?view=execution&execution=${encodeURIComponent(selected.id)}&after=${after}`,
          'GET',
          undefined,
          controller.signal
        );
        all.push(...page.events);
        after = page.nextAfter || 0;
      } while (after && !controller.signal.aborted);
      if (!controller.signal.aborted) {
        setEvents(all.filter((event) => at === undefined || event.sequence <= at));
        setSelectionLoading(false);
      }
    })().catch((cause) => {
      if (!controller.signal.aborted) {
        setEventError(cause.message);
        setSelectionLoading(false);
      }
    });
    return () => controller.abort();
  }, [selected?.id, root, api, detail?.trace.watermark, at]);
  useEffect(() => {
    if (!selected?.scopeId) {
      setScopeEntries([]);
      return;
    }
    const controller = new AbortController();
    void (async () => {
      let cursor = 0;
      const all: Execution[] = [];
      do {
        const page = await api<ExecutionPage>(
          `${root}?view=executions&scopeId=${encodeURIComponent(
            selected.scopeId
          )}&cursor=${cursor}${stamp}`,
          'GET',
          undefined,
          controller.signal
        );
        all.push(...page.executions);
        cursor = page.nextCursor || 0;
      } while (cursor && !controller.signal.aborted);
      if (!controller.signal.aborted) setScopeEntries(all);
    })().catch((cause) => {
      if (!controller.signal.aborted) setEventError(cause.message);
    });
    return () => controller.abort();
  }, [selected?.scopeId, root, api, stamp, detail?.trace.watermark]);
  const select = useCallback((entry: Execution | null) => {
    setSelected(entry);
    setViewedWorkflowId(entry?.workflowId || null);
    setNodeId(entry?.nodeId || null);
    setInstances(null);
    setInstanceError('');
  }, []);
  async function selectNode(nextNode: string, cursor?: number) {
    const previousScope =
      selected &&
      snapshot &&
      scopeFor(snapshot.schema, selected.nodeId).nodes.some((node) => node.id === nextNode)
        ? selected.scopeId
        : undefined;
    setNodeId(nextNode);
    setViewedWorkflowId(snapshot?.id || detail!.run.workflowId);
    setInstanceError('');
    if (cursor === undefined) {
      setSelected(null);
      setInstances(null);
    }
    const generation = session.current;
    const request = ++nodeRequest.current;
    try {
      const page = await api<ExecutionPage>(
        `${root}?view=executions&nodeId=${encodeURIComponent(
          nextNode
        )}&workflowId=${encodeURIComponent(snapshot?.id || detail!.run.workflowId)}${
          cursor !== undefined ? `&cursor=${cursor}` : ''
        }${stamp}`
      );
      if (generation !== session.current || request !== nodeRequest.current) return;
      setInstances((previous) =>
        cursor !== undefined && previous
          ? {
              ...page,
              executions: mergeExecutions(previous.executions, page.executions),
            }
          : page
      );
      if (cursor === undefined) {
        const sameScope = previousScope
          ? page.executions.find((entry) => entry.scopeId === previousScope)
          : undefined;
        if (sameScope) setSelected(sameScope);
        else if (page.executions.length === 1 && !page.nextCursor) setSelected(page.executions[0]);
      }
    } catch (cause) {
      if (generation === session.current) setInstanceError((cause as Error).message);
    }
  }
  async function toggle(entry: Execution) {
    if (expanded.has(entry.id))
      setExpanded((previous) => {
        const next = new Set(previous);
        next.delete(entry.id);
        return next;
      });
    else {
      setExpanded((previous) => new Set([...previous, entry.id]));
      if (!pages[entry.id])
        try {
          await loadPage(entry.id);
        } catch (cause) {
          setError((cause as Error).message);
        }
    }
  }
  const current =
    selected &&
    (Object.values(pages)
      .flatMap((page) => page.executions)
      .find((entry) => entry.id === selected.id) ||
      selected);
  return {
    detail,
    error,
    pages,
    expanded,
    selected: executionFromEvents(current, events, at),
    nodeId,
    events: at === undefined ? events : events.filter((event) => event.sequence <= at),
    scopeEntries,
    eventError,
    snapshot,
    snapshotError,
    instances,
    instanceError,
    selectionLoading,
    select,
    selectInstance: (entry: Execution) => {
      setSelected(entry);
      setViewedWorkflowId(entry.workflowId);
    },
    selectNode,
    toggle,
    loadPage,
    api,
  };
}
