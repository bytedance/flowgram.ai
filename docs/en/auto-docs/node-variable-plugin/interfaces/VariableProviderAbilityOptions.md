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

* [namespace](/en/auto-docs/node-variable-plugin/interfaces/VariableProviderAbilityOptions.md#namespace)
* [onInit](/en/auto-docs/node-variable-plugin/interfaces/VariableProviderAbilityOptions.md#oninit)
* [parse](/en/auto-docs/node-variable-plugin/interfaces/VariableProviderAbilityOptions.md#parse)
* [private](/en/auto-docs/node-variable-plugin/interfaces/VariableProviderAbilityOptions.md#private)
* [scope](/en/auto-docs/node-variable-plugin/interfaces/VariableProviderAbilityOptions.md#scope)

## Properties

### namespace

`Optional` **namespace**: `string`

#### Inherited from

VariableAbilityOptions.namespace

***

### onInit

`Optional` **onInit**: (`ctx`: `VariableAbilityInitCtx`) => `undefined` | `Disposable`

#### Type declaration

(`ctx`): `undefined` | `Disposable`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `VariableAbilityInitCtx` |

##### Returns

`undefined` | `Disposable`

#### Inherited from

VariableAbilityOptions.onInit

***

### parse

**parse**: (`v`: `V`, `ctx`: [`VariableAbilityParseContext`](/en/auto-docs/node-variable-plugin/interfaces/VariableAbilityParseContext.md)) => `VariableDeclarationJSON` | `VariableDeclarationJSON`\[]

#### Type declaration

(`v`, `ctx`): `VariableDeclarationJSON` | `VariableDeclarationJSON`\[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `ctx` | [`VariableAbilityParseContext`](/en/auto-docs/node-variable-plugin/interfaces/VariableAbilityParseContext.md) |

##### Returns

`VariableDeclarationJSON` | `VariableDeclarationJSON`\[]

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
