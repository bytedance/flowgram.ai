/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useMemo, useEffect, useState } from 'react';

import { isPlainObject, last } from 'lodash-es';
import {
  type ArrayType,
  ASTMatch,
  type BaseType,
  type BaseVariableField,
  useCurrentScope,
} from '@flowgram.ai/editor';
import {
  Mention,
  MentionOpenChangeEvent,
  getCurrentMentionReplaceRange,
  useEditor,
  PositionMirror,
} from '@flowgram.ai/coze-editor/react';
import { EditorAPI } from '@flowgram.ai/coze-editor/preset-prompt';
import { type TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { Tree, Popover } from '@douyinfe/semi-ui';

import { IInputsValues } from '@/shared/flow-value/types';
import { FlowValueUtils } from '@/shared';

type VariableField = BaseVariableField<{ icon?: string | JSX.Element; title?: string }>;

export function InputsPicker({
  inputsValues,
  onSelect,
}: {
  inputsValues: IInputsValues;
  onSelect: (v: string) => void;
}) {
  const scope = useCurrentScope();

  const getArrayDrilldown = (type: ArrayType, depth = 1): { type: BaseType; depth: number } => {
    if (ASTMatch.isArray(type.items)) {
      return getArrayDrilldown(type.items, depth + 1);
    }

    return { type: type.items, depth: depth };
  };

  const renderVariable = (variable: VariableField, keyPath: string[]): TreeNodeData => {
    let type = variable?.type;

    let children: TreeNodeData[] | undefined;

    if (ASTMatch.isObject(type)) {
      children = (type.properties || [])
        .map((_property) => renderVariable(_property as VariableField, [...keyPath, _property.key]))
        .filter(Boolean) as TreeNodeData[];
    }

    if (ASTMatch.isArray(type)) {
      const drilldown = getArrayDrilldown(type);

      if (ASTMatch.isObject(drilldown.type)) {
        children = (drilldown.type.properties || [])
          .map((_property) =>
            renderVariable(_property as VariableField, [
              ...keyPath,
              ...new Array(drilldown.depth).fill('[0]'),
              _property.key,
            ])
          )
          .filter(Boolean) as TreeNodeData[];
      }
    }

    const key = keyPath
      .map((_key, idx) => (_key === '[0]' || idx === 0 ? _key : `.${_key}`))
      .join('');

    return {
      key: key,
      label: last(keyPath),
      value: key,
      children,
    };
  };

  const getTreeData = (value: any, keyPath: string[]): TreeNodeData | undefined => {
    const currKey = keyPath.join('.');

    if (FlowValueUtils.isFlowValue(value)) {
      if (FlowValueUtils.isRef(value)) {
        const variable = scope?.available?.getByKeyPath(value.content || []);
        if (variable) {
          return renderVariable(variable, keyPath);
        }
      }
      return {
        key: currKey,
        value: currKey,
        label: last(keyPath),
      };
    }

    if (isPlainObject(value)) {
      return {
        key: currKey,
        value: currKey,
        label: last(keyPath),
        children: Object.entries(value)
          .map(([key, value]) => getTreeData(value, [...keyPath, key])!)
          .filter(Boolean),
      };
    }
  };

  const treeData: TreeNodeData[] = useMemo(
    () =>
      Object.entries(inputsValues)
        .map(([key, value]) => getTreeData(value, [key])!)
        .filter(Boolean),
    []
  );

  return <Tree treeData={treeData} onSelect={(v) => onSelect(v)} />;
}

const DEFAULT_TRIGGER_CHARACTERS = ['{', '{}', '@'];

export function InputsTree({
  inputsValues,
  triggerCharacters = DEFAULT_TRIGGER_CHARACTERS,
}: {
  inputsValues: IInputsValues;
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
      ...range,
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

  return (
    <>
      <Mention triggerCharacters={triggerCharacters} onOpenChange={handleOpenChange} />

      <Popover
        visible={visible}
        trigger="custom"
        position="topLeft"
        rePosKey={posKey}
        content={
          <div style={{ width: 300, maxHeight: 300, overflowY: 'auto' }}>
            <InputsPicker
              inputsValues={inputsValues}
              onSelect={(v) => {
                insert(v);
              }}
            />
          </div>
        }
      >
        {/* PositionMirror allows the Popover to appear at the specified cursor position */}
        <PositionMirror
          position={position}
          // When Doc scroll, update position
          onChange={() => setPosKey(String(Math.random()))}
        />
      </Popover>
    </>
  );
}
