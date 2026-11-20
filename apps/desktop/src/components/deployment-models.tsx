/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useState } from 'react';

import type { Workflow } from '../lib/types';
import type { ModelInventory, ModelSelection } from '../lib/models';
import { errorText, tx } from '../lib/i18n';
import { api } from '../lib/api';
import { ModelPicker } from './model-picker';

export function modelRequirements(workflows: Workflow[], selected?: string[]) {
  const slots = new Map<string, boolean>();
  const visited = new Set<string>();
  const walkWorkflow = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);
    const workflow = workflows.find((w) => w.id === id);
    if (workflow) walk(workflow.schema.nodes);
  };
  const walk = (nodes: Workflow['schema']['nodes']) => {
    for (const node of nodes) {
      if (node.type === 'llm' || node.type === 'agent') {
        const id = (node.data.model as ModelSelection | undefined)?.modelId || 'workflow-default';
        slots.set(id, slots.get(id) || false || node.type === 'agent');
      }
      if (node.type === 'subworkflow') {
        const bindings = node.data.inputsValues as
          | Record<string, { content?: unknown }>
          | undefined;
        if (typeof bindings?.workflowId?.content === 'string')
          walkWorkflow(bindings.workflowId.content);
      }
      if (node.blocks) walk(node.blocks);
    }
  };
  (selected || workflows.map((w) => w.id)).forEach(walkWorkflow);
  return [...slots].map(([slot, tools]) => ({ slot, tools }));
}
export function DeploymentModels({
  projectId,
  targetId,
  workflows,
  selected,
  value,
  onChange,
}: {
  projectId: string;
  targetId: string;
  workflows: Workflow[];
  selected?: string[];
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}) {
  const [catalog, setCatalog] = useState<ModelInventory | null>(null);
  const [error, setError] = useState('');
  const requirements = modelRequirements(workflows, selected);
  useEffect(() => {
    setCatalog(null);
    setError('');
    if (!requirements.length) return;
    const controller = new AbortController();
    void api<ModelInventory>(
      `/api/deployment/targets/${encodeURIComponent(
        targetId
      )}/models?projectId=${encodeURIComponent(projectId)}`,
      'GET',
      undefined,
      controller.signal
    )
      .then(setCatalog)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [targetId, projectId, requirements.length]);
  if (!requirements.length) return null;
  return (
    <section className="space-y-4 rounded-xl border border-border p-4">
      <h3 className="text-sm font-medium">{tx('运行环境模型绑定')}</h3>
      <p className="text-xs leading-5 text-muted-foreground">
        {tx(
          '为每个模型槽选择目标服务上的模型。发布后固定连接与参数，修改桌面默认模型不会影响线上服务。'
        )}
      </p>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      {!catalog && !error && <p className="text-xs text-muted-foreground">{tx('正在加载')}</p>}
      {requirements.map(({ slot, tools }, index) => (
        <div key={slot} className="flex items-center justify-between gap-3">
          <span className="min-w-0 text-xs" title={slot}>
            {slot === 'workflow-default' ? tx('工作流默认模型') : `${tx('模型槽')} ${index + 1}`}
            {tools ? ` · ${tx('工具调用')}` : ''}
          </span>
          {catalog && (
            <ModelPicker
              value={{ modelId: value[slot] }}
              onChange={(v) => onChange({ ...value, [slot]: v.modelId || '' })}
              projectId={projectId}
              tools={tools}
              inventory={catalog}
              parameters={false}
              inherit={false}
              manage={targetId === 'local'}
            />
          )}
          {!value[slot] && <span className="text-xs text-muted-foreground">{tx('未绑定')}</span>}
        </div>
      ))}
    </section>
  );
}
