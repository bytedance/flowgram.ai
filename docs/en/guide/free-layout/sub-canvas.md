# Sub-canvas

<img loading="lazy" className="invert-img" src="/free-layout/loop2.png" />

For detailed code, see [Free Layout Best Practices](/en/examples/free-layout/free-feature-overview.md)

## Add Sub-canvas Plugin

```tsx pure

import { createContainerNodePlugin } from '@flowgram.ai/free-container-plugin';

function App() {
  const editorProps = {
    plugins: () => [
      createContainerNodePlugin({}),
    ]
    // ..others
  }
  return (
    <FreeLayoutEditorProvider {...editorProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

## Define Sub-canvas Node

```tsx pure
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';

export const LoopNodeRegistry: FlowNodeRegistry = {
  type: 'loop',
  info: {
    icon: iconLoop,
    description:
      'Used to repeatedly execute a series of tasks by setting the number of iterations and logic.',
  },
  meta: {
    /**
     * Sub-canvas marker
     */
    isContainer: true,
    /**
    * Sub-canvas default size settings
     */
    size: {
      width: 560,
      height: 400,
    },
    /**
    * Sub-canvas padding settings
     */
    padding: () => ({ // Container padding settings
      top: 150,
      bottom: 100,
      left: 100,
      right: 100,
    }),
    /**
      * Control node selection state within sub-canvas
      */
    selectable(node: WorkflowNodeEntity, mousePos?: PositionSchema): boolean {
      if (!mousePos) {
        return true;
      }
      const transform = node.getData<FlowNodeTransformData>(FlowNodeTransformData);
      // Only selectable when mouse start position does not include current node
      return !transform.bounds.contains(mousePos.x, mousePos.y);
    },
  },
  formMeta: {
    render: () => (
      <div>
        { /* others */ }
        <SubCanvasRender />
      </div>
    )
  }
}
```
