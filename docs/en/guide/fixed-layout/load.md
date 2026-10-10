# Loading and Saving

Canvas data is stored through [FlowDocument](/en/api/core/flow-document.md)

## Canvas Data Format

Canvas document data uses a tree structure that supports nesting

:::note Document Data Basic Structure:

* nodes `array` Node list, supports nesting

:::

:::note Node Data Basic Structure:

* id: `string` Node unique identifier, must be unique
* meta: `object` Node UI configuration information, such as free layout `position` information is stored here
* type: `string | number` Node type, corresponds to the `type` in `nodeRegistries`
* data: `object` Node form data
* blocks: `array` Node branches, using `block` is closer to `Gramming`

:::

```tsx pure title="initial-data.tsx"
import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

/**
 * Configure flow data, data is in blocks nested format
 */
export const initialData: FlowDocumentJSON = {
  nodes: [
    // Start node
    {
      id: 'start_0',
      type: 'start',
      data: {
        title: 'Start',
        content: 'start content'
      },
      blocks: [],
    },
    // Condition node
    {
      id: 'condition_0',
      type: 'condition',
      data: {
        title: 'Condition'
      },
      blocks: [
        {
          id: 'branch_0',
          type: 'block',
          data: {
            title: 'Branch 0',
            content: 'branch 1 content'
          },
          blocks: [
            {
              id: 'custom_0',
              type: 'custom',
              data: {
                title: 'Custom',
                content: 'custrom content'
              },
            },
          ],
        },
        {
          id: 'branch_1',
          type: 'block',
          data: {
            title: 'Branch 1',
            content: 'branch 1 content'
          },
          blocks: [],
        },
      ],
    },
    // End node
    {
      id: 'end_0',
      type: 'end',
      data: {
        title: 'End',
        content: 'end content'
      },
    },
  ],
};
```

## Loading

* Loading through initialData

```tsx pure
import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App({ data }) {
  return (
    <FixedLayoutEditorProvider initialData={data} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```

* Dynamic loading through ref

```tsx pure
import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App() {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(async () => {
    const data = await request('https://xxxx/getJSON')
    ref.current.document.fromJSON(data)
    setTimeout(() => {
      // Trigger canvas fitview after loading to center nodes automatically
      ref.current.playground.config.fitView(ref.current.document.root.bounds.pad(30));
    }, 100)
  }, [])
  return (
    <FixedLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```

* Dynamically reload data

```tsx pure
import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App({ data }) {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(async () => {
    // Reload canvas data when data changes
    await ref.current.document.fromJSON(data)
    setTimeout(() => {
      // Trigger canvas fitview after loading to center nodes automatically
      ref.current.playground.config.fitView(ref.current.document.root.bounds.pad(30));
    }, 100)
  }, [data])
  return (
    <FixedLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```

## Monitor Changes and Auto-save

```tsx pure
import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'
import { debounce } from 'lodash-es'

function App() {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(() => {
    // Monitor canvas changes, delay 1 second to save data, avoid frequent canvas updates
    const toDispose = ref.current.history.onApply(debounce(() => {
        // Get the latest canvas data through toJSON
        request('https://xxxx/save', {
          data: ref.current.document.toJSON()
        })
    }, 1000))
    return () => toDispose.dispose()
  }, [])
  return (
    <FixedLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```
