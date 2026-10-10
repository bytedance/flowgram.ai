# Class: FlowNodeTransformData

实体的数据块

## Hierarchy

* [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md)>

  ↳ **`FlowNodeTransformData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#constructor)

### Properties

* [entity](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#entity)
* [localDirty](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#localdirty)
* [onDataChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#ondatachange)
* [onWillChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#onwillchange)
* [opts](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#opts)
* [renderState](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#renderstate)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#todispose)
* [transform](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#transform)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#type)

### Accessors

* [bounds](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#bounds)
* [boundsWithPadding](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#boundswithpadding)
* [changeLocked](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#changelocked)
* [children](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#children)
* [collapsed](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#collapsed)
* [data](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#data)
* [defaultInputPoint](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#defaultinputpoint)
* [defaultOutputPoint](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#defaultoutputpoint)
* [disposed](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#disposed)
* [firstChild](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#firstchild)
* [inlineSpacingAfter](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#inlinespacingafter)
* [inlineSpacingPre](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#inlinespacingpre)
* [inputPoint](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#inputpoint)
* [isContainer](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#iscontainer)
* [isFirst](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#isfirst)
* [isLast](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#islast)
* [key](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#key)
* [lastChild](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#lastchild)
* [localBounds](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#localbounds)
* [minInlineBlockSpacing](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#mininlineblockspacing)
* [next](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#next)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#ondispose)
* [origin](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#origin)
* [originDeltaX](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#origindeltax)
* [originDeltaY](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#origindeltay)
* [originParent](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#originparent)
* [outputPoint](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#outputpoint)
* [padding](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#padding)
* [parent](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#parent)
* [position](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#position)
* [pre](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#pre)
* [size](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#size)
* [spacing](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#spacing)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#type-1)
* [version](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#version)

### Methods

* [checkChanged](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#checkchanged)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#dispose)
* [fireChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#firechange)
* [fireWillChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#firewillchange)
* [fromJSON](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#fromjson)
* [fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#getdefaultdata)
* [setParentTransform](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#setparenttransform)
* [toJSON](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#tojson)
* [update](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md#update)

## Constructors

### constructor

**new FlowNodeTransformData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#entity)

***

### localDirty

**localDirty**: `boolean`

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)

***

### renderState

**renderState**: [`FlowNodeRenderData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[toDispose](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#todispose)

***

### transform

**transform**: [`TransformData`](/en/auto-docs/fixed-layout-editor/classes/TransformData-1.md)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[type](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#type)

## Accessors

### bounds

`get` **bounds**(): [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

绝对坐标 bbox, 不包含自身的 spacing(marginBottom), 但是包含 inlineSpacing 和 子节点的 spacing

#### Returns

[`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

***

### boundsWithPadding

`get` **boundsWithPadding**(): [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

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

`get` **children**(): [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)\[]

#### Returns

[`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)\[]

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

`get` **defaultInputPoint**(): [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

***

### defaultOutputPoint

`get` **defaultOutputPoint**(): [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.disposed

***

### firstChild

`get` **firstChild**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

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

`get` **inputPoint**(): [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

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

`get` **lastChild**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

***

### localBounds

`get` **localBounds**(): [`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

相对坐标 bbox, 这里的 localBounds 会加入 padding 一起算

#### Returns

[`Rectangle`](/en/auto-docs/fixed-layout-editor/classes/Rectangle-1.md)

***

### minInlineBlockSpacing

`get` **minInlineBlockSpacing**(): `number`

#### Returns

`number`

***

### next

`get` **next**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

下一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

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

`get` **originParent**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

***

### outputPoint

`get` **outputPoint**(): [`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

#### Returns

[`IPoint`](/en/auto-docs/fixed-layout-editor/interfaces/IPoint.md)

***

### padding

`get` **padding**(): [`PaddingSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PaddingSchema-1.md)

#### Returns

[`PaddingSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PaddingSchema-1.md)

***

### parent

`get` **parent**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

parent 节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

***

### position

`get` **position**(): [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

#### Returns

[`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md)

`set` **position**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | [`PositionSchema`](/en/auto-docs/fixed-layout-editor/interfaces/PositionSchema.md) |

#### Returns

`void`

***

### pre

`get` **pre**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

上一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md)

***

### size

`get` **size**(): [`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

获取节点的大小

#### Returns

[`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md)

`set` **size**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | [`SizeSchema`](/en/auto-docs/fixed-layout-editor/interfaces/SizeSchema-1.md) |

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
| `newProps` | [`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[checkChanged](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#checkchanged)

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

#### Inherited from

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
| `props` | [`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md)

初始化数据

#### Returns

[`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md)

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)

***

### setParentTransform

**setParentTransform**(`transform?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform?` | [`FlowNodeTransformData`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeTransformData.md) |

#### Returns

`void`

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

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `"size"` | [`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeTransformSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[update](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#update)
