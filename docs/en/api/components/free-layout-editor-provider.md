# FreeLayoutEditorProvider

Free layout canvas configuration, supports ref

```tsx pure
import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App() {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(() => {
    console.log(ref.current.document.toJSON())
  }, [])
  return (
    <FreeLayoutEditorProvider {...editorProps} ref={ref}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}

```
