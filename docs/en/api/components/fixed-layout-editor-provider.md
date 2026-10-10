# FixedLayoutEditorProvider

Fixed layout canvas configuration, supports ref

```tsx pure
import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App() {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(() => {
    console.log(ref.current.document.toJSON())
  }, [])
  return (
    <FixedLayoutEditorProvider {...editorProps} ref={ref}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}

```
