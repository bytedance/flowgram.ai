# Interface: IVariableTable

Interface for a variable table.

## Hierarchy

* `Disposable`

  ↳ **`IVariableTable`**

## Table of contents

### Properties

* [onDataChange](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#ondatachange)
* [parentTable](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#parenttable)
* [variableKeys](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#variablekeys)
* [variables](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#variables)
* [version](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#version)

### Methods

* [dispose](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#dispose)
* [fireChange](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#firechange)
* [getByKeyPath](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#getbykeypath)
* [getVariableByKey](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#getvariablebykey)
* [onAnyVariableChange](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#onanyvariablechange)
* [onListOrAnyVarChange](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#onlistoranyvarchange)
* [onVariableListChange](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md#onvariablelistchange)

## Properties

### onDataChange

**onDataChange**: `Event`<`void`>

**`Deprecated`**

Use `onVariableListChange` or `onAnyVariableChange` instead.

***

### parentTable

`Optional` **parentTable**: [`IVariableTable`](/en/auto-docs/variable-plugin/interfaces/IVariableTable.md)

The parent variable table.

***

### variableKeys

**variableKeys**: `string`\[]

The keys of the variables in the table.

***

### variables

**variables**: [`VariableDeclaration`](/en/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>\[]

The list of variables in the table.

***

### version

**version**: `number`

The current version of the variable table.

## Methods

### dispose

**dispose**(): `void`

Disposes the variable table.

#### Returns

`void`

#### Overrides

Disposable.dispose

***

### fireChange

**fireChange**(): `void`

Fires a change event.

#### Returns

`void`

***

### getByKeyPath

**getByKeyPath**(`keyPath`): `undefined` | [`BaseVariableField`](/en/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>

Gets a variable or property by its key path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyPath` | `string`\[] | The key path to the variable or property. |

#### Returns

`undefined` | [`BaseVariableField`](/en/auto-docs/variable-plugin/classes/BaseVariableField.md)<`any`>

The found `BaseVariableField` or `undefined`.

***

### getVariableByKey

**getVariableByKey**(`key`): `undefined` | [`VariableDeclaration`](/en/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>

Gets a variable by its key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key of the variable. |

#### Returns

`undefined` | [`VariableDeclaration`](/en/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>

The found `VariableDeclaration` or `undefined`.

***

### onAnyVariableChange

**onAnyVariableChange**(`observer`): `Disposable`

Subscribes to changes in any variable's value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | (`changedVariable`: [`VariableDeclaration`](/en/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>) => `void` | The observer function. |

#### Returns

`Disposable`

A disposable to unsubscribe.

***

### onListOrAnyVarChange

**onListOrAnyVarChange**(`observer`): `Disposable`

Subscribes to both variable list changes and any variable's value changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | () => `void` | The observer function. |

#### Returns

`Disposable`

A disposable to unsubscribe.

***

### onVariableListChange

**onVariableListChange**(`observer`): `Disposable`

Subscribes to changes in the variable list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | (`variables`: [`VariableDeclaration`](/en/auto-docs/variable-plugin/classes/VariableDeclaration.md)<`any`>\[]) => `void` | The observer function. |

#### Returns

`Disposable`

A disposable to unsubscribe.
