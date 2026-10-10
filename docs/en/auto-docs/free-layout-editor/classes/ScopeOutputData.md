# Class: ScopeOutputData

Manages the output variables of a scope.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#constructor)

### Properties

* [scope](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#scope)

### Accessors

* [globalVariableTable](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#globalvariabletable)
* [onAnyVariableChange](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#onanyvariablechange)
* [onDataChange](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#ondatachange)
* [onListOrAnyVarChange](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#onlistoranyvarchange)
* [onVariableListChange](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#onvariablelistchange)
* [variableEngine](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#variableengine)
* [variableKeys](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#variablekeys)
* [variables](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#variables)
* [version](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#version)

### Methods

* [getVariableByKey](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#getvariablebykey)
* [notifyCoversChange](/en/auto-docs/free-layout-editor/classes/ScopeOutputData.md#notifycoverschange)

## Constructors

### constructor

**new ScopeOutputData**(`scope`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | [`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>> |

## Properties

### scope

`Readonly` **scope**: [`Scope`](/en/auto-docs/free-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

## Accessors

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/en/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

The global variable table from the variable engine.

#### Returns

[`IVariableTable`](/en/auto-docs/free-layout-editor/interfaces/IVariableTable.md)

***

### onAnyVariableChange

`get` **onAnyVariableChange**(): (`observer`: (`changedVariable`: [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>) => `void`) => [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

An event that fires when any output variable's value changes.

#### Returns

`fn`

(`observer`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

An event that fires when any output variable's value changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`changedVariable`: [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>) => `void` |

##### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### onDataChange

`get` **onDataChange**(): [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`void`>

**`Deprecated`**

use onListOrAnyVarChange instead

***

### onListOrAnyVarChange

`get` **onListOrAnyVarChange**(): (`observer`: () => `void`) => [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

An event that fires when the output variable list changes or any variable's value is updated.

#### Returns

`fn`

(`observer`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

An event that fires when the output variable list changes or any variable's value is updated.

##### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | () => `void` |

##### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### onVariableListChange

`get` **onVariableListChange**(): (`observer`: (`variables`: [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>\[]) => `void`) => [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

An event that fires when the list of output variables changes.

#### Returns

`fn`

(`observer`): [`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

An event that fires when the list of output variables changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`variables`: [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>\[]) => `void` |

##### Returns

[`Disposable`](/en/auto-docs/free-layout-editor/interfaces/Disposable-1.md)

***

### variableEngine

`get` **variableEngine**(): [`VariableEngine`](/en/auto-docs/free-layout-editor/classes/VariableEngine.md)

The variable engine instance.

#### Returns

[`VariableEngine`](/en/auto-docs/free-layout-editor/classes/VariableEngine.md)

***

### variableKeys

`get` **variableKeys**(): `string`\[]

The keys of the output variables.

#### Returns

`string`\[]

***

### variables

`get` **variables**(): [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>\[]

The output variable declarations of the scope, sorted by order.

#### Returns

[`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>\[]

***

### version

`get` **version**(): `number`

The current version of the output data, which increments on each change.

#### Returns

`number`

## Methods

### getVariableByKey

**getVariableByKey**(`key`): `undefined` | [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>

Retrieves a variable declaration by its key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable. |

#### Returns

`undefined` | [`VariableDeclaration`](/en/auto-docs/free-layout-editor/classes/VariableDeclaration.md)<`any`>

The `VariableDeclaration` or `undefined` if not found.

***

### notifyCoversChange

**notifyCoversChange**(): `void`

Notifies the covering scopes that the available variables have changed.

#### Returns

`void`
