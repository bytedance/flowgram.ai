/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { describe, expect, it } from 'vitest';

import { conversationEvent, conversationSnapshot, emptyConversation } from './conversation-state';
import type { ConversationSnapshot, RuntimeEvent, Turn, ConversationItem } from './types';
const turn: Turn = {
  id: 'turn',
  sessionId: 'task',
  initiatingInputId: 'user',
  ordinal: 1,
  status: 'running',
  phase: 'model',
  revision: 1,
  startedAt: 'now',
  endedAt: null,
  finalItemId: null,
  error: null,
};
const item: ConversationItem = {
  id: 'reply',
  sessionId: 'task',
  turnId: 'turn',
  ordinal: 2,
  kind: 'assistant',
  phase: 'commentary',
  status: 'running',
  content: '开始',
  payload: {},
  revision: 1,
  createdAt: 'now',
  updatedAt: 'now',
};
function snapshot(watermark = 5): ConversationSnapshot {
  return {
    sessionId: 'task',
    turns: [turn],
    items: [item],
    inputs: [],
    watermark,
    paused: false,
    nextBefore: null,
  };
}
function event(sequence: number, value: unknown, kind = 'conversation_item'): RuntimeEvent {
  return { sequence, kind, objectId: 'task', data: JSON.stringify(value), createdAt: 'now' };
}
describe('conversation projection', () => {
  it('retains current context usage across stale events and reconnect snapshots', () => {
    const usage = { revision: 4, modelId: 'model', inputTokens: 12000, contextWindow: 32000, effectiveWindow: 32000, autoCompactTokenLimit: 22000, outputReserve: 8000, source: 'provider' as const, status: 'ready' as const, compactions: 1 };
    let state = conversationSnapshot(emptyConversation('task'), snapshot());
    state = conversationEvent(state, event(6, usage, 'conversation_context'));
    state = conversationEvent(state, event(7, { ...usage, revision: 2, inputTokens: 1000 }, 'conversation_context'));
    expect(state.contextUsage).toEqual(usage);
    state = conversationSnapshot(state, { ...snapshot(8), contextUsage: { ...usage, revision: 3 } });
    expect(state.contextUsage).toEqual(usage);
    state = conversationEvent(state, event(9, { ...usage, revision: 5, status: 'compacting' }, 'conversation_context'));
    expect(state.contextUsage?.status).toBe('compacting');
  });
  it('ignores an older HTTP reconciliation after a newer snapshot has already arrived', () => {
    const newer = conversationSnapshot(emptyConversation('task'), {
      ...snapshot(12),
      items: [{ ...item, revision: 4, content: '最终内容' }],
      paused: true,
    });
    const stale = conversationSnapshot(newer, snapshot(5));
    expect(stale).toBe(newer);
    expect(stale.items.reply.content).toBe('最终内容');
    expect(stale.paused).toBe(true);
  });
  it('replays newer live content over a delayed HTTP snapshot without duplicating the item', () => {
    let state = conversationEvent(
      emptyConversation('task'),
      event(7, { ...item, content: '完整回复', revision: 3 }),
    );
    state = conversationSnapshot(state, snapshot(5));
    expect(Object.keys(state.items)).toEqual(['reply']);
    expect(state.items.reply.content).toBe('完整回复');
  });
  it('ignores older item revisions and keeps the same identity when the response becomes final', () => {
    let state = conversationSnapshot(emptyConversation('task'), snapshot());
    state = conversationEvent(
      state,
      event(8, { ...item, status: 'completed', phase: 'final', revision: 3 }),
    );
    state = conversationEvent(state, event(9, item));
    expect(state.items.reply.phase).toBe('final');
    expect(state.items.reply.status).toBe('completed');
    expect(Object.keys(state.items)).toHaveLength(1);
  });
  it('does not let another task update the visible conversation', () => {
    const state = emptyConversation('other');
    expect(conversationEvent(state, event(8, item))).toBe(state);
    expect(conversationSnapshot(state, snapshot())).toBe(state);
  });
  it('removes accepted queue inputs through the authoritative snapshot and preserves newer input events', () => {
    let state = conversationSnapshot(emptyConversation('task'), snapshot());
    const input = { id: 'input', sessionId: 'task', revision: 1, status: 'queued', content: '下一步' };
    state = conversationEvent(state, event(6, input, 'conversation_input'));
    state = conversationSnapshot(state, snapshot(7));
    expect(state.inputs.input).toBeUndefined();
    state = conversationEvent(
      state,
      event(9, { ...input, revision: 2, status: 'pending' }, 'conversation_input'),
    );
    state = conversationSnapshot(state, snapshot(8));
    expect(state.inputs.input.status).toBe('pending');
  });
  it('retains loaded older turns across reconnect reconciliation and prefers newer item revisions', () => {
    let state = conversationSnapshot(emptyConversation('task'), {
      ...snapshot(),
      turns: [{ ...turn, ordinal: 12 }],
      nextBefore: 12,
    });
    state = conversationSnapshot(
      state,
      {
        ...snapshot(),
        turns: [{ ...turn, id: 'older', ordinal: 1 }],
        items: [{ ...item, id: 'old-text', turnId: 'older' }],
        nextBefore: null,
      },
      true,
    );
    state = conversationSnapshot(state, {
      ...snapshot(10),
      turns: [{ ...turn, ordinal: 12 }],
      nextBefore: 12,
    });
    expect(state.turns.older.ordinal).toBe(1);
    expect(state.items['old-text']).toBeDefined();
    expect(state.nextBefore).toBeNull();
  });
});
