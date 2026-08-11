/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Button } from 'antd';
import { FieldArray } from '@flowgram.ai/editor';
import { PlusOutlined } from '@ant-design/icons';

import { AssignRow, AssignValueType } from '@/components/assign-row';

interface AssignRowsProps {
  name: string;
  readonly?: boolean;
  defaultValue?: AssignValueType[];
}

export function AssignRows(props: AssignRowsProps) {
  const { name, readonly, defaultValue } = props;

  return (
    <FieldArray<AssignValueType | undefined> name={name} defaultValue={defaultValue}>
      {({ field }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {field.map((childField, index) => (
            <AssignRow
              key={childField.key}
              readonly={readonly}
              value={childField.value}
              onChange={(value) => {
                childField.onChange(value);
              }}
              onDelete={() => field.remove(index)}
            />
          ))}
          <div style={{ display: 'flex', gap: 5 }}>
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
              onClick={() => field.append({ operator: 'assign' })}
            >
              Assign
            </Button>
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
              onClick={() => field.append({ operator: 'declare' })}
            >
              Declaration
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
