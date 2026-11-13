/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, useState } from 'react';

import { Plus } from 'lucide-react';

import { useProjectApi } from '../lib/project-context';
import { errorText, tx } from '../lib/i18n';
import { Button } from './ui/button';

export function ResourcesPage() {
  const request = useProjectApi();
  const [resources, setResources] = useState<{ name: string; size: number }[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    void request<typeof resources>('/api/resources', 'GET', undefined, controller.signal)
      .then(setResources)
      .catch((cause) => {
        if (!controller.signal.aborted) setError(cause.message);
      });
    return () => controller.abort();
  }, [request]);
  return (
    <section className="h-full overflow-auto p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="mt-2 text-sm text-muted-foreground">
            {tx('在项目的多个工作流之间共享输入文件与模板。')}
          </p>
        </div>
        <Button variant="outline" disabled={busy} onClick={() => input.current?.click()}>
          <Plus />
          {tx('导入文件')}
        </Button>
      </div>
      <input
        ref={input}
        type="file"
        className="hidden"
        onChange={async (event) => {
          const field = event.currentTarget;
          const file = field.files?.[0];
          if (!file) return;
          setBusy(true);
          setError('');
          try {
            if (file.size > 1_000_000) throw new Error(tx('单个资源不能超过 1 MB'));
            const bytes = new Uint8Array(await file.arrayBuffer());
            let binary = '';
            for (const byte of bytes) binary += String.fromCharCode(byte);
            await request('/api/resources', 'POST', {
              name: file.name,
              contentBase64: btoa(binary),
            });
            setResources(await request('/api/resources'));
          } catch (cause) {
            setError((cause as Error).message);
          } finally {
            setBusy(false);
            field.value = '';
          }
        }}
      />
      {error && (
        <p role="alert" className="mb-4 text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      {resources.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between gap-4 border-b border-border py-4 text-sm"
        >
          <span>{item.name}</span>
          <span className="text-xs text-muted-foreground">{Math.ceil(item.size / 1024)} KB</span>
        </div>
      ))}
      {!resources.length && (
        <p className="py-12 text-sm text-muted-foreground">{tx('还没有项目资源')}</p>
      )}
    </section>
  );
}
