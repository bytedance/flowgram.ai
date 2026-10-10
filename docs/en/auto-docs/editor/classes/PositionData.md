# Class: PositionData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)>

  ↳ **`PositionData`**

## Implements

* [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/PositionData.md#constructor)

### Properties

* [entity](/en/auto-docs/editor/classes/PositionData.md#entity)
* [onDataChange](/en/auto-docs/editor/classes/PositionData.md#ondatachange)
* [onWillChange](/en/auto-docs/editor/classes/PositionData.md#onwillchange)
* [opts](/en/auto-docs/editor/classes/PositionData.md#opts)
* [toDispose](/en/auto-docs/editor/classes/PositionData.md#todispose)
* [type](/en/auto-docs/editor/classes/PositionData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/editor/classes/PositionData.md#changelocked)
* [data](/en/auto-docs/editor/classes/PositionData.md#data)
* [disposed](/en/auto-docs/editor/classes/PositionData.md#disposed)
* [onDispose](/en/auto-docs/editor/classes/PositionData.md#ondispose)
* [type](/en/auto-docs/editor/classes/PositionData.md#type-1)
* [version](/en/auto-docs/editor/classes/PositionData.md#version)
* [x](/en/auto-docs/editor/classes/PositionData.md#x)
* [y](/en/auto-docs/editor/classes/PositionData.md#y)

### Methods

* [checkChanged](/en/auto-docs/editor/classes/PositionData.md#checkchanged)
* [dispose](/en/auto-docs/editor/classes/PositionData.md#dispose)
* [fireChange](/en/auto-docs/editor/classes/PositionData.md#firechange)
* [fireWillChange](/en/auto-docs/editor/classes/PositionData.md#firewillchange)
* [fromJSON](/en/auto-docs/editor/classes/PositionData.md#fromjson)
* [fullyUpdate](/en/auto-docs/editor/classes/PositionData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/editor/classes/PositionData.md#getdefaultdata)
* [toJSON](/en/auto-docs/editor/classes/PositionData.md#tojson)
* [update](/en/auto-docs/editor/classes/PositionData.md#update)

## Constructors

### constructor

**new PositionData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[constructor](/en/auto-docs/editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[entity](/en/auto-docs/editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[onDataChange](/en/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[onWillChange](/en/auto-docs/editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[opts](/en/auto-docs/editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[toDispose](/en/auto-docs/editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[type](/en/auto-docs/editor/classes/EntityData.md#type)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

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

[PositionSchema](/en/auto-docs/editor/interfaces/PositionSchema.md).[x](/en/auto-docs/editor/interfaces/PositionSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/en/auto-docs/editor/interfaces/PositionSchema.md).[x](/en/auto-docs/editor/interfaces/PositionSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[PositionSchema](/en/auto-docs/editor/interfaces/PositionSchema.md).[y](/en/auto-docs/editor/interfaces/PositionSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/en/auto-docs/editor/interfaces/PositionSchema.md).[y](/en/auto-docs/editor/interfaces/PositionSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[checkChanged](/en/auto-docs/editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[dispose](/en/auto-docs/editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[fireChange](/en/auto-docs/editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[fireWillChange](/en/auto-docs/editor/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[fromJSON](/en/auto-docs/editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)

初始化数据

#### Returns

[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)

#### Overrides

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[toJSON](/en/auto-docs/editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md)> | keyof [`PositionSchema`](/en/auto-docs/editor/interfaces/PositionSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[update](/en/auto-docs/editor/classes/EntityData.md#update)
