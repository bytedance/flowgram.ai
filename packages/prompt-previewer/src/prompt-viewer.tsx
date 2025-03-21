import React, { useState, useEffect } from 'react';
import './prompt-viewer.css';

// 定义PromptViewer Props类型
export interface PromptViewerProps {
  promptContent: string;
  title?: string;
  previewLength?: number;
  position?: {
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  };
  visible: boolean;
  onClose: () => void;
  copySuccess?: boolean;
  onCopy: () => void;
  centered?: boolean;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({
  promptContent,
  title = 'Prompt Content',
  previewLength = 500,
  position = { top: '20px', right: '20px' },
  visible,
  onClose,
  copySuccess = false,
  onCopy,
  centered = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // 处理动画效果
  useEffect(() => {
    if (visible) {
      setAnimationClass('prompt-viewer-show');
    } else {
      setAnimationClass('prompt-viewer-hide');
    }
  }, [visible]);

  // 处理ESC键关闭弹窗
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (visible && event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [visible, onClose]);

  // 只显示指定长度字符，点击后展开全部
  const displayContent = isExpanded
    ? promptContent
    : promptContent.length > previewLength
    ? promptContent.slice(0, previewLength) + '...'
    : promptContent;

  if (!visible) return null;

  // 计算样式
  const viewerStyle: React.CSSProperties = centered
    ? {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    : {
        top:
          typeof position.top === 'string'
            ? `calc(${position.top} + 45px)`
            : (position.top || 0) + 45,
        right: position.right,
        bottom: position.bottom,
        left: position.left,
      };

  return (
    <>
      <div className="prompt-viewer-backdrop" onClick={onClose}></div>
      <div className={`prompt-viewer ${animationClass}`} style={viewerStyle}>
        <div className="prompt-viewer-header">
          <h3 className="prompt-viewer-title">{title}</h3>
          <button className="prompt-viewer-close-button" onClick={onClose} aria-label="关闭">
            &times;
          </button>
        </div>

        <div className="prompt-content">
          <pre>{displayContent}</pre>
        </div>

        <div className="prompt-viewer-footer">
          {promptContent.length > previewLength && (
            <button className="prompt-viewer-button" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '收起' : '展开全部'}
            </button>
          )}
          <button
            className={`prompt-viewer-button ${copySuccess ? 'success' : ''}`}
            onClick={onCopy}
          >
            {copySuccess ? '已复制' : '复制内容'}
          </button>
          <button className="prompt-viewer-button primary" onClick={onClose}>
            关闭
          </button>
        </div>
      </div>
    </>
  );
};
