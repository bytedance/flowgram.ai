# Class: FlowNodeRenderData

节点渲染状态相关数据

## Hierarchy

* [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md)>

  ↳ **`FlowNodeRenderData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#constructor)

### Properties

* [entity](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#entity)
* [mouseLeaveTimeout](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#mouseleavetimeout)
* [onDataChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#ondatachange)
* [onExtInfoChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#onextinfochange)
* [onWillChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#onwillchange)
* [opts](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#opts)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#todispose)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#type)

### Accessors

* [activated](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#activated)
* [addable](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#addable)
* [changeLocked](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#changelocked)
* [data](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#data)
* [disposed](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#disposed)
* [draggable](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#draggable)
* [dragging](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#dragging)
* [expandable](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#expandable)
* [expanded](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#expanded)
* [hidden](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#hidden)
* [hovered](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#hovered)
* [key](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#key)
* [lineActivated](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#lineactivated)
* [node](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#node)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#ondispose)
* [stackIndex](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#stackindex)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#type-1)
* [version](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#version)

### Methods

* [checkChanged](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#checkchanged)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#dispose)
* [fireChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#firechange)
* [fireWillChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#firewillchange)
* [fromJSON](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#fromjson)
* [fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#getdefaultdata)
* [getExtInfo](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#getextinfo)
* [toJSON](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#tojson)
* [toggleExpand](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#toggleexpand)
* [toggleMouseEnter](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#togglemouseenter)
* [toggleMouseLeave](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#togglemouseleave)
* [update](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#update)
* [updateExtInfo](/en/auto-docs/fixed-layout-editor/classes/FlowNodeRenderData.md#updateextinfo)

## Constructors

### constructor

**new FlowNodeRenderData**(`entity`)

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

### mouseLeaveTimeout

`Optional` **mouseLeaveTimeout**: `number`

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)

***

### onExtInfoChange

`Readonly` **onExtInfoChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<{ `newInfo`: `any` ; `oldInfo`: `any`  }>

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<[`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

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
| `newProps` | [`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md) | `Partial`<[`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md)> |

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

#### Overrides

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
| `props` | [`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md)

初始化数据

#### Returns

[`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md)

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[toJSON](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#tojson)

***

### toggleExpand

**toggleExpand**(): `void`

#### Returns

`void`

***

### toggleMouseEnter

**toggleMouseEnter**(`silent?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `silent?` | `boolean` |

#### Returns

`void`

***

### toggleMouseLeave

**toggleMouseLeave**(`silent?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `silent?` | `boolean` |

#### Returns

`void`

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md) | `Partial`<[`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md)> | keyof [`FlowNodeRenderSchema`](/en/auto-docs/fixed-layout-editor/interfaces/FlowNodeRenderSchema.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[update](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#update)

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
