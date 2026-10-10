# Class: WorkflowHoverService

hover 状态管理

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#constructor)

### Properties

* [hoveredKey](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#hoveredkey)
* [hoveredPos](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#hoveredpos)
* [onHoveredChange](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#onhoveredchange)
* [onUpdateHoverPosition](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#onupdatehoverposition)

### Accessors

* [hoveredNode](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#hoverednode)
* [someHovered](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#somehovered)

### Methods

* [clearHovered](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#clearhovered)
* [isHovered](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#ishovered)
* [isSomeHovered](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#issomehovered)
* [updateHoverPosition](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#updatehoverposition)
* [updateHoveredKey](/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#updatehoveredkey)

## Constructors

### constructor

**new WorkflowHoverService**()

## Properties

### hoveredKey

**hoveredKey**: `string`

当前 hovered 的 节点或者线条或者点
1: nodeId / lineId  （节点 / 线条）
2: nodeId:portKey  （节点连接点）

***

### hoveredPos

**hoveredPos**: [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

***

### onHoveredChange

`Readonly` **onHoveredChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`string`>

***

### onUpdateHoverPosition

`Readonly` **onUpdateHoverPosition**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`HoverPosition`](/auto-docs/free-layout-editor/interfaces/HoverPosition.md)>

## Accessors

### hoveredNode

`get` **hoveredNode**(): `undefined` | [`WorkflowEntityHoverable`](/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

获取被 hover 的节点或线条

#### Returns

`undefined` | [`WorkflowEntityHoverable`](/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

**`Deprecated`**

use 'someHovered' instead

***

### someHovered

`get` **someHovered**(): `undefined` | [`WorkflowEntityHoverable`](/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

获取被 hover 的节点或线条

#### Returns

`undefined` | [`WorkflowEntityHoverable`](/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

## Methods

### clearHovered

**clearHovered**(): `void`

清空 hover 内容

#### Returns

`void`

***

### isHovered

**isHovered**(`nodeId`): `boolean`

判断是否 hover

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeId` | `string` | hoveredKey |

#### Returns

`boolean`

是否 hover

***

### isSomeHovered

**isSomeHovered**(): `boolean`

#### Returns

`boolean`

***

### updateHoverPosition

**updateHoverPosition**(`position`, `target?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md) |
| `target?` | `HTMLElement` |

#### Returns

`void`

***

### updateHoveredKey

**updateHoveredKey**(`hoveredKey`): `void`

更新 hover 的内容

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hoveredKey` | `string` | hovered key |

#### Returns

`void`
