/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';

import {
  ChevronDown,
  ChevronRight,
  Check,
  Circle,
  CircleAlert,
  CircleMinus,
  Clock3,
  Loader2,
  Bot,
  Wrench,
  Globe,
} from 'lucide-react';

import { Button } from '../ui/button';
import {
  duration,
  aggregateStatus,
  executionPath,
  statusLabel,
  type Execution,
  type ExecutionPage,
} from '../../lib/run-trace';
import { tx } from '../../lib/i18n';

export function StatusIcon({ status, size = 13 }: { status: string; size?: number }) {
  const Icon =
    status === 'running'
      ? Loader2
      : status === 'succeeded'
      ? Check
      : status === 'failed'
      ? CircleAlert
      : status === 'waiting'
      ? Clock3
      : ['canceled', 'interrupted', 'skipped'].includes(status)
      ? CircleMinus
      : Circle;
  return (
    <Icon
      size={size}
      aria-hidden="true"
      className={
        status === 'failed'
          ? 'shrink-0 text-destructive'
          : status === 'running'
          ? 'shrink-0 animate-spin text-muted-foreground'
          : 'shrink-0 text-muted-foreground'
      }
    />
  );
}
function IterationGroup({
  entries,
  selected,
  children,
  depth,
}: {
  entries: Execution[];
  selected: string | null;
  children: ReactNode;
  depth: number;
}) {
  const chosen = entries.some((entry) => entry.id === selected);
  const [open, setOpen] = useState(
    chosen || entries.some((entry) => entry.status === 'failed' || entry.status === 'running')
  );
  useEffect(() => {
    if (chosen) setOpen(true);
  }, [chosen, selected]);
  const counts: Record<string, number> = {};
  entries.forEach((entry) => (counts[entry.status] = (counts[entry.status] || 0) + 1));
  const status = aggregateStatus(counts);
  const first = entries[0];
  return (
    <details
      className="trace-iteration"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        style={{ paddingLeft: depth * 12 + 14 }}
        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-[10px] text-muted-foreground"
      >
        <ChevronRight size={12} className={open ? 'rotate-90' : ''} />
        <StatusIcon status={status} size={11} />
        <span className="min-w-0 flex-1 truncate">{executionPath(first)}</span>
        <span>{entries.length}</span>
      </summary>
      {children}
    </details>
  );
}
export function ExecutionTree({
  pages,
  expanded,
  selected,
  onSelect,
  onToggle,
  onPage,
  name,
  runSelected,
  onRun,
  origin,
  span,
}: {
  pages: Record<string, ExecutionPage>;
  expanded: Set<string>;
  selected: string | null;
  onSelect: (entry: Execution) => void;
  onToggle: (entry: Execution) => void;
  onPage: (parent: string | null, cursor: number) => void;
  name: (entry: Execution) => string;
  runSelected: boolean;
  onRun: () => void;
  origin: number;
  span: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const revealed = useRef<string | null>(null);
  useEffect(() => {
    if (selected && revealed.current !== selected) {
      const row = root.current?.querySelector('[aria-current="step"]');
      if (row) {
        row.scrollIntoView({ block: 'nearest' });
        revealed.current = selected;
      }
    }
  }, [selected, pages]);
  const renderPage = (parent: string | null, depth: number) => {
    const page = pages[parent || 'root'];
    if (!page) return <p className="px-4 py-2 text-xs text-muted-foreground">{tx('加载中…')}</p>;
    const row = (entry: Execution) => {
      const Internal =
        entry.kind === 'model'
          ? Bot
          : entry.kind === 'tool'
          ? Wrench
          : entry.kind === 'http'
          ? Globe
          : null;
      const path = executionPath(entry);
      return (
        <div key={entry.id}>
          <div
            className="trace-tree-row"
            data-selected={selected === entry.id}
            style={{ paddingLeft: Math.min(depth, 8) * 12 + 8 }}
          >
            {entry.children ? (
              <button
                type="button"
                className="trace-tree-toggle"
                aria-label={expanded.has(entry.id) ? tx('收起步骤') : tx('展开步骤')}
                aria-expanded={expanded.has(entry.id)}
                onClick={() => onToggle(entry)}
              >
                {expanded.has(entry.id) ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
            ) : (
              <span className="w-5 shrink-0" />
            )}
            <button
              type="button"
              className="trace-tree-step"
              aria-current={selected === entry.id ? 'step' : undefined}
              onClick={() => onSelect(entry)}
              title={`${name(entry)} · ${statusLabel(entry.status)}${path ? ` · ${path}` : ''}`}
            >
              <StatusIcon status={entry.status} />
              <span className="min-w-0 flex-1">
                <span className="flex min-w-0 items-center gap-1.5">
                  {Internal && <Internal size={11} className="shrink-0 text-muted-foreground" />}
                  <span className="truncate">{name(entry)}</span>
                  {entry.children > 0 && (
                    <span className="text-[10px] text-muted-foreground">{entry.children}</span>
                  )}
                </span>
                {path && !parent && (
                  <small className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                    {path}
                  </small>
                )}
                <span className="trace-mini-track">
                  <span
                    data-status={entry.status}
                    style={{
                      left: `${Math.max(
                        0,
                        ((Date.parse(entry.startedAt) - origin) / span) * 100
                      )}%`,
                      width: `${Math.min(
                        100,
                        Math.max(1, ((entry.durationMs || 0) / span) * 100)
                      )}%`,
                    }}
                  />
                </span>
              </span>
              <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                {duration(entry.durationMs)}
              </span>
            </button>
          </div>
          {expanded.has(entry.id) && entry.children > 0 && renderPage(entry.id, depth + 1)}
        </div>
      );
    };
    const groups: { key: string; entries: Execution[]; grouped: boolean }[] = [];
    for (const entry of page.executions) {
      const grouped = !!parent && !!entry.iterationPath.length;
      const key = grouped ? entry.scopeId : entry.id;
      const last = groups[groups.length - 1];
      if (last?.key === key) last.entries.push(entry);
      else groups.push({ key, entries: [entry], grouped });
    }
    return (
      <>
        {page.previousCursor != null && (
          <Button
            className="m-2"
            size="sm"
            variant="ghost"
            onClick={() => onPage(parent, page.previousCursor!)}
          >
            {tx('加载更早步骤')}
          </Button>
        )}
        {groups.map((group) =>
          group.grouped ? (
            <IterationGroup
              key={group.key}
              depth={depth}
              entries={group.entries}
              selected={selected}
            >
              {group.entries.map(row)}
            </IterationGroup>
          ) : (
            group.entries.map(row)
          )
        )}
        {page.nextCursor != null && (
          <Button
            className="m-2"
            size="sm"
            variant="ghost"
            onClick={() => onPage(parent, page.nextCursor!)}
          >
            {tx('加载更多步骤')}
          </Button>
        )}
      </>
    );
  };
  return (
    <div ref={root} className="min-h-0 flex-1 overflow-auto" aria-label={tx('执行过程')}>
      <button type="button" className="trace-run-row" data-selected={runSelected} onClick={onRun}>
        {tx('运行概览')}
      </button>
      {renderPage(null, 0)}
    </div>
  );
}
