/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, useState } from 'react';

import { Copy, FolderOpen, Loader2, Trash2 } from 'lucide-react';

import type { Project } from '../lib/types';
import { errorText, getLocale, t, tx } from '../lib/i18n';
import { api } from '../lib/api';
import { Input } from './ui/input';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';

export type ProjectManagementAction = 'rename' | 'details' | 'delete';
export function ProjectManagement({
  action,
  project,
  close,
  renamed,
  deleted,
}: {
  action: ProjectManagementAction;
  project: Project;
  close: () => void;
  renamed: (project: Project) => void;
  deleted: (project: string) => Promise<void>;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [current, setCurrent] = useState(project);
  const [counts, setCounts] = useState<{
    workflows: number;
    sessions: number;
    runs: number;
    archived: number;
  } | null>(null);
  const [name, setName] = useState(project.name);
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    void api<{ project: Project; counts: NonNullable<typeof counts> }>(
      `/api/projects/${project.id}`,
      'GET',
      undefined,
      controller.signal
    )
      .then((value) => {
        if (controller.signal.aborted) return;
        setCurrent(value.project);
        setName(value.project.name);
        setCounts(value.counts);
        setLoading(false);
      })
      .catch((cause) => {
        if (!controller.signal.aborted) {
          setError(cause.message);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [project.id]);
  useEffect(() => {
    if (!loading) input.current?.focus();
  }, [loading]);
  async function submit() {
    if (busy || loading || !counts) return;
    setBusy(true);
    setError('');
    try {
      if (action === 'rename') {
        const updated = await api<Project>(`/api/projects/${current.id}`, 'PUT', {
          name: name.trim(),
          expectedName: current.name,
        });
        renamed(updated);
        close();
      } else if (action === 'delete' && confirmation === current.name) {
        await api(`/api/projects/${current.id}`, 'DELETE', { confirmationName: confirmation });
        await deleted(current.id);
        close();
      }
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !busy) close();
      }}
      title={
        action === 'rename'
          ? tx('重命名项目')
          : action === 'delete'
          ? tx('删除项目')
          : tx('项目详情')
      }
    >
      <form
        className="space-y-5"
        aria-busy={busy || loading}
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        {action === 'rename' ? (
          <>
            <p className="text-sm leading-6 text-muted-foreground">
              {tx('修改项目显示名称，工程目录、工作流引用和聊天内容保持不变。')}
            </p>
            <label className="grid gap-2 text-xs">
              {t('projectName')}
              <Input
                ref={input}
                required
                maxLength={256}
                value={name}
                disabled={busy || loading}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </>
        ) : (
          <>
            <p className="text-sm font-medium break-words">{current.name}</p>
            {action === 'delete' && (
              <p className="text-sm leading-6 text-muted-foreground">
                {tx(
                  '将永久删除此项目的工作流、聊天、运行记录、资源及以下工程目录中的所有文件，无法恢复。全局模型连接和凭证会保留。'
                )}
              </p>
            )}
            <div>
              <p className="mb-2 text-xs text-muted-foreground">{tx('工程目录')}</p>
              <p className="rounded-lg bg-secondary p-3 text-xs leading-6 break-all select-text">
                {current.directory}
              </p>
            </div>
            {counts && (
              <dl className="grid grid-cols-4 gap-3 rounded-xl border border-border px-4 py-3 text-sm">
                {[
                  [tx('工作流'), counts.workflows],
                  [tx('会话'), counts.sessions],
                  [tx('运行记录'), counts.runs],
                  [tx('归档'), counts.archived],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {action === 'details' && (
              <dl className="grid gap-3 text-xs">
                <div>
                  <dt className="text-muted-foreground">{tx('项目 ID')}</dt>
                  <dd className="mt-1 break-all select-text">{current.id}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{tx('创建时间')}</dt>
                  <dd className="mt-1">
                    {new Date(current.createdAt).toLocaleString(getLocale())}
                  </dd>
                </div>
              </dl>
            )}
            {action === 'delete' && (
              <label className="grid gap-2 text-xs">
                {tx('完整输入项目名称以确认删除')}
                <Input
                  ref={input}
                  autoComplete="off"
                  spellCheck={false}
                  value={confirmation}
                  disabled={busy || loading}
                  onChange={(event) => setConfirmation(event.target.value)}
                  placeholder={current.name}
                />
              </label>
            )}
          </>
        )}
        {loading && (
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 size={14} className="animate-spin" />
            {tx('正在读取项目详情')}
          </p>
        )}
        {error && (
          <p role="alert" className="text-sm leading-6 text-destructive">
            {errorText(error)}
          </p>
        )}
        <div className="flex flex-wrap justify-end gap-2">
          {action === 'details' ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  void navigator.clipboard
                    .writeText(current.directory)
                    .catch((cause) => setError(cause.message))
                }
              >
                <Copy />
                {tx('复制路径')}
              </Button>
              {'__TAURI_INTERNALS__' in window && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    void import('@tauri-apps/plugin-opener')
                      .then(({ revealItemInDir }) => revealItemInDir(current.directory))
                      .catch((cause) => setError(cause.message))
                  }
                >
                  <FolderOpen />
                  {tx('在文件管理器中显示')}
                </Button>
              )}
              <Button type="button" onClick={close}>
                {tx('完成')}
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="ghost" disabled={busy} onClick={close}>
                {t('cancel')}
              </Button>
              <Button
                variant={action === 'delete' ? 'destructive' : 'default'}
                disabled={
                  busy ||
                  loading ||
                  !counts ||
                  (action === 'rename'
                    ? !name.trim() || name.trim() === current.name
                    : confirmation !== current.name)
                }
              >
                {busy ? (
                  <Loader2 className="animate-spin" />
                ) : action === 'delete' ? (
                  <Trash2 />
                ) : null}
                {action === 'delete' ? tx('删除项目') : t('save')}
              </Button>
            </>
          )}
        </div>
      </form>
    </Dialog>
  );
}
