# Class: FlowGroupController

分组控制器

## Table of contents

### Properties

* [groupNode](/auto-docs/document/classes/FlowGroupController.md#groupnode)

### Accessors

* [bounds](/auto-docs/document/classes/FlowGroupController.md#bounds)
* [collapsed](/auto-docs/document/classes/FlowGroupController.md#collapsed)
* [hovered](/auto-docs/document/classes/FlowGroupController.md#hovered)
* [nodes](/auto-docs/document/classes/FlowGroupController.md#nodes)
* [note](/auto-docs/document/classes/FlowGroupController.md#note)
* [noteHeight](/auto-docs/document/classes/FlowGroupController.md#noteheight)
* [positionConfig](/auto-docs/document/classes/FlowGroupController.md#positionconfig)

### Methods

* [collapse](/auto-docs/document/classes/FlowGroupController.md#collapse)
* [expand](/auto-docs/document/classes/FlowGroupController.md#expand)
* [isEndNode](/auto-docs/document/classes/FlowGroupController.md#isendnode)
* [isStartNode](/auto-docs/document/classes/FlowGroupController.md#isstartnode)
* [create](/auto-docs/document/classes/FlowGroupController.md#create)

## Properties

### groupNode

`Readonly` **groupNode**: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

## Accessors

### bounds

`get` **bounds**(): `Rectangle`

获取分组外围的最大边框

#### Returns

`Rectangle`

***

### collapsed

`get` **collapsed**(): `boolean`

#### Returns

`boolean`

`set` **collapsed**(`collapsed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collapsed` | `boolean` |

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

`get` **nodes**(): [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

#### Returns

[`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)\[]

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
| `node?` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`boolean`

***

### isStartNode

**isStartNode**(`node?`): `boolean`

是否是开始节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`boolean`

***

### create

`Static` **create**(`groupNode?`): `undefined` | [`FlowGroupController`](/auto-docs/document/classes/FlowGroupController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode?` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Returns

`undefined` | [`FlowGroupController`](/auto-docs/document/classes/FlowGroupController.md)
