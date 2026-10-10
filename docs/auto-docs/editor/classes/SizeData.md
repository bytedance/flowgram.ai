# Class: SizeData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)>

  ↳ **`SizeData`**

## Implements

* [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/SizeData.md#constructor)

### Properties

* [entity](/auto-docs/editor/classes/SizeData.md#entity)
* [onDataChange](/auto-docs/editor/classes/SizeData.md#ondatachange)
* [onWillChange](/auto-docs/editor/classes/SizeData.md#onwillchange)
* [opts](/auto-docs/editor/classes/SizeData.md#opts)
* [toDispose](/auto-docs/editor/classes/SizeData.md#todispose)
* [type](/auto-docs/editor/classes/SizeData.md#type)

### Accessors

* [changeLocked](/auto-docs/editor/classes/SizeData.md#changelocked)
* [data](/auto-docs/editor/classes/SizeData.md#data)
* [disposed](/auto-docs/editor/classes/SizeData.md#disposed)
* [height](/auto-docs/editor/classes/SizeData.md#height)
* [locked](/auto-docs/editor/classes/SizeData.md#locked)
* [onDispose](/auto-docs/editor/classes/SizeData.md#ondispose)
* [type](/auto-docs/editor/classes/SizeData.md#type-1)
* [version](/auto-docs/editor/classes/SizeData.md#version)
* [width](/auto-docs/editor/classes/SizeData.md#width)

### Methods

* [checkChanged](/auto-docs/editor/classes/SizeData.md#checkchanged)
* [dispose](/auto-docs/editor/classes/SizeData.md#dispose)
* [fireChange](/auto-docs/editor/classes/SizeData.md#firechange)
* [fireWillChange](/auto-docs/editor/classes/SizeData.md#firewillchange)
* [fromJSON](/auto-docs/editor/classes/SizeData.md#fromjson)
* [fullyUpdate](/auto-docs/editor/classes/SizeData.md#fullyupdate)
* [getDefaultData](/auto-docs/editor/classes/SizeData.md#getdefaultdata)
* [toJSON](/auto-docs/editor/classes/SizeData.md#tojson)
* [update](/auto-docs/editor/classes/SizeData.md#update)

## Constructors

### constructor

**new SizeData**(`entity`, `opts?`)

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

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onDataChange](/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md), {}>>

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

### height

`get` **height**(): `number`

#### Returns

`number`

#### Implementation of

[SizeSchema](/auto-docs/editor/interfaces/SizeSchema-1.md).[height](/auto-docs/editor/interfaces/SizeSchema-1.md#height)

`set` **height**(`height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`void`

#### Implementation of

[SizeSchema](/auto-docs/editor/interfaces/SizeSchema-1.md).[height](/auto-docs/editor/interfaces/SizeSchema-1.md#height)

***

### locked

`get` **locked**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[SizeSchema](/auto-docs/editor/interfaces/SizeSchema-1.md).[locked](/auto-docs/editor/interfaces/SizeSchema-1.md#locked)

`set` **locked**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

#### Implementation of

[SizeSchema](/auto-docs/editor/interfaces/SizeSchema-1.md).[locked](/auto-docs/editor/interfaces/SizeSchema-1.md#locked)

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

### width

`get` **width**(): `number`

#### Returns

`number`

#### Implementation of

[SizeSchema](/auto-docs/editor/interfaces/SizeSchema-1.md).[width](/auto-docs/editor/interfaces/SizeSchema-1.md#width)

`set` **width**(`width`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

`void`

#### Implementation of

[SizeSchema](/auto-docs/editor/interfaces/SizeSchema-1.md).[width](/auto-docs/editor/interfaces/SizeSchema-1.md#width)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md) | `Partial`<[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)> |

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
| `props` | [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

初始化数据

#### Returns

[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

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
| `props` | [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md) | `Partial`<[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)> | keyof [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[update](/auto-docs/editor/classes/EntityData.md#update)
