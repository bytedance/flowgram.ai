# Class: OriginData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<[`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)>

  ↳ **`OriginData`**

## Implements

* [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/OriginData.md#constructor)

### Properties

* [entity](/en/auto-docs/editor/classes/OriginData.md#entity)
* [onDataChange](/en/auto-docs/editor/classes/OriginData.md#ondatachange)
* [onWillChange](/en/auto-docs/editor/classes/OriginData.md#onwillchange)
* [opts](/en/auto-docs/editor/classes/OriginData.md#opts)
* [toDispose](/en/auto-docs/editor/classes/OriginData.md#todispose)
* [type](/en/auto-docs/editor/classes/OriginData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/editor/classes/OriginData.md#changelocked)
* [data](/en/auto-docs/editor/classes/OriginData.md#data)
* [disposed](/en/auto-docs/editor/classes/OriginData.md#disposed)
* [onDispose](/en/auto-docs/editor/classes/OriginData.md#ondispose)
* [type](/en/auto-docs/editor/classes/OriginData.md#type-1)
* [version](/en/auto-docs/editor/classes/OriginData.md#version)
* [x](/en/auto-docs/editor/classes/OriginData.md#x)
* [y](/en/auto-docs/editor/classes/OriginData.md#y)

### Methods

* [checkChanged](/en/auto-docs/editor/classes/OriginData.md#checkchanged)
* [dispose](/en/auto-docs/editor/classes/OriginData.md#dispose)
* [fireChange](/en/auto-docs/editor/classes/OriginData.md#firechange)
* [fireWillChange](/en/auto-docs/editor/classes/OriginData.md#firewillchange)
* [fromJSON](/en/auto-docs/editor/classes/OriginData.md#fromjson)
* [fullyUpdate](/en/auto-docs/editor/classes/OriginData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/editor/classes/OriginData.md#getdefaultdata)
* [toJSON](/en/auto-docs/editor/classes/OriginData.md#tojson)
* [update](/en/auto-docs/editor/classes/OriginData.md#update)

## Constructors

### constructor

**new OriginData**(`entity`, `opts?`)

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

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<[`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[onDataChange](/en/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<[`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md), {}>>

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

[OriginSchema](/en/auto-docs/editor/interfaces/OriginSchema.md).[x](/en/auto-docs/editor/interfaces/OriginSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[OriginSchema](/en/auto-docs/editor/interfaces/OriginSchema.md).[x](/en/auto-docs/editor/interfaces/OriginSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[OriginSchema](/en/auto-docs/editor/interfaces/OriginSchema.md).[y](/en/auto-docs/editor/interfaces/OriginSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[OriginSchema](/en/auto-docs/editor/interfaces/OriginSchema.md).[y](/en/auto-docs/editor/interfaces/OriginSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md) | `Partial`<[`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)> |

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
| `props` | [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)

初始化数据

#### Returns

[`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)

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
| `props` | [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md) | `Partial`<[`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md)> | keyof [`OriginSchema`](/en/auto-docs/editor/interfaces/OriginSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/editor/classes/EntityData.md).[update](/en/auto-docs/editor/classes/EntityData.md#update)
