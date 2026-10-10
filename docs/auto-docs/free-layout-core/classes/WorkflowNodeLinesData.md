# Class: WorkflowNodeLinesData

节点的关联的线条

## Hierarchy

* `EntityData`<[`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)>

  ↳ **`WorkflowNodeLinesData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#constructor)

### Properties

* [entity](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#entity)
* [onDataChange](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#ondatachange)
* [onWillChange](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#onwillchange)
* [opts](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#opts)
* [toDispose](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#todispose)
* [type](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#type)

### Accessors

* [allInputNodes](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#allinputnodes)
* [allLines](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#alllines)
* [allOutputNodes](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#alloutputnodes)
* [availableLines](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#availablelines)
* [changeLocked](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#changelocked)
* [data](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#data)
* [disposed](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#disposed)
* [inputLines](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#inputlines)
* [inputNodes](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#inputnodes)
* [onDispose](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#ondispose)
* [outputLines](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#outputlines)
* [outputNodes](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#outputnodes)
* [type](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#type-1)
* [version](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#version)

### Methods

* [addLine](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#addline)
* [checkChanged](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#checkchanged)
* [dispose](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#dispose)
* [fireChange](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#firechange)
* [fireWillChange](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#firewillchange)
* [fromJSON](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#fromjson)
* [fullyUpdate](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#fullyupdate)
* [getDefaultData](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#getdefaultdata)
* [removeLine](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#removeline)
* [toJSON](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#tojson)
* [update](/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#update)

## Constructors

### constructor

**new WorkflowNodeLinesData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `FlowNodeEntity` |

#### Overrides

EntityData\&lt;WorkflowNodeLines\&gt;.constructor

## Properties

### entity

**entity**: `FlowNodeEntity`

#### Overrides

EntityData.entity

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md), {}>>

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

`Static` **type**: `string` = `'WorkflowNodeLinesData'`

#### Overrides

EntityData.type

## Accessors

### allInputNodes

`get` **allInputNodes**(): `FlowNodeEntity`\[]

所有输入节点

#### Returns

`FlowNodeEntity`\[]

***

### allLines

`get` **allLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### allOutputNodes

`get` **allOutputNodes**(): `FlowNodeEntity`\[]

输入输出节点

#### Returns

`FlowNodeEntity`\[]

***

### availableLines

`get` **availableLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

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

`get` **inputLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

输入线条

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### inputNodes

`get` **inputNodes**(): `FlowNodeEntity`\[]

输入节点

#### Returns

`FlowNodeEntity`\[]

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

***

### outputLines

`get` **outputLines**(): [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

输出线条

#### Returns

[`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### outputNodes

`get` **outputNodes**(): `FlowNodeEntity`\[]

输出节点

#### Returns

`FlowNodeEntity`\[]

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
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Returns

`void`

***

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)> |

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
| `props` | [`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)

#### Returns

[`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)

#### Overrides

EntityData.getDefaultData

***

### removeLine

**removeLine**(`line`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

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
| `props` | [`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)> | keyof [`WorkflowNodeLines`](/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update
