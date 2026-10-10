# Class: VariableEngine

The core of the variable engine system.
It manages scopes, variables, and events within the system.

## Implements

* `Disposable`

## Table of contents

### Constructors

* [constructor](/en/auto-docs/variable-core/classes/VariableEngine.md#constructor)

### Properties

* [astRegisters](/en/auto-docs/variable-core/classes/VariableEngine.md#astregisters)
* [chain](/en/auto-docs/variable-core/classes/VariableEngine.md#chain)
* [globalEvent$](/en/auto-docs/variable-core/classes/VariableEngine.md#globalevent$)
* [globalVariableTable](/en/auto-docs/variable-core/classes/VariableEngine.md#globalvariabletable)
* [onScopeChange](/en/auto-docs/variable-core/classes/VariableEngine.md#onscopechange)

### Accessors

* [container](/en/auto-docs/variable-core/classes/VariableEngine.md#container)

### Methods

* [createScope](/en/auto-docs/variable-core/classes/VariableEngine.md#createscope)
* [dispose](/en/auto-docs/variable-core/classes/VariableEngine.md#dispose)
* [fireGlobalEvent](/en/auto-docs/variable-core/classes/VariableEngine.md#fireglobalevent)
* [getAllScopes](/en/auto-docs/variable-core/classes/VariableEngine.md#getallscopes)
* [getScopeById](/en/auto-docs/variable-core/classes/VariableEngine.md#getscopebyid)
* [onGlobalEvent](/en/auto-docs/variable-core/classes/VariableEngine.md#onglobalevent)
* [removeScopeById](/en/auto-docs/variable-core/classes/VariableEngine.md#removescopebyid)

## Constructors

### constructor

**new VariableEngine**(`chain`, `astRegisters`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chain` | [`ScopeChain`](/en/auto-docs/variable-core/classes/ScopeChain.md) | The scope chain, which manages the dependency relationships between scopes. |
| `astRegisters` | [`ASTRegisters`](/en/auto-docs/variable-core/classes/ASTRegisters.md) | The registry for all AST node types. |

## Properties

### astRegisters

`Readonly` **astRegisters**: [`ASTRegisters`](/en/auto-docs/variable-core/classes/ASTRegisters.md)

The registry for all AST node types.

***

### chain

`Readonly` **chain**: [`ScopeChain`](/en/auto-docs/variable-core/classes/ScopeChain.md)

The scope chain, which manages the dependency relationships between scopes.

***

### globalEvent$

**globalEvent$**: `Subject`<[`GlobalEventActionType`](/en/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/variable-core/classes/ASTNode.md)<`any`>>>

A rxjs subject that emits global events occurring within the variable engine.

***

### globalVariableTable

**globalVariableTable**: [`IVariableTable`](/en/auto-docs/variable-core/interfaces/IVariableTable.md)

A table containing all global variables.

***

### onScopeChange

**onScopeChange**: `Event`<`ScopeChangeAction`>

An event that fires whenever a scope is added, updated, or deleted.

## Accessors

### container

`get` **container**(): `Container`

The Inversify container instance.

#### Returns

`Container`

## Methods

### createScope

**createScope**(`id`, `meta?`, `options?`): [`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

Creates a new scope or retrieves an existing one if the ID and type match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | `symbol` | The unique identifier for the scope. |
| `meta?` | `Record`<`string`, `any`> | Optional metadata for the scope, defined by the user. |
| `options` | `Object` | Options for creating the scope. |
| `options.ScopeConstructor?` | `IScopeConstructor` | The constructor to use for creating the scope. Defaults to `Scope`. |

#### Returns

[`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

The created or existing scope.

***

### dispose

**dispose**(): `void`

Disposes of all resources used by the variable engine.

#### Returns

`void`

#### Implementation of

Disposable.dispose

***

### fireGlobalEvent

**fireGlobalEvent**(`event`): `void`

Fires a global event to be broadcast to all listeners.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`GlobalEventActionType`](/en/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/variable-core/classes/ASTNode.md)<`any`>> | The global event to fire. |

#### Returns

`void`

***

### getAllScopes

**getAllScopes**(`options?`): [`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Retrieves all scopes currently managed by the engine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Options for retrieving the scopes. |
| `options.sort?` | `boolean` | Whether to sort the scopes based on their dependency chain. |

#### Returns

[`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>\[]

An array of all scopes.

***

### getScopeById

**getScopeById**(`scopeId`): `undefined` | [`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

Retrieves a scope by its unique identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `string` | `symbol` | The ID of the scope to retrieve. |

#### Returns

`undefined` | [`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

The scope if found, otherwise undefined.

***

### onGlobalEvent

**onGlobalEvent**<`ActionType`>(`type`, `observer`): `Disposable`

Subscribes to a specific type of global event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ActionType` | extends [`GlobalEventActionType`](/en/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/variable-core/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/en/auto-docs/variable-core/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/en/auto-docs/variable-core/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ActionType`\[`"type"`] | The type of the event to listen for. |
| `observer` | (`action`: `ActionType`) => `void` | A function to be called when the event is observed. |

#### Returns

`Disposable`

A disposable object to unsubscribe from the event.

***

### removeScopeById

**removeScopeById**(`scopeId`): `void`

Removes a scope by its unique identifier and disposes of it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `string` | `symbol` | The ID of the scope to remove. |

#### Returns

`void`
