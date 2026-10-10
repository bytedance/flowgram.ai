# Class: WorkflowNodePortsData

节点的点位信息
portsData 只监听点位的数目和类型，不监听点位的 position 变化

## Hierarchy

* [`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)

  ↳ **`WorkflowNodePortsData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#constructor)

### Properties

* [entity](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#entity)
* [onDataChange](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#ondatachange)
* [onWillChange](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#onwillchange)
* [opts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#opts)
* [toDispose](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#todispose)
* [type](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#type)

### Accessors

* [allPorts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#allports)
* [changeLocked](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#changelocked)
* [data](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#data)
* [disposed](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#disposed)
* [inputPoints](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#inputpoints)
* [inputPorts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#inputports)
* [onDispose](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#ondispose)
* [outputPoints](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#outputpoints)
* [outputPorts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#outputports)
* [type](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#type-1)
* [version](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#version)

### Methods

* [checkChanged](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#checkchanged)
* [dispose](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#dispose)
* [fireChange](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#firechange)
* [fireWillChange](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#firewillchange)
* [fromJSON](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#fromjson)
* [fullyUpdate](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#fullyupdate)
* [getDefaultData](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#getdefaultdata)
* [getInputPoint](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#getinputpoint)
* [getOutputPoint](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#getoutputpoint)
* [getPortEntityByKey](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#getportentitybykey)
* [toJSON](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#tojson)
* [update](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#update)
* [updateAllPorts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#updateallports)
* [updateDynamicPorts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#updatedynamicports)
* [updateStaticPorts](/auto-docs/free-layout-editor/classes/WorkflowNodePortsData.md#updatestaticports)

## Constructors

### constructor

**new WorkflowNodePortsData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md) |

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[constructor](/auto-docs/free-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

`Readonly` **entity**: [`FlowNodeEntity`](/auto-docs/free-layout-editor/classes/FlowNodeEntity-1.md)

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[entity](/auto-docs/free-layout-editor/classes/EntityData.md#entity)

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>

修改后触发

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[onDataChange](/auto-docs/free-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`EntityData`](/auto-docs/free-layout-editor/classes/EntityData.md)<`any`, {}>>

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

`Static` `Readonly` **type**: `"WorkflowNodePortsData"`

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[type](/auto-docs/free-layout-editor/classes/EntityData.md#type)

## Accessors

### allPorts

`get` **allPorts**(): [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

获取所有 port entities

#### Returns

[`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

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

### inputPoints

`get` **inputPoints**(): [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)\[]

获取输入点位置

#### Returns

[`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)\[]

***

### inputPorts

`get` **inputPorts**(): [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

获取输入点位

#### Returns

[`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

***

### onDispose

`get` **onDispose**(): [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Inherited from

EntityData.onDispose

***

### outputPoints

`get` **outputPoints**(): [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)\[]

获取输出点位置

#### Returns

[`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)\[]

***

### outputPorts

`get` **outputPorts**(): [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

获取输出点位

#### Returns

[`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)\[]

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
| `newProps` | `any` |

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
| `props` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[fullyUpdate](/auto-docs/free-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): `any`

初始化数据

#### Returns

`any`

#### Overrides

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[getDefaultData](/auto-docs/free-layout-editor/classes/EntityData.md#getdefaultdata)

***

### getInputPoint

**getInputPoint**(`key?`): [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

根据 key 获取 输入点位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` | `number` |

#### Returns

[`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### getOutputPoint

**getOutputPoint**(`key?`): [`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

根据 key 获取输出点位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` | `number` |

#### Returns

[`LinePoint`](/auto-docs/free-layout-editor/interfaces/LinePoint.md)

***

### getPortEntityByKey

**getPortEntityByKey**(`portType`, `portKey?`): [`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

根据 key 获取 port 实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `portType` | [`WorkflowPortType`](/auto-docs/free-layout-editor/types/WorkflowPortType.md) |
| `portKey?` | `string` | `number` |

#### Returns

[`WorkflowPortEntity`](/auto-docs/free-layout-editor/classes/WorkflowPortEntity.md)

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
| `props` | `any` |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

[EntityData](/auto-docs/free-layout-editor/classes/EntityData.md).[update](/auto-docs/free-layout-editor/classes/EntityData.md#update)

***

### updateAllPorts

**updateAllPorts**(`ports?`): `void`

Update all ports data, includes static ports and dynamic ports

#### Parameters

| Name | Type |
| :------ | :------ |
| `ports?` | [`WorkflowPorts`](/auto-docs/free-layout-editor/types/WorkflowPorts.md) |

#### Returns

`void`

***

### updateDynamicPorts

**updateDynamicPorts**(): `void`

动态计算点位，通过 dom 的 data-port-key

#### Returns

`void`

***

### updateStaticPorts

**updateStaticPorts**(`ports`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ports` | [`WorkflowPorts`](/auto-docs/free-layout-editor/types/WorkflowPorts.md) |

#### Returns

`void`

**`Deprecated`**

use `updateAllPorts` instead
