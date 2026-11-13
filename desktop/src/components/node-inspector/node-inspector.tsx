/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import {
  ArrowLeft,
  Check,
  ChevronRight,
  Loader2,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Play,
  Square,
  X,
} from 'lucide-react';

import { useContentTransition } from '../ui/presence';
import { InlineRename } from '../ui/inline-rename';
import { Button } from '../ui/button';
import { useFormSession } from '../form/session';
import { Select } from '../form/field';
import { FormField, FormSection, StatusLabel } from '../form/field';
import type { Run, RuntimeEvent, WorkflowNode } from '../../lib/types';
import { useProjectApi } from '../../lib/project-context';
import { nodeSpec } from '../../lib/node-catalog';
import { errorText, tx, localized, getLocale } from '../../lib/i18n';
import { eventData, executionLabel } from '../../lib/execution-samples';
import { isJoin } from '../../lib/control-nodes';
import { testSample } from './test-samples';
import { NodeForm, OutputTree } from './node-form';
import {
  asValue,
  accessibleNodes,
  executionSignature,
  readPath,
  signature,
  type Data,
  type Schema,
} from './model';
import { definitionFor, visibleFields } from './definitions';

export interface RunDetail {
  run: Run;
  events: RuntimeEvent[];
  nodeTest?: { node: WorkflowNode; bindings: Data } | null;
}

function infer(value: unknown): Schema {
  if (value === null) return { type: 'null' };
  if (Array.isArray(value)) return { type: 'array', items: value.length ? infer(value[0]) : {} };
  if (typeof value === 'object')
    return {
      type: 'object',
      properties: Object.fromEntries(
        Object.entries(value as Data)
          .slice(0, 100)
          .map(([key, v]) => [key, infer(v)])
      ),
    };
  return { type: typeof value };
}
function ResultViewer({ value }: { value: unknown }) {
  const text = JSON.stringify(value, null, 2) ?? 'null';
  return (
    <pre className="nf-result-json">
      {text.length > 24000 ? text.slice(0, 24000) + tx('\n…结果过长，仅显示预览') : text}
    </pre>
  );
}
const runLabels: Record<string, string> = localized(
  {
    running: '运行中',
    succeeded: '已完成',
    failed: '执行失败',
    canceled: '已取消',
    interrupted: '已中断',
  },
  'labels'
);

