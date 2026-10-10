# Class: ScopeOutputData

Manages the output variables of a scope.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/variable-core/classes/ScopeOutputData.md#constructor)

### Properties

* [scope](/en/auto-docs/variable-core/classes/ScopeOutputData.md#scope)

### Accessors

* [globalVariableTable](/en/auto-docs/variable-core/classes/ScopeOutputData.md#globalvariabletable)
* [onAnyVariableChange](/en/auto-docs/variable-core/classes/ScopeOutputData.md#onanyvariablechange)
* [onDataChange](/en/auto-docs/variable-core/classes/ScopeOutputData.md#ondatachange)
* [onListOrAnyVarChange](/en/auto-docs/variable-core/classes/ScopeOutputData.md#onlistoranyvarchange)
* [onVariableListChange](/en/auto-docs/variable-core/classes/ScopeOutputData.md#onvariablelistchange)
* [variableEngine](/en/auto-docs/variable-core/classes/ScopeOutputData.md#variableengine)
* [variableKeys](/en/auto-docs/variable-core/classes/ScopeOutputData.md#variablekeys)
* [variables](/en/auto-docs/variable-core/classes/ScopeOutputData.md#variables)
* [version](/en/auto-docs/variable-core/classes/ScopeOutputData.md#version)

### Methods

* [getVariableByKey](/en/auto-docs/variable-core/classes/ScopeOutputData.md#getvariablebykey)
* [notifyCoversChange](/en/auto-docs/variable-core/classes/ScopeOutputData.md#notifycoverschange)

## Constructors

### constructor

**new ScopeOutputData**(`scope`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | [`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>> |

## Properties

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/variable-core/classes/Scope.md)<`Record`<`string`, `any`>>

## Accessors

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/en/auto-docs/variable-core/interfaces/IVariableTable.md)

The global variable table from the variable engine.

#### Returns

[`IVariableTable`](/en/auto-docs/variable-core/interfaces/IVariableTable.md)

***

### onAnyVariableChange

`get` **onAnyVariableChange**(): (`observer`: (`changedVariable`: [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>) => `void`) => `Disposable`

An event that fires when any output variable's value changes.

#### Returns

`fn`

(`observer`): `Disposable`

Subscribes to changes in any variable's value.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | (`changedVariable`: [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>) => `void` | The observer function. |

##### Returns

`Disposable`

A disposable to unsubscribe.

***

### onDataChange

`get` **onDataChange**(): `Event`<`void`>

#### Returns

`Event`<`void`>

**`Deprecated`**

use onListOrAnyVarChange instead

***

### onListOrAnyVarChange

`get` **onListOrAnyVarChange**(): (`observer`: () => `void`) => `Disposable`

An event that fires when the output variable list changes or any variable's value is updated.

#### Returns

`fn`

(`observer`): `Disposable`

Subscribes to both variable list changes and any variable's value changes.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | () => `void` | The observer function. |

##### Returns

`Disposable`

A disposable to unsubscribe.

***

### onVariableListChange

`get` **onVariableListChange**(): (`observer`: (`variables`: [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>\[]) => `void`) => `Disposable`

An event that fires when the list of output variables changes.

#### Returns

`fn`

(`observer`): `Disposable`

Subscribes to changes in the variable list.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | (`variables`: [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>\[]) => `void` | The observer function. |

##### Returns

`Disposable`

A disposable to unsubscribe.

***

### variableEngine

`get` **variableEngine**(): [`VariableEngine`](/en/auto-docs/variable-core/classes/VariableEngine.md)

The variable engine instance.

#### Returns

[`VariableEngine`](/en/auto-docs/variable-core/classes/VariableEngine.md)

***

### variableKeys

`get` **variableKeys**(): `string`\[]

The keys of the output variables.

#### Returns

`string`\[]

***

### variables

`get` **variables**(): [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>\[]

The output variable declarations of the scope, sorted by order.

#### Returns

[`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>\[]

***

### version

`get` **version**(): `number`

The current version of the output data, which increments on each change.

#### Returns

`number`

## Methods

### getVariableByKey

**getVariableByKey**(`key`): `undefined` | [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>

Retrieves a variable declaration by its key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable. |

#### Returns

`undefined` | [`VariableDeclaration`](/en/auto-docs/variable-core/classes/VariableDeclaration.md)<`any`>

The `VariableDeclaration` or `undefined` if not found.

***

### notifyCoversChange

**notifyCoversChange**(): `void`

Notifies the covering scopes that the available variables have changed.

#### Returns

`void`
