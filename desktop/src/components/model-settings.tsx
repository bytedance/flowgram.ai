/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { ArrowLeft, ArrowRight, Check, Plus, Search, Server, Trash2 } from 'lucide-react';

import type { Project } from '../lib/types';
import {
  protocols,
  refreshModels,
  useModels,
  type ModelConnection,
  type ModelEntry,
  type ModelVerification,
} from '../lib/models';
import { tx, errorText } from '../lib/i18n';
import type { DeploymentCredential } from '../lib/deployment';
import { api } from '../lib/api';
import { Select } from './ui/select';
import { useContentTransition } from './ui/presence';
import { Input } from './ui/input';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { ModelParametersEditor, ModelPicker } from './model-picker';

const root = '/api/settings/models';
const newConnection = (): ModelConnection => ({
  id: '',
  name: '',
  provider: 'custom',
  protocol: 'responses',
  baseUrl: '',
  credentialId: null,
  enabled: true,
  timeoutMs: 180000,
  revision: 0,
  updatedAt: '',
});
const newEntry = (connectionId: string): ModelEntry => ({
  id: '',
  connectionId,
  name: '',
  modelId: '',
  enabled: true,
  capabilities: { reasoningEfforts: [] },
  contextWindow: null,
  parameters: {},
  revision: 0,
  updatedAt: '',
});
function Field({ title, help, children }: { title: string; help?: string; children: ReactNode }) {
  return (
    <label className="settings-field">
      {tx(title)}
      {children}
      {help && <small className="font-normal leading-5 text-muted-foreground">{tx(help)}</small>}
    </label>
  );
}
function Capability({
  title,
  value,
  onChange,
}: {
  title: string;
  value: boolean | null | undefined;
  onChange: (v: boolean | null) => void;
}) {
  return (
    <Field title={title}>
      <Select
        value={value == null ? 'unknown' : String(value)}
        onValueChange={(v) => onChange(v === 'unknown' ? null : v === 'true')}
        options={[
          { value: 'unknown', label: tx('未确认') },
          { value: 'true', label: tx('支持') },
          { value: 'false', label: tx('不支持') },
        ]}
      />
    </Field>
  );
}
export function ModelSettingsPage({ changed }: { changed: () => void }) {
  const catalog = useModels();
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [connection, setConnection] = useState<ModelConnection | null>(null);
  const [tab, setTab] = useState<'models' | 'connection'>('models');
  const content = useRef<HTMLDivElement>(null);
  useContentTransition(content, `${connectionId}:${tab}`);
  const [entry, setEntry] = useState<ModelEntry | null>(null);
  const [discovered, setDiscovered] = useState<{ modelId: string; name: string }[] | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [deleting, setDeleting] = useState<{
    kind: 'connections' | 'entries';
    id: string;
    name: string;
  } | null>(null);
  const [references, setReferences] = useState<{ kind: string; name: string }[] | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [secretName, setSecretName] = useState('');
  const [allProjects, setAllProjects] = useState(true);
  const [projectIds, setProjectIds] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    void refreshModels().catch((e) => setError(e.message));
    void api<{ projects: Project[] }>('/api/bootstrap')
      .then((value) => setProjects(value.projects))
      .catch((e) => setError(e.message));
  }, []);
  async function action(work: () => Promise<void>) {
    if (busy) return;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await work();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function updated() {
    await refreshModels(true);
    changed();
  }
  function open(c: ModelConnection) {
    setConnectionId(c.id);
    setConnection({ ...c });
    setTab(c.id ? 'models' : 'connection');
    setError('');
    setNotice('');
  }
  async function saveConnection() {
    if (!connection) return;
    const saved = await api<ModelConnection>(
      connection.id ? `${root}/connections/${connection.id}` : `${root}/connections`,
      connection.id ? 'PUT' : 'POST',
      connection
    );
    setConnection(saved);
    setConnectionId(saved.id);
    setTab('models');
    await updated();
    setNotice(tx('连接已保存'));
  }
  async function remove(kind: 'connections' | 'entries', id: string, name: string) {
    setReferences(null);
    setDeleting({ kind, id, name });
    const ids =
      kind === 'entries'
        ? [id]
        : catalog.models.filter((m) => m.connectionId === id).map((m) => m.id);
    const lists = await Promise.all(
      ids.map((id) =>
        api<{ references: { kind: string; name: string }[] }>(`${root}/entries/${id}/references`)
      )
    );
    setReferences(lists.flatMap((v) => v.references));
  }
  const models = catalog.models.filter(
    (m) =>
      m.connectionId === connectionId &&
      `${m.name} ${m.modelId}`.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div ref={content} className="space-y-7">
      {connectionId !== null ? (
        <>
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => {
              setConnectionId(null);
              setConnection(null);
              setError('');
              setNotice('');
            }}
          >
            <ArrowLeft size={15} />
            {tx('所有连接')}
          </button>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">{connection?.name || tx('添加连接')}</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {protocols.find((p) => p.value === connection?.protocol)?.label}
              </p>
            </div>
            {connection?.id && (
              <span className="status-pill">
                {connection.enabled ? tx('已启用') : tx('已停用')}
              </span>
            )}
          </div>
          {connection?.id && (
            <div
              className="flex gap-5 border-b border-border"
              role="tablist"
              aria-label={tx('连接详情')}
            >
              {(['models', 'connection'] as const).map((value) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === value}
                  className={`border-b-2 pb-3 text-sm ${
                    tab === value
                      ? 'border-foreground font-medium'
                      : 'border-transparent text-muted-foreground'
                  }`}
                  key={value}
                  onClick={() => {
                    setTab(value);
                    setError('');
                  }}
                >
                  {tx(value === 'models' ? '模型' : '连接配置')}
                </button>
              ))}
            </div>
          )}
          {tab === 'connection' && connection && (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                void action(saveConnection);
              }}
            >
              <Field title="服务商">
                <Select
                  value={connection.provider}
                  onValueChange={(value) => {
                    const preset =
                      value === 'anthropic'
                        ? {
                            protocol: 'anthropic' as const,
                            baseUrl: 'https://api.anthropic.com/v1',
                          }
                        : value === 'openai'
                        ? { protocol: 'responses' as const, baseUrl: 'https://api.openai.com/v1' }
                        : value === 'local'
                        ? {
                            protocol: 'chat-completions' as const,
                            baseUrl: 'http://localhost:11434/v1',
                          }
                        : {};
                    setConnection({ ...connection, ...preset, provider: value });
                  }}
                  options={[
                    { value: 'custom', label: tx('自定义兼容服务') },
                    { value: 'openai', label: 'OpenAI' },
                    { value: 'anthropic', label: 'Anthropic' },
                    { value: 'local', label: tx('本地兼容服务') },
                  ]}
                />
              </Field>
              <Field title="连接名称">
                <Input
                  required
                  maxLength={200}
                  value={connection.name}
                  placeholder={tx('例如：团队模型服务')}
                  onChange={(e) => setConnection({ ...connection, name: e.target.value })}
                />
              </Field>
              <Field title="接口协议">
                <Select
                  value={connection.protocol}
                  options={protocols}
                  onValueChange={(value) =>
                    setConnection({ ...connection, protocol: value as ModelConnection['protocol'] })
                  }
                />
              </Field>
              <Field title="API 地址" help="填写服务的基础地址，包含必要的版本路径。">
                <Input
                  required
                  type="url"
                  value={connection.baseUrl}
                  placeholder="https://api.example.com/v1"
                  onChange={(e) => setConnection({ ...connection, baseUrl: e.target.value })}
                />
                <code className="break-all text-[11px] font-normal text-muted-foreground">
                  {connection.baseUrl.replace(/\/$/, '')}/
                  {connection.protocol === 'responses'
                    ? 'responses'
                    : connection.protocol === 'anthropic'
                    ? 'messages'
                    : 'chat/completions'}
                </code>
              </Field>
              <Field title="凭证" help="与部署共用全局凭证；可用项目范围由凭证决定。">
                <Select
                  value={connection.credentialId || ''}
                  options={[
                    { value: '', label: tx('无需凭证') },
                    ...catalog.credentials
                      .filter((c) => c.purpose === 'connection')
                      .map((c) => ({
                        value: c.id,
                        label: `${c.name} · ${
                          c.projectIds === null
                            ? tx('所有项目')
                            : `${c.projectIds.length} ${tx('个项目')}`
                        }`,
                      })),
                  ]}
                  onValueChange={(value) =>
                    setConnection({ ...connection, credentialId: value || null })
                  }
                />
              </Field>
              <Button
                type="button"
                variant="ghost"
                className="text-xs"
                onClick={() => {
                  setSecret('');
                  setSecretName(connection.name);
                }}
              >
                <Plus size={14} />
                {tx('新建凭证')}
              </Button>
              <div className="grid grid-cols-2 gap-5">
                <Field title="请求超时（秒）">
                  <Input
                    type="number"
                    required
                    min={1}
                    max={180}
                    value={connection.timeoutMs / 1000}
                    onChange={(e) =>
                      setConnection({ ...connection, timeoutMs: Number(e.target.value) * 1000 })
                    }
                  />
                </Field>
                <Field title="状态">
                  <Select
                    value={String(connection.enabled)}
                    options={[
                      { value: 'true', label: tx('启用') },
                      { value: 'false', label: tx('停用') },
                    ]}
                    onValueChange={(value) =>
                      setConnection({ ...connection, enabled: value === 'true' })
                    }
                  />
                </Field>
              </div>
              <div className="flex justify-between border-t border-border pt-5">
                <Button disabled={busy} type="submit">
                  {tx(busy ? '保存中…' : '保存连接')}
                </Button>
                {connection.id && (
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={busy}
                    onClick={() =>
                      void action(() => remove('connections', connection.id, connection.name))
                    }
                  >
                    <Trash2 size={14} />
                    {tx('删除连接')}
                  </Button>
                )}
              </div>
            </form>
          )}
          {tab === 'models' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="relative min-w-40 flex-1">
                  <Search size={14} className="absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    aria-label={tx('搜索模型')}
                    className="pl-9"
                    placeholder={tx('搜索模型')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  disabled={busy}
                  onClick={() =>
                    void action(async () => {
                      const result = await api<{ models: { modelId: string; name: string }[] }>(
                        `${root}/connections/${connectionId}/discover`,
                        'POST',
                        {}
                      );
                      setDiscovered(result.models);
                      setSelected([]);
                    })
                  }
                >
                  {tx('获取模型')}
                </Button>
                <Button disabled={busy} onClick={() => setEntry(newEntry(connectionId || ''))}>
                  <Plus size={14} />
                  {tx('添加模型')}
                </Button>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                {tx('获取模型只读取服务列表。调用测试会发送少量请求，可能产生费用。')}
              </p>
              <div className="overflow-hidden rounded-xl border border-border">
                {models.map((m) => {
                  const verified = catalog.verifications[m.id];
                  return (
                    <div
                      className="flex flex-wrap items-center gap-3 border-b border-border p-4 last:border-0"
                      key={m.id}
                    >
                      <button
                        type="button"
                        className="min-w-0 flex-1 text-left"
                        onClick={() => setEntry({ ...m })}
                      >
                        <strong className="block truncate text-sm font-medium">{m.name}</strong>
                        <code className="mt-1 block truncate text-xs text-muted-foreground">
                          {m.modelId}
                        </code>
                        <span className="mt-2 block text-xs text-muted-foreground">
                          {m.enabled ? tx('已启用') : tx('已停用')} ·{' '}
                          {m.capabilities.tools === true ? tx('工具调用') : tx('工具能力未确认')} ·{' '}
                          {verified
                            ? `${tx(verified.success ? '测试通过' : '测试失败')} · ${new Date(
                                verified.checkedAt
                              ).toLocaleString()}`
                            : tx('尚未测试')}
                        </span>
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy}
                        onClick={() =>
                          void action(async () => {
                            const v = await api<ModelVerification>(
                              `${root}/entries/${m.id}/test`,
                              'POST',
                              { tools: false }
                            );
                            await updated();
                            if (!v.success) throw new Error(v.message);
                            setNotice(`${tx('文本测试通过')} · ${v.elapsedMs} ms`);
                          })
                        }
                      >
                        {tx('测试文本')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy}
                        onClick={() =>
                          void action(async () => {
                            const v = await api<ModelVerification>(
                              `${root}/entries/${m.id}/test`,
                              'POST',
                              { tools: true }
                            );
                            await updated();
                            if (!v.success) throw new Error(v.message);
                            setNotice(
                              `${tx('测试通过')} · ${v.elapsedMs} ms · ${tx(
                                v.streaming ? '流式输出' : '非流式输出'
                              )}`
                            );
                          })
                        }
                      >
                        {tx('测试工具')}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy}
                        onClick={() => setEntry({ ...m })}
                      >
                        {tx('配置')}
                      </Button>
                    </div>
                  );
                })}
                {!models.length && (
                  <div className="px-6 py-12 text-center">
                    <Server size={24} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm">{tx('此连接还没有模型')}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {tx('从服务获取模型，或手动填写模型 ID。')}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="settings-group">
            <div className="settings-row">
              <div>
                <h2>{tx('新聊天默认模型')}</h2>
                <p>{tx('需要流式输出与工具调用。已有聊天保留自己的选择。')}</p>
              </div>
              <ModelPicker
                value={{ modelId: catalog.defaults.chat }}
                kind="chat"
                tools
                parameters={false}
                inherit={false}
                clearable
                manage={false}
                onChange={(v) =>
                  void action(async () => {
                    await api(`${root}/defaults`, 'PUT', { ...catalog.defaults, chat: v.modelId });
                    await updated();
                  })
                }
              />
            </div>
            <div className="settings-row">
              <div>
                <h2>{tx('工作流默认模型')}</h2>
                <p>{tx('用于未指定模型的 AI 节点。Agent 节点还需工具能力。')}</p>
              </div>
              <ModelPicker
                value={{ modelId: catalog.defaults.workflow }}
                parameters={false}
                inherit={false}
                clearable
                manage={false}
                onChange={(v) =>
                  void action(async () => {
                    await api(`${root}/defaults`, 'PUT', {
                      ...catalog.defaults,
                      workflow: v.modelId,
                    });
                    await updated();
                  })
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{tx('模型连接')}</h2>
            <Button onClick={() => open(newConnection())}>
              <Plus size={14} />
              {tx('添加连接')}
            </Button>
          </div>
          <div className="space-y-3">
            {catalog.connections.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => open(c)}
                className="flex w-full items-center gap-4 rounded-xl border border-border p-5 text-left transition-colors hover:bg-muted"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Server size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate text-sm font-medium">{c.name}</strong>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">
                    {protocols.find((p) => p.value === c.protocol)?.label} ·{' '}
                    {catalog.models.filter((m) => m.connectionId === c.id && m.enabled).length}{' '}
                    {tx('个已启用模型')}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {tx(c.enabled ? '已启用' : '已停用')}
                </span>
                <ArrowRight size={15} className="text-muted-foreground" />
              </button>
            ))}
            {!catalog.connections.length && (
              <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                {tx('添加第一个连接，选择可用于聊天和工作流的模型。')}
              </p>
            )}
          </div>
        </>
      )}
      {notice && (
        <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check size={14} />
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {errorText(error)}
        </p>
      )}
      <Dialog
        open={!!entry}
        onOpenChange={(open) => {
          if (!open && !busy) setEntry(null);
        }}
        title={tx(entry?.id ? '配置模型' : '添加模型')}
      >
        {entry && (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void action(async () => {
                await api(
                  entry.id ? `${root}/entries/${entry.id}` : `${root}/entries`,
                  entry.id ? 'PUT' : 'POST',
                  entry
                );
                setEntry(null);
                await updated();
              });
            }}
          >
            <Field title="显示名称">
              <Input
                required
                maxLength={200}
                value={entry.name}
                onChange={(e) => setEntry({ ...entry, name: e.target.value })}
              />
            </Field>
            <Field title="模型 ID">
              <Input
                required
                maxLength={300}
                value={entry.modelId}
                placeholder="provider-model-id"
                onChange={(e) => setEntry({ ...entry, modelId: e.target.value })}
              />
            </Field>
            <Field title="状态">
              <Select
                value={String(entry.enabled)}
                onValueChange={(v) => setEntry({ ...entry, enabled: v === 'true' })}
                options={[
                  { value: 'true', label: tx('启用') },
                  { value: 'false', label: tx('停用') },
                ]}
              />
            </Field>
            <details open>
              <summary className="cursor-pointer text-sm font-medium">{tx('模型能力')}</summary>
              <p className="my-3 text-xs leading-5 text-muted-foreground">
                {tx('根据服务文档声明能力；测试可确认流式输出与工具调用，不按模型名称推断。')}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ['streaming', '流式输出'],
                    ['tools', '工具调用'],
                    ['temperature', '温度参数'],
                    ['structuredOutput', '结构化输出'],
                  ] as const
                ).map(([key, label]) => (
                  <Capability
                    key={key}
                    title={label}
                    value={entry.capabilities[key]}
                    onChange={(v) =>
                      setEntry({
                        ...entry,
                        capabilities: { ...entry.capabilities, [key]: v },
                        parameters: {
                          ...entry.parameters,
                          ...(key === 'temperature' && v !== true
                            ? { temperature: null, topP: null }
                            : {}),
                          ...(key === 'structuredOutput' && v !== true
                            ? { outputSchema: null }
                            : {}),
                        },
                      })
                    }
                  />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Field title="上下文窗口">
                  <Input
                    type="number"
                    min={256}
                    max={10000000}
                    value={entry.contextWindow ?? ''}
                    placeholder={tx('未确认')}
                    onChange={(e) =>
                      setEntry({
                        ...entry,
                        contextWindow: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </Field>
                {connection?.protocol !== 'anthropic' && (
                  <Field title="支持的推理强度">
                    <Input
                      placeholder="low, medium, high"
                      defaultValue={entry.capabilities.reasoningEfforts.join(', ')}
                      onChange={(e) =>
                        setEntry({
                          ...entry,
                          capabilities: {
                            ...entry.capabilities,
                            reasoningEfforts: e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          },
                          parameters: {
                            ...entry.parameters,
                            reasoningEffort: e.target.value
                              .split(',')
                              .map((v) => v.trim())
                              .includes(entry.parameters.reasoningEffort || '')
                              ? entry.parameters.reasoningEffort
                              : null,
                          },
                        })
                      }
                    />
                  </Field>
                )}
              </div>
            </details>
            <details>
              <summary className="cursor-pointer text-sm font-medium">{tx('默认参数')}</summary>
              <div className="pt-3">
                <ModelParametersEditor
                  model={entry}
                  value={entry.parameters}
                  onChange={(v) => setEntry({ ...entry, parameters: v })}
                />
              </div>
            </details>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {errorText(error)}
              </p>
            )}
            <div className="flex justify-between border-t border-border pt-4">
              <Button disabled={busy}>{tx(busy ? '保存中…' : '保存')}</Button>
              {entry.id && (
                <Button
                  type="button"
                  variant="ghost"
                  disabled={busy}
                  onClick={() => {
                    const item = entry;
                    setEntry(null);
                    void action(() => remove('entries', item.id, item.name));
                  }}
                >
                  <Trash2 size={14} />
                  {tx('删除模型')}
                </Button>
              )}
            </div>
          </form>
        )}
      </Dialog>
      <Dialog
        open={discovered !== null}
        onOpenChange={(open) => {
          if (!open && !busy) setDiscovered(null);
        }}
        title={tx('获取模型')}
      >
        <p className="mb-4 text-xs leading-5 text-muted-foreground">
          {tx('选择要添加的模型。新模型的能力保持未确认，可通过测试或配置补充。')}
        </p>
        <div className="max-h-72 overflow-auto">
          {discovered?.map((m) => {
            const exists = catalog.models.some(
              (e) => e.connectionId === connectionId && e.modelId === m.modelId
            );
            return (
              <label
                key={m.modelId}
                className="flex items-center gap-3 border-b border-border py-3 text-sm"
              >
                <input
                  type="checkbox"
                  disabled={exists || busy}
                  checked={exists || selected.includes(m.modelId)}
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? [...selected, m.modelId]
                        : selected.filter((v) => v !== m.modelId)
                    )
                  }
                />
                <span className="min-w-0 flex-1 truncate">{m.name}</span>
                {exists && <small className="text-muted-foreground">{tx('已添加')}</small>}
              </label>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {errorText(error)}
          </p>
        )}
        <Button
          className="mt-5"
          disabled={busy || !selected.length}
          onClick={() =>
            void action(async () => {
              for (const id of selected) {
                const m = discovered?.find((m) => m.modelId === id);
                await api(`${root}/entries`, 'POST', {
                  ...newEntry(connectionId || ''),
                  modelId: id,
                  name: m?.name || id,
                });
                setSelected((values) => values.filter((v) => v !== id));
              }
              await updated();
              setDiscovered(null);
            })
          }
        >
          {tx('添加所选模型')} ({selected.length})
        </Button>
      </Dialog>
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open && !busy) setDeleting(null);
        }}
        title={tx('删除模型配置')}
      >
        <p className="text-sm">{deleting?.name}</p>
        {references === null ? (
          <p className="my-5 text-sm text-muted-foreground">{tx('正在检查引用…')}</p>
        ) : references.length ? (
          <>
            <p className="my-4 text-sm">{tx('此配置仍被使用，请先替换以下引用。')}</p>
            <ul className="max-h-52 overflow-auto text-sm text-muted-foreground">
              {references.map((r, i) => (
                <li key={i} className="py-1">
                  {r.name}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="my-5 text-sm text-muted-foreground">
            {tx('此操作会删除配置，已有运行记录会保留。凭证不会删除。')}
          </p>
        )}
        {error && (
          <p role="alert" className="mb-3 text-sm text-destructive">
            {errorText(error)}
          </p>
        )}
        <Button
          variant="outline"
          disabled={busy || references === null || references.length > 0}
          onClick={() =>
            void action(async () => {
              if (!deleting) return;
              await api(`${root}/${deleting.kind}/${deleting.id}`, 'DELETE');
              if (deleting.kind === 'connections') {
                setConnectionId(null);
                setConnection(null);
              }
              setDeleting(null);
              await updated();
            })
          }
        >
          {tx('确认删除')}
        </Button>
      </Dialog>
      <Dialog
        open={secret !== null}
        onOpenChange={(open) => {
          if (!open && !busy) setSecret(null);
        }}
        title={tx('新建凭证')}
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void action(async () => {
              const saved = await api<DeploymentCredential>('/api/deployment/credentials', 'POST', {
                name: secretName,
                purpose: 'connection',
                value: secret,
                projectIds: allProjects ? null : projectIds,
              });
              setConnection((c) => c && { ...c, credentialId: saved.id });
              setSecret(null);
              await updated();
            });
          }}
        >
          <Field title="凭证名称">
            <Input required value={secretName} onChange={(e) => setSecretName(e.target.value)} />
          </Field>
          <Field title="API Key">
            <Input
              type="password"
              autoComplete="new-password"
              required
              value={secret || ''}
              onChange={(e) => setSecret(e.target.value)}
            />
          </Field>
          <Field title="项目可用范围">
            <Select
              value={allProjects ? 'all' : 'selected'}
              options={[
                { value: 'all', label: tx('所有项目') },
                { value: 'selected', label: tx('指定项目') },
              ]}
              onValueChange={(v) => setAllProjects(v === 'all')}
            />
          </Field>
          {!allProjects &&
            projects.map((p) => (
              <label key={p.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={projectIds.includes(p.id)}
                  onChange={(e) =>
                    setProjectIds(
                      e.target.checked
                        ? [...projectIds, p.id]
                        : projectIds.filter((id) => id !== p.id)
                    )
                  }
                />
                {p.name}
              </label>
            ))}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {errorText(error)}
            </p>
          )}
          <Button disabled={busy || (!allProjects && !projectIds.length)}>{tx('保存凭证')}</Button>
        </form>
      </Dialog>
    </div>
  );
}
