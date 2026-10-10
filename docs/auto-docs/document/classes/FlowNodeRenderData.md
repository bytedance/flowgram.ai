# Class: FlowNodeRenderData

节点渲染状态相关数据

## Hierarchy

* `EntityData`<[`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md)>

  ↳ **`FlowNodeRenderData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/document/classes/FlowNodeRenderData.md#constructor)

### Properties

* [entity](/auto-docs/document/classes/FlowNodeRenderData.md#entity)
* [mouseLeaveTimeout](/auto-docs/document/classes/FlowNodeRenderData.md#mouseleavetimeout)
* [onDataChange](/auto-docs/document/classes/FlowNodeRenderData.md#ondatachange)
* [onExtInfoChange](/auto-docs/document/classes/FlowNodeRenderData.md#onextinfochange)
* [onWillChange](/auto-docs/document/classes/FlowNodeRenderData.md#onwillchange)
* [opts](/auto-docs/document/classes/FlowNodeRenderData.md#opts)
* [toDispose](/auto-docs/document/classes/FlowNodeRenderData.md#todispose)
* [type](/auto-docs/document/classes/FlowNodeRenderData.md#type)

### Accessors

* [activated](/auto-docs/document/classes/FlowNodeRenderData.md#activated)
* [addable](/auto-docs/document/classes/FlowNodeRenderData.md#addable)
* [changeLocked](/auto-docs/document/classes/FlowNodeRenderData.md#changelocked)
* [data](/auto-docs/document/classes/FlowNodeRenderData.md#data)
* [disposed](/auto-docs/document/classes/FlowNodeRenderData.md#disposed)
* [draggable](/auto-docs/document/classes/FlowNodeRenderData.md#draggable)
* [dragging](/auto-docs/document/classes/FlowNodeRenderData.md#dragging)
* [expandable](/auto-docs/document/classes/FlowNodeRenderData.md#expandable)
* [expanded](/auto-docs/document/classes/FlowNodeRenderData.md#expanded)
* [hidden](/auto-docs/document/classes/FlowNodeRenderData.md#hidden)
* [hovered](/auto-docs/document/classes/FlowNodeRenderData.md#hovered)
* [key](/auto-docs/document/classes/FlowNodeRenderData.md#key)
* [lineActivated](/auto-docs/document/classes/FlowNodeRenderData.md#lineactivated)
* [node](/auto-docs/document/classes/FlowNodeRenderData.md#node)
* [onDispose](/auto-docs/document/classes/FlowNodeRenderData.md#ondispose)
* [stackIndex](/auto-docs/document/classes/FlowNodeRenderData.md#stackindex)
* [type](/auto-docs/document/classes/FlowNodeRenderData.md#type-1)
* [version](/auto-docs/document/classes/FlowNodeRenderData.md#version)

### Methods

* [checkChanged](/auto-docs/document/classes/FlowNodeRenderData.md#checkchanged)
* [dispose](/auto-docs/document/classes/FlowNodeRenderData.md#dispose)
* [fireChange](/auto-docs/document/classes/FlowNodeRenderData.md#firechange)
* [fireWillChange](/auto-docs/document/classes/FlowNodeRenderData.md#firewillchange)
* [fromJSON](/auto-docs/document/classes/FlowNodeRenderData.md#fromjson)
* [fullyUpdate](/auto-docs/document/classes/FlowNodeRenderData.md#fullyupdate)
* [getDefaultData](/auto-docs/document/classes/FlowNodeRenderData.md#getdefaultdata)
* [getExtInfo](/auto-docs/document/classes/FlowNodeRenderData.md#getextinfo)
* [toJSON](/auto-docs/document/classes/FlowNodeRenderData.md#tojson)
* [toggleExpand](/auto-docs/document/classes/FlowNodeRenderData.md#toggleexpand)
* [toggleMouseEnter](/auto-docs/document/classes/FlowNodeRenderData.md#togglemouseenter)
* [toggleMouseLeave](/auto-docs/document/classes/FlowNodeRenderData.md#togglemouseleave)
* [update](/auto-docs/document/classes/FlowNodeRenderData.md#update)
* [updateExtInfo](/auto-docs/document/classes/FlowNodeRenderData.md#updateextinfo)

## Constructors

### constructor

**new FlowNodeRenderData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Overrides

EntityData\&lt;FlowNodeRenderSchema\&gt;.constructor

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Overrides

EntityData.entity

***

### mouseLeaveTimeout

`Optional` **mouseLeaveTimeout**: `Timeout`

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onExtInfoChange

`Readonly` **onExtInfoChange**: `Event`<{ `newInfo`: `any` ; `oldInfo`: `any`  }>

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md), {}>>

修改前触发

#### Inherited from

EntityData.onWillChange

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

EntityData.opts

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

EntityData.toDispose

***

### type

`Static` **type**: `string` = `'FlowNodeRenderData'`

#### Overrides

EntityData.type

## Accessors

### activated

`get` **activated**(): `boolean`

#### Returns

`boolean`

`set` **activated**(`activated`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `activated` | `boolean` |

#### Returns

`void`

***

### addable

`get` **addable**(): `boolean`

#### Returns

`boolean`

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

### draggable

`get` **draggable**(): `boolean`

#### Returns

`boolean`

***

### dragging

`get` **dragging**(): `boolean`

#### Returns

`boolean`

`set` **dragging**(`dragging`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dragging` | `boolean` |

#### Returns

`void`

***

### expandable

`get` **expandable**(): `boolean`

#### Returns

`boolean`

***

### expanded

`get` **expanded**(): `boolean`

#### Returns

`boolean`

`set` **expanded**(`expanded`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expanded` | `boolean` |

#### Returns

`void`

***

### hidden

`get` **hidden**(): `boolean`

#### Returns

`boolean`

***

### hovered

`get` **hovered**(): `boolean`

#### Returns

`boolean`

`set` **hovered**(`hovered`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `hovered` | `boolean` |

#### Returns

`void`

***

### key

`get` **key**(): `string`

#### Returns

`string`

***

### lineActivated

`get` **lineActivated**(): `boolean`

#### Returns

`boolean`

***

### node

`get` **node**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

***

### stackIndex

`get` **stackIndex**(): `number`

#### Returns

`number`

`set` **stackIndex**(`index`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

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
| `newProps` | [`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md) | `Partial`<[`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md)> |

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

#### Overrides

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
| `props` | [`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md)

#### Returns

[`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md)

#### Overrides

EntityData.getDefaultData

***

### getExtInfo

**getExtInfo**(): `undefined` | `Record`<`string`, `any`>

#### Returns

`undefined` | `Record`<`string`, `any`>

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

EntityData.toJSON

***

### toggleExpand

**toggleExpand**(): `void`

#### Returns

`void`

***

### toggleMouseEnter

**toggleMouseEnter**(`silent?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `silent` | `boolean` | `false` |

#### Returns

`void`

***

### toggleMouseLeave

**toggleMouseLeave**(`silent?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `silent` | `boolean` | `false` |

#### Returns

`void`

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md) | `Partial`<[`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md)> | keyof [`FlowNodeRenderSchema`](/auto-docs/document/interfaces/FlowNodeRenderSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update

***

### updateExtInfo

**updateExtInfo**(`info`, `fullUpdate?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | `Record`<`string`, `any`> |
| `fullUpdate?` | `boolean` |

#### Returns

`void`
