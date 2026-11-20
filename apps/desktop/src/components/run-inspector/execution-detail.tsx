/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useState } from 'react';

import { ArrowUpRight, ChevronRight } from 'lucide-react';

import { DataViewer } from '../ui/data-viewer';
import { Button } from '../ui/button';
import type { RuntimeEvent, WorkflowNode } from '../../lib/types';
import {
  duration,
  reasonLabel,
  executionData,
  executionPath,
  parseEvent,
  sourceLabel,
  statusLabel,
  type Execution,
  type TraceDetail,
} from '../../lib/run-trace';
import { errorText, tx } from '../../lib/i18n';
import { StatusIcon } from './execution-tree';

function Fact({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-xs">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-right">{String(value ?? '—')}</dd>
    </div>
  );
}
export function ExecutionDetail({
  detail,
  entry,
  node,
  events,
  loading,
  error,
  name,
  onSource,
  onDependency,
  onNodeTest,
  compact = false,
}: {
  detail: TraceDetail;
  entry: Execution | null;
  node: WorkflowNode | undefined;
  events: RuntimeEvent[];
  loading: boolean;
  error: string;
  name: string;
  onSource: (nodeId: string) => void;
  onDependency?: () => void;
  onNodeTest?: () => void;
  compact?: boolean;
}) {
  const [tab, setTab] = useState('overview');
  const [compactTab, setCompactTab] = useState('outputs');
  const data = executionData(events);
  const inputs = entry ? data.inputs : node ? undefined : detail.run.inputs;
  const outputs = entry
    ? data.outputs
    : node || !detail.trace.outputsAvailable
    ? undefined
    : detail.run.outputs;
  const errorMessage = entry ? data.error || entry.reason : node ? undefined : detail.run.error;
  const metadata = Object.assign({}, ...events.map(parseEvent)) as Record<string, unknown>;
  const model = (data.metadata.model ||
    detail.models?.find(
      (value) => value.nodeId === entry?.nodeId && value.workflowId === entry?.workflowId
    )?.model) as Record<string, unknown> | undefined;
  const usage = (data.outputs as Record<string, unknown> | undefined)?.usage as
    | Record<string, unknown>
    | undefined;
  const bindings = (node?.data.inputsValues || {}) as Record<
    string,
    { type?: string; content?: unknown }
  >;
  const status =
    entry?.status || (node ? (detail.nodeTest ? 'untested' : 'pending') : detail.run.status);
  const tabs = [
    ['overview', '概览'],
    ['inputs', '输入'],
    ['outputs', '输出'],
    ['logs', '日志'],
    ...(node ? [['configuration', '当时配置']] : []),
  ];
  const activeTab = tabs.some(([key]) => key === tab) ? tab : 'overview';
  if (compact)
    return (
      <section className="flex h-full min-h-0 flex-col" aria-label={tx('步骤详情')}>
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3">
          <span className="min-w-0 flex-1 truncate text-[10px] text-muted-foreground" title={name}>
            {name}
          </span>
          <div
            className="trace-tabs !gap-3 !border-0 !px-0"
            role="tablist"
            aria-label={tx('步骤数据')}
          >
            {[
              ['inputs', '输入'],
              ['outputs', '输出'],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                role="tab"
                aria-selected={compactTab === value}
                onClick={() => setCompactTab(value)}
              >
                {tx(label)}
              </button>
            ))}
          </div>
        </div>
        <div
          className="min-h-0 flex-1 overflow-auto px-3 py-2"
          role="tabpanel"
          aria-label={tx(compactTab === 'inputs' ? '输入' : '输出')}
        >
          {(error || errorMessage) && (
            <p
              className={`mb-2 whitespace-pre-wrap text-xs ${
                status === 'failed' ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {errorText(reasonLabel(String(error || errorMessage)))}
            </p>
          )}
          <DataViewer
            key={`${entry?.id || detail.run.id}:${compactTab}`}
            compact
            value={compactTab === 'inputs' ? inputs : outputs}
            label={tx(compactTab === 'inputs' ? '输入' : '输出')}
          />
        </div>
      </section>
    );
  return (
    <section className="flex h-full min-h-0 flex-col" aria-label={tx('步骤详情')}>
      <header className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <StatusIcon status={status} />
          <h3 className="min-w-0 flex-1 truncate text-sm font-medium" title={name}>
            {name}
          </h3>
          <span className="shrink-0 text-[10px] text-muted-foreground">{statusLabel(status)}</span>
        </div>
        {entry && (
          <p className="mt-1.5 break-words text-[10px] text-muted-foreground">
            {executionPath(entry) || tx('工作流主路径')} · {duration(entry.durationMs)}
          </p>
        )}
      </header>
      <div className="trace-tabs shrink-0" role="tablist" aria-label={tx('步骤数据')}>
        {tabs.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            onClick={() => setTab(key)}
          >
            {tx(label)}
          </button>
        ))}
      </div>
      <div
        className="min-h-0 flex-1 overflow-auto p-4"
        role="tabpanel"
        aria-label={tx(tabs.find(([key]) => key === activeTab)?.[1] || '概览')}
      >
        {error && (
          <p role="alert" className="mb-3 text-xs text-destructive">
            {errorText(error)}
          </p>
        )}
        {loading && !events.length ? (
          <p className="text-xs text-muted-foreground">{tx('加载中…')}</p>
        ) : activeTab === 'inputs' ? (
          <DataViewer
            key={`input:${entry?.id || node?.id || detail.run.id}`}
            value={inputs}
            label={tx('输入')}
          />
        ) : activeTab === 'outputs' ? (
          <DataViewer
            key={`output:${entry?.id || node?.id || detail.run.id}`}
            value={outputs}
            label={tx('输出')}
          />
        ) : activeTab === 'configuration' ? (
          <DataViewer key={node?.id} value={node?.data} label={tx('当时配置')} />
        ) : activeTab === 'logs' ? (
          <div className="space-y-3">
            {events.length ? (
              events.map((event) => (
                <details
                  key={event.sequence}
                  className="rounded-lg border border-border p-3 text-xs"
                >
                  <summary className="cursor-pointer break-all">
                    {event.kind}
                    <time className="mt-1 block text-[10px] text-muted-foreground">
                      #{event.sequence} · {new Date(event.createdAt).toLocaleTimeString()}
                    </time>
                  </summary>
                  <div className="mt-3">
                    <DataViewer value={parseEvent(event)} label={event.kind} />
                  </div>
                </details>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                {entry ? tx('此步骤没有其他日志') : tx('选择步骤查看关联日志')}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {errorMessage && (
              <div
                className={
                  status === 'failed' ? 'trace-error' : 'rounded-lg border border-border p-3'
                }
              >
                <p className="mb-1 text-xs font-medium">
                  {status === 'failed' ? tx('错误原因') : tx('状态说明')}
                </p>
                <p className="whitespace-pre-wrap break-words text-xs leading-relaxed">
                  {errorText(reasonLabel(String(errorMessage)))}
                </p>
              </div>
            )}
            {!entry && node && (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {detail.nodeTest
                  ? tx('此节点不在本次测试范围内，画布仅用于查看当时上下文。')
                  : tx('此节点没有执行记录，请检查分支条件和上游状态。')}
              </p>
            )}
            {metadata.errorDetails !== undefined && (
              <section>
                <h4 className="mb-2 text-xs font-medium">{tx('模型服务响应')}</h4>
                <DataViewer value={metadata.errorDetails} label={tx('模型服务响应')} />
              </section>
            )}
            {metadata.partial === true && (
              <p className="text-xs text-muted-foreground">
                {tx('此处保留中断前的部分输出，并非完整结果。')}
              </p>
            )}
            <dl>
              {entry ? (
                <>
                  <Fact label={tx('开始时间')} value={new Date(entry.startedAt).toLocaleString()} />
                  <Fact
                    label={tx('结束时间')}
                    value={entry.endedAt ? new Date(entry.endedAt).toLocaleString() : undefined}
                  />
                  <Fact label={tx('耗时')} value={duration(entry.durationMs)} />
                  {data.firstOutputMs !== undefined && (
                    <Fact label={tx('首次输出')} value={duration(data.firstOutputMs)} />
                  )}
                  <Fact label={tx('子步骤')} value={entry.children} />
                  {entry.attempt > 1 && <Fact label={tx('尝试次数')} value={entry.attempt} />}
                </>
              ) : (
                <>
                  <Fact label={tx('发起来源')} value={sourceLabel(detail.trace.source)} />
                  <Fact label={tx('执行版本')} value={`v${detail.run.revision}`} />
                  <Fact
                    label={tx('开始时间')}
                    value={new Date(detail.run.createdAt).toLocaleString()}
                  />
                  <Fact label={tx('耗时')} value={duration(detail.trace.durationMs)} />
                  <Fact label={tx('执行步骤')} value={detail.trace.total} />
                  {detail.trace.publication && (
                    <>
                      <Fact label={tx('环境')} value={detail.trace.publication.environment} />
                      <Fact label={tx('发布版本')} value={detail.trace.publication.version} />
                      <Fact label={tx('操作')} value={detail.trace.publication.operation} />
                    </>
                  )}
                </>
              )}
            </dl>
            {model && (
              <section>
                <h4 className="mb-2 text-xs font-medium">{tx('模型')}</h4>
                <dl>
                  <Fact label={tx('模型')} value={model.modelName} />
                  <Fact label={tx('连接')} value={model.connectionName} />
                  <Fact label={tx('上游模型')} value={model.upstreamModel} />
                </dl>
                {usage && (
                  <div className="mt-2">
                    <DataViewer value={usage} label={tx('Token 用量')} />
                  </div>
                )}
              </section>
            )}
            {entry?.kind === 'http' && (
              <dl>
                <Fact
                  label={tx('请求方法')}
                  value={(inputs as Record<string, unknown>)?.method || 'GET'}
                />
                <Fact label={tx('请求地址')} value={(inputs as Record<string, unknown>)?.url} />
                <Fact
                  label={tx('响应状态')}
                  value={(outputs as Record<string, unknown>)?.statusCode}
                />
              </dl>
            )}
            {typeof metadata.branch === 'string' && (
              <Fact label={tx('命中分支')} value={metadata.branch} />
            )}
            {metadata.policy != null && <Fact label={tx('等待策略')} value={metadata.policy} />}
            {Object.entries(bindings).some(([, value]) => value?.type === 'ref') && (
              <section>
                <h4 className="mb-2 text-xs font-medium">{tx('输入来源')}</h4>
                {Object.entries(bindings)
                  .filter(([, value]) => value?.type === 'ref')
                  .map(([field, value]) => (
                    <button
                      key={field}
                      type="button"
                      className="mb-1 flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-xs hover:bg-secondary"
                      onClick={() => onSource(String((value.content as unknown[])?.[0] || ''))}
                    >
                      <span className="min-w-0 break-all">
                        {field}
                        <span className="mt-1 block text-[10px] text-muted-foreground">
                          {Array.isArray(value.content)
                            ? value.content.join('.')
                            : String(value.content)}
                        </span>
                      </span>
                      <ChevronRight size={13} />
                    </button>
                  ))}
              </section>
            )}
            {onDependency && (
              <Button variant="outline" size="sm" onClick={onDependency}>
                <ArrowUpRight />
                {tx('查看子工作流快照')}
              </Button>
            )}
            {onNodeTest && entry?.inputsAvailable && (
              <Button variant="outline" size="sm" onClick={onNodeTest}>
                {tx('用此输入测试节点')}
              </Button>
            )}
            {outputs !== undefined && (
              <section>
                <h4 className="mb-2 text-xs font-medium">{tx('输出预览')}</h4>
                <DataViewer
                  key={`preview:${entry?.id || detail.run.id}`}
                  value={outputs}
                  label={tx('输出')}
                />
              </section>
            )}
            <details className="text-[10px] text-muted-foreground">
              <summary className="cursor-pointer">{tx('技术信息')}</summary>
              <dl className="mt-2">
                <Fact label="Run ID" value={detail.run.id} />
                {entry && (
                  <>
                    <Fact label="Execution ID" value={entry.id} />
                    <Fact label="Scope ID" value={entry.scopeId} />
                    <Fact label="Workflow ID" value={entry.workflowId} />
                  </>
                )}
                <Fact
                  label={tx('运行时')}
                  value={
                    detail.trace.runtime === 'not_recorded'
                      ? tx('未采集此数据')
                      : detail.trace.runtime
                  }
                />
              </dl>
            </details>
          </div>
        )}
      </div>
    </section>
  );
}
