# Class: SizeData

实体的数据块

## Hierarchy

* [`EntityData`](/auto-docs/core/classes/EntityData.md)<[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)>

  ↳ **`SizeData`**

## Implements

* [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/SizeData.md#constructor)

### Properties

* [entity](/auto-docs/core/classes/SizeData.md#entity)
* [onDataChange](/auto-docs/core/classes/SizeData.md#ondatachange)
* [onWillChange](/auto-docs/core/classes/SizeData.md#onwillchange)
* [opts](/auto-docs/core/classes/SizeData.md#opts)
* [toDispose](/auto-docs/core/classes/SizeData.md#todispose)
* [type](/auto-docs/core/classes/SizeData.md#type)

### Accessors

* [changeLocked](/auto-docs/core/classes/SizeData.md#changelocked)
* [data](/auto-docs/core/classes/SizeData.md#data)
* [disposed](/auto-docs/core/classes/SizeData.md#disposed)
* [height](/auto-docs/core/classes/SizeData.md#height)
* [locked](/auto-docs/core/classes/SizeData.md#locked)
* [onDispose](/auto-docs/core/classes/SizeData.md#ondispose)
* [type](/auto-docs/core/classes/SizeData.md#type-1)
* [version](/auto-docs/core/classes/SizeData.md#version)
* [width](/auto-docs/core/classes/SizeData.md#width)

### Methods

* [checkChanged](/auto-docs/core/classes/SizeData.md#checkchanged)
* [dispose](/auto-docs/core/classes/SizeData.md#dispose)
* [fireChange](/auto-docs/core/classes/SizeData.md#firechange)
* [fireWillChange](/auto-docs/core/classes/SizeData.md#firewillchange)
* [fromJSON](/auto-docs/core/classes/SizeData.md#fromjson)
* [fullyUpdate](/auto-docs/core/classes/SizeData.md#fullyupdate)
* [getDefaultData](/auto-docs/core/classes/SizeData.md#getdefaultdata)
* [toJSON](/auto-docs/core/classes/SizeData.md#tojson)
* [update](/auto-docs/core/classes/SizeData.md#update)

## Constructors

### constructor

**new SizeData**(`entity`, `opts?`)

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

`Readonly` **onDataChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[onDataChange](/auto-docs/core/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md), {}>>

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

`Static` **type**: `string` = `'SizeData'`

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

### height

`get` **height**(): `number`

#### Returns

`number`

#### Implementation of

[SizeSchema](/auto-docs/core/interfaces/SizeSchema-1.md).[height](/auto-docs/core/interfaces/SizeSchema-1.md#height)

`set` **height**(`height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `height` | `number` |

#### Returns

`void`

#### Implementation of

[SizeSchema](/auto-docs/core/interfaces/SizeSchema-1.md).[height](/auto-docs/core/interfaces/SizeSchema-1.md#height)

***

### locked

`get` **locked**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[SizeSchema](/auto-docs/core/interfaces/SizeSchema-1.md).[locked](/auto-docs/core/interfaces/SizeSchema-1.md#locked)

`set` **locked**(`locked`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `locked` | `boolean` |

#### Returns

`void`

#### Implementation of

[SizeSchema](/auto-docs/core/interfaces/SizeSchema-1.md).[locked](/auto-docs/core/interfaces/SizeSchema-1.md#locked)

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

### width

`get` **width**(): `number`

#### Returns

`number`

#### Implementation of

[SizeSchema](/auto-docs/core/interfaces/SizeSchema-1.md).[width](/auto-docs/core/interfaces/SizeSchema-1.md#width)

`set` **width**(`width`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |

#### Returns

`void`

#### Implementation of

[SizeSchema](/auto-docs/core/interfaces/SizeSchema-1.md).[width](/auto-docs/core/interfaces/SizeSchema-1.md#width)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md) | `Partial`<[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)> |

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
| `props` | [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[fullyUpdate](/auto-docs/core/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

初始化数据

#### Returns

[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

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
| `props` | [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md) | `Partial`<[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)> | keyof [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[update](/auto-docs/core/classes/EntityData.md#update)
