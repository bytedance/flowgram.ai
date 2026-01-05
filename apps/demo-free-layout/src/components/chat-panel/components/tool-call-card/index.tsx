/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState, useMemo } from 'react';

import classNames from 'classnames';
import { IconChevronDown, IconChevronRight, IconClose, IconSpin } from '@douyinfe/semi-icons';

import styles from './index.module.css';

interface ToolCallCardProps {
  toolName: string;
  arguments: string;
  result?: string;
  defaultOpen?: boolean;
  customRender?: (args: any, result?: any) => React.ReactNode;
}

export const ToolCallCard: React.FC<ToolCallCardProps> = ({
  toolName,
  arguments: args,
  result,
  defaultOpen = false,
  customRender,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isRunning = !result;
  const hasContent = args || result;

  const handleToggle = () => {
    if (hasContent) {
      setIsOpen(!isOpen);
    }
  };

  const { parsedArgs, parsedResult, hasValidArgs, isSuccess, isCancelled } = useMemo(() => {
    let parsedArgs: any = null;
    let parsedResult: any = null;
    let hasValidArgs = false;
    let isSuccess = false;
    let isCancelled = false;

    try {
      if (args && args.trim()) {
        parsedArgs = JSON.parse(args);
        hasValidArgs = true;
      }
    } catch (e) {
      console.warn(`Failed to parse tool arguments for ${toolName}:`, args, e);
      parsedArgs = null;
    }

    try {
      if (result && result.trim()) {
        parsedResult = JSON.parse(result);
        isSuccess = parsedResult?.success === true;
        isCancelled = result.includes('请求已取消') || result.includes('已取消');
      }
    } catch (e) {
      console.warn(`Failed to parse tool result for ${toolName}:`, result, e);
      parsedResult = null;
    }

    return { parsedArgs, parsedResult, hasValidArgs, isSuccess, isCancelled };
  }, [args, result, toolName]);

  if (customRender && hasValidArgs) {
    const CustomRenderComponent = customRender;
    return (
      <div style={{ margin: '8px 0' }}>
        <CustomRenderComponent args={parsedArgs} result={parsedResult} />
      </div>
    );
  }

  const statusIcon = isCancelled ? (
    <IconClose size="small" className={styles.cancelledIcon} />
  ) : isSuccess ? (
    <></>
  ) : (
    <IconClose size="small" className={styles.errorIcon} />
  );
  return (
    <div
      className={classNames(styles.card, {
        [styles.running]: isRunning,
        [styles.cancelled]: isCancelled,
        [styles.error]: !isSuccess && result,
        [styles.cardExpanded]: isOpen,
      })}
    >
      <div
        className={classNames(styles.header, {
          [styles.headerExpanded]: isOpen,
        })}
        onClick={handleToggle}
      >
        <span
          className={classNames(styles.title, {
            [styles.titleRunning]: isRunning,
          })}
        >
          {toolName}
          {!isRunning && (isCancelled || !isSuccess) && (
            <span className={styles.statusIcon}>{statusIcon}</span>
          )}
        </span>
        <div className={styles.headerRight}>
          {(hasContent || isRunning) && (
            <span className={styles.icon}>
              {isRunning ? (
                <IconSpin size="small" className={styles.spinning} />
              ) : isOpen ? (
                <IconChevronDown size="small" />
              ) : (
                <IconChevronRight size="small" />
              )}
            </span>
          )}
        </div>
      </div>
      {isOpen && hasContent && (
        <div className={styles.body}>
          {args && (
            <div className={styles.section}>
              <div className={styles.label}>参数</div>
              <pre className={styles.contentText}>{args}</pre>
            </div>
          )}
          {result && (
            <div className={styles.section}>
              <div className={styles.label}>结果</div>
              <pre className={styles.contentText}>{result}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
