import React from 'react';
import './prompt-viewer.css';

// 定义PromptButton Props类型
export interface PromptButtonProps {
  buttonText?: string;
  copiedText?: string;
  viewText?: string;
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  copySuccess: boolean;
  showPrompt: boolean;
  onClickButton: () => void;
  theme?: string; // 保留主题属性但转为原生样式
}

export const PromptButton: React.FC<PromptButtonProps> = ({
  buttonText = '查看 & 复制 Prompt',
  copiedText = '✓ 已复制',
  viewText = '复制 Prompt',
  position = { top: '20px', right: '20px' },
  copySuccess,
  showPrompt,
  onClickButton,
  theme = 'primary',
}) => {
  // 根据props构建按钮样式
  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 100,
    top: position.top,
    right: position.right,
    bottom: position.bottom,
    left: position.left,
  };

  return (
    <button
      className={`prompt-button ${copySuccess ? 'copy-success' : ''} ${theme}`}
      style={buttonStyle}
      onClick={onClickButton}
    >
      {copySuccess ? copiedText : showPrompt ? viewText : buttonText}
    </button>
  );
};
