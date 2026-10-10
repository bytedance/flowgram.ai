# Class: VariableFieldKeyRenameService

This service is responsible for detecting when a variable field's key is renamed.
It listens for changes in variable declaration lists and object properties, and
determines if a change constitutes a rename operation.

## Table of contents

### Constructors

* [constructor](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#constructor)

### Properties

* [disposeInListEmitter](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#disposeinlistemitter)
* [onDisposeInList](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#ondisposeinlist)
* [onRename](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#onrename)
* [renameEmitter](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#renameemitter)
* [toDispose](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#todispose)
* [variableEngine](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#variableengine)

### Methods

* [dispose](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#dispose)
* [handleFieldListChange](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#handlefieldlistchange)
* [init](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#init)
* [notifyFieldsDispose](/en/auto-docs/free-layout-editor/classes/VariableFieldKeyRenameService.md#notifyfieldsdispose)

## Constructors

### constructor

**new VariableFieldKeyRenameService**()

## Properties

### disposeInListEmitter

**disposeInListEmitter**: [`Emitter`](/en/auto-docs/free-layout-editor/classes/Emitter.md)<[`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>>

Emits events for fields that are disposed of during a list change, but not renamed.
This helps distinguish between a field that was truly removed and one that was renamed.

***

### onDisposeInList

**onDisposeInList**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<[`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>>

An event that fires when a field is removed from a list (and not part of a rename).

***

### onRename

**onRename**: [`Event`](/en/auto-docs/free-layout-editor/interfaces/Event-1.md)<`RenameInfo`>

An event that fires when a variable field key is successfully renamed.

***

### renameEmitter

**renameEmitter**: [`Emitter`](/en/auto-docs/free-layout-editor/classes/Emitter.md)<`RenameInfo`>

***

### toDispose

**toDispose**: [`DisposableCollection`](/en/auto-docs/free-layout-editor/classes/DisposableCollection.md)

***

### variableEngine

**variableEngine**: [`VariableEngine`](/en/auto-docs/free-layout-editor/classes/VariableEngine.md)

## Methods

### dispose

**dispose**(): `void`

#### Returns

`void`

***

### handleFieldListChange

**handleFieldListChange**(`ast?`, `prev?`, `next?`): `void`

Handles changes in a list of fields to detect rename operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ast?` | [`ASTNode`](/en/auto-docs/free-layout-editor/classes/ASTNode.md)<`any`> | The AST node where the change occurred. |
| `prev?` | [`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields before the change. |
| `next?` | [`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields after the change. |

#### Returns

`void`

***

### init

**init**(): `void`

#### Returns

`void`

***

### notifyFieldsDispose

**notifyFieldsDispose**(`prev?`, `next?`): `void`

Notifies listeners about fields that were removed from a list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prev?` | [`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields before the change. |
| `next?` | [`BaseVariableField`](/en/auto-docs/free-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields after the change. |

#### Returns

`void`
