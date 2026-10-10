# Class: WorkflowLineRenderData

## Hierarchy

* `EntityData`<[`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)>

  ↳ **`WorkflowLineRenderData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#constructor)

### Properties

* [entity](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#entity)
* [onDataChange](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#ondatachange)
* [onWillChange](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#onwillchange)
* [opts](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#opts)
* [toDispose](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#todispose)
* [type](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#type)

### Accessors

* [bounds](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#bounds)
* [center](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#center)
* [changeLocked](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#changelocked)
* [data](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#data)
* [disposed](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#disposed)
* [onDispose](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#ondispose)
* [path](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#path)
* [position](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#position)
* [renderVersion](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#renderversion)
* [type](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#type-1)
* [version](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#version)

### Methods

* [calcDistance](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#calcdistance)
* [checkChanged](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#checkchanged)
* [dispose](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#dispose)
* [fireChange](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#firechange)
* [fireWillChange](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#firewillchange)
* [fromJSON](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#fromjson)
* [fullyUpdate](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#fullyupdate)
* [getDefaultData](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#getdefaultdata)
* [toJSON](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#tojson)
* [update](/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#update)

## Constructors

### constructor

**new WorkflowLineRenderData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Overrides

EntityData\&lt;WorkflowLineRenderDataSchema\&gt;.constructor

## Properties

### entity

**entity**: [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

#### Overrides

EntityData.entity

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md), {}>>

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

`Static` **type**: `string` = `'WorkflowLineRenderData'`

#### Overrides

EntityData.type

## Accessors

### bounds

`get` **bounds**(): `Rectangle`

#### Returns

`Rectangle`

***

### center

`get` **center**(): [`LineCenterPoint`](/auto-docs/free-layout-core/interfaces/LineCenterPoint.md)

获取 center 位置

#### Returns

[`LineCenterPoint`](/auto-docs/free-layout-core/interfaces/LineCenterPoint.md)

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

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

***

### path

`get` **path**(): `string`

#### Returns

`string`

***

### position

`get` **position**(): [`LinePosition`](/auto-docs/free-layout-core/interfaces/LinePosition.md)

#### Returns

[`LinePosition`](/auto-docs/free-layout-core/interfaces/LinePosition.md)

***

### renderVersion

`get` **renderVersion**(): `string`

#### Returns

`string`

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

### calcDistance

**calcDistance**(`pos`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | `IPoint` |

#### Returns

`number`

***

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md) | `Partial`<[`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)> |

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
| `props` | [`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)

#### Returns

[`WorkflowLineRenderDataSchema`](/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)

#### Overrides

EntityData.getDefaultData

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

**update**(): `void`

更新数据
WARNING: 这个方法，必须在 requestAnimationFrame / useLayoutEffect 中调用，否则会引起浏览器强制重排

#### Returns

`void`

#### Overrides

EntityData.update
