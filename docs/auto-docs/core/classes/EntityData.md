# Class: EntityData\<DATA, OPTS>

实体的数据块

## Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | `any` | `number` | `string` |
| `OPTS` | extends `Object` = {} |

## Hierarchy

* `DisposableImpl`

  ↳ **`EntityData`**

  ↳↳ [`OriginData`](/auto-docs/core/classes/OriginData.md)

  ↳↳ [`OpacityData`](/auto-docs/core/classes/OpacityData.md)

  ↳↳ [`PositionData`](/auto-docs/core/classes/PositionData.md)

  ↳↳ [`RotationData`](/auto-docs/core/classes/RotationData.md)

  ↳↳ [`ScaleData`](/auto-docs/core/classes/ScaleData.md)

  ↳↳ [`SizeData`](/auto-docs/core/classes/SizeData.md)

  ↳↳ [`SkewData`](/auto-docs/core/classes/SkewData.md)

  ↳↳ [`TransformData`](/auto-docs/core/classes/TransformData-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/EntityData.md#constructor)

### Properties

* [entity](/auto-docs/core/classes/EntityData.md#entity)
* [onDataChange](/auto-docs/core/classes/EntityData.md#ondatachange)
* [onWillChange](/auto-docs/core/classes/EntityData.md#onwillchange)
* [opts](/auto-docs/core/classes/EntityData.md#opts)
* [toDispose](/auto-docs/core/classes/EntityData.md#todispose)
* [type](/auto-docs/core/classes/EntityData.md#type)

### Accessors

* [changeLocked](/auto-docs/core/classes/EntityData.md#changelocked)
* [data](/auto-docs/core/classes/EntityData.md#data)
* [disposed](/auto-docs/core/classes/EntityData.md#disposed)
* [onDispose](/auto-docs/core/classes/EntityData.md#ondispose)
* [type](/auto-docs/core/classes/EntityData.md#type-1)
* [version](/auto-docs/core/classes/EntityData.md#version)

### Methods

* [checkChanged](/auto-docs/core/classes/EntityData.md#checkchanged)
* [dispose](/auto-docs/core/classes/EntityData.md#dispose)
* [fireChange](/auto-docs/core/classes/EntityData.md#firechange)
* [fireWillChange](/auto-docs/core/classes/EntityData.md#firewillchange)
* [fromJSON](/auto-docs/core/classes/EntityData.md#fromjson)
* [fullyUpdate](/auto-docs/core/classes/EntityData.md#fullyupdate)
* [getDefaultData](/auto-docs/core/classes/EntityData.md#getdefaultdata)
* [toJSON](/auto-docs/core/classes/EntityData.md#tojson)
* [update](/auto-docs/core/classes/EntityData.md#update)

## Constructors

### constructor

**new EntityData**<`DATA`, `OPTS`>(`entity`, `opts?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | `any` |
| `OPTS` | extends `Object` = {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)> |
| `opts?` | `OPTS` |

#### Overrides

DisposableImpl.constructor

## Properties

### entity

**entity**: [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`DATA`, `OPTS`>>

修改后触发

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<`DATA`, `OPTS`>>

修改前触发

***

### opts

`Optional` `Readonly` **opts**: `OPTS`

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

DisposableImpl.toDispose

***

### type

`Static` **type**: `string` = `'EntityData'`

## Accessors

### changeLocked

`get` **changeLocked**(): `boolean`

#### Returns

`boolean`

`set` **changeLocked**(`p`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `boolean` |

#### Returns

`void`

***

### data

`get` **data**(): `DATA`

当前数据

#### Returns

`DATA`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

DisposableImpl.disposed

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

DisposableImpl.onDispose

***

### type

`get` **type**(): `string`

data 类型

#### Returns

`string`

***

### version

`get` **version**(): `number`

#### Returns

`number`

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | `DATA` | `Partial`<`DATA`> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

DisposableImpl.dispose

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

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

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `DATA` |

#### Returns

`void`

***

### getDefaultData

`Abstract` **getDefaultData**(): `DATA`

初始化数据

#### Returns

`DATA`

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `DATA` | `Partial`<`DATA`> | keyof `DATA` |
| `value?` | `any` |

#### Returns

`void`
