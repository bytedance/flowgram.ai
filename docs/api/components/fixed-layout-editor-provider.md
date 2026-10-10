# FixedLayoutEditorProvider

固定布局画布配置器，支持 ref

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
