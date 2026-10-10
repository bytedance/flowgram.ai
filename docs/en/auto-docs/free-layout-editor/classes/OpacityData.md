# Class: OpacityData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`OpacitySchema`](/en/auto-docs/free-layout-editor/types/OpacitySchema.md)>

  ↳ **`OpacityData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/OpacityData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-editor/classes/OpacityData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/OpacityData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-editor/classes/OpacityData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-editor/classes/OpacityData.md#opts)
* [toDispose](/en/auto-docs/free-layout-editor/classes/OpacityData.md#todispose)
* [type](/en/auto-docs/free-layout-editor/classes/OpacityData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/free-layout-editor/classes/OpacityData.md#changelocked)
* [data](/en/auto-docs/free-layout-editor/classes/OpacityData.md#data)
* [disposed](/en/auto-docs/free-layout-editor/classes/OpacityData.md#disposed)
* [onDispose](/en/auto-docs/free-layout-editor/classes/OpacityData.md#ondispose)
* [type](/en/auto-docs/free-layout-editor/classes/OpacityData.md#type-1)
* [version](/en/auto-docs/free-layout-editor/classes/OpacityData.md#version)

### Methods

* [checkChanged](/en/auto-docs/free-layout-editor/classes/OpacityData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-editor/classes/OpacityData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-editor/classes/OpacityData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-editor/classes/OpacityData.md#firewillchange)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/OpacityData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-editor/classes/OpacityData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-editor/classes/OpacityData.md#getdefaultdata)
* [toJSON](/en/auto-docs/free-layout-editor/classes/OpacityData.md#tojson)
* [update](/en/auto-docs/free-layout-editor/classes/OpacityData.md#update)

## Constructors

### constructor

**new OpacityData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)> |
| `opts?` | `Object` |

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/free-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/free-layout-editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`number`, {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<`number`, {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/free-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[toDispose](/en/auto-docs/free-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[type](/en/auto-docs/free-layout-editor/classes/EntityData.md#type)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

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

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[checkChanged](/en/auto-docs/free-layout-editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[dispose](/en/auto-docs/free-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fireChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fireWillChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/EntityData.md#fromjson)

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

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): `number`

初始化数据

#### Returns

`number`

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[toJSON](/en/auto-docs/free-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `number` | `"toFixed"` | `"toExponential"` | `"toPrecision"` | `"toString"` | `"valueOf"` | `"toLocaleString"` |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[update](/en/auto-docs/free-layout-editor/classes/EntityData.md#update)
