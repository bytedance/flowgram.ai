# Class: GlobalScope

Global Scope stores all variables that are not scoped to any node.

* Variables in Global Scope can be accessed by any node.
* Any other scope's variables can not be accessed by Global Scope.

## Hierarchy

* [`Scope`](/en/auto-docs/editor/classes/Scope.md)

  ↳ **`GlobalScope`**

## Table of contents

### Constructors

* [constructor](/en/auto-docs/editor/classes/GlobalScope.md#constructor)

### Properties

* [ast](/en/auto-docs/editor/classes/GlobalScope.md#ast)
* [available](/en/auto-docs/editor/classes/GlobalScope.md#available)
* [event](/en/auto-docs/editor/classes/GlobalScope.md#event)
* [id](/en/auto-docs/editor/classes/GlobalScope.md#id)
* [meta](/en/auto-docs/editor/classes/GlobalScope.md#meta)
* [onDispose](/en/auto-docs/editor/classes/GlobalScope.md#ondispose)
* [output](/en/auto-docs/editor/classes/GlobalScope.md#output)
* [toDispose](/en/auto-docs/editor/classes/GlobalScope.md#todispose)
* [variableEngine](/en/auto-docs/editor/classes/GlobalScope.md#variableengine)
* [ID](/en/auto-docs/editor/classes/GlobalScope.md#id-1)

### Accessors

* [coverScopes](/en/auto-docs/editor/classes/GlobalScope.md#coverscopes)
* [depScopes](/en/auto-docs/editor/classes/GlobalScope.md#depscopes)
* [disposed](/en/auto-docs/editor/classes/GlobalScope.md#disposed)

### Methods

* [clearVar](/en/auto-docs/editor/classes/GlobalScope.md#clearvar)
* [dispose](/en/auto-docs/editor/classes/GlobalScope.md#dispose)
* [getVar](/en/auto-docs/editor/classes/GlobalScope.md#getvar)
* [refreshCovers](/en/auto-docs/editor/classes/GlobalScope.md#refreshcovers)
* [refreshDeps](/en/auto-docs/editor/classes/GlobalScope.md#refreshdeps)
* [setVar](/en/auto-docs/editor/classes/GlobalScope.md#setvar)
* [is](/en/auto-docs/editor/classes/GlobalScope.md#is)

## Constructors

### constructor

**new GlobalScope**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.id` | `string` | `symbol` |
| `options.meta?` | `Record`<`string`, `any`> |
| `options.variableEngine` | [`VariableEngine`](/en/auto-docs/editor/classes/VariableEngine.md) |

#### Inherited from

[Scope](/en/auto-docs/editor/classes/Scope.md).[constructor](/en/auto-docs/editor/classes/Scope.md#constructor)

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

`Readonly` **meta**: `Record`<`string`, `any`>

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

***

### ID

`Static` `Readonly` **ID**: typeof [`ID`](/en/auto-docs/editor/classes/GlobalScope.md#id-1)

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

***

### is

`Static` **is**(`scope`): `boolean`

Check if the scope is Global Scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | [`Scope`](/en/auto-docs/editor/classes/Scope.md)<`Record`<`string`, `any`>> |

#### Returns

`boolean`
