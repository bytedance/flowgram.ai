# Interface: BindingOnSyntax\<T>

[interfaces](/auto-docs/fixed-layout-editor/modules/interfaces.md).BindingOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`BindingOnSyntax`**

  ↳ [`BindingWhenOnSyntax`](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)

## Table of contents

### Methods

* [onActivation](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md#onactivation)
* [onDeactivation](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingOnSyntax.md#ondeactivation)

## Methods

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/auto-docs/fixed-layout-editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/auto-docs/fixed-layout-editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>
