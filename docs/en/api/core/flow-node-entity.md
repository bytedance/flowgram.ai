# FlowNodeEntity/WorkflowNodeEntity

Node entity, `WorkflowNodeEntity` is the alias for the node used for free layout nodes, the node entity uses the [ECS](/en/guide/concepts/ecs.md) architecture, is `Entity`

[> API Detail](https://flowgram.ai/auto-docs/document/classes/FlowNodeEntity-1.html)

## Properties

* id: `string` Node id
* flowNodeType: `string` | `number` Node type
* version `number` Node version, can be used to determine if the node state has been updated

## Accessors

* document: `FlowDocument | WorkflowDocument` Document link
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
* transform: [FlowNodeTransformData](https://flowgram.ai/auto-docs/document/classes/FlowNodeTransformData.html) Get the node's transform matrix data
* renderData: [FlowNodeRenderData](https://flowgram.ai/auto-docs/document/classes/FlowNodeRenderData.html) Get the node's render data, including render status
* form: [NodeFormProps](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) Get the node's form data, like [getNodeForm](/en/api/utils/get-node-form.md)
* scope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) Get the node's variable public scope
* privateScope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) Get the node's variable private scope
* lines: [WorkflowNodeLinesData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.html) Get the node's lines data (Only FreeLayout)
* ports: [WorkflowNodePortsData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodePortsData.html) Get the node's ports data (Only FreeLayout)

## Methods

### getExtInfo

Get the node's extended information, can be updated through `updateExtInfo`

```
node.getExtInfo<{ test: string }>()
```

### updateExtInfo

Update extended data, update will not be recorded in `redo/undo`, if you need to record, please implement the [history](/en/guide/advanced/history.md) service

```
node.updateExtInfo<{ test: string }>({
  test: 'test'
})
```

### getNodeRegistry

Get the node registry, equivalent to `ctx.document.getNodeRegistry(node.flowNodeType)`

```ts pure
const nodeRegistry = node.getNodeRegistry<FlowNodeRegistry>()
```

### getData

Equivalent to getting the Component of Entity in the [ECS](/en/guide/concepts/ecs.md) architecture, currently built-in two core Components

```ts pure
node.getData(FlowNodeTransformData) // transform matrix data, including the node's x, y, width, height, etc.
node.getData(FlowNodeRenderData) // node render data, including render status

```

### addData

Equivalent to adding the Component of Entity in the [ECS](/en/guide/concepts/ecs.md) architecture

```ts pure

// Custom EntityData
class CustomEntityData extends EntityData<{ key0: string }> {
  static type = 'CustomEntityData';
  getDefaultData() {
    return {
      key0: 'test'
    }
  }
}

// Add Entity Component
node.addData(CustomEntityData)


// Update Entity Component data
node.getData(CustomEntityData).update({ key0: 'new value' })

```

### getService

Node access [IOC](/en/guide/concepts/ioc.md) service

```ts pure
node.getService(SelectionService)
```

### dispose

Node destruction from canvas

### onDispose

Node destruction event

```ts pure
useEffect(() => {
  const toDispose = node.onDispose(() => {
    console.log('Dispose node')
  })
  return () => toDispose.dispose()
}, [node])
```

### toJSON

Export node data

:::note Node data basic structure:

* id: `string` Node unique identifier, must be unique
* meta: `object` Node ui configuration information, such as `position` information for free layout
* type: `string | number` Node type, will correspond to `type` in `nodeRegistries`
* data: `object` Node form data, business can customize
* blocks: `array` Node branches, using `block` is closer to `Gramming`

:::
