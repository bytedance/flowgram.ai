# Class: FlowNodeFormData

实体的数据块

## Hierarchy

* [`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)

  ↳ **`FlowNodeFormData`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#constructor)

### Properties

* [entity](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#entity)
* [formModel](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#formmodel)
* [onDataChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#ondatachange)
* [onWillChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#onwillchange)
* [opts](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#opts)
* [toDispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#todispose)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#type)

### Accessors

* [changeLocked](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#changelocked)
* [data](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#data)
* [disposed](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#disposed)
* [onDispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#ondispose)
* [type](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#type-1)
* [version](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#version)

### Methods

* [checkChanged](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#checkchanged)
* [createForm](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#createform)
* [dispose](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#dispose)
* [fireChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#firechange)
* [fireWillChange](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#firewillchange)
* [fromJSON](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#fromjson)
* [fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#fullyupdate)
* [getDefaultData](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#getdefaultdata)
* [getFormModel](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#getformmodel)
* [recreateForm](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#recreateform)
* [toJSON](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#tojson)
* [update](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#update)
* [updateFormValues](/en/auto-docs/fixed-layout-editor/classes/FlowNodeFormData.md#updateformvalues)

## Constructors

### constructor

**new FlowNodeFormData**(`entity`, `opts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`FlowNodeEntity`](/en/auto-docs/fixed-layout-editor/classes/FlowNodeEntity-1.md) |
| `opts` | `Options` |

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[constructor](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#constructor)

## Properties

### entity

**entity**: [`Entity`](/en/auto-docs/fixed-layout-editor/classes/Entity-1.md)<[`EntityOpts`](/en/auto-docs/fixed-layout-editor/interfaces/EntityOpts.md)>

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[entity](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#entity)

***

### formModel

`Readonly` **formModel**: `FormModel`

***

### onDataChange

`Readonly` **onDataChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>

修改后触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onDataChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#ondatachange)

***

### onWillChange

`Readonly` **onWillChange**: [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`EntityData`](/en/auto-docs/fixed-layout-editor/classes/EntityData.md)<`any`, {}>>

修改前触发

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[onWillChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#onwillchange)

***

### opts

`Optional` `Readonly` **opts**: `Object`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[opts](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#opts)

***

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[toDispose](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#todispose)

***

### type

`Static` **type**: `string`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[type](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#type)

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

`get` **onDispose**(): [`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[checkChanged](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#checkchanged)

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[dispose](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#dispose)

***

### fireChange

**fireChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#firechange)

***

### fireWillChange

**fireWillChange**(): `void`

#### Returns

`void`

#### Inherited from

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fireWillChange](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#firewillchange)

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fromJSON](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#fromjson)

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[fullyUpdate](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#fullyupdate)

***

### getDefaultData

**getDefaultData**(): `any`

初始化数据

#### Returns

`any`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[getDefaultData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#getdefaultdata)

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
| `formMetaOrFormMetaGenerator` | `FormMetaOrFormMetaGenerator` |
| `initialValue?` | `any` |

#### Returns

`void`

***

### toJSON

**toJSON**(): `any`

存储数据，一般在关闭浏览器后需要暂时存到 localStorage

#### Returns

`any`

#### Overrides

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[toJSON](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#tojson)

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

[EntityData](/en/auto-docs/fixed-layout-editor/classes/EntityData.md).[update](/en/auto-docs/fixed-layout-editor/classes/EntityData.md#update)

***

### updateFormValues

**updateFormValues**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`
