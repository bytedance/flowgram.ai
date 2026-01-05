/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useState } from 'react';

import { useAgentService } from '../../../plugins/agent-plugin';

export const useChatInput = () => {
  const agentService = useAgentService();
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const send = async (inputValue: string) => {
    if (!inputValue.trim() || isLoading) return;

    setValue('');
    setIsLoading(true);

    try {
      await agentService.sendMessage(inputValue);
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = () => {
    if (isLoading) {
      agentService.cancelCurrentRequest();
      setIsLoading(false);
    }
  };

  return {
    value,
    setValue,
    isLoading,
    send,
    cancel,
  };
};
