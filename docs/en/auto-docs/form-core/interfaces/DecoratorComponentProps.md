# Interface: DecoratorComponentProps\<CustomOptions>

**`Deprecated`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `CustomOptions` | `any` |

## Hierarchy

* [`FormItemFeedback`](/en/auto-docs/form-core/interfaces/FormItemFeedback.md)

* [`FormItemContext`](/en/auto-docs/form-core/interfaces/FormItemContext.md)

  ↳ **`DecoratorComponentProps`**

## Table of contents

### Properties

* [children](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#children)
* [context](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#context)
* [feedbackStatus](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#feedbackstatus)
* [feedbackText](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#feedbacktext)
* [flowNodeEntity](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#flownodeentity)
* [formItem](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#formitem)
* [formItemMeta](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#formitemmeta)
* [options](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#options)
* [playgroundContext](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#playgroundcontext)
* [readonly](/en/auto-docs/form-core/interfaces/DecoratorComponentProps.md#readonly)

## Properties

### children

`Optional` **children**: `any`

***

### context

**context**: [`SetterOrDecoratorContext`](/en/auto-docs/form-core/types/SetterOrDecoratorContext.md)

***

### feedbackStatus

`Optional` **feedbackStatus**: [`FeedbackStatus`](/en/auto-docs/form-core/types/FeedbackStatus.md)

#### Inherited from

[FormItemFeedback](/en/auto-docs/form-core/interfaces/FormItemFeedback.md).[feedbackStatus](/en/auto-docs/form-core/interfaces/FormItemFeedback.md#feedbackstatus)

***

### feedbackText

`Optional` **feedbackText**: `string`

#### Inherited from

[FormItemFeedback](/en/auto-docs/form-core/interfaces/FormItemFeedback.md).[feedbackText](/en/auto-docs/form-core/interfaces/FormItemFeedback.md#feedbacktext)

***

### flowNodeEntity

**flowNodeEntity**: `FlowNodeEntity`

**`Deprecated`**

Use context.node instead

#### Inherited from

[FormItemContext](/en/auto-docs/form-core/interfaces/FormItemContext.md).[flowNodeEntity](/en/auto-docs/form-core/interfaces/FormItemContext.md#flownodeentity)

***

### formItem

**formItem**: [`IFormItem`](/en/auto-docs/form-core/interfaces/IFormItem.md)<`any`>

**`Deprecated`**

#### Inherited from

[FormItemContext](/en/auto-docs/form-core/interfaces/FormItemContext.md).[formItem](/en/auto-docs/form-core/interfaces/FormItemContext.md#formitem)

***

### formItemMeta

**formItemMeta**: [`IFormItemMeta`](/en/auto-docs/form-core/interfaces/IFormItemMeta.md)

**`Deprecated`**

Use context.node instead

#### Inherited from

[FormItemContext](/en/auto-docs/form-core/interfaces/FormItemContext.md).[formItemMeta](/en/auto-docs/form-core/interfaces/FormItemContext.md#formitemmeta)

***

### options

**options**: [`DecoratorAbilityOptions`](/en/auto-docs/form-core/interfaces/DecoratorAbilityOptions.md) & `CustomOptions`

***

### playgroundContext

**playgroundContext**: `any`

**`Deprecated`**

Use context.playgroundContext instead

#### Inherited from

[FormItemContext](/en/auto-docs/form-core/interfaces/FormItemContext.md).[playgroundContext](/en/auto-docs/form-core/interfaces/FormItemContext.md#playgroundcontext)

***

### readonly

**readonly**: `boolean`
