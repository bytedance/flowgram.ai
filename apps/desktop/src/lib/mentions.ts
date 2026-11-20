/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/** Offsets use UTF-16 code units, matching browser selections. Labels are user content. */
export interface Mention {
  id: string;
  label: string;
  start: number;
  end: number;
}
export interface MentionValue {
  content: string;
  mentions: Mention[];
}
export interface WorkflowReferences {
  workflowId?: string;
  workflows?: {
    workflowId: string;
    name: string;
    start: number;
    end: number;
  }[];
}
/** Visual separation is CSS spacing, never an extra editable character. */
export function createMention(
  item: Pick<Mention, "id" | "label">
): MentionValue {
  const content = `@${item.label}`;
  return { content, mentions: [{ ...item, start: 0, end: content.length }] };
}
/** Return an atomic deletion only when the selection touches a reference. */
export function mentionDeletionRange(
  value: MentionValue,
  selection: { start: number; end: number },
  direction: "backward" | "forward"
): { start: number; end: number } | null {
  const mentions = validMentions(value.content, value.mentions);
  if (selection.start !== selection.end)
    return mentions.some(
      (mention) =>
        mention.start < selection.end && mention.end > selection.start
    )
      ? selection
      : null;
  const caret = selection.start;
  const mention = mentions.find((mention) =>
    direction === "backward"
      ? (caret > mention.start && caret <= mention.end) ||
        // Older drafts inserted a separator after each token. Remove that one
        // separator together with its reference, without swallowing arbitrary text.
        (caret === mention.end + 1 &&
          /^[ \u00a0]$/.test(value.content.slice(mention.end, caret)))
      : caret >= mention.start && caret < mention.end
  );
  return mention
    ? {
        start: mention.start,
        end:
          direction === "backward" ? Math.max(mention.end, caret) : mention.end,
      }
    : null;
}
export function validMentions(
  content: string,
  mentions: readonly Mention[] = []
) {
  let end = 0;
  return [...mentions]
    .sort((a, b) => a.start - b.start)
    .filter((m) => {
      const valid =
        !!m &&
        typeof m.id === "string" &&
        typeof m.label === "string" &&
        !!m.id &&
        !!m.label &&
        Number.isInteger(m.start) &&
        Number.isInteger(m.end) &&
        m.start >= end &&
        m.end <= content.length &&
        m.end > m.start &&
        content.slice(m.start, m.end) === `@${m.label}`;
      if (valid) end = m.end;
      return valid;
    });
}
export function mentionParts(value: MentionValue) {
  const parts: { text: string; mention?: Mention }[] = [];
  let offset = 0;
  for (const mention of validMentions(value.content, value.mentions)) {
    if (mention.start > offset)
      parts.push({ text: value.content.slice(offset, mention.start) });
    parts.push({
      text: value.content.slice(mention.start, mention.end),
      mention,
    });
    offset = mention.end;
  }
  if (offset < value.content.length)
    parts.push({ text: value.content.slice(offset) });
  return parts;
}
export function replaceMentionRange(
  value: MentionValue,
  start: number,
  end: number,
  insert: MentionValue
): MentionValue {
  const existing = validMentions(value.content, value.mentions);
  // Any selection touching a token replaces the whole token.
  for (const m of existing) {
    if (start > m.start && start < m.end) start = m.start;
    if (end > m.start && end < m.end) end = m.end;
  }
  start = Math.max(0, Math.min(value.content.length, start));
  end = Math.max(start, Math.min(value.content.length, end));
  const shift = insert.content.length - (end - start);
  return {
    content:
      value.content.slice(0, start) + insert.content + value.content.slice(end),
    mentions: [
      ...existing.filter((m) => m.end <= start),
      ...validMentions(insert.content, insert.mentions).map((m) => ({
        ...m,
        start: m.start + start,
        end: m.end + start,
      })),
      ...existing
        .filter((m) => m.start >= end)
        .map((m) => ({ ...m, start: m.start + shift, end: m.end + shift })),
    ],
  };
}
export function mentionQuery(value: MentionValue, caret: number) {
  const prefix = value.content.slice(0, caret);
  const match = /@([^@\n]{0,80})$/.exec(prefix);
  if (!match) return null;
  const start = match.index;
  if (start && /[\w.%+\-]/.test(prefix[start - 1])) return null;
  if (
    validMentions(value.content, value.mentions).some(
      (m) => start >= m.start && start < m.end
    )
  )
    return null;
  return { start, end: caret, query: match[1] };
}
export function workflowReferences(
  value: MentionValue
): WorkflowReferences | null {
  const mentions = validMentions(value.content, value.mentions);
  return mentions.length
    ? {
        workflows: mentions.map((m) => ({
          workflowId: m.id,
          name: m.label,
          start: m.start,
          end: m.end,
        })),
      }
    : null;
}
export function mentionsFromReferences(
  content: string,
  references?: WorkflowReferences | null
): Mention[] {
  return validMentions(
    content,
    (references?.workflows || []).map((m) => ({
      id: m.workflowId,
      label: m.name,
      start: m.start,
      end: m.end,
    }))
  );
}
