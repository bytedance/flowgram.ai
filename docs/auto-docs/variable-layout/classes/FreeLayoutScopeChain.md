# Class: FreeLayoutScopeChain

Scope chain implementation for free layout.

## Hierarchy

* `ScopeChain`

  ↳ **`FreeLayoutScopeChain`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#constructor)

### Properties

* [entityManager](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#entitymanager)
* [toDispose](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#todispose)
* [variableEngineProvider](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#variableengineprovider)

### Accessors

* [disposed](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#disposed)
* [onDispose](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#ondispose)
* [tree](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#tree)
* [variableEngine](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#variableengine)

### Methods

* [dispose](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#dispose)
* [getAllPublicChildScopes](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#getallpublicchildscopes)
* [getCovers](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#getcovers)
* [getDeps](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#getdeps)
* [getNodeChildren](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#getnodechildren)
* [getNodeParent](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#getnodeparent)
* [onInit](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#oninit)
* [refreshAllChange](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#refreshallchange)
* [sortAll](/auto-docs/variable-layout/classes/FreeLayoutScopeChain.md#sortall)

## Constructors

### constructor

**new FreeLayoutScopeChain**()

#### Inherited from

ScopeChain.constructor

## Properties

### entityManager

**entityManager**: `EntityManager`

***

### toDispose

`Readonly` **toDispose**: `DisposableCollection`

#### Inherited from

ScopeChain.toDispose

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

### tree

`get` **tree**(): `FlowVirtualTree`<`FlowNodeEntity`>

The virtual tree of the flow document.

#### Returns

`FlowVirtualTree`<`FlowNodeEntity`>

***

### variableEngine

`get` **variableEngine**(): `VariableEngine`

#### Returns

`VariableEngine`

#### Inherited from

ScopeChain.variableEngine

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

#### Inherited from

ScopeChain.dispose

***

### getAllPublicChildScopes

**getAllPublicChildScopes**(`node`): `Scope`<`Record`<`string`, `any`>>\[]

Get All children of nodes

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `FlowNodeEntity` |

#### Returns

`Scope`<`Record`<`string`, `any`>>\[]

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

### getNodeChildren

**getNodeChildren**(`node`): `FlowNodeEntity`\[]

Gets the children of a node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `FlowNodeEntity` | The node to get children for. |

#### Returns

`FlowNodeEntity`\[]

An array of child nodes.

***

### getNodeParent

**getNodeParent**(`node`): `undefined` | `FlowNodeEntity`

Gets the parent of a node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `FlowNodeEntity` | The node to get the parent for. |

#### Returns

`undefined` | `FlowNodeEntity`

The parent node or `undefined` if not found.

***

### onInit

**onInit**(): `void`

#### Returns

`void`

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

An empty array, as this method is not implemented.

#### Overrides

ScopeChain.sortAll