export function NodeInspector({
  renaming,
  onRenameStart,
  onRename,
  onRenameEnd,
  onMenu,
  tabRequest,
  expanded,
  onExpand,
  onClose,
  onEdit,
  onTest,
  onInspectRun,
  workflowRunId,
  runs,
  selectedTestId,
  saveStatus,
  onSave,
  onSelectNode,
  navigation,
  executions = [],
  selectedExecutionId,
  onSelectExecution,
}: {
  renaming: boolean;
  onRenameStart: () => void;
  onRename: (title: string) => void;
  onRenameEnd: () => void;
  onMenu: (point: { x: number; y: number }) => void;
  tabRequest?: { nodeId: string; tab: string; sequence: number };
  expanded: boolean;
  onExpand: () => void;
  onClose: () => void;
  onEdit: (data: Data) => void;
  onTest: (nodeId: string, inputs: Data, bindings: Data) => Promise<Run>;
  onInspectRun?: (id: string) => void;
  workflowRunId?: string;
  runs: Run[];
  selectedTestId?: string;
  saveStatus: string;
  onSave: () => void;
  onSelectNode: (id: string) => void;
  navigation: WorkflowNode[];
  executions?: RuntimeEvent[];
  selectedExecutionId?: string;
  onSelectExecution?: (id: string) => void;
}) {
  const api = useProjectApi();
  const session = useFormSession();
  const { node } = session;
  const spec = nodeSpec(node.type);
  const Icon = spec.icon;
  const [tabs, setTabs] = useState<Record<string, string>>({});
  const [details, setDetails] = useState<Record<string, RunDetail>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [starting, setStarting] = useState<string | null>(null);
  const mounted = useRef(true);
  const activeRun =
    (selectedTestId && runs.find((r) => r.id === selectedTestId && r.testNodeId === node.id)) ||
    runs.find((r) => r.testNodeId === node.id);
  const detail = details[node.id];
  const run = detail?.run || activeRun;
  const tab = tabs[node.id] || 'config';
  const setTab = (tab: string) => setTabs((current) => ({ ...current, [node.id]: tab }));
  useEffect(() => {
    if (tabRequest?.nodeId === node.id) setTab(tabRequest.tab);
  }, [tabRequest]);
  const nodeId = node.id;
  const content = useRef<HTMLDivElement>(null);
  useContentTransition(content, `${node.id}:${tab}`);
  const scrollPositions = useRef<Record<string, number>>({});
  const scrollKey = `${nodeId}:${tab}`;
  useLayoutEffect(() => {
    if (content.current) content.current.scrollTop = scrollPositions.current[scrollKey] || 0;
  }, [scrollKey]);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  useEffect(() => {
    if (selectedTestId) setTabs((current) => ({ ...current, [nodeId]: 'test' }));
  }, [selectedTestId, nodeId]);
  const pollingId = detail?.run.status === 'running' ? detail.run.id : activeRun?.id;
  useEffect(() => {
    if (!pollingId) return;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const next = await api<RunDetail>(
          `/api/runs/${pollingId}`,
          'GET',
          undefined,
          controller.signal
        );
        if (controller.signal.aborted) return;
        setDetails((current) => {
          const previous = current[nodeId];
          if (
            previous &&
            previous.run.id !== pollingId &&
            previous.run.createdAt > next.run.createdAt
          )
            return current;
          return { ...current, [nodeId]: next };
        });
        if (next.run.status === 'running') timer = setTimeout(poll, 450);
      } catch (e) {
        if (!controller.signal.aborted)
          setErrors((current) => ({ ...current, [nodeId]: (e as Error).message }));
      }
    };
    void poll();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [pollingId, nodeId, activeRun?.status]);
  const configFields = visibleFields(node);
  const invalid = Object.entries(session.buffers).filter(
    ([key, buffer]) =>
      key.startsWith(`${node.id}:`) &&
      buffer.invalid &&
      !key.includes(':__test') &&
      (configFields.some((field) => key.startsWith(`${node.id}:${field.key}`)) ||
        key.includes(':runtime.'))
  );
  const stale =
    !!detail?.nodeTest && executionSignature(detail.nodeTest.node) !== executionSignature(node);
  const inputKey = `${node.id}:__test.inputs`;
  const contextKey = `${node.id}:__test.bindings`;
  const inputText =
    session.buffers[inputKey]?.text ?? JSON.stringify(testSample(node, session.bindings), null, 2);
  const contextText =
    session.buffers[contextKey]?.text ?? JSON.stringify(session.bindings, null, 2);
  useEffect(() => {
    // A test input is an editable sample, independent of later configuration revisions.
    if (!session.buffers[inputKey] && Object.keys(session.bindings).length) {
      session.setBuffer(inputKey, {
        text: JSON.stringify(testSample(node, session.bindings), null, 2),
        signature: '',
      });
      session.setBuffer(contextKey, {
        text: JSON.stringify(session.bindings, null, 2),
        signature: '',
      });
    }
  }, [nodeId, session.bindings]);
  const start = async () => {
    const selected = node.id;
    setTabs((current) => ({ ...current, [selected]: 'test' }));
    setErrors((current) => ({ ...current, [selected]: '' }));
    try {
      if (invalid.length) throw new Error(tx('配置中有未完成或无效字段，请先修正。'));
      const missing = configFields
        .filter((field) => field.required && field.editor !== 'resource')
        .find((field) => {
          const current = asValue(readPath(node.data, field.key.split('.')));
          return (
            (current.type === 'constant' &&
              (current.content === undefined ||
                (field.type !== 'any' && current.content === null))) ||
            (current.type === 'ref' && (!Array.isArray(current.content) || !current.content.length))
          );
        });
      if (missing) throw new Error(tx('请配置{0}', [missing.label]));
      const inputs = JSON.parse(inputText) as Data;
      const bindings = JSON.parse(contextText) as Data;
      if (
        !inputs ||
        Array.isArray(inputs) ||
        typeof inputs !== 'object' ||
        !bindings ||
        Array.isArray(bindings) ||
        typeof bindings !== 'object'
      )
        throw new Error(tx('测试输入与上游样本必须是 JSON 对象'));
      for (const field of configFields.filter((field) => field.key.startsWith('inputsValues.'))) {
        const configured = asValue(readPath(node.data, field.key.split('.')));
        const key = field.key.slice('inputsValues.'.length);
        if (configured.type === 'ref' && !Object.hasOwn(inputs, key))
          throw new Error(
            tx('请在测试输入中提供「{0}」的样本；测试不会运行上游节点。', [field.label])
          );
      }
      configFields
        .filter((field) => field.editor === 'select')
        .forEach((field) => {
          const key = field.key.split('.').slice(1).join('.');
          if (key)
            inputs[key] =
              asValue(readPath(node.data, field.key.split('.'))).content ?? field.choices?.[0]?.[0];
        });
      session.setBuffer(inputKey, { text: JSON.stringify(inputs, null, 2), signature: '' });
      setStarting(selected);
      const result = await onTest(selected, inputs, bindings);
      if (mounted.current)
        setDetails((current) => ({
          ...current,
          [selected]: {
            run: result,
            events: [],
            nodeTest: { node: structuredClone(node), bindings },
          },
        }));
    } catch (e) {
      if (mounted.current)
        setErrors((current) => ({ ...current, [selected]: (e as Error).message }));
    } finally {
      if (mounted.current) setStarting((current) => (current === selected ? null : current));
    }
  };
  const stop = async () => {
    if (!run) return;
    try {
      await api(`/api/runs/${run.id}/cancel`, 'POST', {});
    } catch (e) {
      setErrors((current) => ({ ...current, [node.id]: (e as Error).message }));
    }
  };
  const output = definitionFor(node).output(node.data);
  const upstreamNodes = accessibleNodes(session.schema, node.id);
  const editTest = (key: string, text: string) => session.setBuffer(key, { text, signature: '' });
  const outputReference = (
    <>
      <h3>{tx('输出参考')}</h3>
      <OutputTree schema={output} />
      <h3>{tx('上游输入')}</h3>
      {upstreamNodes.map((upstream) => (
        <details className="nf-reference-detail" key={upstream.id}>
          <summary>{String(upstream.data.title || upstream.id)}</summary>
          {Object.hasOwn(session.bindings, upstream.id) ? (
            <ResultViewer value={session.bindings[upstream.id]} />
          ) : (
            <OutputTree schema={definitionFor(upstream).output(upstream.data)} />
          )}
        </details>
      ))}
      {!upstreamNodes.length && <p className="nf-muted">{tx('当前节点没有可引用的上游输出')}</p>}
    </>
  );
  return (
    <div className={`node-inspector-workspace ${expanded ? 'is-expanded' : ''}`}>
      {expanded && (
        <nav className="nf-node-navigation" aria-label={tx('节点导航')}>
          <Button size="sm" variant="ghost" onClick={onExpand}>
            <ArrowLeft />
            {tx('返回画布')}
          </Button>
          <p>{tx('工作流节点')}</p>
          {navigation.map((item) => {
            const s = nodeSpec(item.type);
            const Icon = s.icon;
            return (
              <button
                key={item.id}
                type="button"
                className="nf-nav-node"
                aria-pressed={item.id === node.id}
                onClick={() => onSelectNode(item.id)}
              >
                <Icon size={15} />
                <span>{String(item.data.title || s.title)}</span>
              </button>
            );
          })}
        </nav>
      )}
      <aside
        className="node-inspector"
        aria-label={tx('节点配置')}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && !event.defaultPrevented) {
            event.stopPropagation();
            onClose();
          }
        }}
      >
        <header className="nf-header">
          <span className={`node-icon node-tone-${spec.tone}`}>
            <Icon size={19} />
          </span>
          <div className="nf-heading">
            <InlineRename
              key={node.id}
              value={String(node.data.title || spec.title)}
              editing={renaming}
              onStart={onRenameStart}
              onCommit={onRename}
              onEnd={onRenameEnd}
              pencil
            />
            <p>{node.data.title === spec.title ? spec.description : spec.title}</p>
          </div>
          <div className="nf-header-actions">
            <button
              type="button"
              className="nf-icon-button"
              aria-label={expanded ? tx('返回画布') : tx('展开编辑')}
              onClick={onExpand}
            >
              {expanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('节点更多操作')}
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                onMenu({ x: rect.left, y: rect.bottom + 6 });
              }}
            >
              <MoreHorizontal size={16} />
            </button>
            <button
              type="button"
              className="nf-icon-button"
              aria-label={tx('关闭节点配置')}
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
        </header>
        <div className="nf-tabs" role="tablist" aria-label={tx('节点面板页签')}>
          {[
            ['config', tx('配置')],
            ['output', tx('输出')],
            ['test', tx('测试')],
          ].map(([id, label], index, all) => (
            <button
              key={id}
              id={`nf-${node.id}-${id}`}
              type="button"
              role="tab"
              aria-selected={tab === id}
              aria-controls={`nf-${node.id}-panel`}
              tabIndex={tab === id ? 0 : -1}
              onClick={() => setTab(id)}
              onKeyDown={(e) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                  e.preventDefault();
                  const next =
                    e.key === 'Home'
                      ? 0
                      : e.key === 'End'
                      ? all.length - 1
                      : (index + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length;
                  setTab(all[next][0]);
                  document.getElementById(`nf-${node.id}-${all[next][0]}`)?.focus();
                }
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="nf-content"
          ref={content}
          onScroll={(event) => {
            scrollPositions.current[scrollKey] = event.currentTarget.scrollTop;
          }}
          id={`nf-${node.id}-panel`}
          role="tabpanel"
          aria-labelledby={`nf-${node.id}-${tab}`}
        >
          {workflowRunId && onInspectRun && (
            <Button
              className="mb-3"
              variant="ghost"
              size="sm"
              onClick={() => onInspectRun(workflowRunId)}
            >
              {tx('查看全部执行实例')}
            </Button>
          )}
          {executions.length > 0 && (
            <FormField
              label={tx('运行样本')}
              hint={tx('按执行实例查看，分支与循环轮次的样本相互独立。')}
            >
              <Select
                aria-label={tx('选择执行实例')}
                value={selectedExecutionId || ''}
                onValueChange={(selectedValue) => onSelectExecution?.(selectedValue)}
                options={[
                  { value: '', label: tx('工作流外层样本') },
                  ...(executions.map((event) => {
                    const data = eventData(event);
                    return { value: String(data.executionId), label: executionLabel(data) };
                  }) || []),
                ]}
              />
            </FormField>
          )}
          <div hidden={tab !== 'config'}>
            <NodeForm key={node.id} onChange={onEdit} />
          </div>
          <div hidden={tab !== 'output'}>
            <div className="nf-section-heading">
              {tx('输出结构')}
              <small>{tx('随配置更新')}</small>
            </div>
            <OutputTree schema={output} />
            {selectedExecutionId && Object.hasOwn(session.bindings, node.id) && (
              <section className="nf-output-sample">
                <div className="nf-section-heading">{tx('所选执行实例')}</div>
                <ResultViewer value={session.bindings[node.id]} />
              </section>
            )}
            {detail?.run.status === 'succeeded' && (
              <section className="nf-output-sample">
                <div className="nf-section-heading">
                  {tx('最近测试结果')}
                  {stale && <small>{tx('来自旧配置')}</small>}
                </div>
                <OutputTree schema={infer(detail.run.outputs)} />
              </section>
            )}
          </div>
          <div hidden={tab !== 'test'} className="nf-test">
            <FormField
              label={tx('测试输入')}
              hint={tx('样本可独立编辑；操作选项沿用当前配置。引用没有样本时请手工提供。')}
              meta={
                <button
                  type="button"
                  className="nf-text-action"
                  onClick={() => {
                    editTest(inputKey, JSON.stringify(testSample(node, session.bindings), null, 2));
                    editTest(contextKey, JSON.stringify(session.bindings, null, 2));
                  }}
                >
                  {tx('重新填入样本')}
                </button>
              }
            >
              <textarea
                className="nf-textarea nf-code"
                aria-label={tx('节点测试输入')}
                value={inputText}
                onChange={(e) => editTest(inputKey, e.target.value)}
                spellCheck={false}
              />
            </FormField>
            <FormSection title={tx('上游样本')} summary={tx('不会执行上游节点')}>
              <textarea
                className="nf-textarea nf-code"
                aria-label={tx('节点测试上游样本')}
                value={contextText}
                onChange={(e) => editTest(contextKey, e.target.value)}
                spellCheck={false}
              />
              <p className="nf-hint">
                {tx('条件和循环从这些样本解析变量。键是节点 ID，值是其输出。')}
              </p>
            </FormSection>
            <div className="nf-section-heading">
              {tx('最近结果')}
              {run && (
                <StatusLabel error={run.status === 'failed'}>
                  {run.status === 'running' ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Check size={12} />
                  )}{' '}
                  {runLabels[run.status] || run.status}
                </StatusLabel>
              )}
            </div>
            {errors[node.id] && (
              <p className="nf-error" role="alert">
                {errorText(errors[node.id])}
              </p>
            )}
            {stale && <p className="nf-hint nf-stale">{tx('来自旧配置，请重新测试当前节点。')}</p>}
            {run ? (
              <>
                <p className="nf-hint">
                  v{run.revision} · {new Date(run.createdAt).toLocaleString(getLocale())}{' '}
                  {tx('· 单节点测试')}
                </p>
                {run.error ? (
                  <p className="nf-error" role="alert">
                    {errorText(run.error)}
                  </p>
                ) : run.status === 'running' ? (
                  <p className="nf-empty">{tx('节点正在执行，可随时停止。')}</p>
                ) : (
                  <ResultViewer value={run.outputs} />
                )}
                {onInspectRun && (
                  <Button variant="outline" size="sm" onClick={() => onInspectRun(run.id)}>
                    {tx('查看运行详情')}
                  </Button>
                )}
              </>
            ) : (
              <p className="nf-empty">{tx('使用样本执行当前节点，结果会保留在运行记录中。')}</p>
            )}
          </div>
        </div>
        <footer className="nf-footer">
          <button
            type="button"
            className="nf-save-state"
            onClick={onSave}
            aria-label={tx('保存工作流草稿')}
          >
            {saveStatus === tx('正在保存') ? (
              <Loader2 className="animate-spin" size={12} />
            ) : (
              <Check size={12} />
            )}
            <span>{invalid.length ? tx('含未完成字段') : saveStatus}</span>
          </button>
          <Button
            size="sm"
            disabled={starting === node.id || isJoin(node.type)}
            title={
              isJoin(node.type) ? tx('汇合需要所属分叉的执行上下文，请试运行工作流') : undefined
            }
            onClick={run?.status === 'running' ? stop : start}
          >
            {run?.status === 'running' ? (
              <Square />
            ) : starting === node.id ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Play />
            )}
            {run?.status === 'running'
              ? tx('停止测试')
              : starting === node.id
              ? tx('准备测试')
              : tx('测试节点')}
          </Button>
        </footer>
      </aside>
      {expanded && <aside className="nf-output-reference">{outputReference}</aside>}
    </div>
  );
}
