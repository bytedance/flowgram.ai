# Class: WorkflowSelectService

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#constructor)

### Accessors

* [activatedNode](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#activatednode)
* [onSelectionChanged](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#onselectionchanged)
* [selectedNodes](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectednodes)
* [selection](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selection)

### Methods

* [clear](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#clear)
* [isActivated](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#isactivated)
* [isSelected](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#isselected)
* [select](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#select)
* [selectNode](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectnode)
* [selectNodeAndFocus](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectnodeandfocus)
* [selectNodeAndScrollToView](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#selectnodeandscrolltoview)
* [toggleSelect](/en/auto-docs/free-layout-editor/classes/WorkflowSelectService.md#toggleselect)

## Constructors

### constructor

**new WorkflowSelectService**()

## Accessors

### activatedNode

`get` **activatedNode**(): `undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

当前激活的节点只能有一个

#### Returns

`undefined` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

***

### onSelectionChanged

`get` **onSelectionChanged**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### selectedNodes

`get` **selectedNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

选中的节点

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### selection

`get` **selection**(): [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[]

#### Returns

[`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[]

`set` **selection**(`entities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>\[] |

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
| `node` | [`WorkflowEntityHoverable`](/en/auto-docs/free-layout-editor/types/WorkflowEntityHoverable.md) |

#### Returns

`void`

***

### selectNode

**selectNode**(`node`): `void`

选中

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### selectNodeAndFocus

**selectNodeAndFocus**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`

***

### selectNodeAndScrollToView

**selectNodeAndScrollToView**(`node`, `fitView?`): `Promise`<`void`>

选中并滚动到节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |
| `fitView?` | `boolean` |

#### Returns

`Promise`<`void`>

***

### toggleSelect

**toggleSelect**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`void`
