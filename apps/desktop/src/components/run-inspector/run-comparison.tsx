/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useState } from 'react';

import { ArrowLeft } from 'lucide-react';

import { WorkspaceHeader } from '../workspace-header';
import { Select } from '../ui/select';
import { DataViewer } from '../ui/data-viewer';
import { Button } from '../ui/button';
import type { RuntimeEvent } from '../../lib/types';
import {
  aggregateStatus,
  duration,
  executionData,
  executionPath,
  instanceKey,
  pairGroups,
  statusLabel,
  type ComparisonGroup,
  type Execution,
  type ExecutionPage,
  type TraceDetail,
} from '../../lib/run-trace';
import { useProject, projectApi } from '../../lib/project-context';
import { tx, errorText } from '../../lib/i18n';
import { StatusIcon } from './execution-tree';

export interface RunRef {
  id: string;
  requestRoot?: string | null;
}
interface Comparison {
  detail: TraceDetail;
  groups: ComparisonGroup[];
  nodeTest: string | null;
}
const changed = (left?: ComparisonGroup, right?: ComparisonGroup) =>
  !left ||
  !right ||
  left.configHash !== right.configHash ||
  JSON.stringify(left.counts) !== JSON.stringify(right.counts) ||
  (!!left.modelHash && !!right.modelHash && left.modelHash !== right.modelHash);
