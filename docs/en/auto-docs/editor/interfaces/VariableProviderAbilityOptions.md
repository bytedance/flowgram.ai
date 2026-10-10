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

* [namespace](/en/auto-docs/editor/interfaces/VariableProviderAbilityOptions.md#namespace)
* [onInit](/en/auto-docs/editor/interfaces/VariableProviderAbilityOptions.md#oninit)
* [parse](/en/auto-docs/editor/interfaces/VariableProviderAbilityOptions.md#parse)
* [private](/en/auto-docs/editor/interfaces/VariableProviderAbilityOptions.md#private)
* [scope](/en/auto-docs/editor/interfaces/VariableProviderAbilityOptions.md#scope)

## Properties

### namespace

`Optional` **namespace**: `string`

#### Inherited from

VariableAbilityOptions.namespace

***

### onInit

`Optional` **onInit**: (`ctx`: `VariableAbilityInitCtx`) => `undefined` | [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Type declaration

(`ctx`): `undefined` | [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `VariableAbilityInitCtx` |

##### Returns

`undefined` | [`Disposable`](/en/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

VariableAbilityOptions.onInit

***

### parse

**parse**: (`v`: `V`, `ctx`: [`VariableAbilityParseContext`](/en/auto-docs/editor/interfaces/VariableAbilityParseContext.md)) => [`VariableDeclarationJSON`](/en/auto-docs/editor/types/VariableDeclarationJSON.md) | [`VariableDeclarationJSON`](/en/auto-docs/editor/types/VariableDeclarationJSON.md)\[]

#### Type declaration

(`v`, `ctx`): [`VariableDeclarationJSON`](/en/auto-docs/editor/types/VariableDeclarationJSON.md) | [`VariableDeclarationJSON`](/en/auto-docs/editor/types/VariableDeclarationJSON.md)\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `ctx` | [`VariableAbilityParseContext`](/en/auto-docs/editor/interfaces/VariableAbilityParseContext.md) |

##### Returns

[`VariableDeclarationJSON`](/en/auto-docs/editor/types/VariableDeclarationJSON.md) | [`VariableDeclarationJSON`](/en/auto-docs/editor/types/VariableDeclarationJSON.md)\[]

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
