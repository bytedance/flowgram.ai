# Interface: NodesDragStartEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDragStartEvent`**

## Table of contents

### Properties

* [dragEvent](/auto-docs/free-layout-core/interfaces/NodesDragStartEvent.md#dragevent)
* [dragger](/auto-docs/free-layout-core/interfaces/NodesDragStartEvent.md#dragger)
* [nodes](/auto-docs/free-layout-core/interfaces/NodesDragStartEvent.md#nodes)
* [startPositions](/auto-docs/free-layout-core/interfaces/NodesDragStartEvent.md#startpositions)
* [triggerEvent](/auto-docs/free-layout-core/interfaces/NodesDragStartEvent.md#triggerevent)
* [type](/auto-docs/free-layout-core/interfaces/NodesDragStartEvent.md#type)

## Properties

### dragEvent

**dragEvent**: `PlaygroundDragEvent`

#### Inherited from

INodesDragEvent.dragEvent

***

### dragger

**dragger**: `PlaygroundDrag`<`undefined`>

#### Inherited from

INodesDragEvent.dragger

***

### nodes

**nodes**: `FlowNodeEntity`\[]

#### Inherited from

INodesDragEvent.nodes

***

### startPositions

**startPositions**: `PositionSchema`\[]

#### Inherited from

INodesDragEvent.startPositions

***

### triggerEvent

**triggerEvent**: `MouseEvent` | `MouseEvent`<`Element`, `MouseEvent`>

#### Inherited from

INodesDragEvent.triggerEvent

***

### type

**type**: `"onDragStart"`

#### Overrides

INodesDragEvent.type
