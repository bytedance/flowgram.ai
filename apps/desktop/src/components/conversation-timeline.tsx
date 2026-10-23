/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import ReactMarkdown from 'react-markdown';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import remarkGfm from 'remark-gfm';
import {
  Check,
  AtSign,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Copy,
  Loader2,
  Square,
  Workflow as WorkflowIcon,
} from 'lucide-react';

import type { ConversationInput, ConversationItem, Run, Turn, Workflow } from '../lib/types';
import { MentionInput, type MentionInputHandle } from './ui/mention-input';
import { toolNames as names, toolIdentity, toolData, toolSummary } from '../lib/tool-presentation';
import { useProjectApi } from '../lib/project-context';
import {
  mentionParts,
  mentionsFromReferences,
  workflowReferences,
  type MentionValue,
} from '../lib/mentions';
import { errorText, tx } from '../lib/i18n';
import type { ConversationState } from '../lib/conversation-state';
import {
  presentTurn,
  processIsOpen,
  toolCounts,
  turnDurationMs,
  turnDurationLabel,
  type ProcessChoice,
} from '../lib/conversation-presentation';
import { Collapse, usePresence } from './ui/presence';
import { Button } from './ui/button';
import { ConversationToolIcon } from './conversation-tool-icon';
import { ConversationToolDetail } from './conversation-tool-detail';

