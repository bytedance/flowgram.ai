import { PromptCopyButton } from '@flowgram.ai/prompt-previewer';

import { Editor } from './editor';

// 导入MD文件内容
import promptContent from '../prompt.mdc';

import '@flowgram.ai/prompt-previewer/index.css';
import './index.css';

export const EditorContainer = () => (
  <div className="demo-free-container">
    <PromptCopyButton
      promptContent={promptContent}
      buttonText="查看 & 复制 Prompt"
      copiedText="✓ 已复制"
      viewText="复制 Prompt"
      title="Flowchart Editor Prompt"
    />
    <Editor />
  </div>
);
