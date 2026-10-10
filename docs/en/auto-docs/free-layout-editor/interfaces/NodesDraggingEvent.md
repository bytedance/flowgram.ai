# Interface: NodesDraggingEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDraggingEvent`**

## Table of contents

### Properties

* [dragEvent](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#dragevent)
* [dragger](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#dragger)
* [nodes](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#nodes)
* [positions](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#positions)
* [startPositions](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#startpositions)
* [triggerEvent](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#triggerevent)
* [type](/en/auto-docs/free-layout-editor/interfaces/NodesDraggingEvent.md#type)

## Properties

### dragEvent

**dragEvent**: [`PlaygroundDragEvent`](/en/auto-docs/free-layout-editor/interfaces/PlaygroundDragEvent.md)

#### Inherited from

INodesDragEvent.dragEvent

***

### dragger

**dragger**: [`PlaygroundDrag`](/en/auto-docs/free-layout-editor/classes/PlaygroundDrag-1.md)<`undefined`>

#### Inherited from

INodesDragEvent.dragger

***

### nodes

**nodes**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Inherited from

INodesDragEvent.nodes

***

### positions

**positions**: [`PositionSchema`](/en/auto-docs/free-layout-editor/interfaces/PositionSchema.md)\[]

***

### startPositions

**startPositions**: [`PositionSchema`](/en/auto-docs/free-layout-editor/interfaces/PositionSchema.md)\[]

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
