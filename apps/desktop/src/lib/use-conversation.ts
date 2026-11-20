/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useCallback, useEffect, useRef, useState } from 'react';

import type { ConversationItem, ConversationSnapshot } from './types';
import { useProject } from './project-context';
import { conversationEvent, conversationSnapshot, emptyConversation } from './conversation-state';
import { subscribeEvents } from './api';

export function useConversation(
  sessionId: string | null,
  enabled: boolean,
  onLiveItem?: (item: ConversationItem) => void
) {
  const { projectId, request: api } = useProject();
  const [state, setState] = useState(() => emptyConversation(sessionId));
  const [error, setError] = useState('');
  const scope = useRef(sessionId);
  scope.current = sessionId;
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [retry, setRetry] = useState(0);
  const liveItem = useRef(onLiveItem);
  liveItem.current = onLiveItem;
  const reload = useCallback(async () => {
    if (!sessionId || !enabled) return;
    const snapshot = await api<ConversationSnapshot>(`/api/sessions/${sessionId}/conversation`);
    if (scope.current === sessionId) {
      setState((current) => conversationSnapshot(current, snapshot));
      setError('');
    }
  }, [sessionId, enabled]);
  useEffect(() => {
    setState(emptyConversation(sessionId));
    setError('');
    if (!sessionId || !enabled) return;
    let disposed = false;
    const controller = new AbortController();
    const reconcile = () => {
      if (!disposed)
        void reload().catch((e) => {
          if (!disposed) setError(e.message);
        });
    };
    void api<ConversationSnapshot>(
      `/api/sessions/${sessionId}/conversation`,
      'GET',
      undefined,
      controller.signal
    )
      .then((snapshot) => {
        if (disposed) return;
        setState((current) => conversationSnapshot(current, snapshot));
        return subscribeEvents(
          controller.signal,
          (event) => {
            if (!disposed) {
              setState((current) => conversationEvent(current, event));
              if (event.kind === 'conversation_item') {
                try {
                  liveItem.current?.(JSON.parse(event.data) as ConversationItem);
                } catch {
                  /* Invalid frames are reconciled by the conversation snapshot. */
                }
              }
            }
          },
          (connected) => {
            if (connected) reconcile();
          },
          sessionId,
          snapshot.watermark,
          projectId
        );
      })
      .catch((e) => {
        if (!disposed) setError(e.message);
      });
    return () => {
      disposed = true;
      controller.abort();
    };
  }, [sessionId, enabled, reload, retry]);
  async function loadOlder() {
    if (!sessionId || loadingOlder || !state.nextBefore) return;
    setLoadingOlder(true);
    try {
      const snapshot = await api<ConversationSnapshot>(
        `/api/sessions/${sessionId}/conversation?before=${state.nextBefore}`
      );
      if (scope.current === sessionId)
        setState((current) => conversationSnapshot(current, snapshot, true));
    } catch (e) {
      if (scope.current === sessionId) setError((e as Error).message);
    } finally {
      setLoadingOlder(false);
    }
  }
  return {
    state: state.sessionId === sessionId ? state : emptyConversation(sessionId),
    error,
    reload,
    loadOlder,
    loadingOlder,
    retry: () => setRetry((value) => value + 1),
  };
}
