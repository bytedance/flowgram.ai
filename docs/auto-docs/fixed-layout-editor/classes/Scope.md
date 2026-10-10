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

  ↳ [`FlowNodeScope`](/auto-docs/fixed-layout-editor/interfaces/FlowNodeScope.md)

  ↳ [`GlobalScope`](/auto-docs/fixed-layout-editor/classes/GlobalScope.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/Scope.md#constructor)

### Properties

* [ast](/auto-docs/fixed-layout-editor/classes/Scope.md#ast)
* [available](/auto-docs/fixed-layout-editor/classes/Scope.md#available)
* [event](/auto-docs/fixed-layout-editor/classes/Scope.md#event)
* [id](/auto-docs/fixed-layout-editor/classes/Scope.md#id)
* [meta](/auto-docs/fixed-layout-editor/classes/Scope.md#meta)
* [onDispose](/auto-docs/fixed-layout-editor/classes/Scope.md#ondispose)
* [output](/auto-docs/fixed-layout-editor/classes/Scope.md#output)
* [toDispose](/auto-docs/fixed-layout-editor/classes/Scope.md#todispose)
* [variableEngine](/auto-docs/fixed-layout-editor/classes/Scope.md#variableengine)

### Accessors

* [coverScopes](/auto-docs/fixed-layout-editor/classes/Scope.md#coverscopes)
* [depScopes](/auto-docs/fixed-layout-editor/classes/Scope.md#depscopes)
* [disposed](/auto-docs/fixed-layout-editor/classes/Scope.md#disposed)

### Methods

* [clearVar](/auto-docs/fixed-layout-editor/classes/Scope.md#clearvar)
* [dispose](/auto-docs/fixed-layout-editor/classes/Scope.md#dispose)
* [getVar](/auto-docs/fixed-layout-editor/classes/Scope.md#getvar)
* [refreshCovers](/auto-docs/fixed-layout-editor/classes/Scope.md#refreshcovers)
* [refreshDeps](/auto-docs/fixed-layout-editor/classes/Scope.md#refreshdeps)
* [setVar](/auto-docs/fixed-layout-editor/classes/Scope.md#setvar)

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
| `options.variableEngine` | [`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md) |

## Properties

### ast

`Readonly` **ast**: [`MapNode`](/auto-docs/fixed-layout-editor/classes/MapNode.md)

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

**onDispose**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

***

### output

`Readonly` **output**: [`ScopeOutputData`](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md)

Manages the output variables for this scope.

***

### toDispose

**toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

***

### variableEngine

`Readonly` **variableEngine**: [`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

The variable engine instance this scope belongs to.

## Accessors

### coverScopes

`get` **coverScopes**(): [`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that are covered by this scope.

#### Returns

[`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

***

### depScopes

`get` **depScopes**(): [`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that this scope depends on.

#### Returns

[`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

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
| `Node` | extends [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`> |

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
| `Node` | extends [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

**setVar**<`Node`>(`key`, `json`): `Node`

Sets a variable in the scope with a specified key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable to set. |
| `json` | [`ASTNodeJSON`](/auto-docs/fixed-layout-editor/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.
