/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { ChatSuggestions } from '../chat-suggestions';
import { ChatMessages } from '../chat-messages';
import { ChatInput } from '../chat-input';
import { ChatHeader } from '../chat-header';
import { ChatEmptyState } from '../chat-empty-state';
import { useChatMessages } from '../../hooks';
import { useChatPanel } from '../../../../plugins/panel-manager-plugin/hooks';

import styles from './index.module.css';

export const ChatPanel: React.FC = () => {
  const { close } = useChatPanel();
  const messages = useChatMessages();

  return (
    <div className={styles.panel}>
      <ChatHeader onClose={close} />

      <div className={styles.content}>
        {messages.length === 0 ? <ChatEmptyState /> : <ChatMessages messages={messages} />}

        {messages.length <= 1 && <ChatSuggestions />}

        <ChatInput />
      </div>
    </div>
  );
};
