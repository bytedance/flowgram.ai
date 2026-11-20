/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, type FormEvent } from 'react';

import { ArrowLeft, ChevronDown, Loader2 } from 'lucide-react';

import type { Workflow } from '../lib/types';
import { bindOperation, operationFromWorkflow } from '../lib/services';
import { tx, errorText } from '../lib/i18n';
import {
  credentialAvailable,
  deploymentPath,
  nextVersion,
  requiredSlots,
  type DeploymentInventory,
  type PublicationDetail,
  type PublicationDraft,
} from '../lib/deployment';
import { api } from '../lib/api';
import { Select } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { DeploymentField, deploymentEditor } from './deployment-ui';
import { DeploymentModels } from './deployment-models';

export function publicOperation(workflow: Workflow) {
  return {
    ...operationFromWorkflow(workflow),
    name: `workflow_${workflow.id.replace(/[^a-z0-9]/g, '').slice(0, 16)}`,
  };
}
export function PublicationForm({
  detail,
  inventory,
  workflowIntent,
  onDone,
  onBack,
}: {
  detail: PublicationDetail;
  inventory: DeploymentInventory;
  workflowIntent?: string;
  onDone: () => Promise<void>;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState<PublicationDraft>(() => {
    const draft = structuredClone(detail.draft);
    if (detail.releases.some((r) => r.version === draft.version))
      draft.version = nextVersion(detail.releases.map((r) => r.version));
    const workflow = detail.workflows.find((w) => w.id === workflowIntent);
    if (workflow && !draft.operations.some((op) => op.workflowId === workflow.id))
      draft.operations.push(publicOperation(workflow));
    return draft;
  });
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [callback, setCallback] = useState(!!draft.callback);
  const [bindingsText, setBindingsText] = useState(JSON.stringify(draft.bindings, null, 2));
  const slots = requiredSlots(detail.workflows, draft.operations);
  if (draft.callback?.secretEnv && !slots.includes(draft.callback.secretEnv))
    slots.push(draft.callback.secretEnv);
  const available = inventory.credentials.filter(
    (c) => c.purpose === 'connection' && credentialAvailable(c, detail.projectId)
  );
  function patch(value: Partial<PublicationDraft>) {
    setDraft((old) => ({ ...old, ...value }));
    setDirty(true);
    setSaved(false);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const publish =
      (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value') === 'publish';
    setBusy(publish ? 'publish' : 'save');
    setError('');
    setSaved(false);
    void (async () => {
      const bindings = JSON.parse(bindingsText);
      if (!bindings || Array.isArray(bindings) || typeof bindings !== 'object')
        throw new Error('Deployment bindings must be a JSON object');
      const next = {
        ...draft,
        bindings,
        callback: callback ? draft.callback : null,
        credentialBindings: Object.fromEntries(
          Object.entries(draft.credentialBindings).filter(
            ([slot, id]) => slots.includes(slot) && id
          )
        ),
        operations: draft.operations.map((op, index) => {
          const inputSchema = JSON.parse(String(form.get(`input-${index}`)));
          const outputSchema = JSON.parse(String(form.get(`output-${index}`)));
          const bindings = JSON.parse(String(form.get(`bindings-${index}`)));
          return bindOperation({ ...op, inputSchema, outputSchema }, bindings);
        }),
      };
      await api(deploymentPath(detail.id), 'PUT', next);
      setDraft(next);
      setDirty(false);
      setSaved(true);
      if (publish) await api(`${deploymentPath(detail.id)}/publish`, 'POST', {});
      if (publish) await onDone();
    })()
      .catch((cause) =>
        setError(cause instanceof SyntaxError ? tx('JSON 格式无效，请检查配置。') : cause.message)
      )
      .finally(() => setBusy(''));
  }
  return (
    <div>
      <Button
        variant="ghost"
        className="mb-5 -ml-3"
        disabled={!!busy}
        onClick={() => (dirty ? setDiscard(true) : onBack())}
      >
        <ArrowLeft />
        {tx('返回发布详情')}
      </Button>
      {discard && (
        <div className="mb-5 flex flex-wrap items-center gap-3 rounded-xl border border-border p-4 text-sm">
          <span>{tx('配置尚未保存。保存后返回，或放弃本次更改。')}</span>
          <Button variant="outline" size="sm" onClick={onBack}>
            {tx('放弃更改')}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDiscard(false)}>
            {tx('继续编辑')}
          </Button>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-lg font-medium">{tx('发布配置')}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {inventory.projects.find((p) => p.id === detail.projectId)?.name} ·{' '}
          {tx('公开入口及其依赖会冻结为独立版本。')}
        </p>
      </div>
      <form
        onSubmit={submit}
        className="space-y-8"
        onChange={() => {
          setDirty(true);
          setSaved(false);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <DeploymentField label={tx('发布名称')}>
            <Input
              required
              value={draft.title}
              onChange={(e) => patch({ title: e.target.value })}
              maxLength={200}
            />
          </DeploymentField>
          <DeploymentField label={tx('版本号')}>
            <Input
              required
              value={draft.version}
              onChange={(e) => patch({ version: e.target.value })}
              pattern="[A-Za-z0-9._-]+"
              maxLength={64}
            />
          </DeploymentField>
        </div>
        <section>
          <h3 className="mb-2 text-sm font-medium">{tx('公开工作流')}</h3>
          <p className="mb-4 text-xs leading-5 text-muted-foreground">
            {tx('仅选中的工作流提供外部入口；依赖的子流程随版本打包，不自动公开。')}
          </p>
          <div className="space-y-2">
            {detail.workflows.map((workflow) => {
              const index = draft.operations.findIndex((op) => op.workflowId === workflow.id);
              return (
                <label
                  key={workflow.id}
                  className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm"
                >
                  <input
                    type="checkbox"
                    className="accent-current"
                    checked={index >= 0}
                    onChange={(e) =>
                      patch({
                        operations: e.target.checked
                          ? [...draft.operations, publicOperation(workflow)]
                          : draft.operations.filter((op) => op.workflowId !== workflow.id),
                      })
                    }
                  />
                  <span className="min-w-0 flex-1 truncate">{workflow.name}</span>
                  {index >= 0 && <span className="text-xs text-muted-foreground">HTTP · MCP</span>}
                </label>
              );
            })}
          </div>
          {!detail.workflows.length && (
            <p className="text-sm text-muted-foreground">{tx('此项目还没有可发布的工作流')}</p>
          )}
          {draft.operations.map((operation, index) => (
            <details key={operation.workflowId} className="mt-3 rounded-xl border border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                {detail.workflows.find((w) => w.id === operation.workflowId)?.name}
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {tx('接口定义')}
                  <ChevronDown size={13} />
                </span>
              </summary>
              <div className="space-y-4 border-t border-border p-4">
                <DeploymentField
                  label={tx('调用名称')}
                  hint={tx('使用稳定的英文标识，HTTP 与 MCP 共用。')}
                >
                  <Input
                    required
                    pattern="[a-z0-9_-]+"
                    maxLength={64}
                    value={operation.name}
                    onChange={(e) =>
                      patch({
                        operations: draft.operations.map((op, i) =>
                          i === index ? { ...op, name: e.target.value } : op
                        ),
                      })
                    }
                  />
                </DeploymentField>
                <DeploymentField label={tx('英文工具说明')}>
                  <Input
                    required
                    value={operation.description}
                    onChange={(e) =>
                      patch({
                        operations: draft.operations.map((op, i) =>
                          i === index ? { ...op, description: e.target.value } : op
                        ),
                      })
                    }
                  />
                </DeploymentField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <DeploymentField label={tx('超时（毫秒）')}>
                    <Input
                      type="number"
                      min={10}
                      max={3600000}
                      value={operation.timeoutMs}
                      onChange={(e) =>
                        patch({
                          operations: draft.operations.map((op, i) =>
                            i === index ? { ...op, timeoutMs: Number(e.target.value) } : op
                          ),
                        })
                      }
                    />
                  </DeploymentField>
                  <label className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="accent-current"
                      checked={operation.readOnly}
                      onChange={(e) =>
                        patch({
                          operations: draft.operations.map((op, i) =>
                            i === index ? { ...op, readOnly: e.target.checked } : op
                          ),
                        })
                      }
                    />
                    {tx('只读操作')}
                  </label>
                </div>
                <DeploymentField label={tx('输入契约')}>
                  <textarea
                    name={`input-${index}`}
                    className={deploymentEditor}
                    defaultValue={JSON.stringify(operation.inputSchema, null, 2)}
                    required
                  />
                </DeploymentField>
                <DeploymentField label={tx('输出契约')}>
                  <textarea
                    name={`output-${index}`}
                    className={deploymentEditor}
                    defaultValue={JSON.stringify(operation.outputSchema, null, 2)}
                    required
                  />
                </DeploymentField>
                <DeploymentField
                  label={tx('环境配置映射')}
                  hint={tx('将内部输入字段映射到部署配置，并从公开输入中移除该字段。')}
                >
                  <textarea
                    name={`bindings-${index}`}
                    className={deploymentEditor}
                    defaultValue={JSON.stringify(operation.bindings, null, 2)}
                    required
                  />
                </DeploymentField>
              </div>
            </details>
          ))}
        </section>
        <section className="space-y-5 border-t border-border pt-6">
          <h3 className="text-sm font-medium">{tx('发布目标')}</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <DeploymentField label={tx('运行服务')}>
              <Select
                value={draft.targetId}
                onValueChange={(targetId) => patch({ targetId, modelBindings: {} })}
                options={[
                  { value: 'local', label: tx('本机运行服务') },
                  ...inventory.targets.map((t) => ({ value: t.id, label: t.name })),
                ]}
              />
            </DeploymentField>
            <DeploymentField label={tx('环境标识')}>
              <Input
                required
                pattern="[a-z0-9_-]+"
                maxLength={64}
                value={draft.environment}
                onChange={(e) => patch({ environment: e.target.value })}
              />
            </DeploymentField>
          </div>
          <DeploymentModels
            projectId={detail.projectId}
            targetId={draft.targetId}
            workflows={detail.workflows}
            selected={draft.operations.map((op) => op.workflowId)}
            value={draft.modelBindings || {}}
            onChange={(modelBindings) => patch({ modelBindings })}
          />
          {draft.targetId === 'local' && (
            <p className="text-xs leading-5 text-muted-foreground">
              {tx('本机发布用于联调。退出应用后，本机服务停止。')}
            </p>
          )}
          <DeploymentField label={tx('最大并发')}>
            <Input
              className="max-w-40"
              type="number"
              min={1}
              max={128}
              required
              value={draft.maxConcurrency}
              onChange={(e) => patch({ maxConcurrency: Number(e.target.value) })}
            />
          </DeploymentField>
          <DeploymentField
            label={tx('环境配置值')}
            hint={tx('填写普通配置，密钥请使用下方凭证绑定。')}
          >
            <textarea
              className={deploymentEditor}
              value={bindingsText}
              onChange={(e) => setBindingsText(e.target.value)}
            />
          </DeploymentField>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="accent-current"
              checked={callback}
              onChange={(e) => {
                setCallback(e.target.checked);
                patch({
                  callback: e.target.checked
                    ? { url: '', secretEnv: 'FLOWGRAM_CONNECTION_CALLBACK' }
                    : null,
                });
              }}
            />
            {tx('完成回调')}
          </label>
          {callback && (
            <div className="grid gap-4 sm:grid-cols-2">
              <DeploymentField label={tx('回调地址')}>
                <Input
                  type="url"
                  required
                  value={draft.callback?.url || ''}
                  onChange={(e) =>
                    patch({
                      callback: {
                        url: e.target.value,
                        secretEnv: draft.callback?.secretEnv || 'FLOWGRAM_CONNECTION_CALLBACK',
                      },
                    })
                  }
                />
              </DeploymentField>
              <DeploymentField label={tx('签名凭证槽位')}>
                <Input
                  required
                  pattern="FLOWGRAM_CONNECTION_[A-Z0-9_]+"
                  value={draft.callback?.secretEnv || ''}
                  onChange={(e) =>
                    patch({
                      callback: { url: draft.callback?.url || '', secretEnv: e.target.value },
                    })
                  }
                />
              </DeploymentField>
            </div>
          )}
        </section>
        {slots.length > 0 && (
          <section className="space-y-4 border-t border-border pt-6">
            <h3 className="text-sm font-medium">{tx('凭证绑定')}</h3>
            <p className="text-xs leading-5 text-muted-foreground">
              {tx('只显示此项目有权使用的凭证。密钥不会进入工作流或发布包。')}
            </p>
            {slots.map((slot) => (
              <DeploymentField key={slot} label={slot}>
                <Select
                  value={draft.credentialBindings[slot] || ''}
                  onValueChange={(id) =>
                    patch({ credentialBindings: { ...draft.credentialBindings, [slot]: id } })
                  }
                  options={[
                    { value: '', label: tx('使用运行服务环境配置') },
                    ...available.map((c) => ({ value: c.id, label: c.name })),
                  ]}
                />
              </DeploymentField>
            ))}
          </section>
        )}
        <DeploymentField label={tx('版本说明')}>
          <textarea
            className={deploymentEditor + ' font-sans'}
            value={draft.notes}
            onChange={(e) => patch({ notes: e.target.value })}
            placeholder={tx('描述本次发布的变更')}
          />
        </DeploymentField>
        {error && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 p-3 text-sm text-destructive"
          >
            {errorText(error)}
          </p>
        )}
        {saved && !error && (
          <p role="status" className="text-sm text-muted-foreground">
            {tx('发布配置已保存')}
          </p>
        )}
        <footer className="sticky bottom-0 flex flex-wrap items-center justify-end gap-3 border-t border-border bg-background py-4">
          <Button
            type="button"
            variant="ghost"
            disabled={!!busy}
            onClick={() => (dirty ? setDiscard(true) : onBack())}
          >
            {tx('取消')}
          </Button>
          <Button type="submit" value="save" variant="outline" disabled={!!busy}>
            {busy === 'save' && <Loader2 className="animate-spin" />}
            {tx('保存草稿')}
          </Button>
          <Button type="submit" value="publish" disabled={!!busy || !draft.operations.length}>
            {busy === 'publish' && <Loader2 className="animate-spin" />}
            {tx('发布')}
          </Button>
        </footer>
      </form>
    </div>
  );
}
