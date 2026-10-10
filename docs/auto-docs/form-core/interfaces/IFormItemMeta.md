# Interface: IFormItemMeta

## Hierarchy

* [`TreeNode`](/auto-docs/form-core/interfaces/TreeNode.md)<[`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)>

  ↳ **`IFormItemMeta`**

## Table of contents

### Properties

* [abilities](/auto-docs/form-core/interfaces/IFormItemMeta.md#abilities)
* [children](/auto-docs/form-core/interfaces/IFormItemMeta.md#children)
* [default](/auto-docs/form-core/interfaces/IFormItemMeta.md#default)
* [description](/auto-docs/form-core/interfaces/IFormItemMeta.md#description)
* [enum](/auto-docs/form-core/interfaces/IFormItemMeta.md#enum)
* [items](/auto-docs/form-core/interfaces/IFormItemMeta.md#items)
* [name](/auto-docs/form-core/interfaces/IFormItemMeta.md#name)
* [required](/auto-docs/form-core/interfaces/IFormItemMeta.md#required)
* [title](/auto-docs/form-core/interfaces/IFormItemMeta.md#title)
* [type](/auto-docs/form-core/interfaces/IFormItemMeta.md#type)

## Properties

### abilities

`Optional` **abilities**: [`FormItemAbilityMeta`](/auto-docs/form-core/interfaces/FormItemAbilityMeta.md)<`any`>\[]

扩展能力

***

### children

`Optional` **children**: [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)\[]

子表单项

#### Overrides

[TreeNode](/auto-docs/form-core/interfaces/TreeNode.md).[children](/auto-docs/form-core/interfaces/TreeNode.md#children)

***

### default

`Optional` **default**: [`FormDataType`](/auto-docs/form-core/types/FormDataType.md)

表单项默认值

***

### description

`Optional` **description**: `string`

表单项描述

***

### enum

`Optional` **enum**: [`FormDataType`](/auto-docs/form-core/types/FormDataType.md)\[]

枚举值

***

### items

`Optional` **items**: [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)

数组类型item的数据类型描述

***

### name

**name**: `string`

表单项名称

#### Overrides

[TreeNode](/auto-docs/form-core/interfaces/TreeNode.md).[name](/auto-docs/form-core/interfaces/TreeNode.md#name)

***

### required

`Optional` **required**: `boolean`

是否必填

***

### title

`Optional` **title**: `string`

表单项标题

***

### type

**type**: `"form-void"` | [`FormDataTypeName`](/auto-docs/form-core/types/FormDataTypeName.md)

数据类型
