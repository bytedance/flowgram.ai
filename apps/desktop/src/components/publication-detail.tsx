/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useEffect, useState } from 'react';

import { ArrowDownToLine, ArrowLeft, ArrowUpRight, Plus, RefreshCw, Settings2 } from 'lucide-react';

import type { Workflow } from '../lib/types';
import { downloadJson, serviceExample } from '../lib/services';
import { ProjectScope } from '../lib/project-context';
import { tx, t, errorText } from '../lib/i18n';
import {
  deploymentPath,
  type DeploymentInventory,
  type Publication,
  type PublicationActivation,
  type PublicationDetail,
  type TargetDetail,
} from '../lib/deployment';
import { api } from '../lib/api';
import { Select } from './ui/select';
import { Input } from './ui/input';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { RunPage } from './run-page';
import { RunList } from './run-inspector/run-list';
import { DeploymentCode, DeploymentEmpty, DeploymentField } from './deployment-ui';
import { DeploymentModels } from './deployment-models';

export function PublicationDetails({
  active,
  detail,
  publication,
  inventory,
  onBack,
  onConfigure,
  reload,
  openWorkflow,
}: {
  active: boolean;
  detail: PublicationDetail;
  publication: Publication;
  inventory: DeploymentInventory;
  onBack: () => void;
  onConfigure: () => void;
  reload: () => Promise<void>;
  openWorkflow: (project: string, id: string) => void;
  openRun: (project: string, id: string) => void;
}) {
  const [releaseWorkflows, setReleaseWorkflows] = useState<Workflow[]>([]);
  const [tab, setTab] = useState('overview');
  const [viewRun, setViewRun] = useState<{ id: string; root: string } | null>(null);
  const [selection, setSelection] = useState(0);
  const [target, setTarget] = useState<TargetDetail | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [counter, setCounter] = useState(0);
  const [operation, setOperation] = useState('');
  const [newCaller, setNewCaller] = useState(false);
  const [callerName, setCallerName] = useState('');
  const [allowed, setAllowed] = useState<string[]>([]);
  const [canCancel, setCanCancel] = useState(false);
  const [token, setToken] = useState('');
  const [deployVersion, setDeployVersion] = useState('');
  const [activation, setActivation] = useState<PublicationActivation | null>(null);
  useEffect(() => {
    if (!active) {
      setToken('');
      setNewCaller(false);
      setActivation(null);
    }
  }, [active]);
  const deployed = publication.deployments[selection];
  const live = detail.releases.find((r) => r.version === target?.deployment.version);
  const latest = detail.releases[0];
  const release = live || latest;
  const op = live?.operations.find((op) => op.name === operation) || live?.operations[0];
  const targetRoot = deployed
    ? `${deploymentPath(detail.id)}/targets/${deployed.targetId}/${deployed.environment}`
    : '';
  const runRequest = useCallback(
    <T,>(path: string, method = 'GET', body?: unknown, signal?: AbortSignal) =>
      api<T>(
        path.replace('/api/runs', `${viewRun?.root || targetRoot}/runs`),
        method,
        body,
        signal
      ),
    [viewRun?.root, targetRoot]
  );

  useEffect(() => {
    setTarget(null);
    setError('');
    setToken('');
    if (!deployed) return;
    const controller = new AbortController();
    void api<TargetDetail>(targetRoot, 'GET', undefined, controller.signal)
      .then(setTarget)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [targetRoot, deployed, counter]);
  async function act(action: () => Promise<void>) {
    setBusy(true);
    setError('');
    try {
      await action();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  function beginDeploy(version: string) {
    setDeployVersion(version);
    setReleaseWorkflows([]);
    void act(async () => {
      const bundle = await api<{ workflows: Workflow[] }>(
        `${deploymentPath(detail.id)}/releases/${encodeURIComponent(version)}`
      );
      setReleaseWorkflows(bundle.workflows);
    });
    const d = detail.draft;
    setActivation(
      deployed
        ? { ...deployed, version }
        : {
            targetId: d.targetId,
            environment: d.environment,
            version,
            enabled: true,
            maxConcurrency: d.maxConcurrency,
            bindings: d.bindings,
            credentialBindings: d.credentialBindings,
            modelBindings: d.modelBindings || {},
            callback: d.callback,
          }
    );
  }
  if (viewRun)
    return (
      <div className="h-[calc(100vh-240px)] min-h-96">
        <ProjectScope projectId={detail.projectId} requestOverride={runRequest}>
          <RunPage
            id={viewRun.id}
            requestRoot={viewRun.root}
            onDebugPrepared={(workflow) => openWorkflow(detail.projectId, workflow.id)}
            workflows={detail.workflows}
            sessions={[]}
            onWorkflow={(id) => openWorkflow(detail.projectId, id)}
            onSession={() => {}}
            onClose={() => setViewRun(null)}
            headerLeading={
              <Button variant="ghost" onClick={() => setViewRun(null)}>
                <ArrowLeft />
                {tx('返回发布详情')}
              </Button>
            }
          />
        </ProjectScope>
      </div>
    );
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" className="-ml-3" onClick={onBack}>
          <ArrowLeft />
          {tx('发布')}
        </Button>
        <span className="text-muted-foreground">/</span>
        <span className="min-w-0 truncate text-sm">{publication.title}</span>
        <Button className="ml-auto" onClick={onConfigure}>
          <Plus />
          {tx(publication.versionCount ? '发布新版本' : '继续配置')}
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-medium">{publication.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {inventory.projects.find((p) => p.id === detail.projectId)?.name} · {tx('项目发布')}
        </p>
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
        >
          {errorText(error)}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
        {deployed ? (
          <>
            <Select
              style={{ width: '17rem', maxWidth: '100%' }}
              aria-label={tx('发布目标')}
              value={String(selection)}
              onValueChange={(v) => setSelection(Number(v))}
              options={publication.deployments.map((d, i) => ({
                value: String(i),
                label: `${
                  d.targetId === 'local'
                    ? tx('本机运行服务')
                    : inventory.targets.find((t) => t.id === d.targetId)?.name || d.targetId
                } · ${d.environment}`,
              }))}
            />
            <span className="text-xs text-muted-foreground">
              {target
                ? `${target.deployment.version} · ${tx(
                    target.deployment.enabled ? '已启用' : '已停用'
                  )}`
                : tx('尚未确认目标状态')}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label={tx('刷新状态')}
              onClick={() => setCounter((v) => v + 1)}
              disabled={busy}
            >
              <RefreshCw size={14} />
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            {tx(
              latest ? '版本已创建，尚未部署到运行服务。可在版本中重试部署。' : '此发布配置尚未发布'
            )}
          </p>
        )}
        <Button variant="ghost" size="sm" className="ml-auto" onClick={onConfigure}>
          <Settings2 />
          {tx('编辑配置')}
        </Button>
      </div>
      <nav
        className="flex gap-6 overflow-x-auto border-b border-border"
        aria-label={tx('发布详情')}
      >
        {[
          ['overview', '概览'],
          ['connect', '接入'],
          ['versions', '版本'],
          ['callers', '调用授权'],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            aria-current={tab === value ? 'page' : undefined}
            className={`shrink-0 border-b-2 pb-3 text-sm ${
              tab === value ? 'border-foreground' : 'border-transparent text-muted-foreground'
            }`}
          >
            {tx(label)}
          </button>
        ))}
      </nav>
      {tab === 'overview' && (
        <div className="space-y-7">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium">{tx('公开工作流')}</h3>
              <span className="text-xs text-muted-foreground">
                {release?.version || tx('草稿')}
              </span>
            </div>
            {(release?.operations || detail.draft.operations).map((op) => (
              <details key={op.name} className="border-b border-border py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-sm">
                    {detail.workflows.find((w) => w.id === op.workflowId)?.name || op.name}
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">
                      {op.name}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">HTTP · MCP</span>
                </summary>
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">{op.description}</p>
                  <DeploymentCode
                    title={tx('输入契约')}
                    value={JSON.stringify(op.inputSchema, null, 2)}
                  />
                  <DeploymentCode
                    title={tx('输出契约')}
                    value={JSON.stringify(op.outputSchema, null, 2)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openWorkflow(detail.projectId, op.workflowId)}
                  >
                    {tx('打开工作流')}
                    <ArrowUpRight size={13} />
                  </Button>
                </div>
              </details>
            ))}
          </section>
          {target && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">{tx('最近运行')}</h3>
                <span className="text-xs text-muted-foreground">{tx('当前发布目标')}</span>
              </div>
              <div className="flex h-[420px] min-h-64 flex-col overflow-hidden rounded-xl border border-border">
                <ProjectScope projectId={detail.projectId} requestOverride={runRequest}>
                  <RunList deployment onOpen={(id) => setViewRun({ id, root: targetRoot })} />
                </ProjectScope>
              </div>
            </section>
          )}
        </div>
      )}
      {tab === 'connect' &&
        (!target || !live ? (
          <DeploymentEmpty
            title={tx('接入信息尚不可用')}
            description={tx('先部署到运行服务并确认连接，再查看对应版本的接入方式。')}
          />
        ) : (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm">{tx('公开工作流')}</span>
              <Select
                style={{ width: '20rem', maxWidth: '100%' }}
                value={op?.name || ''}
                onValueChange={setOperation}
                options={live.operations.map((o) => ({
                  value: o.name,
                  label: detail.workflows.find((w) => w.id === o.workflowId)?.name || o.name,
                }))}
              />
            </div>
            <p className="text-xs leading-6 text-muted-foreground">
              {tx('先创建调用方凭证。每次业务请求使用独立幂等键，重试复用原键。')}
            </p>
            <DeploymentCode
              title="HTTP"
              value={`curl -X POST '${target.publicBase}/operations/${
                op?.name
              }/invoke?waitMs=30000' \\\n  -H "Authorization: Bearer $FLOWGRAM_SERVICE_TOKEN" \\\n  -H 'Content-Type: application/json' \\\n  -H 'Idempotency-Key: request-001' \\\n  -d '${JSON.stringify(
                op ? serviceExample(op.inputSchema) : {}
              )}'`}
            />
            <DeploymentCode title="OpenAPI" value={`${target.publicBase}/openapi.json`} />
            <DeploymentCode
              title="MCP · Streamable HTTP"
              value={JSON.stringify(
                {
                  mcpServers: {
                    [detail.service]: {
                      type: 'http',
                      url: `${target.publicBase}/mcp`,
                      headers: { Authorization: 'Bearer <SERVICE_TOKEN>' },
                    },
                  },
                },
                null,
                2
              )}
            />
            <details>
              <summary className="cursor-pointer text-sm text-muted-foreground">
                {tx('更多接入方式')}
              </summary>
              <div className="mt-4 space-y-4">
                <DeploymentCode
                  title="MCP · stdio"
                  value={JSON.stringify(
                    {
                      mcpServers: {
                        [detail.service]: {
                          command: 'flowgram-service',
                          args: ['stdio', `${target.publicBase}/mcp`],
                          env: { FLOWGRAM_SERVICE_TOKEN: '<SERVICE_TOKEN>' },
                        },
                      },
                    },
                    null,
                    2
                  )}
                />
                <DeploymentCode
                  title={tx('运行查询与取消')}
                  value={`GET ${target.publicBase}/runs/{runId}\nPOST ${target.publicBase}/runs/{runId}/cancel\nGET ${target.publicBase}/runs/{runId}/events?after=0\nGET ${target.publicBase}/runs/{runId}/result`}
                />
              </div>
            </details>
          </div>
        ))}
      {tab === 'versions' && (
        <div className="space-y-3">
          {!detail.releases.length && (
            <DeploymentEmpty
              title={tx('还没有发布版本')}
              description={tx('完成发布配置，创建第一个不可变版本。')}
            />
          )}{' '}
          {detail.releases.map((release) => (
            <article key={release.version} className="rounded-xl border border-border p-5">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-sm font-medium">{release.version}</h3>
                <span className="text-xs text-muted-foreground">
                  {new Date(release.createdAt).toLocaleString()}
                </span>
                <Button
                  className="ml-auto"
                  variant="outline"
                  size="sm"
                  onClick={() => beginDeploy(release.version)}
                  disabled={busy}
                >
                  {tx('部署此版本')}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={tx('导出部署包')}
                  disabled={busy}
                  onClick={() =>
                    void act(async () =>
                      downloadJson(
                        await api(`${deploymentPath(detail.id)}/releases/${release.version}`),
                        `${detail.service}-${release.version}.flowgram-service.json`
                      )
                    )
                  }
                >
                  <ArrowDownToLine size={14} />
                </Button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
                {detail.versions.find((v) => v.version === release.version)?.notes}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {tx('{0} 个公开工作流，{1} 个冻结依赖', [
                  release.operations.length,
                  release.workflows.length,
                ])}
              </p>
              <details className="mt-3">
                <summary className="cursor-pointer text-xs text-muted-foreground">
                  {tx('查看版本内容')}
                </summary>
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {release.workflows.map((w) => (
                    <li key={w.id}>
                      {w.name} · r{w.revision}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 break-all font-mono text-xs text-muted-foreground">
                  {release.digest}
                </p>
              </details>
            </article>
          ))}
        </div>
      )}
      {tab === 'callers' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              {tx('授权当前发布目标的公开工作流。调用方只能查询自己的运行；令牌仅创建时显示。')}
            </p>
            <Button
              disabled={!target || !live || busy}
              onClick={() => {
                setCallerName('');
                setAllowed(live?.operations.map((op) => op.name) || []);
                setCanCancel(false);
                setToken('');
                setNewCaller(true);
              }}
            >
              <Plus />
              {tx('添加调用方')}
            </Button>
          </div>
          {target?.consumers.map((consumer) => (
            <div key={consumer.id} className="flex items-center gap-4 border-b border-border py-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm">{consumer.name}</p>
                <p className="mt-2 break-words text-xs text-muted-foreground">
                  {consumer.operations.join(' · ')} · {tx(consumer.revoked ? '已撤销' : '有效')}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={consumer.revoked || busy}
                onClick={() =>
                  void act(async () => {
                    await api(`${targetRoot}/consumers/${consumer.id}/revoke`, 'POST', {});
                    setCounter((v) => v + 1);
                  })
                }
              >
                {tx('撤销')}
              </Button>
            </div>
          ))}
          {target && !target.consumers.length && (
            <DeploymentEmpty
              title={tx('还没有调用方')}
              description={tx('为业务系统或外部 Agent 分配可调用的公开工作流。')}
            />
          )}
        </div>
      )}
      <Dialog
        open={newCaller}
        onOpenChange={(open) => {
          setNewCaller(open);
          if (!open) setToken('');
        }}
        title={tx('调用授权')}
      >
        {token ? (
          <>
            <p className="text-sm text-muted-foreground">
              {tx('请立即保存令牌，关闭后无法再次查看。')}
            </p>
            <DeploymentCode title="Bearer token" value={token} />
          </>
        ) : (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              void act(async () => {
                const result = await api<{ token: string }>(`${targetRoot}/consumers`, 'POST', {
                  name: callerName,
                  operations: allowed,
                  canCancel,
                });
                setToken(result.token);
                const next = await api<TargetDetail>(targetRoot);
                setTarget(next);
              });
            }}
          >
            <DeploymentField label={tx('调用方名称')}>
              <Input
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                required
                autoFocus
              />
            </DeploymentField>
            {live?.operations.map((op) => (
              <label key={op.name} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="accent-current"
                  checked={allowed.includes(op.name)}
                  onChange={(e) =>
                    setAllowed(
                      e.target.checked
                        ? [...allowed, op.name]
                        : allowed.filter((v) => v !== op.name)
                    )
                  }
                />
                {detail.workflows.find((w) => w.id === op.workflowId)?.name || op.name}
              </label>
            ))}
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="accent-current"
                checked={canCancel}
                onChange={(e) => setCanCancel(e.target.checked)}
              />
              {tx('允许取消自己的运行')}
            </label>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {errorText(error)}
              </p>
            )}
            <Button disabled={busy || !allowed.length}>{tx('创建访问凭证')}</Button>
          </form>
        )}
      </Dialog>
      <Dialog
        open={!!activation}
        onOpenChange={(open) => {
          if (!open) setActivation(null);
        }}
        title={tx('部署版本')}
      >
        {activation && (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              void act(async () => {
                await api(`${deploymentPath(detail.id)}/deploy`, 'POST', {
                  ...activation,
                  version: deployVersion,
                });
                await reload();
                setCounter((v) => v + 1);
                setActivation(null);
              });
            }}
          >
            <DeploymentField label={tx('版本号')}>
              <Input value={deployVersion} readOnly />
            </DeploymentField>
            <DeploymentField label={tx('运行服务')}>
              <Select
                value={activation.targetId}
                onValueChange={(targetId) =>
                  setActivation({ ...activation, targetId, modelBindings: {} })
                }
                options={[
                  { value: 'local', label: tx('本机运行服务') },
                  ...inventory.targets.map((t) => ({
                    value: t.id,
                    label: t.name,
                  })),
                ]}
              />
            </DeploymentField>
            <DeploymentField label={tx('环境标识')}>
              <Input
                value={activation.environment}
                onChange={(e) => setActivation({ ...activation, environment: e.target.value })}
                required
                pattern="[a-z0-9_-]+"
              />
            </DeploymentField>
            <p className="text-xs leading-6 text-muted-foreground">
              {tx(
                '切换版本只影响新请求，已有运行继续使用原版本。环境配置沿用所选部署，可在发布配置中调整。'
              )}
            </p>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {errorText(error)}
              </p>
            )}
            <DeploymentModels
              projectId={detail.projectId}
              targetId={activation.targetId}
              workflows={releaseWorkflows}
              value={activation.modelBindings || {}}
              onChange={(modelBindings) => setActivation({ ...activation, modelBindings })}
            />
            <div className="flex gap-3">
              <Button disabled={busy}>{tx('启用此版本')}</Button>
              {deployed && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() =>
                    void act(async () => {
                      await api(`${deploymentPath(detail.id)}/deploy`, 'POST', {
                        ...deployed,
                        enabled: false,
                      });
                      await reload();
                      setActivation(null);
                      setCounter((v) => v + 1);
                    })
                  }
                >
                  {tx('停用部署')}
                </Button>
              )}
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
}
