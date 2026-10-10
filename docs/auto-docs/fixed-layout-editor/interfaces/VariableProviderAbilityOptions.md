# Interface: VariableProviderAbilityOptions\<V>

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

## Hierarchy

* `VariableAbilityOptions`

  ↳ **`VariableProviderAbilityOptions`**

## Table of contents

### Properties

* [namespace](/auto-docs/fixed-layout-editor/interfaces/VariableProviderAbilityOptions.md#namespace)
* [onInit](/auto-docs/fixed-layout-editor/interfaces/VariableProviderAbilityOptions.md#oninit)
* [parse](/auto-docs/fixed-layout-editor/interfaces/VariableProviderAbilityOptions.md#parse)
* [private](/auto-docs/fixed-layout-editor/interfaces/VariableProviderAbilityOptions.md#private)
* [scope](/auto-docs/fixed-layout-editor/interfaces/VariableProviderAbilityOptions.md#scope)

## Properties

### namespace

`Optional` **namespace**: `string`

#### Inherited from

VariableAbilityOptions.namespace

***

### onInit

`Optional` **onInit**: (`ctx`: `VariableAbilityInitCtx`) => `undefined` | [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`ctx`): `undefined` | [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `VariableAbilityInitCtx` |

##### Returns

`undefined` | [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

VariableAbilityOptions.onInit

***

### parse

**parse**: (`v`: `V`, `ctx`: [`VariableAbilityParseContext`](/auto-docs/fixed-layout-editor/interfaces/VariableAbilityParseContext.md)) => [`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md) | [`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md)\[]

#### Type declaration

(`v`, `ctx`): [`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md) | [`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `ctx` | [`VariableAbilityParseContext`](/auto-docs/fixed-layout-editor/interfaces/VariableAbilityParseContext.md) |

##### Returns

[`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md) | [`VariableDeclarationJSON`](/auto-docs/fixed-layout-editor/types/VariableDeclarationJSON.md)\[]

***

### private

`Optional` **private**: `boolean`

**`Deprecated`**

use scope: 'private'

#### Inherited from

VariableAbilityOptions.private

***

### scope

`Optional` **scope**: `"private"` | `"public"`

#### Inherited from

VariableAbilityOptions.scope
