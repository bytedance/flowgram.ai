/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';

import { Button } from 'antd';
import type { IJsonSchema } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';

import { JsonInputModal } from './json-input-modal';

export interface JsonSchemaCreatorProps {
  /** 生成 schema 后的回调 */
  onSchemaCreate?: (schema: IJsonSchema) => void;
}

export function JsonSchemaCreator({ onSchemaCreate }: JsonSchemaCreatorProps) {
  const [visible, setVisible] = useState(false);

  const handleCreate = (schema: IJsonSchema) => {
    onSchemaCreate?.(schema);
    setVisible(false);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>{I18n.t('JSON to JSONSchema')}</Button>
      <JsonInputModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleCreate}
      />
    </>
  );
}
