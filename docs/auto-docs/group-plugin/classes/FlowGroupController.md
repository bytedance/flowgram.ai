# Class: FlowGroupController

分组控制器

## Table of contents

### Properties

* [groupNode](/auto-docs/group-plugin/classes/FlowGroupController.md#groupnode)

### Accessors

* [bounds](/auto-docs/group-plugin/classes/FlowGroupController.md#bounds)
* [collapsed](/auto-docs/group-plugin/classes/FlowGroupController.md#collapsed)
* [hovered](/auto-docs/group-plugin/classes/FlowGroupController.md#hovered)
* [nodes](/auto-docs/group-plugin/classes/FlowGroupController.md#nodes)
* [note](/auto-docs/group-plugin/classes/FlowGroupController.md#note)
* [noteHeight](/auto-docs/group-plugin/classes/FlowGroupController.md#noteheight)
* [positionConfig](/auto-docs/group-plugin/classes/FlowGroupController.md#positionconfig)

### Methods

* [collapse](/auto-docs/group-plugin/classes/FlowGroupController.md#collapse)
* [expand](/auto-docs/group-plugin/classes/FlowGroupController.md#expand)
* [isEndNode](/auto-docs/group-plugin/classes/FlowGroupController.md#isendnode)
* [isStartNode](/auto-docs/group-plugin/classes/FlowGroupController.md#isstartnode)
* [create](/auto-docs/group-plugin/classes/FlowGroupController.md#create)

## Properties

### groupNode

`Readonly` **groupNode**: `FlowNodeEntity`

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

`get` **nodes**(): `FlowNodeEntity`\[]

#### Returns

`FlowNodeEntity`\[]

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
| `node?` | `FlowNodeEntity` |

#### Returns

`boolean`

***

### isStartNode

**isStartNode**(`node?`): `boolean`

是否是开始节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `FlowNodeEntity` |

#### Returns

`boolean`

***

### create

`Static` **create**(`groupNode?`): `undefined` | [`FlowGroupController`](/auto-docs/group-plugin/classes/FlowGroupController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode?` | `FlowNodeEntity` |

#### Returns

`undefined` | [`FlowGroupController`](/auto-docs/group-plugin/classes/FlowGroupController.md)
