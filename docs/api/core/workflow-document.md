# WorkflowDocument (free)

自由布局文档数据，继承自 [FlowDocument](/api/core/flow-document.md)

[> API Detail](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowDocument.html)

```ts pure
import { useClientContext } from '@flowgram.ai/free-layout-editor'

const ctx = useClientContext();
console.log(ctx.document)
```

:::tip
由于历史原因， 带 `Workflow` 前缀的都代表自由布局
:::

## linesManager

自由布局线条管理，见 [WorkflowLinesManager](/api/core/workflow-lines-manager.md)

## createWorkflowNodeByType

根据节点类型创建自由布局节点

```ts pure
const node = ctx.document.createWorkflowNodeByType(
 'custom',
  { x: 100, y: 100 },
  {
    id: 'xxxx',
    data: {}
  }
)
```

## onContentChange

监听自由布局画布数据变化

```ts pure

export enum WorkflowContentChangeType {
  /**
   * 添加节点
   */
  ADD_NODE = 'ADD_NODE',
  /**
   * 删除节点
   */
  DELETE_NODE = 'DELETE_NODE',
  /**
   * 移动节点
   */
  MOVE_NODE = 'MOVE_NODE',
  /**
   * 节点数据更新 （表单引擎数据 或者 extInfo 数据）
   */
  NODE_DATA_CHANGE = 'NODE_DATA_CHANGE',
  /**
   * 添加线条
   */
  ADD_LINE = 'ADD_LINE',
  /**
   * 删除线条
   */
  DELETE_LINE = 'DELETE_LINE',
  /**
   * 节点Meta信息变更
   */
  META_CHANGE = 'META_CHANGE',
}

export interface WorkflowContentChangeEvent {
  type: WorkflowContentChangeType;
  /**
   * 当前触发的元素的json数据，toJSON 需要主动触发
   */
  toJSON: () => any;
  /*
   * 当前的事件的 entity
   */
  entity: WorkflowNodeEntity | WorkflowLineEntity;
}

``
```
