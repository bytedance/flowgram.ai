# Interface: NodesDragEndEvent

## Hierarchy

* `INodesDragEvent`

  ↳ **`NodesDragEndEvent`**

## Table of contents

### Properties

* [dragEvent](/en/auto-docs/free-layout-core/interfaces/NodesDragEndEvent.md#dragevent)
* [dragger](/en/auto-docs/free-layout-core/interfaces/NodesDragEndEvent.md#dragger)
* [nodes](/en/auto-docs/free-layout-core/interfaces/NodesDragEndEvent.md#nodes)
* [startPositions](/en/auto-docs/free-layout-core/interfaces/NodesDragEndEvent.md#startpositions)
* [triggerEvent](/en/auto-docs/free-layout-core/interfaces/NodesDragEndEvent.md#triggerevent)
* [type](/en/auto-docs/free-layout-core/interfaces/NodesDragEndEvent.md#type)

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

**type**: `"onDragEnd"`

#### Overrides

INodesDragEvent.type
