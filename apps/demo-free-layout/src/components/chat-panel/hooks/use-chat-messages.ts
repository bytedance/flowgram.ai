/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState, useEffect } from 'react';

import type { UIChatMessage } from '../../../plugins/agent-plugin/types';
import { useAgentService } from '../../../plugins/agent-plugin/hooks';

export const useChatMessages = (): UIChatMessage[] => {
  const agentService = useAgentService();
  const [messages, setMessages] = useState<UIChatMessage[]>([]);

  useEffect(() => {
    // 初始化时获取消息
    setMessages(agentService.getMessages());

    // 订阅消息变化
    const disposable = agentService.onMessagesChange((newMessages) => {
      setMessages(newMessages);
    });

    return () => {
      disposable.dispose();
    };
  }, [agentService]);

  return messages;
};
