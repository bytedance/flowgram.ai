/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useRef, useState } from 'react';

import { Download, FileJson, FolderOpen, Loader2, Upload } from 'lucide-react';

import type { Workflow } from '../lib/types';
import type { Project } from '../lib/types';
import { errorText, t, tx } from '../lib/i18n';
import { api } from '../lib/api';
import { Input } from './ui/input';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { ModelPicker } from './model-picker';
import { modelRequirements } from './deployment-models';

const MAX_PACKAGE_BYTES = 64 * 1024 * 1024;
type Package = {
  format: string;
  formatVersion: number;
  name: string;
  workflows: Workflow[];
  files: unknown[];
  history: Record<string, unknown[]> | null;
};
export function ProjectTransfer({
  mode,
  project,
  close,
  imported,
}: {
  mode: 'import' | 'export';
  project?: Project;
  close: () => void;
  imported: (project: Project) => Promise<void>;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');
  const [source, setSource] = useState<Package | null>(null);
  const [modelBindings, setModelBindings] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [directory, setDirectory] = useState('');
  const [history, setHistory] = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const desktop = '__TAURI_INTERNALS__' in window;
  async function chooseDirectory() {
    try {
      const { open } = await import('@tauri-apps/plugin-dialog');
      const path = await open({ directory: true, multiple: false });
      if (typeof path === 'string') setDirectory(path);
    } catch (cause) {
      setError((cause as Error).message);
    }
  }
  async function submit() {
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      if (mode === 'import') {
        if (!source) return;
        const created = await api<Project>('/api/projects/import', 'POST', {
          package: source,
          name: name.trim(),
          modelBindings,
          directory: directory.trim() || undefined,
        });
        await imported(created);
        close();
      } else if (project) {
        const fileName = `${
          project.name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '-').slice(0, 80) || 'project'
        }.flowgram.json`;
        let destination: string | undefined;
        if (desktop) {
          const { save } = await import('@tauri-apps/plugin-dialog');
          const path = await save({
            title: tx('导出项目'),
            defaultPath: fileName,
            filters: [{ name: tx('FlowGram 项目包'), extensions: ['flowgram.json'] }],
          });
          if (!path) return;
          destination = path.endsWith('.flowgram.json') ? path : `${path}.flowgram.json`;
        }
        const result = await api<Package>(`/api/projects/${project.id}/export`, 'POST', {
          includeHistory: history,
          destination,
        });
        if (!destination) {
          const url = URL.createObjectURL(
            new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
          );
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.click();
          // Let the browser consume the download before releasing its URL.
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
        setDone(true);
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
      title={mode === 'import' ? tx('导入项目') : tx('导出项目')}
    >
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
        aria-busy={busy}
      >
        <p className="text-sm leading-6 text-muted-foreground">
          {mode === 'import'
            ? tx('从项目包创建独立副本，保留工作流引用。历史队列保持暂停，不会自动执行。')
            : tx('导出已保存的工作流、项目资源和配置，可在其他设备或应用中导入。')}
        </p>
        {mode === 'import' ? (
          <>
            <input
              ref={input}
              type="file"
              accept=".json,.flowgram.json,application/json"
              className="hidden"
              aria-label={tx('选择项目包')}
              disabled={busy}
              onChange={async (event) => {
                const field = event.currentTarget;
                const file = field.files?.[0];
                if (!file) return;
                setError('');
                setSource(null);
                setFileName('');
                setBusy(true);
                try {
                  if (file.size > MAX_PACKAGE_BYTES)
                    throw new Error('Project package exceeds 64 MB');
                  let value: Package;
                  try {
                    value = JSON.parse(await file.text()) as Package;
                  } catch {
                    throw new Error('Invalid project package JSON');
                  }
                  if (
                    value?.format !== 'flowgram-project' ||
                    value.formatVersion !== 3 ||
                    typeof value.name !== 'string' ||
                    !Array.isArray(value.workflows) ||
                    !Array.isArray(value.files)
                  )
                    throw new Error('Unsupported project package format');
                  setSource(value);
                  setName(value.name);
                  setFileName(file.name);
                } catch (cause) {
                  setError((cause as Error).message);
                } finally {
                  field.value = '';
                  setBusy(false);
                }
              }}
            />
            <div className="rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <FileJson className="shrink-0 text-muted-foreground" size={20} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {fileName || tx('FlowGram 项目包')}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {source
                      ? tx('{0} 个工作流 · {1} 个资源', [
                          source.workflows.length,
                          source.files.length,
                        ])
                      : tx('选择 .flowgram.json 文件，最大 64 MB')}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={busy}
                  onClick={() => input.current?.click()}
                >
                  {source ? tx('更换文件') : tx('选择文件')}
                </Button>
              </div>
              {source && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {source.history ? tx('包含会话和运行记录') : tx('不包含会话和运行记录')}
                </p>
              )}
            </div>
            {source &&
              modelRequirements(source.workflows)
                .filter((r) => r.slot !== 'workflow-default')
                .map(({ slot, tools }, index) => (
                  <div key={slot} className="rounded-lg border border-border p-3">
                    <p className="mb-2 text-xs">
                      {tx('模型映射')} {index + 1}
                    </p>
                    <ModelPicker
                      value={{ modelId: modelBindings[slot] || slot }}
                      onChange={(v) =>
                        setModelBindings({ ...modelBindings, [slot]: v.modelId || '' })
                      }
                      tools={tools}
                      inherit={false}
                      parameters={false}
                    />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {tx('未绑定的模型可在导入后重新配置，导入不会携带凭证。')}
                    </p>
                  </div>
                ))}
            <label className="grid gap-2 text-xs">
              {t('projectName')}
              <Input
                required
                value={name}
                disabled={busy}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-xs">
              {tx('项目位置')}
              <div className="flex gap-2">
                <Input
                  value={directory}
                  disabled={busy}
                  onChange={(event) => setDirectory(event.target.value)}
                  placeholder={tx('留空使用应用管理的位置')}
                />
                {desktop && (
                  <Button
                    type="button"
                    variant="outline"
                    aria-label={tx('选择目录')}
                    disabled={busy}
                    onClick={() => void chooseDirectory()}
                  >
                    <FolderOpen />
                  </Button>
                )}
              </div>
              <span className="leading-5 text-muted-foreground">
                {tx('将在此位置创建独立项目文件夹，不覆盖已有项目。')}
              </span>
            </label>
          </>
        ) : (
          <>
            <p className="truncate text-sm font-medium">{project?.name}</p>
            <label className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 accent-primary"
                checked={history}
                disabled={busy}
                onChange={(event) => setHistory(event.target.checked)}
              />
              <span>
                {tx('包含会话和运行记录')}
                <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                  {tx('保留消息、工具调用、执行过程和结果；取消后仅导出工程内容。')}
                </span>
              </span>
            </label>
          </>
        )}
        <p className="text-xs leading-5 text-muted-foreground">
          {tx('全局模型连接、凭证和部署配置不包含在项目包中。')}
        </p>
        {error && (
          <p role="alert" className="text-sm leading-6 text-destructive">
            {errorText(error)}
          </p>
        )}
        {done && (
          <p role="status" className="text-sm">
            {tx('项目包已导出')}
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" disabled={busy} onClick={close}>
            {done ? tx('完成') : t('cancel')}
          </Button>
          <Button disabled={busy || (mode === 'import' ? !source || !name.trim() : !project)}>
            {busy ? (
              <Loader2 className="animate-spin" />
            ) : mode === 'import' ? (
              <Upload />
            ) : (
              <Download />
            )}
            {busy ? tx('正在处理') : mode === 'import' ? tx('导入项目') : tx('导出项目')}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
