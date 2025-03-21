import { PreviewEditor } from '../preview-editor';
import { FreeLayoutSimple } from '.';

import nodeRegistriesCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/node-registries.ts';
import dataCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/initial-data.ts';
import useEditorPropsCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/hooks/use-editor-props.tsx';
import indexCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/editor.tsx';
import toolsCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/components/tools.tsx';
import nodeAddPanelCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/components/node-add-panel.tsx';
import minimapCode from '!!raw-loader!@flowgram.ai/demo-free-layout-simple/src/components/minimap.tsx';

export const FreeLayoutSimplePreview = () => {
  const files = {
    'index.tsx': indexCode,
    'use-editor-props.tsx': useEditorPropsCode,
    'initial-data.ts': dataCode,
    'node-registries.ts': nodeRegistriesCode,
    'node-add-panel.tsx': nodeAddPanelCode,
    'tools.tsx': toolsCode,
    'minimap.tsx': minimapCode,
  };
  return (
    <PreviewEditor files={files} previewStyle={{ height: 500 }} editorStyle={{ height: 500 }}>
      <FreeLayoutSimple />
    </PreviewEditor>
  );
};
