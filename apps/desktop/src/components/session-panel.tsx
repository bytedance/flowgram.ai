/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';

import {
  ArrowUp,
  AtSign,
  Loader2,
  MoreHorizontal,
  PanelRight,
  PanelRightClose,
  Square,
} from 'lucide-react';

import { MentionInput, type MentionInputHandle } from './ui/mention-input';
import { workflowActivity } from '../lib/workbench';
import { useConversation } from '../lib/use-conversation';
import type {
  ConversationInput,
  DeliveryMode,
  ModelSettings,
  Project,
  Run,
  Session,
  Workflow,
} from '../lib/types';
import { useProjectApi } from '../lib/project-context';
import { modelUnavailable, openModelSettings, useModels, type ModelSelection } from '../lib/models';
import { workflowReferences, type Mention } from '../lib/mentions';
import { errorText, t, tx } from '../lib/i18n';
import { WorkspaceHeader } from './workspace-header';
import { Select } from './ui/select';
import { MenuButton } from './ui/menu-button';
import { Button } from './ui/button';
import { ModelPicker } from './model-picker';
import { ConversationQueue, ConversationTimeline } from './conversation-timeline';
import { ContextUsage } from './context-usage';

interface Draft {
  content: string;
  mentions?: Mention[];
  model?: ModelSelection;
}
export function SessionPanel({
  project,
  sessionId,
  sessionEpoch,
  sessions,
  workflows,
  runs,
  online,
  ready,
  referenceIntent,
  onCreated,
  onChanged,
  onOpenWorkflow,
  onOpenRun,
  onSettings,
  headerLeading,
  workbenchOpen,
  onToggleWorkbench,
  onNewSession,
  onArchive,
  onActivity,
  onTurn,
}: {
  project: Project;
  sessionId: string | null;
  sessionEpoch: number;
  sessions: Session[];
  workflows: Workflow[];
  runs: Run[];
  model: ModelSettings | null;
  online: boolean;
  ready: boolean;
  referenceIntent?: { workflowId: string | null; sequence: number };
  onCreated: (id: string, previous: string | null) => void;
  onChanged: () => void;
  onOpenWorkflow: (id: string) => void;
  onOpenRun: (run: Run) => void;
  onSettings: () => void;
  headerLeading?: ReactNode;
  workbenchOpen: boolean;
  onToggleWorkbench: (turnId: string | null) => void;
  onNewSession: () => void;
  onArchive: () => void;
  onActivity: (activity: NonNullable<ReturnType<typeof workflowActivity>>) => void;
  onTurn: (turnId: string | null) => void;
}) {
  const api = useProjectApi();
  const catalog = useModels();
  const conversation = useConversation(sessionId, ready, (item) => {
    const activity = workflowActivity(item);
    if (activity) onActivity(activity);
  });
  const key = sessionId || `new.${sessionEpoch}`;
  const storageKey = `flowgram.compose.v2.${project.id}`;
  const [drafts, setDrafts] = useState<Record<string, Draft>>(() => {
    try {
      return JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  });
  const draft = drafts[key] || { content: '', mentions: [] };
  const selectedModel = draft.model || conversation.state.modelSelection || {};
  const chosenModel = catalog.models.find(
    (m) => m.id === (selectedModel.modelId || catalog.defaults.chat)
  );
  const draftsRef = useRef(drafts);
  useEffect(() => {
    const deleted = (event: Event) => {
      const detail = (event as CustomEvent<{ projectId: string; id: string }>).detail;
      if (detail.projectId !== project.id) return;
      setDrafts((current) => {
        if (!current[detail.id]) return current;
        const next = { ...current };
        delete next[detail.id];
        return next;
      });
    };
    window.addEventListener('flowgram:session-deleted', deleted);
    return () => window.removeEventListener('flowgram:session-deleted', deleted);
  }, [project.id]);
  draftsRef.current = drafts;
  const scope = useRef(sessionId);
  scope.current = sessionId;
  const [sending, setSending] = useState<Set<string>>(new Set());
  const [delivery, setDelivery] = useState<DeliveryMode>('queue');
  const [steerTarget, setSteerTarget] = useState<string | null>(null);
  const [error, setError] = useState('');
  const composer = useRef<MentionInputHandle>(null);
  const active = Object.values(conversation.state.turns).find((turn) =>
    ['running', 'stopping'].includes(turn.status)
  );
  useEffect(() => {
    onTurn(active?.id || null);
  }, [active?.id, sessionId]);
  const staleSteer =
    delivery === 'steer' && (!active || active.id !== steerTarget || active.status !== 'running');
  function updateDraft(patch: Partial<Draft>, target = key) {
    setDrafts((current) => ({
      ...current,
      [target]: { ...(current[target] || { content: '', mentions: [] }), ...patch },
    }));
  }
  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(drafts));
  }, [drafts, storageKey]);
  useEffect(() => {
    const workflow = workflows.find((w) => w.id === referenceIntent?.workflowId);
    if (workflow) composer.current?.insertMention({ id: workflow.id, label: workflow.name });
  }, [referenceIntent?.sequence]);
  useEffect(() => {
    setDelivery('queue');
    setSteerTarget(null);
    setError('');
  }, [sessionId, sessionEpoch]);
  async function send() {
    if (!draft.content.trim() || sending.has(key) || staleSteer) return;
    if (
      delivery !== 'steer' &&
      (!chosenModel || modelUnavailable(catalog, chosenModel, project.id, true, true))
    ) {
      openModelSettings();
      return;
    }
    const submitted = {
      ...draft,
      model: delivery === 'steer' ? selectedModel : { ...selectedModel, modelId: chosenModel?.id },
    };
    const previous = sessionId;
    setSending((values) => new Set(values).add(key));
    setError('');
    let current = sessionId;
    try {
      if (!current) {
        const created = await api<Session>('/api/sessions', 'POST', {
          projectId: project.id,
          title: submitted.content.trim().slice(0, 45),
        });
        current = created.id;
        updateDraft(submitted, current);
        setSending((values) => new Set(values).add(current!));
        onCreated(current, previous);
      }
      const request = {
        content: submitted.content,
        model: submitted.model,
        deliveryMode: delivery,
        expectedTurnId: delivery === 'steer' ? steerTarget : undefined,
        references: workflowReferences({
          content: submitted.content,
          mentions: submitted.mentions || [],
        }),
      };
      const pendingKey = `flowgram.pending.v2.${project.id}.${current}`;
      let pending: { request: typeof request; clientInputId: string } | null = null;
      try {
        pending = JSON.parse(sessionStorage.getItem(pendingKey) || 'null');
      } catch {
        /* New operation. */
      }
      if (!pending || JSON.stringify(pending.request) !== JSON.stringify(request))
        pending = { request, clientInputId: crypto.randomUUID() };
      sessionStorage.setItem(pendingKey, JSON.stringify(pending));
      await api<ConversationInput>(`/api/sessions/${current}/inputs`, 'POST', {
        ...request,
        clientInputId: pending.clientInputId,
      });
      sessionStorage.removeItem(pendingKey);
      for (const target of new Set([key, current]))
        if ((draftsRef.current[target]?.content || submitted.content) === submitted.content)
          updateDraft(
            {
              content: '',
              mentions: [],
              model:
                JSON.stringify(draftsRef.current[target]?.model) === JSON.stringify(draft.model)
                  ? submitted.model
                  : draftsRef.current[target]?.model,
            },
            target
          );
      if (scope.current === current) {
        setDelivery('queue');
        setSteerTarget(null);
        await conversation.reload();
      }
      onChanged();
    } catch (cause) {
      setError((cause as Error).message);
      onChanged();
    } finally {
      setSending((values) => {
        const next = new Set(values);
        next.delete(key);
        if (current) next.delete(current);
        return next;
      });
    }
  }
  return (
    <section
      className="session-panel flex h-full min-h-0 min-w-0 flex-col bg-background"
      aria-label={tx('项目会话')}
    >
      <WorkspaceHeader
        title={sessions.find((item) => item.id === sessionId)?.title || t('newSession')}
        leading={headerLeading}
      >
        <MenuButton
          label={tx('会话更多操作')}
          commands={[
            { id: 'copy', label: tx('复制会话名称') },
            { id: 'new', label: t('newSession') },
            ...(sessionId
              ? [
                  {
                    id: 'archive',
                    label: tx('归档会话'),
                    disabled: active ? tx('请先停止正在进行的执行') : undefined,
                  },
                ]
              : []),
          ]}
          onCommand={(id) => {
            if (id === 'new') onNewSession();
            else if (id === 'archive') onArchive();
            else
              void navigator.clipboard
                .writeText(sessions.find((item) => item.id === sessionId)?.title || t('newSession'))
                .catch((cause) => setError(cause.message));
          }}
        >
          <MoreHorizontal />
        </MenuButton>
        <Button
          variant="ghost"
          size="icon"
          aria-label={workbenchOpen ? tx('收起工作台') : tx('打开工作台')}
          title={workbenchOpen ? tx('收起工作台') : tx('打开工作台')}
          aria-pressed={workbenchOpen}
          onClick={() => onToggleWorkbench(active?.id || null)}
        >
          {workbenchOpen ? <PanelRightClose /> : <PanelRight />}
        </Button>
      </WorkspaceHeader>
      {!sessionId ? (
        <div className="flex min-h-0 flex-1 items-center justify-center p-8">
          <div className="max-w-md">
            <h2 className="text-xl font-medium">{tx('一起完善这个项目')}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {tx('会话中的工作流会保存在项目里。选择引用，或直接描述目标。')}
            </p>
          </div>
        </div>
      ) : (
        <ConversationTimeline
          key={sessionId}
          state={conversation.state}
          retry={conversation.retry}
          runs={runs}
          workflows={workflows}
          openWorkflow={onOpenWorkflow}
          openRun={onOpenRun}
          followUp={(content) => updateDraft({ content, mentions: [] })}
          loadOlder={conversation.loadOlder}
          loadingOlder={conversation.loadingOlder}
          error={conversation.error}
        />
      )}
      {error && (
        <p role="alert" className="mx-4 mb-2 text-xs text-destructive">
          {errorText(error)}
        </p>
      )}
      <div className="conversation-composer mx-auto w-full max-w-[800px] shrink-0 px-6 pb-5 pt-3">
        <ConversationQueue
          workflows={workflows}
          state={conversation.state}
          active={active}
          reload={conversation.reload}
        />
        <div className="composer-surface p-2.5">
          {(active || delivery === 'steer') && (
            <div className="mb-1 flex justify-end">
              <Select
                variant="ghost"
                className="composer-delivery"
                aria-label={tx('输入投递方式')}
                value={delivery}
                onValueChange={(value) => {
                  setDelivery(value as DeliveryMode);
                  setSteerTarget(value === 'steer' ? active?.id || null : null);
                }}
                options={[
                  { value: 'queue', label: tx('下一轮执行') },
                  {
                    value: 'steer',
                    label: tx('补充本轮'),
                    disabled: !active || active.status !== 'running',
                  },
                ]}
              />
            </div>
          )}
          <MentionInput
            ref={composer}
            value={{ content: draft.content, mentions: draft.mentions || [] }}
            contextKey={key}
            label={tx('消息输入')}
            placeholder={t('placeholder')}
            pickerLabel={tx('引用工作流')}
            searchLabel={tx('搜索工作流')}
            emptyLabel={workflows.length ? tx('没有匹配的工作流') : tx('当前项目还没有工作流')}
            items={workflows.map((workflow) => ({ id: workflow.id, label: workflow.name }))}
            onChange={(value) => updateDraft(value)}
            onSubmit={() => void send()}
          />
          <div className="mt-1 flex min-w-0 items-center justify-between gap-1">
            <div className="flex min-w-0 flex-1 items-center gap-1">
              <ModelPicker
                value={
                  delivery === 'steer' && active?.model
                    ? { modelId: active.model.modelId }
                    : selectedModel
                }
                onChange={(value) => updateDraft({ model: value })}
                projectId={project.id}
                kind="chat"
                tools
                disabled={delivery === 'steer'}
                parameterPlacement="popover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="composer-mention-button"
                aria-label={tx('引用工作流')}
                title={tx('引用工作流（@）')}
                onPointerDown={(event) => event.preventDefault()}
                onClick={(event) => composer.current?.openPicker(event.currentTarget)}
              >
                <AtSign size={16} />
              </Button>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <ContextUsage value={conversation.state.contextUsage} />
              {active && (
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={tx('停止本轮')}
                  disabled={active.status === 'stopping'}
                  onClick={() => {
                    void api(`/api/sessions/${sessionId}/turns/${active.id}/stop`, 'POST', {})
                      .then(conversation.reload)
                      .catch((cause) => setError(cause.message));
                  }}
                >
                  <Square />
                </Button>
              )}
              <Button
                size="icon"
                className="composer-send"
                aria-label={active ? tx('加入待办') : t('send')}
                disabled={!online || sending.has(key) || !draft.content.trim() || staleSteer}
                onClick={() => void send()}
              >
                {sending.has(key) ? <Loader2 className="animate-spin" /> : <ArrowUp />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
