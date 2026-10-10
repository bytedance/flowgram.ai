# Class: EntityData\<DATA, OPTS>

实体的数据块

## Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | `any` | `number` | `string` |
| `OPTS` | extends `Object` = {} |

## Hierarchy

* [`DisposableImpl`](/en/auto-docs/editor/classes/DisposableImpl.md)

  ↳ **`EntityData`**

  ↳↳ [`FlowNodeFormData`](/en/auto-docs/editor/classes/FlowNodeFormData.md)

  ↳↳ [`OpacityData`](/en/auto-docs/editor/classes/OpacityData.md)

  ↳↳ [`OriginData`](/en/auto-docs/editor/classes/OriginData.md)

  ↳↳ [`PositionData`](/en/auto-docs/editor/classes/PositionData.md)

  ↳↳ [`RotationData`](/en/auto-docs/editor/classes/RotationData.md)

  ↳↳ [`ScaleData`](/en/auto-docs/editor/classes/ScaleData.md)

  ↳↳ [`SizeData`](/en/auto-docs/editor/classes/SizeData.md)

  ↳↳ [`SkewData`](/en/auto-docs/editor/classes/SkewData.md)

  ↳↳ [`TransformData`](/en/auto-docs/editor/classes/TransformData-1.md)

  ↳↳ [`FlowNodeRenderData`](/en/auto-docs/editor/classes/FlowNodeRenderData.md)

  ↳↳ [`FlowNodeTransformData`](/en/auto-docs/editor/classes/FlowNodeTransformData.md)

  ↳↳ [`FlowNodeTransitionData`](/en/auto-docs/editor/classes/FlowNodeTransitionData.md)

  ↳↳ [`FlowNodeVariableData`](/en/auto-docs/editor/classes/FlowNodeVariableData.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/EntityData.md#constructor)

### Properties

* [entity](/en/auto-docs/editor/classes/EntityData.md#entity)
* [onDataChange](/en/auto-docs/editor/classes/EntityData.md#ondatachange)
* [onWillChange](/en/auto-docs/editor/classes/EntityData.md#onwillchange)
* [opts](/en/auto-docs/editor/classes/EntityData.md#opts)
* [toDispose](/en/auto-docs/editor/classes/EntityData.md#todispose)
* [type](/en/auto-docs/editor/classes/EntityData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/editor/classes/EntityData.md#changelocked)
* [data](/en/auto-docs/editor/classes/EntityData.md#data)
* [disposed](/en/auto-docs/editor/classes/EntityData.md#disposed)
* [onDispose](/en/auto-docs/editor/classes/EntityData.md#ondispose)
* [type](/en/auto-docs/editor/classes/EntityData.md#type-1)
* [version](/en/auto-docs/editor/classes/EntityData.md#version)

### Methods

* [checkChanged](/en/auto-docs/editor/classes/EntityData.md#checkchanged)
* [dispose](/en/auto-docs/editor/classes/EntityData.md#dispose)
* [fireChange](/en/auto-docs/editor/classes/EntityData.md#firechange)
* [fireWillChange](/en/auto-docs/editor/classes/EntityData.md#firewillchange)
* [fromJSON](/en/auto-docs/editor/classes/EntityData.md#fromjson)
* [fullyUpdate](/en/auto-docs/editor/classes/EntityData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/editor/classes/EntityData.md#getdefaultdata)
* [toJSON](/en/auto-docs/editor/classes/EntityData.md#tojson)
* [update](/en/auto-docs/editor/classes/EntityData.md#update)

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
| `entity` | [`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)> |
| `opts?` | `OPTS` |

#### Overrides

[DisposableImpl](/en/auto-docs/editor/classes/DisposableImpl.md).[constructor](/en/auto-docs/editor/classes/DisposableImpl.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/editor/interfaces/EntityOpts.md)>

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`DATA`, `OPTS`>>

修改后触发

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/editor/classes/EntityData.md)<`DATA`, `OPTS`>>

修改前触发

***

### opts

`Optional` `Readonly` **opts**: `OPTS`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

#### Inherited from

[DisposableImpl](/en/auto-docs/editor/classes/DisposableImpl.md).[toDispose](/en/auto-docs/editor/classes/DisposableImpl.md#todispose)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

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

[DisposableImpl](/en/auto-docs/editor/classes/DisposableImpl.md).[dispose](/en/auto-docs/editor/classes/DisposableImpl.md#dispose)

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
