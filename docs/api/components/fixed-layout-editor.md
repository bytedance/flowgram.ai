# FixedLayoutEditor

固定布局画布, 等价于 `FixedLayoutEditorProvider` 和 `EditorRenderer` 的组合

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
