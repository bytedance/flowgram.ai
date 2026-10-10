# Interface: IFormItemMeta

## Hierarchy

* [`TreeNode`](/en/auto-docs/form-core/interfaces/TreeNode.md)<[`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)>

  ↳ **`IFormItemMeta`**

## Table of contents

### Properties

* [abilities](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#abilities)
* [children](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#children)
* [default](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#default)
* [description](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#description)
* [enum](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#enum)
* [items](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#items)
* [name](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#name)
* [required](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#required)
* [title](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#title)
* [type](/en/auto-docs/form-core/interfaces/IFormItemMeta.md#type)

## Properties

### abilities

`Optional` **abilities**: [`FormItemAbilityMeta`](/en/auto-docs/form-core/interfaces/FormItemAbilityMeta.md)<`any`>\[]

扩展能力

***

### children

`Optional` **children**: [`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)\[]

子表单项

#### Overrides

[TreeNode](/en/auto-docs/form-core/interfaces/TreeNode.md).[children](/en/auto-docs/form-core/interfaces/TreeNode.md#children)

***

### default

`Optional` **default**: [`FormDataType`](/en/auto-docs/form-core/types/FormDataType.md)

表单项默认值

***

### description

`Optional` **description**: `string`

表单项描述

***

### enum

`Optional` **enum**: [`FormDataType`](/en/auto-docs/form-core/types/FormDataType.md)\[]

枚举值

***

### items

`Optional` **items**: [`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)

数组类型item的数据类型描述

***

### name

**name**: `string`

表单项名称

#### Overrides

[TreeNode](/en/auto-docs/form-core/interfaces/TreeNode.md).[name](/en/auto-docs/form-core/interfaces/TreeNode.md#name)

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

**type**: `"form-void"` | [`FormDataTypeName`](/en/auto-docs/form-core/types/FormDataTypeName.md)

数据类型
