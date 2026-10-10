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

* [namespace](/auto-docs/editor/interfaces/VariableConsumerAbilityOptions.md#namespace)
* [onInit](/auto-docs/editor/interfaces/VariableConsumerAbilityOptions.md#oninit)
* [parse](/auto-docs/editor/interfaces/VariableConsumerAbilityOptions.md#parse)
* [private](/auto-docs/editor/interfaces/VariableConsumerAbilityOptions.md#private)
* [scope](/auto-docs/editor/interfaces/VariableConsumerAbilityOptions.md#scope)

## Properties

### namespace

`Optional` **namespace**: `string`

#### Inherited from

VariableAbilityOptions.namespace

***

### onInit

`Optional` **onInit**: (`ctx`: `VariableAbilityInitCtx`) => `undefined` | [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Type declaration

(`ctx`): `undefined` | [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `VariableAbilityInitCtx` |

##### Returns

`undefined` | [`Disposable`](/auto-docs/editor/interfaces/Disposable-1.md)

#### Inherited from

VariableAbilityOptions.onInit

***

### parse

**parse**: (`v`: `V`, `ctx`: [`VariableAbilityParseContext`](/auto-docs/editor/interfaces/VariableAbilityParseContext.md)) => `undefined` | [`ASTNodeJSON`](/auto-docs/editor/interfaces/ASTNodeJSON.md)

#### Type declaration

(`v`, `ctx`): `undefined` | [`ASTNodeJSON`](/auto-docs/editor/interfaces/ASTNodeJSON.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `ctx` | [`VariableAbilityParseContext`](/auto-docs/editor/interfaces/VariableAbilityParseContext.md) |

##### Returns

`undefined` | [`ASTNodeJSON`](/auto-docs/editor/interfaces/ASTNodeJSON.md)

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
