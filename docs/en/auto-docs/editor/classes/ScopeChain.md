# Class: ScopeChain

Manages the dependency relationships between scopes.
This is an abstract class, and specific implementations determine how the scope order is managed.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/ScopeChain.md#constructor)

### Properties

* [toDispose](/en/auto-docs/editor/classes/ScopeChain.md#todispose)
* [variableEngineProvider](/en/auto-docs/editor/classes/ScopeChain.md#variableengineprovider)

### Accessors

* [disposed](/en/auto-docs/editor/classes/ScopeChain.md#disposed)
* [onDispose](/en/auto-docs/editor/classes/ScopeChain.md#ondispose)
* [variableEngine](/en/auto-docs/editor/classes/ScopeChain.md#variableengine)

### Methods

* [dispose](/en/auto-docs/editor/classes/ScopeChain.md#dispose)
* [getCovers](/en/auto-docs/editor/classes/ScopeChain.md#getcovers)
* [getDeps](/en/auto-docs/editor/classes/ScopeChain.md#getdeps)
* [refreshAllChange](/en/auto-docs/editor/classes/ScopeChain.md#refreshallchange)
* [sortAll](/en/auto-docs/editor/classes/ScopeChain.md#sortall)

## Constructors

### constructor

**new ScopeChain**()

## Properties

### toDispose

`Readonly` **toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

***

### variableEngineProvider

**variableEngineProvider**: [`VariableEngineProvider`](/en/auto-docs/editor/variables/VariableEngineProvider-1.md)

## Accessors

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

***

### onDispose

`get` **onDispose**(): [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

***

### variableEngine

`get` **variableEngine**(): [`VariableEngine`](/en/auto-docs/editor/classes/VariableEngine.md)

#### Returns

[`VariableEngine`](/en/auto-docs/editor/classes/VariableEngine.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### getCovers

`Abstract` **getCovers**(`scope`): [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the covering scopes for a given scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>> | The scope to get covers for. |

#### Returns

[`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

An array of covering scopes.

***

### getDeps

`Abstract` **getDeps**(`scope`): [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the dependency scopes for a given scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>> | The scope to get dependencies for. |

#### Returns

[`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

An array of dependency scopes.

***

### refreshAllChange

**refreshAllChange**(): `void`

Refreshes the dependency and coverage relationships for all scopes.

#### Returns

`void`

***

### sortAll

`Abstract` **sortAll**(): [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Sorts all scopes based on their dependency relationships.

#### Returns

[`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

A sorted array of all scopes.
