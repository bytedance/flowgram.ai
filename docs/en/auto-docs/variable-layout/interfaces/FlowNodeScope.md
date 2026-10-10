# Interface: FlowNodeScope

Represents a scope associated with a flow node.

## Hierarchy

* `Scope`<[`FlowNodeScopeMeta`](/en/auto-docs/variable-layout/interfaces/FlowNodeScopeMeta.md)>

  ↳ **`FlowNodeScope`**

## Table of contents

### Properties

* [ast](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#ast)
* [available](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#available)
* [event](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#event)
* [id](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#id)
* [meta](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#meta)
* [onDispose](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#ondispose)
* [output](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#output)
* [toDispose](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#todispose)
* [variableEngine](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#variableengine)

### Accessors

* [coverScopes](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#coverscopes)
* [depScopes](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#depscopes)
* [disposed](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#disposed)

### Methods

* [clearVar](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#clearvar)
* [dispose](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#dispose)
* [getVar](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#getvar)
* [refreshCovers](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#refreshcovers)
* [refreshDeps](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#refreshdeps)
* [setVar](/en/auto-docs/variable-layout/interfaces/FlowNodeScope.md#setvar)

## Properties

### ast

`Readonly` **ast**: `MapNode`

The root AST node for this scope, which is a MapNode.
It stores various data related to the scope, such as `outputs`.

#### Inherited from

Scope.ast

***

### available

`Readonly` **available**: `ScopeAvailableData`

Manages the available variables for this scope.

#### Inherited from

Scope.available

***

### event

`Readonly` **event**: `ScopeEventData`

Manages event dispatching and handling for this scope.

#### Inherited from

Scope.event

***

### id

`Readonly` **id**: `string` | `symbol`

A unique identifier for the scope.

#### Inherited from

Scope.id

***

### meta

`Readonly` **meta**: [`FlowNodeScopeMeta`](/en/auto-docs/variable-layout/interfaces/FlowNodeScopeMeta.md)

Metadata associated with the scope, which can be extended by higher-level business logic.

#### Inherited from

Scope.meta

***

### onDispose

**onDispose**: `Event`<`void`>

#### Inherited from

Scope.onDispose

***

### output

`Readonly` **output**: `ScopeOutputData`

Manages the output variables for this scope.

#### Inherited from

Scope.output

***

### toDispose

**toDispose**: `DisposableCollection`

#### Inherited from

Scope.toDispose

***

### variableEngine

`Readonly` **variableEngine**: `VariableEngine`

The variable engine instance this scope belongs to.

#### Inherited from

Scope.variableEngine

## Accessors

### coverScopes

`get` **coverScopes**(): `Scope`<`Record`<`string`, `any`>>\[]

Gets the scopes that are covered by this scope.

#### Returns

`Scope`<`Record`<`string`, `any`>>\[]

#### Inherited from

Scope.coverScopes

***

### depScopes

`get` **depScopes**(): `Scope`<`Record`<`string`, `any`>>\[]

Gets the scopes that this scope depends on.

#### Returns

`Scope`<`Record`<`string`, `any`>>\[]

#### Inherited from

Scope.depScopes

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Scope.disposed

## Methods

### clearVar

**clearVar**(`key?`): `void`

Clears a variable from the scope by its key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to clear. Defaults to 'outputs'. |

#### Returns

`void`

#### Inherited from

Scope.clearVar

***

### dispose

**dispose**(): `void`

Disposes of the scope and its resources.
This will also trigger updates in dependent and covering scopes.

#### Returns

`void`

#### Inherited from

Scope.dispose

***

### getVar

**getVar**<`Node`>(`key?`): `undefined` | `Node`

Retrieves a variable from the scope by its key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends `ASTNode`<`any`, `Node`> = `ASTNode`<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to retrieve. Defaults to 'outputs'. |

#### Returns

`undefined` | `Node`

The AST node for the variable, or `undefined` if not found.

#### Inherited from

Scope.getVar

***

### refreshCovers

**refreshCovers**(): `void`

Refreshes the covering scopes.

#### Returns

`void`

#### Inherited from

Scope.refreshCovers

***

### refreshDeps

**refreshDeps**(): `void`

Refreshes the dependency scopes and the available variables.

#### Returns

`void`

#### Inherited from

Scope.refreshDeps

***

### setVar

**setVar**<`Node`>(`json`): `Node`

Sets a variable in the scope with the default key 'outputs'.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends `ASTNode`<`any`, `Node`> = `ASTNode`<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `ASTNodeJSON` | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

#### Inherited from

Scope.setVar

**setVar**<`Node`>(`key`, `json`): `Node`

Sets a variable in the scope with a specified key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends `ASTNode`<`any`, `Node`> = `ASTNode`<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable to set. |
| `json` | `ASTNodeJSON` | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

#### Inherited from

Scope.setVar
