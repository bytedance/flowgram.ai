# Nodes

Nodes are defined through [FlowNodeEntity](/en/api/core/flow-node-entity.md)

## Node Core API

* id: `string` Node id
* flowNodeType: `string` | `number` Node type
* bounds: `Rectangle` Get the node's x, y, width, height, equivalent to `transform.bounds`
* blocks: `FlowNodeEntity[]` Get child nodes, including collapsed child nodes, equivalent to `collapsedChildren`
* collapsedChildren: `FlowNodeEntity[]` Get child nodes, including collapsed child nodes
* allCollapsedChildren: `FlowNodeEntity[]` Get all child nodes, including all collapsed child nodes
* children: `FlowNodeEntity[]` Get child nodes, not including collapsed child nodes
* pre: `FlowNodeEntity | undefined` Get the previous node
* next: `FlowNodeEntity | undefined` Get the next node
* parent: `FlowNodeEntity | undefined` Get the parent node
* originParent: `FlowNodeEntity | undefined` Get the original parent node, this is used to find the entire virtual branch for the first node of the fixed layout branch (orderIcon)
* allChildren: `FlowNodeEntity[]` Get all child nodes, not including collapsed child nodes
* document: [FlowDocument](/en/api/core/flow-document.md) Document link
* transform: [FlowNodeTransformData](https://flowgram.ai/auto-docs/document/classes/FlowNodeTransformData.html) Get the node's transform data
* renderData: [FlowNodeRenderData](https://flowgram.ai/auto-docs/document/classes/FlowNodeRenderData.html) Get the node's render data, including render status
* form: [NodeFormProps](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) Get the node's form data, like [getNodeForm](/en/api/utils/get-node-form.md)
* scope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) Get the node's variable public scope
* privateScope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) Get the node's variable private scope
* getNodeRegistry(): [FlowNodeRegistry](https://flowgram.ai/auto-docs/document/interfaces/FlowNodeRegistry-1) Get the node's registry
* getService(): Get the [IOC](/en/guide/concepts/ioc.md) Service, such as`node.getService(HistoryService)`
* getExtInfo(): Get the node's ext info, such as `node.getExtInfo<{ test: string }>()`
* updateExtInfo(): Update the node's ext info, such as `node.updateExtInfo<{ test: string }>({ test: 'test' })`
* dispose(): Destroy node
* toJSON(): Get the node's json data

## Node Data

Can be obtained through `node.toJSON()`

:::note Basic Structure:

* id: `string` Node unique identifier, must be unique
* meta: `object` Node UI configuration information, such as free layout `position` information is stored here
* type: `string | number` Node type, corresponds to `type` in `nodeRegistries`
* data: `object` Node form data, can be customized by business
* blocks: `array` Node branches, using `block` is closer to `Gramming`

:::

```ts pure
const nodeData: FlowNodeJSON = {
  id: 'xxxx',
  type: 'condition',
  data: {
    title: 'MyCondition',
    desc: 'xxxxx'
  },
}
```

## Node Definition

Node declaration can be used to determine node type and rendering method

```tsx pure
import { FlowNodeRegistry, ValidateTrigger } from '@flowgram.ai/fixed-layout-editor';

/**
 * Custom node registration
 */
export const nodeRegistries: FlowNodeRegistry[] = [
  {
    /**
     * Custom node type
     */
    type: 'condition',
    /**
     * Custom node extension:
     *  - loop: Extend as loop node
     *  - start: Extend as start node
     *  - dynamicSplit: Extend as branch node
     *  - end: Extend as end node
     *  - tryCatch: Extend as tryCatch node
     *  - default: Extend as normal node (default)
     */
    extend: 'dynamicSplit',
    /**
     * Node configuration information
     */
    meta: {
      // isStart: false, // Whether it's a start node
      // isNodeEnd: false, // Whether it's an end node, no nodes can be added after end node
      // draggable: false, // Whether draggable, start and end nodes cannot be dragged
      // selectable: false, // Triggers and start nodes cannot be box-selected
      // deleteDisable: true, // Disable deletion
      // copyDisable: true, // Disable copying
      // addDisable: true, // Disable adding
    },
    /**
     * Configure node form validation and rendering,
     * Note: validate uses data and rendering separation to ensure nodes can validate data even without rendering
     */
    formMeta: {
      validateTrigger: ValidateTrigger.onChange,
      validate: {
        title: ({ value }) => (value ? undefined : 'Title is required'),
      },
      /**
       * Render form
       */
      render: () => (
       <>
          <Field name="title">
            {({ field }) => <div className="demo-free-node-title">{field.value}</div>}
          </Field>
          <Field name="content">
            {({ field }) => <input onChange={field.onChange} value={field.value}/>}
          </Field>
        </>
      )
    },
  },
];
```

## Getting Current Rendered Node

Get node-related methods through [useNodeRender](/en/api/hooks/use-node-render.md)

```tsx pure
function BaseNode() {
  const { id, type, data, updateData, node } = useNodeRender()
}
```

## Creating Nodes

Create through [FlowOperationService](/en/api/services/flow-operation-service.md)

* Add node

```ts pure
const ctx = useClientContext()

ctx.operation.addNode({
  id: 'xxx', // Must be unique within canvas
  type: 'custom',
  meta: {},
  data: {}, // Form-related data
  blocks: [], // Child nodes
  parent: someParent // Parent node, used for branches
})
```

* Add after specified node

```ts pure
const ctx = useClientContext()

ctx.operation.addFromNode(targetNode, {
  id: 'xxx', // Must be unique within canvas
  type: 'custom',
  meta: {},
  data: {}, // Form-related data
  blocks: [], // Child nodes
})
```

* Add branch node (used for conditional branches)

```ts pure
const ctx = useClientContext()

ctx.operation.addBlock(parentNode, {
  id: 'xxx', // Must be unique within canvas
  type: 'block',
  meta: {},
  data: {}, // Form-related data
  blocks: [], // Child nodes
})
```

## Deleting Nodes

```tsx pure
function BaseNode({ node }) {
  const ctx = useClientContext()
  function onClick() {
    ctx.operation.deleteNode(node)
  }
  return (
    <button onClick={onClick}>Delete</button>
  )
}
```

## Updating Node Data

* Get node data through [useNodeRender](/en/api/hooks/use-node-render.md) or [node.form](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html)

```tsx pure
function BaseNode() {
  const { form, node } = useNodeRender();
  // Corresponds to node's data
  // 1. form.values: Corresponds to node's data
  // 2. form.setValueIn('title', 'xxxx'): Update data.title
  // 3. form.getValueIn('title'): Get data.title
  // 4. form.updateFormValues({ ... }) Update all form values

  function onChange(e) {
    form.setValueIn('title', e.target.value)
  }
  return <input value={form.values.title} onChange={onChange}/>
}

```

* Update form data through Field, see [Form Usage](/en/guide/form/form.md) for details

```tsx pure
function FormRender() {
  return (
    <Field name="title">
      <Input />
    </Field>
  )
}
```

## Updating Node ExtInfo Data

ExtInfo is used to store some UI states. If node engine is not enabled, node data will be stored in extInfo by default

```tsx pure
function BaseNode({ node }) {
  const times = node.getExtInfo()?.times || 0
  function onClick() {
    node.updateExtInfo({ times: times ++ })
  }
  return (
    <div>
      <span>Click Times: {times}</span>
      <button onClick={onClick}>Click</button>
    </div>
  )
}
```
