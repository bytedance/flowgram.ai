/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IJsonSchema } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';

import { ConstantInput } from '@/components/constant-input';

/**
 * Renders the corresponding default value input component based on different data types.
 * @param props - Component properties, including value, type, placeholder, onChange.
 * @returns Returns the input component of the corresponding type or null.
 */
export function DefaultValue(props: {
  value: any;
  schema?: IJsonSchema;
  placeholder?: string;
  readonly?: boolean;
  onChange: (value: any) => void;
}) {
  const { value, schema, onChange, placeholder, readonly } = props;

  return (
    <div className="gedit-m-json-schema-editor-constant-input-wrapper">
      <ConstantInput
        value={value}
        onChange={(_v) => onChange(_v)}
        schema={schema || { type: 'string' }}
        readonly={readonly}
        placeholder={placeholder ?? I18n.t('Default value if parameter is not provided')}
        enableMultiLineStr
      />
    </div>
  );
}
