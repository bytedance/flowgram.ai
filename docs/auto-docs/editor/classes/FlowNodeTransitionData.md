# Class: FlowNodeTransitionData

实体的数据块

## Hierarchy

* [`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md)>

  ↳ **`FlowNodeTransitionData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowNodeTransitionData.md#constructor)

### Properties

* [entity](/auto-docs/editor/classes/FlowNodeTransitionData.md#entity)
* [onDataChange](/auto-docs/editor/classes/FlowNodeTransitionData.md#ondatachange)
* [onWillChange](/auto-docs/editor/classes/FlowNodeTransitionData.md#onwillchange)
* [opts](/auto-docs/editor/classes/FlowNodeTransitionData.md#opts)
* [renderData](/auto-docs/editor/classes/FlowNodeTransitionData.md#renderdata)
* [toDispose](/auto-docs/editor/classes/FlowNodeTransitionData.md#todispose)
* [transform](/auto-docs/editor/classes/FlowNodeTransitionData.md#transform)
* [type](/auto-docs/editor/classes/FlowNodeTransitionData.md#type)

### Accessors

* [changeLocked](/auto-docs/editor/classes/FlowNodeTransitionData.md#changelocked)
* [collapsed](/auto-docs/editor/classes/FlowNodeTransitionData.md#collapsed)
* [data](/auto-docs/editor/classes/FlowNodeTransitionData.md#data)
* [disposed](/auto-docs/editor/classes/FlowNodeTransitionData.md#disposed)
* [isNodeEnd](/auto-docs/editor/classes/FlowNodeTransitionData.md#isnodeend)
* [labels](/auto-docs/editor/classes/FlowNodeTransitionData.md#labels)
* [lines](/auto-docs/editor/classes/FlowNodeTransitionData.md#lines)
* [onDispose](/auto-docs/editor/classes/FlowNodeTransitionData.md#ondispose)
* [type](/auto-docs/editor/classes/FlowNodeTransitionData.md#type-1)
* [version](/auto-docs/editor/classes/FlowNodeTransitionData.md#version)

### Methods

* [checkChanged](/auto-docs/editor/classes/FlowNodeTransitionData.md#checkchanged)
* [dispose](/auto-docs/editor/classes/FlowNodeTransitionData.md#dispose)
* [fireChange](/auto-docs/editor/classes/FlowNodeTransitionData.md#firechange)
* [fireWillChange](/auto-docs/editor/classes/FlowNodeTransitionData.md#firewillchange)
* [formatLabels](/auto-docs/editor/classes/FlowNodeTransitionData.md#formatlabels)
* [formatLines](/auto-docs/editor/classes/FlowNodeTransitionData.md#formatlines)
* [fromJSON](/auto-docs/editor/classes/FlowNodeTransitionData.md#fromjson)
* [fullyUpdate](/auto-docs/editor/classes/FlowNodeTransitionData.md#fullyupdate)
* [getDefaultData](/auto-docs/editor/classes/FlowNodeTransitionData.md#getdefaultdata)
* [toJSON](/auto-docs/editor/classes/FlowNodeTransitionData.md#tojson)
* [update](/auto-docs/editor/classes/FlowNodeTransitionData.md#update)

## Constructors

### constructor

**new FlowNodeTransitionData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[constructor](/auto-docs/editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[entity](/auto-docs/editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onDataChange](/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onWillChange](/auto-docs/editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[opts](/auto-docs/editor/classes/EntityData.md#opts)

***

### renderData

**renderData**: [`FlowNodeRenderData`](/auto-docs/editor/classes/FlowNodeRenderData.md)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[toDispose](/auto-docs/editor/classes/EntityData.md#todispose)

***

### transform

**transform**: [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[type](/auto-docs/editor/classes/EntityData.md#type)

## Accessors

### changeLocked

`get` **changeLocked**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.changeLocked

`set` **changeLocked**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `boolean` |

#### Returns

`void`

#### Inherited from

EntityData.changeLocked

***

### collapsed

`get` **collapsed**(): `boolean`

#### Returns

`boolean`

***

### data

`get` **data**(): `DATA`

当前数据

#### Returns

`DATA`

#### Inherited from

EntityData.data

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.disposed

***

### isNodeEnd

`get` **isNodeEnd**(): `boolean`

#### Returns

`boolean`

***

### labels

`get` **labels**(): [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

#### Returns

[`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

***

### lines

`get` **lines**(): [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

#### Returns

[`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### type

`get` **type**(): `string`

data 类型

#### Returns

`string`

#### Inherited from

EntityData.type

***

### version

`get` **version**(): `number`

#### Returns

`number`

#### Inherited from

EntityData.version

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md) | `Partial`<[`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[checkChanged](/auto-docs/editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[dispose](/auto-docs/editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fireChange](/auto-docs/editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fireWillChange](/auto-docs/editor/classes/EntityData.md#firewillchange)

***

### formatLabels

**formatLabels**(`labels`): [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `labels` | [`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[] |

#### Returns

[`FlowTransitionLabel`](/auto-docs/editor/interfaces/FlowTransitionLabel.md)\[]

***

### formatLines

**formatLines**(`lines`): [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `lines` | [`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[] |

#### Returns

[`FlowTransitionLine`](/auto-docs/editor/interfaces/FlowTransitionLine.md)\[]

***

### fromJSON

**fromJSON**(`data`): `void`

还原数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `object` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fromJSON](/auto-docs/editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md)

初始化数据

#### Returns

[`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md)

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[getDefaultData](/auto-docs/editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[toJSON](/auto-docs/editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md) | `Partial`<[`FlowNodeTransitionSchema`](/auto-docs/editor/interfaces/FlowNodeTransitionSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[update](/auto-docs/editor/classes/EntityData.md#update)
