# Class: WorkflowSelectService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#constructor)

### Accessors

* [activatedNode](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#activatednode)
* [onSelectionChanged](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#onselectionchanged)
* [selectedNodes](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectednodes)
* [selection](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selection)

### Methods

* [clear](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#clear)
* [isActivated](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#isactivated)
* [isSelected](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#isselected)
* [select](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#select)
* [selectNode](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectnode)
* [selectNodeAndFocus](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectnodeandfocus)
* [selectNodeAndScrollToView](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectnodeandscrolltoview)
* [toggleSelect](/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#toggleselect)

## Constructors

### constructor

**new WorkflowSelectService**()

## Accessors

### activatedNode

`get` **activatedNode**(): `undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

当前激活的节点只能有一个

#### Returns

`undefined` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### onSelectionChanged

`get` **onSelectionChanged**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### selectedNodes

`get` **selectedNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

选中的节点

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### selection

`get` **selection**(): [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[]

#### Returns

[`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[]

`set` **selection**(`entities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[] |

#### Returns

`void`

## Methods

### clear

**clear**(): `void`

#### Returns

`void`

***

### isActivated

**isActivated**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

***

### isSelected

**isSelected**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`boolean`

***

### select

**select**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`WorkflowEntityHoverable`](/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md) |

#### Returns

`void`

***

### selectNode

**selectNode**(`node`): `void`

选中

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### selectNodeAndFocus

**selectNodeAndFocus**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### selectNodeAndScrollToView

**selectNodeAndScrollToView**(`node`, `fitView?`): `Promise`<`void`>

选中并滚动到节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `fitView?` | `boolean` |

#### Returns

`Promise`<`void`>

***

### toggleSelect

**toggleSelect**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`
