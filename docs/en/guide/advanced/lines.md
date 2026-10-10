# Free Layout Lines

The lines in the free layout are managed by [WorkflowLinesManager](/en/api/core/workflow-lines-manager.md).

## Get the Input/Output Nodes of the Current Node

```ts pure
// Get the input nodes of the current node (calculated through connection lines)
node.lines.inputNodes;
// Get all input nodes (recursively get all upward)
node.lines.allInputNodes;
// Get the output nodes
node.lines.outputNodes;
// Get all output nodes
node.lines.allOutputNodes;
```

## Node listens to its own connection changes and refreshes

```tsx pure

import {
  useRefresh,
  WorkflowNodeLinesData,
} from '@flowgram.ai/free-layout-editor';

function NodeRender({ node }) {
  const refresh = useRefresh()
  const linesData = node.get(WorkflowNodeLinesData)
  useEffect(() => {
    const dispose = linesData.onDataChange(() => refresh())
    return () => dispose.dispose()
  }, [])
  return <div>xxxx</div>
}

```

## Listen for connection changes of all lines

```ts pure
import { useEffect } from 'react'
import { useClientContext, useRefresh } from '@flowgram.ai/free-layout-editor'


function SomeReact() {
  const refresh = useRefresh()
  const linesManager = useClientContext().document.linesManager
  useEffect(() => {
      const dispose = linesManager.onAvailableLinesChange(() => refresh())
      return () => dispose.dispose()
  }, [])
  console.log(ctx.document.linesManager.getAllLines())
}
```
