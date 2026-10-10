# FreeLayoutEditor

自由布局画布, 等价于 `FreeLayoutEditorProvider` 和 `EditorRenderer` 的组合

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
