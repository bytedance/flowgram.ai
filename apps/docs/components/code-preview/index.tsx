/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { FC } from 'react';

import { useDark } from '@rspress/core/runtime';
import { Sandpack } from '@codesandbox/sandpack-react';

interface CodePreviewProps {
  files: Record<string, string>;
  activeFile?: string;
}

export const CodePreview: FC<CodePreviewProps> = ({ files, activeFile }) => {
  const dark = useDark();
  return (
    <Sandpack
      files={files}
      theme={dark ? 'dark' : 'light'}
      template="react-ts"
      customSetup={{
        dependencies: {
          '@flowgram.ai/free-layout-editor': '0.5.5',
          '@flowgram.ai/free-snap-plugin': '0.5.5',
          '@flowgram.ai/minimap-plugin': '0.5.5',
          'styled-components': '5.3.11',
        },
      }}
      options={{
        editorHeight: 350,
        activeFile,
      }}
    />
  );
};

export const FixedLayoutCodePreview: FC<CodePreviewProps> = ({ files, activeFile }) => {
  const dark = useDark();
  return (
    <Sandpack
      files={files}
      theme={dark ? 'dark' : 'light'}
      template="react-ts"
      customSetup={{
        dependencies: {
          '@flowgram.ai/fixed-layout-editor': '0.1.0-alpha.19',
          // 为了解决semi无法在sandpack使用的问题，单独发了包，将semi打包进@flowgram.ai/fixed-semi-materials中
          '@flowgram.ai/fixed-semi-materials': '0.1.0-alpha.19',
          '@flowgram.ai/minimap-plugin': '0.1.0-alpha.19',
          'styled-components': '5.3.11',
        },
      }}
      options={{
        editorHeight: 350,
        activeFile,
      }}
    />
  );
};
