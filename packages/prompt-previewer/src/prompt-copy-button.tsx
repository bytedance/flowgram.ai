import React, { useState } from 'react';

import { PromptViewer } from './prompt-viewer';
import { PromptButton } from './prompt-button';

// 定义组件Props类型
export interface PromptCopyButtonProps {
  promptContent: string;
  buttonText?: string;
  copiedText?: string;
  viewText?: string;
  title?: string;
  previewLength?: number;
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  theme?: string;
  showNotification?: boolean;
  centered?: boolean;
}

export const PromptCopyButton: React.FC<PromptCopyButtonProps> = ({
  promptContent,
  buttonText = '查看 & 复制 Prompt',
  copiedText = '✓ 已复制',
  viewText = '复制 Prompt',
  title = 'Prompt Content',
  previewLength = 500,
  position = { top: '20px', right: '20px' },
  theme = 'primary',
  showNotification = false,
  centered = true,
}) => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    // 复制内容到剪贴板
    navigator.clipboard
      .writeText(promptContent)
      .then(() => {
        setCopySuccess(true);
        if (showNotification) {
          // 使用原生通知而不是 Toast
          const notification = document.createElement('div');
          notification.className = 'prompt-notification success';
          notification.textContent = '已复制到剪贴板';
          document.body.appendChild(notification);

          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
        }
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('复制失败: ', err);
        if (showNotification) {
          // 使用原生通知而不是 Toast
          const notification = document.createElement('div');
          notification.className = 'prompt-notification error';
          notification.textContent = '复制失败，请手动复制';
          document.body.appendChild(notification);

          setTimeout(() => {
            document.body.removeChild(notification);
          }, 2000);
        }
      });
  };

  const handleButtonClick = () => {
    if (copySuccess) return;
    if (showPrompt) {
      handleCopy();
    } else {
      setShowPrompt(true);
    }
  };

  return (
    <>
      <PromptButton
        buttonText={buttonText}
        copiedText={copiedText}
        viewText={viewText}
        position={position}
        copySuccess={copySuccess}
        showPrompt={showPrompt}
        onClickButton={handleButtonClick}
        theme={theme}
      />

      <PromptViewer
        promptContent={promptContent}
        title={title}
        previewLength={previewLength}
        position={position}
        visible={showPrompt}
        onClose={() => setShowPrompt(false)}
        copySuccess={copySuccess}
        onCopy={handleCopy}
        centered={centered}
      />
    </>
  );
};
