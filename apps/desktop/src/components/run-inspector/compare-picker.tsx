/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useState } from 'react';

import { Input } from '../ui/input';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { duration, statusLabel } from '../../lib/run-trace';
import { useProjectApi } from '../../lib/project-context';
import { tx, errorText } from '../../lib/i18n';
import type { RunListEntry } from './run-list';
import { StatusIcon } from './execution-tree';

export function ComparePicker({
  id,
  onClose,
  onPick,
}: {
  id: string;
  onClose: () => void;
  onPick: (id: string) => void;
}) {
  const api = useProjectApi();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [runs, setRuns] = useState<RunListEntry[]>([]);
  const [next, setNext] = useState<{ time: string; id: string } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => setSearch(query), 180);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    const controller = new AbortController();
    void api<{ runs: RunListEntry[]; next: { time: string; id: string } | null }>(
      `/api/runs?search=${encodeURIComponent(search)}`,
      'GET',
      undefined,
      controller.signal
    )
      .then((page) => {
        setRuns(page.runs.filter((run) => run.id !== id));
        setNext(page.next);
        setError('');
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      });
    return () => controller.abort();
  }, [search, api, id]);
  async function more() {
    if (!next) return;
    try {
      const page = await api<{ runs: RunListEntry[]; next: { time: string; id: string } | null }>(
        `/api/runs?search=${encodeURIComponent(search)}&beforeTime=${encodeURIComponent(
          next.time
        )}&beforeId=${encodeURIComponent(next.id)}`
      );
      setRuns((previous) => [...previous, ...page.runs.filter((run) => run.id !== id)]);
      setNext(page.next);
    } catch (cause) {
      setError((cause as Error).message);
    }
  }
  return (
    <Dialog
      open
      title={tx('选择对比运行')}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={tx('搜索运行')}
        aria-label={tx('搜索对比运行')}
      />
      {error && (
        <p role="alert" className="mt-3 text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      <div className="mt-3 max-h-96 overflow-auto">
        {runs.map((run) => (
          <button
            type="button"
            key={run.id}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-3 text-left hover:bg-secondary"
            onClick={() => onPick(run.id)}
          >
            <StatusIcon status={run.status} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium">
                {run.workflowName || tx('工作流')} · v{run.revision}
              </span>
              <span className="mt-1 block text-[10px] text-muted-foreground">
                {new Date(run.createdAt).toLocaleString()} · {statusLabel(run.status)} ·{' '}
                {duration(run.durationMs)} · {run.id.slice(0, 8)}
              </span>
            </span>
          </button>
        ))}
        {next && (
          <Button variant="ghost" size="sm" onClick={() => void more()}>
            {tx('加载更多')}
          </Button>
        )}
        {!runs.length && !error && (
          <p className="p-6 text-center text-xs text-muted-foreground">
            {tx('没有符合条件的运行记录')}
          </p>
        )}
      </div>
    </Dialog>
  );
}
