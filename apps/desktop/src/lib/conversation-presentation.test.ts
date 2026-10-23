/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { createElement } from 'react';

import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

import { ConversationTurn } from '../components/conversation-timeline';
import type { ConversationItem, Turn } from './types';
import {
  presentTurn,
  processIsOpen,
  segmentConversation,
  toolCounts,
  turnDurationMs,
  turnDurationLabel,
} from './conversation-presentation';

const turn: Turn = {
  id: 'turn',
  sessionId: 'session',
  initiatingInputId: 'user',
  ordinal: 1,
  status: 'completed',
  phase: 'completed',
  revision: 1,
  startedAt: '2026-10-19T00:00:00Z',
  endedAt: '2026-10-19T00:00:09Z',
  finalItemId: 'final',
  error: null,
};
function item(
  id: string,
  kind: ConversationItem['kind'],
  ordinal: number,
  content = '',
  phase = 'commentary'
): ConversationItem {
  return {
    id,
    kind,
    ordinal,
    content,
    phase,
    turnId: turn.id,
    sessionId: turn.sessionId,
    status: 'completed',
    revision: 1,
    payload: {},
    createdAt: turn.startedAt,
    updatedAt: turn.startedAt,
  };
}
const user = item('user', 'user', 1, 'Inspect this workflow');
const commentary = item('commentary', 'assistant', 2, 'Checking the workflow');
const tool = item('tool', 'tool', 3);
const final = item('final', 'assistant', 4, 'The workflow is valid.', 'final');

describe('turn presentation', () => {
  it('formats compact elapsed times without redundant units or rollover errors', () => {
    expect(turnDurationLabel(180000)).toBe('3m');
    expect(turnDurationLabel(90000)).toBe('1m 30s');
    expect(turnDurationLabel(3723000)).toBe('1h 2m 3s');
    expect(turnDurationLabel(35000)).toBe('35s');
    expect(turnDurationLabel(59999)).toBe('1m');
    expect(turnDurationLabel(180)).toBe('180 ms');
  });
  it('keeps authored estimates separate from measured and missing timings', () => {
    const fast = { ...turn, endedAt: '2026-10-19T00:00:00.180Z' };
    expect(turnDurationMs(fast)).toBe(180);
    expect(turnDurationMs({ ...fast, estimatedDurationMs: 180000 })).toBe(180);
    expect(turnDurationMs({ ...fast, origin: 'authored', estimatedDurationMs: 180000 })).toBe(180000);
    expect(turnDurationMs({ ...fast, origin: 'authored' })).toBeNull();
    expect(turnDurationMs({ ...fast, origin: 'authored', estimatedDurationMs: -1 })).toBeNull();
    expect(turnDurationMs({ ...turn, endedAt: null })).toBeNull();
    expect(turnDurationMs({ ...turn, endedAt: 'invalid' })).toBeNull();
    expect(turnDurationMs({ ...turn, endedAt: '2026-10-18T23:59:59Z' })).toBeNull();
  });
  it('does not invent an empty process disclosure for a plain response', () => {
    const view = presentTurn(turn, [user, final], true);
    expect(view.initial).toBe(user);
    expect(view.summary).toBe(final);
    expect(view.hasProcess).toBe(false);
  });
  it('keeps live commentary inline and avoids classifying it as a final answer', () => {
    const view = presentTurn(
      { ...turn, status: 'running', finalItemId: null },
      [user, commentary, tool],
      true
    );
    expect(view.active).toBe(true);
    expect(view.summary).toBeUndefined();
    expect(view.segments.map((segment) => segment.id)).toEqual(['commentary', 'tool']);
  });
  it('collapses the completed process while keeping the explicit final answer separate', () => {
    const view = presentTurn(turn, [final, tool, user, commentary], true);
    expect(view.defaultProcessOpen).toBe(false);
    expect(view.summary).toBe(final);
    expect(view.toolCount).toBe(1);
    expect(view.segments.map((segment) => segment.id)).toEqual(['commentary', 'tool', 'final']);
  });
  it.each(['failed', 'interrupted'] as const)('keeps %s process available by default', (status) => {
    const view = presentTurn(
      { ...turn, status, finalItemId: null },
      [user, commentary, tool],
      false
    );
    expect(view.defaultProcessOpen).toBe(true);
    expect(view.summary).toBeUndefined();
  });
  it('keeps the latest response without a final answer open and older ones collapsed', () => {
    expect(
      presentTurn({ ...turn, finalItemId: null }, [user, commentary], true).defaultProcessOpen
    ).toBe(true);
    expect(
      presentTurn({ ...turn, finalItemId: null }, [user, commentary], false).defaultProcessOpen
    ).toBe(false);
  });
  it('does not deduplicate distinct messages by text', () => {
    const sameTextFinal = { ...final, content: commentary.content };
    const view = presentTurn(turn, [user, commentary, sameTextFinal], true);
    expect(view.segments).toHaveLength(2);
    expect(view.summary?.id).toBe('final');
  });
  it('recognizes a late explicit final phase before the turn pointer catches up', () => {
    const view = presentTurn({ ...turn, finalItemId: null }, [user, tool, final], true);
    expect(view.summary).toBe(final);
    expect(view.defaultProcessOpen).toBe(false);
  });
  it('does not discard steering input or change its order among process messages', () => {
    const steer = item('steer', 'user', 3, 'Also validate', 'steering');
    const view = presentTurn(turn, [user, commentary, steer, final], true);
    expect(view.segments.map((segment) => segment.id)).toEqual(['commentary', 'steer', 'final']);
  });
  it('resets manual expansion when completion or a late final changes the default', () => {
    expect(processIsOpen({ baseline: true, open: true }, false)).toBe(false);
    expect(processIsOpen({ baseline: true, open: false }, true)).toBe(false);
    expect(processIsOpen({ baseline: false, open: true }, false)).toBe(true);
  });
});

