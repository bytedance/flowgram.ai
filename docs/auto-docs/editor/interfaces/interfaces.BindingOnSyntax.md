# Interface: BindingOnSyntax\<T>

[interfaces](/auto-docs/editor/modules/interfaces.md).BindingOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`BindingOnSyntax`**

  ↳ [`BindingWhenOnSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)

## Table of contents

### Methods

* [onActivation](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md#onactivation)
* [onDeactivation](/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md#ondeactivation)

## Methods

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/auto-docs/editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>
