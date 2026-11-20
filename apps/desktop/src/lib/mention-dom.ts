/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { mentionParts, type MentionValue } from "./mentions";

/** Read only text and our atomic tokens. Pasted HTML never becomes trusted editor markup. */
export function readMentionDOM(root: Node): MentionValue {
  const value: MentionValue = { content: "", mentions: [] };
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      value.content += node.textContent || "";
      return;
    }
    if (node instanceof HTMLElement) {
      if (node.dataset.mentionTail !== undefined) return;
      if (node.dataset.mentionId) {
        const label = node.dataset.mentionLabel || "";
        const start = value.content.length;
        value.content += `@${label}`;
        value.mentions.push({
          id: node.dataset.mentionId,
          label,
          start,
          end: value.content.length,
        });
        return;
      }
      if (node.tagName === "BR") {
        value.content += "\n";
        return;
      }
      if (
        ["DIV", "P"].includes(node.tagName) &&
        value.content &&
        !value.content.endsWith("\n")
      )
        value.content += "\n";
    }
    node.childNodes.forEach(walk);
  };
  root.childNodes.forEach(walk);
  return value;
}
export function writeMentionDOM(root: HTMLElement, value: MentionValue) {
  const fragment = document.createDocumentFragment();
  for (const part of mentionParts(value)) {
    if (!part.mention) {
      fragment.append(document.createTextNode(part.text));
      continue;
    }
    const tag = document.createElement("span");
    tag.contentEditable = "false";
    tag.className = "inline-mention";
    tag.dataset.mentionId = part.mention.id;
    tag.dataset.mentionLabel = part.mention.label;
    tag.textContent = part.text;
    tag.title = part.mention.label;
    fragment.append(tag);
  }
  const tail = document.createElement("br");
  tail.dataset.mentionTail = "";
  fragment.append(tail);
  root.replaceChildren(fragment);
  root.dataset.empty = String(!value.content);
}
export function mentionSelection(root: HTMLElement) {
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  const range = selection.getRangeAt(0);
  if (
    !root.contains(range.startContainer) ||
    !root.contains(range.endContainer)
  )
    return null;
  const prefix = document.createRange();
  prefix.selectNodeContents(root);
  prefix.setEnd(range.startContainer, range.startOffset);
  const end = document.createRange();
  end.selectNodeContents(root);
  end.setEnd(range.endContainer, range.endOffset);
  return {
    start: readMentionDOM(prefix.cloneContents()).content.length,
    end: readMentionDOM(end.cloneContents()).content.length,
  };
}
export function placeMentionCaret(root: HTMLElement, target: number) {
  let remaining = target;
  let point: { node: Node; offset: number } | null = null;
  const walk = (node: Node) => {
    if (point) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const length = node.textContent?.length || 0;
      if (remaining <= length) point = { node, offset: remaining };
      else remaining -= length;
      return;
    }
    if (
      node instanceof HTMLElement &&
      (node.dataset.mentionId || node.tagName === "BR")
    ) {
      const length =
        node.dataset.mentionTail !== undefined
          ? 0
          : node.dataset.mentionId
          ? node.textContent?.length || 0
          : 1;
      const parent = node.parentNode!;
      const index = [...parent.childNodes].indexOf(node);
      if (remaining < length || (!remaining && !length))
        point = { node: parent, offset: index };
      else if (remaining === length)
        point = { node: parent, offset: index + 1 };
      else remaining -= length;
      return;
    }
    node.childNodes.forEach(walk);
  };
  root.childNodes.forEach(walk);
  const range = document.createRange();
  const selected = point as { node: Node; offset: number } | null;
  range.setStart(
    selected?.node || root,
    selected?.offset ?? Math.max(0, root.childNodes.length - 1)
  );
  range.collapse(true);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}
export function mentionCaretRect(root: HTMLElement) {
  const selection = window.getSelection();
  const range = selection?.rangeCount
    ? selection.getRangeAt(0).cloneRange()
    : null;
  range?.collapse(true);
  const rect = range?.getClientRects()[0] || range?.getBoundingClientRect();
  const fallback = root.getBoundingClientRect();
  return rect && rect.height
    ? { left: rect.left, top: rect.top, bottom: rect.bottom }
    : {
        left: fallback.left + 8,
        top: fallback.top + 8,
        bottom: fallback.top + 28,
      };
}
