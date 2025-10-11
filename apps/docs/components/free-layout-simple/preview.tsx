/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

/* eslint-disable import/no-unresolved */

import nodeRegistriesCode from '@flowgram.ai/demo-free-layout-simple/src/node-registries.tsx?raw';
import dataCode from '@flowgram.ai/demo-free-layout-simple/src/initial-data.ts?raw';
import useEditorPropsCode from '@flowgram.ai/demo-free-layout-simple/src/hooks/use-editor-props.tsx?raw';
import editorCode from '@flowgram.ai/demo-free-layout-simple/src/editor.tsx?raw';
import toolsCode from '@flowgram.ai/demo-free-layout-simple/src/components/tools.tsx?raw';
import nodeAddPanelCode from '@flowgram.ai/demo-free-layout-simple/src/components/node-add-panel.tsx?raw';
import minimapCode from '@flowgram.ai/demo-free-layout-simple/src/components/minimap.tsx?raw';

import { PreviewEditor } from '../preview-editor';
import { FreeLayoutSimple } from '.';

export const FreeLayoutSimplePreview = () => {
  const files = {
    'editor.tsx': {
      active: true,
      code: editorCode,
    },
    'use-editor-props.tsx': useEditorPropsCode,
    'initial-data.ts': dataCode,
    'node-registries.ts': nodeRegistriesCode,
    'node-add-panel.tsx': nodeAddPanelCode,
    'tools.tsx': toolsCode,
    'minimap.tsx': minimapCode,
  };
  return (
    <div
      style={{
        zIndex: 1,
        position: 'relative',
      }}
    >
      <PreviewEditor files={files} previewStyle={{ height: 500 }} editorStyle={{ height: 500 }}>
        <FreeLayoutSimple />
      </PreviewEditor>
    </div>
  );
};
