/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '../../lib/utils';
import {
  mentionQuery,
  createMention,
  mentionDeletionRange,
  replaceMentionRange,
  validMentions,
  type MentionValue,
} from '../../lib/mentions';
import {
  mentionCaretRect,
  mentionSelection,
  placeMentionCaret,
  readMentionDOM,
  writeMentionDOM,
} from '../../lib/mention-dom';
import { AnchoredSelect } from './select';

export interface MentionInputHandle {
  openPicker: (anchor: HTMLElement) => void;
  insertMention: (item: { id: string; label: string }) => void;
}
interface Picker {
  start: number;
  end: number;
  query: string;
  toolbar: boolean;
  anchor: { left: number; top: number; bottom: number };
}
interface HistoryEntry {
  value: MentionValue;
  caret: number;
  time: number;
  kind: 'typing' | 'atomic';
}
const signature = (value: MentionValue) => JSON.stringify(value);
export const MentionInput = forwardRef<
  MentionInputHandle,
  {
    value: MentionValue;
    onChange: (value: MentionValue) => void;
    items: { id: string; label: string }[];
    contextKey: string;
    label: string;
    placeholder: string;
    pickerLabel: string;
    searchLabel: string;
    emptyLabel: string;
    onSubmit?: () => void;
    className?: string;
  }
