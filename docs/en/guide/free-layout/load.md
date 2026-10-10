# Loading and Saving

Canvas data is stored through [WorkflowDocument](/en/api/core/workflow-document.md)

## Canvas Data

:::note Basic Document Structure:

* nodes `array` List of nodes, supports nesting
* edges `array` List of edges

:::

:::note Basic Node Structure:

* id: `string` Unique node identifier, must be unique
* meta: `object` Node UI configuration information, such as `position` information for free layout
* type: `string | number` Node type, corresponds to `type` in `nodeRegistries`
* data: `object` Node form data, customizable by business
* blocks: `array` Node branches, using `block` is closer to `Gramming`, currently stores nodes of sub-canvas
* edges: `array` Edge data of sub-canvas

:::

:::note Basic Edge Structure:

* sourceNodeID: `string` Starting node id
* targetNodeID: `string` Target node id
* sourcePortID?: `string | number` Starting port id, defaults to the default port of the starting node if omitted
* targetPortID?: `string | number` Target port id, defaults to the default port of the target node if omitted

:::

```tsx pure title="initial-data.ts"
import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: { x: 0, y: 0 },
      },
      data: {
        title: 'Start',
        content: 'Start content'
      },
    },
    {
      id: 'node_0',
      type: 'custom',
      meta: {
        position: { x: 400, y: 0 },
      },
      data: {
        title: 'Custom',
        content: 'Custom node content'
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: { x: 800, y: 0 },
      },
      data: {
        title: 'End',
        content: 'End content'
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'node_0',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: 'end_0',
    },
  ],
};
```

## Loading

* Load through initialData

```tsx pure
import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App({ data }) {
  return (
    <FreeLayoutEditorProvider initialData={data} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

* Dynamic loading through ref

```tsx pure
import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App() {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(async () => {
    const data = await request('https://xxxx/getJSON')
    ref.current.document.fromJSON(data)
    setTimeout(() => {
      // Trigger canvas fitview after loading to center nodes automatically
      ref.current.document.fitView()
    }, 100)
  }, [])
  return (
    <FreeLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

* Dynamic reload of all data (will produce redo/undo/onContentChange)

```tsx pure
import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App({ data }) {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(() => {
   // ctx.operation supports diff reloading of canvas data and can be undone via undo
    ref.current.operation.fromJSON(data)
    setTimeout(() => {
      // Trigger canvas fitview after loading to center nodes automatically
      ref.current.document.fitView()
    }, 10)
  }, [data])
  return (
    <FreeLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

* Batch add nodes and lines

```tsx pure
ctx.document.batchAddFromJSON({
  nodes: [...],
  edges: [...]
}, {
  // Optionally, use this if you want to add to a subcanvas
  parent: loopNode
})
```

## Listen for Changes and Auto-Save

```tsx pure
import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'
import { debounce } from 'lodash-es'

function App() {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(() => {
    // Listen for canvas changes and save data after 1 second delay to avoid frequent updates
    const toDispose = ref.current.document.onContentChange(debounce(() => {
        // Get the latest canvas data through toJSON
        request('https://xxxx/save', {
          data: ref.current.document.toJSON()
        })
    }, 1000))
    return () => toDispose.dispose()
  }, [])
  return (
    <FreeLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```
