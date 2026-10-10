# FixedLayoutEditor

Fixed layout canvas, equivalent to the combination of `FixedLayoutEditorProvider` and `EditorRenderer`

```tsx pure
import { FixedLayoutEditor, FixedLayoutPluginContext } from '@flowgram.ai/fixed-layout-editor'

function App() {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(() => {
    console.log(ref.current.document.toJSON())
  }, [])

  return (
    <FixedLayoutEditor className="demo-editor" {...editorProps} ref={ref} />
  )
}
```
