# Class: PositionData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/en/auto-docs/core/classes/EntityData.md)<[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)>

  ↳ **`PositionData`**

## Implements

* [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/core/classes/PositionData.md#constructor)

### Properties

* [entity](/en/auto-docs/core/classes/PositionData.md#entity)
* [onDataChange](/en/auto-docs/core/classes/PositionData.md#ondatachange)
* [onWillChange](/en/auto-docs/core/classes/PositionData.md#onwillchange)
* [opts](/en/auto-docs/core/classes/PositionData.md#opts)
* [toDispose](/en/auto-docs/core/classes/PositionData.md#todispose)
* [type](/en/auto-docs/core/classes/PositionData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/core/classes/PositionData.md#changelocked)
* [data](/en/auto-docs/core/classes/PositionData.md#data)
* [disposed](/en/auto-docs/core/classes/PositionData.md#disposed)
* [onDispose](/en/auto-docs/core/classes/PositionData.md#ondispose)
* [type](/en/auto-docs/core/classes/PositionData.md#type-1)
* [version](/en/auto-docs/core/classes/PositionData.md#version)
* [x](/en/auto-docs/core/classes/PositionData.md#x)
* [y](/en/auto-docs/core/classes/PositionData.md#y)

### Methods

* [checkChanged](/en/auto-docs/core/classes/PositionData.md#checkchanged)
* [dispose](/en/auto-docs/core/classes/PositionData.md#dispose)
* [fireChange](/en/auto-docs/core/classes/PositionData.md#firechange)
* [fireWillChange](/en/auto-docs/core/classes/PositionData.md#firewillchange)
* [fromJSON](/en/auto-docs/core/classes/PositionData.md#fromjson)
* [fullyUpdate](/en/auto-docs/core/classes/PositionData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/core/classes/PositionData.md#getdefaultdata)
* [toJSON](/en/auto-docs/core/classes/PositionData.md#tojson)
* [update](/en/auto-docs/core/classes/PositionData.md#update)

## Constructors

### constructor

**new PositionData**(`entity`, `opts?`)

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

`Readonly` **onDataChange**: `Event`<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[onDataChange](/en/auto-docs/core/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/en/auto-docs/core/classes/EntityData.md)<[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md), {}>>

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

`Static` **type**: `string` = `'PositionData'`

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

[PositionSchema](/en/auto-docs/core/interfaces/PositionSchema.md).[x](/en/auto-docs/core/interfaces/PositionSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/en/auto-docs/core/interfaces/PositionSchema.md).[x](/en/auto-docs/core/interfaces/PositionSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[PositionSchema](/en/auto-docs/core/interfaces/PositionSchema.md).[y](/en/auto-docs/core/interfaces/PositionSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/en/auto-docs/core/interfaces/PositionSchema.md).[y](/en/auto-docs/core/interfaces/PositionSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)> |

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
| `props` | [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[fullyUpdate](/en/auto-docs/core/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)

初始化数据

#### Returns

[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)

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
| `props` | [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md)> | keyof [`PositionSchema`](/en/auto-docs/core/interfaces/PositionSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/core/classes/EntityData.md).[update](/en/auto-docs/core/classes/EntityData.md#update)
