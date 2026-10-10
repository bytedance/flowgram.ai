# Class: WorkflowHoverService

hover 状态管理

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#constructor)

### Properties

* [hoveredKey](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#hoveredkey)
* [hoveredPos](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#hoveredpos)
* [onHoveredChange](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#onhoveredchange)
* [onUpdateHoverPosition](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#onupdatehoverposition)

### Accessors

* [hoveredNode](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#hoverednode)
* [someHovered](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#somehovered)

### Methods

* [clearHovered](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#clearhovered)
* [isHovered](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#ishovered)
* [isSomeHovered](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#issomehovered)
* [updateHoverPosition](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#updatehoverposition)
* [updateHoveredKey](/en/auto-docs/free-layout-editor/classes/WorkflowHoverService.md#updatehoveredkey)

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

**hoveredPos**: [`PositionSchema`](/en/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

***

### onHoveredChange

`Readonly` **onHoveredChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`string`>

***

### onUpdateHoverPosition

`Readonly` **onUpdateHoverPosition**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`HoverPosition`](/en/auto-docs/free-layout-editor/interfaces/HoverPosition.md)>

## Accessors

### hoveredNode

`get` **hoveredNode**(): `undefined` | [`WorkflowEntityHoverable`](/en/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

获取被 hover 的节点或线条

#### Returns

`undefined` | [`WorkflowEntityHoverable`](/en/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

**`Deprecated`**

use 'someHovered' instead

***

### someHovered

`get` **someHovered**(): `undefined` | [`WorkflowEntityHoverable`](/en/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

获取被 hover 的节点或线条

#### Returns

`undefined` | [`WorkflowEntityHoverable`](/en/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md)

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
| `position` | [`PositionSchema`](/en/auto-docs/free-layout-editor/interfaces/PositionSchema.md) |
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
