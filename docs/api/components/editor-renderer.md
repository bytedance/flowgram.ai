# EditorRenderer

画布渲染组件，需要 配合 `FixedLayoutEditorProvider` 或 `FreeLayoutEditorProvider` 使用

```tsx pure
function App() {
  return (
    <FixedLayoutEditorProvider {...editorProps}>
      <EditorRenderer className="demo-editor" style={{ /* style */}}>
        {/* 如果提供 children，该内容会放到 画布 div 下边 */}
      </EditorRenderer>
    </FixedLayoutEditorProvider>
  )
}
```
