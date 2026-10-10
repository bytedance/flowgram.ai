# Class: ScaleData

实体的数据块

## Hierarchy

* [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<[`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md)>

  ↳ **`ScaleData`**

## Implements

* [`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/ScaleData.md#constructor)

### Properties

* [entity](/en/auto-docs/core/classes/ScaleData.md#entity)
* [onDataChange](/en/auto-docs/core/classes/ScaleData.md#ondatachange)
* [onWillChange](/en/auto-docs/core/classes/ScaleData.md#onwillchange)
* [opts](/en/auto-docs/core/classes/ScaleData.md#opts)
* [toDispose](/en/auto-docs/core/classes/ScaleData.md#todispose)
* [type](/en/auto-docs/core/classes/ScaleData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/core/classes/ScaleData.md#changelocked)
* [data](/en/auto-docs/core/classes/ScaleData.md#data)
* [disposed](/en/auto-docs/core/classes/ScaleData.md#disposed)
* [onDispose](/en/auto-docs/core/classes/ScaleData.md#ondispose)
* [type](/en/auto-docs/core/classes/ScaleData.md#type-1)
* [version](/en/auto-docs/core/classes/ScaleData.md#version)
* [x](/en/auto-docs/core/classes/ScaleData.md#x)
* [y](/en/auto-docs/core/classes/ScaleData.md#y)

### Methods

* [checkChanged](/en/auto-docs/core/classes/ScaleData.md#checkchanged)
* [dispose](/en/auto-docs/core/classes/ScaleData.md#dispose)
* [fireChange](/en/auto-docs/core/classes/ScaleData.md#firechange)
* [fireWillChange](/en/auto-docs/core/classes/ScaleData.md#firewillchange)
* [fromJSON](/en/auto-docs/core/classes/ScaleData.md#fromjson)
* [fullyUpdate](/en/auto-docs/core/classes/ScaleData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/core/classes/ScaleData.md#getdefaultdata)
* [toJSON](/en/auto-docs/core/classes/ScaleData.md#tojson)
* [update](/en/auto-docs/core/classes/ScaleData.md#update)

## Constructors

### constructor

**new ScaleData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[constructor](/en/auto-docs/core/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/core/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[entity](/en/auto-docs/core/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<[`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[onDataChange](/en/auto-docs/core/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<[`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[onWillChange](/en/auto-docs/core/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[opts](/en/auto-docs/core/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[toDispose](/en/auto-docs/core/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string` = `'ScaleData'`

#### Overrides

[EntityData](/en/auto-docs/core/classes/EntityData.md).[type](/en/auto-docs/core/classes/EntityData.md#type)

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

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

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

***

### x

`get` **x**(): `number`

#### Returns

`number`

#### Implementation of

[ScaleSchema](/en/auto-docs/core/interfaces/ScaleSchema.md).[x](/en/auto-docs/core/interfaces/ScaleSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[ScaleSchema](/en/auto-docs/core/interfaces/ScaleSchema.md).[x](/en/auto-docs/core/interfaces/ScaleSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[ScaleSchema](/en/auto-docs/core/interfaces/ScaleSchema.md).[y](/en/auto-docs/core/interfaces/ScaleSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[ScaleSchema](/en/auto-docs/core/interfaces/ScaleSchema.md).[y](/en/auto-docs/core/interfaces/ScaleSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md) | `Partial`<[`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[checkChanged](/en/auto-docs/core/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[dispose](/en/auto-docs/core/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[fireChange](/en/auto-docs/core/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[fireWillChange](/en/auto-docs/core/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/core/classes/EntityData.md).[fromJSON](/en/auto-docs/core/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[fullyUpdate](/en/auto-docs/core/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md)

初始化数据

#### Returns

[`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md)

#### Overrides

[EntityData](/en/auto-docs/core/classes/EntityData.md).[getDefaultData](/en/auto-docs/core/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[toJSON](/en/auto-docs/core/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md) | `Partial`<[`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md)> | keyof [`ScaleSchema`](/en/auto-docs/core/interfaces/ScaleSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[update](/en/auto-docs/core/classes/EntityData.md#update)
