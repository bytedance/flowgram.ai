# Class: ScopeChainTransformService

A service for transforming scope chains.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#constructor)

### Properties

* [document](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#document)
* [variableEngine](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#variableengine)

### Methods

* [hasTransformer](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#hastransformer)
* [registerTransformer](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#registertransformer)
* [transformCovers](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#transformcovers)
* [transformDeps](/en/auto-docs/fixed-layout-editor/classes/ScopeChainTransformService.md#transformdeps)

## Constructors

### constructor

**new ScopeChainTransformService**(`configs?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs?` | `VariableChainConfig` |

## Properties

### document

**document**: [`FlowDocument`](/en/auto-docs/fixed-layout-editor/classes/FlowDocument.md)<[`FlowDocumentJSON`](/en/auto-docs/fixed-layout-editor/types/FlowDocumentJSON.md)>

***

### variableEngine

**variableEngine**: [`VariableEngine`](/en/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

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

**transformCovers**(`scopes`, `param1`): [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Transforms the cover scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopes` | [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[] | The array of scopes to transform. |
| `param1` | `Object` | The context for the transformation. |
| `param1.scope` | [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>> | - |

#### Returns

[`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

The transformed array of scopes.

***

### transformDeps

**transformDeps**(`scopes`, `param1`): [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Transforms the dependency scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopes` | [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[] | The array of scopes to transform. |
| `param1` | `Object` | The context for the transformation. |
| `param1.scope` | [`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>> | - |

#### Returns

[`Scope`](/en/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

The transformed array of scopes.
