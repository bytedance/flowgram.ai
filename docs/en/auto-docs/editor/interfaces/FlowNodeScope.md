# Interface: FlowNodeScope

Represents a scope associated with a flow node.

## Hierarchy

* [`Scope`](/en/auto-docs/editor/classes/Scope.md)<[`FlowNodeScopeMeta`](/en/auto-docs/editor/interfaces/FlowNodeScopeMeta.md)>

  ↳ **`FlowNodeScope`**

## Table of contents

### Properties

* [ast](/en/auto-docs/editor/interfaces/FlowNodeScope.md#ast)
* [available](/en/auto-docs/editor/interfaces/FlowNodeScope.md#available)
* [event](/en/auto-docs/editor/interfaces/FlowNodeScope.md#event)
* [id](/en/auto-docs/editor/interfaces/FlowNodeScope.md#id)
* [meta](/en/auto-docs/editor/interfaces/FlowNodeScope.md#meta)
* [onDispose](/en/auto-docs/editor/interfaces/FlowNodeScope.md#ondispose)
* [output](/en/auto-docs/editor/interfaces/FlowNodeScope.md#output)
* [toDispose](/en/auto-docs/editor/interfaces/FlowNodeScope.md#todispose)
* [variableEngine](/en/auto-docs/editor/interfaces/FlowNodeScope.md#variableengine)

### Accessors

* [coverScopes](/en/auto-docs/editor/interfaces/FlowNodeScope.md#coverscopes)
* [depScopes](/en/auto-docs/editor/interfaces/FlowNodeScope.md#depscopes)
* [disposed](/en/auto-docs/editor/interfaces/FlowNodeScope.md#disposed)

### Methods

* [clearVar](/en/auto-docs/editor/interfaces/FlowNodeScope.md#clearvar)
* [dispose](/en/auto-docs/editor/interfaces/FlowNodeScope.md#dispose)
* [getVar](/en/auto-docs/editor/interfaces/FlowNodeScope.md#getvar)
* [refreshCovers](/en/auto-docs/editor/interfaces/FlowNodeScope.md#refreshcovers)
* [refreshDeps](/en/auto-docs/editor/interfaces/FlowNodeScope.md#refreshdeps)
* [setVar](/en/auto-docs/editor/interfaces/FlowNodeScope.md#setvar)

## Properties

### ast

`Readonly` **ast**: [`MapNode`](/en/auto-docs/editor/classes/MapNode.md)

The root AST node for this scope, which is a MapNode.
It stores various data related to the scope, such as `outputs`.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[ast](/en/auto-docs/editor/classes/Scope.md#ast)

***

### available

`Readonly` **available**: `ScopeAvailableData`

Manages the available variables for this scope.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[available](/en/auto-docs/editor/classes/Scope.md#available)

***

### event

`Readonly` **event**: `ScopeEventData`

Manages event dispatching and handling for this scope.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[event](/en/auto-docs/editor/classes/Scope.md#event)

***

### id

`Readonly` **id**: `string` | `symbol`

A unique identifier for the scope.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[id](/en/auto-docs/editor/classes/Scope.md#id)

***

### meta

`Readonly` **meta**: [`FlowNodeScopeMeta`](/en/auto-docs/editor/interfaces/FlowNodeScopeMeta.md)

Metadata associated with the scope, which can be extended by higher-level business logic.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[meta](/en/auto-docs/editor/classes/Scope.md#meta)

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/editor/interfaces/Event-1.md)<`void`>

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[onDispose](/en/auto-docs/editor/classes/Scope.md#ondispose)

***

### output

`Readonly` **output**: [`ScopeOutputData`](/en/auto-docs/editor/classes/ScopeOutputData.md)

Manages the output variables for this scope.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[output](/en/auto-docs/editor/classes/Scope.md#output)

***

### toDispose

**toDispose**: [`DisposableCollection`](/en/auto-docs/editor/classes/DisposableCollection.md)

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[toDispose](/en/auto-docs/editor/classes/Scope.md#todispose)

***

### variableEngine

`Readonly` **variableEngine**: [`VariableEngine`](/en/auto-docs/editor/classes/VariableEngine.md)

The variable engine instance this scope belongs to.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[variableEngine](/en/auto-docs/editor/classes/Scope.md#variableengine)

## Accessors

### coverScopes

`get` **coverScopes**(): [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that are covered by this scope.

#### Returns

[`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

#### Inherited from

Scope.coverScopes

***

### depScopes

`get` **depScopes**(): [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that this scope depends on.

#### Returns

[`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

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

[Scope](/en/auto-docs/editor/classes/Scope.md).[clearVar](/en/auto-docs/editor/classes/Scope.md#clearvar)

***

### dispose

**dispose**(): `void`

Disposes of the scope and its resources.
This will also trigger updates in dependent and covering scopes.

#### Returns

`void`

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[dispose](/en/auto-docs/editor/classes/Scope.md#dispose)

***

### getVar

**getVar**<`Node`>(`key?`): `undefined` | `Node`

Retrieves a variable from the scope by its key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to retrieve. Defaults to 'outputs'. |

#### Returns

`undefined` | `Node`

The AST node for the variable, or `undefined` if not found.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[getVar](/en/auto-docs/editor/classes/Scope.md#getvar)

***

### refreshCovers

**refreshCovers**(): `void`

Refreshes the covering scopes.

#### Returns

`void`

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[refreshCovers](/en/auto-docs/editor/classes/Scope.md#refreshcovers)

***

### refreshDeps

**refreshDeps**(): `void`

Refreshes the dependency scopes and the available variables.

#### Returns

`void`

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[refreshDeps](/en/auto-docs/editor/classes/Scope.md#refreshdeps)

***

### setVar

**setVar**<`Node`>(`json`): `Node`

Sets a variable in the scope with the default key 'outputs'.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ASTNodeJSON`](/en/auto-docs/editor/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[setVar](/en/auto-docs/editor/classes/Scope.md#setvar)

**setVar**<`Node`>(`key`, `json`): `Node`

Sets a variable in the scope with a specified key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable to set. |
| `json` | [`ASTNodeJSON`](/en/auto-docs/editor/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[setVar](/en/auto-docs/editor/classes/Scope.md#setvar)
