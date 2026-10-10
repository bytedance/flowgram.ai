# Interface: NodesDragStartEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDragStartEvent`**

## Table of contents

### Properties

* [dragEvent](/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#dragevent)
* [dragger](/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#dragger)
* [nodes](/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#nodes)
* [startPositions](/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#startpositions)
* [triggerEvent](/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#triggerevent)
* [type](/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#type)

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

**type**: `"onDragStart"`

#### Overrides

INodesDragEvent.type
