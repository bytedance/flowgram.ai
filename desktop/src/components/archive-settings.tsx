/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useEffect, useState } from 'react';

import {
  Archive,
  ArchiveRestore,
  Loader2,
  MessageCircle,
  RefreshCw,
  Search,
  Trash2,
  Workflow,
} from 'lucide-react';

import { errorText, getLocale, t, tx } from '../lib/i18n';
import { api } from '../lib/api';
import { Select } from './ui/select';
import { Input } from './ui/input';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';

type Kind = 'session' | 'workflow';
interface Item {
  kind: Kind;
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  archivedAt: string;
}
interface Inventory {
  items: Item[];
  projects: { id: string; name: string }[];
  unavailableProjects: { projectId: string; projectName: string; error: string }[];
}
export function ArchiveSettings({
  active,
  onChanged,
}: {
  active: boolean;
  onChanged: (project: string, kind: Kind, id: string, deleted: boolean) => void;
}) {
  const [inventory, setInventory] = useState<Inventory>({
    items: [],
    projects: [],
    unavailableProjects: [],
  });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [project, setProject] = useState('all');
  const [kind, setKind] = useState('all');
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<Item | null>(null);
  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const data = await api<Inventory>('/api/archives', 'GET', undefined, signal);
      if (!signal?.aborted) {
        setInventory(data);
        setError('');
      }
    } catch (cause) {
      if (!signal?.aborted) setError((cause as Error).message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!active) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [active, load]);
  async function mutate(item: Item, remove: boolean) {
    if (busy) return;
    setBusy(`${item.projectId}:${item.kind}:${item.id}`);
    setError('');
    setNotice('');
    try {
      await api(
        `/api/archives/${item.kind}/${item.id}${remove ? '' : '/restore'}`,
        remove ? 'DELETE' : 'POST',
        undefined,
        undefined,
        item.projectId
      );
      setInventory((current) => ({
        ...current,
        items: current.items.filter(
          (value) =>
            !(
              value.projectId === item.projectId &&
              value.kind === item.kind &&
              value.id === item.id
            )
        ),
      }));
      onChanged(item.projectId, item.kind, item.id, remove);
      setDeleting(null);
      setNotice(remove ? tx('已彻底删除') : tx('已恢复到原项目'));
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy('');
    }
  }
  const projects = inventory.projects.map((item) => [item.id, item.name]);
  const items = inventory.items.filter(
    (item) =>
      (project === 'all' || item.projectId === project) &&
      (kind === 'all' || item.kind === kind) &&
      `${item.name} ${item.projectName}`.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-40 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-2.5 text-muted-foreground"
            size={15}
          />
          <Input
            className="pl-9"
            aria-label={tx('搜索归档内容')}
            placeholder={tx('搜索归档内容')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="w-44 shrink-0">
          <Select
            aria-label={tx('筛选归档项目')}
            value={project}
            onValueChange={setProject}
            options={[
              { value: 'all', label: tx('全部项目') },
              ...projects.map(([value, label]) => ({ value, label })),
            ]}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={tx('刷新归档列表')}
          disabled={loading || !!busy}
          onClick={() => void load()}
        >
          <RefreshCw className={loading ? 'animate-spin' : ''} />
        </Button>
      </div>
      <div className="flex gap-1 border-b border-border" role="group" aria-label={tx('归档类型')}>
        {(['all', 'session', 'workflow'] as const).map((value) => (
          <button
            key={value}
            aria-pressed={kind === value}
            onClick={() => setKind(value)}
            className={`border-b-2 px-3 pb-3 text-sm ${
              kind === value
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {value === 'all' ? tx('全部') : value === 'session' ? tx('会话') : tx('工作流')}
          </button>
        ))}
      </div>
      {notice && (
        <p role="status" className="text-sm">
          {notice}
        </p>
      )}
      {error && !deleting && (
        <p role="alert" className="text-sm leading-6 text-destructive">
          {errorText(error)}
        </p>
      )}
      {inventory.unavailableProjects.map((item) => (
        <p key={item.projectId} role="alert" className="text-xs leading-5 text-destructive">
          {tx('无法读取项目「{0}」的归档：{1}', [item.projectName, errorText(item.error)])}
        </p>
      ))}
      {loading && !inventory.items.length ? (
        <div className="grid min-h-40 place-items-center rounded-xl border border-border">
          <Loader2 className="animate-spin text-muted-foreground" size={20} />
        </div>
      ) : !items.length ? (
        <div className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl border border-border text-muted-foreground">
          <Archive size={22} />
          <p className="text-sm">
            {inventory.items.length ? tx('没有符合筛选条件的归档') : tx('还没有归档内容')}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {items.map((item) => {
            const stamp = new Date(item.archivedAt);
            return (
              <div
                key={`${item.projectId}:${item.kind}:${item.id}`}
                className="flex items-center gap-3 px-4 py-4"
              >
                {item.kind === 'session' ? (
                  <MessageCircle className="shrink-0 text-muted-foreground" size={17} />
                ) : (
                  <Workflow className="shrink-0 text-muted-foreground" size={17} />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium" title={item.name}>
                    {item.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {item.projectName} · {item.kind === 'session' ? tx('会话') : tx('工作流')} ·{' '}
                    {Number.isNaN(stamp.valueOf())
                      ? tx('时间未知')
                      : stamp.toLocaleString(getLocale(), {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!!busy || loading}
                  onClick={() => void mutate(item, false)}
                >
                  <ArchiveRestore />
                  {tx('恢复')}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  aria-label={tx('彻底删除「{0}」', [item.name])}
                  disabled={!!busy || loading}
                  onClick={() => {
                    setError('');
                    setDeleting(item);
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            );
          })}
        </div>
      )}
      <p className="text-xs leading-5 text-muted-foreground">
        {tx('归档内容从侧栏和搜索中隐藏。恢复后回到原项目，待办队列仍保持暂停。')}
      </p>
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open && !busy) {
            setDeleting(null);
            setError('');
          }
        }}
        title={tx('彻底删除归档内容')}
      >
        <p className="mb-3 truncate text-sm font-medium">{deleting?.name}</p>
        <p className="mb-5 text-sm leading-6 text-muted-foreground">
          {deleting?.kind === 'session'
            ? tx('会话消息、工具调用和待办队列将被永久删除，无法恢复。工作流和运行记录会保留。')
            : tx(
                '工作流文件及其运行记录将被永久删除，无法恢复。其他运行的冻结快照会保留；仍被流程或发布引用时无法删除。'
              )}
        </p>
        {error && (
          <p role="alert" className="mb-4 text-sm leading-6 text-destructive">
            {errorText(error)}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button
            autoFocus
            variant="outline"
            disabled={!!busy}
            onClick={() => {
              setDeleting(null);
              setError('');
            }}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="destructive"
            disabled={!!busy}
            onClick={() => {
              if (deleting) void mutate(deleting, true);
            }}
          >
            {busy ? <Loader2 className="animate-spin" /> : <Trash2 />}
            {tx('彻底删除')}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
