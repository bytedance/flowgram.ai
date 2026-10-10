# Class: VariableEngine

The core of the variable engine system.
It manages scopes, variables, and events within the system.

## Implements

* [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

## Table of contents

### Constructors

* [constructor](/auto-docs/free-layout-editor/classes/VariableEngine.md#constructor)

### Properties

* [astRegisters](/auto-docs/free-layout-editor/classes/VariableEngine.md#astregisters)
* [chain](/auto-docs/free-layout-editor/classes/VariableEngine.md#chain)
* [globalEvent$](/auto-docs/free-layout-editor/classes/VariableEngine.md#globalevent$)
* [globalVariableTable](/auto-docs/free-layout-editor/classes/VariableEngine.md#globalvariabletable)
* [onScopeChange](/auto-docs/free-layout-editor/classes/VariableEngine.md#onscopechange)

### Accessors

* [container](/auto-docs/free-layout-editor/classes/VariableEngine.md#container)

### Methods

* [createScope](/auto-docs/free-layout-editor/classes/VariableEngine.md#createscope)
* [dispose](/auto-docs/free-layout-editor/classes/VariableEngine.md#dispose)
* [fireGlobalEvent](/auto-docs/free-layout-editor/classes/VariableEngine.md#fireglobalevent)
* [getAllScopes](/auto-docs/free-layout-editor/classes/VariableEngine.md#getallscopes)
* [getScopeById](/auto-docs/free-layout-editor/classes/VariableEngine.md#getscopebyid)
* [onGlobalEvent](/auto-docs/free-layout-editor/classes/VariableEngine.md#onglobalevent)
* [removeScopeById](/auto-docs/free-layout-editor/classes/VariableEngine.md#removescopebyid)

## Constructors

### constructor

**new VariableEngine**(`chain`, `astRegisters`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chain` | [`ScopeChain`](/auto-docs/free-layout-editor/classes/ScopeChain.md) | The scope chain, which manages the dependency relationships between scopes. |
| `astRegisters` | [`ASTRegisters`](/auto-docs/free-layout-editor/classes/ASTRegisters.md) | The registry for all AST node types. |

## Properties

### astRegisters

`Readonly` **astRegisters**: [`ASTRegisters`](/auto-docs/free-layout-editor/classes/ASTRegisters.md)

The registry for all AST node types.

***

### chain

`Readonly` **chain**: [`ScopeChain`](/auto-docs/free-layout-editor/classes/ScopeChain.md)

The scope chain, which manages the dependency relationships between scopes.

***

### globalEvent$

**globalEvent$**: `Subject`<[`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>>>

A rxjs subject that emits global events occurring within the variable engine.

***

### globalVariableTable

**globalVariableTable**: [`IVariableTable`](/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

A table containing all global variables.

***

### onScopeChange

**onScopeChange**: [`Event`](/auto-docs/free-layout-editor/interfaces/Event-1.md)<`ScopeChangeAction`>

An event that fires whenever a scope is added, updated, or deleted.

## Accessors

### container

`get` **container**(): [`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

The Inversify container instance.

#### Returns

[`Container`](/auto-docs/free-layout-editor/interfaces/interfaces.Container.md)

## Methods

### createScope

**createScope**(`id`, `meta?`, `options?`): [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

Creates a new scope or retrieves an existing one if the ID and type match.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | `symbol` | The unique identifier for the scope. |
| `meta?` | `Record`<`string`, `any`> | Optional metadata for the scope, defined by the user. |
| `options?` | `Object` | Options for creating the scope. |
| `options.ScopeConstructor?` | `IScopeConstructor` | The constructor to use for creating the scope. Defaults to `Scope`. |

#### Returns

[`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The created or existing scope.

***

### dispose

**dispose**(): `void`

Disposes of all resources used by the variable engine.

#### Returns

`void`

#### Implementation of

[Disposable](/auto-docs/free-layout-editor/interfaces/Disposable-1.md).[dispose](/auto-docs/free-layout-editor/interfaces/Disposable-1.md#dispose)

***

### fireGlobalEvent

**fireGlobalEvent**(`event`): `void`

Fires a global event to be broadcast to all listeners.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> | The global event to fire. |

#### Returns

`void`

***

### getAllScopes

**getAllScopes**(`options?`): [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

Retrieves all scopes currently managed by the engine.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Object` | Options for retrieving the scopes. |
| `options.sort?` | `boolean` | Whether to sort the scopes based on their dependency chain. |

#### Returns

[`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>\[]

An array of all scopes.

***

### getScopeById

**getScopeById**(`scopeId`): `undefined` | [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

Retrieves a scope by its unique identifier.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopeId` | `string` | `symbol` | The ID of the scope to retrieve. |

#### Returns

`undefined` | [`Scope`](/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

The scope if found, otherwise undefined.

***

### onGlobalEvent

**onGlobalEvent**<`ActionType`>(`type`, `observer`): [`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

Subscribes to a specific type of global event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ActionType` | extends [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>, `ActionType`> = [`GlobalEventActionType`](/auto-docs/free-layout-editor/interfaces/GlobalEventActionType.md)<`string`, `any`, [`ASTNode`](/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`>> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `ActionType`\[`"type"`] | The type of the event to listen for. |
| `observer` | (`action`: `ActionType`) => `void` | A function to be called when the event is observed. |

#### Returns

[`Disposable`](/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

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
