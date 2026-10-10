# Interface: BindingToSyntax\<T>

[interfaces](/en/auto-docs/free-layout-editor/modules/interfaces.md).BindingToSyntax

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

* [to](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#to)
* [toAutoFactory](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toautofactory)
* [toAutoNamedFactory](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toautonamedfactory)
* [toConstantValue](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toconstantvalue)
* [toConstructor](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toconstructor)
* [toDynamicValue](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#todynamicvalue)
* [toFactory](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#tofactory)
* [toFunction](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#tofunction)
* [toProvider](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toprovider)
* [toSelf](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toself)
* [toService](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingToSyntax.md#toservice)

## Methods

### to

**to**(`constructor`): [`BindingInWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructor` | `Newable`<`T`> |

#### Returns

[`BindingInWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)<`T`>

***

### toAutoFactory

**toAutoFactory**<`T2`>(`serviceIdentifier`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T2`> |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toAutoNamedFactory

**toAutoNamedFactory**<`T2`>(`serviceIdentifier`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `serviceIdentifier` | `ServiceIdentifier`<`T2`> |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toConstantValue

**toConstantValue**(`value`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toConstructor

**toConstructor**<`T2`>(`constructor`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `constructor` | `Newable`<`T2`> |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toDynamicValue

**toDynamicValue**(`func`): [`BindingInWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`DynamicValue`](/en/auto-docs/free-layout-editor/types/interfaces.DynamicValue.md)<`T`> |

#### Returns

[`BindingInWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)<`T`>

***

### toFactory

**toFactory**<`T2`, `T3`, `T4`>(`factory`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T2` | `T2` |
| `T3` | extends `unknown`\[] = `unknown`\[] |
| `T4` | extends `unknown`\[] = `unknown`\[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `factory` | [`FactoryCreator`](/en/auto-docs/free-layout-editor/types/interfaces.FactoryCreator.md)<`T2`, `T3`, `T4`> |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toFunction

**toFunction**(`func`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `T` |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toProvider

**toProvider**<`T2`>(`provider`): [`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

#### Type parameters

| Name |
| :------ |
| `T2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`ProviderCreator`](/en/auto-docs/free-layout-editor/types/interfaces.ProviderCreator.md)<`T2`> |

#### Returns

[`BindingWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingWhenOnSyntax.md)<`T`>

***

### toSelf

**toSelf**(): [`BindingInWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)<`T`>

#### Returns

[`BindingInWhenOnSyntax`](/en/auto-docs/free-layout-editor/interfaces/interfaces.BindingInWhenOnSyntax.md)<`T`>

***

### toService

**toService**(`service`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `ServiceIdentifier`<`T`> |

#### Returns

`void`
