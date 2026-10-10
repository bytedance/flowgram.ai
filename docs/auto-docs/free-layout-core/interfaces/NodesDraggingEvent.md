# Interface: NodesDraggingEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDraggingEvent`**

## Table of contents

### Properties

* [dragEvent](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#dragevent)
* [dragger](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#dragger)
* [nodes](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#nodes)
* [positions](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#positions)
* [startPositions](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#startpositions)
* [triggerEvent](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#triggerevent)
* [type](/auto-docs/free-layout-core/interfaces/NodesDraggingEvent.md#type)

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

### positions

**positions**: `PositionSchema`\[]

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

**type**: `"onDragging"`

#### Overrides

INodesDragEvent.type
