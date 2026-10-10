# Class: FlowNodeTransitionData

## Hierarchy

* `EntityData`<[`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md)>

  ↳ **`FlowNodeTransitionData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/document/classes/FlowNodeTransitionData.md#constructor)

### Properties

* [entity](/en/auto-docs/document/classes/FlowNodeTransitionData.md#entity)
* [onDataChange](/en/auto-docs/document/classes/FlowNodeTransitionData.md#ondatachange)
* [onWillChange](/en/auto-docs/document/classes/FlowNodeTransitionData.md#onwillchange)
* [opts](/en/auto-docs/document/classes/FlowNodeTransitionData.md#opts)
* [renderData](/en/auto-docs/document/classes/FlowNodeTransitionData.md#renderdata)
* [toDispose](/en/auto-docs/document/classes/FlowNodeTransitionData.md#todispose)
* [transform](/en/auto-docs/document/classes/FlowNodeTransitionData.md#transform)
* [type](/en/auto-docs/document/classes/FlowNodeTransitionData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/document/classes/FlowNodeTransitionData.md#changelocked)
* [collapsed](/en/auto-docs/document/classes/FlowNodeTransitionData.md#collapsed)
* [data](/en/auto-docs/document/classes/FlowNodeTransitionData.md#data)
* [disposed](/en/auto-docs/document/classes/FlowNodeTransitionData.md#disposed)
* [isNodeEnd](/en/auto-docs/document/classes/FlowNodeTransitionData.md#isnodeend)
* [labels](/en/auto-docs/document/classes/FlowNodeTransitionData.md#labels)
* [lines](/en/auto-docs/document/classes/FlowNodeTransitionData.md#lines)
* [onDispose](/en/auto-docs/document/classes/FlowNodeTransitionData.md#ondispose)
* [type](/en/auto-docs/document/classes/FlowNodeTransitionData.md#type-1)
* [version](/en/auto-docs/document/classes/FlowNodeTransitionData.md#version)

### Methods

* [checkChanged](/en/auto-docs/document/classes/FlowNodeTransitionData.md#checkchanged)
* [dispose](/en/auto-docs/document/classes/FlowNodeTransitionData.md#dispose)
* [fireChange](/en/auto-docs/document/classes/FlowNodeTransitionData.md#firechange)
* [fireWillChange](/en/auto-docs/document/classes/FlowNodeTransitionData.md#firewillchange)
* [formatLabels](/en/auto-docs/document/classes/FlowNodeTransitionData.md#formatlabels)
* [formatLines](/en/auto-docs/document/classes/FlowNodeTransitionData.md#formatlines)
* [fromJSON](/en/auto-docs/document/classes/FlowNodeTransitionData.md#fromjson)
* [fullyUpdate](/en/auto-docs/document/classes/FlowNodeTransitionData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/document/classes/FlowNodeTransitionData.md#getdefaultdata)
* [toJSON](/en/auto-docs/document/classes/FlowNodeTransitionData.md#tojson)
* [update](/en/auto-docs/document/classes/FlowNodeTransitionData.md#update)

## Constructors

### constructor

**new FlowNodeTransitionData**(`entity`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md) |

#### Overrides

EntityData\&lt;FlowNodeTransitionSchema\&gt;.constructor

## Properties

### entity

**entity**: [`FlowNodeEntity`](/en/auto-docs/document/classes/FlowNodeEntity-1.md)

#### Overrides

EntityData.entity

***

### onDataChange

`Readonly` **onDataChange**: `Event`<`EntityData`<[`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md), {}>>

修改后触发

#### Inherited from

EntityData.onDataChange

***

### onWillChange

`Readonly` **onWillChange**: `Event`<`EntityData`<[`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md), {}>>

修改前触发

#### Inherited from

EntityData.onWillChange

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

EntityData.opts

***

### renderData

**renderData**: [`FlowNodeRenderData`](/en/auto-docs/document/classes/FlowNodeRenderData.md)

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

EntityData.toDispose

***

### transform

**transform**: [`FlowNodeTransformData`](/en/auto-docs/document/classes/FlowNodeTransformData.md)

***

### type

`Static` **type**: `string` = `'FlowNodeTransitionData'`

#### Overrides

EntityData.type

## Accessors

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

### collapsed

`get` **collapsed**(): `boolean`

#### Returns

`boolean`

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

### isNodeEnd

`get` **isNodeEnd**(): `boolean`

#### Returns

`boolean`

***

### labels

`get` **labels**(): [`FlowTransitionLabel`](/en/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

#### Returns

[`FlowTransitionLabel`](/en/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

***

### lines

`get` **lines**(): [`FlowTransitionLine`](/en/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

#### Returns

[`FlowTransitionLine`](/en/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

EntityData.onDispose

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
| `newProps` | [`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md) | `Partial`<[`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md)> |

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

### formatLabels

**formatLabels**(`labels`): [`FlowTransitionLabel`](/en/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `labels` | [`FlowTransitionLabel`](/en/auto-docs/document/interfaces/FlowTransitionLabel.md)\[] |

#### Returns

[`FlowTransitionLabel`](/en/auto-docs/document/interfaces/FlowTransitionLabel.md)\[]

***

### formatLines

**formatLines**(`lines`): [`FlowTransitionLine`](/en/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `lines` | [`FlowTransitionLine`](/en/auto-docs/document/interfaces/FlowTransitionLine.md)\[] |

#### Returns

[`FlowTransitionLine`](/en/auto-docs/document/interfaces/FlowTransitionLine.md)\[]

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
| `props` | [`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md) |

#### Returns

`void`

#### Inherited from

EntityData.fullyUpdate

***

### getDefaultData

**getDefaultData**(): [`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md)

#### Returns

[`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md)

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

**update**(`props`, `value?`): `void`

更新单个数据

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md) | `Partial`<[`FlowNodeTransitionSchema`](/en/auto-docs/document/interfaces/FlowNodeTransitionSchema.md)> |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update
