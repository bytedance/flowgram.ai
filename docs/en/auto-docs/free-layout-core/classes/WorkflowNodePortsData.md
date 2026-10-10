# Class: WorkflowNodePortsData

节点的点位信息
portsData 只监听点位的数目和类型，不监听点位的 position 变化

## Hierarchy

* `EntityData`

  ↳ **`WorkflowNodePortsData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#constructor)

### Properties

* [entity](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#entity)
* [onDataChange](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#ondatachange)
* [onWillChange](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#onwillchange)
* [opts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#opts)
* [toDispose](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#todispose)
* [type](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#type)

### Accessors

* [allPorts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#allports)
* [changeLocked](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#changelocked)
* [data](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#data)
* [disposed](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#disposed)
* [inputPoints](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#inputpoints)
* [inputPorts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#inputports)
* [onDispose](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#ondispose)
* [outputPoints](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#outputpoints)
* [outputPorts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#outputports)
* [type](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#type-1)
* [version](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#version)

### Methods

* [checkChanged](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#checkchanged)
* [dispose](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#dispose)
* [fireChange](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#firechange)
* [fireWillChange](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#firewillchange)
* [fromJSON](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#fromjson)
* [fullyUpdate](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#getdefaultdata)
* [getInputPoint](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#getinputpoint)
* [getOutputPoint](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#getoutputpoint)
* [getPortEntityByKey](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#getportentitybykey)
* [toJSON](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#tojson)
* [update](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#update)
* [updateAllPorts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#updateallports)
* [updateDynamicPorts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#updatedynamicports)
* [updateStaticPorts](/en/auto-docs/free-layout-core/classes/WorkflowNodePortsData.md#updatestaticports)

## Constructors

### constructor

**new WorkflowNodePortsData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `FlowNodeEntity` |

#### Overrides

EntityData.constructor

## Properties

### entity

`Readonly` **entity**: `FlowNodeEntity`

#### Overrides

EntityData.entity

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<`any`, {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<`any`, {}>>

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

`Static` `Readonly` **type**: `"WorkflowNodePortsData"`

#### Overrides

EntityData.type

## Accessors

### allPorts

`get` **allPorts**(): [`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

获取所有 port entities

#### Returns

[`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

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

`get` **inputPoints**(): [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)\[]

获取输入点位置

#### Returns

[`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)\[]

***

### inputPorts

`get` **inputPorts**(): [`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

获取输入点位

#### Returns

[`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

***

### outputPoints

`get` **outputPoints**(): [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)\[]

获取输出点位置

#### Returns

[`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)\[]

***

### outputPorts

`get` **outputPorts**(): [`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

获取输出点位

#### Returns

[`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)\[]

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
| `props` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): `any`

#### Returns

`any`

#### Overrides

EntityData.getDefaultData

***

### getInputPoint

**getInputPoint**(`key?`): [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)

根据 key 获取 输入点位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` | `number` |

#### Returns

[`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)

***

### getOutputPoint

**getOutputPoint**(`key?`): [`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)

根据 key 获取输出点位置

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` | `number` |

#### Returns

[`LinePoint`](/en/auto-docs/free-layout-core/interfaces/LinePoint.md)

***

### getPortEntityByKey

**getPortEntityByKey**(`portType`, `portKey?`): [`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)

根据 key 获取 port 实体

#### Parameters

| Name | Type |
| :------ | :------ |
| `portType` | [`WorkflowPortType`](/en/auto-docs/free-layout-core/types/WorkflowPortType.md) |
| `portKey?` | `string` | `number` |

#### Returns

[`WorkflowPortEntity`](/en/auto-docs/free-layout-core/classes/WorkflowPortEntity.md)

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
| `props` | `any` |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update

***

### updateAllPorts

**updateAllPorts**(`ports?`): `void`

Update all ports data, includes static ports and dynamic ports

#### Parameters

| Name | Type |
| :------ | :------ |
| `ports?` | [`WorkflowPorts`](/en/auto-docs/free-layout-core/types/WorkflowPorts.md) |

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
| `ports` | [`WorkflowPorts`](/en/auto-docs/free-layout-core/types/WorkflowPorts.md) |

#### Returns

`void`

**`Deprecated`**

use `updateAllPorts` instead
