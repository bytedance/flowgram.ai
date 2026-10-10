# Interface: NodesDragStartEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDragStartEvent`**

## Table of contents

### Properties

* [dragEvent](/en/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#dragevent)
* [dragger](/en/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#dragger)
* [nodes](/en/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#nodes)
* [startPositions](/en/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#startpositions)
* [triggerEvent](/en/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#triggerevent)
* [type](/en/auto-docs/free-layout-editor/interfaces/NodesDragStartEvent.md#type)

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

**type**: `"onDragStart"`

#### Overrides

INodesDragEvent.type
