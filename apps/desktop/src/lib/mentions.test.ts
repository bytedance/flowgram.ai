/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import { describe, expect, it } from "vitest";

import {
  mentionParts,
  createMention,
  mentionDeletionRange,
  mentionQuery,
  mentionsFromReferences,
  replaceMentionRange,
  workflowReferences,
  type MentionValue,
} from "./mentions";

const token = (id: string, label: string): MentionValue => ({
  content: `@${label} `,
  mentions: [{ id, label, start: 0, end: label.length + 1 }],
});
describe("inline workflow mentions", () => {
  it("combines repeated workflow references with surrounding instructions and UTF-16 offsets", () => {
    let value: MentionValue = { content: "😀 让 ", mentions: [] };
    value = replaceMentionRange(
      value,
      value.content.length,
      value.content.length,
      token("a", "A 工作流")
    );
    value = replaceMentionRange(
      value,
      value.content.length,
      value.content.length,
      { content: "完成审核，再接入 ", mentions: [] }
    );
    value = replaceMentionRange(
      value,
      value.content.length,
      value.content.length,
      token("b", "B 工作流")
    );
    value = replaceMentionRange(
      value,
      value.content.length,
      value.content.length,
      token("a", "A 工作流")
    );
    const references = workflowReferences(value)!;
    expect(references.workflows?.map((m) => m.workflowId)).toEqual([
      "a",
      "b",
      "a",
    ]);
    expect(references.workflows?.[0].start).toBe(5);
    expect(mentionsFromReferences(value.content, references)).toEqual(
      value.mentions
    );
    expect(
      mentionParts(value)
        .map((part) => part.text)
        .join("")
    ).toBe(value.content);
  });
  it("inserts at a middle selection and rebases later tokens without recognizing ordinary @text as a reference", () => {
    const initial = replaceMentionRange(
      { content: "前面 后面 ", mentions: [] },
      6,
      6,
      token("b", "B")
    );
    const next = replaceMentionRange(initial, 3, 5, token("a", "A"));
    expect(next.content).toBe("前面 @A  @B ");
    expect(next.mentions.map((m) => [m.id, m.start, m.end])).toEqual([
      ["a", 3, 5],
      ["b", 7, 9],
    ]);
    expect(
      workflowReferences({ content: "@A 普通文字", mentions: [] })
    ).toBeNull();
  });
  it("replaces whole atomic tokens, removes their identity and keeps later reference positions valid", () => {
    const value = replaceMentionRange(
      token("a", "审核"),
      4,
      4,
      token("b", "发送")
    );
    const next = replaceMentionRange(value, 1, 2, {
      content: "",
      mentions: [],
    });
    expect(next.content).toBe(" @发送 ");
    expect(next.mentions).toEqual([
      { id: "b", label: "发送", start: 1, end: 4 },
    ]);
    expect(
      mentionsFromReferences("标签已删除", workflowReferences(value))
    ).toEqual([]);
  });
  it("queries typed @ at Chinese or whitespace boundaries, skips emails and existing labels", () => {
    expect(mentionQuery({ content: "然后接入@订", mentions: [] }, 6)).toEqual({
      start: 4,
      end: 6,
      query: "订",
    });
    expect(
      mentionQuery({ content: "user@example.com", mentions: [] }, 16)
    ).toBeNull();
    expect(mentionQuery(token("a", "A 工作流"), 7)).toBeNull();
    expect(mentionQuery({ content: "@A\n下一行", mentions: [] }, 6)).toBeNull();
  });
});

describe("atomic reference deletion", () => {
  it("inserts no invisible trailing character and deletes the new token in one step", () => {
    const value = createMention({ id: "a", label: "订单😀" });
    expect(value.content).toBe("@订单😀");
    expect(value.mentions[0].end).toBe(value.content.length);
    const range = mentionDeletionRange(
      value,
      { start: value.content.length, end: value.content.length },
      "backward"
    )!;
    expect(
      replaceMentionRange(value, range.start, range.end, {
        content: "",
        mentions: [],
      })
    ).toEqual({ content: "", mentions: [] });
  });
  it("treats one old separator as part of its token but never consumes surrounding prose or multiple spaces", () => {
    const value = replaceMentionRange(
      { content: "请审核 ", mentions: [] },
      4,
      4,
      token("a", "A")
    );
    const position = value.content.length;
    const range = mentionDeletionRange(
      value,
      { start: position, end: position },
      "backward"
    )!;
    expect(
      replaceMentionRange(value, range.start, range.end, {
        content: "",
        mentions: [],
      }).content
    ).toBe("请审核 ");
    const extra = { ...value, content: value.content + " " };
    expect(
      mentionDeletionRange(
        extra,
        { start: extra.content.length, end: extra.content.length },
        "backward"
      )
    ).toBeNull();
    const prose = { ...value, content: value.content + "x" };
    expect(
      mentionDeletionRange(
        prose,
        { start: prose.content.length, end: prose.content.length },
        "backward"
      )
    ).toBeNull();
  });
  it("removes only the adjacent reference and preserves the next reference identity and offsets", () => {
    const first = createMention({ id: "a", label: "A" });
    const value = replaceMentionRange(
      first,
      first.content.length,
      first.content.length,
      createMention({ id: "b", label: "B" })
    );
    const range = mentionDeletionRange(value, { start: 0, end: 0 }, "forward")!;
    const next = replaceMentionRange(value, range.start, range.end, {
      content: "",
      mentions: [],
    });
    expect(next).toEqual(createMention({ id: "b", label: "B" }));
    expect(
      mentionDeletionRange(value, { start: 2, end: 2 }, "backward")
    ).toEqual({ start: 0, end: 2 });
  });
  it("handles partial selections atomically while leaving plain text deletion to the browser", () => {
    const value = createMention({ id: "a", label: "多字名称" });
    const range = mentionDeletionRange(
      value,
      { start: 1, end: 2 },
      "backward"
    )!;
    expect(
      replaceMentionRange(value, range.start, range.end, {
        content: "",
        mentions: [],
      })
    ).toEqual({ content: "", mentions: [] });
    expect(
      mentionDeletionRange(
        { content: "@ordinary text", mentions: [] },
        { start: 14, end: 14 },
        "backward"
      )
    ).toBeNull();
    expect(
      mentionDeletionRange(value, { start: 0, end: 0 }, "backward")
    ).toBeNull();
    expect(
      mentionDeletionRange(
        value,
        { start: value.content.length, end: value.content.length },
        "forward"
      )
    ).toBeNull();
  });
});
