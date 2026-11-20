/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import type {
  ConversationInput,
  ConversationItem,
  ConversationSnapshot,
  RuntimeEvent,
  Turn,
} from './types';

export interface ConversationState {
  modelSelection?: import('./models').ModelSelection;
  contextUsage?: import('./types').ContextUsage | null;
  sessionId: string | null;
  turns: Record<string, Turn>;
  items: Record<string, ConversationItem>;
  inputs: Record<string, ConversationInput>;
  paused: boolean;
  nextBefore: number | null;
  watermark: number;
  recent: RuntimeEvent[];
  ready: boolean;
}
export function emptyConversation(sessionId: string | null): ConversationState {
  return {
    sessionId,
    turns: {},
    items: {},
    inputs: {},
    paused: false,
    nextBefore: null,
    watermark: 0,
    recent: [],
    ready: false,
  };
}
function upsert<T extends { id: string; revision: number }>(map: Record<string, T>, value: T) {
  return !map[value.id] || map[value.id].revision < value.revision
    ? { ...map, [value.id]: value }
    : map;
}
export function conversationEvent(
  state: ConversationState,
  event: RuntimeEvent
): ConversationState {
  if (event.objectId !== state.sessionId || !event.kind.startsWith('conversation_')) return state;
  const value = JSON.parse(event.data);
  let next = state;
  if (event.kind === 'conversation_turn') next = { ...state, turns: upsert(state.turns, value) };
  if (event.kind === 'conversation_item') next = { ...state, items: upsert(state.items, value) };
  if (event.kind === 'conversation_input') next = { ...state, inputs: upsert(state.inputs, value) };
  if (event.kind === 'conversation_context' && (!state.contextUsage || value.revision > state.contextUsage.revision))
    next = { ...state, contextUsage: value };
  if (event.kind === 'conversation_queue' && event.sequence > state.watermark)
    next = { ...state, paused: value.paused };
  return {
    ...next,
    watermark: Math.max(state.watermark, event.sequence),
    recent: [...state.recent.filter((e) => e.sequence !== event.sequence), event].slice(-1000),
  };
}
export function conversationSnapshot(
  state: ConversationState,
  snapshot: ConversationSnapshot,
  older = false
): ConversationState {
  if (snapshot.sessionId !== state.sessionId) return state;
  if (older) {
    const next = { ...state, nextBefore: snapshot.nextBefore };
    for (const turn of snapshot.turns) next.turns = upsert(next.turns, turn);
    for (const item of snapshot.items) next.items = upsert(next.items, item);
    return next;
  }
  // Concurrent reconciliations can finish out of order even without any SSE events.
  if (state.ready && snapshot.watermark < state.watermark) return state;
  const firstOrdinal = snapshot.turns[0]?.ordinal ?? Infinity;
  const earlier = Object.values(state.turns).filter((turn) => turn.ordinal < firstOrdinal);
  const earlierIds = new Set(earlier.map((turn) => turn.id));
  let next: ConversationState = {
    ...emptyConversation(snapshot.sessionId),
    ready: true,
    modelSelection: snapshot.modelSelection,
    contextUsage: (state.contextUsage?.revision ?? -1) > (snapshot.contextUsage?.revision ?? -1)
      ? state.contextUsage : snapshot.contextUsage,
    turns: Object.fromEntries([...earlier, ...snapshot.turns].map((x) => [x.id, x])),
    items: Object.fromEntries(
      [
        ...Object.values(state.items).filter((item) => earlierIds.has(item.turnId)),
        ...snapshot.items,
      ].map((x) => [x.id, x])
    ),
    inputs: Object.fromEntries(snapshot.inputs.map((x) => [x.id, x])),
    paused: snapshot.paused,
    watermark: snapshot.watermark,
    nextBefore: earlier.length ? state.nextBefore : snapshot.nextBefore,
  };
  // Replay only events newer than the snapshot: old HTTP responses must never erase live output.
  for (const event of state.recent
    .filter((e) => e.sequence > snapshot.watermark)
    .sort((a, b) => a.sequence - b.sequence))
    next = conversationEvent(next, event);
  return next;
}
