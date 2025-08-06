/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable react/prop-types */
import React from 'react';

import { I18n } from '@flowgram.ai/editor';

import { CodeEditorMini } from '@/components/code-editor-mini';

import { type JsonSchemaTypeRegistry } from '../manager';

export const arrayRegistry: Partial<JsonSchemaTypeRegistry> = {
  type: 'array',
  ConstantRenderer: (props) => (
    <CodeEditorMini
      value={props.value}
      languageId="json"
      onChange={(v) => props.onChange?.(v)}
      placeholder={I18n.t('Please Input Array')}
      readonly={props.readonly}
    />
  ),
};
