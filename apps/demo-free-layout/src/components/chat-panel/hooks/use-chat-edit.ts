/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState } from 'react';

import { useAgentService } from '../../../plugins/agent-plugin';
import { useSchemaRestoreConfirm } from './use-schema-restore-confirm';

export const useChatEdit = () => {
  const agentService = useAgentService();
  const { confirmWithSchemaRestore } = useSchemaRestoreConfirm();
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const startEdit = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditValue(content);
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditValue('');
  };

  const submitEdit = async (value: string) => {
    if (!value.trim() || isLoading || !editingMessageId) return;

    const proceedWithEdit = async () => {
      setIsLoading(true);

      try {
        await agentService.editAndResendMessage(editingMessageId, value);
        cancelEdit();
      } finally {
        setIsLoading(false);
      }
    };

    confirmWithSchemaRestore(editingMessageId, proceedWithEdit, {
      content: '编辑并重新发送消息将会清除后续的所有消息。是否需要先回退工作流的改动？',
    });
  };

  return {
    editingMessageId,
    editValue,
    setEditValue,
    isLoading,
    startEdit,
    cancelEdit,
    submitEdit,
  };
};
