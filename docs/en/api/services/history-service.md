## HistoryService

[> API Detail](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/HistoryService.html)

## Redo/Undo

```tsx pure
import { useEffect, useState } from 'react'
import { useClientContext } from '@flowgram.ai/fixed-layout-editor';

export function Tools() {
  const { history } = useClientContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const disposable = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => disposable.dispose();
  }, [history]);

  return <div>
    <button onClick={() => history.undo()} disabled={!canUndo}>Undo</button>
    <button onClick={() => history.redo()} disabled={!canRedo}>Redo</button>
  </div>
}
```

## Render History

```tsx pure
import { useEffect } from 'react'
import { useRefresh, useClientContext } from '@flowgram.ai/fixed-layout-editor'

function HistoryListRender() {
  const refresh = useRefresh()
  const ctx = useClientContext()
  useEffect(() => {
    ctx.history.onApply(() => refresh())
  }, [ctx])
  return (
    <div>
      {ctx.history.historyManager.historyStack.items.map((record) => <HistoryOperations key={record.id} operations={record.operations} />)}
    </div>
  )
}
```
