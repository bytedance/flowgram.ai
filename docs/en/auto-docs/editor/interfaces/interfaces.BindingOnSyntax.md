# Interface: BindingOnSyntax\<T>

[interfaces](/en/auto-docs/editor/modules/interfaces.md).BindingOnSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

* **`BindingOnSyntax`**

  ↳ [`BindingWhenOnSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenOnSyntax.md)

## Table of contents

### Methods

* [onActivation](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md#onactivation)
* [onDeactivation](/en/auto-docs/editor/interfaces/interfaces.BindingOnSyntax.md#ondeactivation)

## Methods

### onActivation

**onActivation**(`fn`): [`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`context`: [`Context`](/en/auto-docs/editor/interfaces/interfaces.Context.md), `injectable`: `T`) => `T` | `Promise`<`T`> |

#### Returns

[`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

***

### onDeactivation

**onDeactivation**(`fn`): [`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`injectable`: `T`) => `void` | `Promise`<`void`> |

#### Returns

[`BindingWhenSyntax`](/en/auto-docs/editor/interfaces/interfaces.BindingWhenSyntax.md)<`T`>
