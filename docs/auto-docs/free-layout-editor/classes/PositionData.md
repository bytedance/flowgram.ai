# Class: PositionData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)>

  ↳ **`PositionData`**

## Implements

* [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/PositionData.md#constructor)

### Properties

* [entity](/auto-docs/free-layout-editor/classes/PositionData.md#entity)
* [onDataChange](/auto-docs/free-layout-editor/classes/PositionData.md#ondatachange)
* [onWillChange](/auto-docs/free-layout-editor/classes/PositionData.md#onwillchange)
* [opts](/auto-docs/free-layout-editor/classes/PositionData.md#opts)
* [toDispose](/auto-docs/free-layout-editor/classes/PositionData.md#todispose)
* [type](/auto-docs/free-layout-editor/classes/PositionData.md#type)

### Accessors

* [changeLocked](/auto-docs/free-layout-editor/classes/PositionData.md#changelocked)
* [data](/auto-docs/free-layout-editor/classes/PositionData.md#data)
* [disposed](/auto-docs/free-layout-editor/classes/PositionData.md#disposed)
* [onDispose](/auto-docs/free-layout-editor/classes/PositionData.md#ondispose)
* [type](/auto-docs/free-layout-editor/classes/PositionData.md#type-1)
* [version](/auto-docs/free-layout-editor/classes/PositionData.md#version)
* [x](/auto-docs/free-layout-editor/classes/PositionData.md#x)
* [y](/auto-docs/free-layout-editor/classes/PositionData.md#y)

### Methods

* [checkChanged](/auto-docs/free-layout-editor/classes/PositionData.md#checkchanged)
* [dispose](/auto-docs/free-layout-editor/classes/PositionData.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/PositionData.md#firechange)
* [fireWillChange](/auto-docs/free-layout-editor/classes/PositionData.md#firewillchange)
* [fromJSON](/auto-docs/free-layout-editor/classes/PositionData.md#fromjson)
* [fullyUpdate](/auto-docs/free-layout-editor/classes/PositionData.md#fullyupdate)
* [getDefaultData](/auto-docs/free-layout-editor/classes/PositionData.md#getdefaultdata)
* [toJSON](/auto-docs/free-layout-editor/classes/PositionData.md#tojson)
* [update](/auto-docs/free-layout-editor/classes/PositionData.md#update)

## Constructors

### constructor

**new PositionData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[onWillChange](/auto-docs/free-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[opts](/auto-docs/free-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[toDispose](/auto-docs/free-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[type](/auto-docs/free-layout-editor/classes/EntityData.md#type)

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

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

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

[PositionSchema](/auto-docs/free-layout-editor/interfaces/PositionSchema.md).[x](/auto-docs/free-layout-editor/interfaces/PositionSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/auto-docs/free-layout-editor/interfaces/PositionSchema.md).[x](/auto-docs/free-layout-editor/interfaces/PositionSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[PositionSchema](/auto-docs/free-layout-editor/interfaces/PositionSchema.md).[y](/auto-docs/free-layout-editor/interfaces/PositionSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[PositionSchema](/auto-docs/free-layout-editor/interfaces/PositionSchema.md).[y](/auto-docs/free-layout-editor/interfaces/PositionSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[checkChanged](/auto-docs/free-layout-editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[dispose](/auto-docs/free-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fireChange](/auto-docs/free-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fireWillChange](/auto-docs/free-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fromJSON](/auto-docs/free-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

初始化数据

#### Returns

[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[toJSON](/auto-docs/free-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md) | `Partial`<[`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md)> | keyof [`PositionSchema`](/auto-docs/free-layout-editor/interfaces/PositionSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[update](/auto-docs/free-layout-editor/classes/EntityData.md#update)
