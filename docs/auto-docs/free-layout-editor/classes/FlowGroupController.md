# Class: FlowGroupController

分组控制器

## Table of contents

### Properties

* [groupNode](/auto-docs/free-layout-editor/classes/FlowGroupController.md#groupnode)

### Accessors

* [bounds](/auto-docs/free-layout-editor/classes/FlowGroupController.md#bounds)
* [collapsed](/auto-docs/free-layout-editor/classes/FlowGroupController.md#collapsed)
* [hovered](/auto-docs/free-layout-editor/classes/FlowGroupController.md#hovered)
* [nodes](/auto-docs/free-layout-editor/classes/FlowGroupController.md#nodes)
* [note](/auto-docs/free-layout-editor/classes/FlowGroupController.md#note)
* [noteHeight](/auto-docs/free-layout-editor/classes/FlowGroupController.md#noteheight)
* [positionConfig](/auto-docs/free-layout-editor/classes/FlowGroupController.md#positionconfig)

### Methods

* [collapse](/auto-docs/free-layout-editor/classes/FlowGroupController.md#collapse)
* [expand](/auto-docs/free-layout-editor/classes/FlowGroupController.md#expand)
* [isEndNode](/auto-docs/free-layout-editor/classes/FlowGroupController.md#isendnode)
* [isStartNode](/auto-docs/free-layout-editor/classes/FlowGroupController.md#isstartnode)
* [create](/auto-docs/free-layout-editor/classes/FlowGroupController.md#create)

## Properties

### groupNode

`Readonly` **groupNode**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

## Accessors

### bounds

`get` **bounds**(): [`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

获取分组外围的最大边框

#### Returns

[`Rectangle`](/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### collapsed

`get` **collapsed**(): `boolean`

#### Returns

`boolean`

`set` **collapsed**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

***

### hovered

`get` **hovered**(): `boolean`

#### Returns

`boolean`

`set` **hovered**(`hovered`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hovered` | `boolean` |

#### Returns

`void`

***

### nodes

`get` **nodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### note

`get` **note**(): `string`

#### Returns

`string`

`set` **note**(`note`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `note` | `string` |

#### Returns

`void`

***

### noteHeight

`get` **noteHeight**(): `number`

#### Returns

`number`

`set` **noteHeight**(`height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`void`

***

### positionConfig

`get` **positionConfig**(): `Record`<`string`, `number`>

#### Returns

`Record`<`string`, `number`>

## Methods

### collapse

**collapse**(): `void`

#### Returns

`void`

***

### expand

**expand**(): `void`

#### Returns

`void`

***

### isEndNode

**isEndNode**(`node?`): `boolean`

是否是结束节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`boolean`

***

### isStartNode

**isStartNode**(`node?`): `boolean`

是否是开始节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`boolean`

***

### create

`Static` **create**(`groupNode?`): `undefined` | [`FlowGroupController`](/auto-docs/free-layout-editor/classes/FlowGroupController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode?` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Returns

`undefined` | [`FlowGroupController`](/auto-docs/free-layout-editor/classes/FlowGroupController.md)
