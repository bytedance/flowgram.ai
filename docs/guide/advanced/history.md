# 历史记录

Undo/Redo 是 FlowGram.AI 的一个插件，在 @flowgram.ai/fixed-layout-editor 和 @flowgram.ai/free-layout-editor 两种模式的编辑器中均有提供该功能。

## 1. 快速开始

[> Demo Detail](https://github.com/bytedance/flowgram.ai/blob/main/apps/demo-fixed-layout/src/hooks/use-editor-props.ts#L125)

### 1.1. 开启 history

使用 Undo/Redo 功能前需要先引入编辑器，以固定布局编辑器为例。

1. package.json 添加依赖

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

开启之后将获得以下能力：

<table className="rs-table">
  <tr>
    <td>简介</td>
    <td>描述</td>
    <td>自由布局</td>
    <td>固定布局</td>
  </tr>

  <tr>
    <td rowSpan={2}>Undo/Redo 快捷键</td>
    <td>画布上使用 Cmd/Ctrl + Z 触发 Undo</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>画布上使用 Cmd/Ctrl + Shift + Z 触发 Redo</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td rowSpan={7}>画布节点操作支持undo/redo</td>
    <td>增删节点 </td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>增删连线</td>
    <td>✅</td>
    <td>❌</td>
  </tr>

  <tr>
    <td>移动节点</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>增删分支</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>移动分支</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>添加分组</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>取消分组</td>
    <td>❌</td>
    <td>✅</td>
  </tr>

  <tr>
    <td rowSpan={2}>画布批量操作</td>
    <td>删除节点</td>
    <td>✅</td>
    <td>✅</td>
  </tr>

  <tr>
    <td>移动节点</td>
    <td>✅</td>
    <td>✅</td>
  </tr>
</table>

### 1.2. 关闭 history

如果某些系统触发的数据变更不希望被undo redo监听到，可以主动关掉 历史服务 操作完数据再重新启动

```tsx pure
const { history } = useClientContext();

history.stop()
// 做一些不希望被捕获的操作， 这些变更不会被记录到操作栈
...
history.start()
```

### 1.3. History Undo/Redo 合并

```tsx pure

const { history } = useClientContext();

history.startTransaction();

// 这里的 任意操作都会被合并成一个
...

history.endTransaction();

```

### 1.4. Undo/Redo 调用

一般 Undo/Redo 会在界面上提供两个按钮入口，点击了能触发 Undo 和 Redo，按钮本身需要有是否可以 Undo/Redo 的状态。

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

## 2. 功能扩展

### 2.1. 操作注册

操作通过 operationMetas 去注册操作

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

`OperationMeta` 核心定义如下

* `type` 是操作的唯一标识
* `inverse` 是一个函数，该函数返回当前操作的逆操作
* `apply` 是操作被触发的时候执行的逻辑

```tsx pure
export interface OperationMeta {
  /**
   * 操作类型 需要唯一
   */
  type: string;
  /**
   * 将一个操作转换成另一个逆操作， 如insert转成delete
   * @param op 操作
   * @returns 逆操作
   */
  inverse: (op: Operation) => Operation;
  /**
   * 执行操作
   * @param operation 操作
   */
  apply(operation: Operation, source: any): void | Promise<void>;
}
```

假设我要做增删节点支持 Undo/Redo 的功能，我就需要添加两个操作

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

### 2.2. 操作合并

operationMeta 支持 shouldMerge 来自定义合并策略，如果频繁触发的操作可以进行合并

:::warning shouldMerge 返回

* 返回 false 代表不合并
* 返回 true 代表合并进一个操作栈元素
* 返回 Operation 代表合并成一个操作

:::

以下示例是一个合并 500ms 内对同一个字段编辑进行合并

```tsx pure
{
  type: 'changeData',
  inverse: op => ({ ...op, type: 'changeData' }),
  apply(op, ctx) {},
  shouldMerge: (op, prev, element) => {
    // 合并500ms内的操作
    if (Date.now() - element.getTimestamp() < 500) {
      if (
        op.type === prev.type && // 相同类型
        op.value.id === prev.value.id && // 相同节点
        op.value?.path === prev.value?.path // 相同路径
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

### 2.3. 操作执行

1. 单操作执行

通过 pushOperation 触发, 如下示例使用方在业务中触发刚刚定义的操作

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

2. 批量执行
   通过 transact 调用的函数中所有执行的操作都会被合并进一个栈元素， undo/redo 的时候会被一起执行
   如下是实现了一个批量删除的例子：

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

### 2.4. 撤销重做

1. 撤销重做
   撤销执行 history.undo 方法
   重做执行 history.redo 方法

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

2. 监听撤销重做
   监听 undoRedoService.onChange 的 onChange 事件即可
   如下是一个 undo/redo 触发后路由对应操作的uri（选中对应节点或表单项）

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

### 2.5. 操作历史

1. 查看刷新
   可以通过 HistoryStack.items 获得历史记录， 通过监听 HistoryStack.onChange 事件来刷新界面

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

2. 持久化
   持久化是通过 history-storage 插件实现

* databaseName： 数据库名称
* resourceStorageLimit： 资源存储限制数量

引入 @flowgram.ai/history-storage 包后，可使用该插件

```tsx pure
import { createHistoryStoragePlugin } from '@flowgram.ai/history-storage';

createHistoryStoragePlugin({
    databaseName: 'your-history',
    resourceStorageLimit: 50,
}),
```

通过 useStorageHistoryItems 查询数据库列表

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

## 3. API 列表

### 3.1. [OperationMeta](https://flowgram.ai/auto-docs/fixed-history-plugin/interfaces/OperationMeta.html)

操作元数据，用以定义一个操作

### 3.2. [Operation](https://flowgram.ai/auto-docs/fixed-history-plugin/interfaces/Operation.html)

操作数据，通过 type 和 OperationMeta 关联

### 3.3. [OperationService](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/OperationService.html)

[onApply](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/OperationService.html#onapply)
想监听某个触发的操作可以使用onApply

```tsx pure
useService(OperationService).onApply((op: Operation) => {
    console.log(op)
    // 此处可以根据type执行自己的业务逻辑
})
```

### 3.4. [HistoryService](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/HistoryService.html)

History 模块核心 API 暴露的Service

### 3.5. [UndoRedoService](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/UndoRedoService.html)

管理 UndoRedo 栈的服务

### 3.6. [HistoryStack](https://flowgram.ai/auto-docs/fixed-history-plugin/classes/HistoryStack.html)

历史栈，监听所有 push undo redo 操作，并记录到栈里面

### 3.7. [HistoryDatabase](https://flowgram.ai/auto-docs/history-storage/classes/HistoryDatabase.html)

持久化数据库操作
