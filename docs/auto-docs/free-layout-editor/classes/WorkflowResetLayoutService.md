# Class: WorkflowResetLayoutService

重置布局服务

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowResetLayoutService.md#constructor)

### Properties

* [onResetLayout](/auto-docs/free-layout-editor/classes/WorkflowResetLayoutService.md#onresetlayout)

### Methods

* [dispose](/auto-docs/free-layout-editor/classes/WorkflowResetLayoutService.md#dispose)
* [fireResetLayout](/auto-docs/free-layout-editor/classes/WorkflowResetLayoutService.md#fireresetlayout)
* [init](/auto-docs/free-layout-editor/classes/WorkflowResetLayoutService.md#init)
* [layoutToPositions](/auto-docs/free-layout-editor/classes/WorkflowResetLayoutService.md#layouttopositions)

## Constructors

### constructor

**new WorkflowResetLayoutService**()

## Properties

### onResetLayout

`Readonly` **onResetLayout**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<{ `nodeIds`: `string`\[] ; `oldPositionMap`: [`PositionMap`](/auto-docs/free-layout-editor/types/PositionMap.md) ; `positionMap`: [`PositionMap`](/auto-docs/free-layout-editor/types/PositionMap.md)  }>

reset layout事件

## Methods

### dispose

**dispose**(): `void`

销毁

#### Returns

`void`

***

### fireResetLayout

**fireResetLayout**(`nodeIds`, `positionMap`, `oldPositionMap`): `void`

触发重置布局

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodeIds` | `string`\[] | 节点id |
| `positionMap` | [`PositionMap`](/auto-docs/free-layout-editor/types/PositionMap.md) | 新布局数据 |
| `oldPositionMap` | [`PositionMap`](/auto-docs/free-layout-editor/types/PositionMap.md) | 老布局数据 |

#### Returns

`void`

***

### init

**init**(): `void`

初始化

#### Returns

`void`

***

### layoutToPositions

**layoutToPositions**(`nodeIds`, `positionMap`): `Promise`<`Record`<`string`, [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)>>

根据数据重新布局

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeIds` | `string`\[] |
| `positionMap` | [`PositionMap`](/auto-docs/free-layout-editor/types/PositionMap.md) |

#### Returns

`Promise`<`Record`<`string`, [`IPoint`](/auto-docs/free-layout-editor/interfaces/IPoint.md)>>
