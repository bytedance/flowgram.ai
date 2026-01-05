/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { Modal } from '@douyinfe/semi-ui';

import { useAgentService } from '../../../plugins/agent-plugin';

export const useSchemaRestoreConfirm = () => {
  const agentService = useAgentService();

  const confirmWithSchemaRestore = (
    messageId: string,
    onProceed: () => void,
    options?: {
      title?: string;
      content?: string;
    }
  ) => {
    const hasSchema = agentService.hasSchema(messageId);

    if (hasSchema) {
      Modal.confirm({
        title: options?.title || '确认操作',
        content: options?.content || '此操作将会清除后续的所有消息。是否需要先回退工作流的改动？',
        okText: '回退并继续',
        cancelText: '直接继续',
        onOk: () => {
          agentService.restoreSchema(messageId);
          onProceed();
        },
        onCancel: () => {
          onProceed();
        },
      });
    } else {
      onProceed();
    }
  };

  return { confirmWithSchemaRestore };
};
