/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React from 'react';

import { IconComment } from '@douyinfe/semi-icons';

import styles from './index.module.css';

export const ChatEmptyState: React.FC = () => (
  <div className={styles.emptyState}>
    <div className={styles.emptyContent}>
      <div className={styles.emptyIcon}>
        <IconComment style={{ fontSize: '64px' }} />
      </div>
      <div className={styles.emptyTitle}>你好！我是 FlowGram AI 助手</div>
      <div className={styles.emptyDescription}>
        我可以帮你创建和编辑流程图,
        <br />
        有什么我可以帮助你的吗？
      </div>
    </div>
  </div>
);
