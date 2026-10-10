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

  ↳↳ [`OpacityData`](/en/auto-docs/playground-react/classes/OpacityData.md)

  ↳↳ [`OriginData`](/en/auto-docs/playground-react/classes/OriginData.md)

  ↳↳ [`PositionData`](/en/auto-docs/playground-react/classes/PositionData.md)

  ↳↳ [`RotationData`](/en/auto-docs/playground-react/classes/RotationData.md)

  ↳↳ [`ScaleData`](/en/auto-docs/playground-react/classes/ScaleData.md)

  ↳↳ [`SizeData`](/en/auto-docs/playground-react/classes/SizeData.md)

  ↳↳ [`SkewData`](/en/auto-docs/playground-react/classes/SkewData.md)

  ↳↳ [`TransformData`](/en/auto-docs/playground-react/classes/TransformData-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/EntityData.md#constructor)

### Properties

* [entity](/en/auto-docs/playground-react/classes/EntityData.md#entity)
* [onDataChange](/en/auto-docs/playground-react/classes/EntityData.md#ondatachange)
* [onWillChange](/en/auto-docs/playground-react/classes/EntityData.md#onwillchange)
* [opts](/en/auto-docs/playground-react/classes/EntityData.md#opts)
* [toDispose](/en/auto-docs/playground-react/classes/EntityData.md#todispose)
* [type](/en/auto-docs/playground-react/classes/EntityData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/playground-react/classes/EntityData.md#changelocked)
* [data](/en/auto-docs/playground-react/classes/EntityData.md#data)
* [disposed](/en/auto-docs/playground-react/classes/EntityData.md#disposed)
* [onDispose](/en/auto-docs/playground-react/classes/EntityData.md#ondispose)
* [type](/en/auto-docs/playground-react/classes/EntityData.md#type-1)
* [version](/en/auto-docs/playground-react/classes/EntityData.md#version)

### Methods

* [checkChanged](/en/auto-docs/playground-react/classes/EntityData.md#checkchanged)
* [dispose](/en/auto-docs/playground-react/classes/EntityData.md#dispose)
* [fireChange](/en/auto-docs/playground-react/classes/EntityData.md#firechange)
* [fireWillChange](/en/auto-docs/playground-react/classes/EntityData.md#firewillchange)
* [fromJSON](/en/auto-docs/playground-react/classes/EntityData.md#fromjson)
* [fullyUpdate](/en/auto-docs/playground-react/classes/EntityData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/playground-react/classes/EntityData.md#getdefaultdata)
* [toJSON](/en/auto-docs/playground-react/classes/EntityData.md#tojson)
* [update](/en/auto-docs/playground-react/classes/EntityData.md#update)

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
| `entity` | [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)> |
| `opts?` | `OPTS` |

#### Overrides

DisposableImpl.constructor

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)>

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/playground-react/classes/EntityData.md)<`DATA`, `OPTS`>>

修改后触发

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/playground-react/classes/EntityData.md)<`DATA`, `OPTS`>>

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

`Static` **type**: `string`

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

`get` **onDispose**(): [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

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
