# Class: FlowNodeTransitionData

实体的数据块

## Hierarchy

* [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md)>

  ↳ **`FlowNodeTransitionData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#opts)
* [renderData](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#renderdata)
* [toDispose](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#todispose)
* [transform](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#transform)
* [type](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#changelocked)
* [collapsed](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#collapsed)
* [data](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#data)
* [disposed](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#disposed)
* [isNodeEnd](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#isnodeend)
* [labels](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#labels)
* [lines](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#lines)
* [onDispose](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#ondispose)
* [type](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#type-1)
* [version](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#version)

### Methods

* [checkChanged](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#firewillchange)
* [formatLabels](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#formatlabels)
* [formatLines](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#formatlines)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#getdefaultdata)
* [toJSON](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#tojson)
* [update](/en/auto-docs/free-layout-editor/classes/FlowNodeTransitionData.md#update)

## Constructors

### constructor

**new FlowNodeTransitionData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/free-layout-editor/classes/EntityData.md#opts)

***

### renderData

**renderData**: [`FlowNodeRenderData`](/en/auto-docs/free-layout-editor/classes/FlowNodeRenderData.md)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[toDispose](/en/auto-docs/free-layout-editor/classes/EntityData.md#todispose)

***

### transform

**transform**: [`FlowNodeTransformData`](/en/auto-docs/free-layout-editor/classes/FlowNodeTransformData.md)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[type](/en/auto-docs/free-layout-editor/classes/EntityData.md#type)

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

`get` **labels**(): [`FlowTransitionLabel`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Returns

[`FlowTransitionLabel`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

***

### lines

`get` **lines**(): [`FlowTransitionLine`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Returns

[`FlowTransitionLine`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

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
| `newProps` | [`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md) | `Partial`<[`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[checkChanged](/en/auto-docs/free-layout-editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[dispose](/en/auto-docs/free-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fireChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fireWillChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#firewillchange)

***

### formatLabels

**formatLabels**(`labels`): [`FlowTransitionLabel`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `labels` | [`FlowTransitionLabel`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[] |

#### Returns

[`FlowTransitionLabel`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLabel.md)\[]

***

### formatLines

**formatLines**(`lines`): [`FlowTransitionLine`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `lines` | [`FlowTransitionLine`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[] |

#### Returns

[`FlowTransitionLine`](/en/auto-docs/free-layout-editor/interfaces/FlowTransitionLine.md)\[]

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

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md)

初始化数据

#### Returns

[`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md)

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[toJSON](/en/auto-docs/free-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md) | `Partial`<[`FlowNodeTransitionSchema`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeTransitionSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[update](/en/auto-docs/free-layout-editor/classes/EntityData.md#update)
