# Class: EntityData\<DATA, OPTS>

实体的数据块

## Type parameters

| Name | Type |
| :------ | :------ |
| `DATA` | `any` | `number` | `string` |
| `OPTS` | extends `Object` = {} |

## Hierarchy

* [`DisposableImpl`](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md)

  ↳ **`EntityData`**

  ↳↳ [`FlowNodeFormData`](/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md)

  ↳↳ [`OpacityData`](/auto-docs/fixed-layout-editor/classes/OpacityData.md)

  ↳↳ [`OriginData`](/auto-docs/fixed-layout-editor/classes/OriginData.md)

  ↳↳ [`PositionData`](/auto-docs/fixed-layout-editor/classes/PositionData.md)

  ↳↳ [`RotationData`](/auto-docs/fixed-layout-editor/classes/RotationData.md)

  ↳↳ [`ScaleData`](/auto-docs/fixed-layout-editor/classes/ScaleData.md)

  ↳↳ [`SizeData`](/auto-docs/fixed-layout-editor/classes/SizeData.md)

  ↳↳ [`SkewData`](/auto-docs/fixed-layout-editor/classes/SkewData.md)

  ↳↳ [`TransformData`](/auto-docs/fixed-layout-editor/classes/TransformData-1.md)

  ↳↳ [`FlowNodeRenderData`](/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md)

  ↳↳ [`FlowNodeTransformData`](/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

  ↳↳ [`FlowNodeTransitionData`](/auto-docs/fixed-layout-editor/classes/FlowNodeTransitionData.md)

  ↳↳ [`FlowNodeVariableData`](/auto-docs/fixed-layout-editor/classes/FlowNodeVariableData.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/EntityData.md#constructor)

### Properties

* [entity](/auto-docs/fixed-layout-editor/classes/EntityData.md#entity)
* [onDataChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)
* [onWillChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)
* [opts](/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)
* [toDispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#todispose)
* [type](/auto-docs/fixed-layout-editor/classes/EntityData.md#type)

### Accessors

* [changeLocked](/auto-docs/fixed-layout-editor/classes/EntityData.md#changelocked)
* [data](/auto-docs/fixed-layout-editor/classes/EntityData.md#data)
* [disposed](/auto-docs/fixed-layout-editor/classes/EntityData.md#disposed)
* [onDispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#ondispose)
* [type](/auto-docs/fixed-layout-editor/classes/EntityData.md#type-1)
* [version](/auto-docs/fixed-layout-editor/classes/EntityData.md#version)

### Methods

* [checkChanged](/auto-docs/fixed-layout-editor/classes/EntityData.md#checkchanged)
* [dispose](/auto-docs/fixed-layout-editor/classes/EntityData.md#dispose)
* [fireChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#firechange)
* [fireWillChange](/auto-docs/fixed-layout-editor/classes/EntityData.md#firewillchange)
* [fromJSON](/auto-docs/fixed-layout-editor/classes/EntityData.md#fromjson)
* [fullyUpdate](/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)
* [getDefaultData](/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)
* [toJSON](/auto-docs/fixed-layout-editor/classes/EntityData.md#tojson)
* [update](/auto-docs/fixed-layout-editor/classes/EntityData.md#update)

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
| `entity` | [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> |
| `opts?` | `OPTS` |

#### Overrides

[DisposableImpl](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[constructor](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`DATA`, `OPTS`>>

修改后触发

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/fixed-layout-editor/classes/EntityData.md)<`DATA`, `OPTS`>>

修改前触发

***

### opts

`Optional` `Readonly` **opts**: `OPTS`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[DisposableImpl](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[toDispose](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#todispose)

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

`get` **onDispose**(): [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

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

[DisposableImpl](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md).[dispose](/auto-docs/fixed-layout-editor/classes/DisposableImpl.md#dispose)

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
