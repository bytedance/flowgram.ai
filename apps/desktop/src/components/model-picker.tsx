/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { RefreshCw, Settings2 } from 'lucide-react';

import {
  modelUnavailable,
  openModelSettings,
  useModels,
  useModelLoadState,
  refreshModels,
  type ModelEntry,
  type ModelInventory,
  type ModelParameters,
  type ModelSelection,
} from '../lib/models';
import { tx } from '../lib/i18n';
import { Select, GroupedSelect } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function ModelParametersEditor({
  model,
  value,
  onChange,
}: {
  model?: ModelEntry;
  value: ModelParameters;
  onChange: (value: ModelParameters) => void;
}) {
  return (
    <div className="grid gap-3">
      {model?.capabilities.temperature === true && (
        <label className="settings-field">
          {tx('温度')}
          <Input
            type="number"
            min={0}
            max={2}
            step={0.1}
            value={value.temperature ?? ''}
            placeholder={String(model.parameters.temperature ?? tx('服务默认'))}
            onChange={(e) =>
              onChange({
                ...value,
                temperature: e.target.value === '' ? null : Number(e.target.value),
              })
            }
          />
        </label>
      )}
      {model?.capabilities.temperature === true && (
        <label className="settings-field">
          Top P
          <Input
            type="number"
            min={0}
            max={1}
            step={0.05}
            value={value.topP ?? ''}
            placeholder={String(model.parameters.topP ?? tx('服务默认'))}
            onChange={(e) =>
              onChange({ ...value, topP: e.target.value === '' ? null : Number(e.target.value) })
            }
          />
        </label>
      )}
      <label className="settings-field">
        {tx('最大输出 Token')}
        <Input
          type="number"
          min={1}
          max={262144}
          value={value.maxOutputTokens ?? ''}
          placeholder={String(model?.parameters.maxOutputTokens ?? tx('服务默认'))}
          onChange={(e) =>
            onChange({
              ...value,
              maxOutputTokens: e.target.value === '' ? null : Number(e.target.value),
            })
          }
        />
      </label>
      {!!model?.capabilities.reasoningEfforts.length && (
        <label className="settings-field">
          {tx('推理强度')}
          <Select
            value={value.reasoningEffort || ''}
            options={[
              { value: '', label: tx('模型默认') },
              ...model.capabilities.reasoningEfforts.map((v) => ({ value: v, label: v })),
            ]}
            onValueChange={(v) => onChange({ ...value, reasoningEffort: v || null })}
          />
        </label>
      )}
      {model?.capabilities.structuredOutput === true && (
        <label className="settings-field">
          {tx('输出 JSON Schema')}
          <textarea
            className="min-h-24 rounded-md border border-border bg-background p-2 font-mono text-xs"
            value={
              typeof value.outputSchema === 'string'
                ? value.outputSchema
                : value.outputSchema
                ? JSON.stringify(value.outputSchema, null, 2)
                : ''
            }
            placeholder={tx('留空使用模型默认')}
            onChange={(e) => {
              let schema: unknown = e.target.value || null;
              try {
                schema = JSON.parse(e.target.value);
              } catch {
                /* Keep the draft until it is valid JSON. */
              }
              onChange({ ...value, outputSchema: schema });
            }}
          />
        </label>
      )}
    </div>
  );
}
export function ModelPicker({
  value,
  onChange,
  projectId,
  kind = 'workflow',
  tools = false,
  disabled,
  parameters = true,
  inventory,
  inherit = true,
  manage = true,
  clearable = false,
  parameterPlacement = 'inline',
}: {
  value: ModelSelection;
  onChange: (value: ModelSelection) => void;
  projectId?: string;
  kind?: 'chat' | 'workflow';
  tools?: boolean;
  disabled?: boolean;
  parameters?: boolean;
  inventory?: ModelInventory;
  inherit?: boolean;
  manage?: boolean;
  clearable?: boolean;
  parameterPlacement?: 'inline' | 'popover';
}) {
  const global = useModels();
  const loadState = useModelLoadState();
  const loading = !inventory && ['idle', 'loading'].includes(loadState);
  const loadFailed = !inventory && loadState === 'error';
  const catalog = inventory || global;
  const current = catalog.models.find(
    (m) => m.id === (value.modelId || (inherit ? catalog.defaults[kind] : null))
  );
  const unavailable = current
    ? modelUnavailable(catalog, current, projectId, tools, kind === 'chat')
    : tx(loading ? '正在加载模型' : loadFailed ? '模型列表加载失败' : '尚未配置模型');
  return (
    <div className="min-w-0">
      <GroupedSelect
        label={tx('选择模型')}
        title={unavailable || current?.name}
        trigger={`${
          current?.name ||
          (loading
            ? tx('正在加载模型')
            : loadFailed
            ? tx('模型列表加载失败')
            : value.modelId
            ? tx('原模型不可用')
            : tx('选择模型'))
        }${!value.modelId && current ? ` · ${tx('默认')}` : ''}`}
        value={current?.id || ''}
        disabled={disabled}
        searchLabel={tx('搜索模型')}
        groups={catalog.connections.map((connection) => ({
          id: connection.id,
          label: connection.name,
          items: catalog.models
            .filter((m) => m.connectionId === connection.id)
            .map((m) => {
              const reason = modelUnavailable(catalog, m, projectId, tools, kind === 'chat');
              return {
                value: m.id,
                label: m.name,
                description: reason ? tx(reason) : undefined,
                disabled: !!reason,
              };
            }),
        }))}
        empty={tx(
          loading
            ? '正在加载模型'
            : loadFailed
            ? '模型列表加载失败'
            : catalog.models.length
            ? '没有匹配的模型'
            : '添加连接与模型后即可选择。'
        )}
        onValueChange={(id) => onChange({ modelId: id, parameters: {} })}
        leading={(close) => (
          <>
            {clearable && (
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => {
                  onChange({ modelId: null, parameters: {} });
                  close();
                }}
              >
                {tx('不设置默认模型')}
              </Button>
            )}
            {inherit && (
              <Button
                variant="ghost"
                className="w-full justify-start text-xs"
                onClick={() => {
                  onChange({ parameters: {} });
                  close();
                }}
              >
                {tx('使用默认模型')}
              </Button>
            )}
          </>
        )}
        footer={(close) => (
          <>
            {!inventory && (
              <div className="border-t border-border">
                {loadFailed && !!catalog.models.length && (
                  <p role="status" className="px-3 pt-2 text-xs text-muted-foreground">
                    {tx('模型列表刷新失败，正在显示上次加载的模型。')}
                  </p>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-xs"
                  disabled={loading}
                  onClick={() => void refreshModels(true).catch(() => undefined)}
                >
                  <RefreshCw size={14} className={loading ? 'motion-safe:animate-spin' : ''} />
                  {tx(loading ? '正在加载模型' : loadFailed ? '重试加载模型' : '刷新模型')}
                </Button>
              </div>
            )}
            {parameters && parameterPlacement === 'popover' && current && (
              <details className="border-t border-border p-2 text-xs text-muted-foreground">
                <summary className="cursor-pointer">{tx('模型参数')}</summary>
                <div className="py-3">
                  <ModelParametersEditor
                    model={current}
                    value={value.parameters || {}}
                    onChange={(next) => onChange({ ...value, parameters: next })}
                  />
                </div>
              </details>
            )}
            {manage && (
              <Button
                variant="ghost"
                className="w-full justify-start border-t border-border text-xs"
                onClick={() => {
                  close();
                  openModelSettings();
                }}
              >
                <Settings2 size={14} />
                {tx('管理模型')}
              </Button>
            )}
          </>
        )}
      />
      {parameters && parameterPlacement === 'inline' && current && (
        <details className="mt-2 text-xs text-muted-foreground">
          <summary className="cursor-pointer">{tx('模型参数')}</summary>
          <div className="py-3">
            <ModelParametersEditor
              model={current}
              value={value.parameters || {}}
              onChange={(next) => onChange({ ...value, parameters: next })}
            />
          </div>
        </details>
      )}
      {unavailable && parameters && parameterPlacement === 'inline' && (
        <p className="mt-1 text-xs text-muted-foreground">{tx(unavailable)}</p>
      )}
    </div>
  );
}
