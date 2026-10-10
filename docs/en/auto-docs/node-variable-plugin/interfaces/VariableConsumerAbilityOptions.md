# Interface: VariableConsumerAbilityOptions\<V>

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

## Hierarchy

* `VariableAbilityOptions`

  ↳ **`VariableConsumerAbilityOptions`**

## Table of contents

### Properties

* [namespace](/en/auto-docs/node-variable-plugin/interfaces/VariableConsumerAbilityOptions.md#namespace)
* [onInit](/en/auto-docs/node-variable-plugin/interfaces/VariableConsumerAbilityOptions.md#oninit)
* [parse](/en/auto-docs/node-variable-plugin/interfaces/VariableConsumerAbilityOptions.md#parse)
* [private](/en/auto-docs/node-variable-plugin/interfaces/VariableConsumerAbilityOptions.md#private)
* [scope](/en/auto-docs/node-variable-plugin/interfaces/VariableConsumerAbilityOptions.md#scope)

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

**parse**: (`v`: `V`, `ctx`: [`VariableAbilityParseContext`](/en/auto-docs/node-variable-plugin/interfaces/VariableAbilityParseContext.md)) => `undefined` | `ASTNodeJSON`

#### Type declaration

(`v`, `ctx`): `undefined` | `ASTNodeJSON`

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `ctx` | [`VariableAbilityParseContext`](/en/auto-docs/node-variable-plugin/interfaces/VariableAbilityParseContext.md) |

##### Returns

`undefined` | `ASTNodeJSON`

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
