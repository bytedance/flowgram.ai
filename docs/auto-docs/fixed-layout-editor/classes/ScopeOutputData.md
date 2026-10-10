# Class: ScopeOutputData

Manages the output variables of a scope.

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#constructor)

### Properties

* [scope](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#scope)

### Accessors

* [globalVariableTable](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#globalvariabletable)
* [onAnyVariableChange](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#onanyvariablechange)
* [onDataChange](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#ondatachange)
* [onListOrAnyVarChange](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#onlistoranyvarchange)
* [onVariableListChange](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#onvariablelistchange)
* [variableEngine](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#variableengine)
* [variableKeys](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#variablekeys)
* [variables](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#variables)
* [version](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#version)

### Methods

* [getVariableByKey](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#getvariablebykey)
* [notifyCoversChange](/auto-docs/fixed-layout-editor/classes/ScopeOutputData.md#notifycoverschange)

## Constructors

### constructor

**new ScopeOutputData**(`scope`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | [`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>> |

## Properties

### scope

`Readonly` **scope**: [`Scope`](/auto-docs/fixed-layout-editor/classes/Scope.md)<`Record`<`string`, `any`>>

## Accessors

### globalVariableTable

`get` **globalVariableTable**(): [`IVariableTable`](/auto-docs/fixed-layout-editor/interfaces/IVariableTable.md)

The global variable table from the variable engine.

#### Returns

[`IVariableTable`](/auto-docs/fixed-layout-editor/interfaces/IVariableTable.md)

***

### onAnyVariableChange

`get` **onAnyVariableChange**(): (`observer`: (`changedVariable`: [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>) => `void`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

An event that fires when any output variable's value changes.

#### Returns

`fn`

(`observer`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

An event that fires when any output variable's value changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`changedVariable`: [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>) => `void` |

##### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### onDataChange

`get` **onDataChange**(): [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

#### Returns

[`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`void`>

**`Deprecated`**

use onListOrAnyVarChange instead

***

### onListOrAnyVarChange

`get` **onListOrAnyVarChange**(): (`observer`: () => `void`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

An event that fires when the output variable list changes or any variable's value is updated.

#### Returns

`fn`

(`observer`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

An event that fires when the output variable list changes or any variable's value is updated.

##### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | () => `void` |

##### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### onVariableListChange

`get` **onVariableListChange**(): (`observer`: (`variables`: [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>\[]) => `void`) => [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

An event that fires when the list of output variables changes.

#### Returns

`fn`

(`observer`): [`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

An event that fires when the list of output variables changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | (`variables`: [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>\[]) => `void` |

##### Returns

[`Disposable`](/auto-docs/fixed-layout-editor/interfaces/Disposable-1.md)

***

### variableEngine

`get` **variableEngine**(): [`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

The variable engine instance.

#### Returns

[`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

***

### variableKeys

`get` **variableKeys**(): `string`\[]

The keys of the output variables.

#### Returns

`string`\[]

***

### variables

`get` **variables**(): [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>\[]

The output variable declarations of the scope, sorted by order.

#### Returns

[`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>\[]

***

### version

`get` **version**(): `number`

The current version of the output data, which increments on each change.

#### Returns

`number`

## Methods

### getVariableByKey

**getVariableByKey**(`key`): `undefined` | [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>

Retrieves a variable declaration by its key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable. |

#### Returns

`undefined` | [`VariableDeclaration`](/auto-docs/fixed-layout-editor/classes/VariableDeclaration.md)<`any`>

The `VariableDeclaration` or `undefined` if not found.

***

### notifyCoversChange

**notifyCoversChange**(): `void`

Notifies the covering scopes that the available variables have changed.

#### Returns

`void`
