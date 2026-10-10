# Class: Scope\<ScopeMeta>

Represents a variable scope, which manages its own set of variables and their lifecycle.

* `scope.output` represents the variables declared within this scope.
* `scope.available` represents all variables accessible from this scope, including those from parent scopes.

## Type parameters

| Name | Type |
| :------ | :------ |
| `ScopeMeta` | extends `Record`<`string`, `any`> = `Record`<`string`, `any`> |

## Hierarchy

* **`Scope`**

  ↳ [`FlowNodeScope`](/en/auto-docs/free-layout-editor/interfaces/FlowNodeScope.md)

  ↳ [`GlobalScope`](/en/auto-docs/free-layout-editor/classes/GlobalScope.md)

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/Scope.md#constructor)

### Properties

* [ast](/en/auto-docs/free-layout-editor/classes/Scope.md#ast)
* [available](/en/auto-docs/free-layout-editor/classes/Scope.md#available)
* [event](/en/auto-docs/free-layout-editor/classes/Scope.md#event)
* [id](/en/auto-docs/free-layout-editor/classes/Scope.md#id)
* [meta](/en/auto-docs/free-layout-editor/classes/Scope.md#meta)
* [onDispose](/en/auto-docs/free-layout-editor/classes/Scope.md#ondispose)
* [output](/en/auto-docs/free-layout-editor/classes/Scope.md#output)
* [toDispose](/en/auto-docs/free-layout-editor/classes/Scope.md#todispose)
* [variableEngine](/en/auto-docs/free-layout-editor/classes/Scope.md#variableengine)

### Accessors

* [coverScopes](/en/auto-docs/free-layout-editor/classes/Scope.md#coverscopes)
* [depScopes](/en/auto-docs/free-layout-editor/classes/Scope.md#depscopes)
* [disposed](/en/auto-docs/free-layout-editor/classes/Scope.md#disposed)

### Methods

* [clearVar](/en/auto-docs/free-layout-editor/classes/Scope.md#clearvar)
* [dispose](/en/auto-docs/free-layout-editor/classes/Scope.md#dispose)
* [getVar](/en/auto-docs/free-layout-editor/classes/Scope.md#getvar)
* [refreshCovers](/en/auto-docs/free-layout-editor/classes/Scope.md#refreshcovers)
* [refreshDeps](/en/auto-docs/free-layout-editor/classes/Scope.md#refreshdeps)
* [setVar](/en/auto-docs/free-layout-editor/classes/Scope.md#setvar)

## Constructors

### constructor

**new Scope**<`ScopeMeta`>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ScopeMeta` | extends `Record`<`string`, `any`> = `Record`<`string`, `any`> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.id` | `string` | `symbol` |
| `options.meta?` | `ScopeMeta` |
| `options.variableEngine` | [`VariableEngine`](/en/auto-docs/free-layout-editor/classes/VariableEngine.md) |

## Properties

### ast

`Readonly` **ast**: [`MapNode`](/en/auto-docs/free-layout-editor/classes/MapNode.md)

The root AST node for this scope, which is a MapNode.
It stores various data related to the scope, such as `outputs`.

***

### available

`Readonly` **available**: `ScopeAvailableData`

Manages the available variables for this scope.

***

### event

`Readonly` **event**: `ScopeEventData`

Manages event dispatching and handling for this scope.

***

### id

`Readonly` **id**: `string` | `symbol`

A unique identifier for the scope.

***

### meta

`Readonly` **meta**: `ScopeMeta`

Metadata associated with the scope, which can be extended by higher-level business logic.

***

### onDispose

**onDispose**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

***

### output

`Readonly` **output**: [`ScopeOutputData`](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md)

Manages the output variables for this scope.

***

### toDispose

**toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

***

### variableEngine

`Readonly` **variableEngine**: [`VariableEngine`](/en/auto-docs/free-layout-editor/classes/VariableEngine.md)

The variable engine instance this scope belongs to.

## Accessors

### coverScopes

`get` **coverScopes**(): [`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that are covered by this scope.

#### Returns

[`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

***

### depScopes

`get` **depScopes**(): [`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that this scope depends on.

#### Returns

[`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

***

### disposed

`get` **disposed**(): `boolean`

#### Returns

`boolean`

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

***

### dispose

**dispose**(): `void`

Disposes of the scope and its resources.
This will also trigger updates in dependent and covering scopes.

#### Returns

`void`

***

### getVar

**getVar**<`Node`>(`key?`): `undefined` | `Node`

Retrieves a variable from the scope by its key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to retrieve. Defaults to 'outputs'. |

#### Returns

`undefined` | `Node`

The AST node for the variable, or `undefined` if not found.

***

### refreshCovers

**refreshCovers**(): `void`

Refreshes the covering scopes.

#### Returns

`void`

***

### refreshDeps

**refreshDeps**(): `void`

Refreshes the dependency scopes and the available variables.

#### Returns

`void`

***

### setVar

**setVar**<`Node`>(`json`): `Node`

Sets a variable in the scope with the default key 'outputs'.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

**setVar**<`Node`>(`key`, `json`): `Node`

Sets a variable in the scope with a specified key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable to set. |
| `json` | [`ASTNodeJSON`](/en/auto-docs/free-layout-editor/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.
