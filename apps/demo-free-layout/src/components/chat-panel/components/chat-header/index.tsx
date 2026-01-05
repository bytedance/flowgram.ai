/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IconButton } from '@douyinfe/semi-ui';
import { IconClose } from '@douyinfe/semi-icons';

import styles from './index.module.css';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => (
  <div className={styles.header}>
    <h3 className={styles.title}>FlowGram AI 助手</h3>
    <IconButton type="tertiary" theme="borderless" icon={<IconClose />} onClick={onClose} />
  </div>
);