export function toolStatus(item: ConversationItem) {
  if (item.status === 'drafting') return tx('准备参数');
  if (item.status === 'pending') return tx('等待执行');
  if (item.status === 'running') return tx('执行中');
  if (item.status === 'uncertain') return tx('结果待核实');
  if (item.status === 'failed' || item.payload.isError) return tx('调用失败');
  if (item.status === 'cancelled' || item.status === 'interrupted') return tx('未执行');
  if (item.payload.name === 'run_workflow') return tx('已发起');
  if (item.payload.name === 'validate_workflow')
    return toolData(item).executable ? tx('校验通过') : tx('发现问题');
  if (toolData(item).dryRun) return tx('预览完成');
  if (toolData(item).changed === false) return tx('无需保存');
  if (item.payload.name === 'cancel_run')
    return toolData(item).accepted ? tx('正在停止') : tx('已结束');
  if (
    ['create_workflow', 'layout_workflow', 'edit_workflow', 'revert_workflow_change'].includes(
      item.payload.name || ''
    )
  )
    return tx('已保存 · v{0}', [toolData(item).revision || '?']);
  return tx('已完成');
}
function StatusIcon({ status }: { status: string }) {
  return ['running', 'drafting', 'pending', 'stopping'].includes(status) ? (
    <Loader2 size={13} className="animate-spin" />
  ) : ['failed', 'uncertain'].includes(status) ? (
    <CircleAlert size={13} />
  ) : ['cancelled', 'interrupted'].includes(status) ? (
    <Square size={11} />
  ) : (
    <Check size={13} />
  );
}
function Body({ text }: { text: string }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}
function ToolRow({ item }: { item: ConversationItem }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const detailPresent = usePresence(open, 'control');
  const bad = item.status === 'failed' || item.payload.isError;
  return (
    <div className={`conversation-tool ${bad ? 'conversation-tool-error' : ''}`}>
      <button
        className="conversation-tool-row"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen(!open)}
      >
        <ConversationToolIcon names={[toolIdentity(item)]} />
        <span className="min-w-0 truncate">{toolSummary(item)}</span>
        <span className="conversation-tool-status">
          {([
            'drafting',
            'pending',
            'running',
            'stopping',
            'failed',
            'uncertain',
            'cancelled',
            'interrupted',
          ].includes(item.status) ||
            bad) && (
            <span aria-hidden="true">
              <StatusIcon status={bad ? 'failed' : item.status} />
            </span>
          )}
          {toolStatus(item)}
        </span>
        <ChevronRight size={12} className={open ? 'rotate-90' : ''} />
      </button>
      <Collapse open={open} id={detailId}>
        {detailPresent && <ConversationToolDetail item={item} />}
      </Collapse>
    </div>
  );
}
function ToolGroup({ items }: { items: ConversationItem[] }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const running = items.some((item) => ['drafting', 'pending', 'running'].includes(item.status));
  const failed = items.filter((item) => item.status === 'failed' || item.payload.isError).length;
  const uncertain = items.some((item) => item.status === 'uncertain');
  const label = toolCounts(items)
    .map(
      ({ name, count }) =>
        `${names[name] || name || tx('准备工具调用')}${count > 1 ? ` ×${count}` : ''}`
    )
    .join(' · ');
  if (items.length === 1) return <ToolRow item={items[0]} />;
  return (
    <div className="conversation-tool-group">
      <button
        className="conversation-tool-summary"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen(!open)}
        title={label}
      >
        <ConversationToolIcon names={items.map(toolIdentity)} />
        <span className="min-w-0 truncate">{label}</span>
        {running && <Loader2 size={13} className="shrink-0 animate-spin" aria-hidden="true" />}
        {!!failed && (
          <span className="shrink-0 text-destructive">{tx('{0} 次失败', [failed])}</span>
        )}
        {uncertain && <span className="shrink-0">{tx('结果待核实')}</span>}
        <ChevronDown size={12} className={open ? 'shrink-0' : 'shrink-0 -rotate-90'} />
      </button>
      <Collapse id={detailId} open={open} className="conversation-tool-block">
        {items.map((item) => (
          <ToolRow key={item.id} item={item} />
        ))}
      </Collapse>
    </div>
  );
}
function MentionContent({
  content,
  references,
}: {
  content: string;
  references?: ConversationInput['references'];
}) {
  return (
    <>
      {mentionParts({
        content,
        mentions: mentionsFromReferences(content, references),
      }).map((part, index) =>
        part.mention ? (
          <span className="inline-mention" key={index} title={part.mention.label}>
            {part.text}
          </span>
        ) : (
          part.text
        )
      )}
    </>
  );
}
function UserItem({ item, workflows }: { item: ConversationItem; workflows: Workflow[] }) {
  const reference = item.payload.references?.workflowId;
  return (
    <div className="conversation-user-wrap">
      {item.phase === 'steering' && (
        <div className="mb-1 text-right text-xs text-muted-foreground">{tx('已纳入本轮')}</div>
      )}
      <div className="user-message-bubble ml-auto w-fit max-w-[95%] bg-secondary px-4 py-2.5 text-sm leading-6">
        {reference && (
          <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
            <WorkflowIcon size={12} />
            {workflows.find((flow) => flow.id === reference)?.name || tx('当前工作流引用')}
          </div>
        )}
        <MentionContent content={item.content} references={item.payload.references} />
      </div>
    </div>
  );
}
export function ConversationTurn({
  turn,
  items,
  latest,
  runs,
  workflows,
  openWorkflow,
  openRun,
  followUp,
}: {
  turn: Turn;
  items: ConversationItem[];
  latest: boolean;
  runs: Run[];
  workflows: Workflow[];
  openWorkflow: (id: string) => void;
  openRun: (run: Run) => void;
  followUp: (text: string) => void;
}) {
  const presentation = presentTurn(turn, items, latest);
  const { active, initial, summary, segments, hasProcess, defaultProcessOpen, toolCount } =
    presentation;
  const [choice, setChoice] = useState<ProcessChoice>({
    baseline: defaultProcessOpen,
    open: defaultProcessOpen,
  });
  const open = processIsOpen(choice, defaultProcessOpen);
  useEffect(() => {
    setChoice((current) =>
      current.baseline === defaultProcessOpen
        ? current
        : { baseline: defaultProcessOpen, open: defaultProcessOpen }
    );
  }, [defaultProcessOpen]);
  const processId = useId();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);
  const tools = items.filter((item) => item.kind === 'tool');
  const elapsedMs = turnDurationMs(turn);
  const error = turn.status === 'failed';
  const phase =
    turn.status === 'stopping'
      ? tx('正在停止，等待当前操作确认')
      : turn.phase === 'retrying'
      ? tx('正在重试模型响应')
      : turn.phase === 'compacting'
      ? tx('正在压缩上下文')
      : turn.phase === 'tool'
      ? tx('正在调用工具')
      : turn.phase === 'responding'
      ? tx('正在回复')
      : turn.phase === 'preparing'
      ? tx('正在准备工具调用')
      : tx('正在等待模型响应');
  const artifacts = new Map<string, ConversationItem>();
  for (const item of tools) {
    if (
      item.status === 'completed' &&
      [
        'create_workflow',
        'layout_workflow',
        'edit_workflow',
        'revert_workflow_change',
        'run_workflow',
        'test_node',
      ].includes(item.payload.name || '')
    ) {
      if (item.payload.isError || toolData(item).dryRun) continue;
      const id = toolData(item).id;
      if (typeof id === 'string')
        artifacts.set(
          `${
            ['run_workflow', 'test_node'].includes(item.payload.name || '') ? 'run' : 'workflow'
          }:${id}`,
          item
        );
    }
  }
  return (
    <article
      className="conversation-turn"
      aria-label={active ? tx('进行中的轮次') : tx('历史轮次')}
    >
      {initial && <UserItem item={initial} workflows={workflows} />}
      {!active && hasProcess && (
        <button
          className="conversation-process-toggle"
          aria-expanded={open}
          aria-controls={processId}
          onClick={() => setChoice({ baseline: defaultProcessOpen, open: !open })}
        >
          <span>
            {turn.status === 'completed'
              ? tx('已处理')
              : turn.status === 'failed'
              ? tx('本轮未完成')
              : tx('已停止 / 中断')}
            {elapsedMs !== null && ` ${turnDurationLabel(elapsedMs)}`}
          </span>
          <ChevronDown size={12} className={open ? '' : '-rotate-90'} />
          {toolCount > 0 && (
            <span className="ml-auto font-normal">{tx('{0} 次工具调用', [toolCount])}</span>
          )}
        </button>
      )}
      <div className="conversation-turn-items" id={processId}>
        {segments.map((segment) => {
          const item = segment.kind === 'item' ? segment.item : undefined;
          const isSummary = !!item && !!summary && item.id === summary.id;
          return (
            <Collapse
              key={segment.id}
              open={active || open || isSummary}
              className={
                segment.kind === 'tools'
                  ? 'conversation-process-segment'
                  : item?.kind === 'user'
                  ? 'my-4'
                  : 'conversation-assistant'
              }
            >
              {segment.kind === 'tools' ? (
                <ToolGroup items={segment.items} />
              ) : item?.kind === 'user' ? (
                <UserItem item={item} workflows={workflows} />
              ) : item?.kind === 'compaction' ? (
                <div
                  className="flex items-center gap-2 py-2 text-xs text-muted-foreground"
                  role="status"
                >
                  {item.status === 'running' ? (
                    <Loader2 size={12} className="animate-spin motion-reduce:animate-none" />
                  ) : item.status === 'completed' ? (
                    <Check size={12} />
                  ) : (
                    <CircleAlert size={12} />
                  )}
                  <span>
                    {item.status === 'running'
                      ? tx('正在压缩上下文')
                      : item.status === 'completed'
                      ? tx('已压缩上下文')
                      : item.status === 'interrupted'
                      ? tx('上下文压缩已中断')
                      : tx('上下文压缩未完成')}
                  </span>
                </div>
              ) : item ? (
                <Body text={item.content} />
              ) : null}
              {item?.kind === 'assistant' && item.status === 'interrupted' && item.content && (
                <span className="text-xs text-muted-foreground">{tx('回复已中断')}</span>
              )}
            </Collapse>
          );
        })}
      </div>
      {active &&
        (turn.status === 'stopping' ||
          (!tools.some((item) => ['drafting', 'pending', 'running'].includes(item.status)) &&
            !items.some(
              (item) =>
                item.kind === 'assistant' && item.status === 'running' && item.content.trim()
            ))) && (
          <div className="conversation-current-phase" role="status">
            <Loader2 size={13} className="animate-spin" />
            {phase}
          </div>
        )}
      {error && (
        <div className="conversation-failure" role="status">
          <strong>{tx('本轮未完成')}</strong>
          <p>{errorText(turn.error)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tx('已保存的工作流和运行记录会保留。')}
          </p>
          <button
            className="mt-2 text-xs underline underline-offset-4"
            onClick={() => followUp(tx('请继续处理上一轮的问题：{0}', [turn.error]))}
          >
            {tx('带入问题继续处理')}
          </button>
        </div>
      )}
      {[...artifacts.entries()].map(([key, item]) => {
        const result = toolData(item);
        if (['run_workflow', 'test_node'].includes(item.payload.name || '')) {
          const run = runs.find((run) => run.id === result.id);
          const status = run?.status || String(result.status || 'running');
          const label =
            status === 'succeeded'
              ? tx('已完成')
              : status === 'failed'
              ? tx('执行失败')
              : ['interrupted', 'cancelled', 'canceled'].includes(status)
              ? tx('已中断')
              : tx('运行中');
          return (
            <div className="conversation-artifact" key={key}>
              <div
                className={`flex items-center gap-2 ${
                  status === 'failed' ? 'text-destructive' : ''
                }`}
              >
                <StatusIcon
                  status={
                    status === 'succeeded'
                      ? 'completed'
                      : status === 'canceled'
                      ? 'interrupted'
                      : status
                  }
                />
                <span>
                  {tx('工作流试运行 ·')}
                  {label}
                </span>
              </div>
              <p>
                {tx('独立运行记录 · v')}
                {String(result.revision || '')}
              </p>
              <button onClick={() => run && openRun(run)} disabled={!run}>
                {tx('查看运行')}
              </button>
            </div>
          );
        }
        return (
          <div className="conversation-artifact" key={key}>
            <div className="flex items-center gap-2">
              <WorkflowIcon size={15} />
              <span>
                {String(
                  result.name || workflows.find((w) => w.id === result.id)?.name || tx('工作流')
                )}{' '}
                · v{String(result.revision || '')}
              </span>
            </div>
            <p>{tx('本轮已保存的草稿')}</p>
            <button onClick={() => openWorkflow(String(result.id))}>{tx('打开当前草稿')}</button>
          </div>
        );
      })}
      {!active && summary && (
        <div className="conversation-message-actions">
          <Button
            variant="ghost"
            size="icon"
            aria-label={copied ? tx('已复制') : tx('复制回复')}
            title={copied ? tx('已复制') : tx('复制回复')}
            onClick={() => {
              setCopyError('');
              void navigator.clipboard
                .writeText(summary.content)
                .then(() => setCopied(true))
                .catch((cause) => setCopyError(cause.message));
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </Button>
          {copyError && (
            <span role="alert" className="text-xs text-destructive">
              {errorText(copyError)}
            </span>
          )}
        </div>
      )}
      {!active && !hasProcess && !summary && !error && (
        <p className="conversation-turn-boundary">
          {tx(turn.status === 'completed' ? '已完成' : '已停止 / 中断')}
        </p>
      )}
      {turn.model && (
        <p
          className="mt-2 text-[10px] text-muted-foreground"
          title={`${turn.model.connectionName} · ${turn.model.upstreamModel}`}
        >
          {turn.model.modelName}
        </p>
      )}
    </article>
  );
}
export function ConversationTimeline({
  state,
  runs,
  workflows,
  openWorkflow,
  openRun,
  followUp,
  loadOlder,
  loadingOlder,
  error,
  retry,
}: {
  state: ConversationState;
  runs: Run[];
  workflows: Workflow[];
  openWorkflow: (id: string) => void;
  openRun: (run: Run) => void;
  followUp: (text: string) => void;
  loadOlder: () => Promise<void>;
  loadingOlder: boolean;
  error: string;
  retry: () => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [following, setFollowing] = useState(true);
  const followRef = useRef(following);
  followRef.current = following;
  const loaded = useRef(false);
  const turns = useMemo(
    () => Object.values(state.turns).sort((a, b) => a.ordinal - b.ordinal),
    [state.turns]
  );
  const turnItems = useMemo(() => {
    const grouped = new Map<string, ConversationItem[]>();
    for (const item of Object.values(state.items)) {
      const entries = grouped.get(item.turnId) || [];
      entries.push(item);
      grouped.set(item.turnId, entries);
    }
    return grouped;
  }, [state.items]);
  const previous = useRef<{ height: number; top: number } | null>(null);
  useEffect(() => {
    const element = scroller.current;
    const body = content.current;
    if (!element || !body) return;
    const observer = new ResizeObserver(() => {
      if (followRef.current && loaded.current && !window.getSelection()?.toString())
        element.scrollTop = element.scrollHeight;
    });
    observer.observe(element);
    observer.observe(body);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    if (previous.current) {
      element.scrollTop = previous.current.top + element.scrollHeight - previous.current.height;
      previous.current = null;
      return;
    }
    if (following || !loaded.current) {
      element.scrollTop = element.scrollHeight;
      if (state.ready) loaded.current = true;
    }
  }, [state, following]);
  async function older() {
    const element = scroller.current;
    if (element)
      previous.current = {
        height: element.scrollHeight,
        top: element.scrollTop,
      };
    await loadOlder();
  }
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scroller}
        onClickCapture={(event) => {
          // Reading a disclosure must not trigger the live tail follower.
          if ((event.target as Element).closest('button[aria-expanded]')) {
            followRef.current = false;
            setFollowing(false);
          }
        }}
        className="min-h-0 flex-1 overflow-y-auto"
        onScroll={() => {
          const e = scroller.current;
          if (e) setFollowing(e.scrollHeight - e.scrollTop - e.clientHeight < 48);
        }}
      >
        <div ref={content} className="conversation-content mx-auto w-full max-w-[800px] px-6 py-6">
          {state.nextBefore && (
            <Button
              className="mb-6"
              size="sm"
              variant="ghost"
              disabled={loadingOlder}
              onClick={() => void older()}
            >
              {tx('加载更早的轮次')}
            </Button>
          )}
          {!state.ready && (
            <div className="text-sm text-muted-foreground">{tx('正在恢复对话…')}</div>
          )}
          {error && (
            <p role="alert" className="mb-4 text-sm text-destructive">
              {errorText(error)}{' '}
              <button className="underline" onClick={retry}>
                {tx('重新连接')}
              </button>
            </p>
          )}
          {turns.map((turn, index) => (
            <ConversationTurn
              key={turn.id}
              turn={turn}
              items={turnItems.get(turn.id) || []}
              latest={index === turns.length - 1}
              runs={runs}
              workflows={workflows}
              openWorkflow={(id) => {
                if (workflows.some((w) => w.id === id)) openWorkflow(id);
              }}
              openRun={openRun}
              followUp={followUp}
            />
          ))}
          {state.ready && !Object.keys(state.turns).length && (
            <p className="text-sm text-muted-foreground">{tx('发送需求，开始第一轮工作。')}</p>
          )}
        </div>
      </div>
      {!following && (
        <button className="conversation-jump" onClick={() => setFollowing(true)}>
          {tx('回到最新 ↓')}
        </button>
      )}
    </div>
  );
}
export function ConversationQueue({
  state,
  active,
  reload,
  workflows,
}: {
  workflows: Workflow[];
  state: ConversationState;
  active: Turn | undefined;
  reload: () => Promise<void>;
}) {
  const api = useProjectApi();
  const inputs = Object.values(state.inputs)
    .filter((input) => ['queued', 'pending', 'rejected'].includes(input.status))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const editor = useRef<MentionInputHandle>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [text, setText] = useState<MentionValue>({ content: '', mentions: [] });
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  if (!inputs.length) return null;
  async function change(input: ConversationInput, action: 'edit' | 'cancel' | 'steer' | 'retry') {
    setBusy(input.id);
    setError('');
    try {
      const updating = action === 'edit' || action === 'retry';
      await api(
        `/api/sessions/${state.sessionId}/inputs/${input.id}${updating ? '' : `/${action}`}`,
        updating ? 'PUT' : 'POST',
        {
          revision: input.revision,
          ...(action === 'edit'
            ? { content: text.content, references: workflowReferences(text) }
            : {}),
          ...(action === 'retry' ? { content: input.content, references: input.references } : {}),
          ...(action === 'steer' ? { expectedTurnId: active?.id } : {}),
        }
      );
      if (action === 'retry')
        await api(`/api/sessions/${state.sessionId}/queue/resume`, 'POST', {});
      setEditing(null);
      await reload();
    } catch (error) {
      setError((error as Error).message);
      await reload().catch(() => {});
    } finally {
      setBusy(null);
    }
  }
  return (
    <div className="conversation-queue" aria-label={tx('待处理输入')}>
      <div className="mb-1 flex items-center justify-between">
        <span>
          {tx('待发送消息 ·')}
          {inputs.length}
          {state.paused ? tx(' · 已暂停') : ''}
        </span>
        {state.paused && (
          <button
            disabled={!!busy}
            onClick={() => {
              setBusy('resume');
              void api(`/api/sessions/${state.sessionId}/queue/resume`, 'POST', {})
                .then(reload)
                .catch((e) => setError(e.message))
                .finally(() => setBusy(null));
            }}
          >
            {tx('继续待办')}
          </button>
        )}
      </div>
      {inputs.map((input) => (
        <div className="conversation-queue-item" key={input.id}>
          {editing === input.id ? (
            <div className="flex gap-2">
              <div className="min-w-0 flex-1 rounded-lg border border-border">
                <MentionInput
                  ref={editor}
                  value={text}
                  onChange={setText}
                  contextKey={input.id}
                  label={tx('编辑待办内容')}
                  placeholder={tx('编辑待办内容')}
                  pickerLabel={tx('引用工作流')}
                  searchLabel={tx('搜索工作流')}
                  emptyLabel={tx('没有匹配的工作流')}
                  items={workflows.map((w) => ({ id: w.id, label: w.name }))}
                  onSubmit={() => {
                    if (text.content.trim() && !busy) void change(input, 'edit');
                  }}
                  className="min-h-9 max-h-24"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={tx('引用工作流')}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={(event) => editor.current?.openPicker(event.currentTarget)}
                >
                  <AtSign size={14} />
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={!text.content.trim() || !!busy}
                onClick={() => void change(input, 'edit')}
              >
                {tx('保存待办')}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
                {tx('取消')}
              </Button>
            </div>
          ) : (
            <p>
              <MentionContent content={input.content} references={input.references} />
            </p>
          )}
          {input.status === 'pending' ? (
            <p className="text-muted-foreground">{tx('等待当前步骤结束后接收')}</p>
          ) : (
            <div className="conversation-queue-actions">
              <button
                disabled={!!busy}
                onClick={() => {
                  setEditing(input.id);
                  setText({
                    content: input.content,
                    mentions: mentionsFromReferences(input.content, input.references),
                  });
                }}
              >
                {tx('编辑')}
              </button>
              <button disabled={!!busy} onClick={() => void change(input, 'cancel')}>
                {tx('移除')}
              </button>
              {input.status === 'rejected' && (
                <button disabled={!!busy} onClick={() => void change(input, 'retry')}>
                  {tx('重新发送')}
                </button>
              )}
              {input.status === 'queued' && active?.status === 'running' && (
                <button
                  disabled={!!busy}
                  title={tx('在当前工具调用结束后插入')}
                  onClick={() => void change(input, 'steer')}
                >
                  {tx('调整方向')}
                </button>
              )}
            </div>
          )}
          {input.error && <p className="text-destructive">{errorText(input.error)}</p>}
        </div>
      ))}
      {error && (
        <p role="alert" className="text-destructive">
          {errorText(error)}
        </p>
      )}
    </div>
  );
}
