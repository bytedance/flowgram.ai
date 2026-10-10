# Class: FixedLayoutScopeChain

Scope chain implementation based on `FlowVirtualTree`.

## Hierarchy

* `ScopeChain`

  ↳ **`FixedLayoutScopeChain`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#constructor)

### Properties

* [toDispose](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#todispose)
* [tree](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#tree)
* [variableEngineProvider](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#variableengineprovider)

### Accessors

* [disposed](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#disposed)
* [onDispose](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#ondispose)
* [variableEngine](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#variableengine)

### Methods

* [bindTree](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#bindtree)
* [dispose](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#dispose)
* [getCovers](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#getcovers)
* [getDeps](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#getdeps)
* [refreshAllChange](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#refreshallchange)
* [sortAll](/auto-docs/variable-layout/classes/FixedLayoutScopeChain.md#sortall)

## Constructors

### constructor

**new FixedLayoutScopeChain**(`flowDocument`, `configs?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `flowDocument` | `FlowDocument`<`FlowDocumentJSON`> |
| `configs?` | [`VariableChainConfig`](/auto-docs/variable-layout/variables/VariableChainConfig-1.md) |

#### Overrides

ScopeChain.constructor

## Properties

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

ScopeChain.toDispose

***

### tree

**tree**: `undefined` | `FlowVirtualTree`<`ScopeChainNode`>

***

### variableEngineProvider

**variableEngineProvider**: `VariableEngineProvider`

#### Inherited from

ScopeChain.variableEngineProvider

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ScopeChain.disposed

***

### onDispose

`get` **onDispose**(): `Event`<`void`>

#### Returns

`Event`<`void`>

#### Inherited from

ScopeChain.onDispose

***

### variableEngine

`get` **variableEngine**(): `VariableEngine`

#### Returns

`VariableEngine`

#### Inherited from

ScopeChain.variableEngine

## Methods

### bindTree

**bindTree**(`tree`): `void`

Binds the scope chain to a `FlowVirtualTree`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tree` | `FlowVirtualTree`<`ScopeChainNode`> | The `FlowVirtualTree` to bind to. |

#### Returns

`void`

***

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

ScopeChain.dispose

***

### getCovers

**getCovers**(`scope`): [`FlowNodeScope`](/auto-docs/variable-layout/interfaces/FlowNodeScope.md)\[]

Gets the covering scopes for a given scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | [`FlowNodeScope`](/auto-docs/variable-layout/interfaces/FlowNodeScope.md) | The scope to get covering scopes for. |

#### Returns

[`FlowNodeScope`](/auto-docs/variable-layout/interfaces/FlowNodeScope.md)\[]

An array of covering scopes.

#### Overrides

ScopeChain.getCovers

***

### getDeps

**getDeps**(`scope`): [`FlowNodeScope`](/auto-docs/variable-layout/interfaces/FlowNodeScope.md)\[]

Gets the dependency scopes for a given scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | [`FlowNodeScope`](/auto-docs/variable-layout/interfaces/FlowNodeScope.md) | The scope to get dependencies for. |

#### Returns

[`FlowNodeScope`](/auto-docs/variable-layout/interfaces/FlowNodeScope.md)\[]

An array of dependency scopes.

#### Overrides

ScopeChain.getDeps

***

### refreshAllChange

**refreshAllChange**(): `void`

Refreshes the dependency and coverage relationships for all scopes.

#### Returns

`void`

#### Inherited from

ScopeChain.refreshAllChange

***

### sortAll

**sortAll**(): `Scope`<`Record`<`string`, `any`>>\[]

Sorts all scopes in the scope chain.

#### Returns

`Scope`<`Record`<`string`, `any`>>\[]

A sorted array of all scopes.

#### Overrides

ScopeChain.sortAll
