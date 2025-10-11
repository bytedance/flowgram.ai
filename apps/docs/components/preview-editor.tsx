/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import { useMemo } from 'react';

import { useDark } from '@rspress/core/runtime';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFiles,
  // SandpackPreview,
} from '@codesandbox/sandpack-react';

export const PreviewEditor = ({
  files,
  children,
  previewStyle,
  dependencies,
  editorStyle,
  codeInRight,
}: {
  files: SandpackFiles;
  children: JSX.Element;
  previewStyle?: React.CSSProperties;
  dependencies?: Record<string, string>;
  editorStyle?: React.CSSProperties;
  codeInRight?: boolean;
}) => {
  const dark = useDark();
  const theme = useMemo(() => (dark ? 'dark' : 'light'), [dark]);
  const content = codeInRight ? (
    <>
      <SandpackLayout style={{ width: '100%', display: 'flex' }}>
        <div className="light-mode preview-ediitor" style={previewStyle}>
          {children}
        </div>
        <SandpackCodeEditor style={editorStyle} readOnly />
      </SandpackLayout>
    </>
  ) : (
    <>
      <SandpackLayout style={previewStyle}>
        <div className="light-mode preview-ediitor">{children}</div>
        {/* <SandpackPreview /> */}
      </SandpackLayout>
      <SandpackLayout>
        <SandpackCodeEditor style={editorStyle} readOnly />
      </SandpackLayout>
    </>
  );

  return (
    <SandpackProvider
      template="react"
      theme={theme}
      customSetup={{
        dependencies,
      }}
      files={{
        ...files,
        '/App.js': {
          code: '',
          hidden: true,
        },
      }}
      onChange={(v) => {
        console.log('debugger', v);
      }}
    >
      {content}
    </SandpackProvider>
  );
};
