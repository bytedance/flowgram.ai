# Class: FlowNodeTransformData

## Hierarchy

* `EntityData`<[`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md)>

  ↳ **`FlowNodeTransformData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/document/classes/FlowNodeTransformData.md#constructor)

### Properties

* [entity](/en/auto-docs/document/classes/FlowNodeTransformData.md#entity)
* [localDirty](/en/auto-docs/document/classes/FlowNodeTransformData.md#localdirty)
* [onDataChange](/en/auto-docs/document/classes/FlowNodeTransformData.md#ondatachange)
* [onWillChange](/en/auto-docs/document/classes/FlowNodeTransformData.md#onwillchange)
* [opts](/en/auto-docs/document/classes/FlowNodeTransformData.md#opts)
* [renderState](/en/auto-docs/document/classes/FlowNodeTransformData.md#renderstate)
* [toDispose](/en/auto-docs/document/classes/FlowNodeTransformData.md#todispose)
* [transform](/en/auto-docs/document/classes/FlowNodeTransformData.md#transform)
* [type](/en/auto-docs/document/classes/FlowNodeTransformData.md#type)

### Accessors

* [bounds](/en/auto-docs/document/classes/FlowNodeTransformData.md#bounds)
* [boundsWithPadding](/en/auto-docs/document/classes/FlowNodeTransformData.md#boundswithpadding)
* [changeLocked](/en/auto-docs/document/classes/FlowNodeTransformData.md#changelocked)
* [children](/en/auto-docs/document/classes/FlowNodeTransformData.md#children)
* [collapsed](/en/auto-docs/document/classes/FlowNodeTransformData.md#collapsed)
* [data](/en/auto-docs/document/classes/FlowNodeTransformData.md#data)
* [defaultInputPoint](/en/auto-docs/document/classes/FlowNodeTransformData.md#defaultinputpoint)
* [defaultOutputPoint](/en/auto-docs/document/classes/FlowNodeTransformData.md#defaultoutputpoint)
* [disposed](/en/auto-docs/document/classes/FlowNodeTransformData.md#disposed)
* [firstChild](/en/auto-docs/document/classes/FlowNodeTransformData.md#firstchild)
* [inlineSpacingAfter](/en/auto-docs/document/classes/FlowNodeTransformData.md#inlinespacingafter)
* [inlineSpacingPre](/en/auto-docs/document/classes/FlowNodeTransformData.md#inlinespacingpre)
* [inputPoint](/en/auto-docs/document/classes/FlowNodeTransformData.md#inputpoint)
* [isContainer](/en/auto-docs/document/classes/FlowNodeTransformData.md#iscontainer)
* [isFirst](/en/auto-docs/document/classes/FlowNodeTransformData.md#isfirst)
* [isLast](/en/auto-docs/document/classes/FlowNodeTransformData.md#islast)
* [key](/en/auto-docs/document/classes/FlowNodeTransformData.md#key)
* [lastChild](/en/auto-docs/document/classes/FlowNodeTransformData.md#lastchild)
* [localBounds](/en/auto-docs/document/classes/FlowNodeTransformData.md#localbounds)
* [minInlineBlockSpacing](/en/auto-docs/document/classes/FlowNodeTransformData.md#mininlineblockspacing)
* [next](/en/auto-docs/document/classes/FlowNodeTransformData.md#next)
* [onDispose](/en/auto-docs/document/classes/FlowNodeTransformData.md#ondispose)
* [origin](/en/auto-docs/document/classes/FlowNodeTransformData.md#origin)
* [originDeltaX](/en/auto-docs/document/classes/FlowNodeTransformData.md#origindeltax)
* [originDeltaY](/en/auto-docs/document/classes/FlowNodeTransformData.md#origindeltay)
* [originParent](/en/auto-docs/document/classes/FlowNodeTransformData.md#originparent)
* [outputPoint](/en/auto-docs/document/classes/FlowNodeTransformData.md#outputpoint)
* [padding](/en/auto-docs/document/classes/FlowNodeTransformData.md#padding)
* [parent](/en/auto-docs/document/classes/FlowNodeTransformData.md#parent)
* [position](/en/auto-docs/document/classes/FlowNodeTransformData.md#position)
* [pre](/en/auto-docs/document/classes/FlowNodeTransformData.md#pre)
* [size](/en/auto-docs/document/classes/FlowNodeTransformData.md#size)
* [spacing](/en/auto-docs/document/classes/FlowNodeTransformData.md#spacing)
* [type](/en/auto-docs/document/classes/FlowNodeTransformData.md#type-1)
* [version](/en/auto-docs/document/classes/FlowNodeTransformData.md#version)

### Methods

* [checkChanged](/en/auto-docs/document/classes/FlowNodeTransformData.md#checkchanged)
* [dispose](/en/auto-docs/document/classes/FlowNodeTransformData.md#dispose)
* [fireChange](/en/auto-docs/document/classes/FlowNodeTransformData.md#firechange)
* [fireWillChange](/en/auto-docs/document/classes/FlowNodeTransformData.md#firewillchange)
* [fromJSON](/en/auto-docs/document/classes/FlowNodeTransformData.md#fromjson)
* [fullyUpdate](/en/auto-docs/document/classes/FlowNodeTransformData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/document/classes/FlowNodeTransformData.md#getdefaultdata)
* [setParentTransform](/en/auto-docs/document/classes/FlowNodeTransformData.md#setparenttransform)
* [toJSON](/en/auto-docs/document/classes/FlowNodeTransformData.md#tojson)
* [update](/en/auto-docs/document/classes/FlowNodeTransformData.md#update)

## Constructors

### constructor

**new FlowNodeTransformData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Overrides

EntityData\&lt;FlowNodeTransformSchema\&gt;.constructor

## Properties

### entity

**entity**: [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Overrides

EntityData.entity

***

### localDirty

**localDirty**: `boolean` = `true`

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md), {}>>

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

**renderState**: [`FlowNodeRenderData`](/en/auto-docs/document/classes/FlowNodeRenderData.md)

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

`get` **children**(): [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)\[]

#### Returns

[`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)\[]

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

`get` **firstChild**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

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

`get` **lastChild**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

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

`get` **next**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

下一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

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

`get` **originParent**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

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

`get` **parent**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

parent 节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

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

`get` **pre**(): `undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

上一个节点的 transform 数据

#### Returns

`undefined` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

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
| `newProps` | [`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md)> |

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
| `props` | [`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md)

#### Returns

[`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md)

#### Overrides

EntityData.getDefaultData

***

### setParentTransform

**setParentTransform**(`transform?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `transform?` | [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md) |

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
| `props` | `"size"` | [`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md) | `Partial`<[`FlowNodeTransformSchema`](/en/auto-docs/document/interfaces/FlowNodeTransformSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update
