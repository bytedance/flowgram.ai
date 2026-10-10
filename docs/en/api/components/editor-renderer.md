# EditorRenderer

Canvas rendering component, needs to be used with `FixedLayoutEditorProvider` or `FreeLayoutEditorProvider`

```tsx pure
function App() {
  return (
    <FixedLayoutEditorProvider {...editorProps}>
      <EditorRenderer className="demo-editor" style={{ /* style */}}>
        {/* If you provide children, this content will be placed below the canvas div */}
      </EditorRenderer>
    </FixedLayoutEditorProvider>
  )
}
```
