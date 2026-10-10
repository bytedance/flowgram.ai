# Class: WorkflowLineRenderData

## Hierarchy

* `EntityData`<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)>

  ↳ **`WorkflowLineRenderData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#opts)
* [toDispose](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#todispose)
* [type](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#type)

### Accessors

* [bounds](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#bounds)
* [center](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#center)
* [changeLocked](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#changelocked)
* [data](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#data)
* [disposed](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#disposed)
* [onDispose](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#ondispose)
* [path](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#path)
* [position](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#position)
* [renderVersion](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#renderversion)
* [type](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#type-1)
* [version](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#version)

### Methods

* [calcDistance](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#calcdistance)
* [checkChanged](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#firewillchange)
* [fromJSON](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#getdefaultdata)
* [toJSON](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#tojson)
* [update](/en/auto-docs/free-layout-core/classes/WorkflowLineRenderData.md#update)

## Constructors

### constructor

**new WorkflowLineRenderData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Overrides

EntityData\&lt;WorkflowLineRenderDataSchema\&gt;.constructor

## Properties

### entity

**entity**: [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)

#### Overrides

EntityData.entity

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md), {}>>

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

`get` **center**(): [`LineCenterPoint`](/en/auto-docs/free-layout-core/interfaces/LineCenterPoint.md)

获取 center 位置

#### Returns

[`LineCenterPoint`](/en/auto-docs/free-layout-core/interfaces/LineCenterPoint.md)

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

`get` **position**(): [`LinePosition`](/en/auto-docs/free-layout-core/interfaces/LinePosition.md)

#### Returns

[`LinePosition`](/en/auto-docs/free-layout-core/interfaces/LinePosition.md)

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
| `newProps` | [`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md) | `Partial`<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)> |

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
| `props` | [`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)

#### Returns

[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-core/interfaces/WorkflowLineRenderDataSchema.md)

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
