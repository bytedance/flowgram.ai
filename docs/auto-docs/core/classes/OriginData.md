# Class: OriginData

实体的数据块

## Hierarchy

* [`EntityData`](/auto-docs/core/classes/EntityData.md)<[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)>

  ↳ **`OriginData`**

## Implements

* [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/OriginData.md#constructor)

### Properties

* [entity](/auto-docs/core/classes/OriginData.md#entity)
* [onDataChange](/auto-docs/core/classes/OriginData.md#ondatachange)
* [onWillChange](/auto-docs/core/classes/OriginData.md#onwillchange)
* [opts](/auto-docs/core/classes/OriginData.md#opts)
* [toDispose](/auto-docs/core/classes/OriginData.md#todispose)
* [type](/auto-docs/core/classes/OriginData.md#type)

### Accessors

* [changeLocked](/auto-docs/core/classes/OriginData.md#changelocked)
* [data](/auto-docs/core/classes/OriginData.md#data)
* [disposed](/auto-docs/core/classes/OriginData.md#disposed)
* [onDispose](/auto-docs/core/classes/OriginData.md#ondispose)
* [type](/auto-docs/core/classes/OriginData.md#type-1)
* [version](/auto-docs/core/classes/OriginData.md#version)
* [x](/auto-docs/core/classes/OriginData.md#x)
* [y](/auto-docs/core/classes/OriginData.md#y)

### Methods

* [checkChanged](/auto-docs/core/classes/OriginData.md#checkchanged)
* [dispose](/auto-docs/core/classes/OriginData.md#dispose)
* [fireChange](/auto-docs/core/classes/OriginData.md#firechange)
* [fireWillChange](/auto-docs/core/classes/OriginData.md#firewillchange)
* [fromJSON](/auto-docs/core/classes/OriginData.md#fromjson)
* [fullyUpdate](/auto-docs/core/classes/OriginData.md#fullyupdate)
* [getDefaultData](/auto-docs/core/classes/OriginData.md#getdefaultdata)
* [toJSON](/auto-docs/core/classes/OriginData.md#tojson)
* [update](/auto-docs/core/classes/OriginData.md#update)

## Constructors

### constructor

**new OriginData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[constructor](/auto-docs/core/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[entity](/auto-docs/core/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[onDataChange](/auto-docs/core/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[onWillChange](/auto-docs/core/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[opts](/auto-docs/core/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[toDispose](/auto-docs/core/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string` = `'OriginData'`

#### Overrides

[EntityData](/auto-docs/core/classes/EntityData.md).[type](/auto-docs/core/classes/EntityData.md#type)

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

[OriginSchema](/auto-docs/core/interfaces/OriginSchema.md).[x](/auto-docs/core/interfaces/OriginSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[OriginSchema](/auto-docs/core/interfaces/OriginSchema.md).[x](/auto-docs/core/interfaces/OriginSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[OriginSchema](/auto-docs/core/interfaces/OriginSchema.md).[y](/auto-docs/core/interfaces/OriginSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[OriginSchema](/auto-docs/core/interfaces/OriginSchema.md).[y](/auto-docs/core/interfaces/OriginSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md) | `Partial`<[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[checkChanged](/auto-docs/core/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[dispose](/auto-docs/core/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[fireChange](/auto-docs/core/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[fireWillChange](/auto-docs/core/classes/EntityData.md#firewillchange)

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

[EntityData](/auto-docs/core/classes/EntityData.md).[fromJSON](/auto-docs/core/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[fullyUpdate](/auto-docs/core/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)

初始化数据

#### Returns

[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)

#### Overrides

[EntityData](/auto-docs/core/classes/EntityData.md).[getDefaultData](/auto-docs/core/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[toJSON](/auto-docs/core/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md) | `Partial`<[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)> | keyof [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[update](/auto-docs/core/classes/EntityData.md#update)
