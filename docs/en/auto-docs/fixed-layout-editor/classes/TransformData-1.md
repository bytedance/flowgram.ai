# Class: TransformData

Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
SPDX-License-Identifier: MIT

## Hierarchy

* [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)>

  ↳ **`TransformData`**

## Implements

* [`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#constructor)

### Properties

* [entity](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#entity)
* [onDataChange](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#ondatachange)
* [onWillChange](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#onwillchange)
* [opts](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#opts)
* [sizeToScale](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#sizetoscale)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#todispose)
* [type](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#type)

### Accessors

* [bounds](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#bounds)
* [boundsWithoutRotation](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#boundswithoutrotation)
* [changeLocked](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#changelocked)
* [children](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#children)
* [data](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#data)
* [disposed](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#disposed)
* [isContainer](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#iscontainer)
* [localBounds](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#localbounds)
* [localID](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#localid)
* [localOrigin](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#localorigin)
* [localSize](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#localsize)
* [localTransform](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#localtransform)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#ondispose)
* [origin](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#origin)
* [parent](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#parent)
* [position](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#position)
* [rotation](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#rotation)
* [scale](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#scale)
* [size](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#size)
* [skew](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#skew)
* [type](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#type-1)
* [version](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#version)
* [worldDegree](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worlddegree)
* [worldID](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worldid)
* [worldOrigin](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worldorigin)
* [worldRotation](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worldrotation)
* [worldScale](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worldscale)
* [worldSize](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worldsize)
* [worldTransform](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#worldtransform)

### Methods

* [checkChanged](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#checkchanged)
* [clearChildren](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#clearchildren)
* [contains](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#contains)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#dispose)
* [fireChange](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#firechange)
* [fireWillChange](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#firewillchange)
* [fromJSON](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#fromjson)
* [fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#fullyupdate)
* [getDefaultData](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#getdefaultdata)
* [getMutationCache](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#getmutationcache)
* [heightToScaleY](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#heighttoscaley)
* [intersects](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#intersects)
* [isParent](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#isparent)
* [isParentTransform](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#isparenttransform)
* [setFromMatrix](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#setfrommatrix)
* [setParent](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#setparent)
* [sizeToScaleValue](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#sizetoscalevalue)
* [toJSON](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#tojson)
* [update](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#update)
* [widthToScaleX](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md#widthtoscalex)

## Constructors

### constructor

**new TransformData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)> |

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)

***

### sizeToScale

**sizeToScale**: `boolean`

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[toDispose](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[type](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#type)

## Accessors

### bounds

`get` **bounds**(): [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

***

### boundsWithoutRotation

`get` **boundsWithoutRotation**(): [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

不旋转的 bounds

#### Returns

[`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

***

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

### children

`get` **children**(): [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md)\[]

#### Returns

[`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md)\[]

***

### data

`get` **data**(): [`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)

当前数据

#### Returns

[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)

#### Overrides

EntityData.data

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.disposed

***

### isContainer

`get` **isContainer**(): `boolean`

容器选择框会动态计算子节点大小

#### Returns

`boolean`

***

### localBounds

`get` **localBounds**(): [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

本地 bounds

#### Returns

[`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

***

### localID

`get` **localID**(): `number`

#### Returns

`number`

***

### localOrigin

`get` **localOrigin**(): [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

***

### localSize

`get` **localSize**(): [`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

本身的大小

#### Returns

[`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

***

### localTransform

`get` **localTransform**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### origin

`get` **origin**(): [`OriginSchema`](/en/auto-docs/fixed-layout-editor/interfaces/OriginSchema.md)

#### Returns

[`OriginSchema`](/en/auto-docs/fixed-layout-editor/interfaces/OriginSchema.md)

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[origin](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#origin)

`set` **origin**(`origin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`OriginSchema`](/en/auto-docs/fixed-layout-editor/interfaces/OriginSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[origin](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#origin)

***

### parent

`get` **parent**(): `undefined` | [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md)

#### Returns

`undefined` | [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md)

***

### position

`get` **position**(): [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[position](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#position)

`set` **position**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[position](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#position)

***

### rotation

`get` **rotation**(): `number`

#### Returns

`number`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[rotation](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#rotation)

`set` **rotation**(`rotation`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

`void`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[rotation](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#rotation)

***

### scale

`get` **scale**(): [`ScaleSchema`](/en/auto-docs/fixed-layout-editor/interfaces/ScaleSchema.md)

#### Returns

[`ScaleSchema`](/en/auto-docs/fixed-layout-editor/interfaces/ScaleSchema.md)

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[scale](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#scale)

`set` **scale**(`scale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | [`ScaleSchema`](/en/auto-docs/fixed-layout-editor/interfaces/ScaleSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[scale](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#scale)

***

### size

`get` **size**(): [`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

#### Returns

[`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[size](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#size)

`set` **size**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[size](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#size)

***

### skew

`get` **skew**(): [`SkewSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)

#### Returns

[`SkewSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md)

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[skew](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#skew)

`set` **skew**(`skew`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `skew` | [`SkewSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SkewSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md).[skew](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md#skew)

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

### worldDegree

`get` **worldDegree**(): `number`

全局的角度

#### Returns

`number`

***

### worldID

`get` **worldID**(): `number`

#### Returns

`number`

***

### worldOrigin

`get` **worldOrigin**(): [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

全局的原点位置

#### Returns

[`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

***

### worldRotation

`get` **worldRotation**(): `number`

全局的 rotation

#### Returns

`number`

***

### worldScale

`get` **worldScale**(): [`ScaleSchema`](/en/auto-docs/fixed-layout-editor/interfaces/ScaleSchema.md)

全局的 scale

#### Returns

[`ScaleSchema`](/en/auto-docs/fixed-layout-editor/interfaces/ScaleSchema.md)

***

### worldSize

`get` **worldSize**(): [`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

#### Returns

[`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

***

### worldTransform

`get` **worldTransform**(): [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

#### Returns

[`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md)

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md) | `Partial`<[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[checkChanged](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#checkchanged)

***

### clearChildren

**clearChildren**(): `void`

#### Returns

`void`

***

### contains

**contains**(`x`, `y`, `asCircle?`): `boolean`

判断是否包含点

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `number` |  |
| `y` | `number` |  |
| `asCircle?` | `boolean` | 以圆形来算，TODO 目前不支持椭圆形 |

#### Returns

`boolean`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireWillChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fromJSON](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)

初始化数据

#### Returns

[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)

***

### getMutationCache

**getMutationCache**<`T`>(`key`, `fn`): `T`

缓存计算, 缓存只能针对 local, world 加缓存会出问题

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `fn` | () => `T` |

#### Returns

`T`

***

### heightToScaleY

**heightToScaleY**(`height`, `isWorldSize?`): `number`

绝对高转换成 scale，用于图片等无法修改大小的场景

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `height` | `number` | - |
| `isWorldSize?` | `boolean` | 是否为绝对大小 |

#### Returns

`number`

***

### intersects

**intersects**(`rect`): `boolean`

判断矩形碰撞

#### Parameters

| Name | Type |
| :------ | :------ |
| `rect` | [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md) |

#### Returns

`boolean`

***

### isParent

**isParent**(`parent`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md) |

#### Returns

`boolean`

***

### isParentTransform

**isParentTransform**(`parent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md) |

#### Returns

`boolean`

***

### setFromMatrix

**setFromMatrix**(`matrix`): `void`

Decomposes a matrix and sets the transforms properties based on it.

matrix - The matrix to decompose

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | [`Matrix`](/en/auto-docs/fixed-layout-editor/classes/Matrix.md) |

#### Returns

`void`

***

### setParent

**setParent**(`parent`, `listenParentData?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | `undefined` | [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md) |
| `listenParentData?` | `boolean` |

#### Returns

`void`

***

### sizeToScaleValue

**sizeToScaleValue**(`size`, `isWorldSize?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `Object` |
| `size.height` | `number` |
| `size.width` | `number` |
| `isWorldSize?` | `boolean` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[toJSON](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`data`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`TransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/TransformSchema-1.md)> |

#### Returns

`void`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[update](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#update)

***

### widthToScaleX

**widthToScaleX**(`width`, `isWorldSize?`): `number`

宽转换成 scale，用于图片等无法修改大小的场景

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | - |
| `isWorldSize?` | `boolean` | 是否为绝对大小 |

#### Returns

`number`
