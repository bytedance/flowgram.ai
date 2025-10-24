/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useRef, useEffect, useState } from 'react';

import { Field, FieldRenderProps } from '@flowgram.ai/free-layout-editor';
import { BlurInput } from '@flowgram.ai/form-materials';
import { IconButton, Tooltip, Typography } from '@douyinfe/semi-ui';
import { IconEdit } from '@douyinfe/semi-icons';

import { Title } from './styles';
const { Text } = Typography;

export function TitleInput(): JSX.Element {
  const [titleEdit, updateTitleEdit] = useState<boolean>(false);

  const ref = useRef<any>();
  useEffect(() => {
    if (titleEdit) {
      ref.current?.focus();
    }
  }, [titleEdit]);

  return (
    <Title>
      <Field name="title">
        {({ field: { value, onChange }, fieldState }: FieldRenderProps<string>) => (
          <div
            style={{
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 5,
            }}
          >
            {titleEdit ? (
              <BlurInput
                ref={ref}
                value={value}
                onDoubleClick={() => {
                  updateTitleEdit(true);
                }}
                onChange={(v) => {
                  onChange(v);
                }}
                onBlur={() => {
                  updateTitleEdit(false);
                }}
              />
            ) : (
              <>
                <Text ellipsis={{ showTooltip: true }}>{value}</Text>
                {!titleEdit && (
                  <Tooltip content="Edit Title">
                    <IconButton
                      size="small"
                      theme="borderless"
                      type="tertiary"
                      icon={<IconEdit size="small" />}
                      onClick={() => updateTitleEdit(!titleEdit)}
                    />
                  </Tooltip>
                )}
              </>
            )}
          </div>
        )}
      </Field>
    </Title>
  );
}
