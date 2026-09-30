/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Button } from 'antd';
import { I18n } from '@flowgram.ai/editor';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import { IFlowConstantRefValue, IFlowValue } from '@/shared';
import { useObjectList } from '@/hooks';
import { InjectDynamicValueInput } from '@/components/dynamic-value-input';
import { BlurInput } from '@/components/blur-input';

import { PropsType } from './types';
import './styles.css';

export function InputsValues({
  value,
  onChange,
  style,
  readonly,
  constantProps,
  schema,
  hasError,
}: PropsType) {
  const { list, updateKey, updateValue, remove, add } = useObjectList<IFlowValue | undefined>({
    value,
    onChange,
    sortIndexKey: 'extra.index',
  });

  return (
    <div>
      <div className="gedit-m-inputs-values-rows" style={style}>
        {list.map((item) => (
          <div className="gedit-m-inputs-values-row" key={item.id}>
            <BlurInput
              style={{ width: 100, minWidth: 100, maxWidth: 100 }}
              disabled={readonly}
              size="small"
              value={item.key}
              onChange={(v) => updateKey(item.id, v)}
              placeholder={I18n.t('Input Key')}
            />
            <InjectDynamicValueInput
              style={{ flexGrow: 1 }}
              readonly={readonly}
              value={item.value as IFlowConstantRefValue}
              onChange={(v) => updateValue(item.id, v)}
              schema={schema}
              hasError={hasError}
              constantProps={{
                ...constantProps,
                strategies: [...(constantProps?.strategies || [])],
              }}
            />
            <Button
              disabled={readonly}
              type="text"
              icon={<DeleteOutlined />}
              size="small"
              aria-label={I18n.t('Delete')}
              onClick={() => remove(item.id)}
            />
          </div>
        ))}
      </div>
      <Button
        disabled={readonly}
        icon={<PlusOutlined />}
        size="small"
        onClick={() =>
          add({
            type: 'constant',
            content: '',
            schema: { type: 'string' },
          })
        }
      >
        {I18n.t('Add')}
      </Button>
    </div>
  );
}
