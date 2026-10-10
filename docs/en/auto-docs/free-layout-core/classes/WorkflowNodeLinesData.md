# Class: WorkflowNodeLinesData

节点的关联的线条

## Hierarchy

* `EntityData`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)>

  ↳ **`WorkflowNodeLinesData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#opts)
* [toDispose](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#todispose)
* [type](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#type)

### Accessors

* [allInputNodes](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#allinputnodes)
* [allLines](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#alllines)
* [allOutputNodes](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#alloutputnodes)
* [availableLines](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#availablelines)
* [changeLocked](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#changelocked)
* [data](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#data)
* [disposed](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#disposed)
* [inputLines](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#inputlines)
* [inputNodes](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#inputnodes)
* [onDispose](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#ondispose)
* [outputLines](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#outputlines)
* [outputNodes](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#outputnodes)
* [type](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#type-1)
* [version](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#version)

### Methods

* [addLine](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#addline)
* [checkChanged](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#firewillchange)
* [fromJSON](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#getdefaultdata)
* [removeLine](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#removeline)
* [toJSON](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#tojson)
* [update](/en/auto-docs/free-layout-core/classes/WorkflowNodeLinesData.md#update)

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

`Readonly` **onDataChange**: `Event`<`EntityData`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md), {}>>

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

`get` **allLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

***

### allOutputNodes

`get` **allOutputNodes**(): `FlowNodeEntity`\[]

输入输出节点

#### Returns

`FlowNodeEntity`\[]

***

### availableLines

`get` **availableLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

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

`get` **inputLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

输入线条

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

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

`get` **outputLines**(): [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

输出线条

#### Returns

[`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md)\[]

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
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

#### Returns

`void`

***

### checkChanged

**checkChanged**(`newProps`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newProps` | [`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)> |

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
| `props` | [`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)

#### Returns

[`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)

#### Overrides

EntityData.getDefaultData

***

### removeLine

**removeLine**(`line`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | [`WorkflowLineEntity`](/en/auto-docs/free-layout-core/classes/WorkflowLineEntity.md) |

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
| `props` | [`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) | `Partial`<[`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md)> | keyof [`WorkflowNodeLines`](/en/auto-docs/free-layout-core/interfaces/WorkflowNodeLines.md) |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update
