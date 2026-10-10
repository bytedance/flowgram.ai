# ECS

## Why ECS?

:::warning ECS (Entity-Component-System)
ECS is suitable for decoupling large data objects, commonly used in games where each character (Entity) has extensive data that needs to be split into physics engine-related data, skin-related data, character attributes, etc. (multiple Components) for consumption by different subsystems (Systems). When workflow data structures are complex, ECS is very suitable for decomposition.
:::

<img loading="lazy" className="invert-img" src="/ecs.png" />

## Solution Comparison

Let's compare two data solutions:

### 1. ReduxStore Solution

```jsx pure
const store = () => ({
  nodes: [{
    position: any
    form: any
    data3: any

  }],
  edges: []
})

function Playground() {
  const { nodes } = useStore(store)

  return nodes.map(node => <Node data={node} />)
}
```

Advantages:

* Simple to use with centralized data management

Disadvantages:

* Centralized data management cannot update precisely, leading to performance bottlenecks
* Poor extensibility, adding new node data couples everything into one large JSON

### 2. ECS Solution

Notes:

* NodeData corresponds to ECS - Component
* Layer corresponds to ECS - System

```jsx pure
/**
 * Canvas document data
 */
class FlowDocument {
  /**
   * Node data definitions, node data will be instantiated when created
   */
  nodeDefines: [
    NodePositionData,
    NodeFormData,
    NodeLineData
  ]
  nodeEntities: Entity[] = []
}

/**
 * Node
 */
class FlowNodeEntity {
  id: string // Only has id, no data
  getData: (dataId: string) => EntityData
}

// Render lines
class LinesLayer {
  /**
   * Internally gets corresponding data via node.getData(NodeLineData), same below
   */
  @observeEntityData(FlowNodeEntity, NodeLineData) lines: NodeLineData[]
  render() {
    // Render lines
    return this.lines.map(line => <Line data={line} />)
  }
}

// Render node positions
class NodePositionsLayer {
  @observeEntityData(FlowNodeEntity, NodePositionData) positions: NodePositionData[]
  render() {
    // Render positions and layout
  }
}

// Render node forms
class NodeFormsLayer {
  @observeEntityData(FlowNodeEntity, NodeFormData) contents: NodeFormData[]
  render() {
    // Render node content
  }
}

/**
 * Canvas instance, renders in layers via Layer
 */
class Playground {
  layers: [
    LinesLayer, // Line rendering
    NodePositionsLayer, // Position rendering
    NodeFormsLayer // Content rendering
  ],
  render() {
    // Canvas layer rendering
    return this.layers.map(layer => layer.render())
  }
}
```

Advantages:

* Node data is split for individual rendering control, enabling precise performance updates
* Strong extensibility - adding new node data just requires adding a new XXXData + XXXLayer

Disadvantages:

* Has a certain learning curve
