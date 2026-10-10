# Class: PositionData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/auto-docs/core/classes/EntityData.md)<[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)>

  ↳ **`PositionData`**

## Implements

* [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/PositionData.md#constructor)

### Properties

* [entity](/auto-docs/core/classes/PositionData.md#entity)
* [onDataChange](/auto-docs/core/classes/PositionData.md#ondatachange)
* [onWillChange](/auto-docs/core/classes/PositionData.md#onwillchange)
* [opts](/auto-docs/core/classes/PositionData.md#opts)
* [toDispose](/auto-docs/core/classes/PositionData.md#todispose)
* [type](/auto-docs/core/classes/PositionData.md#type)

### Accessors

* [changeLocked](/auto-docs/core/classes/PositionData.md#changelocked)
* [data](/auto-docs/core/classes/PositionData.md#data)
* [disposed](/auto-docs/core/classes/PositionData.md#disposed)
* [onDispose](/auto-docs/core/classes/PositionData.md#ondispose)
* [type](/auto-docs/core/classes/PositionData.md#type-1)
* [version](/auto-docs/core/classes/PositionData.md#version)
* [x](/auto-docs/core/classes/PositionData.md#x)
* [y](/auto-docs/core/classes/PositionData.md#y)

### Methods

* [checkChanged](/auto-docs/core/classes/PositionData.md#checkchanged)
* [dispose](/auto-docs/core/classes/PositionData.md#dispose)
* [fireChange](/auto-docs/core/classes/PositionData.md#firechange)
* [fireWillChange](/auto-docs/core/classes/PositionData.md#firewillchange)
* [fromJSON](/auto-docs/core/classes/PositionData.md#fromjson)
* [fullyUpdate](/auto-docs/core/classes/PositionData.md#fullyupdate)
* [getDefaultData](/auto-docs/core/classes/PositionData.md#getdefaultdata)
* [toJSON](/auto-docs/core/classes/PositionData.md#tojson)
* [update](/auto-docs/core/classes/PositionData.md#update)

## Constructors

### constructor

**new PositionData**(`entity`, `opts?`)

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

`Readonly` **onDataChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[onDataChange](/auto-docs/core/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md), {}>>

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

`Static` **type**: `string` = `'PositionData'`

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

[PositionSchema](/auto-docs/core/interfaces/PositionSchema.md).[x](/auto-docs/core/interfaces/PositionSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/auto-docs/core/interfaces/PositionSchema.md).[x](/auto-docs/core/interfaces/PositionSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[PositionSchema](/auto-docs/core/interfaces/PositionSchema.md).[y](/auto-docs/core/interfaces/PositionSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/auto-docs/core/interfaces/PositionSchema.md).[y](/auto-docs/core/interfaces/PositionSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)> |

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
| `props` | [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[fullyUpdate](/auto-docs/core/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

初始化数据

#### Returns

[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

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
| `props` | [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)> | keyof [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[update](/auto-docs/core/classes/EntityData.md#update)
