# 加载与保存

画布的数据通过 [FlowDocument](/api/core/flow-document.md) 来存储

## 画布数据格式

画布文档数据采用树形结构，支持嵌套

:::note 文档数据基本结构:

* nodes `array` 节点列表, 支持嵌套

:::

:::note 节点数据基本结构:

* id: `string` 节点唯一标识, 必须保证唯一
* meta: `object` 节点的 ui 配置信息，如自由布局的 `position` 信息放这里
* type: `string | number` 节点类型，会和 `nodeRegistries` 中的 `type` 对应
* data: `object` 节点表单数据
* blocks: `array` 节点的分支, 采用 `block` 更贴近 `Gramming`

:::

```tsx pure title="initial-data.tsx"
import { FlowDocumentJSON } from '@flowgram.ai/fixed-layout-editor';

/**
 * 配置流程数据，数据为 blocks 嵌套的格式
 */
export const initialData: FlowDocumentJSON = {
  nodes: [
    // 开始节点
    {
      id: 'start_0',
      type: 'start',
      data: {
        title: 'Start',
        content: 'start content'
      },
      blocks: [],
    },
    // 分支节点
    {
      id: 'condition_0',
      type: 'condition',
      data: {
        title: 'Condition'
      },
      blocks: [
        {
          id: 'branch_0',
          type: 'block',
          data: {
            title: 'Branch 0',
            content: 'branch 1 content'
          },
          blocks: [
            {
              id: 'custom_0',
              type: 'custom',
              data: {
                title: 'Custom',
                content: 'custrom content'
              },
            },
          ],
        },
        {
          id: 'branch_1',
          type: 'block',
          data: {
            title: 'Branch 1',
            content: 'branch 1 content'
          },
          blocks: [],
        },
      ],
    },
    // 结束节点
    {
      id: 'end_0',
      type: 'end',
      data: {
        title: 'End',
        content: 'end content'
      },
    },
  ],
};

```

## 加载

* 通过 initialData 加载

```tsx pure
import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App({ data }) {
  return (
    <FixedLayoutEditorProvider initialData={data} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```

* 通过 ref 动态加载

```tsx pure

import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App() {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(async () => {
    const data = await request('https://xxxx/getJSON')
    ref.current.document.fromJSON(data)
    setTimeout(() => {
      // 加载后触发画布的 fitview 让节点自动居中
      ref.current.playground.config.fitView(ref.current.document.root.bounds.pad(30));
    }, 100)
  }, [])
  return (
    <FixedLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```

* 动态 reload 数据

```tsx pure

import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'

function App({ data }) {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(async () => {
    // 当 data 变化时候重新加载画布数据
    await ref.current.document.fromJSON(data)
    setTimeout(() => {
      // 加载后触发画布的 fitview 让节点自动居中
      ref.current.playground.config.fitView(ref.current.document.root.bounds.pad(30));
    }, 100)
  }, [data])
  return (
    <FixedLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}
```

## 监听变化并自动保存

```tsx pure

import { FixedLayoutEditorProvider, FixedLayoutPluginContext, EditorRenderer } from '@flowgram.ai/fixed-layout-editor'
import { debounce } from 'lodash-es'

function App() {
  const ref = useRef<FixedLayoutPluginContext | undefined>();

  useEffect(() => {
    // 监听画布变化 延迟 1 秒 保存数据, 避免画布频繁更新
    const toDispose = ref.current.history.onApply(debounce(() => {
        // 通过 toJSON 获取画布最新的数据
        request('https://xxxx/save', {
          data: ref.current.document.toJSON()
        })
    }, 1000))
    return () => toDispose.dispose()
  }, [])
  return (
    <FixedLayoutEditorProvider ref={ref} {...otherProps}>
      <EditorRenderer className="demo-editor" />
    </FixedLayoutEditorProvider>
  )
}

```
