# Class: FlowGroupController

分组控制器

## Table of contents

### Properties

* [groupNode](/en/auto-docs/group-plugin/classes/FlowGroupController.md#groupnode)

### Accessors

* [bounds](/en/auto-docs/group-plugin/classes/FlowGroupController.md#bounds)
* [collapsed](/en/auto-docs/group-plugin/classes/FlowGroupController.md#collapsed)
* [hovered](/en/auto-docs/group-plugin/classes/FlowGroupController.md#hovered)
* [nodes](/en/auto-docs/group-plugin/classes/FlowGroupController.md#nodes)
* [note](/en/auto-docs/group-plugin/classes/FlowGroupController.md#note)
* [noteHeight](/en/auto-docs/group-plugin/classes/FlowGroupController.md#noteheight)
* [positionConfig](/en/auto-docs/group-plugin/classes/FlowGroupController.md#positionconfig)

### Methods

* [collapse](/en/auto-docs/group-plugin/classes/FlowGroupController.md#collapse)
* [expand](/en/auto-docs/group-plugin/classes/FlowGroupController.md#expand)
* [isEndNode](/en/auto-docs/group-plugin/classes/FlowGroupController.md#isendnode)
* [isStartNode](/en/auto-docs/group-plugin/classes/FlowGroupController.md#isstartnode)
* [create](/en/auto-docs/group-plugin/classes/FlowGroupController.md#create)

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

`Static` **create**(`groupNode?`): `undefined` | [`FlowGroupController`](/en/auto-docs/group-plugin/classes/FlowGroupController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `groupNode?` | `FlowNodeEntity` |

#### Returns

`undefined` | [`FlowGroupController`](/en/auto-docs/group-plugin/classes/FlowGroupController.md)
