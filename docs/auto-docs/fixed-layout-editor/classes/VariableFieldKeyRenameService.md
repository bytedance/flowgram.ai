# Class: VariableFieldKeyRenameService

This service is responsible for detecting when a variable field's key is renamed.
It listens for changes in variable declaration lists and object properties, and
determines if a change constitutes a rename operation.

## Table of contents

### Constructors

* [constructor](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#constructor)

### Properties

* [disposeInListEmitter](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#disposeinlistemitter)
* [onDisposeInList](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#ondisposeinlist)
* [onRename](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#onrename)
* [renameEmitter](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#renameemitter)
* [toDispose](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#todispose)
* [variableEngine](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#variableengine)

### Methods

* [dispose](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#dispose)
* [handleFieldListChange](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#handlefieldlistchange)
* [init](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#init)
* [notifyFieldsDispose](/auto-docs/fixed-layout-editor/classes/VariableFieldKeyRenameService.md#notifyfieldsdispose)

## Constructors

### constructor

**new VariableFieldKeyRenameService**()

## Properties

### disposeInListEmitter

**disposeInListEmitter**: [`Emitter`](/auto-docs/fixed-layout-editor/classes/Emitter.md)<[`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>>

Emits events for fields that are disposed of during a list change, but not renamed.
This helps distinguish between a field that was truly removed and one that was renamed.

***

### onDisposeInList

**onDisposeInList**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<[`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>>

An event that fires when a field is removed from a list (and not part of a rename).

***

### onRename

**onRename**: [`Event`](/auto-docs/fixed-layout-editor/interfaces/Event-1.md)<`RenameInfo`>

An event that fires when a variable field key is successfully renamed.

***

### renameEmitter

**renameEmitter**: [`Emitter`](/auto-docs/fixed-layout-editor/classes/Emitter.md)<`RenameInfo`>

***

### toDispose

**toDispose**: [`DisposableCollection`](/auto-docs/fixed-layout-editor/classes/DisposableCollection.md)

***

### variableEngine

**variableEngine**: [`VariableEngine`](/auto-docs/fixed-layout-editor/classes/VariableEngine.md)

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
| `ast?` | [`ASTNode`](/auto-docs/fixed-layout-editor/classes/ASTNode.md)<`any`> | The AST node where the change occurred. |
| `prev?` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields before the change. |
| `next?` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields after the change. |

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
| `prev?` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields before the change. |
| `next?` | [`BaseVariableField`](/auto-docs/fixed-layout-editor/classes/BaseVariableField.md)<`any`>\[] | The list of fields after the change. |

#### Returns

`void`
