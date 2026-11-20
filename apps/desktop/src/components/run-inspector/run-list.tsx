/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useRef, useState } from 'react';

import { Filter, RefreshCw, Search } from 'lucide-react';

import { Select } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { duration, sourceLabel, statusLabel } from '../../lib/run-trace';
import { useProjectApi } from '../../lib/project-context';
import { tx, errorText } from '../../lib/i18n';
import { StatusIcon } from './execution-tree';

export interface RunListEntry {
  id: string;
  workflowId: string;
  workflowName: string;
  revision: number;
  testNodeId: string | null;
  status: string;
  source: string;
  createdAt: string;
  endedAt: string | null;
  durationMs: number | null;
  error: string | null;
  callbackStatus: string | null;
  callbackAttempts: number | null;
  callbackError: string | null;
  environment: string | null;
  releaseVersion: string | null;
  operation: string | null;
  requestId: string | null;
  businessId: string;
}
interface RunListPage {
  runs: RunListEntry[];
  total: number;
  next: { time: string; id: string } | null;
  workflows: { id: string; name: string }[];
  environments: string[];
}
export function RunList({
  onOpen,
  deployment = false,
}: {
  onOpen: (id: string) => void;
  deployment?: boolean;
}) {
  const api = useProjectApi();
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [period, setPeriod] = useState('all');
  const [environment, setEnvironment] = useState('');
  const [filters, setFilters] = useState(false);
  const [page, setPage] = useState<RunListPage | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const generation = useRef(0);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 200);
    return () => clearTimeout(timer);
  }, [search]);
  const query = new URLSearchParams();
  if (debounced) query.set('search', debounced);
  if (status) query.set('status', status);
  if (source) query.set('source', source);
  if (workflow) query.set('workflowId', workflow);
  if (environment) query.set('environment', environment);
  const filterKey = query.toString() + `&period=${period}`;
  const since = useRef({ key: '', value: '' });
  if (since.current.key !== filterKey)
    since.current = {
      key: filterKey,
      value: period === 'all' ? '' : new Date(Date.now() - Number(period) * 86400000).toISOString(),
    };
  if (since.current.value) query.set('since', since.current.value);
  const path = `/api/runs?${query.toString()}`;
  useEffect(() => {
    const controller = new AbortController();
    const current = ++generation.current;
    setBusy(true);
    setError('');
    void api<RunListPage>(path, 'GET', undefined, controller.signal)
      .then((next) => {
        if (current === generation.current) setPage(next);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      })
      .finally(() => {
        if (current === generation.current) setBusy(false);
      });
    return () => controller.abort();
  }, [path, refresh, api]);
  async function more() {
    if (!page?.next || busy) return;
    const current = generation.current;
    setBusy(true);
    setError('');
    try {
      const next = await api<RunListPage>(
        `${path}&beforeTime=${encodeURIComponent(page.next.time)}&beforeId=${encodeURIComponent(
          page.next.id
        )}`
      );
      if (current === generation.current)
        setPage({
          ...next,
          runs: [
            ...page.runs,
            ...next.runs.filter((entry) => !page.runs.some((previous) => previous.id === entry.id)),
          ],
        });
    } catch (cause) {
      if (current === generation.current) setError((cause as Error).message);
    } finally {
      if (current === generation.current) setBusy(false);
    }
  }
  return (
    <section className="flex min-h-0 flex-1 flex-col" aria-label={tx('运行列表')}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
        <label className="relative min-w-48 flex-1">
          <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
          <Input
            className="pl-9"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label={tx('搜索运行')}
            placeholder={tx('搜索工作流、运行 ID、请求标识或错误')}
          />
        </label>
        <Select
          className="!w-32"
          aria-label={tx('运行状态')}
          value={status}
          onValueChange={setStatus}
          options={[
            { value: '', label: tx('全部状态') },
            ...['running', 'succeeded', 'failed', 'canceled', 'interrupted'].map((value) => ({
              value,
              label: statusLabel(value),
            })),
          ]}
        />
        <Button
          variant="ghost"
          size="icon"
          aria-label={tx('筛选运行')}
          aria-pressed={filters}
          onClick={() => setFilters(!filters)}
        >
          <Filter />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={busy}
          aria-label={tx('刷新运行记录')}
          onClick={() => setRefresh(refresh + 1)}
        >
          <RefreshCw className={busy ? 'animate-spin' : ''} />
        </Button>
      </div>
      {filters && (
        <div className="flex flex-wrap gap-2 border-b border-border px-4 pb-3 pt-1">
          <Select
            className="min-w-40 flex-1"
            aria-label={tx('筛选工作流')}
            value={workflow}
            onValueChange={setWorkflow}
            options={[
              { value: '', label: tx('全部工作流') },
              ...(page?.workflows || []).map((value) => ({
                value: value.id,
                label: value.name || value.id.slice(0, 8),
              })),
            ]}
          />
          {!deployment && (
            <Select
              className="!w-36"
              aria-label={tx('发起来源')}
              value={source}
              onValueChange={setSource}
              options={[
                { value: '', label: tx('全部来源') },
                ...['manual', 'agent', 'node_test', 'published', 'debug'].map((value) => ({
                  value,
                  label: sourceLabel(value),
                })),
              ]}
            />
          )}
          <Select
            className="!w-36"
            aria-label={tx('时间范围')}
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: 'all', label: tx('全部时间') },
              { value: '1', label: tx('最近 24 小时') },
              { value: '7', label: tx('最近 7 天') },
              { value: '30', label: tx('最近 30 天') },
            ]}
          />
          {!deployment && !!page?.environments.length && (
            <Select
              className="!w-36"
              aria-label={tx('环境')}
              value={environment}
              onValueChange={setEnvironment}
              options={[
                { value: '', label: tx('全部环境') },
                ...page.environments.map((value) => ({ value, label: value })),
              ]}
            />
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="px-4 py-3 text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      <div className="min-h-0 flex-1 overflow-auto" aria-busy={busy}>
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead className="sticky top-0 z-10 bg-background text-[10px] text-muted-foreground">
            <tr>
              {['工作流', '状态', '来源 / 环境', '版本', '耗时', '开始时间'].map((label) => (
                <th className="border-b border-border px-4 py-3 font-normal" key={label}>
                  {tx(label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {page?.runs.map((run) => (
              <tr key={run.id} className="group border-b border-border/60 hover:bg-secondary/35">
                <td className="max-w-72 px-4 py-3">
                  <button
                    type="button"
                    className="block w-full text-left"
                    onClick={() => onOpen(run.id)}
                  >
                    <span
                      className="block truncate font-medium group-hover:underline"
                      title={run.workflowName}
                    >
                      {run.workflowName || run.workflowId.slice(0, 8)}
                    </span>
                    <span
                      className="mt-1 block truncate text-[10px] text-muted-foreground"
                      title={run.id}
                    >
                      {run.businessId || run.requestId || run.id.slice(0, 8)}
                    </span>
                    {run.error && (
                      <span
                        className="mt-1 block max-w-64 truncate text-[10px] text-destructive"
                        title={errorText(run.error)}
                      >
                        {errorText(run.error)}
                      </span>
                    )}
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <StatusIcon status={run.status} />
                    {statusLabel(run.status)}
                  </span>
                  {run.callbackStatus && (
                    <span
                      className="mt-1 block text-[10px] text-muted-foreground"
                      title={run.callbackError ? errorText(run.callbackError) : undefined}
                    >
                      {tx('回调')} ·{' '}
                      {tx(
                        (
                          {
                            delivered: '已送达',
                            pending: '等待重投',
                            failed: '投递失败',
                          } as Record<string, string>
                        )[run.callbackStatus] || run.callbackStatus
                      )}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <span className="block whitespace-nowrap">{sourceLabel(run.source)}</span>
                  {run.environment && <small className="mt-1 block">{run.environment}</small>}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">
                  {run.releaseVersion || `v${run.revision}`}
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-muted-foreground">
                  {duration(run.durationMs)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                  {new Date(run.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!page?.runs.length && !busy && (
          <p className="p-8 text-center text-xs text-muted-foreground">
            {tx('没有符合条件的运行记录')}
          </p>
        )}
        <div className="flex items-center justify-between p-4 text-[10px] text-muted-foreground">
          <span>
            {page ? tx('已显示 {0} / {1} 次运行', [page.runs.length, page.total]) : tx('加载中…')}
          </span>
          {page?.next && (
            <Button variant="ghost" size="sm" disabled={busy} onClick={() => void more()}>
              {tx('加载更多')}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
