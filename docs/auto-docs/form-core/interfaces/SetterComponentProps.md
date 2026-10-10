# Interface: SetterComponentProps\<T, CustomOptions>

**`Deprecated`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `CustomOptions` | `any` |

## Hierarchy

* [`FormItemFeedback`](/auto-docs/form-core/interfaces/FormItemFeedback.md)

* [`FormItemContext`](/auto-docs/form-core/interfaces/FormItemContext.md)

  ↳ **`SetterComponentProps`**

## Table of contents

### Properties

* [children](/auto-docs/form-core/interfaces/SetterComponentProps.md#children)
* [context](/auto-docs/form-core/interfaces/SetterComponentProps.md#context)
* [feedbackStatus](/auto-docs/form-core/interfaces/SetterComponentProps.md#feedbackstatus)
* [feedbackText](/auto-docs/form-core/interfaces/SetterComponentProps.md#feedbacktext)
* [flowNodeEntity](/auto-docs/form-core/interfaces/SetterComponentProps.md#flownodeentity)
* [formItem](/auto-docs/form-core/interfaces/SetterComponentProps.md#formitem)
* [formItemMeta](/auto-docs/form-core/interfaces/SetterComponentProps.md#formitemmeta)
* [onChange](/auto-docs/form-core/interfaces/SetterComponentProps.md#onchange)
* [options](/auto-docs/form-core/interfaces/SetterComponentProps.md#options)
* [playgroundContext](/auto-docs/form-core/interfaces/SetterComponentProps.md#playgroundcontext)
* [readonly](/auto-docs/form-core/interfaces/SetterComponentProps.md#readonly)
* [value](/auto-docs/form-core/interfaces/SetterComponentProps.md#value)

## Properties

### children

`Optional` **children**: `any`

***

### context

**context**: [`SetterOrDecoratorContext`](/auto-docs/form-core/types/SetterOrDecoratorContext.md)

***

### feedbackStatus

`Optional` **feedbackStatus**: [`FeedbackStatus`](/auto-docs/form-core/types/FeedbackStatus.md)

#### Inherited from

[FormItemFeedback](/auto-docs/form-core/interfaces/FormItemFeedback.md).[feedbackStatus](/auto-docs/form-core/interfaces/FormItemFeedback.md#feedbackstatus)

***

### feedbackText

`Optional` **feedbackText**: `string`

#### Inherited from

[FormItemFeedback](/auto-docs/form-core/interfaces/FormItemFeedback.md).[feedbackText](/auto-docs/form-core/interfaces/FormItemFeedback.md#feedbacktext)

***

### flowNodeEntity

**flowNodeEntity**: `FlowNodeEntity`

**`Deprecated`**

Use context.node instead

#### Inherited from

[FormItemContext](/auto-docs/form-core/interfaces/FormItemContext.md).[flowNodeEntity](/auto-docs/form-core/interfaces/FormItemContext.md#flownodeentity)

***

### formItem

**formItem**: [`IFormItem`](/auto-docs/form-core/interfaces/IFormItem.md)<`any`>

**`Deprecated`**

#### Inherited from

[FormItemContext](/auto-docs/form-core/interfaces/FormItemContext.md).[formItem](/auto-docs/form-core/interfaces/FormItemContext.md#formitem)

***

### formItemMeta

**formItemMeta**: [`IFormItemMeta`](/auto-docs/form-core/interfaces/IFormItemMeta.md)

**`Deprecated`**

Use context.node instead

#### Inherited from

[FormItemContext](/auto-docs/form-core/interfaces/FormItemContext.md).[formItemMeta](/auto-docs/form-core/interfaces/FormItemContext.md#formitemmeta)

***

### onChange

**onChange**: (`v`: `T`) => `void`

#### Type declaration

(`v`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

##### Returns

`void`

***

### options

**options**: [`SetterAbilityOptions`](/auto-docs/form-core/interfaces/SetterAbilityOptions.md) & `CustomOptions`

***

### playgroundContext

**playgroundContext**: `any`

**`Deprecated`**

Use context.playgroundContext instead

#### Inherited from

[FormItemContext](/auto-docs/form-core/interfaces/FormItemContext.md).[playgroundContext](/auto-docs/form-core/interfaces/FormItemContext.md#playgroundcontext)

***

### readonly

**readonly**: `boolean`

节点引擎全局readonly

***

### value

**value**: `T`
