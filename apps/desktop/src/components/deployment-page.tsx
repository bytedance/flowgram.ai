/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowLeft, ArrowRight, FileText, Loader2, Plus, RefreshCw } from 'lucide-react';

import { refreshModels } from '../lib/models';
import { tx, errorText } from '../lib/i18n';
import {
  deploymentPath,
  type DeploymentInventory,
  type PublicationDetail,
  type PublishIntent,
} from '../lib/deployment';
import { api } from '../lib/api';
import { Select } from './ui/select';
import { useContentTransition } from './ui/presence';
import { Button } from './ui/button';
import { PublicationForm } from './publication-form';
import { PublicationDetails } from './publication-detail';
import { DeploymentEmpty, DeploymentField } from './deployment-ui';
import { DeploymentResources } from './deployment-resources';

const empty: DeploymentInventory = { projects: [], publications: [], credentials: [], targets: [] };
export function DeploymentPage({
  active,
  intent,
  onHandled,
  openWorkflow,
  openRun,
}: {
  active: boolean;
  intent: PublishIntent | null;
  onHandled: () => void;
  openWorkflow: (project: string, id: string) => void;
  openRun: (project: string, id: string) => void;
}) {
  const [inventory, setInventory] = useState<DeploymentInventory>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<'publications' | 'credentials' | 'targets'>('publications');
  const [route, setRoute] = useState<'list' | 'choose' | 'detail' | 'configure'>('list');
  const content = useRef<HTMLDivElement>(null);
  useContentTransition(content, `${tab}:${route}`);
  const [detail, setDetail] = useState<PublicationDetail | null>(null);
  const [project, setProject] = useState('');
  const [workflowIntent, setWorkflowIntent] = useState<string | undefined>();
  const [formEpoch, setFormEpoch] = useState(0);
  const reload = useCallback(async () => {
    setInventory(await api<DeploymentInventory>('/api/deployment'));
    await refreshModels(true);
  }, []);
  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    void api<DeploymentInventory>('/api/deployment', 'GET', undefined, controller.signal)
      .then(setInventory)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [active]);
  useEffect(() => {
    if (!intent) return;
    let active = true;
    setBusy(true);
    setError('');
    setTab('publications');
    void api<{ id: string }>('/api/deployment/publications', 'POST', {
      projectId: intent.projectId,
    })
      .then(async ({ id }) => {
        const next = await api<PublicationDetail>(deploymentPath(id));
        if (!active) return;
        await reload();
        if (!active) return;
        setDetail(next);
        setWorkflowIntent(intent.workflowId);
        setFormEpoch((v) => v + 1);
        setRoute(
          next.releases.some((r) => r.operations.some((op) => op.workflowId === intent.workflowId))
            ? 'detail'
            : 'configure'
        );
        setBusy(false);
        onHandled();
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setBusy(false);
          onHandled();
        }
      });
    return () => {
      active = false;
    };
  }, [intent, onHandled, reload]);
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
  async function open(id: string, configure = false) {
    const next = await api<PublicationDetail>(deploymentPath(id));
    setDetail(next);
    setWorkflowIntent(undefined);
    setFormEpoch((v) => v + 1);
    setRoute(configure ? 'configure' : 'detail');
  }
  async function refreshed() {
    await reload();
    if (detail) setDetail(await api<PublicationDetail>(deploymentPath(detail.id)));
  }
  const publication = inventory.publications.find((p) => p.id === detail?.id);
  return (
    <div ref={content} className="mt-6">
      <nav aria-label={tx('部署模块')} className="mb-8 flex gap-6 border-b border-border">
        {(
          [
            ['publications', '发布'],
            ['credentials', '凭证'],
            ['targets', '运行服务'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            disabled={busy}
            className={`border-b-2 pb-3 text-sm ${
              tab === id ? 'border-foreground' : 'border-transparent text-muted-foreground'
            }`}
            aria-current={tab === id ? 'page' : undefined}
            onClick={() => {
              setTab(id);
              setError('');
            }}
          >
            {tx(label)}
          </button>
        ))}
      </nav>
      {error && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
        >
          {errorText(error)}
        </p>
      )}
      {loading ? (
        <p className="py-12 text-sm text-muted-foreground">{tx('正在加载部署配置')}</p>
      ) : (
        <>
          <div hidden={tab !== 'publications'}>
            {route === 'list' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-5">
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    {tx('管理各项目的发布版本、接入方式和调用授权。')}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label={tx('刷新')}
                      disabled={busy}
                      onClick={() => void act(reload)}
                    >
                      <RefreshCw size={15} />
                    </Button>
                    <Button
                      disabled={busy || !inventory.projects.length}
                      onClick={() => {
                        setProject(inventory.projects[0]?.id || '');
                        setRoute('choose');
                      }}
                    >
                      <Plus />
                      {tx('新建发布')}
                    </Button>
                  </div>
                </div>
                {!inventory.projects.length && (
                  <DeploymentEmpty
                    title={tx('还没有项目')}
                    description={tx('先在工作区创建或打开一个项目，再配置发布。')}
                  />
                )}
                {!!inventory.projects.length && !inventory.publications.length && (
                  <DeploymentEmpty
                    title={tx('还没有发布')}
                    description={tx('选择项目及公开工作流，发布到本机或独立运行服务。')}
                  />
                )}
                {(['published', 'drafts'] as const).map((group) => {
                  const cards = inventory.publications.filter((p) =>
                    group === 'published' ? p.versionCount > 0 : p.versionCount === 0
                  );
                  return (
                    cards.length > 0 && (
                      <section key={group}>
                        <h2 className="mb-3 text-xs font-medium text-muted-foreground">
                          {tx(group === 'published' ? '已发布' : '草稿')}
                        </h2>
                        <div className="grid gap-4 lg:grid-cols-2">
                          {cards.map((p) => {
                            const source = inventory.projects.find(
                              (project) => project.id === p.projectId
                            );
                            return (
                              <article
                                key={p.id}
                                className="flex flex-col rounded-xl border border-border bg-card p-5"
                              >
                                <button
                                  className="min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                  disabled={busy}
                                  onClick={() => void act(() => open(p.id))}
                                >
                                  <span className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                                    <FileText size={14} />
                                    {source?.name || p.projectId}
                                  </span>
                                  <h3 className="truncate text-base font-medium">{p.title}</h3>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    {tx('{0} 个公开工作流', [
                                      p.publicWorkflowCount ?? p.draft.operations.length,
                                    ])}{' '}
                                    · HTTP · MCP
                                  </p>
                                </button>
                                <div className="my-5 flex-1 space-y-2">
                                  {p.deployments.length ? (
                                    p.deployments.map((d) => (
                                      <p
                                        key={`${d.targetId}:${d.environment}`}
                                        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs"
                                      >
                                        <span className="text-muted-foreground">
                                          {d.targetId === 'local'
                                            ? tx('本机运行服务')
                                            : inventory.targets.find((t) => t.id === d.targetId)
                                                ?.name || d.targetId}{' '}
                                          · {d.environment}
                                        </span>
                                        <span>{d.version}</span>
                                        <span className="text-muted-foreground">
                                          {tx(d.enabled ? '已启用' : '已停用')}
                                        </span>
                                      </p>
                                    ))
                                  ) : (
                                    <p className="text-xs text-muted-foreground">
                                      {tx(p.versionCount ? '版本已创建，尚未部署' : '尚未发布')}
                                    </p>
                                  )}
                                </div>
                                <p className="mb-4 text-xs text-muted-foreground">
                                  {tx('最近更新')} · {new Date(p.updatedAt).toLocaleString()}
                                </p>
                                <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="-ml-2"
                                    disabled={busy}
                                    onClick={() => void act(() => open(p.id))}
                                  >
                                    {tx('查看详情')}
                                    <ArrowRight size={13} />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={busy}
                                    onClick={() => void act(() => open(p.id, true))}
                                  >
                                    {tx(p.versionCount ? '发布新版本' : '继续配置')}
                                  </Button>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      </section>
                    )
                  );
                })}
                {busy && (
                  <p
                    role="status"
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <Loader2 size={13} className="animate-spin" />
                    {tx('正在加载')}
                  </p>
                )}
              </div>
            )}
            {route === 'choose' && (
              <div className="max-w-xl space-y-6">
                <Button
                  className="-ml-3"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => setRoute('list')}
                >
                  <ArrowLeft />
                  {tx('返回发布')}
                </Button>
                <div>
                  <h2 className="text-lg font-medium">{tx('新建发布')}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tx('选择所属项目，配置公开工作流和运行服务。')}
                  </p>
                </div>
                <DeploymentField label={tx('项目')}>
                  <Select
                    value={project}
                    onValueChange={setProject}
                    options={inventory.projects.map((p) => ({ value: p.id, label: p.name }))}
                  />
                </DeploymentField>
                <Button
                  disabled={!project || busy}
                  onClick={() =>
                    void act(async () => {
                      const { id } = await api<{ id: string }>(
                        '/api/deployment/publications',
                        'POST',
                        { projectId: project }
                      );
                      await reload();
                      await open(id, true);
                    })
                  }
                >
                  {tx('继续')}
                  <ArrowRight />
                </Button>
              </div>
            )}
            {route === 'configure' && detail && (
              <PublicationForm
                key={`${detail.id}:${formEpoch}`}
                detail={detail}
                inventory={inventory}
                workflowIntent={workflowIntent}
                onBack={() =>
                  void act(async () => {
                    await refreshed();
                    setRoute(publication?.versionCount ? 'detail' : 'list');
                  })
                }
                onDone={async () => {
                  await refreshed();
                  setRoute('detail');
                }}
              />
            )}
            {route === 'detail' && detail && publication && (
              <PublicationDetails
                key={detail.id}
                active={active && tab === 'publications'}
                detail={detail}
                publication={publication}
                inventory={inventory}
                onBack={() => setRoute('list')}
                onConfigure={() => {
                  setWorkflowIntent(undefined);
                  setFormEpoch((v) => v + 1);
                  setRoute('configure');
                }}
                reload={refreshed}
                openWorkflow={openWorkflow}
                openRun={openRun}
              />
            )}
          </div>
          <div hidden={tab !== 'credentials'}>
            <DeploymentResources kind="credentials" inventory={inventory} reload={reload} />
          </div>
          <div hidden={tab !== 'targets'}>
            <DeploymentResources kind="targets" inventory={inventory} reload={reload} />
          </div>
        </>
      )}
    </div>
  );
}
