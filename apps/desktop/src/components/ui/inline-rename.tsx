/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useEffect, useId, useRef, useState } from 'react';

import { Pencil } from 'lucide-react';

import { tx } from '../../lib/i18n';

/** Text is editable only during an explicit rename transaction. */
export function InlineRename({
  value,
  editing,
  onStart,
  onCommit,
  onEnd,
  pencil = false,
}: {
  value: string;
  editing: boolean;
  onStart: () => void;
  onCommit: (value: string) => void;
  onEnd: () => void;
  pencil?: boolean;
}) {
  const [draft, setDraft] = useState(value);
  const [invalid, setInvalid] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const finished = useRef(false);
  const composing = useRef(false);
  const errorId = useId();
  useEffect(() => {
    if (!editing) return;
    finished.current = false;
    setDraft(value);
    setInvalid(false);
    input.current?.focus();
    input.current?.select();
  }, [editing]);
  const finish = (cancel = false) => {
    if (finished.current) return;
    const name = draft.trim();
    if (!cancel && !name) {
      setInvalid(true);
      input.current?.focus();
      return;
    }
    finished.current = true;
    if (!cancel && name !== value) onCommit(name);
    onEnd();
  };
  if (!editing)
    return (
      <span className="inline-rename">
        <span className="inline-rename-text" title={value}>
          {value}
        </span>
        {pencil && (
          <button
            type="button"
            className="nf-icon-button inline-rename-trigger"
            aria-label={tx('重命名节点')}
            title={tx('重命名节点')}
            onClick={onStart}
          >
            <Pencil size={13} />
          </button>
        )}
      </span>
    );
  return (
    <span
      data-inline-rename
      className="inline-rename editing flow-canvas-not-draggable"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
    >
      <input
        ref={input}
        value={draft}
        aria-label={tx('节点名称')}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onChange={(event) => {
          setDraft(event.target.value);
          setInvalid(false);
        }}
        onCompositionStart={() => {
          composing.current = true;
        }}
        onCompositionEnd={() => {
          composing.current = false;
        }}
        onBlur={() => finish()}
        onKeyDown={(event) => {
          event.stopPropagation();
          if (event.nativeEvent.isComposing || composing.current) return;
          if (event.key === 'Enter') {
            event.preventDefault();
            finish();
          }
          if (event.key === 'Escape') {
            event.preventDefault();
            finish(true);
          }
        }}
      />
      {invalid && (
        <span id={errorId} role="alert" className="inline-rename-error">
          {tx('名称不能为空')}
        </span>
      )}
    </span>
  );
}
