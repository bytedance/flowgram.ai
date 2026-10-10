# Class: FlowNodeTransformData

## Hierarchy

* `EntityData`<[`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md)>

  ↳ **`FlowNodeTransformData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/document/classes/FlowNodeTransformData.md#constructor)

### Properties

* [entity](/auto-docs/document/classes/FlowNodeTransformData.md#entity)
* [localDirty](/auto-docs/document/classes/FlowNodeTransformData.md#localdirty)
* [onDataChange](/auto-docs/document/classes/FlowNodeTransformData.md#ondatachange)
* [onWillChange](/auto-docs/document/classes/FlowNodeTransformData.md#onwillchange)
* [opts](/auto-docs/document/classes/FlowNodeTransformData.md#opts)
* [renderState](/auto-docs/document/classes/FlowNodeTransformData.md#renderstate)
* [toDispose](/auto-docs/document/classes/FlowNodeTransformData.md#todispose)
* [transform](/auto-docs/document/classes/FlowNodeTransformData.md#transform)
* [type](/auto-docs/document/classes/FlowNodeTransformData.md#type)

### Accessors

* [bounds](/auto-docs/document/classes/FlowNodeTransformData.md#bounds)
* [boundsWithPadding](/auto-docs/document/classes/FlowNodeTransformData.md#boundswithpadding)
* [changeLocked](/auto-docs/document/classes/FlowNodeTransformData.md#changelocked)
* [children](/auto-docs/document/classes/FlowNodeTransformData.md#children)
* [collapsed](/auto-docs/document/classes/FlowNodeTransformData.md#collapsed)
* [data](/auto-docs/document/classes/FlowNodeTransformData.md#data)
* [defaultInputPoint](/auto-docs/document/classes/FlowNodeTransformData.md#defaultinputpoint)
* [defaultOutputPoint](/auto-docs/document/classes/FlowNodeTransformData.md#defaultoutputpoint)
* [disposed](/auto-docs/document/classes/FlowNodeTransformData.md#disposed)
* [firstChild](/auto-docs/document/classes/FlowNodeTransformData.md#firstchild)
* [inlineSpacingAfter](/auto-docs/document/classes/FlowNodeTransformData.md#inlinespacingafter)
* [inlineSpacingPre](/auto-docs/document/classes/FlowNodeTransformData.md#inlinespacingpre)
* [inputPoint](/auto-docs/document/classes/FlowNodeTransformData.md#inputpoint)
* [isContainer](/auto-docs/document/classes/FlowNodeTransformData.md#iscontainer)
* [isFirst](/auto-docs/document/classes/FlowNodeTransformData.md#isfirst)
* [isLast](/auto-docs/document/classes/FlowNodeTransformData.md#islast)
* [key](/auto-docs/document/classes/FlowNodeTransformData.md#key)
* [lastChild](/auto-docs/document/classes/FlowNodeTransformData.md#lastchild)
* [localBounds](/auto-docs/document/classes/FlowNodeTransformData.md#localbounds)
* [minInlineBlockSpacing](/auto-docs/document/classes/FlowNodeTransformData.md#mininlineblockspacing)
* [next](/auto-docs/document/classes/FlowNodeTransformData.md#next)
* [onDispose](/auto-docs/document/classes/FlowNodeTransformData.md#ondispose)
* [origin](/auto-docs/document/classes/FlowNodeTransformData.md#origin)
* [originDeltaX](/auto-docs/document/classes/FlowNodeTransformData.md#origindeltax)
* [originDeltaY](/auto-docs/document/classes/FlowNodeTransformData.md#origindeltay)
* [originParent](/auto-docs/document/classes/FlowNodeTransformData.md#originparent)
* [outputPoint](/auto-docs/document/classes/FlowNodeTransformData.md#outputpoint)
* [padding](/auto-docs/document/classes/FlowNodeTransformData.md#padding)
* [parent](/auto-docs/document/classes/FlowNodeTransformData.md#parent)
* [position](/auto-docs/document/classes/FlowNodeTransformData.md#position)
* [pre](/auto-docs/document/classes/FlowNodeTransformData.md#pre)
* [size](/auto-docs/document/classes/FlowNodeTransformData.md#size)
* [spacing](/auto-docs/document/classes/FlowNodeTransformData.md#spacing)
* [type](/auto-docs/document/classes/FlowNodeTransformData.md#type-1)
* [version](/auto-docs/document/classes/FlowNodeTransformData.md#version)

### Methods

* [checkChanged](/auto-docs/document/classes/FlowNodeTransformData.md#checkchanged)
* [dispose](/auto-docs/document/classes/FlowNodeTransformData.md#dispose)
* [fireChange](/auto-docs/document/classes/FlowNodeTransformData.md#firechange)
* [fireWillChange](/auto-docs/document/classes/FlowNodeTransformData.md#firewillchange)
* [fromJSON](/auto-docs/document/classes/FlowNodeTransformData.md#fromjson)
* [fullyUpdate](/auto-docs/document/classes/FlowNodeTransformData.md#fullyupdate)
* [getDefaultData](/auto-docs/document/classes/FlowNodeTransformData.md#getdefaultdata)
* [setParentTransform](/auto-docs/document/classes/FlowNodeTransformData.md#setparenttransform)
* [toJSON](/auto-docs/document/classes/FlowNodeTransformData.md#tojson)
* [update](/auto-docs/document/classes/FlowNodeTransformData.md#update)

## Constructors

### constructor

**new FlowNodeTransformData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Overrides

EntityData\&lt;FlowNodeTransformSchema\&gt;.constructor

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Overrides

EntityData.entity

***

### localDirty

**localDirty**: `boolean` = `true`

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md), {}>>

修改前触发

#### Inherited from

EntityData.onWillChange

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

EntityData.opts

***

### renderState

**renderState**: [`FlowNodeRenderData`](/auto-docs/document/classes/FlowNodeRenderData.md)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

EntityData.toDispose

***

### transform

**transform**: `TransformData`

***

### type

`Static` **type**: `string` = `'FlowNodeTransformData'`

#### Overrides

EntityData.type

## Accessors

### bounds

`get` **bounds**(): `Rectangle`

绝对坐标 bbox, 不包含自身的 spacing(marginBottom), 但是包含 inlineSpacing 和 子节点的 spacing

#### Returns

`Rectangle`

***

### boundsWithPadding

`get` **boundsWithPadding**(): `Rectangle`

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

`get` **children**(): [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)\[]

#### Returns

[`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)\[]

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

`get` **defaultInputPoint**(): `IPoint`

#### Returns

`IPoint`

***

### defaultOutputPoint

`get` **defaultOutputPoint**(): `IPoint`

#### Returns

`IPoint`

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

EntityData.disposed

***

### firstChild

`get` **firstChild**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

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

`get` **inputPoint**(): `IPoint`

#### Returns

`IPoint`

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

`get` **lastChild**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

***

### localBounds

`get` **localBounds**(): `Rectangle`

相对坐标 bbox, 这里的 localBounds 会加入 padding 一起算

#### Returns

`Rectangle`

***

### minInlineBlockSpacing

`get` **minInlineBlockSpacing**(): `number`

#### Returns

`number`

***

### next

`get` **next**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

下一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

***

### origin

`get` **origin**(): `OriginSchema`

#### Returns

`OriginSchema`

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

`get` **originParent**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

***

### outputPoint

`get` **outputPoint**(): `IPoint`

#### Returns

`IPoint`

***

### padding

`get` **padding**(): `PaddingSchema`

#### Returns

`PaddingSchema`

***

### parent

`get` **parent**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

parent 节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

***

### position

`get` **position**(): `PositionSchema`

#### Returns

`PositionSchema`

`set` **position**(`position`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `PositionSchema` |

#### Returns

`void`

***

### pre

`get` **pre**(): `undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

上一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md)

***

### size

`get` **size**(): `SizeSchema`

获取节点的大小

#### Returns

`SizeSchema`

`set` **size**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `SizeSchema` |

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
| `newProps` | [`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

EntityData.checkChanged

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

EntityData.dispose

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

EntityData.fireChange

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

EntityData.fireWillChange

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

EntityData.fromJSON

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md)

#### Returns

[`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md)

#### Overrides

EntityData.getDefaultData

***

### setParentTransform

**setParentTransform**(`transform?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform?` | [`FlowNodeTransformData`](/auto-docs/document/classes/FlowNodeTransformData.md) |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

EntityData.toJSON

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `"size"` | [`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/auto-docs/document/interfaces/FlowNodeTransformSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update
