# Class: FlowNodeFormData

## Hierarchy

* `EntityData`

  ↳ **`FlowNodeFormData`**

## Table of contents

### Constructors

* [constructor](/auto-docs/form-core/classes/FlowNodeFormData.md#constructor)

### Properties

* [entity](/auto-docs/form-core/classes/FlowNodeFormData.md#entity)
* [formModel](/auto-docs/form-core/classes/FlowNodeFormData.md#formmodel)
* [onDataChange](/auto-docs/form-core/classes/FlowNodeFormData.md#ondatachange)
* [onWillChange](/auto-docs/form-core/classes/FlowNodeFormData.md#onwillchange)
* [opts](/auto-docs/form-core/classes/FlowNodeFormData.md#opts)
* [toDispose](/auto-docs/form-core/classes/FlowNodeFormData.md#todispose)
* [type](/auto-docs/form-core/classes/FlowNodeFormData.md#type)

### Accessors

* [changeLocked](/auto-docs/form-core/classes/FlowNodeFormData.md#changelocked)
* [data](/auto-docs/form-core/classes/FlowNodeFormData.md#data)
* [disposed](/auto-docs/form-core/classes/FlowNodeFormData.md#disposed)
* [onDispose](/auto-docs/form-core/classes/FlowNodeFormData.md#ondispose)
* [type](/auto-docs/form-core/classes/FlowNodeFormData.md#type-1)
* [version](/auto-docs/form-core/classes/FlowNodeFormData.md#version)

### Methods

* [checkChanged](/auto-docs/form-core/classes/FlowNodeFormData.md#checkchanged)
* [createForm](/auto-docs/form-core/classes/FlowNodeFormData.md#createform)
* [dispose](/auto-docs/form-core/classes/FlowNodeFormData.md#dispose)
* [fireChange](/auto-docs/form-core/classes/FlowNodeFormData.md#firechange)
* [fireWillChange](/auto-docs/form-core/classes/FlowNodeFormData.md#firewillchange)
* [fromJSON](/auto-docs/form-core/classes/FlowNodeFormData.md#fromjson)
* [fullyUpdate](/auto-docs/form-core/classes/FlowNodeFormData.md#fullyupdate)
* [getDefaultData](/auto-docs/form-core/classes/FlowNodeFormData.md#getdefaultdata)
* [getFormModel](/auto-docs/form-core/classes/FlowNodeFormData.md#getformmodel)
* [recreateForm](/auto-docs/form-core/classes/FlowNodeFormData.md#recreateform)
* [toJSON](/auto-docs/form-core/classes/FlowNodeFormData.md#tojson)
* [update](/auto-docs/form-core/classes/FlowNodeFormData.md#update)
* [updateFormValues](/auto-docs/form-core/classes/FlowNodeFormData.md#updateformvalues)

## Constructors

### constructor

**new FlowNodeFormData**(`entity`, `opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `FlowNodeEntity` |
| `opts` | `Options` |

#### Overrides

EntityData.constructor

## Properties

### entity

**entity**: `Entity`<`EntityOpts`>

#### Inherited from

EntityData.entity

***

### formModel

`Readonly` **formModel**: [`FormModel`](/auto-docs/form-core/classes/FormModel.md)

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

`Static` **type**: `string` = `'FlowNodeEntityFormData'`

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

### createForm

**createForm**(`formMetaOrFormMetaGenerator`, `initialValue?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMetaOrFormMetaGenerator` | `any` |
| `initialValue?` | `any` |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Overrides

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

### getFormModel

**getFormModel**<`TFormModel`>(): `TFormModel`

#### Type parameters

| Name |
| :------ |
| `TFormModel` |

#### Returns

`TFormModel`

***

### recreateForm

**recreateForm**(`formMetaOrFormMetaGenerator`, `initialValue?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formMetaOrFormMetaGenerator` | [`FormMetaOrFormMetaGenerator`](/auto-docs/form-core/types/FormMetaOrFormMetaGenerator.md) |
| `initialValue?` | `any` |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

#### Returns

`any`

#### Overrides

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

### updateFormValues

**updateFormValues**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`
