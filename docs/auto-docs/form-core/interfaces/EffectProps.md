# Interface: EffectProps\<CustomOptions, Event>

**`Deprecated`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `CustomOptions` | `any` |
| `Event` | [`EffectEvent`](/auto-docs/form-core/interfaces/EffectEvent.md) |

## Hierarchy

* [`FormItemContext`](/auto-docs/form-core/interfaces/FormItemContext.md)

  ↳ **`EffectProps`**

## Table of contents

### Properties

* [context](/auto-docs/form-core/interfaces/EffectProps.md#context)
* [event](/auto-docs/form-core/interfaces/EffectProps.md#event)
* [flowNodeEntity](/auto-docs/form-core/interfaces/EffectProps.md#flownodeentity)
* [formItem](/auto-docs/form-core/interfaces/EffectProps.md#formitem)
* [formItemMeta](/auto-docs/form-core/interfaces/EffectProps.md#formitemmeta)
* [options](/auto-docs/form-core/interfaces/EffectProps.md#options)
* [playgroundContext](/auto-docs/form-core/interfaces/EffectProps.md#playgroundcontext)

## Properties

### context

**context**: [`FormItemMaterialContext`](/auto-docs/form-core/interfaces/FormItemMaterialContext.md)

***

### event

**event**: `Event`

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

**options**: [`EffectAbilityOptions`](/auto-docs/form-core/interfaces/EffectAbilityOptions.md) & `CustomOptions`

***

### playgroundContext

**playgroundContext**: `any`

**`Deprecated`**

Use context.playgroundContext instead

#### Inherited from

[FormItemContext](/auto-docs/form-core/interfaces/FormItemContext.md).[playgroundContext](/auto-docs/form-core/interfaces/FormItemContext.md#playgroundcontext)
