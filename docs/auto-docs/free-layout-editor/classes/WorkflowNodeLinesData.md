# Class: WorkflowNodeLinesData

节点的关联的线条

## Hierarchy

* [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)>

  ↳ **`WorkflowNodeLinesData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#constructor)

### Properties

* [entity](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#entity)
* [onDataChange](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#ondatachange)
* [onWillChange](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#onwillchange)
* [opts](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#opts)
* [toDispose](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#todispose)
* [type](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#type)

### Accessors

* [allInputNodes](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#allinputnodes)
* [allLines](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#alllines)
* [allOutputNodes](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#alloutputnodes)
* [availableLines](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#availablelines)
* [changeLocked](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#changelocked)
* [data](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#data)
* [disposed](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#disposed)
* [inputLines](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#inputlines)
* [inputNodes](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#inputnodes)
* [onDispose](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#ondispose)
* [outputLines](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#outputlines)
* [outputNodes](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#outputnodes)
* [type](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#type-1)
* [version](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#version)

### Methods

* [addLine](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#addline)
* [checkChanged](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#checkchanged)
* [dispose](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#firechange)
* [fireWillChange](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#firewillchange)
* [fromJSON](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#fromjson)
* [fullyUpdate](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#fullyupdate)
* [getDefaultData](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#getdefaultdata)
* [removeLine](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#removeline)
* [toJSON](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#tojson)
* [update](/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#update)

## Constructors

### constructor

**new WorkflowNodeLinesData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md), {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md), {}>>

修改前触发

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[onWillChange](/auto-docs/free-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[opts](/auto-docs/free-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/auto-docs/free-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[toDispose](/auto-docs/free-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[type](/auto-docs/free-layout-editor/classes/EntityData.md#type)

## Accessors

### allInputNodes

`get` **allInputNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

所有输入节点

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### allLines

`get` **allLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### allOutputNodes

`get` **allOutputNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

输入输出节点

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### availableLines

`get` **availableLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

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

### inputLines

`get` **inputLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

输入线条

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### inputNodes

`get` **inputNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

输入节点

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### outputLines

`get` **outputLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

输出线条

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### outputNodes

`get` **outputNodes**(): [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

输出节点

#### Returns

[`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

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

### addLine

**addLine**(`line`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

#### Returns

`void`

***

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)> |

#### Returns

`boolean`

**`Deprecated`**

检测属性是否更改，默认采用浅比较

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[checkChanged](/auto-docs/free-layout-editor/classes/EntityData.md#checkchanged)

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[dispose](/auto-docs/free-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fireChange](/auto-docs/free-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fireWillChange](/auto-docs/free-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fromJSON](/auto-docs/free-layout-editor/classes/EntityData.md#fromjson)

***

### fullyUpdate

**fullyUpdate**(`props`): `void`

更新全量数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)

初始化数据

#### Returns

[`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### removeLine

**removeLine**(`line`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[toJSON](/auto-docs/free-layout-editor/classes/EntityData.md#tojson)

***

### update

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)> | keyof [`WorkflowNodeLines`](/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[update](/auto-docs/free-layout-editor/classes/EntityData.md#update)
