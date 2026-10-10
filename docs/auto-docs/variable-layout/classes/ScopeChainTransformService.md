# Class: ScopeChainTransformService

A service for transforming scope chains.

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#constructor)

### Properties

* [document](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#document)
* [variableEngine](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#variableengine)

### Methods

* [hasTransformer](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#hastransformer)
* [registerTransformer](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#registertransformer)
* [transformCovers](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#transformcovers)
* [transformDeps](/auto-docs/variable-layout/classes/ScopeChainTransformService.md#transformdeps)

## Constructors

### constructor

**new ScopeChainTransformService**(`configs?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs?` | [`VariableChainConfig`](/auto-docs/variable-layout/variables/VariableChainConfig-1.md) |

## Properties

### document

**document**: `FlowDocument`<`FlowDocumentJSON`>

***

### variableEngine

**variableEngine**: `VariableEngine`

## Methods

### hasTransformer

**hasTransformer**(`transformerId`): `boolean`

check if transformer registered

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transformerId` | `string` | used to identify transformer, prevent duplicated |

#### Returns

`boolean`

***

### registerTransformer

**registerTransformer**(`transformerId`, `transformer`): `void`

register new transform function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transformerId` | `string` | used to identify transformer, prevent duplicated transformer |
| `transformer` | `Object` | The transformer to register. |
| `transformer.transformCovers` | `IScopeTransformer` | - |
| `transformer.transformDeps` | `IScopeTransformer` | - |

#### Returns

`void`

***

### transformCovers

**transformCovers**(`scopes`, `param1`): `Scope`<`Record`<`string`, `any`>>\[]

Transforms the cover scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopes` | `Scope`<`Record`<`string`, `any`>>\[] | The array of scopes to transform. |
| `param1` | `Object` | The context for the transformation. |
| `param1.scope` | `Scope`<`Record`<`string`, `any`>> | - |

#### Returns

`Scope`<`Record`<`string`, `any`>>\[]

The transformed array of scopes.

***

### transformDeps

**transformDeps**(`scopes`, `param1`): `Scope`<`Record`<`string`, `any`>>\[]

Transforms the dependency scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopes` | `Scope`<`Record`<`string`, `any`>>\[] | The array of scopes to transform. |
| `param1` | `Object` | The context for the transformation. |
| `param1.scope` | `Scope`<`Record`<`string`, `any`>> | - |

#### Returns

`Scope`<`Record`<`string`, `any`>>\[]

The transformed array of scopes.
