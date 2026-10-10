# Class: ScaleData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md)>

  ↳ **`ScaleData`**

## Implements

* [`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/ScaleData.md#constructor)

### Properties

* [entity](/auto-docs/editor/classes/ScaleData.md#entity)
* [onDataChange](/auto-docs/editor/classes/ScaleData.md#ondatachange)
* [onWillChange](/auto-docs/editor/classes/ScaleData.md#onwillchange)
* [opts](/auto-docs/editor/classes/ScaleData.md#opts)
* [toDispose](/auto-docs/editor/classes/ScaleData.md#todispose)
* [type](/auto-docs/editor/classes/ScaleData.md#type)

### Accessors

* [changeLocked](/auto-docs/editor/classes/ScaleData.md#changelocked)
* [data](/auto-docs/editor/classes/ScaleData.md#data)
* [disposed](/auto-docs/editor/classes/ScaleData.md#disposed)
* [onDispose](/auto-docs/editor/classes/ScaleData.md#ondispose)
* [type](/auto-docs/editor/classes/ScaleData.md#type-1)
* [version](/auto-docs/editor/classes/ScaleData.md#version)
* [x](/auto-docs/editor/classes/ScaleData.md#x)
* [y](/auto-docs/editor/classes/ScaleData.md#y)

### Methods

* [checkChanged](/auto-docs/editor/classes/ScaleData.md#checkchanged)
* [dispose](/auto-docs/editor/classes/ScaleData.md#dispose)
* [fireChange](/auto-docs/editor/classes/ScaleData.md#firechange)
* [fireWillChange](/auto-docs/editor/classes/ScaleData.md#firewillchange)
* [fromJSON](/auto-docs/editor/classes/ScaleData.md#fromjson)
* [fullyUpdate](/auto-docs/editor/classes/ScaleData.md#fullyupdate)
* [getDefaultData](/auto-docs/editor/classes/ScaleData.md#getdefaultdata)
* [toJSON](/auto-docs/editor/classes/ScaleData.md#tojson)
* [update](/auto-docs/editor/classes/ScaleData.md#update)

## Constructors

### constructor

**new ScaleData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[constructor](/auto-docs/editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[entity](/auto-docs/editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onDataChange](/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onWillChange](/auto-docs/editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[opts](/auto-docs/editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[toDispose](/auto-docs/editor/classes/EntityData.md#todispose)

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

***

### x

`get` **x**(): `number`

#### Returns

`number`

#### Implementation of

[ScaleSchema](/auto-docs/editor/interfaces/ScaleSchema.md).[x](/auto-docs/editor/interfaces/ScaleSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[ScaleSchema](/auto-docs/editor/interfaces/ScaleSchema.md).[x](/auto-docs/editor/interfaces/ScaleSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[ScaleSchema](/auto-docs/editor/interfaces/ScaleSchema.md).[y](/auto-docs/editor/interfaces/ScaleSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[ScaleSchema](/auto-docs/editor/interfaces/ScaleSchema.md).[y](/auto-docs/editor/interfaces/ScaleSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md) | `Partial`<[`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md)> |

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
| `props` | [`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md)

初始化数据

#### Returns

[`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md)

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
| `props` | [`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md) | `Partial`<[`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md)> | keyof [`ScaleSchema`](/auto-docs/editor/interfaces/ScaleSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[update](/auto-docs/editor/classes/EntityData.md#update)
