# Interface: EffectProps\<CustomOptions, Event>

**`Deprecated`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `CustomOptions` | `any` |
| `Event` | [`EffectEvent`](/en/auto-docs/form-core/interfaces/EffectEvent.md) |

## Hierarchy

* [`FormItemContext`](/en/auto-docs/form-core/interfaces/FormItemContext.md)

  ↳ **`EffectProps`**

## Table of contents

### Properties

* [context](/en/auto-docs/form-core/interfaces/EffectProps.md#context)
* [event](/en/auto-docs/form-core/interfaces/EffectProps.md#event)
* [flowNodeEntity](/en/auto-docs/form-core/interfaces/EffectProps.md#flownodeentity)
* [formItem](/en/auto-docs/form-core/interfaces/EffectProps.md#formitem)
* [formItemMeta](/en/auto-docs/form-core/interfaces/EffectProps.md#formitemmeta)
* [options](/en/auto-docs/form-core/interfaces/EffectProps.md#options)
* [playgroundContext](/en/auto-docs/form-core/interfaces/EffectProps.md#playgroundcontext)

## Properties

### context

**context**: [`FormItemMaterialContext`](/en/auto-docs/form-core/interfaces/FormItemMaterialContext.md)

***

### event

**event**: `Event`

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

**options**: [`EffectAbilityOptions`](/en/auto-docs/form-core/interfaces/EffectAbilityOptions.md) & `CustomOptions`

***

### playgroundContext

**playgroundContext**: `any`

**`Deprecated`**

Use context.playgroundContext instead

#### Inherited from

[FormItemContext](/en/auto-docs/form-core/interfaces/FormItemContext.md).[playgroundContext](/en/auto-docs/form-core/interfaces/FormItemContext.md#playgroundcontext)
