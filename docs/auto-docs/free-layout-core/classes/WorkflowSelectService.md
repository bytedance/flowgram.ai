# Class: WorkflowSelectService

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#constructor)

### Accessors

* [activatedNode](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#activatednode)
* [onSelectionChanged](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#onselectionchanged)
* [selectedNodes](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectednodes)
* [selection](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selection)

### Methods

* [clear](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#clear)
* [isActivated](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#isactivated)
* [isSelected](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#isselected)
* [select](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#select)
* [selectNode](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectnode)
* [selectNodeAndFocus](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectnodeandfocus)
* [selectNodeAndScrollToView](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectnodeandscrolltoview)
* [toggleSelect](/auto-docs/free-layout-core/classes/WorkflowSelectService.md#toggleselect)

## Constructors

### constructor

**new WorkflowSelectService**()

## Accessors

### activatedNode

`get` **activatedNode**(): `undefined` | `FlowNodeEntity`

当前激活的节点只能有一个

#### Returns

`undefined` | `FlowNodeEntity`

***

### onSelectionChanged

`get` **onSelectionChanged**(): `Event`<`void`>

#### Returns

`Event`<`void`>

***

### selectedNodes

`get` **selectedNodes**(): `FlowNodeEntity`\[]

选中的节点

#### Returns

`FlowNodeEntity`\[]

***

### selection

`get` **selection**(): `Entity`<`EntityOpts`>\[]

#### Returns

`Entity`<`EntityOpts`>\[]

`set` **selection**(`entities`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entities` | `Entity`<`EntityOpts`>\[] |

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
| `node` | [`WorkflowEntityHoverable`](/auto-docs/free-layout-core/types/WorkflowEntityHoverable.md) |

#### Returns

`void`

***

### selectNode

**selectNode**(`node`): `void`

选中

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

`void`

***

### selectNodeAndFocus

**selectNodeAndFocus**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

`void`

***

### selectNodeAndScrollToView

**selectNodeAndScrollToView**(`node`, `fitView?`): `Promise`<`void`>

选中并滚动到节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |
| `fitView?` | `boolean` |

#### Returns

`Promise`<`void`>

***

### toggleSelect

**toggleSelect**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

`void`
