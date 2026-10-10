# Class: WorkflowLineRenderData

实体的数据块

## Hierarchy

* [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md)>

  ↳ **`WorkflowLineRenderData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#opts)
* [toDispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#todispose)
* [type](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#type)

### Accessors

* [bounds](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#bounds)
* [center](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#center)
* [changeLocked](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#changelocked)
* [data](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#data)
* [disposed](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#disposed)
* [onDispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#ondispose)
* [path](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#path)
* [position](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#position)
* [renderVersion](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#renderversion)
* [type](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#type-1)
* [version](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#version)

### Methods

* [calcDistance](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#calcdistance)
* [checkChanged](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#firewillchange)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#getdefaultdata)
* [toJSON](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#tojson)
* [update](/en/auto-docs/free-layout-editor/classes/WorkflowLineRenderData.md#update)

## Constructors

### constructor

**new WorkflowLineRenderData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md), {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/free-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[toDispose](/en/auto-docs/free-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[type](/en/auto-docs/free-layout-editor/classes/EntityData.md#type)

## Accessors

### bounds

`get` **bounds**(): [`Rectangle`](/en/auto-docs/free-layout-editor/classes/Rectangle-1.md)

#### Returns

[`Rectangle`](/en/auto-docs/free-layout-editor/classes/Rectangle-1.md)

***

### center

`get` **center**(): [`LineCenterPoint`](/en/auto-docs/free-layout-editor/interfaces/LineCenterPoint.md)

获取 center 位置

#### Returns

[`LineCenterPoint`](/en/auto-docs/free-layout-editor/interfaces/LineCenterPoint.md)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### path

`get` **path**(): `string`

#### Returns

`string`

***

### position

`get` **position**(): [`LinePosition`](/en/auto-docs/free-layout-editor/interfaces/LinePosition.md)

#### Returns

[`LinePosition`](/en/auto-docs/free-layout-editor/interfaces/LinePosition.md)

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
| `pos` | [`IPoint`](/en/auto-docs/free-layout-editor/interfaces/IPoint.md) |

#### Returns

`number`

***

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md) | `Partial`<[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[checkChanged](/en/auto-docs/free-layout-editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[dispose](/en/auto-docs/free-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fireChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fireWillChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fromJSON](/en/auto-docs/free-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md)

初始化数据

#### Returns

[`WorkflowLineRenderDataSchema`](/en/auto-docs/free-layout-editor/interfaces/WorkflowLineRenderDataSchema.md)

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[toJSON](/en/auto-docs/free-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(): `void`

更新数据
WARNING: 这个方法，必须在 requestAnimationFrame / useLayoutEffect 中调用，否则会引起浏览器强制重排

#### Returns

`void`

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[update](/en/auto-docs/free-layout-editor/classes/EntityData.md#update)
