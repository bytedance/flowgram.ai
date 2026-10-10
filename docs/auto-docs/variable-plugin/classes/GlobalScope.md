# Class: GlobalScope

Global Scope stores all variables that are not scoped to any node.

* Variables in Global Scope can be accessed by any node.
* Any other scope's variables can not be accessed by Global Scope.

## Hierarchy

* [`Scope`](/auto-docs/variable-plugin/classes/Scope.md)

  ↳ **`GlobalScope`**

## Table of contents

### Constructors

* [constructor](/auto-docs/variable-plugin/classes/GlobalScope.md#constructor)

### Properties

* [ast](/auto-docs/variable-plugin/classes/GlobalScope.md#ast)
* [available](/auto-docs/variable-plugin/classes/GlobalScope.md#available)
* [event](/auto-docs/variable-plugin/classes/GlobalScope.md#event)
* [id](/auto-docs/variable-plugin/classes/GlobalScope.md#id)
* [meta](/auto-docs/variable-plugin/classes/GlobalScope.md#meta)
* [onDispose](/auto-docs/variable-plugin/classes/GlobalScope.md#ondispose)
* [output](/auto-docs/variable-plugin/classes/GlobalScope.md#output)
* [toDispose](/auto-docs/variable-plugin/classes/GlobalScope.md#todispose)
* [variableEngine](/auto-docs/variable-plugin/classes/GlobalScope.md#variableengine)
* [ID](/auto-docs/variable-plugin/classes/GlobalScope.md#id-1)

### Accessors

* [coverScopes](/auto-docs/variable-plugin/classes/GlobalScope.md#coverscopes)
* [depScopes](/auto-docs/variable-plugin/classes/GlobalScope.md#depscopes)
* [disposed](/auto-docs/variable-plugin/classes/GlobalScope.md#disposed)

### Methods

* [clearVar](/auto-docs/variable-plugin/classes/GlobalScope.md#clearvar)
* [dispose](/auto-docs/variable-plugin/classes/GlobalScope.md#dispose)
* [getVar](/auto-docs/variable-plugin/classes/GlobalScope.md#getvar)
* [refreshCovers](/auto-docs/variable-plugin/classes/GlobalScope.md#refreshcovers)
* [refreshDeps](/auto-docs/variable-plugin/classes/GlobalScope.md#refreshdeps)
* [setVar](/auto-docs/variable-plugin/classes/GlobalScope.md#setvar)
* [is](/auto-docs/variable-plugin/classes/GlobalScope.md#is)

## Constructors

### constructor

**new GlobalScope**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.id` | `string` | `symbol` |
| `options.meta?` | `Record`<`string`, `any`> |
| `options.variableEngine` | [`VariableEngine`](/auto-docs/variable-plugin/classes/VariableEngine.md) |

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[constructor](/auto-docs/variable-plugin/classes/Scope.md#constructor)

## Properties

### ast

`Readonly` **ast**: [`MapNode`](/auto-docs/variable-plugin/classes/MapNode.md)

The root AST node for this scope, which is a MapNode.
It stores various data related to the scope, such as `outputs`.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[ast](/auto-docs/variable-plugin/classes/Scope.md#ast)

***

### available

`Readonly` **available**: `ScopeAvailableData`

Manages the available variables for this scope.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[available](/auto-docs/variable-plugin/classes/Scope.md#available)

***

### event

`Readonly` **event**: `ScopeEventData`

Manages event dispatching and handling for this scope.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[event](/auto-docs/variable-plugin/classes/Scope.md#event)

***

### id

`Readonly` **id**: `string` | `symbol`

A unique identifier for the scope.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[id](/auto-docs/variable-plugin/classes/Scope.md#id)

***

### meta

`Readonly` **meta**: `Record`<`string`, `any`>

Metadata associated with the scope, which can be extended by higher-level business logic.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[meta](/auto-docs/variable-plugin/classes/Scope.md#meta)

***

### onDispose

**onDispose**: `Event`<`void`>

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[onDispose](/auto-docs/variable-plugin/classes/Scope.md#ondispose)

***

### output

`Readonly` **output**: [`ScopeOutputData`](/auto-docs/variable-plugin/classes/ScopeOutputData.md)

Manages the output variables for this scope.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[output](/auto-docs/variable-plugin/classes/Scope.md#output)

***

### toDispose

**toDispose**: `DisposableCollection`

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[toDispose](/auto-docs/variable-plugin/classes/Scope.md#todispose)

***

### variableEngine

`Readonly` **variableEngine**: [`VariableEngine`](/auto-docs/variable-plugin/classes/VariableEngine.md)

The variable engine instance this scope belongs to.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[variableEngine](/auto-docs/variable-plugin/classes/Scope.md#variableengine)

***

### ID

`Static` `Readonly` **ID**: typeof [`ID`](/auto-docs/variable-plugin/classes/GlobalScope.md#id-1)

## Accessors

### coverScopes

`get` **coverScopes**(): [`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that are covered by this scope.

#### Returns

[`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>\[]

#### Inherited from

Scope.coverScopes

***

### depScopes

`get` **depScopes**(): [`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Gets the scopes that this scope depends on.

#### Returns

[`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>>\[]

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

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[clearVar](/auto-docs/variable-plugin/classes/Scope.md#clearvar)

***

### dispose

**dispose**(): `void`

Disposes of the scope and its resources.
This will also trigger updates in dependent and covering scopes.

#### Returns

`void`

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[dispose](/auto-docs/variable-plugin/classes/Scope.md#dispose)

***

### getVar

**getVar**<`Node`>(`key?`): `undefined` | `Node`

Retrieves a variable from the scope by its key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key of the variable to retrieve. Defaults to 'outputs'. |

#### Returns

`undefined` | `Node`

The AST node for the variable, or `undefined` if not found.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[getVar](/auto-docs/variable-plugin/classes/Scope.md#getvar)

***

### refreshCovers

**refreshCovers**(): `void`

Refreshes the covering scopes.

#### Returns

`void`

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[refreshCovers](/auto-docs/variable-plugin/classes/Scope.md#refreshcovers)

***

### refreshDeps

**refreshDeps**(): `void`

Refreshes the dependency scopes and the available variables.

#### Returns

`void`

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[refreshDeps](/auto-docs/variable-plugin/classes/Scope.md#refreshdeps)

***

### setVar

**setVar**<`Node`>(`json`): `Node`

Sets a variable in the scope with the default key 'outputs'.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | [`ASTNodeJSON`](/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[setVar](/auto-docs/variable-plugin/classes/Scope.md#setvar)

**setVar**<`Node`>(`key`, `json`): `Node`

Sets a variable in the scope with a specified key.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Node` | extends [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`, `Node`> = [`ASTNode`](/auto-docs/variable-plugin/classes/ASTNode.md)<`any`> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable to set. |
| `json` | [`ASTNodeJSON`](/auto-docs/variable-plugin/interfaces/ASTNodeJSON.md) | The JSON representation of the AST node to set. |

#### Returns

`Node`

The created or updated AST node.

#### Inherited from

[Scope](/auto-docs/variable-plugin/classes/Scope.md).[setVar](/auto-docs/variable-plugin/classes/Scope.md#setvar)

***

### is

`Static` **is**(`scope`): `boolean`

Check if the scope is Global Scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | [`Scope`](/auto-docs/variable-plugin/classes/Scope.md)<`Record`<`string`, `any`>> |

#### Returns

`boolean`
