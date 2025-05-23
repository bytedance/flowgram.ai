import { FixedLayoutSimple } from './fixed-layout-simple.tsx';
import { PreviewEditor } from '../preview-editor.tsx';

import tryCatch from '!!raw-loader!@flowgram.ai/demo-fixed-layout-simple/src/data/tryCatch.ts';
import multiOutputs from '!!raw-loader!@flowgram.ai/demo-fixed-layout-simple/src/data/multiOutputs.ts';
import multiInputs from '!!raw-loader!@flowgram.ai/demo-fixed-layout-simple/src/data/multiInputs.ts';
import loop from '!!raw-loader!@flowgram.ai/demo-fixed-layout-simple/src/data/loop.ts';
import dynamicSplit from '!!raw-loader!@flowgram.ai/demo-fixed-layout-simple/src/data/dynamicSplit.ts';

export function CompositeNodesPreview(props: { cellHeight?: number }) {
  const previewWidth = '50%';
  const editorWidth = '50%';
  const cellHeight = props.cellHeight || 300;
  return (
    <table className="" style={{ width: '100%', border: '1px solid var(--rp-c-divider-light)' }}>
      <tr>
        <td style={{ textAlign: 'center' }}>dynamicSplit</td>
        <td>
          <PreviewEditor
            codeInRight
            files={{
              'index.tsx': {
                code: dynamicSplit,
                active: true,
              },
            }}
            previewStyle={{
              width: previewWidth,
              height: cellHeight,
              position: 'relative',
            }}
            editorStyle={{
              width: editorWidth,
              height: cellHeight,
            }}
          >
            <FixedLayoutSimple hideTools demo="dynamicSplit" />
          </PreviewEditor>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: 'center' }}>loop</td>
        <td>
          <PreviewEditor
            codeInRight
            files={{
              'index.tsx': {
                code: loop,
                active: true,
              },
            }}
            previewStyle={{
              width: previewWidth,
              height: cellHeight,
              position: 'relative',
            }}
            editorStyle={{
              height: cellHeight,
              width: editorWidth,
            }}
          >
            <FixedLayoutSimple hideTools demo="loop" />
          </PreviewEditor>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: 'center' }}>tryCatch</td>
        <td>
          <PreviewEditor
            codeInRight
            files={{
              'index.tsx': {
                code: tryCatch,
                active: true,
              },
            }}
            previewStyle={{
              width: previewWidth,
              height: cellHeight,
              position: 'relative',
            }}
            editorStyle={{
              height: cellHeight,
              width: editorWidth,
            }}
          >
            <FixedLayoutSimple hideTools demo="tryCatch" />
          </PreviewEditor>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: 'center' }}>multiInputs</td>
        <td>
          <PreviewEditor
            codeInRight
            files={{
              'index.tsx': {
                code: multiInputs,
                active: true,
              },
            }}
            previewStyle={{
              width: previewWidth,
              height: cellHeight,
              position: 'relative',
            }}
            editorStyle={{
              height: cellHeight,
              width: editorWidth,
            }}
          >
            <FixedLayoutSimple hideTools demo="multiInputs" />
          </PreviewEditor>
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: 'center' }}>multiOutputs</td>
        <td>
          <PreviewEditor
            codeInRight
            files={{
              'index.tsx': {
                code: multiOutputs,
                active: true,
              },
            }}
            previewStyle={{
              width: previewWidth,
              height: cellHeight,
              position: 'relative',
            }}
            editorStyle={{
              height: cellHeight,
              width: editorWidth,
            }}
          >
            <FixedLayoutSimple hideTools demo="multiOutputs" />
          </PreviewEditor>
        </td>
      </tr>
    </table>
  );
}
