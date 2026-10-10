# Class: OriginData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)>

  ↳ **`OriginData`**

## Implements

* [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/OriginData.md#constructor)

### Properties

* [entity](/auto-docs/editor/classes/OriginData.md#entity)
* [onDataChange](/auto-docs/editor/classes/OriginData.md#ondatachange)
* [onWillChange](/auto-docs/editor/classes/OriginData.md#onwillchange)
* [opts](/auto-docs/editor/classes/OriginData.md#opts)
* [toDispose](/auto-docs/editor/classes/OriginData.md#todispose)
* [type](/auto-docs/editor/classes/OriginData.md#type)

### Accessors

* [changeLocked](/auto-docs/editor/classes/OriginData.md#changelocked)
* [data](/auto-docs/editor/classes/OriginData.md#data)
* [disposed](/auto-docs/editor/classes/OriginData.md#disposed)
* [onDispose](/auto-docs/editor/classes/OriginData.md#ondispose)
* [type](/auto-docs/editor/classes/OriginData.md#type-1)
* [version](/auto-docs/editor/classes/OriginData.md#version)
* [x](/auto-docs/editor/classes/OriginData.md#x)
* [y](/auto-docs/editor/classes/OriginData.md#y)

### Methods

* [checkChanged](/auto-docs/editor/classes/OriginData.md#checkchanged)
* [dispose](/auto-docs/editor/classes/OriginData.md#dispose)
* [fireChange](/auto-docs/editor/classes/OriginData.md#firechange)
* [fireWillChange](/auto-docs/editor/classes/OriginData.md#firewillchange)
* [fromJSON](/auto-docs/editor/classes/OriginData.md#fromjson)
* [fullyUpdate](/auto-docs/editor/classes/OriginData.md#fullyupdate)
* [getDefaultData](/auto-docs/editor/classes/OriginData.md#getdefaultdata)
* [toJSON](/auto-docs/editor/classes/OriginData.md#tojson)
* [update](/auto-docs/editor/classes/OriginData.md#update)

## Constructors

### constructor

**new OriginData**(`entity`, `opts?`)

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

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onDataChange](/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md), {}>>

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

[OriginSchema](/auto-docs/editor/interfaces/OriginSchema.md).[x](/auto-docs/editor/interfaces/OriginSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[OriginSchema](/auto-docs/editor/interfaces/OriginSchema.md).[x](/auto-docs/editor/interfaces/OriginSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[OriginSchema](/auto-docs/editor/interfaces/OriginSchema.md).[y](/auto-docs/editor/interfaces/OriginSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[OriginSchema](/auto-docs/editor/interfaces/OriginSchema.md).[y](/auto-docs/editor/interfaces/OriginSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md) | `Partial`<[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)> |

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
| `props` | [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)

初始化数据

#### Returns

[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)

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
| `props` | [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md) | `Partial`<[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)> | keyof [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[update](/auto-docs/editor/classes/EntityData.md#update)
