# Common APIs

## FlowDocument (Automated Layout Document Data)

```ts
// Can be obtained through hook or ctx
const doc = useService<FlowDocument>(FlowDocument)

doc.fromJSON(data) // Load data
doc.getAllNodes() // Get all nodes
doc.traverseDFS(node => {}) // Depth-first traversal of nodes
doc.toJSON() // TODO This is the old version data, not yet optimized. Business logic should implement JSON conversion using traverseDFS

doc.addFromNode(targetNode, json) // Insert after the specified node

doc.onNodeCreate(({ node, json }) => {}) // Listen to node creation, data is the JSON data at creation time
doc.onNodeDispose(({ node }) => {}) // Listen to node deletion
```

## WorkflowDocument (Free Connection Layout Document Data) Inherits from FlowDocument

```ts
const doc = useService<WorkflowDocument>(WorkflowDocument)

doc.fromJSON(data) // Load data
doc.toJSON() // Export data
doc.getAllNodes() // Get all nodes
doc.linesManager.getAllLines() // Get all lines

// Create node
doc.createWorkflowNode({ id: nanoid(), type: 'xxx', data: {}, meta: { position: { x: 0, y: 0 } } })
// Create line, from and to are the node IDs to connect, fromPort and toPort can be omitted for single ports
doc.linesManager.createLine({ from, to, fromPort, toPort })

// Listen to changes, this will monitor events for lines and nodes
doc.onContentChange((e) => {

})
```

## FlowNodeEntity (Node)

```ts
node.flowNodeType // Current node type
node.transform.bounds // Get node's bounding rectangle, includes x,y,width,height
node.updateExtInfo({ title: 'xxx' }) // Set extension data, reactive will refresh node
node.getExtInfo<T>() // Get extension data
node.getNodeRegister() // Get current node definition

node.dispose() // Delete node

// renderData is node UI-related data
const renderData = node.renderData
renderData.node // Current node's DOM node
renderData.expanded // Whether current node is expanded, can be set

// Get all upstream input and output nodes (free connection layout)
node.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData).allInputNodes
node.getData<WorkflowNodeLinesData>(WorkflowNodeLinesData).allOutputNodes
```

## Playground (Canvas)

```ts
// Can be obtained through hook or ctx
const playground = useService(Playground)

// Scroll to specified node and center it
ctx.playground.config.scrollToView({
   entities: [node]
   scrollToCenter: true
   easing: true // Easing animation
})

// Scroll canvas
ctx.playground.config.scroll({
  scrollX: 0
  scrollY: 0
})

// Fit to screen
ctx.playground.config.fitView(
  doc.root.getData<FlowNodeTransformData>().bounds, // Rectangle to center, here using root node size to represent maximum frame
  true, // Whether to use easing
  20, // padding, leave blank spacing
)

// Zoom
ctx.playground.config.zoomin()
ctx.playground.config.zoomout()
ctx.playground.config.finalScale // Current zoom scale
```

## SelectionService (Selector)

```ts
const selectionService = useService<SelectionService>()

selection.selection // Returns currently selected node array, can also be modified, e.g., select node: selection.selection = [node]

selection.onSelectionChanged(() => {}) // Listen to changes
```
