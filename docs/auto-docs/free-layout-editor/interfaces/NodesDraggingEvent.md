# Interface: NodesDraggingEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDraggingEvent`**

## Table of contents

### Properties

* [dragEvent](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#dragevent)
* [dragger](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#dragger)
* [nodes](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#nodes)
* [positions](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#positions)
* [startPositions](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#startpositions)
* [triggerEvent](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#triggerevent)
* [type](/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#type)

## Properties

### dragEvent

**dragEvent**: [`PlaygroundDragEvent`](/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md)

#### Inherited from

INodesDragEvent.dragEvent

***

### dragger

**dragger**: [`PlaygroundDrag`](/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md)<`undefined`>

#### Inherited from

INodesDragEvent.dragger

***

### nodes

**nodes**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Inherited from

INodesDragEvent.nodes

***

### positions

**positions**: [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)\[]

***

### startPositions

**startPositions**: [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)\[]

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
