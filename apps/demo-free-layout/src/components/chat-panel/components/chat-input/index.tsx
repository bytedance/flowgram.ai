/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { Sender } from '@ant-design/x';

import { useChatInput } from '../../hooks';

import styles from './index.module.css';

interface ChatInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = (props) => {
  const internal = useChatInput();

  // 如果传入了 props，使用外部控制（用于编辑模式）
  // 否则使用内部状态（用于新消息输入）
  const value = props.value ?? internal.value;
  const onChange = props.onChange ?? internal.setValue;
  const onSubmit = props.onSubmit ?? internal.send;
  const onCancel = props.onCancel ?? internal.cancel;
  const loading = props.loading ?? internal.isLoading;

  return (
    <div className={styles.sender}>
      <Sender
        placeholder="输入消息..."
        value={value}
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  );
};
