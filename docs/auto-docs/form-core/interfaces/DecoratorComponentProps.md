# Interface: DecoratorComponentProps\<CustomOptions>

**`Deprecated`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `CustomOptions` | `any` |

## Hierarchy

* [`FormItemFeedback`](/auto-docs/form-core/interfaces/FormItemFeedback.md)

* [`FormItemContext`](/auto-docs/form-core/interfaces/FormItemContext.md)

  ↳ **`DecoratorComponentProps`**

## Table of contents

### Properties

* [children](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#children)
* [context](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#context)
* [feedbackStatus](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#feedbackstatus)
* [feedbackText](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#feedbacktext)
* [flowNodeEntity](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#flownodeentity)
* [formItem](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#formitem)
* [formItemMeta](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#formitemmeta)
* [options](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#options)
* [playgroundContext](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#playgroundcontext)
* [readonly](/auto-docs/form-core/interfaces/DecoratorComponentProps.md#readonly)

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

### options

**options**: [`DecoratorAbilityOptions`](/auto-docs/form-core/interfaces/DecoratorAbilityOptions.md) & `CustomOptions`

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
