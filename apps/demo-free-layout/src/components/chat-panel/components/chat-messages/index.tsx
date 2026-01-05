/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useRef, useEffect } from 'react';

import { Bubble } from '@ant-design/x';

import { MessageContent } from '../message-content';
import { ChatInput } from '../chat-input';
import { useChatEdit } from '../../hooks';
import type { UIChatMessage } from '../../../../plugins/agent-plugin/types';

import styles from './index.module.css';

interface ChatMessagesProps {
  messages: UIChatMessage[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const editInputRef = useRef<HTMLDivElement>(null);
  const {
    editingMessageId,
    editValue,
    setEditValue,
    isLoading,
    startEdit,
    cancelEdit,
    submitEdit,
  } = useChatEdit();

  useEffect(() => {
    if (!editingMessageId) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (editInputRef.current && !editInputRef.current.contains(event.target as Node)) {
        cancelEdit();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingMessageId, cancelEdit]);

  const bubbleItems = messages.map((msg) => {
    const hasToolCall = msg.content.includes('<tool_call');
    return {
      key: msg.id,
      role: msg.role,
      content: msg.content || '正在思考...',
      loading: msg.status === 'sending' && !msg.content,
      streaming: msg.status === 'sending' && !hasToolCall,
    };
  });

  return (
    <div className={styles.messages}>
      <Bubble.List
        autoScroll
        items={bubbleItems}
        role={{
          assistant: {
            placement: 'start',
            typing: { effect: 'typing', step: 5, interval: 20 },
            contentRender: (content: string, { key }: any) => {
              const msg = messages.find((m) => m.id === key);
              const isCompleted = msg?.status === 'sent';
              return <MessageContent content={content} isCompleted={isCompleted} messageId={key} />;
            },
            variant: 'filled',
            styles: {
              // @ts-ignore
              bubble: {
                paddingInlineEnd: 0,
              },
              content: {
                background: 'transparent',
                padding: 0,
              },
              body: {
                width: '100%',
              },
            },
          },
          user: {
            placement: 'end',
            variant: 'filled',
            contentRender: (content: string, { key }: any) => {
              const isEditing = editingMessageId === key;

              if (isEditing) {
                return (
                  <div ref={editInputRef} style={{ width: '100%' }}>
                    <ChatInput
                      value={editValue}
                      onChange={setEditValue}
                      onSubmit={submitEdit}
                      onCancel={cancelEdit}
                      loading={isLoading}
                    />
                  </div>
                );
              }

              return (
                <div className={styles.userMessageWrapper}>
                  <div
                    onClick={() => startEdit(key, content)}
                    className={styles.userMessageContent}
                  >
                    {content}
                  </div>
                </div>
              );
            },
            styles: {
              // @ts-ignore
              bubble: {
                paddingInlineStart: 0,
              },
              content: {
                background: 'transparent',
                padding: 0,
              },
              body: {
                width: '100%',
              },
            },
          },
        }}
      />
    </div>
  );
};