function Metrics({ group, nodeTest }: { group?: ComparisonGroup; nodeTest: boolean }) {
  if (!group) return <span className="text-muted-foreground">{tx('无记录')}</span>;
  const status = group.executions
    ? aggregateStatus(group.counts)
    : nodeTest
    ? 'untested'
    : 'pending';
  return (
    <div className="space-y-1.5">
      <span className="flex items-center gap-1.5">
        <StatusIcon status={status} />
        {statusLabel(status)}
        <span className="ml-auto tabular-nums text-muted-foreground">
          {tx('{0} 次执行', [group.executions])}
          {group.counts.failed ? ` · ${tx('{0} 次失败', [group.counts.failed])}` : ''}
        </span>
      </span>
      <span className="block text-[10px] text-muted-foreground">
        {tx('累计节点耗时')}{' '}
        {group.executions
          ? `${group.durationMs != null && group.durationComplete === false ? '≥ ' : ''}${duration(
              group.durationMs
            )}`
          : '—'}
        {group.modelCalls ? ` · ${group.modelCalls} ${tx('模型调用')}` : ''}
      </span>
      {(group.inputTokens !== null || group.outputTokens !== null) && (
        <span className="block text-[10px] text-muted-foreground">
          {group.usageRecorded < group.modelCalls ? '≥ ' : ''}
          {group.inputTokens ?? '—'} / {group.outputTokens ?? '—'} tokens
        </span>
      )}
    </div>
  );
}
function InstanceSide({
  group,
  reference,
  preferredId,
  match,
  onMatch,
  origin,
}: {
  group?: ComparisonGroup;
  reference: RunRef;
  preferredId?: string | null;
  match?: { key: string; id: string } | null;
  onMatch?: (entry: Execution) => void;
  origin?: TraceDetail['trace']['origin'];
}) {
  const { projectId, request } = useProject();
  const local = projectApi(projectId);
  const fetcher =
    reference.requestRoot === undefined
      ? request
      : <T,>(path: string, method = 'GET', body?: unknown, signal?: AbortSignal) =>
          local<T>(
            reference.requestRoot
              ? path.replace('/api/runs', `${reference.requestRoot}/runs`)
              : path,
            method,
            body,
            signal
          );
  const [page, setPage] = useState<ExecutionPage | null>(null);
  const [selected, setSelected] = useState<Execution | null>(null);
  const [events, setEvents] = useState<RuntimeEvent[]>([]);
  const [error, setError] = useState('');
  const path = group
    ? `/api/runs/${reference.id}?view=executions&workflowId=${encodeURIComponent(
        group.workflowId
      )}&nodeId=${encodeURIComponent(group.nodeId)}`
    : '';
  useEffect(() => {
    setPage(null);
    setSelected(null);
    setEvents([]);
    setError('');
    if (!group) return;
    const controller = new AbortController();
    void fetcher<ExecutionPage>(
      `${path}${preferredId ? `&execution=${encodeURIComponent(preferredId)}` : ''}`,
      'GET',
      undefined,
      controller.signal
    )
      .then((next) => {
        if (controller.signal.aborted) return;
        setPage(next);
        const entry =
          next.executions.find((entry) => entry.id === preferredId) ||
          next.executions.find((entry) => entry.status === 'failed') ||
          next.executions[0] ||
          null;
        setSelected(entry);
        if (entry) onMatch?.(entry);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      });
    return () => controller.abort();
  }, [path, reference.requestRoot]);
  useEffect(() => {
    if (!match || !page) return;
    const entry =
      page.executions.find((entry) => instanceKey(entry) === match.key) ||
      (origin?.executionId === match.id && page.executions.length === 1
        ? page.executions[0]
        : undefined);
    setSelected(entry || null);
  }, [match?.key, match?.id, page]);
  useEffect(() => {
    setEvents([]);
    if (!selected) return;
    const controller = new AbortController();
    void fetcher<{ events: RuntimeEvent[] }>(
      `/api/runs/${reference.id}?view=execution&execution=${encodeURIComponent(selected.id)}`,
      'GET',
      undefined,
      controller.signal
    )
      .then((next) => {
        if (!controller.signal.aborted) setEvents(next.events);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      });
    return () => controller.abort();
  }, [selected?.id, reference.id, reference.requestRoot]);
  async function load(cursor: number) {
    try {
      const next = await fetcher<ExecutionPage>(`${path}&cursor=${cursor}`);
      setPage((previous) => ({
        ...next,
        executions: [
          ...(previous?.executions || []),
          ...next.executions.filter(
            (entry) => !previous?.executions.some((value) => value.id === entry.id)
          ),
        ],
      }));
    } catch (cause) {
      setError((cause as Error).message);
    }
  }
  const data = executionData(events);
  return (
    <section className="min-w-0 flex-1 overflow-auto p-4" aria-label={reference.id}>
      {group ? (
        <>
          <Select
            className="mb-3 w-full"
            aria-label={tx('选择对比执行实例')}
            placeholder={tx('无对应执行实例')}
            value={selected?.id || ''}
            options={[
              { value: '', label: tx('无对应执行实例') },
              ...(page?.executions || []).map((entry) => ({
                value: entry.id,
                label: `${executionPath(entry) || tx('工作流主路径')} · ${statusLabel(
                  entry.status
                )} · ${entry.id.slice(0, 6)}`,
              })),
            ]}
            onValueChange={(id) => {
              const entry = page?.executions.find((entry) => entry.id === id) || null;
              setSelected(entry);
              if (entry) onMatch?.(entry);
            }}
          />
          {page?.previousCursor != null && (
            <Button size="sm" variant="ghost" onClick={() => void load(page.previousCursor!)}>
              {tx('加载更早步骤')}
            </Button>
          )}
          {page?.nextCursor != null && (
            <Button size="sm" variant="ghost" onClick={() => void load(page.nextCursor!)}>
              {tx('加载更多')}
            </Button>
          )}
        </>
      ) : (
        <p className="text-xs text-muted-foreground">{tx('此运行未记录此节点')}</p>
      )}
      {error && (
        <p role="alert" className="mb-3 text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      {data.error && <p className="trace-error mb-4 text-xs">{errorText(data.error)}</p>}
      <h4 className="my-3 text-xs font-medium">{tx('实际输入')}</h4>
      <DataViewer key={`input:${selected?.id}`} value={data.inputs} label={tx('实际输入')} />
      <h4 className="mb-3 mt-6 text-xs font-medium">{tx('实际输出')}</h4>
      <DataViewer key={`output:${selected?.id}`} value={data.outputs} label={tx('实际输出')} />
    </section>
  );
}
export function RunComparison({
  left,
  right,
  onBack,
}: {
  left: RunRef;
  right: RunRef;
  onBack: () => void;
}) {
  const { projectId, request } = useProject();
  const [data, setData] = useState<[Comparison, Comparison] | null>(null);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('nodes');
  const [onlyChanges, setOnlyChanges] = useState(false);
  const [groupLimit, setGroupLimit] = useState(100);
  const [selection, setSelection] = useState<ReturnType<typeof pairGroups>[number] | null>(null);
  const [match, setMatch] = useState<{ key: string; id: string } | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError('');
    async function load(reference: RunRef): Promise<Comparison> {
      const local = projectApi(projectId);
      const fetcher =
        reference.requestRoot === undefined
          ? request
          : <T,>(path: string) =>
              local<T>(
                reference.requestRoot
                  ? path.replace('/api/runs', `${reference.requestRoot}/runs`)
                  : path,
                'GET',
                undefined,
                controller.signal
              );
      const [detail, groups] = await Promise.all([
        fetcher<TraceDetail>(`/api/runs/${reference.id}?view=overview`),
        fetcher<{ groups: ComparisonGroup[]; nodeTest: string | null }>(
          `/api/runs/${reference.id}?view=compare`
        ),
      ]);
      return { detail, ...groups };
    }
    void Promise.all([load(left), load(right)])
      .then((next) => {
        if (!controller.signal.aborted) setData(next);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      });
    return () => controller.abort();
  }, [left.id, left.requestRoot, right.id, right.requestRoot, request, projectId]);
  return (
    <section className="flex h-full min-h-0 flex-col bg-background" aria-label={tx('运行对比')}>
      <WorkspaceHeader
        title={tx('运行对比')}
        leading={
          <Button
            autoFocus
            variant="ghost"
            onClick={() => (selection ? setSelection(null) : onBack())}
          >
            <ArrowLeft />
            {selection ? tx('返回节点汇总') : tx('返回运行详情')}
          </Button>
        }
      />
      {error ? (
        <p role="alert" className="p-5 text-xs text-destructive">
          {errorText(error)}
        </p>
      ) : !data ? (
        <p className="p-5 text-xs text-muted-foreground">{tx('加载中…')}</p>
      ) : (
        <>
          <div className="grid shrink-0 grid-cols-2 border-b border-border">
            {data.map((value, index) => (
              <div className={`min-w-0 p-4 ${index ? 'border-l border-border' : ''}`} key={index}>
                <p className="truncate text-xs font-medium">
                  {value.detail.snapshot?.name || tx('工作流')} · v{value.detail.run.revision}
                </p>
                <p className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <StatusIcon status={value.detail.run.status} />
                  {statusLabel(value.detail.run.status)} · {duration(value.detail.trace.durationMs)}{' '}
                  · {value.detail.run.id.slice(0, 8)}
                  {value.nodeTest && ` · ${tx('节点测试')}`}
                </p>
              </div>
            ))}
          </div>
          {selection ? (
            <>
              <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 text-xs">
                <span>{selection.left?.name || selection.right?.name}</span>
                <span className="text-[10px] text-muted-foreground">
                  {tx('按调用路径、分支与轮次匹配，可独立切换实例。')}
                </span>
              </div>
              <div className="flex min-h-0 flex-1 divide-x divide-border">
                <InstanceSide
                  group={selection.left}
                  reference={left}
                  preferredId={
                    data[1].detail.trace.origin?.runId === left.id
                      ? data[1].detail.trace.origin.executionId
                      : undefined
                  }
                  onMatch={(entry) => setMatch({ key: instanceKey(entry), id: entry.id })}
                />
                <InstanceSide
                  group={selection.right}
                  reference={right}
                  match={match}
                  origin={data[1].detail.trace.origin}
                />
              </div>
            </>
          ) : (
            <>
              <div className="trace-tabs shrink-0" role="tablist" aria-label={tx('对比内容')}>
                {[
                  ['nodes', '节点汇总'],
                  ['inputs', '运行输入'],
                  ['outputs', '运行结果'],
                ].map(([value, label]) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === value}
                    key={value}
                    onClick={() => setTab(value)}
                  >
                    {tx(label)}
                  </button>
                ))}
              </div>
              {tab === 'nodes' ? (
                <div className="min-h-0 flex-1 overflow-auto">
                  <label className="flex items-center gap-2 p-4 text-[10px] text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={onlyChanges}
                      onChange={(event) => setOnlyChanges(event.target.checked)}
                    />
                    {tx('仅状态与配置差异')}
                  </label>
                  <div className="px-4 pb-3 text-[10px] text-muted-foreground">
                    {tx(
                      '耗时按节点累计，不等于并行工作流的总耗时。Token 按输入 / 输出展示，≥ 表示用量未完整采集。'
                    )}
                  </div>
                  {pairGroups(data[0].groups, data[1].groups)
                    .filter((pair) => !onlyChanges || changed(pair.left, pair.right))
                    .slice(0, groupLimit)
                    .map((pair) => (
                      <button
                        type="button"
                        key={pair.key}
                        className="grid w-full grid-cols-[minmax(140px,1fr)_minmax(180px,1.3fr)_minmax(180px,1.3fr)] items-center gap-5 border-t border-border px-4 py-4 text-left text-xs hover:bg-secondary/35"
                        onClick={() => {
                          setMatch(null);
                          setSelection(pair);
                        }}
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-medium">
                            {pair.left?.name || pair.right?.name}
                          </span>
                          <span className="mt-1 block truncate text-[10px] text-muted-foreground">
                            {pair.left?.workflowName || pair.right?.workflowName}
                          </span>
                          {pair.left &&
                            pair.right &&
                            (pair.left.configHash !== pair.right.configHash ||
                              (pair.left.modelHash &&
                                pair.right.modelHash &&
                                pair.left.modelHash !== pair.right.modelHash)) && (
                              <small className="mt-1 block text-muted-foreground">
                                {tx('配置变化')}
                              </small>
                            )}
                        </span>
                        <Metrics group={pair.left} nodeTest={!!data[0].nodeTest} />
                        <Metrics group={pair.right} nodeTest={!!data[1].nodeTest} />
                      </button>
                    ))}
                  {pairGroups(data[0].groups, data[1].groups).filter(
                    (pair) => !onlyChanges || changed(pair.left, pair.right)
                  ).length > groupLimit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setGroupLimit(groupLimit + 100)}
                    >
                      {tx('加载更多')}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid min-h-0 flex-1 grid-cols-2 divide-x divide-border">
                  {data.map((value, index) => (
                    <div key={index} className="min-w-0 overflow-auto p-4">
                      <DataViewer
                        value={
                          tab === 'inputs' ? value.detail.run.inputs : value.detail.run.outputs
                        }
                        label={tx(tab === 'inputs' ? '运行输入' : '运行结果')}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
