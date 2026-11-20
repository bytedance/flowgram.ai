/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { useEffect, useRef, useState } from 'react';

import { subscribeEvents } from './api';
import { useProject } from './project-context';
import { followRunEvent, initialRunFollow } from './run-follow';
import type { Run, WorkflowSchema } from './types';

export function useRunFollow(run: Run | null, workflowId: string, revision: number,
  dirty: boolean, schema: WorkflowSchema) {
  const { projectId } = useProject();
  const [trialId, setTrialId] = useState<string | null>(null);
  const [state, setState] = useState(initialRunFollow);
  const [paused, setPaused] = useState(false);
  const [request, setRequest] = useState(0);
  const latest = useRef(schema);
  latest.current = schema;
  const eligible = run?.id === trialId && run?.revision === revision && !dirty;
  useEffect(() => {
    if (trialId && !eligible) setPaused(true);
  }, [trialId, eligible]);
  useEffect(() => {
    if (!trialId || !eligible) return;
    const controller = new AbortController();
    setState(initialRunFollow);
    void subscribeEvents(controller.signal, event => {
      setState(previous => followRunEvent(previous, event, trialId, workflowId, latest.current));
      if (event.kind === 'run_finished') controller.abort();
    }, () => {}, trialId, 0, projectId);
    return () => controller.abort();
  }, [trialId, eligible, workflowId, projectId]);
  return {
    start(id: string) { setTrialId(id); setPaused(false); setState(initialRunFollow); },
    pause() { setPaused(true); },
    toggle() { setPaused(value => !value); setRequest(value => value + 1); },
    paused,
    available: eligible && !state.finished,
    request,
    nodeId: eligible && !paused ? state.nodeId : null,
  };
}
