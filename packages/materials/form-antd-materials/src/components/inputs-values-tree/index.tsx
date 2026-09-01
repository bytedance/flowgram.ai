/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Button } from 'antd';
import { I18n } from '@flowgram.ai/editor';
import { PlusOutlined } from '@ant-design/icons';

import { FlowValueUtils, IFlowValue, IInputsValues } from '@/shared';
import { useObjectList } from '@/hooks';

import { PropsType } from './types';
import './styles.css';
import { InputValueRow } from './row';

export function InputsValuesTree(props: PropsType) {
  const { value, onChange, readonly, hasError, constantProps } = props;

  const { list, updateKey, updateValue, remove, add } = useObjectList<
    IInputsValues | IFlowValue | undefined
  >({
    value,
    onChange: (v) => onChange?.(v as IInputsValues),
    sortIndexKey: (value) => (FlowValueUtils.isFlowValue(value) ? 'extra.index' : ''),
  });

  return (
    <div>
      <div className="gedit-m-inputs-values-tree-tree-items">
        {list.map((item) => (
          <InputValueRow
            key={item.id}
            keyName={item.key}
            value={item.value}
            onUpdateKey={(key) => updateKey(item.id, key)}
            onUpdateValue={(value) => updateValue(item.id, value)}
            onRemove={() => remove(item.id)}
            readonly={readonly}
            hasError={hasError}
            constantProps={constantProps}
          />
        ))}
      </div>
      <Button
        style={{ marginTop: 10, marginLeft: 16 }}
        disabled={readonly}
        icon={<PlusOutlined />}
        size="small"
        onClick={() => {
          add({
            type: 'constant',
            content: '',
            schema: { type: 'string' },
          });
        }}
      >
        {I18n.t('Add')}
      </Button>
    </div>
  );
}
