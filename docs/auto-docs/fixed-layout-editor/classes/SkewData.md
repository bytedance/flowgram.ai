# Class: SkewData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)>

  ↳ **`SkewData`**

## Implements

* [`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/SkewData.md#constructor)

### Properties

* [entity](/auto-docs/fixed-layout-editor/classes/SkewData.md#entity)
* [onDataChange](/auto-docs/fixed-layout-editor/classes/SkewData.md#ondatachange)
* [onWillChange](/auto-docs/fixed-layout-editor/classes/SkewData.md#onwillchange)
* [opts](/auto-docs/fixed-layout-editor/classes/SkewData.md#opts)
* [toDispose](/auto-docs/fixed-layout-editor/classes/SkewData.md#todispose)
* [type](/auto-docs/fixed-layout-editor/classes/SkewData.md#type)

### Accessors

* [changeLocked](/auto-docs/fixed-layout-editor/classes/SkewData.md#changelocked)
* [data](/auto-docs/fixed-layout-editor/classes/SkewData.md#data)
* [disposed](/auto-docs/fixed-layout-editor/classes/SkewData.md#disposed)
* [onDispose](/auto-docs/fixed-layout-editor/classes/SkewData.md#ondispose)
* [type](/auto-docs/fixed-layout-editor/classes/SkewData.md#type-1)
* [version](/auto-docs/fixed-layout-editor/classes/SkewData.md#version)
* [x](/auto-docs/fixed-layout-editor/classes/SkewData.md#x)
* [y](/auto-docs/fixed-layout-editor/classes/SkewData.md#y)

### Methods

* [checkChanged](/auto-docs/fixed-layout-editor/classes/SkewData.md#checkchanged)
* [dispose](/auto-docs/fixed-layout-editor/classes/SkewData.md#dispose)
* [fireChange](/auto-docs/fixed-layout-editor/classes/SkewData.md#firechange)
* [fireWillChange](/auto-docs/fixed-layout-editor/classes/SkewData.md#firewillchange)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/SkewData.md#fromjson)
* [fullyUpdate](/auto-docs/fixed-layout-editor/classes/SkewData.md#fullyupdate)
* [getDefaultData](/auto-docs/fixed-layout-editor/classes/SkewData.md#getdefaultdata)
* [toJSON](/auto-docs/fixed-layout-editor/classes/SkewData.md#tojson)
* [update](/auto-docs/fixed-layout-editor/classes/SkewData.md#update)

## Constructors

### constructor

**new SkewData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[constructor](/auto-docs/fixed-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[entity](/auto-docs/fixed-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[onDataChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[onWillChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[opts](/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[toDispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[type](/auto-docs/fixed-layout-editor/classes/EntityData.md#type)

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

`get` **onDispose**(): [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

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

[SkewSchema](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md).[x](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md#x)

`set` **x**(`x`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |

#### Returns

`void`

#### Implementation of

[SkewSchema](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md).[x](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md#x)

***

### y

`get` **y**(): `number`

#### Returns

`number`

#### Implementation of

[SkewSchema](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md).[y](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md#y)

`set` **y**(`y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `y` | `number` |

#### Returns

`void`

#### Implementation of

[SkewSchema](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md).[y](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md#y)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md) | `Partial`<[`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[checkChanged](/auto-docs/fixed-layout-editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[dispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireWillChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fromJSON](/auto-docs/fixed-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[fullyUpdate](/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)

初始化数据

#### Returns

[`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)

#### Overrides

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[getDefaultData](/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[toJSON](/auto-docs/fixed-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md) | `Partial`<[`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)> | keyof [`SkewSchema`](/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/fixed-layout-editor/classes/EntityData.md).[update](/auto-docs/fixed-layout-editor/classes/EntityData.md#update)
