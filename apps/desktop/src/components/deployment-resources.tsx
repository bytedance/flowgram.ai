/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, type FormEvent } from 'react';

import { ArrowLeft, KeyRound, Plus, Server, Pencil, Trash2 } from 'lucide-react';

import { errorText, tx } from '../lib/i18n';
import type { DeploymentCredential, DeploymentInventory, RuntimeTarget } from '../lib/deployment';
import { api } from '../lib/api';
import { Select } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DeploymentEmpty, DeploymentField } from './deployment-ui';

export function DeploymentResources({
  kind,
  inventory,
  reload,
}: {
  kind: 'credentials' | 'targets';
  inventory: DeploymentInventory;
  reload: () => Promise<void>;
}) {
  const [edit, setEdit] = useState<DeploymentCredential | RuntimeTarget | 'new' | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Record<string, string>>({});
  const [scope, setScope] = useState<string[] | null>(null);
  const [purpose, setPurpose] = useState('connection');
  const [credentialId, setCredentialId] = useState('');
  const credentials = kind === 'credentials';
  function start(value: typeof edit) {
    setEdit(value);
    setError('');
    setScope(value && value !== 'new' && 'projectIds' in value ? value.projectIds : null);
    setPurpose(value && value !== 'new' && 'purpose' in value ? value.purpose : 'connection');
    setCredentialId(
      value && value !== 'new' && 'credentialId' in value
        ? value.credentialId
        : inventory.credentials.find((c) => c.purpose === 'management')?.id || ''
    );
  }
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
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void act(async () => {
      const path = `/api/deployment/${credentials ? 'credentials' : 'targets'}`;
      const id = edit && edit !== 'new' ? edit.id : null;
      const body = credentials
        ? {
            name: String(form.get('name')),
            purpose,
            projectIds: scope,
            value: String(form.get('value')) || null,
          }
        : { name: String(form.get('name')), url: String(form.get('url')), credentialId };
      await api(id ? `${path}/${id}` : path, id ? 'PUT' : 'POST', body);
      await reload();
      setEdit(null);
    });
  }
  const saved = edit && edit !== 'new' ? edit : null;
  return (
    <div className="space-y-6">
      {edit ? (
        <>
          <Button variant="ghost" className="-ml-3" onClick={() => start(null)} disabled={busy}>
            <ArrowLeft />
            {tx(credentials ? '返回凭证' : '返回运行服务')}
          </Button>
          <div>
            <h2 className="text-lg font-medium">
              {tx(
                credentials
                  ? saved
                    ? '编辑凭证'
                    : '新建凭证'
                  : saved
                  ? '编辑运行服务'
                  : '添加运行服务'
              )}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {tx(
                credentials
                  ? '凭证统一保存在本机，发布配置只引用凭证。'
                  : '连接独立运行的 FlowGram 服务，用于持续提供 HTTP 和 MCP 接入。'
              )}
            </p>
          </div>
          <form key={saved?.id || 'new'} onSubmit={save} className="max-w-xl space-y-6">
            <DeploymentField label={tx('名称')}>
              <Input
                name="name"
                defaultValue={saved?.name || ''}
                required
                maxLength={200}
                autoFocus
              />
            </DeploymentField>
            {credentials ? (
              <>
                <DeploymentField label={tx('凭证用途')}>
                  <Select
                    value={purpose}
                    onValueChange={setPurpose}
                    options={[
                      { value: 'connection', label: tx('业务连接') },
                      { value: 'management', label: tx('运行服务管理') },
                    ]}
                  />
                </DeploymentField>
                <DeploymentField
                  label={tx('密钥')}
                  hint={tx(
                    saved
                      ? '留空保留已保存的密钥。密钥保存后不再显示。'
                      : '密钥保存后不再显示，也不会包含在发布包中。'
                  )}
                >
                  <Input
                    name="value"
                    type="password"
                    autoComplete="new-password"
                    required={!saved}
                    minLength={8}
                  />
                </DeploymentField>
                <DeploymentField label={tx('项目可用范围')}>
                  <Select
                    value={scope === null ? 'all' : 'selected'}
                    onValueChange={(value) => setScope(value === 'all' ? null : [])}
                    options={[
                      { value: 'all', label: tx('全部项目') },
                      { value: 'selected', label: tx('指定项目') },
                    ]}
                  />
                </DeploymentField>
                {scope !== null && (
                  <fieldset className="space-y-3 rounded-xl border border-border p-4">
                    <legend className="px-1 text-xs text-muted-foreground">
                      {tx('选择可使用此凭证的项目')}
                    </legend>
                    {inventory.projects.map((project) => (
                      <label key={project.id} className="flex items-center gap-3 text-sm">
                        <input
                          type="checkbox"
                          className="accent-current"
                          checked={scope.includes(project.id)}
                          onChange={(e) =>
                            setScope(
                              e.target.checked
                                ? [...scope, project.id]
                                : scope.filter((id) => id !== project.id)
                            )
                          }
                        />
                        {project.name}
                      </label>
                    ))}
                    {!inventory.projects.length && (
                      <p className="text-sm text-muted-foreground">{tx('请先创建或打开项目')}</p>
                    )}
                  </fieldset>
                )}
              </>
            ) : (
              <>
                <DeploymentField
                  label={tx('服务地址')}
                  hint={tx('使用 HTTPS 服务地址；本机调试支持 HTTP。')}
                >
                  <Input
                    name="url"
                    type="url"
                    placeholder="https://workflow.example.com"
                    required
                    defaultValue={saved && 'url' in saved ? saved.url : ''}
                  />
                </DeploymentField>
                <DeploymentField
                  label={tx('管理凭证')}
                  hint={tx('使用运行服务的管理凭证，业务调用凭证不能用于管理部署。')}
                >
                  <Select
                    value={credentialId}
                    onValueChange={setCredentialId}
                    placeholder={tx('选择管理凭证')}
                    options={inventory.credentials
                      .filter((c) => c.purpose === 'management')
                      .map((c) => ({ value: c.id, label: c.name }))}
                  />
                </DeploymentField>
                {!inventory.credentials.some((c) => c.purpose === 'management') && (
                  <p className="text-sm text-muted-foreground">
                    {tx('请先在凭证中添加运行服务管理凭证。')}
                  </p>
                )}
              </>
            )}
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {errorText(error)}
              </p>
            )}
            <div className="flex gap-3 border-t border-border pt-5">
              <Button
                disabled={
                  busy ||
                  (credentials && scope !== null && !scope.length) ||
                  (!credentials && !credentialId)
                }
              >
                {tx(busy ? '保存中' : '保存')}
              </Button>
              <Button type="button" variant="ghost" disabled={busy} onClick={() => start(null)}>
                {tx('取消')}
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-5">
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              {tx(
                credentials
                  ? '统一管理凭证，按项目控制可用范围。发布时引用，无需重复创建。'
                  : '管理本机与远程运行服务。项目发布时选择目标，服务连接独立于当前项目。'
              )}
            </p>
            <Button onClick={() => start('new')}>
              <Plus />
              {tx(credentials ? '新建凭证' : '添加运行服务')}
            </Button>
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {errorText(error)}
            </p>
          )}
          {!credentials && (
            <article className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <Server size={18} />
                <h3 className="text-sm font-medium">{tx('本机运行服务')}</h3>
                <span className="ml-auto text-xs text-muted-foreground">{tx('内置')}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {tx('适合开发和联调。退出应用后，本机服务停止；持续运行请选择独立服务。')}
              </p>
            </article>
          )}
          {credentials && !inventory.credentials.length && (
            <DeploymentEmpty
              title={tx('还没有凭证')}
              description={tx('添加业务连接或运行服务管理凭证，并设置项目可用范围。')}
            />
          )}
          <div className="space-y-3">
            {(credentials ? inventory.credentials : inventory.targets).map((item) => (
              <article key={item.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  {credentials ? (
                    <KeyRound size={17} className="mt-0.5 text-muted-foreground" />
                  ) : (
                    <Server size={17} className="mt-0.5 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="mt-2 break-words text-xs leading-5 text-muted-foreground">
                      {'projectIds' in item
                        ? `${tx(item.purpose === 'management' ? '运行服务管理' : '业务连接')} · ${
                            item.projectIds === null
                              ? tx('全部项目')
                              : item.projectIds
                                  .map(
                                    (id) => inventory.projects.find((p) => p.id === id)?.name || id
                                  )
                                  .join('、')
                          }`
                        : item.url}
                    </p>
                    {inventory.credentialSync?.some((sync) => sync.credentialId === item.id) && (
                      <p role="status" className="mt-2 text-xs text-muted-foreground">
                        {tx('远程凭证同步待完成，将自动重试。')}
                      </p>
                    )}
                    {status[item.id] && (
                      <p className="mt-2 text-xs text-muted-foreground" role="status">
                        {status[item.id]}
                      </p>
                    )}
                  </div>
                  {!credentials && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() =>
                        void act(async () => {
                          setStatus((old) => ({ ...old, [item.id]: tx('正在检查连接') }));
                          try {
                            await api(`/api/deployment/targets/${item.id}/probe`, 'POST', {});
                            setStatus((old) => ({ ...old, [item.id]: tx('连接正常') }));
                          } catch (e) {
                            setStatus((old) => ({ ...old, [item.id]: tx('连接失败') }));
                            throw e;
                          }
                        })
                      }
                    >
                      {tx('测试连接')}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={tx('编辑')}
                    onClick={() => start(item)}
                    disabled={busy}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={tx('删除')}
                    disabled={busy}
                    onClick={() =>
                      void act(async () => {
                        await api(
                          `/api/deployment/${credentials ? 'credentials' : 'targets'}/${item.id}`,
                          'DELETE'
                        );
                        await reload();
                      })
                    }
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
