# Interface: FormItemMaterialContext

## Table of contents

### Properties

* [form](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#form)
* [getFormItemValueByPath](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#getformitemvaluebypath)
* [index](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#index)
* [meta](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#meta)
* [node](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#node)
* [onFormValidate](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#onformvalidate)
* [path](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#path)
* [playgroundContext](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#playgroundcontext)
* [readonly](/auto-docs/form-core/interfaces/FormItemMaterialContext.md#readonly)

## Properties

### form

**form**: [`FormModel`](/auto-docs/form-core/classes/FormModel.md)

获取FormModel原始模型

***

### getFormItemValueByPath

**getFormItemValueByPath**: \<T>(`path`: `string`) => `T`

#### Type declaration

<`T`>(`path`): `T`

通过路径获取表单项的值

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | 表单项在当前表单中的绝对路径，路径协议遵循glob |

##### Returns

`T`

***

### index

`Optional` **index**: `number`

数组场景下当前项的index

***

### meta

**meta**: [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)

当前表单项的meta

***

### node

**node**: `FlowNodeEntity`

获取Node模型

***

### onFormValidate

**onFormValidate**: `Event`<[`FormModel`](/auto-docs/form-core/classes/FormModel.md)>

节点表单校验回调函数注册

***

### path

**path**: `string`

当前表单项的路径

***

### playgroundContext

**playgroundContext**: `any`

业务注入的全局context

***

### readonly

**readonly**: `boolean`

节点引擎全局readonly
