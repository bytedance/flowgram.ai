# WorkflowDocument (free)

Free layout document data, inherited from [FlowDocument](/en/api/core/flow-document.md)

[> API Detail](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowDocument.html)

```ts pure
import { useClientContext } from '@flowgram.ai/free-layout-editor'

const ctx = useClientContext();
console.log(ctx.document)
```

:::tip
Due to historical reasons, all names with the `Workflow` prefix represent free layout
:::

## linesManager

Free layout line management, see [WorkflowLinesManager](/en/api/core/workflow-lines-manager.md)

## createWorkflowNodeByType

Create a free layout node by node type

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

Listen to the free layout canvas data change

```ts pure

export enum WorkflowContentChangeType {
  /**
   * Add node
   */
  ADD_NODE = 'ADD_NODE',
  /**
   * Delete node
   */
  DELETE_NODE = 'DELETE_NODE',
  /**
   * Move node
   */
  MOVE_NODE = 'MOVE_NODE',
  /**
   * Node data update (form engine data or extInfo data)
   */
  NODE_DATA_CHANGE = 'NODE_DATA_CHANGE',
  /**
   * Add line
   */
  ADD_LINE = 'ADD_LINE',
  /**
   * Delete line
   */
  DELETE_LINE = 'DELETE_LINE',
  /**
   * Node meta information change
   */
  META_CHANGE = 'META_CHANGE',
}

export interface WorkflowContentChangeEvent {
  type: WorkflowContentChangeType;
  /**
   * The json data of the currently triggered element, toJSON needs to be triggered actively
   */
  toJSON: () => any;
  /*
   * The entity of the currently triggered event
   */
  entity: WorkflowNodeEntity | WorkflowLineEntity;
}

``
```
