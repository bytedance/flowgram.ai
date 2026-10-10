# Class: RotationData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/en/auto-docs/playground-react/classes/EntityData.md)<[`RotationSchema`](/en/auto-docs/playground-react/types/RotationSchema.md)>

  ↳ **`RotationData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/playground-react/classes/RotationData.md#constructor)

### Properties

* [entity](/en/auto-docs/playground-react/classes/RotationData.md#entity)
* [onDataChange](/en/auto-docs/playground-react/classes/RotationData.md#ondatachange)
* [onWillChange](/en/auto-docs/playground-react/classes/RotationData.md#onwillchange)
* [opts](/en/auto-docs/playground-react/classes/RotationData.md#opts)
* [toDispose](/en/auto-docs/playground-react/classes/RotationData.md#todispose)
* [type](/en/auto-docs/playground-react/classes/RotationData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/playground-react/classes/RotationData.md#changelocked)
* [data](/en/auto-docs/playground-react/classes/RotationData.md#data)
* [disposed](/en/auto-docs/playground-react/classes/RotationData.md#disposed)
* [onDispose](/en/auto-docs/playground-react/classes/RotationData.md#ondispose)
* [type](/en/auto-docs/playground-react/classes/RotationData.md#type-1)
* [version](/en/auto-docs/playground-react/classes/RotationData.md#version)

### Methods

* [checkChanged](/en/auto-docs/playground-react/classes/RotationData.md#checkchanged)
* [dispose](/en/auto-docs/playground-react/classes/RotationData.md#dispose)
* [fireChange](/en/auto-docs/playground-react/classes/RotationData.md#firechange)
* [fireWillChange](/en/auto-docs/playground-react/classes/RotationData.md#firewillchange)
* [fromJSON](/en/auto-docs/playground-react/classes/RotationData.md#fromjson)
* [fullyUpdate](/en/auto-docs/playground-react/classes/RotationData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/playground-react/classes/RotationData.md#getdefaultdata)
* [toJSON](/en/auto-docs/playground-react/classes/RotationData.md#tojson)
* [update](/en/auto-docs/playground-react/classes/RotationData.md#update)

## Constructors

### constructor

**new RotationData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[constructor](/en/auto-docs/playground-react/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/playground-react/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/playground-react/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[entity](/en/auto-docs/playground-react/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/playground-react/classes/EntityData.md)<`number`, {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[onDataChange](/en/auto-docs/playground-react/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/playground-react/classes/EntityData.md)<`number`, {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[onWillChange](/en/auto-docs/playground-react/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[opts](/en/auto-docs/playground-react/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[toDispose](/en/auto-docs/playground-react/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[type](/en/auto-docs/playground-react/classes/EntityData.md#type)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/playground-react/interfaces/Event-1.md)<`void`>

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

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | `number` |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[checkChanged](/en/auto-docs/playground-react/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[dispose](/en/auto-docs/playground-react/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[fireChange](/en/auto-docs/playground-react/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[fireWillChange](/en/auto-docs/playground-react/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[fromJSON](/en/auto-docs/playground-react/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `number` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[fullyUpdate](/en/auto-docs/playground-react/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): `number`

初始化数据

#### Returns

`number`

#### Overrides

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[getDefaultData](/en/auto-docs/playground-react/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[toJSON](/en/auto-docs/playground-react/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `number` | `"toString"` | `"toFixed"` | `"toExponential"` | `"toPrecision"` | `"valueOf"` | `"toLocaleString"` |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/playground-react/classes/EntityData.md).[update](/en/auto-docs/playground-react/classes/EntityData.md#update)
