# usePlaygroundTools

画布工具方法

## 固定布局

* Return: [PlaygroundTools](https://flowgram.ai/auto-docs/fixed-layout-editor/interfaces/PlaygroundTools.html)

```tsx pure
import { useEffect, useState } from 'react'
import { usePlaygroundTools, useClientContext } from '@flowgram.ai/fixed-layout-editor';

export function Tools() {
  const { history } = useClientContext();
  const tools = usePlaygroundTools();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  return <div style={{ position: 'absolute', zIndex: 10, bottom: 16, left: 16, display: 'flex', gap: 8 }}>
    <button onClick={() => tools.zoomin()}>ZoomIn</button>
    <button onClick={() => tools.zoomout()}>ZoomOut</button>
    <button onClick={() => tools.fitView()}>Fitview</button>
    <button onClick={() => tools.changeLayout()}>ChangeLayout</button>
    <button onClick={() => history.undo()} disabled={!canUndo}>Undo</button>
    <button onClick={() => history.redo()} disabled={!canRedo}>Redo</button>
    <span>{Math.floor(tools.zoom * 100)}%</span>
  </div>
}
```

## 自由布局

* Return: [PlaygroundTools](https://flowgram.ai/auto-docs/free-layout-editor/interfaces/PlaygroundTools.html)

```tsx pure
import { usePlaygroundTools, useClientContext } from '@flowgram.ai/free-layout-editor';

export function Tools() {
  const { history } = useClientContext();
  const tools = usePlaygroundTools();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  return <div style={{ position: 'absolute', zIndex: 10, bottom: 16, left: 226, display: 'flex', gap: 8 }}>
    <button onClick={() => tools.zoomin()}>ZoomIn</button>
    <button onClick={() => tools.zoomout()}>ZoomOut</button>
    <button onClick={() => tools.fitView()}>Fitview</button>
    <button onClick={() => tools.autoLayout()}>AutoLayout</button>
    <button onClick={() => history.undo()} disabled={!canUndo}>Undo</button>
    <button onClick={() => history.redo()} disabled={!canRedo}>Redo</button>
    <span>{Math.floor(tools.zoom * 100)}%</span>
  </div>
}
```
