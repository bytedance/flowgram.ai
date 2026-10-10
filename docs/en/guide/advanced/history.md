# History

Undo/Redo is a plugin of FlowGram.AI, which is provided in both @flowgram.ai/fixed-layout-editor and @flowgram.ai/free-layout-editor.

## 1. Quick Start

[> Demo Detail](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-fixed-layout/src/hooks/use-editor-props.ts#L125)

### 1.1. Enable history

Before using the Undo/Redo feature, you need to introduce the editor, using the fixed layout editor as an example.

1. Add dependencies in package.json

```tsx pure title="use-editor-props.tsx" {4}
export function useEditorProps() {
  return useMemo(
    () => ({
      history: {
        enable: true,
        enableChangeNode: true // Listen Node engine data change
      }
    })
  )
}
```

After enabling, you will get the following capabilities:

<table className="rs-table">
  <tr>
    <td>Introduction</td>
    <td>Description</td>
    <td>Free Layout</td>
    <td>Fixed Layout</td>
  </tr>

  <tr>
    <td rowSpan={2}>Undo/Redo Shortcut</td>
    <td>Use Cmd/Ctrl + Z to trigger Undo</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Use Cmd/Ctrl + Shift + Z to trigger Redo</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td rowSpan={7}>Canvas node operation supports undo/redo</td>
    <td>Add/Delete node</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Add/Delete line</td>
    <td>✅</td>
    <td>❌</td>
  </tr>

  <tr>
    <td>Move node</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Add/Delete branch</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Move branch</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Add group</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Cancel group</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td rowSpan={2}>Canvas batch operation</td>
    <td>Delete node</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>Move node</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
</table>

### 1.2. Disable history

If some data changes triggered by the system do not want to be monitored by undo/redo, you can actively stop the history service and restart it after the data operation is completed

```tsx pure
const { history } = useClientContext();

history.stop()
// Do some operations that do not want to be captured, these changes will not be recorded in the operation stack
...
history.start()
```

### 1.3. History Undo/Redo merge

```tsx pure

const { history } = useClientContext();

history.startTransaction();

// Any operations here will be merged into one
...

history.endTransaction();

```

### 1.4. Undo/Redo Call

Undo/Redo is generally provided with two button entries on the interface, clicking which can trigger Undo and Redo, and the buttons themselves need to have the status of whether Undo/Redo is possible.

```tsx pure
export function useUndoRedo(): UndoRedo {
  const { history } = useClientContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const toDispose = history.undoRedoService.onChange(() => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });
    return () => {
      toDispose.dispose();
    };
  }, []);

  return {
    canUndo,
    canRedo,
    undo: () => history.undo(),
    redo: () => history.redo(),
  };
}
```

## 2. Extension Function

### 2.1. Operation Registration

Operations are registered through operationMetas

```tsx pure title="use-editor-props.tsx"
...
history={{
  enable: true,
  operationMetas: [
    {
        type: 'addNode',
        apply: () => { console.log('addNode')},
        inverse: (op) => ({ type: 'deleteNode', value: op.value })
    }
  ]
}}
```

`OperationMeta` Core Definition:

* `type` is the unique identifier of the operation
* `inverse` is a function, which returns the inverse operation of the current operation
* `apply` is the logic executed when the operation is triggered

```tsx pure
export interface OperationMeta {
  /**
   * Operation type, needs to be unique
   */
  type: string;
  /**
   * Convert an operation to another inverse operation, such as insert to delete
   * @param op Operation
   * @returns Inverse operation
   */
  inverse: (op: Operation) => Operation;
  /**
   * Execute operation
   * @param operation Operation
   */
  apply(operation: Operation, source: any): void | Promise<void>;
}
```

Suppose I want to add a function to support Undo/Redo for adding and deleting nodes, I need to add two operations

<div style={{marginTop: 16, display: 'flex', gap: 8 }}>
  <div>
    <div>
      ```tsx pure
      {
        type: 'addNode',
        inverse: op => ({ ...op, type: 'deleteNode' }),
        apply(op, ctx) {
          document = ctx.get(Document)
          document.addNode(op.value)
        },
      }
      ```
    </div>
  </div>

  <div>
    <div>
      ```tsx pure
      {
        type: 'deleteNode',
        inverse: op => ({ ...op, type: 'addNode' }),
        apply(op, ctx) {
          document = ctx.get(Document)
          document.deleteNode(op.value.id)
        },
      }
      ```
    </div>
  </div>
</div>

### 2.2. Operation Merge

operationMeta supports shouldMerge to customize the merge strategy, if frequent operations can be merged

:::warning shouldMerge returns

* Return false means not merged
* Return true means merged into one operation stack element
* Return Operation means merged into one operation

:::

The following example is a merge of operations that edit the same field within 500ms

```tsx pure
{
  type: 'changeData',
  inverse: op => ({ ...op, type: 'changeData' }),
  apply(op, ctx) {},
  shouldMerge: (op, prev, element) => {
    // Merge operations within 500ms
    if (Date.now() - element.getTimestamp() < 500) {
      if (
        op.type === prev.type && // Same type
        op.value.id === prev.value.id && // Same node
        op.value?.path === prev.value?.path // Same path
      ) {
        return {
          type: op.type,
          value: {
            ...op.value,
            value: op.value.value,
            oldValue: prev.value.oldValue,
          },
        };
      }
    }
    return false;
  }
}
```

### 2.3. Operation Execution

1. Single operation execution

Trigger through pushOperation, the following example uses the operation defined in the business

```tsx pure
function handleAddNode () {
   const { history } = useClientContext()
   history.pushOperation({
       type: 'addNode',
       value: {
          name: 'xx'
          id: 'xxx'
       }
   })
}
```

2. Batch execution
   All operations executed in the function called by transact will be merged into one stack element, and will be executed together when undo/redo
   The following is an example of implementing a batch delete:

```tsx pure
function deleteNodes(nodes: FlowNodeEntity[]) {
  const { history } = useClientContext()
  history.transact(() => {
    nodes.forEach(node => {
      history.pushOperation({
        type: OperationType.deleteNode,
        value: {
          fromId: fromNode.id,
          data: node.data,
        },
      });
    });
  });
}
```

### 2.4. Undo/Redo

1. Undo/Redo
   Undo execution history.undo method
   Redo execution history.redo method

```tsx pure
function undo() {
    const { history } = useClientContext();
    history.undo();
}

function redo() {
    const { history } = useClientContext();
    history.redo();
}
```

2. Listen Undo/Redo
   Listen to the onChange event of undoRedoService.onChange
   The following is an example of triggering the uri of the corresponding operation after undo/redo (selecting the corresponding node or form item)

```tsx pure
function listenHistoryChange() {
  const { history } = useClientContext();
  history.undoRedoService.onChange(
    ({ type, element }) => {
      if (type === UndoRedoChangeType.PUSH) {
        return;
      }
      const op = element.getLastOperation();
      if (!op) {
        return;
      }
      if (op.uri) {
        // goto somewhere
      }
    },
  )
}
```

### 2.5. Operation History

1. View refresh
   You can get the history record through HistoryStack.items, and refresh the interface by listening to HistoryStack.onChange

```tsx pure
import React from 'react';

export function HistoryList() {
  const { historyStack } = useService<HistoryManager>(HistoryManager)
  const { refresh } = useRefresh()
  let items = historyManager.historyStack.items;

  useEffect(() => {
      const disposable = historyStack.onChange(() => {
          refresh()
      ])

      return () => {
          disposable.dispose()
      }
  }, [])

  return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div>
              {item.type}({item.id}):
              {item.operations.map((o, index) => (
                <Tooltip
                  key={index}
                  title={(o.description || '') + `----uri: ${o.uri?.displayName}`}
                >
                  {o.label || o.type}
                </Tooltip>
              ))}
            </div>

          </li>
        ))}
      </ul>
  );
}
```

2. Persistence
   Persistence is implemented through the history-storage plugin

* databaseName: database name
* resourceStorageLimit: resource storage limit number

After introducing the @flowgram.ai/history-storage package, the plugin can be used

```tsx pure
import { createHistoryStoragePlugin } from '@flowgram.ai/history-storage';

createHistoryStoragePlugin({
    databaseName: 'your-history',
    resourceStorageLimit: 50,
}),
```

Query the database list through useStorageHistoryItems

```tsx pure
import {
  useStorageHistoryItems,
} from '@flowgram.ai/history-storage';

export const HistoryList = () => {
  const { uri } = useCurrentWidget();

  const { items } = useStorageHistoryItems(
    storage,
    uri.withoutQuery().toString(),
  );

  return <>
    { JSON.stringify(items) }
  </>
}
```

## 3. API List

### 3.1. [OperationMeta](https://flowgram.ai/auto-docs/fixed-history-plugin/interfaces/OperationMeta.html)

OperationMeta, used to define an operation

### 3.2. [Operation](https://flowgram.ai/auto-docs/fixed-history-plugin/interfaces/Operation.html)

Operation data, associated with OperationMeta through type

### 3.3. [OperationService](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/OperationService.html)

[onApply](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/OperationService.html#onapply)
Use onApply to listen to a triggered operation

```tsx pure
useService(OperationService).onApply((op: Operation) => {
    console.log(op)
    // Here you can execute your own business logic according to type
})
```

### 3.4. [HistoryService](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/HistoryService.html)

The core API of the History module exposed Service

### 3.5. [UndoRedoService](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/UndoRedoService.html)

The service that manages the UndoRedo stack

### 3.6. [HistoryStack](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/HistoryStack.html)

History stack, listen to all push undo redo operations, and record them in the stack

### 3.7. [HistoryDatabase](https://flowgram.ai/auto-docs/history-storage/classes/HistoryDatabase.html)

Persistence database operations
