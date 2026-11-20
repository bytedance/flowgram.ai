/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useState } from 'react';

import { Select } from '../ui/select';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import type { Workflow } from '../../lib/types';
import type { Execution, TraceDetail } from '../../lib/run-trace';
import { useProject, projectApi } from '../../lib/project-context';
import { tx, errorText } from '../../lib/i18n';
import { prepareDebugIntent } from '../../lib/debug-intent';

export function DebugDialog({
  detail,
  entry,
  workflows,
  requestRoot,
  onClose,
  onPrepared,
}: {
  detail: TraceDetail;
  entry: Execution | null;
  workflows: Workflow[];
  requestRoot?: string;
  onClose: () => void;
  onPrepared: (workflow: Workflow) => void | Promise<void>;
}) {
  const { projectId, request } = useProject();
  const [version, setVersion] = useState('snapshot');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const workflowId = entry?.workflowId || detail.run.workflowId;
  const current = workflows.find((workflow) => workflow.id === workflowId);
  async function prepare() {
    setBusy(true);
    setError('');
    try {
      const origin = {
        runId: detail.run.id,
        workflowId,
        executionId: entry?.id || null,
        requestRoot: requestRoot || null,
      };
      const local = projectApi(projectId);
      const sample = entry
        ? await request<{ inputs: Record<string, unknown>; bindings: Record<string, unknown> }>(
            `/api/runs/${detail.run.id}?view=sample&execution=${encodeURIComponent(entry.id)}`
          )
        : { inputs: detail.run.inputs, bindings: undefined };
      let workflow = current;
      if (version === 'snapshot') {
        const snapshots: Workflow[] = [];
        const pending = [...detail.manifest.workflows];
        await Promise.all(
          Array.from({ length: Math.min(4, pending.length) }, async () => {
            while (pending.length) {
              const next = pending.shift()!;
              if (next.workflowId === detail.snapshot?.id) snapshots.push(detail.snapshot);
              else
                snapshots.push(
                  (
                    await request<{ snapshot: Workflow }>(
                      `/api/runs/${detail.run.id}?view=snapshot&workflowId=${encodeURIComponent(
                        next.workflowId
                      )}`
                    )
                  ).snapshot
                );
            }
          })
        );
        const copied = await local<{ workflow: Workflow }>('/api/debug/copy', 'POST', {
          workflowId,
          workflows: snapshots,
          nameSuffix: tx('调试副本'),
          origin,
        });
        workflow = copied.workflow;
      }
      if (!workflow) throw new Error(tx('当前工作流不可用，请选择当时版本。'));
      prepareDebugIntent(projectId, workflow.id, {
        inputs: sample.inputs,
        bindings: sample.bindings,
        nodeId: entry?.nodeId,
        origin,
      });
      await onPrepared(workflow);
      onClose();
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
        if (!open && !busy) onClose();
      }}
      title={entry ? tx('使用历史输入测试节点') : tx('使用历史输入调试')}
    >
      <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
        {tx('将历史输入带入编辑器，确认后再运行。模型连接和凭证使用当前可用配置。')}
      </p>
      <label className="block text-xs text-muted-foreground">
        {tx('工作流版本')}
        <Select
          className="mt-2 w-full"
          value={version}
          onValueChange={setVersion}
          disabled={busy}
          options={[
            { value: 'snapshot', label: tx('当时版本 · 创建调试副本'), disabled: !detail.snapshot },
            {
              value: 'current',
              label: current
                ? tx('当前工作流（保留草稿） · v{0}', [current.revision])
                : tx('当前工作流不可用'),
              disabled: !current,
            },
          ]}
        />
      </label>
      {version === 'snapshot' && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {tx('工作流及其依赖会一起复制，原工作流和未保存草稿保持原样。')}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-4 text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" disabled={busy} onClick={onClose}>
          {tx('取消')}
        </Button>
        <Button
          disabled={busy || (version === 'snapshot' && !detail.snapshot)}
          onClick={() => void prepare()}
        >
          {busy ? tx('准备中…') : tx('打开调试')}
        </Button>
      </div>
    </Dialog>
  );
}
