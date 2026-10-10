# Class: WorkflowSelectService

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#constructor)

### Accessors

* [activatedNode](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#activatednode)
* [onSelectionChanged](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#onselectionchanged)
* [selectedNodes](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectednodes)
* [selection](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selection)

### Methods

* [clear](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#clear)
* [isActivated](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#isactivated)
* [isSelected](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#isselected)
* [select](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#select)
* [selectNode](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectnode)
* [selectNodeAndFocus](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectnodeandfocus)
* [selectNodeAndScrollToView](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#selectnodeandscrolltoview)
* [toggleSelect](/en/auto-docs/free-layout-core/classes/WorkflowSelectService.md#toggleselect)

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
| `node` | [`WorkflowEntityHoverable`](/en/auto-docs/free-layout-core/types/WorkflowEntityHoverable.md) |

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