describe('tool segments', () => {
  it('groups adjacent tools across empty streaming placeholders with a stable first item ID', () => {
    const empty = item('empty', 'assistant', 4, ' \n ');
    const next = item('next', 'tool', 5);
    const segments = segmentConversation([tool, empty, next]);
    expect(segments).toEqual([{ kind: 'tools', id: 'tool', items: [tool, next] }]);
    expect(segmentConversation([tool])[0].id).toBe(segments[0].id);
  });
  it('splits tools at visible assistant messages and steering messages', () => {
    const next = item('next', 'tool', 5);
    const steer = item('steer', 'user', 6, 'One more requirement', 'steering');
    expect(
      segmentConversation([tool, commentary, next, steer]).map((segment) => segment.kind)
    ).toEqual(['tools', 'item', 'tools', 'item']);
  });
  it('summarizes tool counts without losing failed or unfinished items', () => {
    const a = { ...tool, payload: { name: 'read_workflow' } };
    const b = { ...a, id: 'b', status: 'failed' };
    const c = { ...a, id: 'c', status: 'running', payload: { name: 'validate_workflow' } };
    expect(toolCounts([a, b, c])).toEqual([
      { name: 'read_workflow', count: 2 },
      { name: 'validate_workflow', count: 1 },
    ]);
  });
});

describe('turn render boundaries', () => {
  function render(value: Turn, items: ConversationItem[]) {
    return renderToStaticMarkup(
      createElement(ConversationTurn, {
        turn: value,
        items,
        latest: true,
        runs: [],
        workflows: [],
        openWorkflow: () => {},
        openRun: () => {},
        followUp: () => {},
      })
    );
  }
  it('renders a plain final reply without an empty process or duplicate completion footer', () => {
    const html = render(turn, [user, final]);
    expect(html).toContain(final.content);
    expect(html).not.toContain('conversation-process-toggle');
    expect(html).not.toContain('conversation-turn-boundary');
  });
  it('uses the standard process header with the authored duration instead of setup time', () => {
    const html = render({ ...turn, origin: 'authored', estimatedDurationMs: 180000 }, [user, tool, final]);
    expect(html).toContain('Processed 3m');
    expect(html).not.toContain('About');
    expect(html).not.toContain('Authored walkthrough');
    expect(html).not.toContain('Processed 9s');
  });
  it('preserves subsecond measured Agent turn durations', () => {
    const html = render({ ...turn, endedAt: '2026-10-19T00:00:00.180Z' }, [user, tool, final]);
    expect(html).toContain('180 ms');
    expect(html).not.toContain('About');
  });
  it('leaves final content visible while hiding completed process segments', () => {
    const html = render(turn, [user, commentary, tool, final]);
    expect(html).toContain('aria-expanded="false"');
    expect(html).toMatch(/data-open="false" inert="" aria-hidden="true" class="[^"]*conversation-process-segment/);
    expect(html).toContain(
      '<div data-open="true" class="motion-collapse conversation-assistant"><div class="motion-collapse-clip"><div class="markdown-content"><p>The workflow is valid.</p>'
    );
    expect(html.split(final.content)).toHaveLength(2);
  });
  it('renders a live tool summary without a turn-wide disclosure', () => {
    const html = render({ ...turn, status: 'running', finalItemId: null }, [user, tool]);
    expect(html).toContain('conversation-tool-row');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('conversation-process-toggle');
  });
});