>(
  (
    {
      value,
      onChange,
      items,
      contextKey,
      label,
      placeholder,
      pickerLabel,
      searchLabel,
      emptyLabel,
      onSubmit,
      className,
    },
    ref
  ) => {
    const editor = useRef<HTMLDivElement>(null);
    const current = useRef(value);
    current.current = value;
    const caret = useRef({
      start: value.content.length,
      end: value.content.length,
    });
    const composing = useRef(false);
    const compositionEnded = useRef(0);
    const pickerId = useId();
    const [picker, setPicker] = useState<Picker | null>(null);
    const [activeOption, setActiveOption] = useState<string>();
    const dismissed = useRef('');
    const history = useRef<HistoryEntry[]>([]);
    const historyIndex = useRef(0);
    const scope = useRef(contextKey);
    function closePicker(restore = false) {
      dismissed.current = `${current.current.content}:${caret.current.end}`;
      setPicker(null);
      setActiveOption(undefined);
      if (restore && editor.current) {
        editor.current.focus({ preventScroll: true });
        placeMentionCaret(editor.current, caret.current.end);
      }
    }
    function remember(value: MentionValue, position: number, kind: 'typing' | 'atomic') {
      const entries = history.current.slice(0, historyIndex.current + 1);
      const last = entries[entries.length - 1];
      if (last && signature(last.value) === signature(value)) return;
      const next = { value, caret: position, time: Date.now(), kind };
      if (
        kind === 'typing' &&
        last?.kind === 'typing' &&
        entries.length > 1 &&
        position - last.caret === value.content.length - last.value.content.length &&
        Date.now() - last.time < 600
      )
        entries[entries.length - 1] = next;
      else entries.push(next);
      history.current = entries.slice(-100);
      historyIndex.current = history.current.length - 1;
    }
    function commit(next: MentionValue, position: number, kind: 'typing' | 'atomic') {
      current.current = next;
      dismissed.current = '';
      remember(next, position, kind);
      onChange(next);
      if (editor.current) editor.current.dataset.empty = String(!next.content);
    }
    function replace(start: number, end: number, insert: MentionValue) {
      const root = editor.current;
      if (!root) return;
      const next = replaceMentionRange(current.current, start, end, insert);
      // Replacing a partial token may expand the selection to its atomic boundaries.
      const expandedStart =
        current.current.mentions.find((m) => start > m.start && start < m.end)?.start ?? start;
      const position = expandedStart + insert.content.length;
      writeMentionDOM(root, next);
      root.focus({ preventScroll: true });
      placeMentionCaret(root, position);
      caret.current = { start: position, end: position };
      commit(next, position, 'atomic');
    }
    function insertMention(item: { id: string; label: string }) {
      const selection = picker || mentionSelection(editor.current!) || caret.current;
      replace(selection.start, selection.end, createMention(item));
      closePicker();
    }
    function deleteMention(direction: 'backward' | 'forward') {
      const root = editor.current;
      const selection = root && mentionSelection(root);
      if (!selection) return false;
      const range = mentionDeletionRange(current.current, selection, direction);
      if (!range) return false;
      replace(range.start, range.end, { content: '', mentions: [] });
      closePicker();
      return true;
    }
    function updateQuery() {
      const root = editor.current;
      if (!root || composing.current) return;
      const selection = mentionSelection(root);
      if (!selection) return;
      caret.current = selection;
      if (selection.start !== selection.end) {
        setPicker(null);
        return;
      }
      const query = mentionQuery(current.current, selection.end);
      if (!query || dismissed.current === `${current.current.content}:${selection.end}`) {
        setPicker((old) => (old?.toolbar ? old : null));
        return;
      }
      setPicker({ ...query, toolbar: false, anchor: mentionCaretRect(root) });
    }
    useImperativeHandle(ref, () => ({
      openPicker(anchor) {
        const selection = editor.current && mentionSelection(editor.current);
        if (selection) caret.current = selection;
        setPicker({
          ...caret.current,
          query: '',
          toolbar: true,
          anchor: anchor.getBoundingClientRect(),
        });
      },
      insertMention,
    }));
    useLayoutEffect(() => {
      const root = editor.current!;
      const changedScope = scope.current !== contextKey;
      const externalChange = signature(readMentionDOM(root)) !== signature(value);
      if (changedScope || externalChange || !history.current.length) {
        scope.current = contextKey;
        history.current = [{ value, caret: value.content.length, time: 0, kind: 'atomic' }];
        historyIndex.current = 0;
        caret.current = {
          start: value.content.length,
          end: value.content.length,
        };
        dismissed.current = '';
        setPicker(null);
      }
      if (changedScope || externalChange) {
        const focused = document.activeElement === root;
        writeMentionDOM(root, value);
        if (focused) placeMentionCaret(root, value.content.length);
      }
      root.dataset.empty = String(!value.content);
    }, [value.content, signature(value.mentions ? value : { ...value, mentions: [] }), contextKey]);
    useEffect(() => {
      const changed = () => {
        const root = editor.current;
        const selection = root && mentionSelection(root);
        if (selection) caret.current = selection;
      };
      document.addEventListener('selectionchange', changed);
      return () => document.removeEventListener('selectionchange', changed);
    }, []);
    const filtered = picker
      ? items
          .filter((item) =>
            item.label.toLocaleLowerCase().includes(picker.query.toLocaleLowerCase())
          )
          .slice(0, 100)
      : [];
    function copy(event: React.ClipboardEvent, cut: boolean) {
      const root = editor.current!;
      const selection = mentionSelection(root);
      if (!selection || selection.start === selection.end) return;
      const value = current.current;
      const fragment = {
        content: value.content.slice(selection.start, selection.end),
        mentions: value.mentions
          .filter((m) => m.start >= selection.start && m.end <= selection.end)
          .map((m) => ({
            ...m,
            start: m.start - selection.start,
            end: m.end - selection.start,
          })),
      };
      event.preventDefault();
      event.clipboardData.setData('text/plain', fragment.content);
      event.clipboardData.setData('application/x-flowgram-mentions', JSON.stringify(fragment));
      if (cut) {
        replace(selection.start, selection.end, { content: '', mentions: [] });
        closePicker();
      }
    }
    return (
      <>
        <div
          ref={editor}
          role="textbox"
          aria-label={label}
          aria-multiline
          aria-autocomplete="list"
          aria-expanded={!!picker}
          aria-controls={picker ? pickerId : undefined}
          aria-activedescendant={picker ? activeOption : undefined}
          contentEditable
          suppressContentEditableWarning
          data-placeholder={placeholder}
          data-empty={!value.content}
          className={cn(
            'mention-input composer-textarea min-h-12 max-h-40 overflow-auto px-1.5 py-1.5 text-sm leading-6 outline-none',
            className
          )}
          onInput={() => {
            const root = editor.current!;
            const next = readMentionDOM(root);
            const selected = mentionSelection(root);
            if (selected) caret.current = selected;
            commit(next, selected?.end ?? next.content.length, 'typing');
            if (!composing.current) updateQuery();
          }}
          onCompositionStart={() => {
            composing.current = true;
            setPicker(null);
          }}
          onCompositionEnd={() => {
            composing.current = false;
            compositionEnded.current = Date.now();
            const next = readMentionDOM(editor.current!);
            commit(next, mentionSelection(editor.current!)?.end ?? next.content.length, 'typing');
            updateQuery();
          }}
          onKeyUp={() => {
            if (!picker?.toolbar) updateQuery();
          }}
          onMouseUp={() => {
            setPicker(null);
            updateQuery();
          }}
          onCopy={(event) => copy(event, false)}
          onCut={(event) => copy(event, true)}
          onPaste={(event) => {
            event.preventDefault();
            let insert: MentionValue = {
              content: event.clipboardData.getData('text/plain').replace(/\r\n?/g, '\n'),
              mentions: [],
            };
            try {
              const copied = JSON.parse(
                event.clipboardData.getData('application/x-flowgram-mentions')
              );
              if (copied.content === insert.content && Array.isArray(copied.mentions))
                insert = {
                  content: insert.content,
                  mentions: validMentions(insert.content, copied.mentions).filter((m) =>
                    items.some((i) => i.id === m.id)
                  ),
                };
            } catch {
              /* External clipboard data is plain text. */
            }
            const selected = mentionSelection(editor.current!) || caret.current;
            replace(selected.start, selected.end, insert);
            setPicker(null);
            updateQuery();
          }}
          onDrop={(event) => event.preventDefault()}
          onBeforeInput={(event) => {
            const native = event.nativeEvent as InputEvent;
            if (native.isComposing || composing.current) return;
            const kind = native.inputType;
            if (
              (kind === 'deleteContentBackward' || kind === 'deleteContentForward') &&
              deleteMention(kind === 'deleteContentBackward' ? 'backward' : 'forward')
            ) {
              event.preventDefault();
              return;
            }
            if (kind === 'insertParagraph' || kind === 'insertLineBreak') {
              event.preventDefault();
              const selected = mentionSelection(editor.current!) || caret.current;
              replace(selected.start, selected.end, {
                content: '\n',
                mentions: [],
              });
            }
          }}
          onKeyDown={(event) => {
            if (
              event.nativeEvent.isComposing ||
              composing.current ||
              Date.now() - compositionEnded.current < 50
            )
              return;
            if (
              !event.metaKey &&
              !event.ctrlKey &&
              !event.altKey &&
              (event.key === 'Backspace' || event.key === 'Delete') &&
              deleteMention(event.key === 'Backspace' ? 'backward' : 'forward')
            ) {
              event.preventDefault();
              return;
            }
            if ((event.metaKey || event.ctrlKey) && ['z', 'y'].includes(event.key.toLowerCase())) {
              event.preventDefault();
              const redo = event.shiftKey || event.key.toLowerCase() === 'y';
              const index = historyIndex.current + (redo ? 1 : -1);
              const entry = history.current[index];
              if (entry) {
                historyIndex.current = index;
                writeMentionDOM(editor.current!, entry.value);
                current.current = entry.value;
                placeMentionCaret(editor.current!, entry.caret);
                caret.current = { start: entry.caret, end: entry.caret };
                onChange(entry.value);
                closePicker();
              }
              return;
            }
            if (event.key === 'Enter') {
              event.preventDefault();
              if (picker) return;
              if (event.shiftKey || !onSubmit) {
                const selected = mentionSelection(editor.current!) || caret.current;
                replace(selected.start, selected.end, {
                  content: '\n',
                  mentions: [],
                });
              } else onSubmit();
            }
          }}
        />
        {picker && (
          <AnchoredSelect
            id={pickerId}
            anchor={picker.anchor}
            owner={editor.current}
            label={pickerLabel}
            empty={emptyLabel}
            options={filtered.map((item) => ({
              value: item.id,
              label: item.label,
            }))}
            search={
              picker.toolbar
                ? {
                    value: picker.query,
                    label: searchLabel,
                    onChange: (query) => setPicker((old) => old && { ...old, query }),
                  }
                : undefined
            }
            onActiveChange={setActiveOption}
            keyboardReady={() => !composing.current && Date.now() - compositionEnded.current >= 50}
            onValueChange={(id) => {
              const item = items.find((i) => i.id === id);
              if (item) insertMention(item);
            }}
            onClose={closePicker}
          />
        )}
      </>
    );
  }
);
MentionInput.displayName = 'MentionInput';
