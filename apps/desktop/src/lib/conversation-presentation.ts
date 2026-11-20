/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { toolIdentity } from './tool-presentation';
import type { ConversationItem, Turn } from './types';
import { duration } from './run-trace';

export function turnDurationLabel(ms: number): string {
  if (ms < 1000) return duration(ms);
  const total = Math.round(ms / 1000);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [
    ...(hours > 0 ? [`${hours}h`] : []),
    ...(minutes > 0 ? [`${minutes}m`] : []),
    ...(seconds > 0 ? [`${seconds}s`] : []),
  ].join(' ');
}

/** Estimates are explicit metadata, never synthesized from setup timestamps. */
export function turnDurationMs(turn: Turn): number | null {
  if (turn.origin === 'authored') {
    const estimate = turn.estimatedDurationMs;
    return estimate != null && Number.isFinite(estimate) && estimate > 0 ? estimate : null;
  }
  if (!turn.endedAt) return null;
  const elapsed = Date.parse(turn.endedAt) - Date.parse(turn.startedAt);
  return Number.isFinite(elapsed) && elapsed >= 0 ? elapsed : null;
}

export type ConversationSegment =
  | { kind: 'item'; id: string; item: ConversationItem }
  | { kind: 'tools'; id: string; items: ConversationItem[] };

/** Empty streaming placeholders are not visible message boundaries. */
export function segmentConversation(items: ConversationItem[]): ConversationSegment[] {
  const segments: ConversationSegment[] = [];
  for (const item of items) {
    if (item.kind === 'assistant' && !item.content.trim()) continue;
    const last = segments.at(-1);
    if (item.kind === 'tool') {
      if (last?.kind === 'tools') last.items.push(item);
      else segments.push({ kind: 'tools', id: item.id, items: [item] });
    } else segments.push({ kind: 'item', id: item.id, item });
  }
  return segments;
}

/** Presentation follows item identity and explicit phases, never text equality. */
export function presentTurn(turn: Turn, items: ConversationItem[], latest: boolean) {
  const ordered = [...items].sort((a, b) => a.ordinal - b.ordinal);
  const initial =
    ordered.find((item) => item.id === turn.initiatingInputId && item.kind === 'user') ??
    ordered.find((item) => item.kind === 'user');
  const active = turn.status === 'running' || turn.status === 'stopping';
  const replies = ordered.filter((item) => item.kind === 'assistant' && item.content.trim());
  const summary = !active
    ? replies.find((item) => item.id === turn.finalItemId) ??
      [...replies].reverse().find((item) => item.phase === 'final')
    : undefined;
  const body = ordered.filter((item) => item !== initial);
  const process = body.filter(
    (item) => item !== summary && (item.kind !== 'assistant' || item.content.trim())
  );
  return {
    initial,
    active,
    summary,
    segments: segmentConversation(body),
    hasProcess: process.length > 0,
    defaultProcessOpen: !active && (turn.status !== 'completed' || (latest && !summary)),
    toolCount: process.filter((item) => item.kind === 'tool').length,
  };
}

export interface ProcessChoice {
  baseline: boolean;
  open: boolean;
}
export function processIsOpen(choice: ProcessChoice, baseline: boolean) {
  return choice.baseline === baseline ? choice.open : baseline;
}

export function toolCounts(items: ConversationItem[]) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const name = toolIdentity(item);
    counts.set(name, (counts.get(name) || 0) + 1);
  }
  return [...counts].map(([name, count]) => ({ name, count }));
}
