/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useCallback, useEffect, useState } from 'react';

import { debounce } from 'lodash-es';
import { Popover, Tree } from 'antd';
import {
  Mention,
  MentionOpenChangeEvent,
  getCurrentMentionReplaceRange,
  useEditor,
  PositionMirror,
} from '@flowgram.ai/coze-editor/react';
import { EditorAPI } from '@flowgram.ai/coze-editor/preset-prompt';

import { useVariableTree } from '@/components/variable-selector';

const DEFAULT_TRIGGER_CHARACTER = ['{', '{}', '@'];

export function VariableTree({
  triggerCharacters = DEFAULT_TRIGGER_CHARACTER,
}: {
  triggerCharacters?: string[];
}) {
  const [posKey, setPosKey] = useState('');
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState(-1);
  const editor = useEditor<EditorAPI>();

  function insert(variablePath: string) {
    const range = getCurrentMentionReplaceRange(editor.$view.state);

    if (!range) {
      return;
    }

    /**
     * When user input {{xxxx}}, {{{xxx}}}(more brackets if possible), replace all brackets with {{xxxx}}
     */
    let { from, to } = range;
    while (editor.$view.state.doc.sliceString(from - 1, from) === '{') {
      from--;
    }
    while (editor.$view.state.doc.sliceString(to, to + 1) === '}') {
      to++;
    }

    editor.replaceText({
      from,
      to,
      text: '{{' + variablePath + '}}',
    });

    setVisible(false);
  }

  function handleOpenChange(e: MentionOpenChangeEvent) {
    setPosition(e.state.selection.main.head);
    setVisible(e.value);
  }

  useEffect(() => {
    if (!editor) {
      return;
    }
  }, [editor, visible]);

  const treeData = useVariableTree({});

  const debounceUpdatePosKey = useCallback(
    debounce(() => setPosKey(String(Math.random())), 100),
    []
  );

  return (
    <>
      <Mention triggerCharacters={triggerCharacters} onOpenChange={handleOpenChange} />

      <Popover
        key={posKey}
        open={visible}
        trigger={[]}
        placement="topLeft"
        content={
          <div style={{ width: 300, maxHeight: 300, overflowY: 'auto' }}>
            <Tree
              treeData={treeData}
              onExpand={() => {
                // When Expand, an animation is triggered, so we need to update the position by debounce
                debounceUpdatePosKey();
              }}
              onSelect={(selectedKeys) => {
                const selected = selectedKeys[0];
                if (selected !== undefined) {
                  insert(String(selected));
                }
              }}
            />
          </div>
        }
      >
        {/* PositionMirror allows the Popover to appear at the specified cursor position */}
        <PositionMirror
          position={position}
          // When Doc scroll, update position
          onChange={() => {
            // Update immediately to avoid the popover position lagging behind the cursor
            setPosKey(String(Math.random()));
          }}
        />
      </Popover>
    </>
  );
}
