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

* [namespace](/en/auto-docs/free-layout-editor/interfaces/VariableConsumerAbilityOptions.md#namespace)
* [onInit](/en/auto-docs/free-layout-editor/interfaces/VariableConsumerAbilityOptions.md#oninit)
* [parse](/en/auto-docs/free-layout-editor/interfaces/VariableConsumerAbilityOptions.md#parse)
* [private](/en/auto-docs/free-layout-editor/interfaces/VariableConsumerAbilityOptions.md#private)
* [scope](/en/auto-docs/free-layout-editor/interfaces/VariableConsumerAbilityOptions.md#scope)

## Properties

### namespace

`Optional` **namespace**: `string`

#### Inherited from

VariableAbilityOptions.namespace

***

### onInit

`Optional` **onInit**: (`ctx`: `VariableAbilityInitCtx`) => `undefined` | [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Type declaration

(`ctx`): `undefined` | [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `VariableAbilityInitCtx` |

##### Returns

`undefined` | [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

#### Inherited from

VariableAbilityOptions.onInit

***

### parse

**parse**: (`v`: `V`, `ctx`: [`VariableAbilityParseContext`](/en/auto-docs/free-layout-editor/interfaces/VariableAbilityParseContext.md)) => `undefined` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md)

#### Type declaration

(`v`, `ctx`): `undefined` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `ctx` | [`VariableAbilityParseContext`](/en/auto-docs/free-layout-editor/interfaces/VariableAbilityParseContext.md) |

##### Returns

`undefined` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md)

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
