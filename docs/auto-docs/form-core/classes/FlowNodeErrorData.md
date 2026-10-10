# Class: FlowNodeErrorData

## Hierarchy

* `EntityData`

  ↳ **`FlowNodeErrorData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FlowNodeErrorData.md#constructor)

### Properties

* [entity](/auto-docs/form-core/classes/FlowNodeErrorData.md#entity)
* [onDataChange](/auto-docs/form-core/classes/FlowNodeErrorData.md#ondatachange)
* [onWillChange](/auto-docs/form-core/classes/FlowNodeErrorData.md#onwillchange)
* [opts](/auto-docs/form-core/classes/FlowNodeErrorData.md#opts)
* [toDispose](/auto-docs/form-core/classes/FlowNodeErrorData.md#todispose)
* [type](/auto-docs/form-core/classes/FlowNodeErrorData.md#type)

### Accessors

* [changeLocked](/auto-docs/form-core/classes/FlowNodeErrorData.md#changelocked)
* [data](/auto-docs/form-core/classes/FlowNodeErrorData.md#data)
* [disposed](/auto-docs/form-core/classes/FlowNodeErrorData.md#disposed)
* [onDispose](/auto-docs/form-core/classes/FlowNodeErrorData.md#ondispose)
* [type](/auto-docs/form-core/classes/FlowNodeErrorData.md#type-1)
* [version](/auto-docs/form-core/classes/FlowNodeErrorData.md#version)

### Methods

* [checkChanged](/auto-docs/form-core/classes/FlowNodeErrorData.md#checkchanged)
* [dispose](/auto-docs/form-core/classes/FlowNodeErrorData.md#dispose)
* [fireChange](/auto-docs/form-core/classes/FlowNodeErrorData.md#firechange)
* [fireWillChange](/auto-docs/form-core/classes/FlowNodeErrorData.md#firewillchange)
* [fromJSON](/auto-docs/form-core/classes/FlowNodeErrorData.md#fromjson)
* [fullyUpdate](/auto-docs/form-core/classes/FlowNodeErrorData.md#fullyupdate)
* [getDefaultData](/auto-docs/form-core/classes/FlowNodeErrorData.md#getdefaultdata)
* [getError](/auto-docs/form-core/classes/FlowNodeErrorData.md#geterror)
* [setError](/auto-docs/form-core/classes/FlowNodeErrorData.md#seterror)
* [toJSON](/auto-docs/form-core/classes/FlowNodeErrorData.md#tojson)
* [update](/auto-docs/form-core/classes/FlowNodeErrorData.md#update)

## Constructors

### constructor

**new FlowNodeErrorData**(`entity`, `opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `Entity`<`EntityOpts`> |
| `opts?` | `Object` |

#### Inherited from

EntityData.constructor

## Properties

### entity

**entity**: `Entity`<`EntityOpts`>

#### Inherited from

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

`Static` **type**: `string` = `'FlowNodeErrorData'`

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

**getDefaultData**(): [`ErrorData`](/auto-docs/form-core/interfaces/ErrorData.md)

#### Returns

[`ErrorData`](/auto-docs/form-core/interfaces/ErrorData.md)

#### Overrides

EntityData.getDefaultData

***

### getError

**getError**(): `Error`

#### Returns

`Error`

***

### setError

**setError**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `null` | `Error` |

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
| `props` | `any` |
| `value?` | `any` |

#### Returns

`void`

#### Inherited from

EntityData.update
