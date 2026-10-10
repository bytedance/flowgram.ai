# Class: TransformData

实体的数据块

## Hierarchy

* [`EntityData`](/auto-docs/core/classes/EntityData.md)<[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)>

  ↳ **`TransformData`**

## Implements

* [`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/core/classes/TransformData-1.md#constructor)

### Properties

* [entity](/auto-docs/core/classes/TransformData-1.md#entity)
* [onDataChange](/auto-docs/core/classes/TransformData-1.md#ondatachange)
* [onWillChange](/auto-docs/core/classes/TransformData-1.md#onwillchange)
* [opts](/auto-docs/core/classes/TransformData-1.md#opts)
* [sizeToScale](/auto-docs/core/classes/TransformData-1.md#sizetoscale)
* [toDispose](/auto-docs/core/classes/TransformData-1.md#todispose)
* [type](/auto-docs/core/classes/TransformData-1.md#type)

### Accessors

* [bounds](/auto-docs/core/classes/TransformData-1.md#bounds)
* [boundsWithoutRotation](/auto-docs/core/classes/TransformData-1.md#boundswithoutrotation)
* [changeLocked](/auto-docs/core/classes/TransformData-1.md#changelocked)
* [children](/auto-docs/core/classes/TransformData-1.md#children)
* [data](/auto-docs/core/classes/TransformData-1.md#data)
* [disposed](/auto-docs/core/classes/TransformData-1.md#disposed)
* [isContainer](/auto-docs/core/classes/TransformData-1.md#iscontainer)
* [localBounds](/auto-docs/core/classes/TransformData-1.md#localbounds)
* [localID](/auto-docs/core/classes/TransformData-1.md#localid)
* [localOrigin](/auto-docs/core/classes/TransformData-1.md#localorigin)
* [localSize](/auto-docs/core/classes/TransformData-1.md#localsize)
* [localTransform](/auto-docs/core/classes/TransformData-1.md#localtransform)
* [onDispose](/auto-docs/core/classes/TransformData-1.md#ondispose)
* [origin](/auto-docs/core/classes/TransformData-1.md#origin)
* [parent](/auto-docs/core/classes/TransformData-1.md#parent)
* [position](/auto-docs/core/classes/TransformData-1.md#position)
* [rotation](/auto-docs/core/classes/TransformData-1.md#rotation)
* [scale](/auto-docs/core/classes/TransformData-1.md#scale)
* [size](/auto-docs/core/classes/TransformData-1.md#size)
* [skew](/auto-docs/core/classes/TransformData-1.md#skew)
* [type](/auto-docs/core/classes/TransformData-1.md#type-1)
* [version](/auto-docs/core/classes/TransformData-1.md#version)
* [worldDegree](/auto-docs/core/classes/TransformData-1.md#worlddegree)
* [worldID](/auto-docs/core/classes/TransformData-1.md#worldid)
* [worldOrigin](/auto-docs/core/classes/TransformData-1.md#worldorigin)
* [worldRotation](/auto-docs/core/classes/TransformData-1.md#worldrotation)
* [worldScale](/auto-docs/core/classes/TransformData-1.md#worldscale)
* [worldSize](/auto-docs/core/classes/TransformData-1.md#worldsize)
* [worldTransform](/auto-docs/core/classes/TransformData-1.md#worldtransform)

### Methods

* [checkChanged](/auto-docs/core/classes/TransformData-1.md#checkchanged)
* [clearChildren](/auto-docs/core/classes/TransformData-1.md#clearchildren)
* [contains](/auto-docs/core/classes/TransformData-1.md#contains)
* [dispose](/auto-docs/core/classes/TransformData-1.md#dispose)
* [fireChange](/auto-docs/core/classes/TransformData-1.md#firechange)
* [fireWillChange](/auto-docs/core/classes/TransformData-1.md#firewillchange)
* [fromJSON](/auto-docs/core/classes/TransformData-1.md#fromjson)
* [fullyUpdate](/auto-docs/core/classes/TransformData-1.md#fullyupdate)
* [getDefaultData](/auto-docs/core/classes/TransformData-1.md#getdefaultdata)
* [getMutationCache](/auto-docs/core/classes/TransformData-1.md#getmutationcache)
* [heightToScaleY](/auto-docs/core/classes/TransformData-1.md#heighttoscaley)
* [intersects](/auto-docs/core/classes/TransformData-1.md#intersects)
* [isParent](/auto-docs/core/classes/TransformData-1.md#isparent)
* [isParentTransform](/auto-docs/core/classes/TransformData-1.md#isparenttransform)
* [setFromMatrix](/auto-docs/core/classes/TransformData-1.md#setfrommatrix)
* [setParent](/auto-docs/core/classes/TransformData-1.md#setparent)
* [sizeToScaleValue](/auto-docs/core/classes/TransformData-1.md#sizetoscalevalue)
* [toJSON](/auto-docs/core/classes/TransformData-1.md#tojson)
* [update](/auto-docs/core/classes/TransformData-1.md#update)
* [widthToScaleX](/auto-docs/core/classes/TransformData-1.md#widthtoscalex)

## Constructors

### constructor

**new TransformData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)> |

#### Overrides

[EntityData](/auto-docs/core/classes/EntityData.md).[constructor](/auto-docs/core/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/auto-docs/core/classes/Entity-1.md)<[`EntityOpts`](/auto-docs/core/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[entity](/auto-docs/core/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[onDataChange](/auto-docs/core/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: `Event`<[`EntityData`](/auto-docs/core/classes/EntityData.md)<[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[onWillChange](/auto-docs/core/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[opts](/auto-docs/core/classes/EntityData.md#opts)

***

### sizeToScale

**sizeToScale**: `boolean` = `false`

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[toDispose](/auto-docs/core/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string` = `'TransformData'`

#### Overrides

[EntityData](/auto-docs/core/classes/EntityData.md).[type](/auto-docs/core/classes/EntityData.md#type)

## Accessors

### bounds

`get` **bounds**(): `Rectangle`

#### Returns

`Rectangle`

***

### boundsWithoutRotation

`get` **boundsWithoutRotation**(): `Rectangle`

不旋转的 bounds

#### Returns

`Rectangle`

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

`get` **children**(): [`TransformData`](/auto-docs/core/classes/TransformData-1.md)\[]

#### Returns

[`TransformData`](/auto-docs/core/classes/TransformData-1.md)\[]

***

### data

`get` **data**(): [`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)

当前数据

#### Returns

[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)

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

`get` **localBounds**(): `Rectangle`

本地 bounds

#### Returns

`Rectangle`

***

### localID

`get` **localID**(): `number`

#### Returns

`number`

***

### localOrigin

`get` **localOrigin**(): [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

***

### localSize

`get` **localSize**(): [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

本身的大小

#### Returns

[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

***

### localTransform

`get` **localTransform**(): `Matrix`

#### Returns

`Matrix`

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

***

### origin

`get` **origin**(): [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)

#### Returns

[`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md)

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[origin](/auto-docs/core/interfaces/TransformSchema-1.md#origin)

`set` **origin**(`origin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `origin` | [`OriginSchema`](/auto-docs/core/interfaces/OriginSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[origin](/auto-docs/core/interfaces/TransformSchema-1.md#origin)

***

### parent

`get` **parent**(): `undefined` | [`TransformData`](/auto-docs/core/classes/TransformData-1.md)

#### Returns

`undefined` | [`TransformData`](/auto-docs/core/classes/TransformData-1.md)

***

### position

`get` **position**(): [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[position](/auto-docs/core/interfaces/TransformSchema-1.md#position)

`set` **position**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[position](/auto-docs/core/interfaces/TransformSchema-1.md#position)

***

### rotation

`get` **rotation**(): `number`

#### Returns

`number`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[rotation](/auto-docs/core/interfaces/TransformSchema-1.md#rotation)

`set` **rotation**(`rotation`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

`void`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[rotation](/auto-docs/core/interfaces/TransformSchema-1.md#rotation)

***

### scale

`get` **scale**(): [`ScaleSchema`](/auto-docs/core/interfaces/ScaleSchema.md)

#### Returns

[`ScaleSchema`](/auto-docs/core/interfaces/ScaleSchema.md)

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[scale](/auto-docs/core/interfaces/TransformSchema-1.md#scale)

`set` **scale**(`scale`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scale` | [`ScaleSchema`](/auto-docs/core/interfaces/ScaleSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[scale](/auto-docs/core/interfaces/TransformSchema-1.md#scale)

***

### size

`get` **size**(): [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

#### Returns

[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[size](/auto-docs/core/interfaces/TransformSchema-1.md#size)

`set` **size**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[size](/auto-docs/core/interfaces/TransformSchema-1.md#size)

***

### skew

`get` **skew**(): [`SkewSchema`](/auto-docs/core/interfaces/SkewSchema.md)

#### Returns

[`SkewSchema`](/auto-docs/core/interfaces/SkewSchema.md)

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[skew](/auto-docs/core/interfaces/TransformSchema-1.md#skew)

`set` **skew**(`skew`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `skew` | [`SkewSchema`](/auto-docs/core/interfaces/SkewSchema.md) |

#### Returns

`void`

#### Implementation of

[TransformSchema](/auto-docs/core/interfaces/TransformSchema-1.md).[skew](/auto-docs/core/interfaces/TransformSchema-1.md#skew)

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

`get` **worldOrigin**(): [`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

全局的原点位置

#### Returns

[`PositionSchema`](/auto-docs/core/interfaces/PositionSchema.md)

***

### worldRotation

`get` **worldRotation**(): `number`

全局的 rotation

#### Returns

`number`

***

### worldScale

`get` **worldScale**(): [`ScaleSchema`](/auto-docs/core/interfaces/ScaleSchema.md)

全局的 scale

#### Returns

[`ScaleSchema`](/auto-docs/core/interfaces/ScaleSchema.md)

***

### worldSize

`get` **worldSize**(): [`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

#### Returns

[`SizeSchema`](/auto-docs/core/interfaces/SizeSchema-1.md)

***

### worldTransform

`get` **worldTransform**(): `Matrix`

#### Returns

`Matrix`

## Methods

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md) | `Partial`<[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[checkChanged](/auto-docs/core/classes/EntityData.md#checkchanged)

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

[EntityData](/auto-docs/core/classes/EntityData.md).[dispose](/auto-docs/core/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Overrides

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
| `props` | [`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/core/classes/EntityData.md).[fullyUpdate](/auto-docs/core/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)

初始化数据

#### Returns

[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)

#### Overrides

[EntityData](/auto-docs/core/classes/EntityData.md).[getDefaultData](/auto-docs/core/classes/EntityData.md#getdefaultdata)

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
| `rect` | `Rectangle` |

#### Returns

`boolean`

***

### isParent

**isParent**(`parent`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`TransformData`](/auto-docs/core/classes/TransformData-1.md) |

#### Returns

`boolean`

***

### isParentTransform

**isParentTransform**(`parent?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | [`TransformData`](/auto-docs/core/classes/TransformData-1.md) |

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
| `matrix` | `Matrix` |

#### Returns

`void`

***

### setParent

**setParent**(`parent`, `listenParentData?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `parent` | `undefined` | [`TransformData`](/auto-docs/core/classes/TransformData-1.md) | `undefined` |
| `listenParentData` | `boolean` | `true` |

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

[EntityData](/auto-docs/core/classes/EntityData.md).[toJSON](/auto-docs/core/classes/EntityData.md#tojson)

***

### update

**update**(`data`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Partial`<[`TransformSchema`](/auto-docs/core/interfaces/TransformSchema-1.md)> |

#### Returns

`void`

#### Overrides

[EntityData](/auto-docs/core/classes/EntityData.md).[update](/auto-docs/core/classes/EntityData.md#update)

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
