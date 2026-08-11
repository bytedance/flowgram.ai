/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';

import { Modal, Typography } from 'antd';
import type { IJsonSchema } from '@flowgram.ai/json-schema';
import { I18n } from '@flowgram.ai/editor';

import { jsonToSchema } from './utils/json-to-schema';
import { JsonCodeEditor } from '../code-editor';

const { Text } = Typography;

interface JsonInputModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (schema: IJsonSchema) => void;
}

export function JsonInputModal({ visible, onClose, onConfirm }: JsonInputModalProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    try {
      const schema = jsonToSchema(jsonInput);
      onConfirm(schema);
      setJsonInput('');
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      onOk={handleConfirm}
      title={I18n.t('JSON to JSONSchema')}
      okText={I18n.t('Generate')}
      cancelText={I18n.t('Cancel')}
      width={600}
    >
      <div style={{ marginBottom: 8 }}>
        <Text>{I18n.t('Paste JSON data')}：</Text>
      </div>
      <div style={{ minHeight: 300 }}>
        <JsonCodeEditor value={jsonInput} onChange={(value) => setJsonInput(value || '')} />
      </div>
      {error && (
        <div style={{ marginTop: 8 }}>
          <Text type="danger">{error}</Text>
        </div>
      )}
    </Modal>
  );
}
