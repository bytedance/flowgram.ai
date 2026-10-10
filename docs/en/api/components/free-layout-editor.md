# FreeLayoutEditor

Free layout canvas, equivalent to the combination of `FreeLayoutEditorProvider` and `EditorRenderer`

```tsx pure
import { FreeLayoutEditor, FreeLayoutPluginContext } from '@flowgram.ai/free-layout-editor'

function App() {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(() => {
    console.log(ref.current.document.toJSON())
  }, [])
  return (
    <FreeLayoutEditor className="demo-editor" {...editorProps} ref={ref} />
  )
}
```
