# Class: FlowNodeTransformData

实体的数据块

## Hierarchy

* [`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md)>

  ↳ **`FlowNodeTransformData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/editor/classes/FlowNodeTransformData.md#constructor)

### Properties

* [entity](/auto-docs/editor/classes/FlowNodeTransformData.md#entity)
* [localDirty](/auto-docs/editor/classes/FlowNodeTransformData.md#localdirty)
* [onDataChange](/auto-docs/editor/classes/FlowNodeTransformData.md#ondatachange)
* [onWillChange](/auto-docs/editor/classes/FlowNodeTransformData.md#onwillchange)
* [opts](/auto-docs/editor/classes/FlowNodeTransformData.md#opts)
* [renderState](/auto-docs/editor/classes/FlowNodeTransformData.md#renderstate)
* [toDispose](/auto-docs/editor/classes/FlowNodeTransformData.md#todispose)
* [transform](/auto-docs/editor/classes/FlowNodeTransformData.md#transform)
* [type](/auto-docs/editor/classes/FlowNodeTransformData.md#type)

### Accessors

* [bounds](/auto-docs/editor/classes/FlowNodeTransformData.md#bounds)
* [boundsWithPadding](/auto-docs/editor/classes/FlowNodeTransformData.md#boundswithpadding)
* [changeLocked](/auto-docs/editor/classes/FlowNodeTransformData.md#changelocked)
* [children](/auto-docs/editor/classes/FlowNodeTransformData.md#children)
* [collapsed](/auto-docs/editor/classes/FlowNodeTransformData.md#collapsed)
* [data](/auto-docs/editor/classes/FlowNodeTransformData.md#data)
* [defaultInputPoint](/auto-docs/editor/classes/FlowNodeTransformData.md#defaultinputpoint)
* [defaultOutputPoint](/auto-docs/editor/classes/FlowNodeTransformData.md#defaultoutputpoint)
* [disposed](/auto-docs/editor/classes/FlowNodeTransformData.md#disposed)
* [firstChild](/auto-docs/editor/classes/FlowNodeTransformData.md#firstchild)
* [inlineSpacingAfter](/auto-docs/editor/classes/FlowNodeTransformData.md#inlinespacingafter)
* [inlineSpacingPre](/auto-docs/editor/classes/FlowNodeTransformData.md#inlinespacingpre)
* [inputPoint](/auto-docs/editor/classes/FlowNodeTransformData.md#inputpoint)
* [isContainer](/auto-docs/editor/classes/FlowNodeTransformData.md#iscontainer)
* [isFirst](/auto-docs/editor/classes/FlowNodeTransformData.md#isfirst)
* [isLast](/auto-docs/editor/classes/FlowNodeTransformData.md#islast)
* [key](/auto-docs/editor/classes/FlowNodeTransformData.md#key)
* [lastChild](/auto-docs/editor/classes/FlowNodeTransformData.md#lastchild)
* [localBounds](/auto-docs/editor/classes/FlowNodeTransformData.md#localbounds)
* [minInlineBlockSpacing](/auto-docs/editor/classes/FlowNodeTransformData.md#mininlineblockspacing)
* [next](/auto-docs/editor/classes/FlowNodeTransformData.md#next)
* [onDispose](/auto-docs/editor/classes/FlowNodeTransformData.md#ondispose)
* [origin](/auto-docs/editor/classes/FlowNodeTransformData.md#origin)
* [originDeltaX](/auto-docs/editor/classes/FlowNodeTransformData.md#origindeltax)
* [originDeltaY](/auto-docs/editor/classes/FlowNodeTransformData.md#origindeltay)
* [originParent](/auto-docs/editor/classes/FlowNodeTransformData.md#originparent)
* [outputPoint](/auto-docs/editor/classes/FlowNodeTransformData.md#outputpoint)
* [padding](/auto-docs/editor/classes/FlowNodeTransformData.md#padding)
* [parent](/auto-docs/editor/classes/FlowNodeTransformData.md#parent)
* [position](/auto-docs/editor/classes/FlowNodeTransformData.md#position)
* [pre](/auto-docs/editor/classes/FlowNodeTransformData.md#pre)
* [size](/auto-docs/editor/classes/FlowNodeTransformData.md#size)
* [spacing](/auto-docs/editor/classes/FlowNodeTransformData.md#spacing)
* [type](/auto-docs/editor/classes/FlowNodeTransformData.md#type-1)
* [version](/auto-docs/editor/classes/FlowNodeTransformData.md#version)

### Methods

* [checkChanged](/auto-docs/editor/classes/FlowNodeTransformData.md#checkchanged)
* [dispose](/auto-docs/editor/classes/FlowNodeTransformData.md#dispose)
* [fireChange](/auto-docs/editor/classes/FlowNodeTransformData.md#firechange)
* [fireWillChange](/auto-docs/editor/classes/FlowNodeTransformData.md#firewillchange)
* [fromJSON](/auto-docs/editor/classes/FlowNodeTransformData.md#fromjson)
* [fullyUpdate](/auto-docs/editor/classes/FlowNodeTransformData.md#fullyupdate)
* [getDefaultData](/auto-docs/editor/classes/FlowNodeTransformData.md#getdefaultdata)
* [setParentTransform](/auto-docs/editor/classes/FlowNodeTransformData.md#setparenttransform)
* [toJSON](/auto-docs/editor/classes/FlowNodeTransformData.md#tojson)
* [update](/auto-docs/editor/classes/FlowNodeTransformData.md#update)

## Constructors

### constructor

**new FlowNodeTransformData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[constructor](/auto-docs/editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[entity](/auto-docs/editor/classes/EntityData.md#entity)

***

### localDirty

**localDirty**: `boolean`

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onDataChange](/auto-docs/editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/editor/classes/EntityData.md)<[`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[onWillChange](/auto-docs/editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[opts](/auto-docs/editor/classes/EntityData.md#opts)

***

### renderState

**renderState**: [`FlowNodeRenderData`](/auto-docs/editor/classes/FlowNodeRenderData.md)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[toDispose](/auto-docs/editor/classes/EntityData.md#todispose)

***

### transform

**transform**: [`TransformData`](/auto-docs/editor/classes/TransformData-1.md)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[type](/auto-docs/editor/classes/EntityData.md#type)

## Accessors

### bounds

`get` **bounds**(): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

绝对坐标 bbox, 不包含自身的 spacing(marginBottom), 但是包含 inlineSpacing 和 子节点的 spacing

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

***

### boundsWithPadding

`get` **boundsWithPadding**(): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

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

`get` **children**(): [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)\[]

#### Returns

[`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)\[]

***

### collapsed

`get` **collapsed**(): `boolean`

获取节点是否展开

#### Returns

`boolean`

`set` **collapsed**(`collapsed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `collapsed` | `boolean` |

#### Returns

`void`

***

### data

`get` **data**(): `DATA`

当前数据

#### Returns

`DATA`

#### Inherited from

EntityData.data

***

### defaultInputPoint

`get` **defaultInputPoint**(): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### defaultOutputPoint

`get` **defaultOutputPoint**(): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.disposed

***

### firstChild

`get` **firstChild**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### inlineSpacingAfter

`get` **inlineSpacingAfter**(): `number`

#### Returns

`number`

***

### inlineSpacingPre

`get` **inlineSpacingPre**(): `number`

#### Returns

`number`

***

### inputPoint

`get` **inputPoint**(): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### isContainer

`get` **isContainer**(): `boolean`

#### Returns

`boolean`

***

### isFirst

`get` **isFirst**(): `boolean`

#### Returns

`boolean`

***

### isLast

`get` **isLast**(): `boolean`

#### Returns

`boolean`

***

### key

`get` **key**(): `string`

#### Returns

`string`

***

### lastChild

`get` **lastChild**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### localBounds

`get` **localBounds**(): [`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

相对坐标 bbox, 这里的 localBounds 会加入 padding 一起算

#### Returns

[`Rectangle`](/auto-docs/editor/classes/Rectangle-1.md)

***

### minInlineBlockSpacing

`get` **minInlineBlockSpacing**(): `number`

#### Returns

`number`

***

### next

`get` **next**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

下一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### origin

`get` **origin**(): [`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)

#### Returns

[`OriginSchema`](/auto-docs/editor/interfaces/OriginSchema.md)

***

### originDeltaX

`get` **originDeltaX**(): `number`

原点的最左偏移

#### Returns

`number`

***

### originDeltaY

`get` **originDeltaY**(): `number`

原点 y 轴偏移

#### Returns

`number`

***

### originParent

`get` **originParent**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### outputPoint

`get` **outputPoint**(): [`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/auto-docs/editor/interfaces/IPoint.md)

***

### padding

`get` **padding**(): [`PaddingSchema`](/auto-docs/editor/interfaces/PaddingSchema-1.md)

#### Returns

[`PaddingSchema`](/auto-docs/editor/interfaces/PaddingSchema-1.md)

***

### parent

`get` **parent**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

parent 节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### position

`get` **position**(): [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md)

`set` **position**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`PositionSchema`](/auto-docs/editor/interfaces/PositionSchema.md) |

#### Returns

`void`

***

### pre

`get` **pre**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

上一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md)

***

### size

`get` **size**(): [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

获取节点的大小

#### Returns

[`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md)

`set` **size**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`SizeSchema`](/auto-docs/editor/interfaces/SizeSchema-1.md) |

#### Returns

`void`

***

### spacing

`get` **spacing**(): `number`

#### Returns

`number`

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
| `newProps` | [`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[checkChanged](/auto-docs/editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[dispose](/auto-docs/editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fireChange](/auto-docs/editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fireWillChange](/auto-docs/editor/classes/EntityData.md#firewillchange)

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

[EntityData](/auto-docs/editor/classes/EntityData.md).[fromJSON](/auto-docs/editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[fullyUpdate](/auto-docs/editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md)

初始化数据

#### Returns

[`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md)

#### Overrides

[EntityData](/auto-docs/editor/classes/EntityData.md).[getDefaultData](/auto-docs/editor/classes/EntityData.md#getdefaultdata)

***

### setParentTransform

**setParentTransform**(`transform?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform?` | [`FlowNodeTransformData`](/auto-docs/editor/classes/FlowNodeTransformData.md) |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[toJSON](/auto-docs/editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `"size"` | [`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/auto-docs/editor/interfaces/FlowNodeTransformSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/editor/classes/EntityData.md).[update](/auto-docs/editor/classes/EntityData.md#update)
