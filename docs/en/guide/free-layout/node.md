# Nodes

Nodes are defined through [FlowNodeEntity](/en/api/core/flow-node-entity.md)

## Node Core API

* id: `string` Node id
* flowNodeType: `string` | `number` Node type
* bounds: `Rectangle` Get the node's x, y, width, height, equivalent to `transform.bounds`
* blocks: `FlowNodeEntity[]` Get child nodes, including collapsed child nodes
* parent: `FlowNodeEntity | undefined` Get the parent node (Such as loop)
* document: [WorkflowDocument](/en/api/core/workflow-document.md) Document link
* transform: [FlowNodeTransformData](https://flowgram.ai/auto-docs/document/classes/FlowNodeTransformData.html) Get the node's transform data
* renderData: [FlowNodeRenderData](https://flowgram.ai/auto-docs/document/classes/FlowNodeRenderData.html) Get the node's render data, including render status
* form: [NodeFormProps](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html) Get the node's form data, like [getNodeForm](/en/api/utils/get-node-form.md)
* scope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) Get the node's variable public scope
* privateScope: [FlowNodeScope](https://flowgram.ai/auto-docs/editor/interfaces/FlowNodeScope) Get the node's variable private scope
* lines: [WorkflowNodeLinesData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.html) Get the node's lines data
* ports: [WorkflowNodePortsData](https://flowgram.ai/auto-docs/free-layout-core/classes/WorkflowNodePortsData.html) Get the node's ports data
* getNodeRegistry(): [WorkflowNodeRegistry](https://flowgram.ai/auto-docs/free-layout-core/interfaces/WorkflowNodeRegistry) Get the node's registry
* getService(): Get the [IOC](/en/guide/concepts/ioc.md) Service, such as`node.getService(HistoryService)`
* getExtInfo(): Get the node's ext info, such as `node.getExtInfo<{ test: string }>()`
* updateExtInfo(): Update the node's ext info, such as `node.updateExtInfo<{ test: string }>({ test: 'test' })`
* dispose(): Destroy node
* toJSON(): Get the node's json data

## Node Data

Can be obtained through `node.toJSON()`

:::note Basic Structure:

* id: `string` Unique identifier for the node, must be unique
* meta: `object` Node's UI configuration information, such as `position` information for free layout
* type: `string | number` Node type, corresponds to `type` in `nodeRegistries`
* data: `object` Node form data, can be customized by business
* blocks: `array` Node branches, using `block` is more suitable for `Gramming` free layout scenarios, used in sub-nodes of sub-canvas
* edges: `array` Edge data of sub-canvas

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

In free layout scenarios, node definition is used to declare node's initial position/size, ports, form rendering, etc.

```tsx pure title="node-registries.tsx"
import { WorkflowNodeRegistry, ValidateTrigger } from '@flowgram.ai/free-layout-editor';

/**
 * You can customize your own node registry
 */
export const nodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: {
      isStart: true, // Mark as start node
      deleteDisable: true, // Start node cannot be deleted
      copyDisable: true, // Start node cannot be copied
      defaultPorts: [{ type: 'output' }], // Define node input and output ports, start node only has output port
      // useDynamicPort: true, // For dynamic ports, will look for DOM with data-port-id and data-port-type attributes as ports
    },
    /**
     * Configure node form validation and rendering
     * Note: validate uses data and rendering separation to ensure node validation even without rendering
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
  {
    type: 'end',
    meta: {
      deleteDisable: true,
      copyDisable: true,
      defaultPorts: [{ type: 'input' }],
    },
    formMeta: {
      // ...
    }
  },
  {
    type: 'custom',
    meta: {
    },
    formMeta: {
      // ...
    },
    defaultPorts: [{ type: 'output' }, { type: 'input' }], // Normal nodes have two ports
  },
];
```

## Get Current Rendering Node

Get node-related methods through [useNodeRender](/en/api/hooks/use-node-render.md)

```tsx pure
function BaseNode() {
  const { id, type, data, updateData, node } = useNodeRender()
}
```

## Get Input/Output Nodes or Lines for Current Node

```ts pure
// get input nodes (calculated through connection lines)
node.lines.inputNodes
// get all input nodes (recursively gets all upstream nodes)
node.lines.allInputNodes
// get output nodes
node.lines.outputNodes
// get all output nodes
node.lines.allOutputNodes
// input lines (contains the line that isDrawing or isHidden)
node.lines.inputLines
// output lines (contains the line that isDrawing or isHidden)
node.lines.outputLines
// all availableLines (Doesn't contain the lines that isDrawing or isHidden)
node.lines.availableLines
```

## Create Node

* Through [WorkflowDocument](/en/api/core/workflow-document.md)

```ts pure
const ctx = useClientContext()

ctx.document.createWorkflowNode({
  id: 'xxx', // Must be unique within the canvas
  type: 'custom',
  meta: {
    /**
     * If not provided, defaults to creating in the center of the canvas
     * To get position from mouse position (e.g., creating node by clicking anywhere on canvas),
     * convert using `ctx.playground.config.getPosFromMouseEvent(mouseEvent)`
     */
    position: { x: 100, y: 100 } //
  },
  data: {}, // Form-related data
  blocks: [], // Sub-canvas nodes
  edges: [] // Sub-canvas edges
})

```

* Through WorkflowDragService, see [Free Layout Basic Usage](/en/examples/free-layout/free-layout-simple.md)

```ts pure
const dragService = useService<WorkflowDragService>(WorkflowDragService);

// mouseEvent here will automatically convert to canvas position
dragService.startDragCard(nodeType, mouseEvent, {
  id: 'xxxx',
  data: {}, // Form-related data
  blocks: [], // Sub-canvas nodes
  edges: [] // Sub-canvas edges
})

```

## Delete Node

Delete node through `node.dispose`

```tsx pure
function BaseNode({ node }) {
  function onClick() {
    node.dispose()
  }
  return (
    <button onClick={onClick}>Delete</button>
  )
}
```

## Update Node Data

* Get node's data through [useNodeRender](/en/api/hooks/use-node-render.md) or [node.form](https://flowgram.ai/auto-docs/editor/interfaces/NodeFormProps.html)

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

* Update form data through Field, see details in [Form Usage](/en/guide/form/form.md)

```tsx pure

function FormRender() {
  return (
    <Field name="title">
      <Input />
    </Field>
  )
}
```

## Update Node's extInfo Data

extInfo is used to store UI states, if node engine is not enabled, node's data will be stored in extInfo by default

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
