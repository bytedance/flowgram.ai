# 加载与保存

画布的数据通过 [WorkflowDocument](/api/core/workflow-document.md) 来存储

## 画布数据

:::note 文档数据基本结构:

* nodes `array` 节点列表, 支持嵌套
* edges `array` 边列表

:::

:::note 节点数据基本结构:

* id: `string` 节点唯一标识, 必须保证唯一
* meta: `object` 节点的 ui 配置信息，如自由布局的 `position` 信息放这里
* type: `string | number` 节点类型，会和 `nodeRegistries` 中的 `type` 对应
* data: `object` 节点表单数据, 业务可自定义
* blocks: `array` 节点的分支, 采用 `block` 更贴近 `Gramming`, 目前会存子画布的节点
* edges: `array` 子画布的边数据

:::

:::note 边数据基本结构:

* sourceNodeID: `string` 开始节点 id
* targetNodeID: `string` 目标节点 id
* sourcePortID?: `string | number` 开始端口 id, 缺省则采用开始节点的默认端口
* targetPortID?: `string | number` 目标端口 id, 缺省则采用目标节点的默认端口

:::

```tsx pure title="initial-data.ts"
import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const initialData: WorkflowJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: { x: 0, y: 0 },
      },
      data: {
        title: 'Start',
        content: 'Start content'
      },
    },
    {
      id: 'node_0',
      type: 'custom',
      meta: {
        position: { x: 400, y: 0 },
      },
      data: {
        title: 'Custom',
        content: 'Custom node content'
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: { x: 800, y: 0 },
      },
      data: {
        title: 'End',
        content: 'End content'
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'node_0',
    },
    {
      sourceNodeID: 'node_0',
      targetNodeID: 'end_0',
    },
  ],
};

```

## 加载

* 通过 initialData 加载

```tsx pure
import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App({ data }) {
  return (
    <FreeLayoutEditorProvider initialData={data} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

* 通过 ref 动态加载

```tsx pure

import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App() {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(async () => {
    const data = await request('https://xxxx/getJSON')
    ref.current.document.fromJSON(data)
    setTimeout(() => {
      // 加载后触发画布的 fitview 让节点自动居中
      ref.current.document.fitView()
    }, 100)
  }, [])
  return (
    <FreeLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

* 动态重载画布所有数据 (会产生 redo/undo/onContentChange )

```tsx pure

import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'

function App({ data }) {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(() => {
    // ctx.operation 支持 diff 重新加载画布数据并可通过 undo 撤销
    ref.current.operation.fromJSON(data)
    setTimeout(() => {
      // 加载后触发画布的 fitview 让节点自动居中
      ref.current.document.fitView()
    }, 10)
  }, [data])
  return (
    <FreeLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}
```

* 批量添加节点和线条

```tsx pure
ctx.document.batchAddFromJSON({
  nodes: [...],
  edges: [...]
}, {
  // 可选，如果要添加到子画布中用这个
  parent: loopNode
})
```

## 监听变化并自动保存

```tsx pure

import { FreeLayoutEditorProvider, FreeLayoutPluginContext, EditorRenderer } from '@flowgram.ai/free-layout-editor'
import { debounce } from 'lodash-es'

function App() {
  const ref = useRef<FreeLayoutPluginContext | undefined>();

  useEffect(() => {
    // 监听画布变化 延迟 1 秒 保存数据, 避免画布频繁更新
    const toDispose = ref.current.document.onContentChange(debounce(() => {
        // 通过 toJSON 获取画布最新的数据
        request('https://xxxx/save', {
          data: ref.current.document.toJSON()
        })
    }, 1000))
    return () => toDispose.dispose()
  }, [])
  return (
    <FreeLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FreeLayoutEditorProvider>
  )
}

```
