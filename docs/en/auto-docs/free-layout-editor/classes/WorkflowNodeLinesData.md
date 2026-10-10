# Class: WorkflowNodeLinesData

节点的关联的线条

## Hierarchy

* [`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)>

  ↳ **`WorkflowNodeLinesData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#opts)
* [toDispose](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#todispose)
* [type](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#type)

### Accessors

* [allInputNodes](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#allinputnodes)
* [allLines](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#alllines)
* [allOutputNodes](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#alloutputnodes)
* [availableLines](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#availablelines)
* [changeLocked](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#changelocked)
* [data](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#data)
* [disposed](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#disposed)
* [inputLines](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#inputlines)
* [inputNodes](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#inputnodes)
* [onDispose](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#ondispose)
* [outputLines](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#outputlines)
* [outputNodes](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#outputnodes)
* [type](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#type-1)
* [version](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#version)

### Methods

* [addLine](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#addline)
* [checkChanged](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#firewillchange)
* [fromJSON](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#getdefaultdata)
* [removeLine](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#removeline)
* [toJSON](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#tojson)
* [update](/en/auto-docs/free-layout-editor/classes/WorkflowNodeLinesData.md#update)

## Constructors

### constructor

**new WorkflowNodeLinesData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md), {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/free-layout-editor/classes/EntityData.md)<[`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md), {}>>

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

### allInputNodes

`get` **allInputNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

所有输入节点

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### allLines

`get` **allLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### allOutputNodes

`get` **allOutputNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

输入输出节点

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### availableLines

`get` **availableLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

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

`get` **inputLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

输入线条

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### inputNodes

`get` **inputNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

输入节点

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### outputLines

`get` **outputLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

输出线条

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md)\[]

***

### outputNodes

`get` **outputNodes**(): [`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

输出节点

#### Returns

[`FlowNodeEntity`](/en/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)\[]

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
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

#### Returns

`void`

***

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)> |

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
| `props` | [`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): [`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)

初始化数据

#### Returns

[`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)

#### Overrides

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### removeLine

**removeLine**(`line`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-editor/classes/WorkflowLineEntity.md) |

#### Returns

`void`

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

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md)> | keyof [`WorkflowNodeLines`](/en/auto-docs/free-layout-editor/interfaces/WorkflowNodeLines.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/free-layout-editor/classes/EntityData.md).[update](/en/auto-docs/free-layout-editor/classes/EntityData.md#update)
