/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

import { IFlowConstantRefValue } from '@/shared';
import { InjectVariableSelector } from '@/components/variable-selector';
import { InjectDynamicValueInput } from '@/components/dynamic-value-input';
import { BlurInput } from '@/components/blur-input';

import { AssignRowProps } from './types';

export function AssignRow(props: AssignRowProps) {
  const {
    value = {
      operator: 'assign',
    },
    onChange,
    onDelete,
    readonly,
  } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 150, minWidth: 150, maxWidth: 150 }}>
        {value?.operator === 'assign' ? (
          <InjectVariableSelector
            style={{ width: '100%', height: 26 }}
            value={value?.left?.content}
            config={{ placeholder: 'Select Left' }}
            onChange={(v) =>
              onChange?.({
                ...value,
                left: { type: 'ref', content: v },
              })
            }
          />
        ) : (
          <BlurInput
            style={{ height: 26 }}
            size="small"
            placeholder="Input Name"
            value={value?.left}
            onChange={(v) =>
              onChange?.({
                ...value,
                left: v,
              })
            }
          />
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        <InjectDynamicValueInput
          readonly={readonly}
          value={value?.right as IFlowConstantRefValue | undefined}
          onChange={(v) =>
            onChange?.({
              ...value,
              right: v,
            })
          }
        />
      </div>
      {onDelete && (
        <div>
          <Button
            size="small"
            type="text"
            icon={<MinusOutlined />}
            aria-label="Remove assignment"
            onClick={() => onDelete?.()}
          />
        </div>
      )}
    </div>
  );
}

export { type AssignValueType } from './types';
